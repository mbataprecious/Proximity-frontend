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

const UserDropdownView = () => {
  const { logout, session } = useClientSession();
  return (
    <Menu as="div">
      <MenuButton className="flex items-center ml-4">
        <p className=" font-semibold text-[17px] ml-4">
          {session?.user?.firstName
            ? `Hello, ${session.user.firstName}`
            : "Hello, Michael"}
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
        <MenuItems className="absolute z-10 mt-1 w-[143px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <MenuItem as="div" className={"cursor-pointer"} onClick={logout}>
              {({ focus }) => (
                <p
                  className={classNames(
                    focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Logout
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
