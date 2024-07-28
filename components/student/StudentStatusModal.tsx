"use client";
import React from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Button from "../Button";
import Image from "next/image";

interface Props {
  open: boolean;
  onClose: () => void;
  status?: string;
  //   formTarget: FormTarget;
}

export default function StudentStatusModal({ status, open, onClose }: Props) {
  return (
    <>
      <Transition show={open}>
        <Dialog className="relative z-30" onClose={onClose}>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-[8px] bg-white text-left shadow-xl transition-all sm:my-2 sm:w-full sm:max-w-[506px]">
                  <div className=" flex justify-center p-[29px] w-full items-center border-b border-b-[#E5E7EB]">
                    <p className=" text-[#4A4A4A] text-base font-bold md:text-xl text-center md:font-semibold">
                      {status === "flagged" ? "Your attendance has been flagged, contact your module lecturer" : "your attendance has been marked successfully"}
                    </p>
                  </div>
                  <div className=" p-[30px] flex justify-center items-center">
                    {status === "flagged" ?
                      <Image
                        src={"/Assets/svg/flagged-icon.svg"}
                        className=" w-[77px] h-[77px] md:w-[242px] md:h-[242px]"
                        height={242}
                        width={242}
                        alt=""
                      /> :
                      <Image
                        src={"/Assets/svg/icons8-success.svg"}
                        className=" w-[77px] h-[77px] md:w-[242px] md:h-[242px]"
                        height={242}
                        width={242}
                        alt=""
                      />}
                  </div>
                  <div className=" w-full bg-white flex justify-end p-[30px] border-t border-t-[#E5E7EB]">
                    <Button
                      fullWidth
                      size={"sm"}
                      className=""
                      onClick={onClose}
                    >
                      back
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
