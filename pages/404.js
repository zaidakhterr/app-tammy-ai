import Container from "@/components/Container";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container className="mt-12 flex flex-col items-center">
      <h1 className="text-9xl font-black text-slate-200 dark:text-slate-700">
        404
      </h1>
      <p className="my-4 text-2xl">Page Not Found</p>
      <Link
        href="/"
        className="mr-2 flex items-center justify-center rounded-md py-2 px-3 text-xs font-semibold text-blue-500 transition-colors hover:bg-blue-50 dark:text-blue-500 dark:hover:bg-slate-800 md:text-sm"
      >
        <IconArrowLeft className="mr-2 h-5 w-5 stroke-blue-500 stroke-2 dark:stroke-blue-500" />
        Go Home
      </Link>
    </Container>
  );
}
