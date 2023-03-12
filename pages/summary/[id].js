import React, { Suspense } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import YouTube from "react-youtube";
import classNames from "classnames";
import { Disclosure, Menu, Popover, Transition } from "@headlessui/react";
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconChevronDown,
  IconCopy,
  IconShare,
  IconWand,
} from "@tabler/icons-react";
import { toast } from "react-hot-toast";
import {
  US,
  FR,
  CH,
  SA,
  BA,
  NL,
  DE,
  IN,
  IT,
  JP,
  KR,
  PL,
  PT,
  RU,
  ES,
  SE,
  TH,
  TR,
  PK,
  VN,
} from "country-flag-icons/react/3x2";
import Button from "@/components/Button";
import Container from "@/components/Container";
import MyListbox from "@/components/ListBox";
import { parseYoutubeURL, secondsToTime, copyToClipBoard } from "@/utils/index";
import { fetchSummaryDetailData } from "@/api";
import Head from "next/head";
import Loading from "./loading";

const languageArr = [
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
        <SA className="mr-2 h-4 w-4" />
        Arabic
      </span>
    ),
  },
  {
    name: (
      <span className="flex items-center text-xs">
        <BA className="mr-2 h-4 w-4" />
        Bahasa Indonesia
      </span>
    ),
  },

  // Bahasa Melayu ????
  {
    name: (
      <span className="flex items-center text-xs">
        <CH className="mr-2 h-4 w-4" />
        Chinese <sub className="ml-1">(Simplified)</sub>
      </span>
    ),
  },
  {
    name: (
      <span className="flex items-center text-xs">
        <CH className="mr-2 h-4 w-4" />
        Chinese <sub className="ml-1">(Traditional)</sub>
      </span>
    ),
  },
  {
    name: (
      <span className="flex items-center text-xs">
        <NL className="mr-2 h-4 w-4" />
        Netherlands
      </span>
    ),
  },
  {
    name: (
      <span className="flex items-center text-xs">
        <DE className="mr-2 h-4 w-4" />
        German
      </span>
    ),
  },
  {
    name: (
      <span className="flex items-center text-xs">
        <IN className="mr-2 h-4 w-4" />
        Hindi
      </span>
    ),
  },
  {
    name: (
      <span className="flex items-center text-xs">
        <IT className="mr-2 h-4 w-4" />
        Italian
      </span>
    ),
  },
  {
    name: (
      <span className="flex items-center text-xs">
        <KR className="mr-2 h-4 w-4" />
        Korean
      </span>
    ),
  },
  {
    name: (
      <span className="flex items-center text-xs">
        <PL className="mr-2 h-4 w-4" />
        Polish
      </span>
    ),
  },
  {
    name: (
      <span className="flex items-center text-xs">
        <JP className="mr-2 h-4 w-4" />
        Japanese
      </span>
    ),
  },
  {
    name: (
      <span className="flex items-center text-xs">
        <PT className="mr-2 h-4 w-4" />
        Portuguese
      </span>
    ),
  },
  {
    name: (
      <span className="flex items-center text-xs">
        <RU className="mr-2 h-4 w-4" />
        Russian
      </span>
    ),
  },
  {
    name: (
      <span className="flex items-center text-xs">
        <ES className="mr-2 h-4 w-4" />
        Spanish
      </span>
    ),
  },
  {
    name: (
      <span className="flex items-center text-xs">
        <SE className="mr-2 h-4 w-4" />
        Swedish
      </span>
    ),
  },
  {
    name: (
      <span className="flex items-center text-xs">
        <TH className="mr-2 h-4 w-4" />
        Thai
      </span>
    ),
  },
  {
    name: (
      <span className="flex items-center text-xs">
        <TR className="mr-2 h-4 w-4" />
        Turkish
      </span>
    ),
  },
  {
    name: (
      <span className="flex items-center text-xs">
        <PK className="mr-2 h-4 w-4" />
        Urdu
      </span>
    ),
  },
  {
    name: (
      <span className="flex items-center text-xs">
        <VN className="mr-2 h-4 w-4" />
        Vietnamese
      </span>
    ),
  },
];

export function SummaryPoint({ point, seekTo }) {
  return (
    <Suspense fallback={<Loading />}>
      <div
        className={classNames(
          "w-full border-b border-neutral-200 dark:border-neutral-700"
        )}
      >
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="md transtion-colors flex w-full justify-between gap-2 p-4 text-left  text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 ">
                <p className="w-full ">
                  {point.emoji} {point.description}
                </p>
                <span className="flex h-full flex-col items-end space-y-9 ">
                  <button
                    className="flex items-center justify-center rounded bg-blue-50 py-0.5 px-1 text-center text-sm text-blue-500 transition-colors hover:bg-blue-100 dark:bg-blue-300/20 dark:text-blue-400 dark:hover:bg-blue-500/20 "
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

              <Disclosure.Panel className="w-full px-4 pt-4 pb-8  text-neutral-500 dark:text-neutral-400">
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
    </Suspense>
  );
}

export default function SummaryPage() {
  const player = React.useRef(null);
  const [includeLink, setIncludeLink] = React.useState(false);
  const [includeTimeStamp, setIncludeTimeStamp] = React.useState(false);
  const [includeSubPoints, setIncludeSubPoints] = React.useState(false);

  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["/summary", { id: router.query.id }],
    queryFn: () => fetchSummaryDetailData(router.query.id),
    enabled: router.isReady,
  });

  if (!data) {
    return null;
  }

  const videoId = parseYoutubeURL(data.video);

  function seekTo(time) {
    if (player.current) {
      player.current.seekTo(time);
    }
  }

  // async function handleCopyText() {
  //   try {
  //     const copyData = [`<p>`, data.description, `</p>`];

  //     copyData.push(`<ol>`);
  //     data.points.forEach(point => {
  //       copyData.push(`<li>`);

  //       if (includeTimeStamp) {
  //         copyData.push(
  //           `<a href="https://google.com/">${secondsToTime(
  //             point.timestamp
  //           )}</a>: `
  //         );
  //       }

  //       copyData.push(`${point.emoji} `);
  //       copyData.push(point.description);

  //       if (includeSubPoints) {
  //         copyData.push(`<ul>`);

  //         point.subPoints.forEach(val => {
  //           copyData.push(`<li>`);
  //           copyData.push(val);
  //           copyData.push(`</li>`);
  //         });

  //         copyData.push(`</ul>`);
  //       }

  //       copyData.push(`</li>`);
  //     });
  //     copyData.push(`</ol>`);
  //     if (includeLink) {
  //       copyData.push(
  //         `Summary for <a href="${data.video}">https://youtu.be/${videoId}</a> by <a href="https://tammy.ai">tammy.ai</a>`
  //       );
  //     }

  //     const copyText = copyData.join("");
  //     const el = document.createElement("div");
  //     el.innerHTML = copyText;

  //     const clipboardItem = new ClipboardItem({
  //       "text/plain": new Blob([el.innerText], { type: "text/plain" }),
  //       "text/html": new Blob([el.outerHTML], { type: "text/html" }),
  //     });

  //     await copyToClipBoard([clipboardItem]);
  //     toast.success("Text Copied");
  //   } catch (err) {
  //     toast.error("Error Copying Text");
  //   }
  // }

  async function handleCopyText() {
    try {
      const copyData = [`<p>`, data.description, `</p>`];

      copyData.push(`<ol>`);
      data.points.forEach(point => {
        copyData.push(`<>`);
        if (includeTimeStamp) {
          copyData.push(
            `Summary for <a href="${data.video}">https://youtu.be/${videoId}</a> by <a href="https://tammy.ai">tammy.ai</a>`
          );
        }

        copyData.push(`${point.emoji} `);
        copyData.push(point.description);

        if (includeSubPoints) {
          copyData.push(`<ul>`);

          point.subPoints.forEach(val => {
            copyData.push(`<li>`);
            copyData.push(val);
            copyData.push(`</li>`);
          });

          copyData.push(`</ul>`);
        }

        copyData.push(`</li>`);
      });
      copyData.push(`</ol>`);
      if (includeLink) {
        copyData.push(`Summary for ${data.video} by tammy.ai`);
      }

      const copyText = copyData.join("");
      const el = document.createElement("div");
      el.innerHTML = copyText;

      const clipboardItem = new ClipboardItem({
        "text/plain": new Blob([el.innerText], { type: "text/plain" }),
        "text/html": new Blob([el.outerHTML], { type: "text/html" }),
      });

      await copyToClipBoard([clipboardItem]);
      toast.success("Text Copied");
    } catch (err) {
      toast.error("Error Copying Text");
    }
  }

  // async function handleCopyLink() {
  //   try {
  //     await copyToClipBoard(window.location.href);

  //     toast.success("Link Copied");
  //   } catch (error) {
  //     toast.error("Error Copying Link");
  //   }
  // }

  return (
    <>
      <Head>
        <meta name="title" content="AI summary for “name of youtube video”" />
        <meta name="description" content={data.description} />
      </Head>
      <Container
        className={classNames(
          "summary-grid grid gap-4 !px-0 lg:mt-8 lg:gap-8 lg:!px-8"
        )}
      >
        <YouTube
          className={"sticky top-16 z-10 h-full"}
          iframeClassName={"w-full aspect-video sticky top-20 h-auto"}
          frameborder="0"
          allowfullscreen
          videoId={videoId}
          id={data.id}
          onReady={e => {
            player.current = e.target;
          }}
        />
        <div>
          <div className="flex gap-2 px-4">
            <Popover className="relative">
              <Popover.Button
                className={`flex h-10 items-center justify-center rounded border border-neutral-200  bg-transparent bg-right stroke-neutral-900 px-2  text-sm transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:stroke-neutral-400 dark:border-neutral-800 dark:stroke-white dark:hover:bg-neutral-800 dark:disabled:bg-neutral-800 dark:disabled:stroke-neutral-600`}
              >
                <IconCopy className="h-5 w-5 stroke-1" />
              </Popover.Button>

              <Transition
                as={React.Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Popover.Panel className="absolute top-full left-0 mt-1  w-fit rounded border border-neutral-200 bg-white text-sm  shadow-lg dark:border-neutral-700   dark:bg-neutral-800  ">
                  <div className="flex w-full flex-col  overflow-hidden rounded py-1">
                    <label
                      htmlFor="link"
                      className="mr-3 flex w-full cursor-pointer  items-center justify-between whitespace-nowrap p-2 text-xs hover:bg-neutral-200 dark:hover:bg-neutral-700"
                    >
                      Include Link
                      <input
                        checked={includeLink}
                        onChange={e => {
                          setIncludeLink(e.target.checked);
                        }}
                        id="link"
                        name="link"
                        type="checkbox"
                        className="cursor-pointer rounded-sm border-blue-500 checked:bg-blue-500 focus:border-none  focus:shadow-none focus:outline-none focus:ring-0 dark:border-none"
                      />
                    </label>
                    <label
                      htmlFor="timeStamp"
                      className="mr-3 flex w-full cursor-pointer  items-center justify-between whitespace-nowrap p-2 text-xs hover:bg-neutral-200 dark:hover:bg-neutral-700"
                    >
                      Include Timestamps
                      <input
                        checked={includeTimeStamp}
                        onChange={e => {
                          setIncludeTimeStamp(e.target.checked);
                        }}
                        id="timeStamp"
                        name="timeStamp"
                        type="checkbox"
                        className="cursor-pointer rounded-sm border-blue-500 checked:bg-blue-500 focus:border-none  focus:shadow-none focus:outline-none focus:ring-0 dark:border-none"
                      />
                    </label>
                    <label
                      htmlFor="description"
                      className="mr-3 flex w-full cursor-pointer  items-center justify-between whitespace-nowrap p-2 text-xs hover:bg-neutral-200 dark:hover:bg-neutral-700"
                    >
                      Full Summary
                      <input
                        checked={includeSubPoints}
                        onChange={e => {
                          setIncludeSubPoints(e.target.checked);
                        }}
                        id="description"
                        name="description"
                        type="checkbox"
                        className="  cursor-pointer rounded-sm border-blue-500 checked:bg-blue-500 focus:border-none  focus:shadow-none focus:outline-none focus:ring-0"
                      />
                    </label>

                    <span className="my-2 flex px-2 ">
                      <Button
                        onClick={handleCopyText}
                        type="button"
                        className="mx-4 !h-auto w-full border border-blue-600 !px-2 !py-2  !text-xs"
                      >
                        Copy Text
                      </Button>
                    </span>
                    {/* <span className=" mb-2  flex px-2">
                      <OutlineButton
                        onClick={handleCopyLink}
                        type="button"
                        className="mx-4 !h-auto w-full !px-2 !py-2 !text-xs"
                      >
                        Copy Link
                      </OutlineButton>
                    </span> */}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>

            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className=" flex h-10 items-center justify-center rounded border bg-transparent bg-right stroke-neutral-900 px-2  text-sm transition-colors disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:stroke-neutral-400 dark:border-neutral-800 dark:stroke-white dark:hover:bg-neutral-800 dark:disabled:bg-neutral-800 dark:disabled:stroke-neutral-600 ">
                <IconShare className="h-5 w-5 stroke-1" />
              </Menu.Button>
              <Transition
                as={React.Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Menu.Items className="absolute left-0 z-50 mt-1 w-fit origin-top-right rounded bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:border-neutral-800  dark:bg-neutral-800 dark:hover:text-neutral-800 dark:disabled:bg-neutral-800 dark:disabled:stroke-neutral-600 ">
                  <Menu.Item>
                    <a
                      className="flex w-full cursor-pointer items-center p-2 text-xs hover:bg-neutral-200 dark:text-neutral-200 dark:hover:bg-neutral-700"
                      href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <IconBrandTwitter className="mr-2 h-4 w-4 fill-[#1DA1F2] stroke-none text-[#1DA1F2]" />
                      Twitter
                    </a>
                  </Menu.Item>

                  <Menu.Item>
                    <a
                      className="flex w-max cursor-pointer items-center p-2 text-xs hover:bg-neutral-200 dark:text-neutral-200 dark:hover:bg-neutral-700"
                      href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <IconBrandFacebook className="mr-2 h-4 w-4 fill-[#4267B2] stroke-none text-[#4267B2]" />
                      Facebook
                    </a>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
            <MyListbox options={languageArr} />
            <Menu as="div" className="ml-auto">
              <Menu.Button className="  flex h-10 items-center justify-center rounded border bg-transparent bg-right stroke-neutral-900 px-2  text-sm transition-colors disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:stroke-neutral-400 dark:border-neutral-800 dark:stroke-white dark:hover:bg-neutral-800 dark:disabled:bg-neutral-800 dark:disabled:stroke-neutral-600 ">
                <span className="flex ">
                  <IconWand className="h-5 w-5 stroke-1" /> 4
                  {/* Tokens Remaining */}
                </span>
              </Menu.Button>
            </Menu>
          </div>
          <p className="mt-2 py-2 px-4 text-sm font-bold">{data.description}</p>
          {data.points.map(point => {
            return (
              <SummaryPoint key={point.id} point={point} seekTo={seekTo} />
            );
          })}
        </div>
      </Container>
    </>
  );
}
