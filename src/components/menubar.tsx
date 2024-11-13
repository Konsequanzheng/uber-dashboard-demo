import React from "react";
import TimeButtons from "./timeButtons";

const Menubar = () => {
  return (
    <div className="p-4 bg-background border border-border rounded-xl transition-opacity fixed bottom-10 left-1/2 transform -translate-x-1/2 flex flex-row gap-2 md:hidden">
      <TimeButtons />
    </div>
  );
};

export default Menubar;
