import React, { useState } from "react";
import Image from "next/image";

export const InputBox = () => {
  const [isValid, setIsValid] = useState(true);

  function isValidYoutubeUrl(url) {
    const pattern = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
    const validate = pattern.test(url);
    return validate;
  }

  function GetUrl({ target }) {
    const { value } = target;
    value === "" ? setIsValid(true) : setIsValid(isValidYoutubeUrl(value));
  }

  return (
    <div>
      <div className=" grid rounded-md border border-solid border-gray-200  md:grid-cols-1 ">
        <div className="col-span-3 sm:col-span-2">
          <div className=" flex shadow-sm">
            <span className="mx-1 inline-flex items-center border-none bg-white  text-sm text-gray-500">
              {" "}
              <Image
                src="/images/youtube.png"
                alt="YouTube logo"
                width={50}
                height={45}
              />
            </span>
            <input
              type="text"
              className="sm:text-md placeholder-sm block  w-full
               flex-1 
              border-none font-Monsterrat 
              text-xl font-thin
              text-slate-900 
              outline-none
               placeholder:font-Monsterrat 
               placeholder:text-xl    
               placeholder:font-[400]
               placeholder:text-slate-300
               focus:border-none
               focus:outline-none md:text-sm
                "
              placeholder="Enter Youtube URL"
              onChange={e => GetUrl(e)}
            />
          </div>
        </div>
      </div>
      <div>
        {" "}
        {!isValid && <p className="text-red-400"> Not a Valid Youtube URL </p>}
      </div>
    </div>
  );
};
