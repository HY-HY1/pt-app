import { useAccount } from "@/hooks/auth/useAccount";
import React, { useEffect, useState } from "react";
import AccountInfoCard from "../_components/AccountInfoCard";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";
import { EditDialog } from "../_components/EditDialog"; // Adjusted import path
import { logout } from "@/utils/auth/logout";

const General = () => {
  const { user } = useAccount();
  const [currentData, setCurrentData] = useState({
    firstName: user?.name.firstName || '',
    lastName: user?.name.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: user?.demographics?.dateOfBirth
      ? new Date(user.demographics.dateOfBirth).toLocaleDateString()
      : '',
  });

  useEffect(() => {
    console.log("User object:", user);
  }, [user]);

  const updateField = (field: string, newValue: string) => {
    setCurrentData((prevData) => ({
      ...prevData,
      [field]: newValue,
    }));
  };

  const Cards = [
    {
      label: "Name",
      field: `${currentData.firstName} ${currentData.lastName}`,
      action: user?.name.firstName && user?.name.lastName ? (
        <EditDialog
          title="Name"
          description="Update your first and last name here."
          fields={[
            {
              label: "First Name",
              value: currentData.firstName,
              onChange: (newValue: string) => updateField("firstName", newValue),
            },
            {
              label: "Last Name",
              value: currentData.lastName,
              onChange: (newValue: string) => updateField("lastName", newValue),
            },
          ]}
          onSave={() => console.log("Saved Name:", currentData)}
        />
      ) : (
        <Button variant="outline">
          Add <span className="px-2"><Plus /></span>
        </Button>
      ),
    },
    {
      label: "Email",
      field: currentData.email,
      action: user?.email ? (
        <EditDialog
          title="Email"
          description="Update your email address here."
          fields={[
            {
              label: "Email",
              value: currentData.email,
              onChange: (newValue: string) => updateField("email", newValue),
            },
          ]}
          onSave={() => console.log("Saved Email:", currentData)}
        />
      ) : (
        <Button variant="outline">
          Add <span className="px-2"><Plus /></span>
        </Button>
      ),
    },
    {
      label: "Phone",
      field: currentData.phone,
      action: user?.phone ? (
        <EditDialog
          title="Phone"
          description="Update your phone number here."
          fields={[
            {
              label: "Phone",
              value: currentData.phone,
              onChange: (newValue: string) => updateField("phone", newValue),
            },
          ]}
          onSave={() => console.log("Saved Phone:", currentData)}
        />
      ) : (
        <Button variant="outline">
          Add <span className="px-2"><Plus /></span>
        </Button>
      ),
    },
    {
      label: "Date of Birth",
      field: currentData.dateOfBirth,
      action: user?.demographics?.dateOfBirth ? (
        <EditDialog
          title="Date of Birth"
          description="Update your date of birth here."
          fields={[
            {
              label: "Date of Birth",
              value: currentData.dateOfBirth,
              onChange: (newValue: string) => updateField("dateOfBirth", newValue),
            },
          ]}
          onSave={() => console.log("Saved Date of Birth:", currentData)}
        />
      ) : (
        <Button variant="outline">
          Add <span className="px-2"><Plus /></span>
        </Button>
      ),
    },
  ];

  return (
    <div className="w-full">
      <h1 className="text-xl">Account Information</h1>
      {user ? (
        <div className="py-4 w-1/2">
          {Cards.map((c, index) => (
            <AccountInfoCard key={index} label={c.label} field={c.field} action={c.action} />
          ))}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <div className="py-4">
        <h1 className="text-xl">Danger Zone</h1>
        <p className="text-sm opacity-80">These actions are irreversable</p>
        <div className="flex flex-row py-4">
          <Button variant={"destructive"} onClick={() => { '' }}>Delete Account</Button>
          <div className='px-2'><Button variant={"outline"} onClick={() => { logout() }}> Logout</Button></div>
        </div>
      </div>
    </div>
  );
};

export default General;
