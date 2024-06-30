import { Container } from "@/components/Container";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title:
    "Terms and Conditions Proximity: Taking attendance systems a notch higher.",
  description:
    "Terms, Conditions, Terms and Conditions, Learn about Proximity.",
  robots: "index, follow",
};

export default function Terms() {
  return (
    <div>
      <Container className=" text-[#5C5C5C] text-sm md:text-base pt-[12.75rem] mb-56">
        <div>
          <h1 className="py-16 font-semibold text-3xl md:text-5xl text-center text-[#272727]">
            Privacy Policy
          </h1>
          <h2 className="text-2xl font-semibold text-[#181818]">
            Introduction
          </h2>
          Proximity (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is
          dedicated to maintaining the privacy and protection of your personal
          information. This Privacy Policy outlines how we collect, use, and
          protect your information when you use our application, which employs
          geofencing technology to ensure attendance integrity by recording
          attendance only for students within a specified geofenced area.
          <br />
          <br />
          <h2 className="text-2xl font-semibold text-[#181818]">
            Information Collection
          </h2>
          <br />
          Location Data: Our application collects your location data solely at
          the point of attendance taking. This is to confirm that you are within
          the geofenced area designated for the lecture. We do not continuously
          track or monitor your location.
          <br />
          <br />
          Sensitive Information: We collect and store sensitive information such
          as your password, which is encrypted before storage to ensure its
          security and integrity.
          <br />
          <br />
          <h2 className="text-2xl font-semibold text-[#181818]">
            Use of Information
          </h2>
          The information we collect is used for the following purposes:
          <br />
          Attendance Validation: To verify that students are within the
          geofenced area at the time they mark their attendance. This ensures
          that only those physically present in the designated location are
          recorded.
          <br />
          <br />
          Building a Virtual Perimeter: We use the lecturer&apos;s location to
          build a virtual perimeter, ensuring that students are within this
          virtual perimeter before marking attendance.
          <br />
          <br />
          System Integrity and Accuracy: To maintain accurate and reliable
          attendance records, reinforcing the credibility of the attendance
          system.
          <br />
          <br />
          <h2 className="text-2xl font-semibold text-[#181818]">
            Disclosure of Information
          </h2>
          <br />
          We are committed to protecting your personal information and do not
          share it with third parties, except in the following circumstances:
          Legal Requirements: We may disclose your information if required to do
          so by law or in response to valid requests by public authorities.
          Protection of Rights: We may disclose your information to protect our
          rights, property, or safety, as well as that of our users and others.
          <br />
          <br />
          <h2 className="text-2xl font-semibold text-[#181818]">
            Data Security
          </h2>
          <br />
          We implement robust security measures to protect your personal
          information, including: Encryption: Sensitive information, such as
          passwords, is encrypted before storage to prevent unauthorized access.
          Access Controls: We limit access to your personal information to those
          employees and contractors who need to know that information in order
          to operate, develop, or improve our services.
          <br />
          <br />
          <h2 className="text-2xl font-semibold text-[#181818]">
            Data Retention
          </h2>
          <br />
          Location Data: Your location data is only used at the moment of
          attendance taking and is not stored beyond this point. This ensures
          that your location privacy is maintained and that no historical
          location data is retained. Other Personal Information: Other personal
          information is retained for as long as necessary to fulfill the
          purposes outlined in this privacy policy, unless a longer retention
          period is required or permitted by law.
          <br />
          <br />
          <h2 className="text-2xl font-semibold text-[#181818]">User Rights</h2>
          <br />
          You have the following rights regarding your personal information:
          <br />
          Access: You have the right to request access to the personal
          information we hold about you.
          <br />
          <br />
          Correction: You can request that we correct any inaccurate or
          incomplete personal information.
          <br />
          <br />
          Deletion: You have the right to request the deletion of your personal
          information, subject to certain legal obligations.
          <br />
          To exercise these rights, please contact us at the provided contact
          details.
          <br />
          <br />
          <h2 className="text-2xl font-semibold text-[#181818]">
            Cookies and Tracking Technologies
          </h2>
          <br />
          Our application does not use cookies or other tracking technologies to
          monitor your activities.
          <br />
          <br />
          <h2 className="text-2xl font-semibold text-[#181818]">
            Changes to This Privacy Policy
          </h2>
          <br />
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or for other operational, legal, or regulatory
          reasons. We will notify you of any significant changes by posting the
          new Privacy Policy on our website and, where feasible, via email or
          through a notification in our application.
          <br />
          <br />
          <h2 className="text-2xl font-semibold text-[#181818]">
            Contact Information
          </h2>
          <br />
          If you have any questions or concerns about this Privacy Policy or our
          data practices, please contact us at:
          <br />
          <strong>Email:</strong> info@proximity.co.uk
          <h2 className="text-2xl font-semibold text-[#181818]">Conclusion</h2>
          <br />
          By using the Proximity application, you acknowledge that you have read
          and understood this Privacy Policy, and you agree to the collection,
          use, and disclosure of your personal information as described herein.
          Your privacy is important to us, and we are committed to ensuring that
          your personal information is protected and handled responsibly.
          <br />
          <br />
        </div>
      </Container>
    </div>
  );
}
