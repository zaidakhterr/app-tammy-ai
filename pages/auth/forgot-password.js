import Image from "next/image";
import pattern from "@/assets/auth-pattern-2.svg";
import { Button } from "@/components/Button";
import { useRouter } from "next/router";
import Input from "@/components/Input";

const ForgotPasswordForm = () => {
  const router = useRouter();

  const onSubmit = e => {
    e.preventDefault();
    console.log("Submitted");
    router.push("/");
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-4">
      <Input type="email" placeholder="Email" containerClassName="w-full" />
      <Button type="submit">Get Password Reset Link</Button>
    </form>
  );
};

export default function ForgotPassword() {
  return (
    <div className="grid h-screen grid-cols-1 lg:grid-cols-2 lg:overflow-clip">
      <div className="mx-auto flex w-full max-w-sm flex-col items-center justify-center gap-4 p-4">
        <h1 className="mb-6 text-3xl font-black">Forgot Password</h1>
        <ForgotPasswordForm />
      </div>
      <Image
        src={pattern}
        alt="Pattern"
        className="hidden h-screen w-full object-cover lg:block"
      />
    </div>
  );
}
