"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { parseISO, isDate } from "date-fns";

import { useAuth } from "@/hooks/auth/useAuth";
import { register } from "module";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  firstName: z.string().min(2, { message: "Minimum 2 characters" }).max(50),
  lastName: z.string().min(2, { message: "Minimum 2 characters" }).max(50),
  email: z.string().email({ message: "Enter a valid email" }).max(50),
  password: z.string().min(6, { message: "Minimum 6 characters" }).max(50),
  gender: z.enum(["male", "female"]),
  dob: z
    .string()
    .refine(
      (date) => {
        const parsedDate = parseISO(date);
        return isDate(parsedDate) && parsedDate <= new Date();
      },
      { message: "Enter a valid date that is not in the future" }
    ),
});

export function RegisterForm() {
  const { register, loading, isError, error, success } = useAuth()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "male",
      dob: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    register({
      name: {
        firstName: values.firstName,
        lastName: values.lastName,
      },
      email: values.email,
      password: values.password,
      demographic: {
        gender: values.gender,
        dateOfBirth: parseISO(values.dob),
      },
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="w-full grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="someone@domain.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="SecurePassword123!"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Choose your gender</SelectLabel>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => {
                      const dateValue = e.target.value;
                      field.onChange(dateValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 w-full ">
          <div><Button type="submit">Submit</Button></div>
          <Link href={'?login=true'}><div className="flex justify-end"><Button variant={"ghost"}>Have an account <span><ArrowRight size={20}/></span></Button></div></Link>
        </div>
        <div className="py-8">
          <p className="text-sm opacity-70 text-center">By signing up you agree to our terms and privacy</p>
        </div>
      </form>
    </Form>
  );
}
