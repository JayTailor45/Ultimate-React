import React from "react";
import { auth } from "../_libs/auth";

export const metadata = {
  title: "Account",
  description: "Update your account info",
};

export default async function Page() {
  const session = await auth();
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Welcome, {session?.user?.name}
      </h2>
    </div>
  );
}
