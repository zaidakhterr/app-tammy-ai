import React, { Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  IconTrash,
  IconPlus,
  IconFolderFilled,
  IconFileExport,
  IconBolt,
  IconEdit,
  IconArrowRight,
  IconCircleCheckFilled,
} from "@tabler/icons-react";
import { Dialog, Transition } from "@headlessui/react";
import Container from "@/components/Container";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Button, {
  DangerButton,
  OutlineButton,
  SecondaryButton,
} from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Table from "@/components/Table";
import youtube from "@/assets/youtube.png";
import { fetchExploreData, fetchSummaryData } from "@/api";
import { abbreviateNumber } from "@/utils";
import useIntersectionObserver from "@/utils/useIntersectionObserver";
import classNames from "classnames";

dayjs.extend(relativeTime);

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
      className="mx-auto my-6 flex w-full max-w-xl flex-col items-center gap-3 rounded-md sm:flex-row md:my-10 lg:max-w-2xl"
    >
      <Input
        placeholder="Enter a YouTube URL"
        containerClassName="w-full"
        leftIcon={
          <Image
            src={youtube}
            alt="YouTube Logo"
            className="ml-2 h-5 w-auto md:mr-4 md:h-6"
          />
        }
        className="pl-11 md:pl-12"
      />
      <Button type="submit" className="w-full sm:w-fit">
        <IconBolt className="mr-2 h-5 w-5 stroke-white" />
        Summarize
      </Button>
    </form>
  );
};

export const CreateFolderButton = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const onSubmit = e => {
    e.preventDefault();
    closeModal();
    console.log("Submitted");
    router.push("/folder/123");
  };

  return (
    <>
      <OutlineButton
        onClick={openModal}
        className="!h-auto !px-2.5 !py-1.5 !text-xs sm:!text-sm"
      >
        <IconPlus className="mr-2 h-4 w-4 stroke-blue-500 dark:stroke-blue-600" />
        Create Folder
      </OutlineButton>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl shadow-slate-800/10 transition-all dark:bg-slate-800">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6"
                  >
                    Create Folder
                  </Dialog.Title>
                  <form
                    onSubmit={onSubmit}
                    className="mt-4 flex w-full flex-col items-start gap-3"
                  >
                    <Input
                      placeholder="Enter folder name"
                      containerClassName="w-full"
                    />
                    <div className="flex w-full items-center justify-end gap-3">
                      <SecondaryButton type="button" onClick={closeModal}>
                        Cancel
                      </SecondaryButton>
                      <Button type="submit">Create</Button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export const CreateSummaryButton = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const onSubmit = e => {
    e.preventDefault();
    closeModal();
    console.log("Submitted");
    router.push("/folder/123");
  };

  return (
    <>
      <OutlineButton
        onClick={openModal}
        className="!h-auto !px-2.5 !py-1.5 !text-xs sm:!text-sm"
      >
        <IconPlus className="mr-2 h-4 w-4 stroke-blue-500 dark:stroke-blue-600" />
        Create Summary
      </OutlineButton>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl shadow-slate-800/10 transition-all dark:bg-slate-800">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6"
                  >
                    Create Summary
                  </Dialog.Title>
                  <form
                    onSubmit={onSubmit}
                    className="mt-4 flex w-full flex-col items-start gap-3"
                  >
                    <Input
                      placeholder="Enter a YouTube URL"
                      containerClassName="w-full"
                      leftIcon={
                        <Image
                          src={youtube}
                          alt="YouTube Logo"
                          className="ml-2 h-5 w-auto md:mr-4 md:h-6"
                        />
                      }
                      className="pl-11 md:pl-12"
                    />
                    <div className="flex w-full items-center justify-end gap-3">
                      <SecondaryButton type="button" onClick={closeModal}>
                        Cancel
                      </SecondaryButton>
                      <Button type="submit">Summarize</Button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const MoveToFolderButton = ({ summaryId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const onSubmit = e => {
    e.preventDefault();
    closeModal();
    console.log("Submitted", summaryId);
  };

  return (
    <>
      <button
        onClick={() => {
          openModal();
        }}
        className="has-tooltip group/btn z-10 flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-blue-50 dark:hover:bg-blue-500/10"
      >
        <span className="tooltip">Move</span>
        <IconFileExport className="h-5 w-5 stroke-slate-500 stroke-1 group-hover/btn:stroke-blue-600" />
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl shadow-slate-800/10 transition-all dark:bg-slate-800">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6"
                  >
                    Move to folder
                  </Dialog.Title>
                  <form
                    onSubmit={onSubmit}
                    className="mt-4 flex w-full flex-col items-start gap-3"
                  >
                    <Select
                      placeholder="Select folder"
                      containerClassName="w-full"
                      options={[
                        { value: "Folder 1", label: "Folder 1" },
                        { value: "Folder 2", label: "Folder 2" },
                        { value: "Folder 3", label: "Folder 3" },
                      ]}
                    />

                    <div className="flex w-full items-center justify-end gap-3">
                      <SecondaryButton type="button" onClick={closeModal}>
                        Cancel
                      </SecondaryButton>
                      <Button type="submit">Move</Button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const EditFolderButton = ({ folderId, folderTitle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const onSubmit = e => {
    e.preventDefault();
    closeModal();
    console.log("Submitted", folderId);
  };

  return (
    <>
      <button
        onClick={() => {
          openModal();
        }}
        className="has-tooltip group/btn z-10 flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-blue-50 dark:hover:bg-blue-500/10"
      >
        <span className="tooltip">Rename</span>
        <IconEdit className="h-5 w-5 stroke-slate-500 stroke-1 group-hover/btn:stroke-blue-600" />
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl shadow-slate-800/10 transition-all dark:bg-slate-800">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6"
                  >
                    Rename Folder
                  </Dialog.Title>
                  <form
                    onSubmit={onSubmit}
                    className="mt-4 flex w-full flex-col items-start gap-3"
                  >
                    <Input
                      defaultValue={folderTitle}
                      placeholder="Enter folder name"
                      containerClassName="w-full"
                    />
                    <div className="flex w-full items-center justify-end gap-3">
                      <SecondaryButton type="button" onClick={closeModal}>
                        Cancel
                      </SecondaryButton>
                      <Button type="submit">Save</Button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const DeleteButton = ({ summaryId, type }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const onDelete = e => {
    e.preventDefault();
    closeModal();
    console.log("Submitted", summaryId);
  };

  return (
    <>
      <button
        onClick={() => {
          openModal();
        }}
        className="has-tooltip group/btn z-10 flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-red-50 dark:hover:bg-red-500/10"
      >
        <span className="tooltip">Delete</span>
        <IconTrash className="h-5 w-5 stroke-slate-500 stroke-1 group-hover/btn:stroke-red-500" />
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl shadow-slate-800/10 transition-all dark:bg-slate-800">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6"
                  >
                    Are you sure you want to delete this {type}?
                  </Dialog.Title>
                  <div className="mt-4 flex w-full items-center justify-end gap-3">
                    <SecondaryButton onClick={closeModal}>
                      Cancel
                    </SecondaryButton>
                    <DangerButton onClick={onDelete}>Delete</DangerButton>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export const MyItemsTable = () => {
  const router = useRouter();
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const fetchDataOptions = {
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  };

  const dataQuery = useQuery(
    ["/summary", fetchDataOptions],
    () => fetchSummaryData(fetchDataOptions),
    { keepPreviousData: true }
  );

  return (
    <Table
      columns={[
        {
          accessorKey: "title",
          cell: info => {
            const row = info.row.original;
            const isFolder = row.type === "folder";

            return (
              <>
                <div className="flex w-full items-center gap-2">
                  <div className="flex w-full items-center gap-2">
                    {isFolder ? (
                      <IconFolderFilled className="h-6 w-6 min-w-[1.5rem] text-blue-600 sm:h-7 sm:w-7 sm:min-w-[1.75rem]" />
                    ) : (
                      <Image
                        src={youtube}
                        width={28}
                        height={28}
                        alt={row.title}
                        className="h-6 w-6 min-w-[1.5rem] object-contain sm:h-7 sm:w-7 sm:min-w-[1.75rem]"
                      />
                    )}
                    <div className="flex flex-col gap-1">
                      <Link
                        href={
                          isFolder ? `/folder/${row.id}` : `/summary/${row.id}`
                        }
                        className="text-sm font-medium group-hover:underline md:text-base"
                      >
                        {row.title}
                      </Link>
                      <div className="flex items-center gap-2 text-xs font-light md:hidden">
                        {isFolder
                          ? `${row.videoCount} items`
                          : `${row.videoLength} mins`}
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
                    {isFolder ? (
                      <EditFolderButton
                        folderId={row.id}
                        folderTitle={row.title}
                      />
                    ) : (
                      <MoveToFolderButton summaryId={row.id} />
                    )}
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
            const isFolder = row.type === "folder";

            return (
              <div className="whitespace-nowrap text-sm font-light">
                {isFolder
                  ? `${row.videoCount} items`
                  : `${row.videoLength} mins`}
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
            const isFolder = row.type === "folder";

            return (
              <div
                className="flex items-center justify-end gap-2"
                onClick={e => {
                  e.stopPropagation();
                }}
              >
                {isFolder ? (
                  <EditFolderButton folderId={row.id} folderTitle={row.title} />
                ) : (
                  <MoveToFolderButton summaryId={row.id} />
                )}
                <DeleteButton summaryId={row.id} type={row.type} />
              </div>
            );
          },
        },
      ]}
      onRowClick={row => {
        const original = row.original;
        const isFolder = original.type === "folder";

        if (isFolder) {
          router.push(`/folder/${original.id}`);
        } else {
          router.push(`/summary/${original.id}`);
        }
      }}
      data={dataQuery.data?.rows}
      pageCount={dataQuery.data?.pageCount}
      pagination={pagination}
      setPagination={setPagination}
      loading={dataQuery.isFetching}
    />
  );
};

const ExploreLoading = () => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(idx => (
        <div
          key={idx}
          className="h-40 w-full animate-pulse rounded-md bg-slate-500/30"
        />
      ))}
    </div>
  );
};

const ExploreCard = ({ summary }) => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push(`/summary/${summary.id}`);
      }}
      className="group flex h-full w-full flex-col items-center rounded-md lg:flex-row"
    >
      <Image
        height={200}
        width={300}
        src={summary.thumbnail}
        alt={summary.title}
        className="aspect-video w-full min-w-[50%] rounded-md object-cover lg:max-w-[50%]"
      />
      <div className="flex h-full w-full flex-col py-2 text-left leading-snug lg:pb-1 lg:pt-0 lg:pl-3">
        <h4 className="font-semibold line-clamp-2 group-hover:underline">
          {summary.title}
        </h4>
        <div className="mt-auto flex items-center gap-4 lg:mb-auto lg:flex-col lg:items-start lg:gap-1">
          <p className=" flex items-center">
            {summary.channel}
            <IconCircleCheckFilled className="ml-1 h-5 w-5 text-sm text-slate-400 dark:text-slate-600" />
          </p>
          <p className="flex items-center gap-1.5 text-xs">
            {abbreviateNumber(summary.viewCount)}
            <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />
            {dayjs(summary.lastViewed).fromNow()}
          </p>
        </div>
        {/* <OutlineButton className="mt-auto h-auto w-fit border-none py-1.5 !px-1 text-xs md:h-auto md:text-sm">
          Summarize{" "}
          <IconArrowRight className="ml-2 h-4 w-4 stroke-blue-500 group-hover:animate-bounce-right dark:stroke-blue-600" />
        </OutlineButton> */}
        <OutlineButton className="mt-1 h-auto w-fit !py-1.5 !px-2.5 text-xs md:h-auto md:py-1.5 md:text-sm">
          Summarize
          <IconArrowRight className="ml-2 h-4 w-4 stroke-blue-500 group-hover:animate-bounce-right dark:stroke-blue-600" />
        </OutlineButton>
      </div>
    </button>
  );
};

const ExploreSection = () => {
  const ref = React.useRef(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;

  const [type, setType] = React.useState("trending");

  const { data, fetchNextPage, isFetchingNextPage, isFetching, isLoading } =
    useInfiniteQuery({
      queryKey: [`/explore/${type}`, { type }],
      queryFn: fetchExploreData,
      getNextPageParam: (lastPage, pages) =>
        pages.length < lastPage.pageCount ? pages.length : undefined,
    });

  React.useEffect(() => {
    if (isVisible && !isFetching && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isVisible, isFetching, isFetchingNextPage, fetchNextPage]);

  const summaries = React.useMemo(() => {
    if (!data?.pages) return [];

    return data?.pages.reduce((acc, page) => {
      return [...acc, ...page.rows];
    }, []);
  }, [data?.pages]);

  return (
    <>
      <div className="mx-auto mb-10 grid w-full max-w-sm grid-cols-3 gap-1">
        <button
          className={classNames(
            "rounded-sm p-2 text-xs text-blue-500  transition-colors hover:bg-blue-500/5 dark:text-blue-600 md:text-sm",
            type === "trending" && "bg-blue-500/10"
          )}
          onClick={() => setType("trending")}
        >
          Trending
        </button>
        <button
          className={classNames(
            "rounded-sm p-2  text-xs text-blue-500 transition-colors hover:bg-blue-500/5 dark:text-blue-600 md:text-sm",
            type === "latest" && "bg-blue-500/10"
          )}
          onClick={() => setType("latest")}
        >
          Latest
        </button>
        <button
          className={classNames(
            "rounded-sm p-2 text-xs text-blue-500 transition-colors hover:bg-blue-500/5 dark:text-blue-600 md:text-sm",
            type === "popular" && "bg-blue-500/10"
          )}
          onClick={() => setType("popular")}
        >
          Popular
        </button>
      </div>
      <div
        className={classNames(
          "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6",
          summaries.length !== 0 && "mb-4 lg:mb-6"
        )}
      >
        {summaries.map(summary => (
          <ExploreCard key={summary.id} summary={summary} />
        ))}
      </div>
      <div ref={ref}>
        {isFetchingNextPage || isLoading ? <ExploreLoading /> : null}
      </div>
    </>
  );
};

export default function Home() {
  return (
    <Container>
      <div className="flex min-h-[50vh] flex-col items-center justify-center py-10 md:py-20">
        <h1 className="relative mx-auto mt-6 text-center text-5xl font-bold sm:text-6xl md:mt-10 md:text-7xl">
          AI Powered Summaries
        </h1>
        <CreateSummaryForm />
      </div>
      <div className="mx-auto w-full max-w-6xl">
        <div className="mx-auto mb-6 max-w-lg text-center">
          <h2 className="mb-2 text-2xl font-bold">Explore</h2>
          <p>Explore popular videos loaded with AI-powered summaries</p>
        </div>
        <ExploreSection />
      </div>
    </Container>
  );
}
