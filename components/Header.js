import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BoltIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import Container from "./Container";
import Avatar from "./Avatar";
import Link from "next/link";
import Logo from "./Logo";

function Header() {
  return (
    <header className="sticky top-0 border-b py-3 dark:border-slate-700">
      <Container className="flex items-center justify-between ">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex items-center">
          <Link
            href="/subscription"
            className="mr-2 flex items-center justify-center rounded-md py-2 px-3 text-xs font-semibold text-blue-800 transition-colors hover:bg-blue-50 dark:text-blue-500 dark:hover:bg-slate-800 md:text-sm"
          >
            <BoltIcon className="mr-2 h-5 w-5 stroke-blue-800 stroke-2 dark:stroke-blue-500" />
            Upgrade
          </Link>
          <Menu as="div" className="relative ml-3">
            <Menu.Button className="flex rounded-full">
              <Avatar name="Zaid Akhter" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md border bg-white py-1 text-slate-700 shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/subscription"
                      className={classNames(
                        active && "bg-slate-100 dark:bg-slate-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Subscription
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      href="#"
                      className={classNames(
                        active && "bg-slate-100 dark:bg-slate-700",
                        "block w-full px-4 py-2 text-left text-sm"
                      )}
                    >
                      Log Out
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </Container>
    </header>
  );
}

export default Header;
