"use client";
import React from "react";
import CreateCategoryModal from "./CreateCategoryModal";
import { ICategory } from "@/types";
import { MNTable } from "@/components/core/MNTable";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Trash } from "lucide-react";
import { deleteCategory } from "@/services/shopService/categoryService";
import { toast } from "sonner";

interface TManageCategoriesProps {
  categories: ICategory[];
}

const ManageCategory = ({ categories }: TManageCategoriesProps) => {
  const handleDelete = async (categoryId: string) => {
    const isDeleted = await deleteCategory(categoryId);
    if (isDeleted.success) {
      toast.success("Category deleted successfully.");
    } else {
      toast.error("Failed to delete category.");
    }
  };
  const columns: ColumnDef<ICategory>[] = [
    {
      accessorKey: "name",
      header: () => <div>Category Name</div>,
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row?.original?.icon || "/path/to/fallback/image.png"}
            alt={row.original.name}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span className="truncate">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "isActive",
      header: () => <div>isActive</div>,
      cell: ({ row }) => (
        <div>
          {row.original.isActive ? (
            <p className="text-green-500 border bg-green-100 w-14 text-center px-1 rounded">
              True
            </p>
          ) : (
            <p className="text-red-500 border bg-red-100 w-14 text-center px-1 rounded">
              False
            </p>
          )}
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: () => <div>Action</div>,
      cell: ({ row }) => (
        <button
          className="text-red-500"
          title="Delete"
          onClick={() => handleDelete(row?.original?._id)}
        >
          <Trash className="w-5 h-5" />
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1>Manage Category</h1>
        <CreateCategoryModal />
      </div>
      <div>
        <MNTable data={categories} columns={columns} />
      </div>
    </div>
  );
};

export default ManageCategory;
