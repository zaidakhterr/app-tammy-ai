import classNames from "classnames";
import React from "react";

const Select = ({
  leftIcon = null,
  className,
  containerClassName,
  options = [],
  placeholder,
  ...props
}) => {
  return (
    <div className={classNames("relative shadow-sm", containerClassName)}>
      <select
        className={classNames(
          "h-10 w-full rounded-md border-slate-300 bg-transparent px-3 focus:border-blue-500 dark:border-slate-700 md:h-12 md:px-4",
          className
        )}
        {...props}
      >
        <option value="">{placeholder || "Select"}</option>
        {options.map((option, idx) => (
          <option key={idx} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {leftIcon && (
        <div className="absolute inset-y-0 left-0 flex items-center">
          {leftIcon}
        </div>
      )}
    </div>
  );
};

export default Select;
