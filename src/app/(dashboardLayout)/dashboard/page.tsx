"use client";
import { useUser } from "@/context/UserContext";
import React from "react";

const DashboardPage = () => {
  const user = useUser();
  console.log(user);

  return <div>DashboardPage</div>;
};

export default DashboardPage;
