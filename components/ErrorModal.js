import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import Button from "./Button";

export default function ErrorModal({
  buttonText = "Okay !!",
  state = true,
  setState,
}) {
  const errorMessages = [
    "Please choose another video or try again 5 ~ 10 mins later",
    "Our free video plan summary is limited to the following restrictions",
    <span key={""} className="flex gap-2 whitespace-nowrap">
      <h2 className="font-semibold">Short </h2>
      <p> Less than 1 hour long videos</p>
    </span>,
    <span key={""} className="flex gap-2 whitespace-nowrap">
      <h2 className="font-semibold">Popular Channel </h2>
      <p> Latest 15 videos from the channel must above 20k views</p>
    </span>,
    <span key={""} className="flex gap-2 whitespace-nowrap">
      <h2 className="font-semibold">Below Capacity Limits </h2>
      <p> Use our service during non-peak periods for higher success rates </p>
    </span>,
  ];
  return (
    <>
      <Transition appear show={state} as={React.Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={setState}>
          <Transition.Child
            as={React.Fragment}
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
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-fit max-w-fit transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow-xl shadow-neutral-800/10 transition-all dark:bg-neutral-800">
                  {errorMessages?.map(val => {
                    return (
                      <>
                        <Dialog.Title
                          as="h3"
                          className="my-3  text-lg font-medium leading-6"
                        >
                          {val}
                        </Dialog.Title>
                      </>
                    );
                  })}

                  <div className="flex w-full items-center justify-end gap-3">
                    <Button type="button" onClick={() => setState(false)}>
                      {buttonText}
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
