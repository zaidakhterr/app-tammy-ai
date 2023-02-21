import React, { Fragment, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FolderIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import classNames from "classnames";
import Container from "@/components/Container";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Button, { DangerButton, SecondaryButton } from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import youtubeLogo from "@/assets/youtube.png";
import Pagination from "@/components/Pagination";
import folder from "@/assets/folder.svg";
import Table from "@/components/Table";
import { useQuery } from "@tanstack/react-query";
import { fetchSummaryData } from "@/api";

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
      className="mx-auto my-6 flex w-full max-w-2xl flex-row gap-2 md:my-10"
    >
      <Input placeholder="Enter a youtube url" containerClassName="w-full" />
      <Button type="submit">Summarize</Button>
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
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-slate-800">
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
                    <Button type="submit">Create</Button>
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

const MY_SUMMARIES = [
  {
    id: 1,
    title:
      "How to make a websiteHow to make a websiteHow to make a websiteHow to make a website",
    thumbnail: "https://picsum.photos/150/100",
    viewCount: 100,
    videoLength: 10,
    lastViewed: "2023-01-01",
    type: "video",
  },
  {
    id: 2,
    title: "How to make a website",
    thumbnail: "https://picsum.photos/150/100",
    viewCount: 100,
    videoLength: 10,
    lastViewed: "2023-01-01",
    type: "video",
  },
  {
    id: 3,
    title: "How to make a website",
    thumbnail: "https://picsum.photos/150/100",
    viewCount: 100,
    videoLength: 10,
    lastViewed: "2023-01-01",
    type: "video",
  },
  {
    id: 4,
    title: "How to make a website",
    thumbnail: "https://picsum.photos/150/100",
    viewCount: 100,
    videoLength: 10,
    lastViewed: "2023-01-01",
    type: "video",
  },
  {
    id: 5,
    title: "How to make a website",
    thumbnail: "https://picsum.photos/150/100",
    viewCount: 100,
    videoLength: 10,
    lastViewed: "2023-01-01",
    type: "video",
  },

  {
    id: 6,
    title: "How to make a website",
    thumbnail: "https://picsum.photos/150/100",
    viewCount: 100,
    videoLength: 10,
    lastViewed: "2023-01-01",
    type: "video",
  },
  {
    id: 7,
    title: "How to make a website",
    thumbnail: "https://picsum.photos/150/100",
    viewCount: 100,
    videoLength: 10,
    lastViewed: "2023-01-01",
    type: "video",
  },
  {
    id: 8,
    title: "How to make a website",
    thumbnail: "https://picsum.photos/150/100",
    viewCount: 100,
    videoLength: 10,
    lastViewed: "2023-01-01",
    type: "video",
  },

  {
    id: 101,
    title: "My Videos",
    videoCount: 50,
    lastViewed: "2023-01-01",
    type: "folder",
  },
  {
    id: 9,
    title: "How to make a website",
    thumbnail: "https://picsum.photos/150/100",
    viewCount: 100,
    videoLength: 10,
    lastViewed: "2023-01-01",
    type: "video",
  },
  {
    id: 10,
    title: "How to make a website",
    thumbnail: "https://picsum.photos/150/100",
    viewCount: 100,
    videoLength: 10,
    lastViewed: "2023-01-01",
    type: "video",
  },
  {
    id: 102,
    title: "My Videos",
    videoCount: 50,
    lastViewed: "2023-01-01",
    type: "folder",
  },
  {
    id: 103,
    title: "My Videos",
    videoCount: 50,
    lastViewed: "2023-01-01",
    type: "folder",
  },
  {
    id: 104,
    title: "My Videos",
    videoCount: 50,
    lastViewed: "2023-01-01",
    type: "folder",
  },
  {
    id: 11,
    title: "How to make a website",
    thumbnail: "https://picsum.photos/150/100",
    viewCount: 100,
    videoLength: 10,
    lastViewed: "2023-01-01",
    type: "video",
  },
  {
    id: 12,
    title: "How to make a website",
    thumbnail: "https://picsum.photos/150/100",
    viewCount: 100,
    videoLength: 10,
    lastViewed: "2023-01-01",
    type: "video",
  },
];

const DISCOVER_SUMMARIES = [
  {
    id: 1,
    title: "How to make a website",
    thumbnail: "https://picsum.photos/150/100",
    viewCount: 100,
    videoLength: 10,
    lastViewed: "2023-01-01",
    type: "video",
  },
  {
    id: 2,
    title: "How to make a website",
    thumbnail: "https://picsum.photos/150/100",
    viewCount: 100,
    videoLength: 10,
    lastViewed: "2023-01-01",
    type: "video",
  },
  {
    id: 3,
    title: "How to make a website",
    thumbnail: "https://picsum.photos/150/100",
    viewCount: 100,
    videoLength: 10,
    lastViewed: "2023-01-01",
    type: "video",
  },
  {
    id: 4,
    title: "How to make a website",
    thumbnail: "https://picsum.photos/150/100",
    viewCount: 100,
    videoLength: 10,
    lastViewed: "2023-01-01",
    type: "video",
  },
  {
    id: 5,
    title: "How to make a website",
    thumbnail: "https://picsum.photos/150/100",
    viewCount: 100,
    videoLength: 10,
    lastViewed: "2023-01-01",
    type: "video",
  },

  {
    id: 6,
    title: "How to make a website",
    thumbnail: "https://picsum.photos/150/100",
    viewCount: 100,
    videoLength: 10,
    lastViewed: "2023-01-01",
    type: "video",
  },
  {
    id: 7,
    title: "How to make a website",
    thumbnail: "https://picsum.photos/150/100",
    viewCount: 100,
    videoLength: 10,
    lastViewed: "2023-01-01",
    type: "video",
  },
  {
    id: 8,
    title: "How to make a website",
    thumbnail: "https://picsum.photos/150/100",
    viewCount: 100,
    videoLength: 10,
    lastViewed: "2023-01-01",
    type: "video",
  },
];

const PAGE_SIZE = 5;

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
        onClick={e => {
          e.stopPropagation();
          openModal();
        }}
        className="flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-blue-50 dark:hover:bg-slate-800"
      >
        <FolderIcon className="h-6 w-6 stroke-blue-500 dark:stroke-blue-600" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-slate-800">
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

                    <Button type="submit">Move</Button>
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
        onClick={e => {
          e.stopPropagation();
          openModal();
        }}
        className="flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-blue-50 dark:hover:bg-slate-800"
      >
        <TrashIcon className="h-6 w-6 stroke-blue-500 dark:stroke-blue-600" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-slate-800">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Are you sure you want to delete this {type}?
                  </Dialog.Title>
                  <div className="mt-4 flex gap-3">
                    <DangerButton onClick={onDelete}>Yes, Delete</DangerButton>
                    <SecondaryButton onClick={closeModal}>
                      No, Cancel
                    </SecondaryButton>
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

// const MySummariesTable = ({ summaries }) => {
//   const [pages] = useState(() => {
//     const pages = [];
//     for (let i = 0; i < summaries.length; i += PAGE_SIZE) {
//       pages.push(summaries.slice(i, i + PAGE_SIZE));
//     }
//     return pages;
//   });
//   const [page, setPage] = useState(1);
//   const activePage = pages[page - 1];

//   const totalCount = summaries.length;
//   const totalPageCount = pages.length;

//   return (
//     <>
//       <div className="mt-4 w-full overflow-clip rounded-md border dark:border-slate-700">
//         <table className="w-full">
//           <tbody>
//             {activePage.map((summary, idx) => {
//               const isFolder = summary.type === "folder";

//               return (
//                 <tr key={summary.id} className="table-row">
//                   <td
//                     className={classNames(
//                       "table-cell p-4",
//                       idx !== 0 && "border-t dark:border-slate-700"
//                     )}
//                   >
//                     <Link
//                       href={
//                         isFolder
//                           ? `/folder/${summary.id}`
//                           : `/summary/${summary.id}`
//                       }
//                       className="group flex flex-col gap-2 sm:flex-row sm:items-center"
//                     >
//                       <Image
//                         src={isFolder ? folder : summary.thumbnail}
//                         width={128}
//                         height={80}
//                         alt={summary.title}
//                         className={classNames(
//                           "h-20 w-32",
//                           isFolder
//                             ? "object-contain object-left"
//                             : "object-cover"
//                         )}
//                       />
//                       <p className="group-hover:underline">{summary.title}</p>
//                     </Link>
//                   </td>
//                   <td
//                     className={classNames(
//                       "hidden p-4 md:table-cell",
//                       idx !== 0 && "border-t dark:border-slate-700"
//                     )}
//                   >
//                     {isFolder
//                       ? `${summary.videoCount} videos`
//                       : `${summary.videoLength} mins`}
//                   </td>
//                   <td
//                     className={classNames(
//                       "hidden p-4 md:table-cell",
//                       idx !== 0 && "border-t dark:border-slate-700"
//                     )}
//                   >
//                     Viewed {dayjs(summary.lastViewed).fromNow()}
//                   </td>
//                   <td
//                     className={classNames(
//                       "table-cell p-4",
//                       idx !== 0 && "border-t dark:border-slate-700"
//                     )}
//                   >
//                     <div className="flex flex-col items-center justify-end gap-2 sm:flex-row">
//                       {!isFolder && (
//                         <MoveToFolderButton summaryId={summary.id} />
//                       )}
//                       <DeleteButton
//                         summaryId={summary.id}
//                         type={summary.type}
//                       />
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       <Pagination
//         className="ml-auto mt-2"
//         pageSize={PAGE_SIZE}
//         currentPage={page}
//         totalCount={totalCount}
//         onPageChange={page => {
//           console.log(page);
//           setPage(page);
//         }}
//         onPrev={() => {
//           console.log("prev");
//           setPage(page => Math.max(1, page - 1));
//         }}
//         onNext={() => {
//           console.log("next");
//           setPage(page => Math.min(totalPageCount, page + 1));
//         }}
//       />
//     </>
//   );
// };

const MySummariesTable = () => {
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
      columns={[{ accessorKey: "id" }, { accessorKey: "title" }]}
      data={dataQuery.data?.rows}
      pageCount={dataQuery.data?.pageCount}
      pagination={pagination}
      setPagination={setPagination}
    />
  );
};

const DiscoverTable = ({ summaries }) => {
  const [pages] = useState(() => {
    const pages = [];
    for (let i = 0; i < summaries.length; i += PAGE_SIZE) {
      pages.push(summaries.slice(i, i + PAGE_SIZE));
    }
    return pages;
  });
  const [page, setPage] = useState(1);
  const activePage = pages[page - 1];

  const totalCount = summaries.length;
  const totalPageCount = pages.length;

  return (
    <>
      <div className="mt-4 w-full overflow-clip rounded-md border dark:border-slate-700">
        <table className="w-full">
          <tbody>
            {activePage.map((summary, idx) => {
              const isFolder = summary.type === "folder";

              return (
                <tr key={summary.id} className="table-row">
                  <td
                    className={classNames(
                      "table-cell p-4",
                      idx !== 0 && "border-t dark:border-slate-700"
                    )}
                  >
                    <Link
                      href={
                        isFolder
                          ? `/folder/${summary.id}`
                          : `/summary/${summary.id}`
                      }
                      className="group flex flex-col gap-2 sm:flex-row sm:items-center"
                    >
                      <Image
                        src={isFolder ? folder : summary.thumbnail}
                        width={128}
                        height={80}
                        alt={summary.title}
                        className={classNames(
                          "h-20 w-32",
                          isFolder
                            ? "object-contain object-left"
                            : "object-cover"
                        )}
                      />
                      <p className="group-hover:underline">{summary.title}</p>
                    </Link>
                  </td>
                  <td
                    className={classNames(
                      "hidden p-4 md:table-cell",
                      idx !== 0 && "border-t dark:border-slate-700"
                    )}
                  >
                    {isFolder
                      ? `${summary.videoCount} videos`
                      : `${summary.videoLength} mins`}
                  </td>
                  <td
                    className={classNames(
                      "hidden p-4 md:table-cell",
                      idx !== 0 && "border-t dark:border-slate-700"
                    )}
                  >
                    Viewed {summary.viewCount} times
                  </td>
                  <td
                    className={classNames(
                      "table-cell p-4",
                      idx !== 0 && "border-t dark:border-slate-700"
                    )}
                  >
                    <div className="flex flex-col items-center justify-end gap-2 sm:flex-row">
                      <button className="flex items-center justify-center rounded bg-blue-500 py-2 px-3 text-center text-sm text-white transition-colors hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 md:px-4">
                        Summarize
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Pagination
        className="ml-auto mt-2"
        pageSize={PAGE_SIZE}
        currentPage={page}
        totalCount={totalCount}
        onPageChange={page => {
          console.log(page);
          setPage(page);
        }}
        onPrev={() => {
          console.log("prev");
          setPage(page => Math.max(1, page - 1));
        }}
        onNext={() => {
          console.log("next");
          setPage(page => Math.min(totalPageCount, page + 1));
        }}
      />
    </>
  );
};

export default function Home() {
  return (
    <Container className="pb-40">
      <h1 className="mx-auto mt-6 flex w-fit items-center text-2xl font-bold md:mt-10 md:text-3xl">
        <Image
          src={youtubeLogo}
          alt="YouTube Logo"
          className="mr-2 h-auto w-12 md:mr-4 md:w-14"
        />
        AI powered summaries
      </h1>
      <CreateSummaryForm />
      <div className="mt-10 flex items-center justify-between md:mt-16">
        <h2 className="text-xl font-bold">My Summaries</h2>
        <CreateFolderButton />
      </div>
      <MySummariesTable summaries={MY_SUMMARIES} />
      <div className="mt-10 flex items-center justify-between md:mt-16">
        <h2 className="text-xl font-bold">Discover</h2>
      </div>
      <DiscoverTable summaries={DISCOVER_SUMMARIES} />
    </Container>
  );
}
