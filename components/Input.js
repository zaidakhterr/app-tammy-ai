import classNames from "classnames";

const Input = ({
  type = "text",
  leftIcon = null,
  className,
  containerClassName,
  ...props
}) => {
  return (
    <div
      className={classNames("relative w-full shadow-sm", containerClassName)}
    >
      <input
        className={classNames(
          "h-10 w-full rounded border-neutral-200 bg-transparent px-3 focus:border-blue-500 dark:border-neutral-700 md:h-11 md:px-4",
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
