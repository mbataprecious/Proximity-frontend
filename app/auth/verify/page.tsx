import Button from "@/components/Button";
import { Container } from "@/components/Container";
import { verifyToken } from "@/data/fetchers";
import Link from "next/link";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const verify = await verifyToken(searchParams["token"] as string);
  console.log(verify.data);
  return (
    <div className=" h-screen bg-primary">
      <Container className="flex justify-center items-center h-full">
        <div>
          <h3 className=" font-bold text-3xl md:text-5xl text-white text-center">
            Verification Successful
          </h3>
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

export default page;
