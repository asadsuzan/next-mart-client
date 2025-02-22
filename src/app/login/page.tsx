import LoginForm from "@/components/modules/auth/LoginForm";
import BackButton from "@/components/ui/shared/BackButton";

const LoginPage = () => {
  return (
    <div className="container mx-auto min-h-screen w-full flex flex-col justify-center items-center">
      <BackButton />
      <div className="w-auto md:w-[600px] shadow-lg rounded-lg p-10">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
