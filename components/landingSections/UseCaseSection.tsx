import Image from "next/image";
import educationImg from "../../public/Assets/images/attendace-in-education.png";
import officeImg from "../../public/Assets/images/office-attendance.png";
import eventImg from "../../public/Assets/images/event-attendance.png";
import workImg from "../../public/Assets/images/on_site_work.png";
import healthImg from "../../public/Assets/images/health-attendance.png";
import { Highlighter } from "../ui/highlighter";

function UseCaseSection() {
  return (
    <div className="bg-white py-24 sm:py-32" id="use-cases">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-base/7 font-semibold text-mariner-600 ">
          Use case
        </h2>
        <p className="mt-2 max-w-lg text-4xl font-semibold tracking-tight text-pretty text-gray-950 sm:text-5xl">
          Where{" "}
          <Highlighter
            isView
            action="circle"
            padding={14}
            strokeWidth={4}
            iterations={1}
            color="#EC8305b9"
          >
            <span className="text-primary">Proximity</span>
          </Highlighter>{" "}
          Works Best
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          <div className="relative lg:col-span-3">
            <div className="absolute inset-0 rounded-lg bg-white max-lg:rounded-t-4xl lg:rounded-tl-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
              <Image
                alt=""
                src={educationImg}
                className="h-80 object-cover object-left"
              />
              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-mariner-600">
                  Smart Attendance
                </h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-700">
                  Education (Students & Lecturers)
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-500">
                  Students check in with their phones as they enter class.
                  Lecturers save time, and schools get fair, accurate records
                  with no proxy sign-ins.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-t-4xl lg:rounded-tl-4xl" />
          </div>
          <div className="relative lg:col-span-3">
            <div className="absolute inset-0 rounded-lg bg-white lg:rounded-tr-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
              <Image
                alt=""
                src={officeImg}
                className="h-80 object-cover object-left lg:object-right"
              />
              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-mariner-600">
                  Reliable Workforce Tracking
                </h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-700">
                  Corporate Workplace
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-500">
                  Employees clock in only when they’re at the office or approved
                  work location. HR teams get reliable records for payroll and
                  compliance.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-white/15 lg:rounded-tr-4xl" />
          </div>
          <div className="relative lg:col-span-2">
            <div className="absolute inset-0 rounded-lg bg-white lg:rounded-bl-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-bl-[calc(2rem+1px)]">
              <Image
                alt=""
                src={eventImg}
                className="h-80 object-cover object-left"
              />
              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-mariner-600">
                  Seamless Check-ins
                </h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-700">
                  Event Management
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-500">
                  Attendees check in at the venue using geofencing. Organizers
                  get accurate headcounts without queues or manual verification.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-white/15 lg:rounded-bl-4xl" />
          </div>
          <div className="relative lg:col-span-2">
            <div className="absolute inset-0 rounded-lg bg-white" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
              <Image alt="" src={workImg} className="h-80 object-cover" />
              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-mariner-600">
                  On-site Verification
                </h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-700">
                  Field Work
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-500">
                  Technicians, engineers, or on-site staff mark attendance only
                  at their job sites. Managers can see who is present on the
                  ground in real time.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-white/15" />
          </div>
          <div className="relative lg:col-span-2">
            <div className="absolute inset-0 rounded-lg bg-white max-lg:rounded-b-4xl lg:rounded-br-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]">
              <Image alt="" src={healthImg} className="h-80 object-cover" />
              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-mariner-600">
                  Trusted Care Coverage
                </h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-700">
                  Healthcare
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-500">
                  Nurses and caregivers confirm attendance at hospitals or
                  patient homes. No more disputes over shift coverage, just
                  verified presence.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-b-4xl lg:rounded-br-4xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default UseCaseSection;
