import React, { forwardRef, useId } from "react";

function Select({ options = [], labelText, className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full text-black">
      {labelText && <label htmlFor={id} className="">{labelText}</label>}
      <select
        name={id}
        id={id}
        className={`px-3 py-2 rounded-lg bg-white text-black focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        {...props}
        ref={ref}
      >
        {options?.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(Select);
