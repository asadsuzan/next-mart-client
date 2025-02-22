import * as z from "zod";


// ✅ Define the Zod Schema for validation
const registerSchema = z
    .object({
        name: z.string().min(2, "First name must be at least 2 characters"),
        lastName: z.string().min(2, "Last name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        phone: z
            .string()
            .regex(
                /^1\d{9}$/,
                "Phone number must start with '1' and be 10 digits long"
            ),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export default registerSchema;
// ✅ Define the RegisterForm component