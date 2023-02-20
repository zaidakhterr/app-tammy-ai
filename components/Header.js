import { Fragment } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import classNames from "classnames";
import { Menu, Transition } from "@headlessui/react";
import {
  SparklesIcon,
  MoonIcon,
  SunIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Container from "./Container";
import Avatar from "./Avatar";
import Logo from "./Logo";

// const user = null;
const user = {
  name: "Zaid Akhter",
  email: "zaid@gmail.com",
  // plan: "Pro",
};

function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b bg-white py-3 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <Container className="flex items-center justify-between ">
        <Link href="/">
          <Logo />
        </Link>
        {user ? (
          <div className="flex items-center">
            {user.plan !== "Pro" && (
              <Link
                href="/subscription"
                className="mr-2 flex items-center justify-center rounded-md py-2 px-3 text-xs font-semibold text-blue-500 transition-colors hover:bg-blue-50 dark:text-blue-500 dark:hover:bg-slate-800 md:text-sm"
              >
                <SparklesIcon className="mr-2 h-5 w-5 stroke-blue-500 stroke-2 dark:stroke-blue-500" />
                Upgrade
              </Link>
            )}
            <Menu as="div" className="relative ml-3">
              <Menu.Button className="flex rounded-full">
                <Avatar name={user.name} />
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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-slate-100 rounded-md border bg-white px-1 text-slate-700 shadow-lg dark:divide-slate-700/50 dark:border-slate-700 dark:bg-slate-800 dark:text-white">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/subscription"
                          className={classNames(
                            active && "bg-slate-100 dark:bg-slate-700",
                            "block rounded px-3 py-2 text-sm"
                          )}
                        >
                          Subscription
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active && "bg-slate-100 dark:bg-slate-700",
                            "flex w-full items-center rounded px-3 py-2 text-left text-sm"
                          )}
                          onClick={() =>
                            setTheme(theme === "dark" ? "light" : "dark")
                          }
                        >
                          {theme === "dark" ? (
                            <>
                              Light Mode{" "}
                              <SunIcon className="ml-2 h-4 w-4 stroke-2" />
                            </>
                          ) : (
                            <>
                              Dark Mode{" "}
                              <MoonIcon className="ml-2 h-4 w-4 stroke-2" />
                            </>
                          )}
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active &&
                              "bg-red-500/10 text-red-500 dark:text-red-500",
                            "hov block w-full rounded px-3 py-2 text-left text-sm"
                          )}
                        >
                          Log Out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/auth/login"
              className="flex items-center justify-center rounded-md border border-blue-500 py-2 px-3 text-xs font-semibold text-blue-500 transition-colors hover:bg-blue-50 dark:text-blue-500 dark:hover:bg-slate-800 md:text-sm"
            >
              <ArrowRightOnRectangleIcon className="mr-2 h-5 w-5 stroke-blue-500 stroke-2 dark:stroke-blue-500" />
              Login
            </Link>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;
