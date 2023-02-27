import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { IconChevronDown } from "@tabler/icons-react";
import classNames from "classnames";

const people = [
  { name: "Wade Cooper" },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
  { name: "Hellen Schmidt" },
];

const MyListbox = ({ options = [] }) => {
  const [selected, setSelected] = useState(options[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative ">
        <Listbox.Button
          className={
            " flex h-10  cursor-pointer items-center justify-center rounded border border-slate-200 bg-transparent stroke-slate-900 px-2 text-sm transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:stroke-slate-400 dark:border-slate-800 dark:stroke-white dark:hover:bg-slate-800 dark:disabled:bg-slate-800 dark:disabled:stroke-slate-600"
          }
        >
          <span className="block truncate">{selected.name}</span>
          <IconChevronDown className="ml-2 h-5 w-5  stroke-1" />
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute top-full left-0  mt-1 max-h-60 w-full overflow-auto rounded border border-slate-200  bg-white  py-1 text-sm shadow-lg  dark:border-slate-700 dark:bg-slate-800">
            {options.map((option, idx) => (
              <Listbox.Option
                key={idx}
                className={({ active }) =>
                  classNames(
                    "cursor-pointer px-2 py-1",
                    active && "  bg-slate-200 dark:bg-slate-700"
                  )
                }
                value={option}
              >
                {option.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default MyListbox;
