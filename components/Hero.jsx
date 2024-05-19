import React from "react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="pb-16 pt-20 sm:pt-24 lg:pb-24  lg:pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl text-center font-extrabold tracking-tight text-primary sm:text-5xl lg:text-6xl">
                Your destination for
                <span className="text-green-600 mx-1 lg:mx-2">Developer</span>
                Templates
              </h1>
              <p className="mt-6 text-sm lg:text-xl  text-gray-600">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Dolores porro laboriosam, odio magnam quas similique deleniti
                pariatur sequi nobis, ratione fugiat obcaecati sed sapiente
                nostrum assumenda! Quae exercitationem facere odit nihil
                aspernatur tenetur accusantium aliquid, nam sit ut harum quam
                corporis sint sapiente doloribus dolores ipsum fugiat nulla
                voluptatum eius!
              </p>
            </div>
            <div className="mt-12 text-center">
              <Button
                onClick={() => {
                  window.location.href = "/login";
                }}
              >
                Sign in to start template sharing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
