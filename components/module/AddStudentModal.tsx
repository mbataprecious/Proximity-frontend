"use client";
import React from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  AddEmailsSchemaType,
  addEmailsSchema,
} from "@/validations/moduleSchema";
import { yupResolver } from "@/utils/helpers";
import { FormProvider, useForm } from "react-hook-form";
import { CustomCreateSelect } from "../formControls/CustomReactCreateSelect";
import Button from "../Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  //   formTarget: FormTarget;
}

export default function AddStudentModal({ open, setOpen }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const defaultValues = {
    emails: [],
  };

  const onClose = () => {
    setOpen(false);
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.delete("addState");
    // cast to string
    const search = current.toString();
    // or const query = `${'?'.repeat(search.length && 1)}${search}`;
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver ? yupResolver(addEmailsSchema) : undefined,
    defaultValues,
  });
  const onSubmit = async (data: AddEmailsSchemaType) => {
    try {
      console.log({ data });
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <>
      <Transition show={open}>
        <Dialog className="relative z-30" onClose={() => onClose()}>
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
                  <div className=" flex justify-between p-[29px] w-full items-center border-b border-b-[#E5E7EB]">
                    <p className=" text-[#4A4A4A] text-[21px] font-semibold">
                      Add New Student
                    </p>

                    <button className="  text-[#9CA3AF]" onClick={onClose}>
                      <XMarkIcon className=" w-6 h-6" />
                    </button>
                  </div>
                  <div className=" p-[30px]">
                    <FormProvider {...methods}>
                      <form
                        method="post"
                        className=" w-full"
                        onSubmit={methods.handleSubmit(onSubmit)}
                      >
                        <CustomCreateSelect
                          label="Email"
                          name="emails"
                          placeholder="Enter emails"
                          isMulti
                          options={[]}
                        />
                      </form>
                    </FormProvider>
                  </div>
                  <div className=" w-full bg-white flex justify-end p-[30px] border-t border-t-[#E5E7EB]">
                    <Button variant={"info"} size={"sm"} className="">
                      Add
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
