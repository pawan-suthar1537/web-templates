import React from "react";
import DashboardHeader from "./DashboardHeader";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <div className="min-h-screen w-full bg-muted/20">
        <DashboardHeader/>
        <div className="p-4 sm:ml-80 lg:p-8">
          <div className="min-h-[calc(100vh-4rem)] rounded-2xl border border-border bg-background p-4 shadow-xs sm:p-6">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
