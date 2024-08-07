"use client";
import { useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import useAuthRequest from "@/hooks/useAuthRequest";
import { useRouter } from "next-nprogress-bar";
import { XiorError } from "xior";
import toast from "react-hot-toast";
import Button from "./Button";

export default function DeleteModuleModal({
  deleteAll = false,
  isSingle = false,
  singleModule,
  selectedModules,
  open,
  onClose,
}: {
  deleteAll?: boolean;
  isSingle?: boolean;
  singleModule?: IModule;
  selectedModules: IModule[];
  open: boolean;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const { request } = useAuthRequest();
  const router = useRouter();
  const handleDelete = async () => {
    setLoading(true);
    try {
      //throw Error("Not implemented");
      const params = new URLSearchParams(document.location.search);
      const response = await (deleteAll
        ? request.delete(`modules/all`)
        : isSingle
        ? request.delete(`/modules/${singleModule?._id}`)
        : request.delete(`/modules/`, {
            params: {
              modules: selectedModules.map(({ _id }) => _id).join(","),
            },
          }));
      if (response) {
        toast.success(response?.data?.message);
        onClose();
        router.push(`/admin/module?${params.toString()}`);
        router.refresh();
      }
    } catch (error) {
      if (error instanceof XiorError) {
        toast.error(error?.response?.data.message as string);
      } else {
        toast.error((error as { message: string })?.message);
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Transition show={open}>
      <Dialog className="relative z-10" onClose={onClose}>
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
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {deleteAll
                        ? "Delete All Modules"
                        : singleModule?.title
                        ? "Delete Module"
                        : "Delete Selected Modules"}
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {`Are you sure you want to ${
                          deleteAll
                            ? "delete all modules"
                            : singleModule?.title
                            ? `delete "${singleModule?.title}" module`
                            : "delete selected modules"
                        }? This action cannot be undone.`}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:ml-10 sm:mt-4 sm:flex sm:pl-4">
                  <Button
                    variant={"danger"}
                    type="button"
                    disabled={loading}
                    loading={loading}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 !px-3 !py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto"
                    onClick={() => handleDelete()}
                  >
                    {deleteAll
                      ? "Delete modules"
                      : isSingle
                      ? "Delete module"
                      : "Delete modules"}
                  </Button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:mt-0 sm:w-auto"
                    onClick={() => onClose()}
                    data-autofocus
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
