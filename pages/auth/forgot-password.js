import Button from "@/components/Button";
import { useRouter } from "next/router";
import Input from "@/components/Input";
import Logo from "@/components/Logo";
import Link from "next/link";

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
      <Button type="submit">Get password reset link</Button>
    </form>
  );
};

export default function ForgotPassword() {
  return (
    <>
      <div className="mb-10 py-3 px-4 md:px-8">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="mx-auto flex w-full max-w-sm flex-col items-center justify-center gap-4 p-4">
        <h1 className="mb-6 text-3xl font-black">Forgot password</h1>
        <ForgotPasswordForm />
      </div>
    </>
  );
}
