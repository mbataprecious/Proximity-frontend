"use client";

import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import SvgIconStyle from "./SvgIconStyle";
import Link from "next/link";
import { ArrowLeftIcon, Bars3Icon } from "@heroicons/react/24/solid";
import useClientSession from "@/hooks/useClientSession";
import { useRouter } from "next-nprogress-bar";

interface Props {
  navItems: {
    title: string;
    icon: string;
    href: string;
  }[];
}

export default function SideBar({ navItems }: Props) {
  const { logout } = useClientSession();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className=" absolute md:hidden top-0 left-0 z-10">
        <div className=" px-4 py-4">
          <Bars3Icon
            onClick={() => setOpen(true)}
            className=" w-8 h-8 cursor-pointer"
          />
        </div>
      </div>
      <Dialog
        open={open}
        onClose={setOpen}
        // onClose={() => undefined}
        className="relative z-20 md:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
              <DialogPanel
                transition
                className="pointer-events-auto relative w-screen max-w-[273px] transform transition duration-500 ease-in-out data-[closed]:-translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col justify-between overflow-y-auto bg-[#017FED] py-6 shadow-xl">
                  <div>
                    <div className="px-5 py-3">
                      <ArrowLeftIcon
                        className=" w-6 h-6 text-white cursor-pointer"
                        onClick={() => router.back()}
                      />
                    </div>
                    <div className="relative mt-6 flex-1 px-2">
                      <div className=" space-y-5 pt-4">
                        {navItems.map(({ title, href, icon }, index) => {
                          const active = index
                            ? pathname.includes(href)
                            : pathname.endsWith(href);
                          return (
                            <Link
                              href={href}
                              key={title}
                              className={`rounded-md overflow-hidden block px-3 py-1.5 ${
                                active
                                  ? " bg-white text-[#0D5CC7] "
                                  : " bg-none text-white"
                              } `}
                            >
                              <div className="flex items-center bg-none">
                                <SvgIconStyle src={icon} />
                                <span className=" ml-4 font-semibold text-xl">
                                  {title}
                                </span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                    <div className="relative border-t mt-6 flex-1 px-2">
                      <div className=" space-y-5 pt-4">
                        <div
                          onClick={logout}
                          className={`rounded-md overflow-hidden block px-3 py-1.5 bg-none text-white`}
                        >
                          <div className="flex items-center bg-none">
                            <SvgIconStyle src={"/Assets/svg/logout-icon.svg"} />
                            <span className=" ml-4 font-semibold text-xl">
                              logout
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-5 py-3">
                    <div
                      className=" flex space-x-4 text-white cursor-pointer"
                      onClick={() => setOpen(false)}
                    >
                      <XMarkIcon className=" w-6 h-6 " />
                      <span className=" font-semibold text-xl">Close</span>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
