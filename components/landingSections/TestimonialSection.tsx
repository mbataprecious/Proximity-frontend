"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import testimonials from "./testimonialsData";
import VentureTabsLogo from "@/public/Assets/images/testimonial/Venture_Tabs.svg";
import TechskillLogo from "@/public/Assets/images/testimonial/Techskill_UK.png";

function TestimonialSection() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);
  const length = testimonials.length;

  useEffect(() => {
    // autoplay every 5s
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % length);
    }, 5000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [length]);

  function prev() {
    setIndex((i) => (i - 1 + length) % length);
  }
  function next() {
    setIndex((i) => (i + 1) % length);
  }

  return (
    <section className="bg-gray-50 py-20" id="testimonials">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base/7 font-semibold text-mariner-600">
            Testimonials
          </h2>
          <p className="capitalize mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
            Words from teams who trust{" "}
            <span className="text-primary">Proximity</span>
          </p>
        </div> 

        <div className="relative mt-12">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {testimonials.map((t) => (
                <div key={t.id} className="min-w-full px-4">
                  <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div
                        className={
                          "shrink-0" +
                          (t.logo === VentureTabsLogo ||
                          t.logo === TechskillLogo
                            ? " bg-gray-600"
                            : "")
                        }
                      >
                        <Image
                          src={t.logo}
                          alt={`${t.company} logo`}
                          width={100}
                          height={100}
                          className="object-contain"
                        />
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        {t.company}
                      </h3>
                    </div>
                    <p className="mt-4 text-sm text-gray-700">“{t.quote}”</p>
                    <p className="mt-4 text-sm font-medium text-gray-900">
                      {t.person}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute left-0 top-1/2 flex -translate-y-1/2 transform pl-2">
            <button
              aria-label="Previous testimonial"
              onClick={prev}
              className="rounded-full bg-white/90 p-2 shadow hover:bg-white"
            >
              ‹
            </button>
          </div>
          <div className="absolute right-0 top-1/2 flex -translate-y-1/2 transform pr-2">
            <button
              aria-label="Next testimonial"
              onClick={next}
              className="rounded-full bg-white/90 p-2 shadow hover:bg-white"
            >
              ›
            </button>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to testimonial ${idx + 1}`}
                onClick={() => setIndex(idx)}
                className={`h-2 w-8 rounded-full transition-all ${
                  idx === index ? "bg-mariner-600 w-8" : "bg-gray-300 w-4"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialSection;
