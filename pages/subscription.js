import Container from "@/components/Container";
import { IconCheck, IconMinus, IconX } from "@tabler/icons-react";

const data = [
  {
    text: "Unlimited access to our database of saved summaries",
    free: (
      <div className="flex flex-col  gap-1">
        <IconCheck className="text-green-600" />
        <span className=" text-[9px] md:text-sm"> (With Ads)</span>
      </div>
    ),
    pro: (
      <div className="flex flex-col  gap-1">
        <IconCheck className="text-green-600" />
        <span className=" whitespace-nowrap text-[9px] md:text-sm">
          {" "}
          (Without Ads)
        </span>
      </div>
    ),
  },
  // {
  //   text: "5 new & saved summaries per day (for chrome extension only)",
  //   free: "yes",
  //   pro: "New: token based Saved: unlimted",
  // },
  {
    text: "Create new summaries with no primary restrictions",
    free: "no",
    pro: "yes",
  },
  {
    text: "Create new summaries at approx. 20 tokens per 1 hour long video",
    free: "yes",
    pro: "yes",
  },
  {
    text: "Get 20 tokens daily for new summary creation with ads",
    free: "yes",
    pro: "n/a",
  },
  {
    text: "Get 2,000 tokens monthly for new summary creation with no ads",
    free: "n/a",
    pro: "yes",
  },
  {
    text: "Translate summaries from English to other languages",
    free: "no",
    pro: "yes",
  },
  {
    text: "Copy & paste summary feature",
    free: "no",
    pro: "yes",
  },
  {
    text: "Reserved capacity for a more reliable services",
    free: "no",
    pro: "yes",
  },
  {
    text: "Choose theme settings: light or dark",
    free: "yes",
    pro: "yes",
  },
  {
    text: "3 folders are provided by default. Folders may be renamed.",
    free: "yes",
    pro: "yes",
  },
  {
    text: "Create unlimited new folders to organize video summaries better",
    free: "no",
    pro: "yes",
  },
  {
    text: "Create 1 to 3 hours long video summaries",
    free: "no",
    pro: "yes",
  },
  {
    text: "Create <7 mins long video summaries ",
    free: "no",
    pro: "yes",
  },
  {
    text: "Create >3 hours long video summaries ",
    free: "no",
    pro: "yes",
  },
  {
    text: "Cancel subscription any time ",
    free: "n/a",
    pro: "yes",
  },
];

function SubscriptionTableRow({ free, pro, text }) {
  const conditionalIcon = val => {
    if (val === "yes") {
      return <IconCheck className="text-green-600 " />;
    }
    if (val === "no") {
      return <IconX className="text-red-600 " />;
    }
    if (val === "n/a") {
      return <IconMinus className="text-neutral-500 " />;
    }

    return val;
  };

  return (
    <>
      <div className=" pricing-grid grid border-b border-neutral-200 p-4 text-xs  dark:border-neutral-700 md:text-base  ">
        <div>{text}</div>
        <div className="flex items-center">{conditionalIcon(free)}</div>
        <div className="flex items-center">{conditionalIcon(pro)}</div>
      </div>
    </>
  );
}

export default function Subscription() {
  return (
    <Container className="h-full">
      <div className=" pricing-grid sticky top-16 grid h-full border-b border-neutral-200 bg-white p-4 text-sm  font-bold  dark:border-neutral-700 dark:bg-neutral-900 md:text-xl ">
        <div>Feature</div>
        <div>Free</div>
        <div>Premium</div>
      </div>

      {data.map(({ free, pro, text }, idx) => {
        return (
          <SubscriptionTableRow free={free} pro={pro} text={text} key={idx} />
        );
      })}
    </Container>
  );
}
