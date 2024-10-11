"use server";

import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";

const regex = /^[a-zA-Z0-9]{6,12}$/;

function isValidNationalID(nationalID) {
  // console.log(nationalID);
  return regex.test(nationalID);
}

export async function signInAction() {
  await signIn("google", { redirect: "/account" });
}

import { signOut } from "next-auth/react";
import { authConfig } from "./auth";
import supabase from "./supabase";
import { revalidatePath } from "next/cache";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateProfile(formData) {
  const session = await getServerSession(authConfig);
  if (!session) throw new Error("You must be logged in");

  const nationalId = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  if (!isValidNationalID(nationalId))
    throw new Error("Please provide a valid national ID");

  const updateData = {
    nationality,
    country_flag: countryFlag,
    national_id: nationalId,
  };
  // console.log(updateData);
  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  // console.log(data);
  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await getServerSession(authConfig);
  if (!session) throw new Error("You must be logged in");
  // console.log(session);

  const guestBookings = await getBookings(session.user.guestId);
  const guestsBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestsBookingIds.includes(bookingId)) {
    throw new Error("You are not allowed to delete this booking");
  }

  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);
  await new Promise((res) => setTimeout(res, 7000));
  // throw new Error();
  if (error) {
    // console.error(error);
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
}

export async function updateReservation(formData) {
  const session = await getServerSession(authConfig);
  if (!session) throw new Error("You must be logged in");

  const bookingId = formData.get("bookingId");
  const updateData = {
    observations: formData.get("observations").slice(0, 1000),
    num_guests: formData.get("numGuests"),
  };

  const guestBookings = await getBookings(session.user.guestId);
  const guestsBookingIds = guestBookings.map((booking) => String(booking.id));

  if (!guestsBookingIds.includes(bookingId)) {
    throw new Error("You are not allowed to update this booking");
  }

  const { data, error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();
  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  // console.log(data);
  // revalidatePath("/account/reservations/edit/[bookdingId]");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");
  redirect("/account/reservations");
}

export async function createReservation(bookingData, formData) {
  // console.log("create bookings");
  // console.log(bookingData, formData);

  const session = await getServerSession(authConfig);
  if (!session) throw new Error("You must be logged in");

  //if the formdata is huge, we can use this to cover to obj
  // Object.entries(formData.entries());

  const newBooking = {
    ...bookingData,
    guest_id: session.user.guestId,
    num_guests: formData.get("numGuests"),
    observations: formData.get("observations").slice(0, 1000),
    total_price: bookingData.cabin_price,
    extra_price: 0,
    status: "unconfirmed",
    has_breakfast: false,
    is_paid: false,
  };

  // console.log(newBooking);
  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }
  revalidatePath(`/cabins/${data.cabin_id}`);
  redirect("/thankyou");
  // return data;
}
