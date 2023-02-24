import Container from "@/components/Container";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";

import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { fetchSummaryDetailData } from "@/api";
import { OutlineButton } from "@/components/Button";
import { useRef } from "react";
import YouTube from "react-youtube";
function Summary(props) {
  return (
    <>
      <div className="max-w-screen mx-auto w-full  rounded-2xl  bg-white p-3 ">
        <div className="flex items-center border-b-2 ">
          {props.emoji ? (
            props.emoji
          ) : (
            <Image src={props.DefaultEmoji} alt="image not found" />
          )}
          <Disclosure>
            {({ open }) => (
              <>
                <div className="mx-10 flex  flex-col   ">
                  <div className="flex items-center ">
                    <Disclosure.Button className=" flex w-full justify-between  space-x-8 rounded-lg px-4 py-2 text-left text-sm font-medium  text-gray-500 focus:outline-none ">
                      <span className="overflow-hidden text-ellipsis">
                        {props.Description
                          ? props.Description
                          : "Lorem Ipsum Demo Text"}{" "}
                      </span>
                      <span>
                        {" "}
                        {open ? (
                          <IconChevronDown className="" />
                        ) : (
                          <IconChevronRight />
                        )}
                      </span>
                    </Disclosure.Button>

                    <span className="bg-blue-400 text-blue-100">
                      <OutlineButton
                        onClick={() => {
                          props.setStart(props.timestamp);
                        }}
                      >
                        {props.timestamp ? props.timestamp : "00:00"}{" "}
                      </OutlineButton>{" "}
                    </span>
                  </div>

                  <Disclosure.Panel className="px-4  pb-2 text-sm text-gray-500 ">
                    <ul>
                      {/* iteration of points array */}
                      {props?.DataArray.map(val => {
                        return (
                          <>
                            <li> {val} </li>
                          </>
                        );
                      })}
                    </ul>
                  </Disclosure.Panel>
                </div>
              </>
            )}
          </Disclosure>
        </div>
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

  function handleStart(val) {
    // setStart(val);
    seek(val);
  }
  function seek(time) {
    if (Player.current) {
      Player.current.seekTo(time);
    }
  }

  return (
    <>
      <Container>
        <div class=" grid   grid-cols-2 md:grid-cols-6">
          <div class="lg:col-span-3">
            <YouTube
              className={"sticky top-16 aspect-video w-full"}
              frameborder="0"
              allowfullscreen
              videoId={videoId}
              id={"https://www.youtube.com/embed/"}
              onReady={e => {
                Player.current = e.target;
              }}
            />
          </div>
          <div class="max-w-screen-lg px-20 md:col-span-3 ">
            <div className="flex flex-col">
              {/* Buttons */}
              <div className="flex">
                {/* <button></button>
            <button></button>
            {/* Description Top  */}

                <OutlineButton>Language</OutlineButton>
                <OutlineButton>Language</OutlineButton>
              </div>
              <strong>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
                voluptas aperiam autem fuga, officia animi. Dignissimos,
                sapiente similique. Dolore, id! Molestias repellendus voluptate
                aut, eius possimus repudiandae assumenda. Ducimus, eius?
                Reiciendis, totam ipsa quibusdam enim ratione laborum nam velit
                dolorem perferendis qui a fugit animi recusandae reprehenderit
                adipisci delectus amet?
              </strong>
              {/* <div className="   "> */}
              {points.map(val => {
                return (
                  <>
                    <div className="my-3 divide-y-2 divide-gray-400">
                      <Summary
                        DataArray={val?.subPoints}
                        emoji={val?.emoji}
                        timestamp={val?.timestamp}
                        Description={val?.description.slice(0, 90)}
                        setStart={handleStart}
                      />
                    </div>
                  </>
                );
              })}
              {/* </div> */}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
