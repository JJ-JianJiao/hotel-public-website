"use client";

import ReservationCard from "./ReservationCard";
import { useOptimistic } from "react";
import { deleteReservation } from "../_lib/actions";
function ReservationList({ bookings }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    // updateFn
    (currentBookings, bookingId) => {
      // merge and return new state
      // with optimistic value
      return currentBookings.filter((booking) => booking.id !== bookingId);
    },
  );
  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
