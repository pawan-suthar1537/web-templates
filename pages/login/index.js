import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  return (
    <>
      <section>
        <div className="py-8 px-4 mx-auto max-w-screen-2xl text-center lg:py-10 relative z-10">
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
            we invest in the future of{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              development
            </span>
          </h1>

          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px48 dark:text-gray-200">
            we focus on helping you find the best templates built by developers
            for developers
          </p>
          {session ? (
            <Button
              onClick={() => {
                window.location.href = "/dashboard";
              }}
            >
              Share Templates
            </Button>
          ) : (
            <Button onClick={() => signIn("google")}>
              Continue with google
            </Button>
          )}
        </div>
        <Image
          src="/banner.jpg"
          alt="hero image"
          className="object-cover max-w-[250px] mx-auto"
        />
      </section>
    </>
  );
};

export default Login;
