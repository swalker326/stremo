import React from "react";

export const Button = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <button className={` p-2 bg-blue-500 font-normal rounded-md ${className}`}>
      {children}
    </button>
  );
};
