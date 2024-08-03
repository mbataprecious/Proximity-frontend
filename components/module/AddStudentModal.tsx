"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  AddEmailsSchemaType,
  addEmailsSchema,
} from "@/validations/moduleSchema";
import { validateEmail, yupResolver } from "@/utils/helpers";
import { FormProvider, useForm } from "react-hook-form";
import { CustomCreateSelect } from "../formControls/CustomReactCreateSelect";
import Button from "../Button";
import { usePathname, useParams, useSearchParams } from "next/navigation";
import useAuthRequest from "@/hooks/useAuthRequest";
import { XiorError } from "xior";
import toast from "react-hot-toast";
import { useRouter } from "next-nprogress-bar";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  //   formTarget: FormTarget;
}

export default function AddStudentModal({ open, setOpen }: Props) {
  const { request } = useAuthRequest();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [invalid, setInvalid] = useState(false);
  const params = useParams<{ moduleId: string }>();
  const router = useRouter();
  const defaultValues = {
    emails: [],
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let timeout: any;
    if (invalid) {
      clearTimeout(timeout);
      timeout = setTimeout(() => setInvalid(false), 2000);
    }
    () => clearTimeout(timeout);
  }, [invalid]);

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver ? yupResolver(addEmailsSchema) : undefined,
    defaultValues,
  });

  const {
    setValue,
    watch,
    reset,
    formState: { isSubmitting },
  } = methods;

  const emails = watch("emails");
  const handleCreate = (inputValue: string) => {
    if (validateEmail(inputValue)) {
      const newEmail = { value: inputValue, label: inputValue };
      setValue("emails", [...(!!emails ? emails : []), newEmail]);
    } else {
      setInvalid(true);
    }
  };
  const onSubmit = async (data: AddEmailsSchemaType) => {
    try {
      const response = await request.post(
        "/students",
        {
          emails: data.emails?.map(({ value }) => value),
        },
        {
          params: {
            module: params?.moduleId,
          },
        }
      );
      if (response) {
        onClose();
        reset();
        toast.success("added successfully");
      }
      console.log({ data });
    } catch (error) {
      if (error instanceof XiorError) {
        toast.error(error?.response?.data.message as string);
      } else {
        toast.error((error as { message: string })?.message);
      }
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
                <DialogPanel className="relative transform overflow-hidden rounded-[8px] bg-white text-left shadow-xl transition-all sm:my-2 sm:w-full sm:max-w-[506px] max-[700px]:!w-[95%]">
                  <FormProvider {...methods}>
                    <form
                      method="post"
                      className=" w-full"
                      onSubmit={methods.handleSubmit(onSubmit)}
                    >
                      <div className=" flex justify-between p-[29px] w-full items-center border-b border-b-[#E5E7EB]">
                        <p className=" text-[#4A4A4A] text-[21px] font-semibold">
                          Add New Student
                        </p>

                        <button
                          type="button"
                          className="  text-[#9CA3AF]"
                          onClick={onClose}
                        >
                          <XMarkIcon className=" w-6 h-6" />
                        </button>
                      </div>
                      <div className=" p-[30px]">
                        <CustomCreateSelect
                          label="Email"
                          name="emails"
                          placeholder="Enter emails"
                          isMulti
                          options={
                            (emails as { value: string; label: string }[]) ?? []
                          }
                          onCreateOption={handleCreate}
                          prefixCreateLebel="Add Email"
                        />
                        <small className=" text-red-500">
                          {invalid && "the mail you are adding is not valid"}
                        </small>
                      </div>
                      <div className=" w-full bg-white flex justify-end p-[30px] border-t border-t-[#E5E7EB]">
                        <Button
                          loading={isSubmitting}
                          disabled={isSubmitting}
                          variant={"info"}
                          size={"sm"}
                          className=""
                        >
                          Add
                        </Button>
                      </div>
                    </form>
                  </FormProvider>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
