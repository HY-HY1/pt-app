"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/auth/useAuth"
import { useEffect } from "react"
import { useAccount } from "@/hooks/auth/useAccount"


const formSchema = z.object({
  code: z.string()
})

interface VerifyProps {
  redirect?: string
}

export function VerifyForm({ redirect }: VerifyProps ) {

  const { user } = useAccount()
  const { verifyRequest } = useAuth()

  useEffect(() => {
    if (!user?.emailVerified) {
      const createCode = async () => {
        await verifyRequest();
      };
      createCode();
    }
  }, [user, verifyRequest]);

    const { verify, isError, error } = useAuth()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            code: "0",
        },
      })
     
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof formSchema>) {
        const intCode = parseInt(values.code)
        verify(intCode, redirect || "/dashboard")
        console.log(values)
      }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter Code</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This code expires in 1 hour.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
