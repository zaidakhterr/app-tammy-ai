import Image from "next/image";
import pattern from "@/assets/auth-pattern-2.svg";
import google from "@/assets/google.svg";
import facebook from "@/assets/facebook.svg";
import { Button } from "@/components/Button";
import { useRouter } from "next/router";
import Input from "@/components/Input";
import Link from "next/link";

const GoogleButton = () => {
  return (
    <button className="relative flex h-12 w-full items-center justify-center rounded border py-2 px-4 text-center shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 md:px-6">
      <span className="absolute inset-y-0 left-0 flex items-center pl-4">
        <Image src={google} alt="Google" className="" />
      </span>
      Continue with Google
    </button>
  );
};

const FacebookButton = () => {
  return (
    <button className="relative flex h-12 w-full items-center justify-center rounded border py-2 px-4 text-center shadow-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 md:px-6">
      <span className="absolute inset-y-0 left-0 flex items-center pl-4">
        <Image src={facebook} alt="Facebook" className="" />
      </span>
      Continue with Facebook
    </button>
  );
};

const RegisterForm = () => {
  const router = useRouter();

  const onSubmit = e => {
    e.preventDefault();
    console.log("Submitted");
    router.push("/");
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-4">
      <Input type="email" placeholder="Email" containerClassName="w-full" />
      <Input
        type="password"
        placeholder="Password"
        containerClassName="w-full"
      />
      <Button type="submit">Get Started for Free</Button>
    </form>
  );
};

export default function Register() {
  return (
    <div className="grid h-screen grid-cols-1 lg:grid-cols-2 lg:overflow-clip">
      <div className="mx-auto flex w-full max-w-sm flex-col items-center justify-center gap-4 p-4">
        <h1 className="mb-6 text-3xl font-black">Sign Up for Tammy AI</h1>
        <GoogleButton />
        <FacebookButton />
        <div className="my-3 flex w-full items-center">
          <span className="h-px w-full bg-slate-200 dark:bg-slate-800" />
          <span className="px-2 text-sm text-slate-400 dark:text-slate-700">
            OR
          </span>
          <span className="h-px w-full bg-slate-200 dark:bg-slate-800" />
        </div>
        <RegisterForm />
        <p className="mt-10">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Login Here
          </Link>
        </p>
      </div>
      <Image
        src={pattern}
        alt="Pattern"
        className="hidden h-screen w-full object-cover lg:block"
      />
    </div>
  );
}
