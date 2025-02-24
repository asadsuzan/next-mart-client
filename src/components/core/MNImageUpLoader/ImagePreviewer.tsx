"use client";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

interface TImagePreviewerProps {
  previewImages: string[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  setPreviewImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const ImagePreviewer = ({
  previewImages,
  setImages,
  setPreviewImages,
}: TImagePreviewerProps) => {
  return (
    <div className="flex justify-center items-center gap-2 w-full border">
      {previewImages?.map((image, index) => (
        <div key={index} className="relative">
          <Image src={image} alt="image" width={100} height={100} />
          <Button
            variant="outline"
            className="absolute top-0 right-0 rounded-full h-[10px] w-[10px] text-sm text-red-500 hover:text-red-600"
            onClick={() => {
              setImages((prevImages) =>
                prevImages.filter((_, i) => i !== index)
              );
              setPreviewImages((prevPreviewImages) =>
                prevPreviewImages.filter((_, i) => i !== index)
              );
            }}
          >
            <X size={16} />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ImagePreviewer;
