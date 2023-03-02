import Button from "@/components/Button";
import Container from "@/components/Container";
import useAuth from "@/utils/useAuth";
import {
  IconCheck,
  IconArrowRight,
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconBan,
} from "@tabler/icons-react";
import { useRouter } from "next/router";

const data = [
  {
    text: "Price",
    free: <div className=" h-full  "> Free Forever</div>,
    pro: (
      <div className="flex flex-col  gap-1">
        <span className=" text-[9px] md:text-sm">$12.99 / mo</span>
        <span className="text-sm font-semibold"> OR </span>
        <span className=" text-[9px] md:text-sm">$59.94 / 6 mo</span>
      </div>
    ),
  },
  {
    text: "Unlimited access to our database of saved summaries",
    free: (
      <div className="flex flex-col  gap-1">
        <IconCircleCheckFilled className="text-green-600" />
        <span className=" text-[9px] md:text-sm"> (With Ads)</span>
      </div>
    ),
    pro: (
      <div className="flex flex-col  gap-1">
        <IconCircleCheckFilled className="text-green-600" />
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
      return <IconCircleCheckFilled className="text-green-600 " />;
    }
    if (val === "no") {
      return <IconCircleXFilled className="text-red-600 " />;
    }
    if (val === "n/a") {
      return <IconBan className="text-neutral-400 dark:text-neutral-500" />;
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
  const router = useRouter();
  const { user } = useAuth();
  return (
    <Container className="h-full">
      <div className=" pricing-grid sticky top-16 grid h-full border-b border-neutral-200 bg-white p-4 text-sm  font-bold  dark:border-neutral-700 dark:bg-neutral-900 md:text-xl ">
        <div> Feature</div>
        <div className="flex flex-col justify-between gap-2">
          Free
          {user === null && (
            <Button
              className="!hidden !h-auto !w-fit !border !border-blue-600 !bg-transparent !py-1.5  !text-sm !text-blue-600 !shadow-sm hover:!shadow-md md:!flex"
              onClick={() => router.push("/auth/login")}
            >
              Get Started
              <IconArrowRight className="ml-2 h-5 w-5 " />
            </Button>
          )}
          {user !== null && user?.plan !== "Pro" && (
            <Button className="!hidden !h-auto !w-fit !border !border-blue-600 !bg-transparent !py-1.5  !text-sm !text-blue-600 !shadow-sm hover:!shadow-md md:!flex">
              Active
              <IconCheck className="ml-2 h-5 w-5 " />
            </Button>
          )}
          {user?.plan === "Pro" && user !== null && (
            <Button
              className="!hidden !h-auto !w-fit !border !border-blue-600 !bg-transparent !py-1.5  !text-sm !text-blue-600 !shadow-sm hover:!shadow-md md:!flex"
              onClick={() => router.push("/auth/login")}
            >
              Downgrade
              <IconArrowRight className="ml-2 h-5 w-5 " />
            </Button>
          )}
        </div>
        <div className="flex flex-col gap-2 ">
          Premium
          {user === null && (
            <Button
              className="!hidden !h-auto !w-fit !py-1.5 !text-sm md:!flex"
              onClick={() => router.push("/auth/login")}
            >
              Get Started
              <IconArrowRight className="ml-2 h-5 w-5 " />
            </Button>
          )}
          {user !== null && user?.plan !== "Pro" && (
            <Button className="!hidden !h-auto !w-fit !py-1.5 !text-sm md:!flex">
              Upgrade
              <IconArrowRight className="ml-2 h-5 w-5 " />
            </Button>
          )}
          {user?.plan === "Pro" && user !== null && (
            <Button className="!hidden !h-auto !w-fit !py-1.5 !text-sm md:!flex">
              Active
              <IconCheck className="ml-2 h-5 w-5 " />
            </Button>
          )}
        </div>
      </div>

      {data.map(({ free, pro, text }, idx) => {
        return (
          <SubscriptionTableRow free={free} pro={pro} text={text} key={idx} />
        );
      })}
    </Container>
  );
}
