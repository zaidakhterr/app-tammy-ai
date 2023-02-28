import Container from "@/components/Container";

import { Disclosure, Menu, Popover, Transition } from "@headlessui/react";

import { IconChevronDown, IconCopy, IconShare } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { fetchSummaryDetailData } from "@/api";
import React, { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import { secondsToTime } from "@/utils/index";
import classNames from "classnames";
import { US, FR, CH } from "country-flag-icons/react/3x2";
import MyListbox from "@/components/ListBox";
import faceBookIcon from "@/assets/facebookIcon.png";
import twitterIcon from "@/assets/twitterIcon.png";
import Image from "next/image";
import { OutlineButton } from "@/components/Button";
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
  const [includeTimeStamp, setIncludeTimeStamp] = useState(false);

  const [includeDescription, setIncludeDescription] = useState(false);
  const [includeCopy, setIncludeCopy] = useState(false);
  const [storeCopiedData, setStoreCopiedData] = useState([]);

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

  // useEffect(() => {
  //   getCopiedValue;
  // }, [storeCopiedData, includeTimeStamp, includeDescription]);

  function getCopiedValue(
    mainDescription,
    pointDescription,
    timeStamp,
    // push subpoints seperately in this array
    subPoints = []
  ) {
    if (includeTimeStamp) {
      () => {
        if (storeCopiedData.length > 0) {
          storeCopiedData.length = 0 | null;
        }
        setStoreCopiedData(mainDescription, pointDescription, timeStamp);
        storeCopiedData.push(mainDescription, pointDescription, timeStamp);
      };
    }
    if (includeTimeStamp & includeDescription) {
      () => {
        if (storeCopiedData.length > 0) {
          storeCopiedData.length = 0 | null;
        }
        storeCopiedData.push(
          mainDescription,
          pointDescription,
          timeStamp
          // subPoints
        );
        setStoreCopiedData(
          mainDescription,
          pointDescription,
          timeStamp
          // subPoints
        );
      };
    }
  }
  function handleCopyClick() {
    async function copyToClipBoard() {
      let copiedText = await navigator.clipboard.writeText(storeCopiedData);
      return copiedText;
    }
    return copyToClipBoard();
  }

  return (
    <>
      <Container className="summary-grid grid gap-4 !px-0 md:!px-8 lg:mt-8 lg:gap-8">
        <YouTube
          className={"sticky top-16 z-10 h-full"}
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
            <Popover className="relative">
              <Popover.Button
                className={`flex h-10 items-center justify-center rounded border border-slate-200  bg-transparent bg-right stroke-slate-900 px-2  text-sm transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:stroke-slate-400 dark:border-slate-800 dark:stroke-white dark:hover:bg-slate-800 dark:disabled:bg-slate-800 dark:disabled:stroke-slate-600`}
              >
                <IconCopy className="h-5 w-5 stroke-1" />
              </Popover.Button>
              <Transition
                as={React.Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="borderborder-slate-200 absolute top-full  left-0 mt-1 w-fit overflow-auto rounded-md bg-white text-sm  shadow-lg dark:border-none  dark:bg-slate-100  ">
                  <form
                    className="w-full overflow-hidden rounded"
                    onChange={e => {
                      handleCopyClick(e);
                    }}
                  >
                    <span className="flex items-center justify-between p-2  hover:bg-slate-200  dark:bg-slate-700 dark:text-slate-200 ">
                      <label
                        htmlFor="timeStamp"
                        className="mr-2 cursor-pointer  whitespace-nowrap text-xs  text-gray-900  dark:border-none dark:bg-slate-700 dark:text-slate-200  "
                      >
                        Include Timestamps
                      </label>
                      <input
                        checked={includeTimeStamp}
                        onChange={e => {
                          setIncludeTimeStamp(e.target.checked);
                        }}
                        id="timeStamp"
                        name="timeStamp"
                        type="checkbox"
                        className=" cursor-pointer rounded border-blue-500 checked:bg-blue-500 focus:border-none focus:shadow-none  focus:outline-none focus:ring-0 dark:border-none"
                      />
                    </span>
                    <span className="flex items-center justify-between p-2   hover:bg-slate-200  dark:bg-slate-700 dark:text-slate-200 ">
                      <label
                        htmlFor="description"
                        className="mr-2 cursor-pointer  whitespace-nowrap text-xs  text-gray-900  dark:border-none dark:bg-slate-700  dark:text-slate-200"
                      >
                        Full Summary
                      </label>
                      <input
                        checked={includeDescription}
                        onChange={e => {
                          setIncludeDescription(e.target.checked);
                        }}
                        id="description"
                        name="description"
                        type="checkbox"
                        // className=" border-1 cursor-pointer rounded-md border-blue-500  checked:bg-blue-500 focus:border-none focus:outline-none"
                        className=" cursor-pointer rounded border-blue-500 checked:bg-blue-500 focus:border-none focus:shadow-none  focus:outline-none focus:ring-0"
                      />
                    </span>
                    <span className=" border-t-1 flex cursor-pointer items-center justify-between border-blue-200  p-2 text-xs  dark:bg-slate-700 dark:text-slate-200 ">
                      <OutlineButton
                        onClick={() => {
                          setIncludeCopy();
                        }}
                        type="button"
                        id="copyWholeText"
                        name="copyWholeText"
                        className="dark:bg-blue -700 cursor-pointer  rounded border-blue-500 bg-blue-600  text-xs  font-semibold text-white hover:bg-blue-600/70 dark:border-none dark:bg-blue-400  dark:text-white dark:hover:bg-blue-200 dark:hover:text-blue-600"
                      >
                        Copy Text
                      </OutlineButton>
                    </span>
                  </form>
                </Popover.Panel>
              </Transition>
            </Popover>

            {/* Share */}
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className=" flex h-10 items-center justify-center rounded border bg-transparent bg-right stroke-slate-900 px-2  text-sm transition-colors disabled:cursor-not-allowed disabled:bg-slate-100 disabled:stroke-slate-400 dark:border-slate-800 dark:stroke-white dark:hover:bg-slate-800 dark:disabled:bg-slate-800 dark:disabled:stroke-slate-600 ">
                <IconShare className="h-5 w-5 stroke-1" />
              </Menu.Button>
              <Transition
                as={React.Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute left-0 z-50 mt-1 w-fit origin-top-right rounded bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:border-slate-800  dark:bg-slate-800 dark:hover:text-slate-800 dark:disabled:bg-slate-800 dark:disabled:stroke-slate-600 ">
                  <Menu.Item>
                    <span className="flex w-full cursor-pointer items-center p-2 text-xs hover:bg-slate-200  dark:text-slate-200 dark:hover:bg-slate-700 ">
                      <Image
                        src={twitterIcon}
                        className="mr-2 h-5 w-5"
                        alt="Twitter Icon"
                      />
                      Twitter
                    </span>
                  </Menu.Item>

                  <Menu.Item>
                    <span className="flex w-max cursor-pointer items-center p-2 text-xs hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-700 ">
                      <Image
                        src={faceBookIcon}
                        className="mr-2 h-5 w-5"
                        alt="Facebook Icon"
                      />
                      Facebook
                    </span>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>

            <MyListbox
              options={[
                {
                  name: (
                    <span className="flex items-center text-xs">
                      <US className="mr-2 h-4 w-4" />
                      English
                    </span>
                  ),
                },
                {
                  name: (
                    <span className="flex items-center text-xs">
                      <FR className="mr-2 h-4 w-4" />
                      French
                    </span>
                  ),
                },
                {
                  name: (
                    <span className="flex items-center text-xs">
                      <CH className="mr-2 h-4 w-4" />
                      Chinese
                    </span>
                  ),
                },
              ]}
            />
          </div>
          <p className="mt-2 py-2 px-4 text-sm font-bold">{data.description}</p>
          {points.map(point => {
            if (includeTimeStamp) {
              getCopiedValue(
                data.description,
                point.description,
                point.timestamp
              );
            }
            if (includeTimeStamp & includeDescription) {
              getCopiedValue(
                data.description,
                point.description,
                point.timestamp,
                point.subPoints
              );
            }

            return <Summary key={point.id} point={point} seekTo={seekTo} />;
          })}
        </div>
      </Container>
    </>
  );
}
