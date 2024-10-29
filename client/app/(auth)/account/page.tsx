"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { RegisterForm } from "../_components/RegisterForm";
import { Separator } from "@/components/ui/separator";
import { LoginForm } from "../_components/LoginForm";

const Page = () => {
  const searchParams = useSearchParams();
  const isLogin = searchParams.get("login") === "true";

  return (
    <div className="w-[30vw] min-w-[400px] m-auto flex flex-col">
      {isLogin ? (
        <>
          <div>
            <h1 className="text-2xl py-2">Login</h1>
            <p className="opacity-90">Login and find your person in no time!</p>
            <div className="py-4">
              <Separator />
            </div>
          </div>
          <div className="w-full h-full rounded-lg p-8 py-10 border shadow-lg">
            <LoginForm />
          </div>
        </>
      ) : (
        <div className="">
          <div>
            <h1 className="text-2xl py-2">Register</h1>
            <p className="opacity-90">Sign up and find your person in no time!</p>
            <div className="py-4">
              <Separator />
            </div>
          </div>
          <div className="w-full h-full rounded-lg p-8 py-10 border shadow-lg">
            <RegisterForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
