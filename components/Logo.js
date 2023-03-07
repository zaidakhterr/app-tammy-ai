import { IconCircleLetterT } from "@tabler/icons-react";

const Logo = () => {
  return (
    <p className="flex items-center text-xl font-black text-blue-600 dark:text-white md:text-2xl">
      <IconCircleLetterT className="mr-1 h-7 w-7 stroke-blue-600 dark:stroke-white" />
      Tammy
      <span className="font-normal text-blue-600 dark:text-white">.Ai</span>
    </p>
  );
};

export const IconLogo = () => {
  return (
    <p className="flex items-center text-xl font-black text-blue-600 dark:text-white md:text-2xl">
      <IconCircleLetterT className="h-8 w-8 stroke-blue-600 dark:stroke-white" />
    </p>
  );
};

export const LargeLogo = () => {
  return (
    <p className="flex items-center text-6xl font-black text-white dark:text-white">
      <IconCircleLetterT className="mr-4 h-16 w-16 stroke-white stroke-2" />
      tammy
      <span className="font-normal text-white dark:text-white">.ai</span>
    </p>
  );
};

export default Logo;
