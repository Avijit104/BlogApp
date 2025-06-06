import React, { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { type = "text", labelText, className = "", ...props },
  ref
) {
  const id = useId();
  console.log("props",props)
  return (
    <div className="w-full">
      {labelText && (
        <label className="inline-block text-black mb-1 pl-1" htmlFor={id}>
          {labelText}
        </label>
      )}
      <input
        type={type}
        className={` px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
