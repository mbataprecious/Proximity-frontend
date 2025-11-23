import Image from "next/image";

function AboutUsSection() {
  return (
    <section className="bg-white py-20" id="about-us">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative mx-auto max-w-xl">
            <Image
              src={require("../../public/Assets/images/aboutUs/chinonso.jpg")}
              alt="Chinonso Ukadike"
              className="rounded-xl object-cover"
            />
          </div>
          <div>
            <h2 className="text-base/7 font-semibold text-mariner-600">
              Meet the Founder
            </h2>
            <p className="mt-4 text-4xl font-semibold tracking-tight text-pretty text-gray-900">
              Chinonso Ukadike
            </p>
            <p className="mt-6 text-lg text-gray-700">
              Chinonso Ukadike developed the idea for Proximity after completing
              his undergraduate program in 2021, where he observed significant
              inefficiencies in how educational institutions recorded
              attendance. Manual headcounts and paper sheets were
              time-consuming, disruptive, and ineffective in large class
              settings.
            </p>
            <p className="mt-4 text-lg text-gray-700">
              Determined to create a smarter solution, he designed an automated,
              geo-fencing based system capable of verifying attendance with
              precision. As the concept evolved, it became clear that the same
              challenges existed across workplaces, construction sites, and
              other operational environments.
            </p>
            <p className="mt-4 text-lg text-gray-700">
              This led to the creation of Proximity, an innovative and scalable
              platform that uses location-based verification and automation to
              deliver accurate, real-time attendance data for modern
              organizations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUsSection;
