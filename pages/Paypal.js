import { useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

const PayPalComponent = ({ type }) => {
  const [{ options }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        intent: "subscription",
      },
    });
  }, [type]);

  return (
    <PayPalButtons
      createSubscription={(data, actions) => {
        return actions.subscription
          .create({
            plan_id: "P-3RX065706M3469222L5IFM4I",
          })
          .then(orderId => {
            // Your code here after create the order
            return orderId;
          });
      }}
      style={{
        label: "subscribe",
      }}
    />
  );
};

export default function PayPal() {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": "lineaxio4455",
        components: "buttons",
        intent: "subscription",
        vault: true,
      }}
      deferLoading
      key={""}
    >
      <PayPalComponent type="subscription" />
    </PayPalScriptProvider>
  );
}
