"use client";
import { FieldValues, useForm } from "react-hook-form";
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
import { useState } from "react";
import ImagePreviewer from "@/components/core/MNImageUpLoader/ImagePreviewer";

const CreateShopForm = () => {
  const [images, setImages] = useState<File[] | []>([]);
  const [previewImages, setPreviewImages] = useState<string[] | []>([]);

  const form = useForm({
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

  const onSubmit = (data: FieldValues) => {
    console.log(data);
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
                  <Input placeholder="Enter contact number" {...field} />
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
                  <Input placeholder="Enter facebook URL" {...field} />
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
                  <Input placeholder="Enter instagram URL" {...field} />
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
                  <Input placeholder="Enter twitter URL" {...field} />
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
