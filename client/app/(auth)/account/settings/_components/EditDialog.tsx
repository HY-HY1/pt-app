// DialogDemo.tsx

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { Plus, Edit } from "lucide-react";

interface Field {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
}

interface DialogDemoProps {
  title: string;
  description: string;
  fields: Field[];
  onSave: () => void;
}

export function EditDialog({ title, description, fields, onSave }: DialogDemoProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Change <span><Edit/></span> </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit {title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {fields.map((field, index) => (
            <div key={index} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={field.label} className="text-right">
                {field.label}
              </Label>
              <Input
                id={field.label}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                className="col-span-3"
              />
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button type="button" onClick={onSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
