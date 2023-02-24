import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchFolderDetail } from "@/api";
import Container from "@/components/Container";
import {
  CreateSummaryButton,
  DeleteButton,
  EditFolderButton,
  MoveToFolderButton,
} from "..";
import dayjs from "dayjs";
import Image from "next/image";
import youtube from "@/assets/youtube.png";
import Table from "@/components/Table";

export default function Folder() {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["/summary", { id: router.query.id }],
    queryFn: () => fetchFolderDetail(router.query.id),
    enabled: router.isReady,
  });

  if (!data) {
    return null;
  }

  return (
    <Container>
      <div className="mx-auto w-full max-w-5xl">
        <div className="sticky top-16 z-20 mt-8 flex flex-col justify-between gap-3 border-b bg-white py-4 px-3 dark:border-slate-700 dark:bg-slate-900 sm:flex-row sm:items-center">
          <h2 className="text-2xl font-bold">
            <Link
              className="opacity-75 transition-opacity hover:opacity-50"
              href="/library"
            >
              My Items
            </Link>{" "}
            / {data.title}
          </h2>

          <div className="flex flex-1 items-center gap-2">
            <EditFolderButton folderId={data.id} folderTitle={data.title} />
            <span className="mr-auto">
              <DeleteButton summaryId={data.id} type={"folder"} />
            </span>
            <CreateSummaryButton folderId={router.query.id} />
          </div>
        </div>

        <Table
          data={data.summaries}
          pageCount={1}
          pagination={{}}
          setPagination={() => {}}
          columns={[
            {
              accessorKey: "title",
              cell: info => {
                const row = info.row.original;

                return (
                  <>
                    <div className="flex w-full items-center gap-2">
                      <div className="flex w-full items-center gap-2">
                        <Image
                          src={youtube}
                          width={28}
                          height={28}
                          alt={row.title}
                          className="h-6 w-6 min-w-[1.5rem] object-contain sm:h-7 sm:w-7 sm:min-w-[1.75rem]"
                        />
                        <div className="flex flex-col gap-1">
                          <Link
                            href={`/summary/${row.id}`}
                            className="text-sm font-medium group-hover:underline md:text-base"
                          >
                            {row.title}
                          </Link>
                          <div className="flex items-center gap-2 text-xs font-light md:hidden">
                            {`${row.videoLength} mins`}
                            <span className="h-1 w-1 rounded-full bg-slate-700" />
                            {dayjs(row.lastViewed).fromNow()}
                          </div>
                        </div>
                      </div>
                      <div
                        className="flex flex-col items-center justify-end gap-2 sm:flex-row md:hidden"
                        onClick={e => {
                          e.stopPropagation();
                        }}
                      >
                        <MoveToFolderButton summaryId={row.id} />
                        <DeleteButton summaryId={row.id} type={row.type} />
                      </div>
                    </div>
                  </>
                );
              },
            },
            {
              accessorKey: "videoLength",
              cell: info => {
                const row = info.row.original;

                return (
                  <div className="whitespace-nowrap text-sm font-light">
                    {`${row.videoLength} mins`}
                  </div>
                );
              },
            },
            {
              accessorKey: "lastViewed",
              cell: info => {
                const row = info.row.original;

                return (
                  <div className="whitespace-nowrap text-sm font-light">
                    {dayjs(row.lastViewed).fromNow()}
                  </div>
                );
              },
            },
            {
              accessorKey: "actions",
              cell: info => {
                const row = info.row.original;

                return (
                  <div
                    className="flex items-center justify-end gap-2"
                    onClick={e => {
                      e.stopPropagation();
                    }}
                  >
                    <MoveToFolderButton summaryId={row.id} />
                    <DeleteButton summaryId={row.id} type={row.type} />
                  </div>
                );
              },
            },
          ]}
          onRowClick={row => {
            const original = row.original;
            router.push(`/summary/${original.id}`);
          }}
        />
      </div>
    </Container>
  );
}
