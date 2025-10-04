"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

function FAQs() {
  const faqItems = [
    {
      id: "item-1",
      question: "What is Proximity?",
      answer:
        "Proximity is an attendance tracking system powered by geofencing. Sign up today and make attendance simple, secure, and stress-free.",
    },
    {
      id: "item-2",
      question: " Does Proximity work without the internet?",
      answer:
        " No. Attendance is logged online as you need your location turned on.",
    },
    {
      id: "item-3",
      question: "Is student and staff data safe?",
      answer:
        "Absolutely. Location data is used only for attendance and stored securely. We never share it with third parties.",
    },
    {
      id: "item-4",
      question: "Do we need special devices?",
      answer:
        "No. Proximity works on any modern smartphone, students, staff, or attendees just check in with their phones.",
    },
    {
      id: "item-5",
      question: "Can we use it outside of schools?",
      answer:
        "Yes. Proximity is flexible and works for schools, offices, events, healthcare, and even field operations. To use Proximity outside schools, you will need to subscribe to our enterprise solution.",
    },
    {
      id: "item-6",
      question: "How do we get started?",
      answer:
        "Simply create an account or contact our team, and we’ll set up Proximity for your institution or organization within days.",
    },
  ];

  return (
    <section
      className="bg-[linear-gradient(180deg,#0575E6_0%,#0D5CC7_54.8%,#0F3CA8_100%)] py-16 md:py-24"
      id="faq"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div>
          <h2 className="text-white text-4xl font-semibold">
            Frequently Asked Questions
          </h2>
          <p className="text-mariner-300 mt-4 text-balance text-lg">
            Got questions? We’ve answered the most common ones so you can see
            how Proximity makes attendance smarter, safer, and stress-free.
          </p>
        </div>

        <div className="mt-12">
          <Accordion
            type="single"
            collapsible
            className="bg-card ring-foreground/5 rounded-(--radius) w-full border border-transparent px-8 py-3 shadow ring-1"
          >
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-dotted"
              >
                <AccordionTrigger className="cursor-pointer text-primary text-base hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-base text-gray-500">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <p className="text-white/70 mt-6">
            Can&apos;t find what you&apos;re looking for? Contact our{" "}
            <Link href="#" className=" font-medium hover:underline">
              customer support team
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default FAQs;
