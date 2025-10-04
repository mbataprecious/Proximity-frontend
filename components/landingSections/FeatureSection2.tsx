import { Cog6ToothIcon, BoltIcon } from "@heroicons/react/20/solid";
import { MdWrongLocation } from "react-icons/md";
import { FaFileShield } from "react-icons/fa6";
import { IoSparkles } from "react-icons/io5";
import Image from "next/image";
import appScreenShot from "@/public/Assets/images/app-full-screen-shot.png";
import { Highlighter } from "../ui/highlighter";

const features = [
  {
    name: "Save Time.",
    description:
      "Lecturers, managers, and organizers spend less time on roll calls and tracking.",
    icon: BoltIcon,
  },
  {
    name: "Stop Proxy Attendance.",
    description:
      "Location-based check-ins make sure only the right people are marked present.",
    icon: MdWrongLocation,
  },
  {
    name: "Accurate Records.",
    description:
      " Designed for classrooms, offices, events, or any place where attendance matters.",
    icon: FaFileShield,
  },
  {
    name: "Flexible",
    description:
      "Designed for classrooms, offices, events, or any place where attendance matters.",
    icon: IoSparkles,
  },
  {
    name: "Simple to Use.",
    description: "Works right from a mobile phone no extra gadgets needed.",
    icon: Cog6ToothIcon,
  },
];

function FeatureSection2() {
  return (
    <div className=" py-24 sm:py-32" id="features">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-base/7 font-semibold text-mariner-600">
            Everything you need
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl sm:text-balance">
            Why Choose{" "}
            <Highlighter
              isView
              action="underline"
              strokeWidth={5}
              color="#0575E6"
            >
              <span>Proximity</span>
            </Highlighter>
          </p>
          <p className="mt-6 text-lg/8 text-gray-600">
            Proximity is the smarter way to handle attendance, replacing
            outdated methods with simple mobile check-ins.
          </p>
        </div>
      </div>
      <div className="relative overflow-hidden pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Image
            alt="App screenshot"
            src={appScreenShot}
            width={2432}
            height={1442}
            className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-white/10"
          />
          <div aria-hidden="true" className="relative">
            <div className="absolute -inset-x-20 bottom-0 bg-linear-to-t from-white pt-[7%]" />
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
        <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base/7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-9">
              <dt className="inline font-semibold text-gray-900">
                <feature.icon
                  aria-hidden="true"
                  className="absolute top-1 left-1 size-5 text-mariner-600"
                />
                {feature.name}
              </dt>{" "}
              <dd className="inline">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
export default FeatureSection2;
