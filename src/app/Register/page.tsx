import RegisterForm from "@/components/modules/auth/RegisterForm";
import BackButton from "@/components/ui/shared/BackButton";

const RegisterPage = () => {
  return (
    <div className="container mx-auto min-h-screen w-full flex flex-col justify-center items-center">
      <BackButton />
      <div className="w-auto md:w-[700px] shadow-lg rounded-lg p-10">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
