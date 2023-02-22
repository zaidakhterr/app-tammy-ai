import classNames from "classnames";
import React from "react";

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={classNames(
        "flex h-10 items-center justify-center rounded bg-blue-600 py-2 px-3 text-center text-white shadow-md shadow-blue-600/20 transition-shadow hover:shadow-lg hover:shadow-blue-600/20 dark:bg-blue-600 md:h-11 md:px-6",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const DangerButton = ({ children, className, ...props }) => {
  return (
    <button
      className={classNames(
        "flex h-10 items-center justify-center rounded bg-red-500 py-2 px-3 text-center text-white shadow-sm shadow-red-600/20 transition-shadow hover:shadow-lg hover:shadow-red-600/20 dark:bg-red-600 md:h-11 md:px-6",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const SecondaryButton = ({ children, className, ...props }) => {
  return (
    <button
      className={classNames(
        "flex h-10 items-center justify-center rounded border border-slate-200 py-2 px-3 text-center shadow-sm transition-shadow hover:shadow-lg dark:border-slate-700 md:h-11 md:px-6",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
