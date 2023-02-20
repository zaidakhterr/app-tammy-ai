import { Fragment, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { PlusIcon } from "@heroicons/react/24/outline";
import Container from "@/components/Container";
import { Button } from "@/components/Button";
import Input from "@/components/Input";
import youtubeLogo from "@/assets/youtube.png";
import { Dialog, Transition } from "@headlessui/react";

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

export default function Home() {
  return (
    <Container>
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
    </Container>
  );
}
