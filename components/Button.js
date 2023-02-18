import React from "react";

export const Button = props => {
  const { title } = props;
  return (
    <div>
      <button
        type="submit"
        className="flex-none rounded bg-blue-500 md:py-3 md:px-7  py-2 px-7 font-Monsterrat font-medium leading-7   tracking-wide text-white  hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 disabled:bg-black  
             disabled:focus:bg-gray-50 "
        {...props}
      >
        {title}
      </button>
    </div>
  );
};
