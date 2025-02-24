"use client";

import { getCurrentUser } from "@/services/authService";
import { TUser } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext({});

interface TUserProviderProps {
  children: React.ReactNode;
}
const UserProvider = ({ children }: TUserProviderProps) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      // Fetch user data from backend
      const userInfo = await getCurrentUser();
      if (userInfo) {
        setUser(userInfo as TUser);
      } else {
        setUser(null);
      }

      setLoading(false);
    })();
  }, []);
  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        setUser, // Placeholder for updating user state
        setLoading, // Placeholder for updating loading state
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export default UserProvider;
