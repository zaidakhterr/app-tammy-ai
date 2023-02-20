import { PaintBrushIcon } from "@heroicons/react/24/outline";
import React from "react";

const Logo = () => {
  return (
    <p className="flex items-center text-lg font-black text-blue-500 dark:text-blue-500 md:text-xl">
      <PaintBrushIcon className="mr-2 h-6 w-6 stroke-blue-500" />
      tammy
      <span className="font-normal text-blue-500 dark:text-blue-500">.ai</span>
    </p>
  );
};

export const LargeLogo = () => {
  return (
    <p className="flex items-center text-6xl font-black text-white dark:text-white">
      <PaintBrushIcon className="mr-4 h-16 w-16 stroke-white stroke-2" />
      tammy
      <span className="font-normal text-white dark:text-white">.ai</span>
    </p>
  );
};

export default Logo;
