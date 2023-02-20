import Image from "next/image";
import { useRouter } from "next/router";
import Container from "@/components/Container";
import { Button } from "@/components/Button";
import Input from "@/components/Input";
import youtubeLogo from "@/assets/youtube.png";
import { PlusIcon } from "@heroicons/react/24/outline";

const CreateSummaryForm = () => {
  const router = useRouter();

  const onSubmit = e => {
    e.preventDefault();
    console.log("Submitted");
    router.push("/summary/123");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto my-6 flex w-full max-w-2xl flex-row gap-2 md:my-10"
    >
      <Input placeholder="Enter a youtube url" containerClassName="w-full" />
      <Button type="submit">Summarize</Button>
    </form>
  );
};

const CreateFolderButton = () => {
  const router = useRouter();

  const onClick = () => {
    console.log("Clicked");
    router.push("/folder/123");
  };

  return (
    <Button onClick={onClick} className="ml-auto">
      <PlusIcon className="mr-2 h-5 w-5 stroke-white" />
      Create Folder
    </Button>
  );
};

export default function Home() {
  return (
    <Container>
      <h1 className="mx-auto mt-6 flex w-fit items-center text-2xl font-bold md:mt-10 md:text-3xl">
        <Image
          src={youtubeLogo}
          alt="YouTube Logo"
          className="mr-2 h-auto w-12 md:mr-4 md:w-14"
        />
        AI powered summaries
      </h1>
      <CreateSummaryForm />
      <div className="mt-10 flex items-center justify-between md:mt-16">
        <h2 className="text-xl font-bold">My Summaries</h2>
        <CreateFolderButton />
      </div>
    </Container>
  );
}
