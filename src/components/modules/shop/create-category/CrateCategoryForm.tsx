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
import { createCategory } from "@/services/shopService/categoryService";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircleIcon } from "lucide-react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { createCategorySchema } from "./createCategoryValidation";

const CreateCategoryForm = () => {
  const [images, setImages] = useState<File[] | []>([]);
  const [previewImages, setPreviewImages] = useState<string[] | []>([]);
  const form = useForm({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const {
    formState: { isSubmitting },
  } = form;

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("icon", images[0] as File);
      const res = await createCategory(formData);
      if (res.success) {
        toast.success(res?.message);
        form.reset();
        setImages([]);
        setPreviewImages([]);
        setImages([]);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error("An error occurred while creating the product category");
    }
  };

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
          <Button className="w-full mt-5" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <LoaderCircleIcon className="animate-spin " />
              </>
            ) : (
              "Create Category"
            )}
          </Button>
        </FormItem>
      </form>
    </Form>
  );
};

export default CreateCategoryForm;
