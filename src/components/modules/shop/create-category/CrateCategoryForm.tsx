"use client";

import Logo from "@/app/assets/svgs/Logo";
import ImageUploader from "@/components/core/MNImageUpLoader";
import ImagePreviewer from "@/components/core/MNImageUpLoader/ImagePreviewer";
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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";

const CreateCategoryForm = () => {
  const [images, setImages] = useState<File[] | []>([]);
  const [previewImages, setPreviewImages] = useState<string[] | []>([]);
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const {
    formState: { isSubmitting },
  } = form;

  const handleSubmit = async () => {};

  return (
    <Form {...form}>
      <div className="flex items-center gap-5  border-b border-[#0F0E0E1A] pb-2">
        <Logo />
        <div>
          <p className="text-sm">Crate product category.</p>
        </div>
      </div>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="">
        {/* name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Category Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Category Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem className="mt-3">
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

          
        </FormItem>

        {/* Submit Button */}
        <FormItem>
          <Button className="w-full mt-5" type="submit">
            Create Category
            {isSubmitting && (
              <span className="ml-2 text-gray-500">Loading...</span>
            )}
          </Button>
        </FormItem>
      </form>
    </Form>
  );
};

export default CreateCategoryForm;
