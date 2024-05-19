import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Login = () => {
  return (
    <>
      <section>
        <div className="py-8 px-4 mx-auto max-w-screen-2xl text-center lg:py-10 relative z-10">
          <h1 className="mb-4 text-xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
            we invest in the future of developement
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px48 dark:text-gray-200">
            we focus on helping you find the best templates built by developers  for developers
          </p>
          <Button>
            Continue with google
          </Button>
        </div>
        <img src="/banner.jpg" alt="hero image" className="object-cover max-w-[250px] mx-auto"/>
      </section>
    </>
  );
};

export default Login;
