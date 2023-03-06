import React from "react";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { IconChevronDown } from "@tabler/icons-react";
import Container from "@/components/Container";
import { fetchSummaryDetailData } from "@/api";

export function SummaryPoint() {
  return (
    <div
      className={classNames(
        "w-full border-b border-neutral-200 dark:border-neutral-700"
      )}
    >
      <div className="flex w-full justify-between gap-2 p-4 ">
        <div className="w-full">
          <div className="mb-1 h-4 w-full animate-pulse bg-neutral-500 "></div>
          <div className="mb-1 h-4 w-3/4 animate-pulse bg-neutral-500 "></div>
        </div>
        <div className="flex h-full flex-col items-end space-y-9 ">
          <div className="flex  h-6 w-12 animate-pulse  rounded bg-neutral-500 py-0.5  px-1 text-center"></div>
          <IconChevronDown className={classNames("h-6 w-6 min-w-[1.5rem]")} />
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["/summary", { id: router.query.id }],
    queryFn: () => fetchSummaryDetailData(router.query.id),
    enabled: router.isReady,
  });

  if (!data) {
    return null;
  }
  return (
    <>
      <Container
        className={classNames(
          "summary-grid grid gap-4 !px-0 lg:mt-8 lg:gap-8 lg:!px-8"
        )}
      >
        <div className="sticky top-16 z-10 h-full animate-pulse  bg-neutral-500">
          <div className="sticky top-20 aspect-video h-auto w-full"></div>
        </div>

        <div>
          <div className="flex gap-2 px-4">
            <div className="flex h-10 animate-pulse rounded bg-neutral-500 px-2">
              <div className="w-6"></div>
            </div>
            <div className="flex h-10 animate-pulse rounded bg-neutral-500 px-2">
              <div className="w-6"></div>
            </div>
            <div className="flex h-10 animate-pulse rounded bg-neutral-500 px-2">
              <div className="w-24"></div>
            </div>
          </div>

          <div className="mt-2 py-2 px-4">
            <div className="mb-1 h-4 w-full animate-pulse bg-neutral-500 "></div>
            <div className="mb-1 h-4 w-full animate-pulse bg-neutral-500 "></div>
            <div className="mb-1 h-4 w-3/4 animate-pulse bg-neutral-500 "></div>
          </div>
          {[1, 2, 3, 4, 5].map(point => {
            return <SummaryPoint key={point} />;
          })}
          {/* </div> */}
        </div>
      </Container>
    </>
  );
}
