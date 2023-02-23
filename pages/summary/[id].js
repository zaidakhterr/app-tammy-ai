import Container from "@/components/Container";
import classNames from "classnames";
import Image from "next/image";
import { Disclosure, Transition } from "@headlessui/react";
import ChevronRight from "@/assets/ChevronRight.svg";
import DefaultEmoji from "@/assets/DefaultEmoji.png";
import Head from "next/head";
import {
  IconChevronDown,
  IconChevronDownLeft,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { fetchSummaryDetailData } from "@/api";

function Summary({
  emoji,
  commentHeadline,
  detailedComment,
  duration,
  className,
}) {
  return (
    <>
      <Container>
        <div className="mx-auto w-full max-w-md rounded-2xl  bg-white p-3 ">
          <div className="flex items-center border-b-2 ">
            {emoji ? emoji : <Image src={DefaultEmoji} />}
            <Disclosure>
              {({ open }) => (
                <>
                  <div className="mx-10 flex  flex-col   ">
                    <div className="flex items-center ">
                      <Disclosure.Button className=" flex w-full justify-between  space-x-8 rounded-lg px-4 py-2 text-left text-sm font-medium  text-gray-500 focus:outline-none ">
                        <span>
                          {commentHeadline
                            ? commentHeadline
                            : "Lorem Ipsum Demo Text"}{" "}
                        </span>
                        {open ? <IconChevronDown /> : <IconChevronRight />}
                      </Disclosure.Button>

                      <span className="bg-blue-400 text-blue-100">
                        {" "}
                        {duration ? duration : "00:00"}{" "}
                      </span>
                    </div>

                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 ">
                      {detailedComment ? detailedComment : " Comment Detail "}
                    </Disclosure.Panel>
                  </div>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      </Container>
    </>
  );
}

export default function SummaryPage() {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["/summary", { id: router.query.id }],
    queryFn: () => fetchSummaryDetailData(router.query.id),
    enabled: router.isReady,
  });

  console.log("SUMMARY DETAIL", data);

  return <div>Sumarry detail page</div>;
}
