"use client";
import React from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import SvgIconStyle from "./SvgIconStyle";

import { classNames } from "@/utils/helpers";
import useClientSession from "@/hooks/useClientSession";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

const UserDropdownView = () => {
  const { logout, session } = useClientSession();
  return (
    <Menu as="div" className={"relative inline-block"}>
      <MenuButton className="flex items-center ml-0 lg:ml-4">
        <p className=" font-semibold lg:text-[17px] lg:ml-4 text-[12px]">
          {session?.user?.firstName
            ? `Hello, ${session.user.firstName}`
            : ""}
        </p>
        <SvgIconStyle
          src="/Assets/svg/keyboard_arrow_down.svg"
          className=" text-white"
        />
      </MenuButton>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute z-10 mt-1 w-full origin-top rounded bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <MenuItem as="div" className={"cursor-pointer"} onClick={logout}>
              {({ focus }) => (
                <p
                  className={classNames(
                    focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    " px-4 py-2 text-sm flex space-x-2"
                  )}
                >
                  <ArrowUpTrayIcon className=" w-5 h-5 -rotate-90 " />
                  <span>Logout</span>
                </p>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default UserDropdownView;
