import CreateShopForm from "@/components/modules/shop/crate-shop/CreateShopForm";

const CreateShopPage = () => {
  return (
    <div className="container mx-auto min-h-screen w-full flex flex-col justify-center items-center my-10">
      <div className="w-auto md:w-[700px] shadow-lg rounded-lg p-10">
        <CreateShopForm />
      </div>
    </div>
  );
};

export default CreateShopPage;
