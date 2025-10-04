import { cn } from "@/lib/utils";
import { Spotlight } from "../ui/spotlight";
import Link from "next/link";

function Cta() {
  return (
    <div className="">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className=" flex w-full antialiased md:items-center md:justify-center relative isolate overflow-hidden bg-[#0e56c2] px-6 py-24 text-center after:pointer-events-none after:absolute after:inset-0 after:inset-ring after:inset-ring-white/10 sm:rounded-3xl sm:px-16 after:sm:rounded-3xl">
          <div
            className={cn(
              "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
              "[background-image:linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)]"
            )}
          />

          <Spotlight
            className="-top-40 left-0 md:-top-20 md:left-60"
            fill="white"
          />
          <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
            <h1 className="bg-opacity-50 bg-gradient-to-b from-mariner-50 to-mariner-200 bg-clip-text text-center text-4xl font-bold text-transparent md:text-5xl">
              Want to see <br /> Proximity in action?
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-white">
              Start tracking attendance the smart way, simple, secure, and
              precised.
            </p>
            <div className=" flex justify-center pt-6">
              <Link
                href="/signup"
                className="rounded-md bg-mariner-600 px-4.5 py-3.5 text-base font-semibold text-white shadow-xs hover:bg-mariner-500 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mariner-600"
              >
                {" "}
                Create An Account
                <span aria-hidden="true"> →</span>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cta;
