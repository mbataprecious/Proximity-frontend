"use client";
import React from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Button from "../Button";
import SvgIconStyle from "../SvgIconStyle";
import { copyTextToClipboard } from "@/utils/helpers";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  session?: ISession;
  //   formTarget: FormTarget;
}

const SessionSuccessModal = ({ session, open, setOpen }: Props) => {
  return (
    <Transition show={open}>
      <Dialog className="relative z-30" onClose={() => undefined}>
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
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform overflow-hidden rounded-[8px] bg-white text-left shadow-xl transition-all sm:my-2 sm:w-full sm:max-w-[506px]">
                <div className="relative flex justify-center p-[29px] w-full items-center border-b border-b-[#E5E7EB]">
                  <p className=" text-[#4A4A4A] text-[21px] font-semibold">
                    Session Created Successfully
                  </p>
                  <button
                    type="button"
                    className=" absolute right-[20px] top-[30px]  text-[#9CA3AF]"
                    onClick={() => setOpen(false)}
                  >
                    <XMarkIcon className=" w-6 h-6" />
                  </button>
                </div>
                <div className=" p-[30px]">
                  <h4 className=" text-4xl font-medium text-center text-[#4A4A4A] text-[54px]">
                    {session?.code}
                  </h4>
                  <p className=" text-xs font-medium text-[#6B7280] mt-5 text-center">
                    Copy Session Code
                  </p>
                </div>
                <div className=" w-full bg-white flex justify-end p-[30px] border-t border-t-[#E5E7EB]">
                  <Button
                    fullWidth
                    size={"sm"}
                    onClick={() => {
                      copyTextToClipboard(session?.code ?? "");
                      toast.success("copied to clipboard");
                    }}
                    className=" flex justify-center"
                  >
                    Copy&nbsp;&nbsp;
                    <SvgIconStyle src="/Assets/svg/copy-icon.svg" />
                  </Button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SessionSuccessModal;
