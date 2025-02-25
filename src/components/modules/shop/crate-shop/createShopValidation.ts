import * as z from "zod";
import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";

// Helper function to validate phone number based on country code
const validatePhoneNumber = (value: string, countryCode: string) => {
    if (!value) return false; // Skip validation if the field is empty
    const phoneNumber = parsePhoneNumberFromString(value, countryCode as CountryCode);
    return phoneNumber?.isValid() || false;
};

// Define the Zod Schema for crate shop validation
export const createShopSchema = (countryCode: string) =>
    z.object({
        shopName: z.string().min(3, "Shop name must be at least 3 characters"),
        businessLicenseNumber: z
            .string()
            .min(10, "Business license number must be at least 10 characters"),
        address: z.string().min(5, "Address must be at least 5 characters"),
        contactNumber: z
            .string()
            .refine(
                (value) => validatePhoneNumber(value, countryCode),
                "Invalid phone number for the selected country"
            ),
        website: z.string().url("Please provide a valid URL").optional(),
        servicesOffered: z
            .string()
            .min(10, "Services offered must be at least 10 characters"),
        establishedYear: z.string().regex(/^\d{4}$/, "Please provide a valid year"),
        taxIdentificationNumber: z
            .string()
            .min(10, "Tax identification number must be at least 10 characters"),
        socialMediaLinks: z
            .object({
                facebook: z.string().url("Please provide a valid Facebook URL").optional(),
                twitter: z.string().url("Please provide a valid Twitter URL").optional(),
                instagram: z.string().url("Please provide a valid Instagram URL").optional(),
            })
            .optional(),
    });

export default createShopSchema;