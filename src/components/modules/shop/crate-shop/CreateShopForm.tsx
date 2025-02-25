"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ImageUploader from "@/components/core/MNImageUpLoader";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import ImagePreviewer from "@/components/core/MNImageUpLoader/ImagePreviewer";
import { crateShop } from "@/services/shopService";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import createShopSchema from "./createShopValidation";
import { getCountryCode } from "@/lib/utils";
import { useRouter } from "next/navigation";

const CreateShopForm = () => {
  const [images, setImages] = useState<File[] | []>([]);
  const [previewImages, setPreviewImages] = useState<string[] | []>([]);
  const [countryCode, setCountryCode] = useState<string>("US"); // Default to US

  // Detect user's country code on component mount
  useEffect(() => {
    const detectCountry = async () => {
      const code = await getCountryCode();
      setCountryCode(code);
    };
    detectCountry();
  }, []);
  const router = useRouter();
  const form = useForm<z.infer<ReturnType<typeof createShopSchema>>>({
    resolver: zodResolver(createShopSchema(countryCode)), // Pass countryCode to schema
    defaultValues: {
      shopName: "",
      businessLicenseNumber: "",
      address: "",
      contactNumber: "",
      website: "",
      servicesOffered: "",
      establishedYear: "",
      socialMediaLinks: {
        facebook: "",
        twitter: "",
        instagram: "",
      },
      taxIdentificationNumber: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const servicesOffered: string[] = data?.servicesOffered
      ?.trim()
      ?.split(",")
      ?.map((item: string) => item?.trim())
      ?.filter((item: string) => {
        return item?.trim() !== "";
      });

    const socialMediaLinks: { [key: string]: string } = {
      facebook: data?.socialMediaLinks?.facebook.trim(),
      twitter: data?.socialMediaLinks?.twitter.trim(),
      instagram: data?.socialMediaLinks?.instagram.trim(),
    };
    const establishedYear = Number(data?.establishedYear);

    const shopData = {
      shopName: data?.shopName,
      businessLicenseNumber: data?.businessLicenseNumber,
      address: data?.address,
      contactNumber: data?.contactNumber,
      website: data?.website,
      servicesOffered: servicesOffered || [],
      establishedYear,
      socialMediaLinks,
      taxIdentificationNumber: data?.taxIdentificationNumber,
    };
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(shopData));
      formData.append("logo", images[0] as File);
      const res = await crateShop(formData);
      if (res.success) {
        toast.success(res?.message);
        form.reset();
        router.push("/");
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error("An error occurred while creating the shop");
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="shopName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Shop Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter shop name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessLicenseNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">
                  Business License Number
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter business license number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Contact Number</FormLabel>
                <FormControl>
                  <PhoneInput
                    placeholder="Enter contact number"
                    value={field.value}
                    onChange={field.onChange}
                    defaultCountry={countryCode as any}
                    international
                    withCountryCallingCode
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Website</FormLabel>
                <FormControl>
                  <Input placeholder="Enter website URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="socialMediaLinks.facebook"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Facebook</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Facebook URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="socialMediaLinks.instagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Instagram</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Instagram URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="socialMediaLinks.twitter"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Twitter</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Twitter URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="servicesOffered"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Services Offered</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter services separated by commas"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="establishedYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Established Year</FormLabel>
                <FormControl>
                  <Input placeholder="Enter year" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="taxIdentificationNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">
                  Tax Identification Number
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter tax ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {previewImages?.length > 0 ? (
          <ImagePreviewer
            previewImages={previewImages}
            setPreviewImages={setPreviewImages}
            setImages={setImages}
          />
        ) : (
          <ImageUploader
            setImages={setImages}
            setPreviewImages={setPreviewImages}
          />
        )}

        <Button className="w-full mt-5" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating Shop..." : "Create Shop"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateShopForm;
