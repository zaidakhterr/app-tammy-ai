import React from "react";

const Avatar = ({ src, name }) => {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        height={40}
        width={40}
        src={src}
        alt={name}
        title={name}
        className="flex h-10 w-10 rounded-full border  uppercase"
      />
    );
  }

  return (
    <div
      title={name}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-lg font-semibold uppercase text-white"
    >
      {name.charAt(0)}
    </div>
  );
};

export default Avatar;
