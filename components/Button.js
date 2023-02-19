import classNames from "classnames";
import React from "react";

export const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={classNames(
        "flex-none rounded bg-blue-500 py-2 px-7 font-medium leading-7 tracking-wide text-white hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 disabled:bg-black disabled:focus:bg-gray-50 md:py-3 md:px-7",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
