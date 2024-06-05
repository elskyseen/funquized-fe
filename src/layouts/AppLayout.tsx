import React from "react";

const AppLayout: React.FC<{ children: any }> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-primary flex flex-col items-center">
      {children}
    </div>
  );
};

export default AppLayout;
