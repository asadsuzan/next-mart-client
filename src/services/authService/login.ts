"use server";

import { cookies } from "next/headers";
// import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export async function LoginUser(data: FieldValues) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            return { success: false, message: result.message || "Login failed" };
        }

        const cookieStore = await cookies()
        cookieStore.set("accessToken", result?.data?.accessToken, { path: "/" });
        return { success: true, message: "Login successful!", data: result };

    } catch (error) {
        console.error("Login API Error:", error);
        return { success: false, message: "Something went wrong!" };
    }
}
