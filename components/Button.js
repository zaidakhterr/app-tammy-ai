import classNames from "classnames";
import React from "react";

export const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={classNames(
        "flex h-12 items-center justify-center rounded bg-blue-500 py-2 px-4 text-center text-white transition-colors hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 md:px-6",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
