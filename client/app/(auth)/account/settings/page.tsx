// page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { SettingsList } from './_components/SettingsList';
import { Separator } from '@/components/ui/separator';
import { useSearchParams, useRouter } from 'next/navigation';
import General from './_sections/general';
import Security from './_sections/security';
import Navbar from '@/components/layout/navbar/Navbar';

const Page = () => {
  const settings = ["general", "profile", "security", "payment", "billing", "theme"];
  const searchParams = useSearchParams();
  const router = useRouter();
  const querySetting = (searchParams.get("setting") || "general").toLowerCase();
  const [selectedSetting, setSelectedSetting] = useState<string>(querySetting);

  useEffect(() => {
    setSelectedSetting(querySetting);
  }, [querySetting]);

  const handleSettingChange = (setting: string) => {
    setSelectedSetting(setting);
    router.push(`?setting=${setting}`);
  };

  const renderSettingContent = () => {
    switch (selectedSetting) {
      case "general":
        return <General/>;
      case "profile":
        return <p>Profile</p>;
      case "security":
        return <Security/>;
      case "payment":
        return <p>Payment Settings Content</p>;
      case "billing":
        return <p>Billing Settings Content</p>;
      case "theme":
        return <p>Theme Settings Content</p>;
      default:
        return <p>Select a setting to view its content.</p>;
    }
  };

  return (
   <>
    
    <div className="flex justify-center w-[85vw]  h-[600px]">
      <div className="w-3/4">
        <div className="w-full">
          <h1 className="text-3xl py-4">Your account settings</h1>
        </div>
        <div className="flex flex-row py-2 space-x-4">
          {settings.map((setting) => (
            <SettingsList
              key={setting}
              setting={setting}
              isSelected={selectedSetting === setting}
              onClick={() => handleSettingChange(setting)}
            />
          ))}
        </div>
        <div className="py-2">
          <Separator />
        </div>
        <div className="pt-4">
          
          {renderSettingContent()}
        </div>
      </div>
    </div>
   </>
  );
};

export default Page;
