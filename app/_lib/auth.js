import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    //Do not know how this works
    authorized({ auth, request }) {
      console.log("testtttttt");
      console.log(auth);
      console.log(request);
      return !!auth?.user;
    },
    async signIn({ user, account, profile, email }) {
      try {
        const existingGuest = await getGuest(user.email);
        if (!existingGuest) {
          await createGuest({ email: user.email, full_name: user.name });
        }

        return true;
      } catch {
        return false;
      }
    },
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
};

// export const {
//   auth,
//   handlers: { GET, POST },
// } = NextAuth(authConfig);

const authHandler = NextAuth(authConfig);
export default authHandler;