// import { NextResponse } from "next/server";

// export function middleware(request) {
//   console.log(request);

//   //redirect the user

//   return NextResponse.redirect(new URL("/about", request.url));
// }
export { default } from "next-auth/middleware";
export const config = {
  matcher: ["/account"],
};
