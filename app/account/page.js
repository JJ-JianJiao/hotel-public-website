import { getServerSession } from "next-auth";
import { authConfig } from "../_lib/auth";

export const metadata = {
  title: "Guest area",
};

export default async function Page() {
  const session = await getServerSession(authConfig);
  // console.log(session);
  return (
    <h2 className="mb-7 text-2xl font-semibold text-accent-400">
      Welcome, {session.user.name}
    </h2>
  );
}
