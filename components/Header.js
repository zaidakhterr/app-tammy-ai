import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import classNames from "classnames";
import { useTheme } from "next-themes";
import { Menu, Transition } from "@headlessui/react";
import { IconDiamond, IconMoon, IconSun } from "@tabler/icons-react";
import { OutlineLink } from "./Button";
import Container from "./Container";
import Avatar from "./Avatar";
import Logo, { IconLogo } from "./Logo";
import useAuth from "@/utils/useAuth";

function Header() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { user, login, logout } = useAuth();

  return (
    <header className=" sticky top-0 z-40 h-16 border-b bg-white py-3 dark:border-neutral-700 dark:bg-neutral-900 ">
      <Container className="flex h-full items-center justify-between  ">
        <div className="flex items-center gap-3 sm:gap-6">
          <Link href="/" className="mr-2">
            <span className="hidden sm:block">
              <Logo />
            </span>
            <span className="block sm:hidden">
              <IconLogo />
            </span>
          </Link>

          {user && (
            <>
              <div className="flex items-center gap-4">
                <Link
                  className={classNames(
                    "text-sm hover:opacity-75",
                    router.pathname === "/" &&
                      "text-blue-500 dark:text-blue-600"
                  )}
                  href="/"
                >
                  Explore
                </Link>
                <Link
                  className={classNames(
                    "text-sm hover:opacity-75",
                    router.pathname === "/library" &&
                      "text-blue-500 dark:text-blue-600"
                  )}
                  href="/library"
                >
                  My Items
                </Link>
              </div>
            </>
          )}
        </div>

        {user ? (
          <div className="flex items-center gap-3">
            {user.plan !== "Pro" && (
              <OutlineLink
                className="hidden !border-none font-semibold sm:flex"
                href="/subscription"
              >
                <IconDiamond className="mr-2 h-5 w-5 stroke-blue-500 dark:stroke-blue-600" />
                Upgrade
              </OutlineLink>
            )}
            <Menu as="div" className="relative">
              <Menu.Button className="flex rounded-full">
                <Avatar name={user.name} />
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
                <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right divide-y divide-neutral-100 rounded border bg-white px-1 text-neutral-700 shadow-lg shadow-neutral-900/10 dark:divide-neutral-700/50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white">
                  <div className="overflow-clip px-3 py-2">
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p
                      title={user.email}
                      className="overflow-hidden text-ellipsis text-sm font-light text-neutral-500 dark:text-neutral-500"
                    >
                      {user.email}
                    </p>
                  </div>
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/subscription"
                          className={classNames(
                            active && "bg-neutral-100 dark:bg-neutral-700",
                            "block rounded-sm px-3 py-2 text-sm"
                          )}
                        >
                          Pricing & Subscription
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active && "bg-neutral-100 dark:bg-neutral-700",
                            "flex w-full items-center rounded-sm px-3 py-2 text-left text-sm"
                          )}
                          onClick={() =>
                            setTheme(theme === "dark" ? "light" : "dark")
                          }
                        >
                          {theme === "dark" ? (
                            <>
                              Light Mode{" "}
                              <IconSun className="ml-2 h-4 w-4 stroke-2" />
                            </>
                          ) : (
                            <>
                              Dark Mode{" "}
                              <IconMoon className="ml-2 h-4 w-4 stroke-2" />
                            </>
                          )}
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/contact"
                          className={classNames(
                            active && "bg-neutral-100 dark:bg-neutral-700",
                            "block rounded-sm px-3 py-2 text-sm"
                          )}
                        >
                          Support
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={logout}
                          className={classNames(
                            active &&
                              "bg-red-500/10 text-red-500 dark:text-red-500",
                            "hov block w-full rounded-sm px-3 py-2 text-left text-sm"
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
            <OutlineLink href="#" onClick={login}>
              Login
            </OutlineLink>
            <OutlineLink
              href="#"
              onClick={login}
              className="bg-blue-500 text-white hover:text-blue-600 dark:bg-blue-600 dark:text-white dark:hover:text-blue-600"
            >
              Register
            </OutlineLink>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;
