import React from "react";
import ReviewCard from "../_components/ReviewCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const names = ["Emma", "Jake", "Simon", "Alex"];

const Reviews = () => {
  return (
    <div className="w-full h-[500px]">
      <div className="w-[80vw] m-auto">
        <div className="w-full h-full grid grid-cols-2">
          <h1 className="text-2xl py-8 flex justify-start">
            Here's what our customers say
          </h1>
          <div className="flex items-center justify-end  h-full">
            <Button variant="ghost">
              <span className="opacity-90">Write a Review</span>{" "}
              <span className="hover:rotate-90 transition-all">
                <ArrowRight />
              </span>
            </Button>
          </div>
        </div>
        <div className="w-full grid grid-cols-4 gap-4">
          {names.map((n) => (
            <ReviewCard name={n} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
