import * as z from "zod";


// ✅ Define the Zod Schema for login validation
const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),

})


export default loginSchema;
