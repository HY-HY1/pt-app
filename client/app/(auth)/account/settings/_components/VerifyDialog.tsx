import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import React, { useEffect } from "react";
  import { VerifyForm } from "../../verify/_components/VerifyForm";
import Page from "../../verify/page";
  
  interface VerifyDialogProps {
    verificationType: "email" | "phone";
    title: string;
    description: string;
    fieldLabel: string;
    fieldValue: string;
    onChange: (newValue: string) => void;
    onSave: () => void;
    isOpen: boolean; // Pass control from parent
    onOpenChange: (open: boolean) => void; // Control dialog opening,
  }
  
  export function VerifyDialog({
    title,
    description,
    verificationType,
    isOpen,
    onOpenChange,
  }: VerifyDialogProps) {
  
    // if (verificationType === "email") {
    //   useEffect(() => {
    //     if (!user?.emailVerified) {
    //       const createCode = async () => {
    //         await verifyRequest();
    //       };
    //       createCode();
    //     }
    //   }, [user, verifyRequest]);
    // }

    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-4">
              <div className="w-full">
                {verificationType === "email" ? (
                  <VerifyForm redirect="/account/settings?setting=security"/>
                  
                ) : (
                  <p>Phone Verification Form</p> // Placeholder for phone form
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            {/* Add buttons here if needed */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  