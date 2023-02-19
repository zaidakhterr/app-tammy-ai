import classNames from "classnames";
import React from "react";

const Input = ({
  type = "text",
  leftIcon = null,
  className,
  containerClassName,
  ...props
}) => {
  return (
    <div className={classNames("relative", containerClassName)}>
      <input
        className={classNames(
          "h-12 w-full rounded-md border-slate-300 bg-transparent px-2 focus:border-blue-800 dark:border-slate-700",
          className
        )}
        type={type}
        {...props}
      />
      {leftIcon && (
        <div className="absolute inset-y-0 left-0 flex items-center">
          {leftIcon}
        </div>
      )}
    </div>
  );
};

export default Input;
