"use client";

import { Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { UploadCloud } from "lucide-react";

interface TImageUploaderProps {
  setImages: Dispatch<SetStateAction<[] | File[]>>;
  setPreviewImages: Dispatch<SetStateAction<string[] | []>>;
}

const ImageUploader = ({
  setImages,
  setPreviewImages,
}: TImageUploaderProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files![0];
    if (file) {
      setImages((prevImg) => [...prevImg, file]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImages((prevPreview) => [
          ...prevPreview,
          reader?.result as string,
        ]);
      };
      reader.readAsDataURL(file);
    }

    e.target.value = "";
  };

  return (
    <div className="flex flex-col items-center gap-4 border p-4 rounded-md w-full ">
      <label className="cursor-pointer flex flex-col items-center gap-2 text-gray-500 border border-dashed p-4 rounded-md w-full">
        <UploadCloud size={32} />
        <span className="text-sm">Click to upload or drag and drop</span>
        <Input
          type="file"
          accept="image/*"
          className="hidden"
          multiple
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default ImageUploader;
