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
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Suspense fallback={null}>
        <SignIn afterSignInUrl="/dashboard" fallbackRedirectUrl="/dashboard" />
      </Suspense>
    </div>
  );
}
