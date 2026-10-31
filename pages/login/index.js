import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense>
      <SignIn />
    </Suspense>
  );
}
