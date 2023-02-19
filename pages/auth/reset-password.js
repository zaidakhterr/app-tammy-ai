import Image from "next/image";
import pattern from "@/assets/auth-pattern-2.svg";
import { Button } from "@/components/Button";
import { useRouter } from "next/router";
import Input from "@/components/Input";
import Logo from "@/components/Logo";

const ResetPasswordForm = () => {
  const router = useRouter();

  const onSubmit = e => {
    e.preventDefault();
    console.log("Submitted");
    router.push("/");
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-4">
      <Input
        type="password"
        placeholder="New Password"
        containerClassName="w-full"
      />
      <Input
        type="password"
        placeholder="Confirm Password"
        containerClassName="w-full"
      />
      <Button type="submit">Reset</Button>
    </form>
  );
};

export default function ResetPassword() {
  return (
    <div className="grid h-screen grid-cols-1 lg:grid-cols-2 lg:overflow-clip">
      <div className="fixed top-0 py-3 px-4 md:px-8">
        <Logo />
      </div>
      <div className="mx-auto flex w-full max-w-sm flex-col items-center justify-center gap-4 p-4">
        <h1 className="mb-6 text-3xl font-black">Reset Password</h1>
        <ResetPasswordForm />
      </div>
      <Image
        src={pattern}
        alt="Pattern"
        className="hidden h-screen w-full object-cover lg:block"
      />
    </div>
  );
}
