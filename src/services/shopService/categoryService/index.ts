'use server'

import { cookies } from "next/headers";



// create shop action 
export async function createCategory(data: FormData) {
    try {
        const cookieStore = await cookies()
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category`, {
            method: "POST",
            headers: {
                ...(cookieStore.get('accessToken')?.value && { Authorization: cookieStore.get('accessToken')?.value })
            },
            body: data
        });

        const result = await response.json();

        if (!response.ok) {
            console.log(result)
            return { success: false, message: result.message || "Category create failed" };
        }
        return { success: true, message: "Category created successfully!", data: result };
    } catch (error) {
        console.error("Category created API Error:", error);
        return { success: false, message: "Something went wrong!" };
    }
}