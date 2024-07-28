"use client";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogPanel,
  Switch,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import Link from "next/link";
import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import {
  AddEmailsSchemaType,
  addEmailsSchema,
} from "@/validations/moduleSchema";
import {
  classNames,
  getErrObject,
  selectStyle,
  yupResolver,
} from "@/utils/helpers";
import { Controller, FormProvider, useForm } from "react-hook-form";
import Button from "../Button";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import SvgIconStyle from "../SvgIconStyle";
import { Input } from "../formControls/Input";
import ReactSelect, { GroupBase, OptionsOrGroups } from "react-select";
import ReactSelectAsync from "react-select/async";
import { SessionType, sessionSchema } from "@/validations/sessionSchema";
import { XiorError } from "xior";
import useAuthRequest from "@/hooks/useAuthRequest";
import toast from "react-hot-toast";
import { useRouter } from "next-nprogress-bar";
import { set } from "date-fns";
interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  setSession?: (session: ISession) => void;
  setSuccessOpen?: (value: boolean) => void;
  //   formTarget: FormTarget;
}

const minutesOptions = [
  { value: "00", label: "00" },
  { value: "15", label: "15" },
  { value: "30", label: "30" },
  { value: "45", label: "45" },
];
const CreateSessionModal = ({
  setSuccessOpen,
  setSession,
  open,
  setOpen,
}: Props) => {
  const { request } = useAuthRequest();
  const searchParams = useSearchParams();
  const { moduleId } = useParams<{ moduleId: string }>();
  const pathname = usePathname();
  const router = useRouter();

  const defaultValues: SessionType = {
    hour: 0,
    minute: {
      value: "00",
      label: "00",
    },
    location: {
      value: "no-location",
      label: "no-location",
    },
    radius: 0,
    geofencing: false,
  };
  const onClose = () => {
    setOpen(false);
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver ? yupResolver(sessionSchema) : undefined,
    defaultValues,
  });
  const {
    register,
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = methods;
  console.log(errors);

  const geofencing = watch("geofencing");

  useEffect(() => {
    if (geofencing) {
      reset({
        ...getValues(),
        location: {
          value: "",
          label: "",
        },
        radius: "",
      });
    } else {
      reset({
        ...getValues(),
        location: {
          value: "no-location",
          label: "no-location",
        },
        radius: "",
      });
    }
  }, [geofencing, reset, getValues]);

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setValue("location", {
          label: "current location",
          value: `${position.coords.latitude},${position.coords.longitude}`,
        });
      },
      (error) => {
        toast.error(error.message);
        console.error(error);
      }
    );
  };

  const loadOptions = async (
    inputValue: string
  ): Promise<
    OptionsOrGroups<
      { value: string; label: string },
      GroupBase<{ value: string; label: string }>
    >
  > => {
    if (inputValue.length > 2) {
      try {
        const { data } = await request.get("places", {
          params: {
            keyword: inputValue,
          },
        });
        const options = data?.data?.places ?? [];
        return options;
      } catch (error) {
        console.error("Error fetching data", error);
        return [];
      }
    } else {
      return [];
    }
  };
  const onSubmit = async (data: SessionType) => {
    const totalDuration =
      (Number(data.hour) * 60 + Number(data.minute.value)) * 60 * 1000;

    if (!totalDuration) {
      toast.error("Duration cannot be zero");
      return;
    }
    try {
      const response = await request.post(
        "/sessions",
        {
          duration:
            (Number(data.hour) * 60 + Number(data.minute.value)) * 60 * 1000,
          geofencing: data.geofencing,
          ...(data?.geofencing && {
            lattitude: parseFloat(data.location.value.split(",")[0]),
            longitude: parseFloat(data.location.value.split(",")[1]),
            buffer: parseFloat(data.radius as string),
          }),
        },
        {
          params: {
            module: moduleId,
          },
        }
      );
      if (response) {
        setSession?.(response.data?.data?.session);
        setSuccessOpen?.(true);
        toast.success("Session created successfully");
        router.push(`${pathname}?${searchParams.toString()}`);
        router.refresh();
        reset(defaultValues);
        onClose();
      }
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
                <DialogPanel className="relative transform overflow-hidden rounded-[8px] bg-white text-left shadow-xl transition-all sm:my-2 sm:w-full sm:max-w-[506px]">
                  <FormProvider {...methods}>
                    <form
                      method="post"
                      className=" w-full"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className=" flex justify-between p-[29px] w-full items-center border-b border-b-[#E5E7EB]">
                        <p className=" text-[#4A4A4A] text-[21px] font-semibold">
                          Start Session
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
                        <p className=" text-[#6B7280] mb-4">
                          Fill in the necessary information to start a new
                          session
                        </p>

                        <div className=" w-full">
                          <div className=" flex space-x-3.5 mt-2">
                            <div className="flex-1">
                              <div className="relative rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                  <SvgIconStyle
                                    src="/Assets/svg/time-icons.svg"
                                    className=" text-[#4A4A4A]"
                                  />
                                </div>
                                <input
                                  type="number"
                                  {...register("hour")}
                                  className="block w-full bg-[#F9FAFB] border border-[#DFE1E6] pl-10 pr-12 text-[#354052] focus:ring-1 ring-inset ring-[#D1D5DB] placeholder:text-[#7A869A] focus:outline-none focus:ring-inset focus:ring-blue-400"
                                  placeholder="00"
                                />
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                  <span className="text-gray-500 font-semibold">
                                    Hr
                                  </span>
                                </div>
                              </div>
                              <p className=" text-red-500 text-xs">
                                {!!getErrObject("hour", errors) && (
                                  <>
                                    <span>
                                      <InformationCircleIcon className="w-4 h-4 mr-1 inline" />
                                    </span>
                                    {getErrObject("hour", errors)?.message}
                                  </>
                                )}
                              </p>
                            </div>
                            <div className="flex-1">
                              <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 z-20 left-0 flex items-center pl-3">
                                  <SvgIconStyle
                                    src="/Assets/svg/time-icons.svg"
                                    className=" text-[#4A4A4A]"
                                  />
                                </div>
                                <Controller
                                  control={control}
                                  name={"minute"}
                                  render={({
                                    field: { onBlur, onChange, value, ref },
                                  }) => (
                                    <ReactSelect
                                      classNamePrefix="custom-select"
                                      styles={selectStyle}
                                      ref={ref}
                                      id={"minute"}
                                      placeholder={"00"}
                                      options={minutesOptions}
                                      isClearable={false}
                                      isSearchable={false}
                                      className={`myselect bg-[#F9FAFB]  w-full focus:outline-none focus:ring focus:border-blue-300
                            ${errors?.["minute"] && "errorControl"}`}
                                      onBlur={onBlur}
                                      value={
                                        (
                                          value as unknown as typeof minutesOptions
                                        )?.length ||
                                        (value as (typeof minutesOptions)[0])
                                          ?.value
                                          ? value
                                          : null
                                      }
                                      onChange={(newValue) =>
                                        onChange(newValue)
                                      }
                                    />
                                  )}
                                />
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-8">
                                  <span className="text-gray-500 font-semibold">
                                    Min
                                  </span>
                                </div>
                              </div>
                              <p className=" text-red-500 text-xs">
                                {!!getErrObject("minute", errors) && (
                                  <>
                                    <span className=" ">
                                      <InformationCircleIcon className="w-4 h-4 mr-1 inline" />
                                    </span>
                                    {
                                      getErrObject("minute", errors)?.value
                                        .message
                                    }
                                  </>
                                )}
                              </p>
                            </div>
                          </div>

                          {geofencing && (
                            <>
                              <div className="flex w-full mt-3.5">
                                <Controller
                                  control={control}
                                  name={"location"}
                                  render={({
                                    field: { onBlur, onChange, value, ref },
                                  }) => (
                                    <ReactSelectAsync
                                      classNamePrefix="custom-select"
                                      styles={selectStyle}
                                      ref={ref}
                                      id={"location"}
                                      placeholder={"Location"}
                                      options={[]}
                                      loadOptions={loadOptions}
                                      isClearable={false}
                                      isSearchable={true}
                                      className={`myselect-2 w-[85%] bg-[#F9FAFB] focus:outline-none focus:ring focus:border-blue-300
                            ${errors?.["location"] && "errorControl"}`}
                                      onBlur={onBlur}
                                      value={
                                        (
                                          value as unknown as typeof minutesOptions
                                        )?.length ||
                                        (value as (typeof minutesOptions)[0])
                                          ?.value
                                          ? value
                                          : null
                                      }
                                      onChange={(newValue) =>
                                        onChange(newValue)
                                      }
                                    />
                                  )}
                                />
                                <button
                                  type="button"
                                  onClick={handleLocation}
                                  className="relative w-[15%] -ml-px bg-[#096DD9] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#096DD9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 focus:z-10 rounded-r-[8px]"
                                >
                                  <SvgIconStyle
                                    src="/Assets/svg/location-icons.svg"
                                    className=" text-white"
                                  />
                                </button>
                              </div>
                              <div className=" w-full mt-3.5">
                                <Input
                                  type="number"
                                  name="radius"
                                  dark
                                  placeholder="Radius in meters"
                                />
                              </div>
                            </>
                          )}
                          <div className=" w-full mt-5">
                            <Controller
                              control={control}
                              name={"geofencing"}
                              render={({
                                field: { onBlur, onChange, value, ref },
                              }) => (
                                <label className=" w-fit flex space-x-2">
                                  <Switch
                                    checked={value}
                                    onChange={onChange}
                                    ref={ref}
                                    onBlur={onBlur}
                                    className={classNames(
                                      value ? "bg-[#096DD9]" : "bg-gray-200",
                                      "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    )}
                                  >
                                    <span className="sr-only">Use setting</span>
                                    <span
                                      aria-hidden="true"
                                      className={classNames(
                                        value
                                          ? "translate-x-5"
                                          : "translate-x-0",
                                        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                                      )}
                                    />
                                  </Switch>
                                  <span className=" text-[17px] font-medium text-[#111928]">
                                    Geo fencing
                                  </span>
                                </label>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                      <div className=" w-full bg-white flex justify-end p-[30px] border-t border-t-[#E5E7EB]">
                        <Button
                          size={"sm"}
                          loading={isSubmitting}
                          disabled={isSubmitting}
                          className=""
                        >
                          Start
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
};

export default CreateSessionModal;
