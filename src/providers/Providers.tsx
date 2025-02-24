"use client";

import UserProvider from "@/context/UserContext";

interface ProvidersProps {
  children: React.ReactNode;
}
const Providers = ({ children }: ProvidersProps) => {
  return <UserProvider>{children}</UserProvider>;
};

export default Providers;
