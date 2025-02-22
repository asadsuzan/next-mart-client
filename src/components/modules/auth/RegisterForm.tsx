"use client";

import Logo from "@/app/assets/svgs/Logo";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { FieldValues, useForm } from "react-hook-form";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const RegisterForm = () => {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
        password: ""
      }
  });
  const handleSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <div className="flex items-center gap-5 mb-5 border-b border-[#0F0E0E1A] pb-2">
        <Logo/>
        <div>
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p className="text-sm ">
            Enter your email and phone number to sign up.
            </p>
        </div>
      </div>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className=""
      >
        <div className="flex w-full  gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="font-bold">First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="font-bold">Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormDescription />
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
              <FormLabel className="font-bold">Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Phone Number</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Phone Number" {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <Button className="w-full" type="submit">
            Sign Up
          </Button>
        </FormItem>
      </form>

      <div className="flex items-center justify-center flex-col mt-5 gap-5">
        <p className="font-bold">Or Sign Up With</p>
        
        <div className="flex gap-3">
            <Button className="h-10 w-10 rounded-full" type="button" variant="secondary">
            <FcGoogle />
            </Button>
            <Button className="h-10 w-10 rounded-full" type="button" variant="secondary">
            <FaFacebookF />
            </Button>
            <Button className="h-10 w-10 rounded-full" type="button" variant="secondary">
            <FaLinkedin />
            </Button>
        </div>

        <p className="text-sm">
          Already have an account?{" "}
          <Link href="#" className="text-primary">
            Sign In
          </Link>
</p>
      </div>
    </Form>
  );
};

export default RegisterForm;
