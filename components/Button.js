import classNames from "classnames";
import Link from "next/link";
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

export const OutlineLink = ({ children, className, href = "", ...props }) => {
  return (
    <Link
      href={href}
      className={classNames(
        "flex items-center justify-center rounded border border-blue-500 py-1.5 px-3 text-xs text-blue-600 transition-colors hover:bg-blue-50 dark:border-blue-600 dark:text-blue-500 dark:hover:bg-blue-500/10 md:text-sm",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  ); // return Link element, with props children and className
};

export default Button;
