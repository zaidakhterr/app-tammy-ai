import React, { Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  IconTrash,
  IconPlus,
  IconFolderFilled,
  IconFileExport,
  IconSparkles,
  IconEdit,
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
      className="relative mx-auto my-6 w-full max-w-xl gap-2 rounded-md sm:flex-row md:my-10 md:flex md:items-center lg:max-w-2xl"
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
        className="bg-white pl-11 pr-28 md:pl-12"
      />
      <Button
        type="submit"
        className="absolute right-0 top-0 w-fit sm:relative"
      >
        <IconSparkles className="mr-2 h-5 w-5 stroke-white" />
        Summarise
      </Button>
    </form>
  );
};

const CreateFolderButton = () => {
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
      <OutlineButton onClick={openModal} className="ml-auto">
        <IconPlus className="mr-2 h-5 w-5 stroke-blue-500 dark:stroke-blue-600" />
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

const MyItemsTable = () => {
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
              <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
                {isFolder ? (
                  <IconFolderFilled className="h-7 w-7 text-blue-700" />
                ) : (
                  <Image src={youtube} width={28} height={28} alt={row.title} />
                )}
                <Link
                  href={isFolder ? `/folder/${row.id}` : `/summary/${row.id}`}
                  className="text-sm font-medium group-hover:underline md:text-base"
                >
                  {row.title}
                </Link>
              </div>
            );
          },
        },
        {
          accessorKey: "videoLength",
          cell: info => {
            const row = info.row.original;
            const isFolder = row.type === "folder";

            return (
              <div className="hidden whitespace-nowrap text-sm font-light sm:block">
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
              <div className="hidden whitespace-nowrap text-sm font-light md:block">
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
                className="flex flex-col items-center justify-end gap-2 sm:flex-row"
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
    <div className="grid grid-cols-2 gap-4">
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
      className="group flex h-40 w-full"
    >
      <Image
        height={200}
        width={300}
        src={summary.thumbnail}
        alt={summary.title}
        className="h-40 w-60 max-w-[50%] rounded-md object-cover"
      />
      <div className="flex flex-col p-2 pl-3 text-left">
        <h4 className="text-sm font-medium line-clamp-2 group-hover:underline md:text-base">
          {summary.title}
        </h4>
        <p className="mt-1">{summary.channel}</p>
        <p className="mt-1 flex items-center gap-1.5 text-sm">
          {abbreviateNumber(summary.viewCount)}
          <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />
          {dayjs(summary.lastViewed).fromNow()}
        </p>
      </div>
    </button>
  );
};

const ExploreSection = () => {
  const ref = React.useRef(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;

  const { data, fetchNextPage, isFetchingNextPage, isFetching, isLoading } =
    useInfiniteQuery({
      queryKey: ["/explore"],
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
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
    <Container className="pb-40">
      <div className="flex min-h-[50vh] flex-col items-center justify-center py-10 md:py-20">
        <h1 className="relative mx-auto mt-6 text-center text-5xl font-bold sm:text-6xl md:mt-10 md:text-7xl">
          AI-powered Summaries
        </h1>
        <CreateSummaryForm />
      </div>
      <div className="mx-auto w-full max-w-6xl">
        <MyItemsTable />
        <div className="mt-10 mb-4 flex items-center justify-between md:mt-16">
          <h2 className="text-xl font-bold">Explore</h2>
        </div>
        <ExploreSection />
      </div>
    </Container>
  );
}
