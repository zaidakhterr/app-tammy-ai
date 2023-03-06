import useAuth from "@/utils/useAuth";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import React from "react";

export const Banner = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }
  return (
    <a
      href="#"
      className="flex w-screen items-center justify-center gap-3 bg-blue-600 p-1.5 text-center text-sm text-white "
    >
      <p> Download the Chrome Extention </p>
      <IconArrowNarrowRight className="h-5 w-5 " />
    </a>
  );
};
