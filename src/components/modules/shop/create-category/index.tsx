import React from "react";
import CreateCategoryModal from "./CreateCategoryModal";
import { ICategory } from "@/types";

interface TManageCategoriesProps {
  categories: ICategory[];
}

const ManageCategory = ({
  categories,
}: {
  categories: TManageCategoriesProps;
}) => {
  console.log(categories);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1>Manage Category</h1>
        <CreateCategoryModal />
      </div>
    </div>
  );
};

export default ManageCategory;
