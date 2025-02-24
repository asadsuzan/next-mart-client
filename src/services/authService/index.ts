'use server'

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";


// register user action 
export async function registerUser(data: FieldValues) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            return { success: false, message: result.message || "Registration failed" };
        }
        const cookieStore = await cookies()
        cookieStore.set("accessToken", result?.data?.accessToken, { path: "/" });
        return { success: true, message: "Registration successful!", data: result };
    } catch (error) {
        console.error("Register API Error:", error);
        return { success: false, message: "Something went wrong!" };
    }
}


// login user action 
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


// get current user information 
export const getCurrentUser = async () => {
    try {
        const cookieStore = await cookies()
        const accessToken = cookieStore.get("accessToken")?.value

        if (accessToken) {
            const decoded = jwtDecode(accessToken)
            console.log(decoded)
            return decoded
        }
    } catch (error) {
        console.error("Failed to get user information:", error);
        return null
    }
}

// google recaptcha verification

export const verifyGoogleReCaptcha = async (token: string) => {
    try {
        const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                secret: process.env.NEXT_PUBLIC_SERVER_KEY!,
                response: token,
            })
        });

        const result = await response.json();

        if (!response.ok) {
            return { success: false, message: result.message || "Failed to verify reCAPTCHA" };
        }

        return { success: true, message: "ReCAPTCHA verification successful!" };
    } catch (error) {
        console.error("ReCAPTCHA verification API Error:", error);
        return { success: false, message: "Something went wrong!" };
    }
}