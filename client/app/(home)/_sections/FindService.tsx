"use client"
import { Separator } from "@/components/ui/separator";
import React, { useState, useEffect } from "react";
import { FindFilter } from "../_components/FindFilter";
import SellerCard from "../_components/SellerCard";

const Filters = [
  "Personal Training",
  "Fitness Plans",
  "Nutritionists",
  "Sports Therapists",
  "Physiotherapists",
];

export const FindService = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading time for demonstration
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full py-10 bg-white">
      <div className="w-[80vw] m-auto">
        <div className="">
          <h1 className="text-3xl font-bold">Find Your Person</h1>
          <p className="py-2 text-gray-600">There's a place for everybody</p>
          <Separator className="my-4" />
        </div>
        
        <div className="flex flex-wrap  gap-2 py-4">
          {Filters.map((filter) => (
            <FindFilter key={filter} filter={filter} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          {Filters.map((service) => (
            <SellerCard key={service} name={service} loading={loading} />
          ))}
        </div>
      </div>
    </div>
  );
};
