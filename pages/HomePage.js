import { Button } from "@/components/Button";
import { InputBox } from "@/components/InputBox";
import React, { useEffect, useState } from "react";

const Homepage = () => {
  const [valid, setvalid] = useState(true);

  useEffect(() => {}, [valid]);

  return (
    <>
      <div className="my-5  md:flex  md:justify-center">
        <div className="sm:w-screen  md:w-1/2">
          <InputBox isValidProp={setvalid} />
        </div>
        <div className=" sm:w-2/2 my-4 md:mx-5 md:my-0   ">
          <Button title="Summarize" DisableStatus={valid} />
        </div>
      </div>
    </>
  );
};

export default Homepage;
