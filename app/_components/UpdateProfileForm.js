"use client";

import { updateProfile } from "@/app/_lib/actions";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import SubmitButton from "./SubmitButton";

async function UpdateProfileForm({ guest, children }) {
  const [count, setCount] = useState();
  const {
    full_name: name,
    email,
    nationality,
    national_id: nationalID,
    country_flag: countryFlag,
  } = guest;
  return (
    <form
      action={updateProfile}
      className="flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          name="fullName"
          defaultValue={name}
          disabled
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          name="email"
          defaultValue={email}
          disabled
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <img
            src={countryFlag}
            alt="Country flag"
            className="h-5 rounded-sm"
          />
        </div>
        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          defaultValue={nationalID}
          name="nationalID"
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
        />
      </div>

      <div className="flex items-center justify-end gap-6">
        <SubmitButton pendinglabel="Updating...">Update profile</SubmitButton>
      </div>
    </form>
  );
}

// function Button() {
//   const { pending, data, method, action } = useFormStatus();
//   return (
//     <button
//       className="bg-accent-500 px-8 py-4 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
//       disabled={pending}
//     >
//       {pending ? "Updating..." : "Update profile"}
//     </button>
//   );
// }

export default UpdateProfileForm;
