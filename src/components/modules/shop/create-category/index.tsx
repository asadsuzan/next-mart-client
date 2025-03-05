import { Button } from "@/components/ui/button";
import React from "react";
import CreateCategoryModal from "./CreateCategoryModal";

const ManageCategory = () => {
  return (
    <div className="flex items-center justify-between">
      <h1>Manage Category</h1>
      <CreateCategoryModal />
    </div>
  );
};

export default ManageCategory;
