import React from "react";

function Button({
  children, //this is mainly used here for text but we can pass html elements here
  type = "button",
  bgColor = "bg-green-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`py-2 px-4 rounded-lg ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
