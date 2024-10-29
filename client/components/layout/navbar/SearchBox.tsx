"use client";
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const exampleSearchQueries = [
  "Personal Trainer",
  "Sports Therapist",
  "Nutritionist",
  "Fitness Plans",
];

const SearchBox = () => {
  const [demoQuery, setDemoQuery] = useState(exampleSearchQueries[0]);

  useEffect(() => {
    let i = 0; // Initialize i here
    const interval = setInterval(() => {
      i = (i + 1) % exampleSearchQueries.length; // Increment within the interval
      setDemoQuery(exampleSearchQueries[i]);
    }, 5000);

    return () => clearInterval(interval);
  }, []); // Only run once on mount

  return (
    <div className="w-full max-w-[400px] h-full">
      <div className="grid grid-cols-6 border rounded-md">
        <div className="col-span-5 border-r">
          <Input
            placeholder={`Search "${demoQuery}"`}
            className="border-hidden shadow-[0px]"
          />
        </div>
        <div className="col-span-1 m-auto flex justify-center">
          <Search size={24} />
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
