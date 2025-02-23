import Footer from "@/components/ui/shared/Footer";
import Navbar from "@/components/ui/shared/NavBar";
import { getCurrentUser } from "@/services/authService";

interface ICommonLayoutProps {
  children: React.ReactNode;
}

const CommonLayout = async ({ children }: ICommonLayoutProps) => {
  const currentUser = await getCurrentUser();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default CommonLayout;
