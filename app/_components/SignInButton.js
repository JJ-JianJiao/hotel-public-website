"use client";

import { signIn } from "next-auth/react";

function SignInButton() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/account" })}
      className="flex items-center gap-6 border border-primary-300 px-10 py-4 text-lg font-medium"
    >
      <img
        src="https://authjs.dev/img/providers/google.svg"
        alt="Google logo"
        height="24"
        width="24"
      />
      <span>Continue with Google</span>
    </button>
  );
}

export default SignInButton;

//Tried this way, does not work in the current nextauth version

// import { signInAction } from "../_lib/action";
// function SignInButton() {
//   return (
//     <form action={signInAction}>
//       <button className="flex items-center gap-6 border border-primary-300 px-10 py-4 text-lg font-medium">
//         <img
//           src="https://authjs.dev/img/providers/google.svg"
//           alt="Google logo"
//           height="24"
//           width="24"
//         />
//         <span>Continue with Google</span>
//       </button>
//     </form>
//   );
// }

// export default SignInButton;
