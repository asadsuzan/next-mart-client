import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import React from "react";
import CreateCategoryForm from "./CrateCategoryForm";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";

const CreateCategoryModal = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" className="flex items-center gap-2">
          <PlusCircleIcon />
          create category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <CreateCategoryForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryModal;
