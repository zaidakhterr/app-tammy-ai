import useError from "@/utils/useError";
import { useRouter } from "next/router";
import React from "react";
import Button, { SecondaryButton } from "./Button";
import { MyDialog } from "./Dialog";

export default function ErrorModal() {
  const router = useRouter();
  const { show, showModal } = useError();

  const errorMessages = [
    "Please choose another video or try again 5 ~ 10 mins later",
    "Our free video plan summary is limited to the following restrictions",
    <span key={""} className="flex gap-2 whitespace-nowrap">
      <h2 className="font-semibold">Short </h2>
      <p> Less than 1 hour long videos</p>
    </span>,
    <span key={""} className="flex gap-2 whitespace-nowrap">
      <h2 className="font-semibold">Popular Channel </h2>
      <p> Latest 15 videos from the channel must above 20k views</p>
    </span>,
    <span key={""} className="flex gap-2 whitespace-nowrap">
      <h2 className="font-semibold">Below Capacity Limits </h2>
      <p> Use our service during non-peak periods for higher success rates </p>
    </span>,
  ];

  return (
    <MyDialog
      isOpen={show}
      closeModal={() => showModal(false)}
      title="Please choose another video or try again 5 ~ 10 mins later"
      content={
        <div className="flex w-full flex-col items-start gap-3">
          <p>
            Our free video plan summary is limited to the following
            restrictions:
          </p>
          <ul>
            <li>
              <strong>Short:</strong> Less than 1 hour long videos
            </li>
            <li>
              <strong>Popular Channel:</strong> Latest 15 videos from the
              channel must above 20k views
            </li>
            <li>
              <strong>Below Capacity Limits:</strong> Use our service during
              non-peak periods for higher success rates
            </li>
          </ul>
          <div className="flex w-full items-center justify-end gap-3">
            <SecondaryButton
              type="button"
              onClick={() => {
                showModal(false);
              }}
            >
              I am ok with restrictions
            </SecondaryButton>
            <Button
              type="button"
              onClick={() => {
                showModal(false);
                router.push("/subscription");
              }}
            >
              Remove restrictions
            </Button>
          </div>
        </div>
      }
    />
  );
}
