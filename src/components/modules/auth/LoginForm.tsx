"use client";

import Logo from "@/app/assets/svgs/Logo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { LoaderCircle } from "lucide-react";
import loginSchema from "./loginValidation";

import { toast } from "sonner";
import { LoginUser } from "@/services/authService";
const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    formState: { isSubmitting },
  } = form;

  const handleSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const res = await LoginUser(data);
      if (!res.success) {
        toast.error(res?.message);
      } else {
        toast.success(res?.message);
        form.reset();
      }
    } catch (error) {
      toast.error("An error occurred while logging in");
    }
  };

  return (
    <Form {...form}>
      <div className="flex items-center gap-5 mb-5 border-b border-[#0F0E0E1A] pb-2">
        <Logo />
        <div>
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-sm">Enter your email and password to sign in.</p>
        </div>
      </div>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="">
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

        <FormItem className="flex justify-between items-center my-1">
          <div className="flex items-center gap-2">
            <Checkbox />
            <span>Remember me</span>
          </div>
          <Link
            href="/forgot-password"
            className="text-sm text-blue-500 hover:text-blue-600"
          >
            Forgot Password?
          </Link>
        </FormItem>

        {/* Submit Button */}
        <FormItem>
          <Button className="w-full mt-5" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <LoaderCircle className="animate-spin " />
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </FormItem>
      </form>

      <div className="flex items-center justify-center flex-col mt-5 gap-5">
        <p className="font-bold">Or Sign In With</p>

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
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary">
            Sign Up
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default LoginForm;
