import { IconSquareCheckFilled } from "@tabler/icons-react";
import React from "react";
import Balancer from "react-wrap-balancer";
export const SellingPoint = ({ text }) => {
  return (
    <div className="flex gap-2 ">
      <IconSquareCheckFilled className=" border-t-black text-green-600 dark:text-green-400 " />
      <Balancer>
        <p> {text ? text : "10x your learning speed"} </p>
      </Balancer>
    </div>
  );
};
