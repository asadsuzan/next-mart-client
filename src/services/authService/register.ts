"use server";

import { FieldValues } from "react-hook-form";

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

        return { success: true, message: "Registration successful!", data: result };
    } catch (error) {
        console.error("Register API Error:", error);
        return { success: false, message: "Something went wrong!" };
    }
}
