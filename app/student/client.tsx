"use client";
import Button from "@/components/Button";
import StudentStatusModal from "@/components/student/StudentStatusModal";
import useAuthRequest from "@/hooks/useAuthRequest";
import { getGeoLocation } from "@/utils/helpers";
import { ExclamationCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import OtpInput from "react-otp-input";
import { XiorError } from "xior";

export default function () {
  const { request } = useAuthRequest();
  const mounted = useRef(true);
  const [statusOpen, setStatusOpen] = useState(false);
  const [status, setStatus] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  useEffect(() => {
    if (mounted.current) {
      toast(
        (t) => (
          <div>
            <div className=" relative sm:inline-flex sm:items-start bg-white rounded-lg">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 sm:mx-0 sm:h-10 sm:w-10">
                <ExclamationCircleIcon
                  aria-hidden="true"
                  className="h-6 w-6 text-orange-600"
                />
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 className="text-base font-semibold leading-6 text-gray-900">
                  Location Info
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Please ensure your device's location services are enabled.
                    For the most accurate results, we recommend using a mobile
                    device for generating and recording location-based
                    attendance.
                  </p>
                </div>
              </div>
              <div className="absolute right-0 top-0 sm:block">
                <button
                  type="button"
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => toast.dismiss(t.id)}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        ),
        {
          duration: 6000,
          position: "top-center",
        }
      );
    }
    mounted.current = false;
  }, []);

  const handleTakeAttendance = async ({
    longitude,
    latitude,
  }: {
    longitude: number;
    latitude: number;
  }) => {
    setLoading(true);
    try {
      const response = await request.post("/attendance", {
        code: otp,
        longitude: longitude,
        lattitude: latitude,
      });
      if (response) {
        setOtp("");
        if (response?.data?.message.includes("flagged")) {
          setStatus("flagged");
          setStatusOpen(true);
        } else {
          setStatus("present");
          setStatusOpen(true);
          toast.success(response?.data?.message);
        }
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

  const takeAttendance = () => {
    getGeoLocation((position) => {
      handleTakeAttendance({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      });
    });
  };

  return (
    <>
      <div className=" w-full px-2">
        <h6 className=" font-medium text-[#111928] text-center mb-2">
          session code
        </h6>
        <OtpInput
          value={otp}
          containerStyle={{ display: "flex", justifyContent: "center" }}
          onChange={setOtp}
          numInputs={5}
          renderSeparator={<span>&nbsp;&nbsp;</span>}
          renderInput={(props) => (
            <input
              {...props}
              className=" w-14 bg-[#F9FAFB] font-bold"
              style={{}}
            />
          )}
        />
        <p className=" text-sm text-[#6B7280] text-center mt-1">
          Enter the session code given by the lecturer
        </p>
        <Button
          loading={loading}
          variant={otp.length === 5 ? "primary" : "info"}
          disabled={otp.length !== 5 || loading}
          fullWidth
          className={`mt-6 ${
            otp.length === 5 ? "cursor-pointer" : " cursor-not-allowed"
          }`}
          onClick={takeAttendance}
        >
          Submit
        </Button>
      </div>
      <StudentStatusModal
        status={status}
        open={statusOpen && !!status}
        onClose={() => {
          setTimeout(() => setStatus(undefined), 2000);
          setStatusOpen(false);
        }}
      />
    </>
  );
}
