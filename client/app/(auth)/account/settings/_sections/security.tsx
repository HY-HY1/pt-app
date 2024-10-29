import React, { useState } from "react";
import { useAccount } from "@/hooks/auth/useAccount";
import { Button } from "@/components/ui/button";
import { VerifyDialog } from "../_components/VerifyDialog";
import AccountInfoCard from "../_components/AccountInfoCard";

const Security = () => {
  const { user } = useAccount();
  const [emailDialogOpen, setEmailDialogOpen] = useState(false); // Separate state for email dialog
  const [phoneDialogOpen, setPhoneDialogOpen] = useState(false); // Separate state for phone dialog

  const [currentData, setCurrentData] = useState({
    firstName: user?.name?.firstName || "",
    lastName: user?.name?.lastName || "",
    emailVerified: user?.emailVerified || false,
    phoneVerified: user?.phoneVerified || false,
  });

  const updateField = (field: string, newValue: string | boolean) => {
    setCurrentData((prev) => ({
      ...prev,
      [field]: newValue,
    }));
  };

  const Cards = [
    {
      label: "Email",
      field: currentData.emailVerified ? "Verified" : "Not Verified",
      action: currentData.emailVerified ? null : (
        <>
          <Button variant="outline" onClick={() => setEmailDialogOpen(true)}>
            Verify Email
          </Button>
          <VerifyDialog
            verificationType="email"
            title="Email Verification"
            description={`We have sent a code to ${user?.email}`}
            fieldLabel="Email"
            fieldValue={user?.email || ""}
            onChange={(newValue: string) => updateField("email", newValue)}
            onSave={() => console.log("Email verification sent")}
            isOpen={emailDialogOpen}
            onOpenChange={setEmailDialogOpen}
          />
        </>
      ),
    },
    {
      label: "Phone Number",
      field: currentData.phoneVerified ? "Verified" : "Not Verified",
      action: currentData.phoneVerified ? null : (
        <>
          <Button variant="outline" onClick={() => setPhoneDialogOpen(true)}>
            Verify Phone
          </Button>
          <VerifyDialog
            verificationType="phone"
            title="Phone Verification"
            description="Enter your phone number to receive a verification code."
            fieldLabel="Phone Number"
            fieldValue={user?.phone || ""}
            onChange={(newValue: string) => updateField("phone", newValue)}
            onSave={() => console.log("Phone verification sent")}
            isOpen={phoneDialogOpen}
            onOpenChange={setPhoneDialogOpen}
          />
        </>
      ),
    },
  ];

  return (
    <div className="w-full h-[400px]">
      <header>
        <h1 className="text-2xl">Verification</h1>
        <p>Protect your account by verifying essential data</p>
      </header>
      <section>
        {user ? (
          <div className="py-4 w-1/2">
            {Cards.map((c, index) => (
              <AccountInfoCard key={index} label={c.label} field={c.field} action={c.action} />
            ))}
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </section>
    </div>
  );
};

export default Security;
