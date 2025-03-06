import ManageCategory from "@/components/modules/shop/create-category";
import { getAllCategories } from "@/services/shopService/categoryService";


const CategoryManagementPage = async () => {
  // Implement your logic here to fetch data and update the component state
  const { data } = await getAllCategories();

  return (
    <div>
      <ManageCategory categories={data?.data} />
    </div>
  );
};

export default CategoryManagementPage;
