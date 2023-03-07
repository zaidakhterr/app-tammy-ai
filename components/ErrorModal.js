import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function ErrorModal({
  errorMessage,
  buttonText = "Okay !!",
  state = true,
  setState,
}) {
  return (
    <>
      <Transition appear show={state} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setState(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-red-900 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-neutral-200"
                  >
                    {errorMessage && errorMessage}
                  </Dialog.Title>
                  <div className="mt-2">
                    <h1 className="mt-3 text-sm">
                      Our Free Video Summary is limited to following
                      restrictions
                    </h1>
                    <span className="mt-5 flex w-auto gap-6 text-neutral-100">
                      <h1 className="font-semibold"> Short </h1>
                      <p> less than 1 hour long videos</p>
                    </span>
                    <span className="flex text-neutral-100">
                      <h1 className="font-semibold"> Popular Channel </h1>
                      <p>
                        latest 15 videos from channel must average above 20k
                        views
                      </p>
                    </span>
                    <span className="flex text-neutral-100">
                      <h1 className="font-semibold"> Below Capacity Rates</h1>
                      <p>
                        Use our service during non-peak periods for higher
                        success rates
                      </p>
                    </span>
                    {/* <p className="text-sm "> {errorMessage && errorMessage}</p> */}
                  </div>

                  <div className="mt-4 ">
                    <button
                      type="button"
                      className="inline-flex min-w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setState(false)}
                    >
                      {buttonText && buttonText}
                    </button>
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
