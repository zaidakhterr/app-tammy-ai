import classNames from "classnames";
import React from "react";

const Container = ({ children, className = "" }) => {
  return (
    <div
      className={classNames("mx-auto max-w-desktop px-4 md:px-8", className)}
    >
      {children}
    </div>
  );
};

export default Container;
