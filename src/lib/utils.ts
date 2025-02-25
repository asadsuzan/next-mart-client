import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



/**
 * Detects the user's country code based on their IP address.
 * @returns {Promise<string>} - The country code (e.g., "US", "IN", "GB").
 */
export const getCountryCode = async (): Promise<string> => {
  try {
    // Fetch the user's location data based on their IP address
    const response = await fetch("https://ipapi.co/json/");
    if (!response.ok) {
      throw new Error("Failed to fetch country code data");
    }

    // Parse the JSON response
    const data = await response.json();

    // Extract and return the country code
    const countryCode = data.country_code;
    if (!countryCode) {
      throw new Error("Country code not found in response");
    }

    return countryCode;
  } catch (error) {
    console.error("Error detecting country code:", error);

    // Fallback to a default country code (e.g., "US") if the API fails
    return "BD";
  }
};