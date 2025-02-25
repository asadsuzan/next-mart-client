'use server'

import { cookies } from "next/headers";



// create shop action 
export async function crateShop(data: FormData) {
    try {
        const cookieStore = await cookies()
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/shop`, {
            method: "POST",
            headers: {
                ...(cookieStore.get('accessToken')?.value && { Authorization: cookieStore.get('accessToken')?.value })
            },
            body: data
        });

        const result = await response.json();

        if (!response.ok) {
            console.log(result)
            return { success: false, message: result.message || "Shop create failed" };
        }
        return { success: true, message: "Shop created successfully!", data: result };
    } catch (error) {
        console.error("Shop created API Error:", error);
        return { success: false, message: "Something went wrong!" };
    }
}