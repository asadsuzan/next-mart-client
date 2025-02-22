"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const BackButton = ({ label = "Back" }: { label?: string }) => {
  const router = useRouter();

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      onClick={() => router.back()}
    >
      <ArrowLeft size={18} />
      {label}
    </Button>
  );
};

export default BackButton;
