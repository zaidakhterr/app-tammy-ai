import Container from "@/components/Container";

import { Disclosure } from "@headlessui/react";

import { IconChevronDown, IconCopy, IconShare } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { fetchSummaryDetailData } from "@/api";
import { useRef } from "react";
import YouTube from "react-youtube";
import { secondsToTime } from "@/utils/index";
import classNames from "classnames";
import { US, FR, CH } from "country-flag-icons/react/3x2";
function Summary({ point, seekTo }) {
  return (
    <>
      <div
        className={classNames(
          "w-full border-b border-slate-200 dark:border-slate-700"
        )}
      >
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="md transtion-colors flex w-full justify-between gap-2 p-4 text-left  text-sm hover:bg-slate-50 dark:hover:bg-slate-800">
                <p className="w-full ">
                  {point.emoji} {point.description}
                </p>
                <span className="flex flex-col items-center gap-3">
                  <button
                    className="flex items-center justify-center rounded bg-blue-50 py-0.5 px-1 text-center text-sm text-blue-500 transition-colors hover:bg-blue-100 dark:bg-blue-300/20 dark:text-blue-400 dark:hover:bg-blue-500/20"
                    onClick={e => {
                      e.stopPropagation();
                      seekTo(point.timestamp);
                    }}
                  >
                    {secondsToTime(point.timestamp)}
                  </button>
                  <IconChevronDown
                    className={classNames(
                      "h-6 w-6 min-w-[1.5rem] transition-transform",
                      open && "rotate-180"
                    )}
                  />
                </span>
              </Disclosure.Button>

              <Disclosure.Panel className="w-full px-4 pt-4 pb-8  text-slate-500 dark:text-slate-400">
                <ul className="ml-4 list-disc space-y-2 text-sm">
                  {/* iteration of points array */}
                  {point?.subPoints.map(val => {
                    return <li key={val}>{val}</li>;
                  })}
                </ul>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}

function youtube_parser(url) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}

export default function SummaryPage() {
  const Player = useRef(null);

  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["/summary", { id: router.query.id }],
    queryFn: () => fetchSummaryDetailData(router.query.id),
    enabled: router.isReady,
  });

  if (!data) {
    return null;
  }
  const { points } = data;
  let videoId = youtube_parser(data.video);

  function seekTo(time) {
    if (Player.current) {
      Player.current.seekTo(time);
    }
  }

  return (
    <>
      <Container className="summary-grid grid gap-4 px-0 lg:mt-8 lg:gap-8">
        <YouTube
          className={"sticky top-16 h-full"}
          iframeClassName={"w-full aspect-video sticky top-20 h-auto"}
          frameborder="0"
          allowfullscreen
          videoId={videoId}
          id={"https://www.youtube.com/embed/"}
          onReady={e => {
            Player.current = e.target;
          }}
        />
        <div>
          <div className="flex gap-2 px-4">
            <button className=" bg-t ransparent flex h-10 items-center justify-center rounded border  border-slate-200 bg-right stroke-slate-900 px-2  text-sm transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:stroke-slate-400 dark:border-slate-800 dark:stroke-white dark:hover:bg-slate-800 dark:disabled:bg-slate-800 dark:disabled:stroke-slate-600 ">
              <IconCopy className="h-5 w-5 stroke-1" />
            </button>
            <button className=" bg-t ransparent flex h-10 items-center justify-center rounded border  border-slate-200 bg-right stroke-slate-900 px-2  text-sm transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:stroke-slate-400 dark:border-slate-800 dark:stroke-white dark:hover:bg-slate-800 dark:disabled:bg-slate-800 dark:disabled:stroke-slate-600 ">
              <IconShare className="h-5 w-5 stroke-1" />
            </button>
            <select className="flex h-10 cursor-pointer  items-center justify-center rounded border border-slate-200 bg-transparent stroke-slate-900 px-2 pr-8 text-sm transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:stroke-slate-400 dark:border-slate-800 dark:stroke-white dark:hover:bg-slate-800 dark:disabled:bg-slate-800 dark:disabled:stroke-slate-600">
              {[
                {
                  name: "English",
                  icon: <US className="h-5" />,
                },
                { name: "French", icon: <FR /> },
                { name: "Chinese", icon: <CH /> },
              ].map((language, index) => (
                <option
                  value={language}
                  key={index}
                  className="px-6 dark:bg-slate-800 "
                >
                  {language?.name}
                </option>
              ))}
            </select>
          </div>
          <p className="mt-2 py-2 px-4 text-sm font-bold">{data.description}</p>
          {points.map(point => {
            return <Summary key={point.id} point={point} seekTo={seekTo} />;
          })}
        </div>
      </Container>
    </>
  );
}
