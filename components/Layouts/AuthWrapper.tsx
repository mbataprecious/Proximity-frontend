import React, { ReactNode } from "react";
import Image from "next/image";

const AuthWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full min-h-screen bg-[#EEF2F8]">
      <div className="relative hidden md:flex flex-1 justify-center items-center bg-[linear-gradient(180deg,#0575E6_0%,#0D5CC7_54.8%,#0F3CA8_100%)]">
        <div className=" max-w-[556px] px-4">
          <div className="w-full mb-[100px]">
            <Image
              className="mx-auto"
              src="/Assets/svg/proximity-circle.svg"
              alt="logo"
              width={105}
              height={105}
            />
          </div>
          <div className="mx-auto w-fit">
            <p className=" bg-[rgba(255,255,255,0.1)] text-base p-3 rounded-lg text-white">
              Effortless Attendance, Enhanced Integrity
            </p>
          </div>
          <h3 className=" text-[2.875rem] font-bold text-white text-center">
            Welcome to Proximity
          </h3>
          <p className=" text-white text-center text-sm">
            Join the future of attendance management. Sign up now to experience
            seamless and secure attendance tracking with Proximity.
          </p>
        </div>
        <svg
          className="absolute bottom-0 left-0"
          width="381"
          height="153"
          viewBox="0 0 381 153"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="102.5"
            cy="304.5"
            r="277.5"
            stroke="#0575E6"
            strokeWidth="2"
          />
          <circle
            cx="-2.5"
            cy="278.5"
            r="277.5"
            stroke="#0575E6"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div className="flex-1 flex justify-center items-center">{children}</div>
    </div>
  );
};

export default AuthWrapper;
