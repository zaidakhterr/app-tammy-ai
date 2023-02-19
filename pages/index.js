import Container from "@/components/Container";
import { Button } from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import youtubeLogo from "@/assets/youtube.png";

const CreateSummaryForm = () => {
  const onSubmit = e => {
    e.preventDefault();
    console.log("Submitted");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto my-4 flex w-full max-w-2xl flex-row gap-2 md:my-10"
    >
      <Input
        placeholder="Enter Youtube URL"
        leftIcon={
          <Image src={youtubeLogo} alt="YouTube Logo" className="h-auto w-11" />
        }
        className="pl-11"
        containerClassName="w-full"
      />
      <Button type="submit">Summarize</Button>
    </form>
  );
};

export default function Home() {
  return (
    <Container>
      <CreateSummaryForm />
    </Container>
  );
}
