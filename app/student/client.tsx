"use client";
import Button from "@/components/Button";
import StudentStatusModal from "@/components/student/StudentStatusModal";
import useAuthRequest from "@/hooks/useAuthRequest";
import { getGeoLocation } from "@/utils/helpers";
import { time } from "console";
import React, { useState } from "react";
import toast from "react-hot-toast";
import OtpInput from "react-otp-input";
import { XiorError } from "xior";

export default function () {
  const { request } = useAuthRequest();
  const [statusOpen, setStatusOpen] = useState(false);
  const [status, setStatus] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

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
