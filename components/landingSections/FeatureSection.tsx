import { Cpu, LibraryBig, Lock, MapPinX, Sparkles, Zap } from "lucide-react";
import Image from "next/image";
import { Highlighter } from "../ui/highlighter";
import { AuroraText } from "../ui/aurora-text";

export default function FeaturesSection() {
  return (
    <section className="overflow-hidden py-16 md:py-32">
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-4xl text-gray-900 font-semibold lg:text-5xl">
            Why Choose{" "}
            <Highlighter action="highlight" color="#0575E6">
              <span className="text-white">Proximity</span>
            </Highlighter>
          </h2>
          <p className="mt-6 text-lg text-gray-700">
            Proximity is the smarter way to handle attendance, replacing
            outdated methods with simple mobile check-ins. Save time, eliminate
            proxies, and keep trustworthy records—all in one easy solution.
          </p>
        </div>
        <div className="mask-b-from-75% mask-l-from-75% mask-b-to-95% mask-l-to-95% relative -mx-4 pr-3 pt-3 md:-mx-12">
          <div className="perspective-midrange">
            <div className="rotate-x-6 -skew-2">
              <div className="aspect-88/36 relative">
                <Image
                  src="/Assets/images/feature-image.png"
                  className=""
                  alt="payments illustration light"
                  width={2797}
                  height={1137}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="size-4 text-mariner-700" />
              <h3 className="text-sm font-medium">Save Time</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Lecturers, managers, and organizers spend less time on roll calls
              and tracking.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPinX className="size-4 text-mariner-700" />
              <h3 className="text-sm font-medium">Stop Proxy Attendance</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Location-based check-ins make sure only the right people are
              marked present.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <LibraryBig className="size-4 text-mariner-700" />
              <h3 className="text-sm font-medium">Accurate Records</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Attendance data is logged in real time and stored securely.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-mariner-700" />

              <h3 className="text-sm font-medium">Flexible</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Designed for classrooms, offices, events, or any place where
              attendance matters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
