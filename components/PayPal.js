import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import React, { useState } from "react";

import { useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { IconArrowRight } from "@tabler/icons-react";
import Button, { SecondaryButton } from "./Button";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { MyDialog } from "./Dialog";
import classNames from "classnames";

const PLANS = [
  {
    key: "monthly",
    id: "P-1N0525853E735402FMPZRJTY",
    title: "Monthly",
    price: "$ 12.90 / mo",
  },
  {
    key: "six_monthly",
    id: "P-8DA42812M5486504NMQC6UQI",
    title: "6 Monthly",
    price: "$ 59.90 / 6 mo ($ 9.98 / mo)",
  },
];

const SubscribeButtons = ({ plan_id }) => {
  const [{ options }, dispatch] = usePayPalScriptReducer();
  const [{ subscriptions }] = usePayPalScriptReducer();
  const paypal = usePayPalScriptReducer()[0].paypal;

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        intent: "subscription",
      },
    });
  }, [plan_id]);

  const handleCancelSubscription = () => {
    const subscriptionId = subscriptions[0].subscriptionID;
    console.log({ subscriptionId });

    paypal.subscription
      .cancel(subscriptionId)
      .then(function () {
        toast.success("subscription has been cancelled");
      })
      .catch(function (error) {
        toast.error("Error ");
        console.log(error);
      });
  };

  return (
    <>
      <PayPalButtons
        onClick={handleCancelSubscription}
        style={{
          label: "subscribe",
        }}
      />
    </>
  );
};

export default function UpgradePlanButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [plan, setPlan] = useState(PLANS[0]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Button
        className="!hidden !h-auto !w-fit !py-1.5 !text-sm md:!flex"
        onClick={openModal}
      >
        Upgrade
        <IconArrowRight className="ml-2 h-5 w-5 " />
      </Button>

      <MyDialog
        isOpen={isOpen}
        closeModal={closeModal}
        title="Subscribe to Tammy AI"
        content={
          <div>
            <RadioGroup value={plan} onChange={setPlan} className="mb-4">
              <div className="flex w-full gap-2 rounded-md">
                {PLANS.map(plan => {
                  return (
                    <>
                      <RadioGroup.Option
                        key={plan.key}
                        value={plan}
                        className={({ checked }) =>
                          classNames(
                            "flex w-full cursor-pointer flex-col items-start rounded border p-4",
                            checked
                              ? "border-blue-500 bg-blue-50 text-blue-500 shadow-sm transition-colors dark:border-blue-600 dark:bg-blue-500/10 dark:text-blue-600"
                              : "border-neutral-200 shadow-sm transition-shadow hover:shadow-md dark:border-neutral-700"
                          )
                        }
                      >
                        <RadioGroup.Label
                          as="span"
                          className={`text-sm font-medium`}
                        >
                          {plan.title}
                        </RadioGroup.Label>

                        <RadioGroup.Description as="p" className={`text-sm`}>
                          {plan.price}
                        </RadioGroup.Description>
                      </RadioGroup.Option>
                    </>
                  );
                })}
              </div>
            </RadioGroup>

            {plan && (
              <PayPalScriptProvider
                options={{
                  "client-id": process.env.NEXT_PUBLIC_CLIENT_ID,
                  components: "buttons",
                  intent: "subscription",
                  vault: true,
                }}
                deferLoading
              >
                <SubscribeButtons plan_id={plan.id} />
              </PayPalScriptProvider>
            )}
          </div>
        }
      />
    </>
  );
}

export const DowngradePlanButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Button
        className="!hidden !h-auto !w-fit !py-1.5 !text-sm md:!flex"
        onClick={openModal}
      >
        Downgrade
        <IconArrowRight className="ml-2 h-5 w-5 " />
      </Button>

      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
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
                  <Dialog.Title
                    as="h3"
                    className="my-3  text-lg font-medium leading-6"
                  >
                    Are you sure you want to unsubscribe
                  </Dialog.Title>

                  <div className="flex w-full items-center justify-end gap-3">
                    <SecondaryButton type="button" onClick={closeModal}>
                      cancel
                    </SecondaryButton>
                    <Button
                      type="button"
                      onClick={() => {
                        toast.success("You have successfully unsubscribed ");
                        setIsOpen(true);
                        router.push("/");
                      }}
                    >
                      Yes Unsubscribe
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
};
