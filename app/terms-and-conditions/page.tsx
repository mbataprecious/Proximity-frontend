import { Container } from "@/components/Container";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title:
    "Terms and Conditions Data2Bots: Innovating with AI & BI for Sustainable Growth",
  description:
    "Terms, Conditions, Terms and Conditions, Learn about Data2Bots, a leading IT consulting company dedicated to driving business productivity through innovative AI and BI solutions. Explore our mission, vision, and core values.",
  robots: "index, follow",
};

export default function Terms() {
  return (
    <div>
      <Container className=" text-[#5C5C5C] text-sm md:text-base pt-[12.75rem] mb-56">
        <div>
          <h1 className="py-16 font-semibold text-3xl md:text-5xl text-center text-[#272727]">
            Terms & Conditions
          </h1>
          <h2 className="text-2xl font-semibold text-[#181818]">
            Links to Other Websites
          </h2>
          Our service may contain links to other websites that are not operated
          by Us. If You click on a third-party link, You will be directed to
          that third party&apos;s site. We strongly advise You to review the
          Terms and Conditions of every site You visit. We have no control over
          and assume no responsibility for the content, Terms and conditions, or
          practices of any third-party sites or services.
          <br />
          <br />
          <h2 className="text-2xl font-semibold text-[#181818]">Cookies</h2>
          We use &ldquo;Cookies&ldquo; to identify the areas of our website that
          you have visited. A cookie is a small piece of data stored on your
          computer or mobile device by your web browser. We use cookies to
          enhance the performance and functionality of our service, but they are
          not essential to its use. However, without these cookies, certain
          functionalities, like videos, may become unavailable, or you would be
          required to enter your login details every time you visit our
          platform, as we would not be able to remember that you had logged in
          previously. Most web browsers can be set to disable the use of
          Cookies. However, if you disable Cookies, you may not be able to
          access functionality on our website correctly or at all. We never
          place Personally Identifiable Information in Cookies.
          <br />
          <br />
          <h2 className="text-2xl font-semibold text-[#181818]">
            Changes To Our Terms and Conditions
          </h2>
          You acknowledge and agree that we may stop (permanently or
          temporarily) providing the Service (or any features within the
          Service) to you or users generally at our sole discretion, with prior
          notice to you. You may stop using the Service at any time. You do not
          need to inform us specifically when you stop using the Service. You
          acknowledge and agree that if we disable access to your account, you
          may be prevented from accessing the Service, your account details, or
          any files or other materials contained in your account. If we decide
          to change our Terms and Conditions, we will post those changes on this
          page and update the Terms and Conditions modification date below.
          <br />
          <br />
        </div>
      </Container>
    </div>
  );
}
