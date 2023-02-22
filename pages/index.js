import React, { Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FolderIcon,
  PlusIcon,
  SparklesIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import Container from "@/components/Container";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Button, { DangerButton, SecondaryButton } from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Table from "@/components/Table";
import youtube from "@/assets/youtube.png";
import folder from "@/assets/folder.svg";
import { fetchDiscoverData, fetchSummaryData } from "@/api";
import { abbreviateNumber } from "@/utils";
import classNames from "classnames";
import useAuth from "@/utils/useAuth";

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
        placeholder="Paste a youtube url"
        containerClassName="w-full"
        leftIcon={
          <Image
            src={youtube}
            alt="YouTube Logo"
            className="ml-2 h-5 w-auto md:mr-4 md:h-6"
          />
        }
        className="bg-white pl-10 pr-28 md:pr-4 md:pl-12"
      />
      <Button
        type="submit"
        className="absolute right-0 top-0 w-fit md:relative"
      >
        <SparklesIcon className="mr-2 h-5 w-5 stroke-white" />
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
      <Button onClick={openModal} className="ml-auto">
        <PlusIcon className="mr-2 h-5 w-5 stroke-white" />
        Create Folder
      </Button>
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
                    className="text-lg font-medium leading-6 text-gray-900"
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
        className="z-10 flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-blue-50 dark:hover:bg-blue-500/10"
      >
        <FolderIcon className="h-5 w-5 stroke-blue-500 dark:stroke-blue-600" />
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
                    className="text-lg font-medium leading-6 text-gray-900"
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
        className="z-10 flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-red-50 dark:hover:bg-red-500/10"
      >
        <TrashIcon className="h-5 w-5 stroke-red-500 dark:stroke-red-600" />
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
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Are you sure you want to delete this {type}?
                  </Dialog.Title>
                  <div className="mt-4 flex w-full items-center justify-end gap-3">
                    <SecondaryButton onClick={closeModal}>
                      No, Cancel
                    </SecondaryButton>
                    <DangerButton onClick={onDelete}>Yes, Delete</DangerButton>
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

const MySummariesTable = () => {
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
              <div className="flex w-full items-center">
                <Image
                  src={isFolder ? folder : youtube}
                  width={32}
                  height={isFolder ? 28 : 24}
                  alt={row.title}
                  className={classNames(
                    "w-8 object-contain",
                    isFolder ? "h-7" : "h-6"
                  )}
                />
                <Link
                  href={isFolder ? `/folder/${row.id}` : `/summary/${row.id}`}
                  className="ml-3 font-medium hover:underline"
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
              <div className="text-sm font-light">
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
              <div className="text-sm font-light">
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
                {!isFolder && <MoveToFolderButton summaryId={row.id} />}
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

const DiscoverTable = () => {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const fetchDataOptions = {
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
  };

  const dataQuery = useQuery(
    ["/discover", fetchDataOptions],
    () => fetchDiscoverData(fetchDataOptions),
    { keepPreviousData: true }
  );

  return (
    <Table
      columns={[
        {
          accessorKey: "title",
          cell: info => {
            const row = info.row.original;

            return (
              <div className="flex w-full items-center">
                <Image
                  src={row.thumbnail}
                  width={112}
                  height={80}
                  alt={row.title}
                  className="h-20 w-28 object-contain"
                />
                <p className="ml-3 font-medium">{row.title}</p>
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
              <div className="text-sm font-light">
                {isFolder
                  ? `${row.videoCount} items`
                  : `${row.videoLength} mins`}
              </div>
            );
          },
        },
        {
          accessorKey: "viewCount",
          cell: info => {
            const row = info.row.original;

            return (
              <div className="text-sm font-light">
                Viewed {abbreviateNumber(row.viewCount)} times
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
                className="flex flex-col items-center justify-end gap-2 sm:flex-row"
                onClick={e => {
                  console.log(e.target, e.currentTarget);
                  e.stopPropagation();
                }}
              >
                <Link
                  href={`/summary/${row.id}`}
                  className="flex h-9 items-center justify-center rounded px-3 text-sm text-blue-500 transition-colors hover:bg-blue-50 dark:text-blue-600 dark:hover:bg-blue-500/10"
                >
                  <SparklesIcon className="mr-2 h-4 w-4 stroke-blue-500 dark:stroke-blue-600" />
                  Summarise
                </Link>
              </div>
            );
          },
        },
      ]}
      data={dataQuery.data?.rows}
      pageCount={dataQuery.data?.pageCount}
      pagination={pagination}
      setPagination={setPagination}
      loading={dataQuery.isFetching}
    />
  );
};

export default function Home() {
  const { user } = useAuth();

  return (
    <Container className="pb-40">
      <div className="flex min-h-[50vh] flex-col items-center justify-center py-10 md:py-20">
        <h1 className="mx-auto mt-6 text-center text-5xl font-black sm:text-6xl md:mt-10 md:text-7xl">
          AI-powered Summaries
        </h1>
        <CreateSummaryForm />
      </div>
      <div className="mx-auto w-full max-w-6xl">
        {user && (
          <>
            <div className="mt-10 mb-4 flex items-center justify-between md:mt-16">
              <h2 className="text-xl font-bold">My Summaries</h2>
              <CreateFolderButton />
            </div>
            <MySummariesTable />
          </>
        )}
        <div className="mt-10 mb-4 flex items-center justify-between md:mt-16">
          <h2 className="text-xl font-bold">Discover</h2>
        </div>
        <DiscoverTable />
      </div>
    </Container>
  );
}
