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
    <div className={classNames("relative shadow-sm", containerClassName)}>
      <input
        className={classNames(
          "h-10 w-full rounded border-slate-300 bg-transparent px-3 focus:border-blue-500 dark:border-slate-700 md:h-12 md:px-4",
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
