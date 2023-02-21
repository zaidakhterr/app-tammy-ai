import Image from "next/image";
import pattern from "@/assets/auth-pattern-2.svg";
import youtubeLogo from "@/assets/youtube.png";
import { LargeLogo } from "./Logo";

const AuthScreenBanner = () => {
  return (
    <div className="relative hidden h-screen w-full lg:block">
      <Image
        src={pattern}
        alt="Pattern"
        className="h-screen w-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
        <LargeLogo />
        <p className="mt-6 flex items-center text-lg text-white">
          <Image
            src={youtubeLogo}
            alt="YouTube Logo"
            className="mr-3 h-auto w-14"
          />
          AI powered summaries
        </p>
      </div>
    </div>
  );
};

export default AuthScreenBanner;
