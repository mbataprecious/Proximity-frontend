import Image from "next/image";
import { AnimatedGridPattern } from "../ui/animated-grid-pattern";
import { TextEffect } from "../ui/text-effect";
import { HeroHeader } from "./Header";
import studentImg from "../../public/Assets/images/hero/student-learning.jpg";
import techWorker from "../../public/Assets/images/hero/worker.jpg";
import lecture from "../../public/Assets/images/hero/studendent_and_lecturer.jpg";
import workingTogether from "../../public/Assets/images/hero/working-together-hero.png";
import colleges from "../../public/Assets/images/hero/colleges-hero.jpg";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="bg-[linear-gradient(180deg,#0575E6_0%,#0D5CC7_54.8%,#0F3CA8_100%)]">
      <HeroHeader />
      <main>
        <div className="relative isolate">
          <AnimatedGridPattern
            numSquares={30}
            maxOpacity={0.1}
            duration={1}
            repeatDelay={1}
            className="inset-0 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
          />
          <div
            aria-hidden="true"
            className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
          >
            <div
              style={{
                clipPath:
                  "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
              }}
              className="aspect-801/1036 w-200.25 bg-linear-to-tr  from-[#36D1DC] to-[#3a0063] opacity-30"
            />
          </div>
          <div className="overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
              <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                <div className="relative w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                  <TextEffect
                    preset="fade-in-blur"
                    speedSegment={0.3}
                    as="h1"
                    className="text-4xl font-semibold tracking-tight text-white sm:text-6xl"
                  >
                    Smart Attendance Tracking with Geofencing
                  </TextEffect>
                  <TextEffect
                    per="line"
                    preset="fade-in-blur"
                    speedSegment={0.3}
                    delay={0.5}
                    as="p"
                    className="mt-6 text-lg leading-8 text-mariner-200 sm:max-w-md lg:max-w-none"
                  >
                    No more proxy sign-ins or wasted time. Proximity helps
                    schools, companies, and organizations track attendance
                    accurately, using simple location check-ins.
                  </TextEffect>
                  <div className="mt-10 flex items-center gap-x-6">
                    <Link
                      href="/login"
                      className="rounded-md bg-mariner-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-mariner-500 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mariner-600"
                    >
                      Get started
                    </Link>
                    <a
                      href="#faq"
                      className="text-sm font-semibold leading-6 text-white"
                    >
                      See How It Works <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                  <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-0 xl:pt-80">
                    <div className="relative">
                      <Image
                        alt="student attendance"
                        src={studentImg}
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                  <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                    <div className="relative">
                      <Image
                        alt="worker"
                        src={techWorker}
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="relative">
                      <Image
                        alt=""
                        src={lecture}
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                  <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                    <div className="relative">
                      <Image
                        alt=""
                        src={workingTogether}
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                    <div className="relative">
                      <Image
                        alt=""
                        src={colleges}
                        className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
