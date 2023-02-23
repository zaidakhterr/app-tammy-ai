import Container from "@/components/Container";
import { CreateFolderButton, CreateSummaryButton, MyItemsTable } from ".";

export default function Home() {
  return (
    <Container>
      <div className="mx-auto w-full max-w-5xl">
        <div className="sticky top-16 z-20 mt-8 flex flex-col justify-between gap-3 border-b bg-white py-4 px-3 dark:border-slate-700 dark:bg-slate-900 sm:flex-row sm:items-center">
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
