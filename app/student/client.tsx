"use client";
import Button from "@/components/Button";
import StudentStatusModal from "@/components/student/StudentStatusModal";
import React, { useState } from "react";
import OtpInput from "react-otp-input";

export default function () {
  const [statusOpen, setStatusOpen] = useState(false);
  const [otp, setOtp] = useState("");
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
          numInputs={4}
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
          variant={otp.length === 4 ? "primary" : "info"}
          disabled={otp.length !== 4}
          fullWidth
          className={`mt-6 ${
            otp.length === 4 ? "cursor-pointer" : " cursor-not-allowed"
          }`}
          onClick={() => {
            setStatusOpen(true);
          }}
        >
          Submit
        </Button>
      </div>
      <StudentStatusModal open={statusOpen} setOpen={setStatusOpen} />
    </>
  );
}
