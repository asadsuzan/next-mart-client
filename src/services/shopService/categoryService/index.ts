'use server'

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";



// create category action 
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
        revalidateTag('CATEGORY')


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

// get all categories action

export async function getAllCategories() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category`, {
            next: {
                tags: ['CATEGORY']
            }
        });

        const result = await response.json();


        if (!response.ok) {
            console.log(result)
            return { success: false, message: result.message || "Failed to fetch categories" };
        }
        return { success: true, message: "Categories fetched successfully!", data: result };
    } catch (error) {
        console.error("Failed to fetch categories API Error:", error);
        return { success: false, message: "Something went wrong!" };
    }
}

// delete category action

export async function deleteCategory(categoryId: string) {
    try {
        const cookieStore = await cookies()
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/${categoryId}`, {
            method: "DELETE",
            headers: {
                ...(cookieStore.get('accessToken')?.value && { Authorization: cookieStore.get('accessToken')?.value })
            }
        });

        const result = await response.json();

        revalidateTag('CATEGORY')

        if (!response.ok) {
            console.log(result)
            return { success: false, message: result.message || "Failed to delete category" };
        }
        return { success: true, message: "Category deleted successfully!" };
    } catch (error) {
        console.error("Failed to delete category API Error:", error);
        return { success: false, message: "Something went wrong!" };
    }
}

