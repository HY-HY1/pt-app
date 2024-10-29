"use client"
import React, { useEffect } from "react";
import { NavMenu } from "./NavigationMenu";
import SearchBox from "./SearchBox";
import { useAuth } from "@/hooks/auth/useAuth";

const Navbar =  () => {
  const { authenticate, authenticated, user  } = useAuth()

  useEffect(() => {
    const auth = async () => {
      await authenticate()
    console.log("🚀 ~ Navbar ~ authenticated:", authenticated)
    }
    auth()
  }, [])


  return (
    <nav className="w-full h-20 border-b bg-white fixed z-1000">
      <section className="w-[80vw] h-full mx-auto grid grid-cols-5 items-center">
        {/* Left Side: Brand Name or Logo */}
        <div className="flex flex-row items-center col-span-2">
          <h1 className="text-lg font-semibold pr-8">YourSiteName</h1>
          <SearchBox/>
        </div>

        {/* Center: Empty Space */}
        <div className=" col-span-1"></div>

        {/* Right Side: Navigation Menu */}
        <div className="flex justify-end col-span-2">
          <NavMenu authenticated={authenticated} user={user} />
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
