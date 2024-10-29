"use client";
import React, { useEffect } from 'react';
import { useAccount } from "@/hooks/auth/useAccount";
import { useAuth } from '@/hooks/auth/useAuth';
import { VerifyForm } from './_components/VerifyForm';

const Page = () => {
  const { user, loading } = useAccount();
  const { verifyRequest } = useAuth();

  // useEffect(() => {
  //   if (!user?.emailVerified) {
  //     const createCode = async () => {
  //       await verifyRequest();
  //     };
  //     createCode();
  //   }
  // }, [user, verifyRequest]);

  if (loading) {
    return <p>Loading</p>;
  }

  if (!user) {
    return <p>User was not found, Log in again</p>;
  }

  return (
    <div className="w-full h-full">
      <div className="w-[40vw] h-40 m-auto">
        {user?.emailVerified ? (
          <>Your email is already verified</>
        ) : (
          <div>
            <h1 className="text-2xl">Verify your email</h1>
            <div>
              <VerifyForm  />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
