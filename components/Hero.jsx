import React from "react";
import { Button } from "./ui/button";
import { useUser } from "@clerk/nextjs";

const Hero = () => {
    const { user } = useUser();
    const userId = user?.id;

  return (
    <>
      <div className="relative overflow-hidden">
        <div className="pb-16 pt-20 sm:pt-24 lg:pb-24  lg:pt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-[31px] text-center font-extrabold tracking-tight text-primary sm:text-5xl lg:text-6xl">
                Your destination for
                <span className="text-green-600 mx-1 lg:mx-2">Developer</span>
                Templates
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-muted-foreground lg:text-xl">
              Welcome to <span className="text-green-600">CodeSnap</span>, your ultimate destination for <span className="text-indigo-600">top-quality</span> coding projects and templates. Discover a vast collection of resources crafted by talented developers worldwide. Whether you are looking to kickstart your next project or find <span className="text-red-600">inspiration</span>, DeveloperTemplates offers everything you need to elevate your development game. Explore, download, and connect with a thriving community of innovators today
              </p>
            </div>
            <div className="mt-12 text-center">
              {
                userId ? (
                    <Button
                onClick={() => {
                  window.location.href = "/dashboard";
                }}
              >
                Share Templates
              </Button>
                ) : (
                    <Button
                onClick={() => {
                  window.location.href = "/login";
                }}
              >
                Sign in to start template sharing
              </Button>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
