import React from "react";

function Button({
  childern, //this is mainly used here for text but we can pass html elements here
  type = "button",
  bgColor = "bg-green-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`py-2 px-4 rounded-lg ${bgColor} ${textColor} ${className}`}
      type={type}
      {...props}
    >
      {childern}
    </button>
  );
}

export default Button;
