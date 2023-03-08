import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { IconArrowRight } from "@tabler/icons-react";
import Button from "./Button";
import { toast } from "react-hot-toast";

const SubscribeButtons = ({ plan_id }) => {
  const [{ options }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        intent: "subscription",
      },
    });
  }, [plan_id]);

  return (
    <PayPalButtons
      // createSubscription={(data, actions) => {
      //   return actions.subscription
      //     .create({
      //       plan_id: plan_id,
      //     })
      //     .then(orderId => {
      //       return orderId;
      //     });
      // }}
      style={
        {
          // label: "  ",
        }
      }
    />
  );
};
const UnSubscribeButtons = ({ plan_id }) => {
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
        // createSubscription={(data, actions) => {
        //   return actions.subscription
        //     .create({
        //       plan_id: plan_id,
        //     })
        //     .then(orderId => {
        //       console.log({ orderId });

        //       return orderId;
        //     });
        // }}
        style={{
          label: "subscribe",
        }}
      />
    </>
  );
};

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
    price: "$ 59.90 / 6 mo",
  },
];

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Subscribe to Tammy AI
                  </Dialog.Title>
                  <Dialog.Panel>
                    <RadioGroup value={plan} onChange={setPlan} className="">
                      <RadioGroup.Label className="sr-only">
                        Plan
                      </RadioGroup.Label>

                      <div className=" mt-5 flex w-full rounded-md bg-white">
                        {PLANS.map(plan => {
                          return (
                            <>
                              <RadioGroup.Option
                                key={plan.key}
                                value={plan}
                                className={({ checked }) => `
            ${checked ? "border-indigo-200 bg-indigo-50" : "border-gray-200"}
            relative mb-5 ml-2 flex w-full cursor-pointer gap-6 border p-4 
          `}
                              >
                                {({ checked }) => (
                                  <div className="flex flex-col">
                                    <RadioGroup.Label
                                      as="span"
                                      className={`${
                                        checked
                                          ? "text-indigo-900"
                                          : "text-gray-900"
                                      } block cursor-pointer text-sm font-medium `}
                                    >
                                      {plan.title}
                                    </RadioGroup.Label>

                                    <RadioGroup.Description
                                      as="span"
                                      className={`${
                                        checked
                                          ? "text-indigo-700"
                                          : "text-gray-500"
                                      } block text-sm`}
                                    >
                                      {plan.price}
                                    </RadioGroup.Description>
                                  </div>
                                )}
                              </RadioGroup.Option>
                            </>
                          );
                        })}
                      </div>
                    </RadioGroup>
                  </Dialog.Panel>

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
                      <UnSubscribeButtons plan_id={plan.id} />
                    </PayPalScriptProvider>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );

  //   <div id="paypal-button-container-P-1N0525853E735402FMPZRJTY"></div>
  // <script src="https://www.paypal.com/sdk/js?client-id=AYJ3WqbqFKLEFLfPoJV1v9p-xYYjMNQ770vkQup6Pnl68xAXINnsHXMoTlb7xA6Fs8BP4xpkWYfOf8Ho&vault=true&intent=subscription" data-sdk-integration-source="button-factory"></script>
  // <script>
  //   paypal.Buttons({
  //       style: {
  //           shape: 'rect',
  //           color: 'gold',
  //           layout: 'vertical',
  //           label: 'subscribe'
  //       },
  //       createSubscription: function(data, actions) {
  //         return actions.subscription.create({
  //           /* Creates the subscription */
  //           plan_id: 'P-1N0525853E735402FMPZRJTY'
  //         });
  //       },
  //       onApprove: function(data, actions) {
  //         alert(data.subscriptionID); // You can add optional success message for the subscriber here
  //       }
  //   }).render('#paypal-button-container-P-1N0525853E735402FMPZRJTY'); // Renders the PayPal button
  // </script>
}

export const DowngradePlanButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [downGradePlan, setDownGradePlan] = useState(PLANS[0]);

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Subscribe to Tammy AI
                  </Dialog.Title>
                  <Dialog.Panel>
                    <RadioGroup
                      value={downGradePlan}
                      onChange={setDownGradePlan}
                      className=""
                    >
                      <RadioGroup.Label className="sr-only">
                        Plan
                      </RadioGroup.Label>

                      <div className=" mt-5 flex w-full rounded-md bg-white">
                        {PLANS.map(plan => {
                          return (
                            <>
                              <RadioGroup.Option
                                key={plan.key}
                                value={plan}
                                className={({ checked }) => `
            ${checked ? "border-indigo-200 bg-indigo-50" : "border-gray-200"}
            relative mb-5 ml-2 flex w-full cursor-pointer gap-6 border p-4 
          `}
                              >
                                {({ checked }) => (
                                  <div className="flex flex-col">
                                    <RadioGroup.Label
                                      as="span"
                                      className={`${
                                        checked
                                          ? "text-indigo-900"
                                          : "text-gray-900"
                                      } block cursor-pointer text-sm font-medium `}
                                    >
                                      {plan.title}
                                    </RadioGroup.Label>

                                    <RadioGroup.Description
                                      as="span"
                                      className={`${
                                        checked
                                          ? "text-indigo-700"
                                          : "text-gray-500"
                                      } block text-sm`}
                                    >
                                      {plan.price}
                                    </RadioGroup.Description>
                                  </div>
                                )}
                              </RadioGroup.Option>
                            </>
                          );
                        })}
                      </div>
                    </RadioGroup>
                  </Dialog.Panel>

                  {downGradePlan && (
                    <PayPalScriptProvider
                      options={{
                        "client-id": process.env.NEXT_PUBLIC_CLIENT_ID,
                        components: "buttons",
                        intent: "subscription",
                        vault: true,
                      }}
                      deferLoading
                    >
                      <SubscribeButtons plan_id={downGradePlan.id} />
                    </PayPalScriptProvider>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
