import Container from "@/components/Container";
import { InputBox } from "@/components/InputBox";
import { Button } from "@/components/Button";

export default function Home() {
  return (
    <Container>
      <div className="my-5  md:flex  md:justify-center">
        <div className="sm:w-screen  md:w-1/2">
          <InputBox />
        </div>
        <div className=" sm:w-2/2 my-4 md:mx-5 md:my-0   ">
          <Button title="Summarize" />
        </div>
      </div>
    </Container>
  );
}
