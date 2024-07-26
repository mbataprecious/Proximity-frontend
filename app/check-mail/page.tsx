import Button from "@/components/Button";
import { Container } from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CheckMail = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {

  return (
    <div className=" h-screen bg-primary">
      <Container className="flex justify-center items-center h-full">
        <div className="">
          <Image
            src={"/Assets/svg/sent-mail.svg"}
            alt="mail sent"
            className=" mx-auto w-[200px]"
            width={320.278}
            height={312.168}
          />
          <h3 className=" font-semibold text-3xl text-white text-center">
            Check Your Mail
          </h3>
          <p className=" text-white text-center mt-4">
            We have sent a {searchParams?.reset ? "reset" : "verification"} link to your email
          </p>
          <Link href={"/login"}>
            <Button
              isOutlined
              variant={"info"}
              className=" mt-4 w-full !text-white"
            >
              Back to Login
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default CheckMail;
