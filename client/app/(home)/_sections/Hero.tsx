import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";

const Hero = () => {
  return (
    <>
      <div className="w-full h-[600px] bg-gradient-to-br from-green-900 to-gray-950 pt-20 ">
        <div className="w-[80vw] m-auto">
          <div className="py-20 text-gray-50 capitalize">
            <h1 className="  text-5xl py-4">
              your platform to buy <br /> and sell
            </h1>
            <p className="w-[40vw] text-wrap py-2 opacity-90">
              Name is your ultimate platform to market and sell personal
              training, fitness plans, nutrition coaching, br and so much more –
              it’s a one-stop shop to connect with clients and share your
              expertise in the health and fitness world.
            </p>
            <div className="flex flex-row w-full py-4">
                <Button variant={"secondary"}>Find your person</Button>
                <div className="px-2"><Button variant={'ghost'}>Start selling</Button></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
