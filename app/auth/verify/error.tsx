"use client"; // Error components must be Client Components

import { useEffect } from "react";
import Button from "@/components/Button";
import { Container } from "@/components/Container";
import Link from "next/link";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.log(error);
  }, [error]);

  return (
    <div className=" h-screen bg-[#0f3ca8]">
      <Container className="flex justify-center items-center h-full">
        <div>
          <h3 className=" font-bold text-3xl md:text-5xl text-white text-center">
            Verification Failed or Expired
          </h3>
          <Link href={"/login"}>
            <Button variant={"danger"} className=" mt-4 w-full !text-white">
              Back to Login
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
