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
  email: z.string().email({ message: "Enter a valid email" }).max(50),
  password: z.string().min(6, { message: "Minimum 6 characters" }).max(50),
});

export function LoginForm() {
  const { login, loading, isError, error, success } = useAuth()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {

      email: "",
      password: "",
 
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    login({
        email: values.email,
        password: values.password
    })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <div className="grid grid-cols-2 w-full ">
          <div><Button type="submit">Submit</Button></div>
          <Link href={'?login=false'}><div className="flex justify-end"><Button variant={"ghost"}>Create an account <span><ArrowRight size={20}/></span></Button></div></Link>
        </div>
      </form>
    </Form>
  );
}
