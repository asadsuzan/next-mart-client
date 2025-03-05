import { z } from "zod"


export const createCategorySchema = z.object({
    name: z.string().min(2, "Category name must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
})