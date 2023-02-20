import Image from "next/image";
import { useRouter } from "next/router";
import Container from "@/components/Container";
import { Button } from "@/components/Button";
import Input from "@/components/Input";
import youtubeLogo from "@/assets/youtube.png";

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
      className="mx-auto my-4 flex w-full max-w-2xl flex-row gap-2 md:my-10"
    >
      <Input placeholder="Enter a youtube url" containerClassName="w-full" />
      <Button type="submit">Summarize</Button>
    </form>
  );
};

export default function Home() {
  return (
    <Container>
      <h1 className="mx-auto mt-4 flex w-fit items-center text-2xl font-bold md:mt-10 md:text-3xl">
        <Image
          src={youtubeLogo}
          alt="YouTube Logo"
          className="mr-2 h-auto w-12 md:mr-3 md:w-16"
        />
        AI powered summaries
      </h1>
      <CreateSummaryForm />
    </Container>
  );
}
