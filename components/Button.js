import classNames from "classnames";
import React from "react";

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={classNames(
        "flex h-10 items-center justify-center rounded bg-blue-500 py-2 px-3 text-center text-white transition-colors hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 md:h-12 md:px-6",
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
        "flex h-10 items-center justify-center rounded bg-red-500 py-2 px-3 text-center text-white transition-colors hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500 md:h-12 md:px-6",
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
        "flex h-10 items-center justify-center rounded border py-2 px-3 text-center shadow-sm transition-colors hover:bg-slate-600/5 dark:border-slate-700 md:h-12 md:px-6",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
