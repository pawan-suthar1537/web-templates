import { SignIn, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { Suspense, useEffect } from "react";

export default function LoginPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace("/dashboard");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || isSignedIn) return null;

  return (
    <Suspense>
      <SignIn />
    </Suspense>
  );
}
