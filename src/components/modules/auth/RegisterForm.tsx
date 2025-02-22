"use client";

import Logo from "@/app/assets/svgs/Logo";
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
import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import registerSchema from "./registerValidation";

const RegisterForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("1"); // Starts with '1'

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "1", // Ensures phone starts correctly
      password: "",
      confirmPassword: "",
    },
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (input.length <= 10) {
      setPhoneNumber(input); // Only allow 10 digits
      form.setValue("phone", input); // Update form value
    }
  };

  const handleSubmit = (data: z.infer<typeof registerSchema>) => {
    console.log("Form Data:", {
      ...data,
      phone: `+880${data.phone}`, // Append country code before sending
    });
  };

  return (
    <Form {...form}>
      <div className="flex items-center gap-5 mb-5 border-b border-[#0F0E0E1A] pb-2">
        <Logo />
        <div>
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-sm">
            Enter your email and phone number to sign up.
          </p>
        </div>
      </div>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="">
        <div className="flex w-full gap-4">
          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="font-bold">First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="font-bold">Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number with Auto Country Code */}
        <FormField
          control={form.control}
          name="phone"
          render={({}) => (
            <FormItem>
              <FormLabel className="font-bold">Phone Number</FormLabel>
              <div className="flex items-center gap-2">
                <span className="px-3 py-2 bg-gray-200 rounded-md text-sm">
                  +880
                </span>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="1XXXXXXXXX"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <FormItem>
          <Button className="w-full mt-5" type="submit">
            Sign Up
          </Button>
        </FormItem>
      </form>

      <div className="flex items-center justify-center flex-col mt-5 gap-5">
        <p className="font-bold">Or Sign Up With</p>

        <div className="flex gap-3">
          <Button
            className="h-10 w-10 rounded-full"
            type="button"
            variant="secondary"
          >
            <FcGoogle />
          </Button>
          <Button
            className="h-10 w-10 rounded-full"
            type="button"
            variant="secondary"
          >
            <FaFacebookF />
          </Button>
          <Button
            className="h-10 w-10 rounded-full"
            type="button"
            variant="secondary"
          >
            <FaLinkedin />
          </Button>
        </div>

        <p className="text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-primary">
            Sign In
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default RegisterForm;
