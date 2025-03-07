"use client";
import { useUser } from "@/context/UserContext";
import React from "react";

const DashboardPage = () => {
  const user = useUser();
  console.log(user);

  return (
    <div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
    </div>
  );
};

export default DashboardPage;
