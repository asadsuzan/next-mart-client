"use client";

import { getCurrentUser } from "@/services/authService";
import { TUser } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext<{
  user: TUser | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  refreshUser: () => Promise<void>;
  // Fetch user data on component mount
}>({
  user: null,
  loading: true,
  setUser: () => {},
  setLoading: () => {},
  refreshUser: async () => {},
});

interface TUserProviderProps {
  children: React.ReactNode;
}
const UserProvider = ({ children }: TUserProviderProps) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to refresh user data
  const refreshUser = async () => {
    try {
      const res = await getCurrentUser();
      if (res) {
        setUser(res as TUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to refresh user data:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     // Fetch user data from backend
  //     const userInfo = await getCurrentUser();
  //     if (userInfo) {
  //       setUser(userInfo as TUser);
  //     } else {
  //       setUser(null);
  //     }

  //     setLoading(false);
  //   })();
  // }, [loading]);

  useEffect(() => {
    refreshUser();
  }, [loading]);
  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        setUser, // Placeholder for updating user state
        setLoading, // Placeholder for updating loading state
        refreshUser, // Function to refresh user data
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
};

export default UserProvider;
