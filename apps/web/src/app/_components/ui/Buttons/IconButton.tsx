import React from "react";

export const IconButton = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <button
      className={` p-2 border border-blue-500 font-normal rounded-full ${className}`}
    >
      {children}
    </button>
  );
};
