import Container from "@/components/Container";
import { CreateFolderButton, CreateSummaryButton, MyItemsTable } from ".";

export default function Home() {
  return (
    <Container className="pb-40">
      <div className="mx-auto w-full max-w-6xl">
        <div className="sticky top-16 z-20 flex items-center justify-between border-b bg-white py-4 px-3">
          <h2 className="text-2xl font-bold">My Items</h2>

          <div className="flex items-center gap-2">
            <CreateSummaryButton />
            <CreateFolderButton />
          </div>
        </div>

        <MyItemsTable />
      </div>
    </Container>
  );
}
