import PanterLogo from "@/public/Assets/images/testimonial/Panter.svg";
import type { StaticImageData } from "next/image";
import VentureTabsLogo from "@/public/Assets/images/testimonial/Venture_Tabs.svg";
import TechskillLogo from "@/public/Assets/images/testimonial/Techskill_UK.png";
import OdoniLogo from "@/public/Assets/images/testimonial/Odoni_Logo.png";

export type Testimonial = {
  id: number;
  company: string;
  logo: StaticImageData | string;
  quote: string;
  person: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    company: "Pather.co",
    logo: PanterLogo,
    quote:
      "Proximity has completely streamlined our attendance verification. What used to require manual checks is now instant and accurate. The geolocation check-ins give us full confidence in every record, and the system’s simplicity has made team-wide adoption effortless.",
    person: "Lolade Olu-Biala - Chief Product Officer",
  },
  {
    id: 2,
    company: "Venturetabs",
    logo: VentureTabsLogo,
    quote:
      "We trailed Proximity and were immediately impressed. It’s fast, intuitive and requires almost no onboarding. It has reduced our admin workload and improved internal processes so much that we’ve already recommended it to partners and added it to our future solutions.",
    person: "Victoria Uchechi -  Business manager",
  },
  {
    id: 3,
    company: "TechskillUK",
    logo: TechskillLogo,
    quote:
      "Proximity has transformed our attendance tracking for compliance and student engagement. It’s clean, user-friendly and reliable. Students check in easily, staff verify in real time, and our records are now clearer and more accurate.",
    person: "Segun Allen - Co-Founder",
  },
  {
    id: 4,
    company: "Odoni Homes & Construction",
    logo: OdoniLogo,
    quote:
      "Proximity has made managing staff attendance across multiple construction sites simple and efficient. It eliminates manual headcounts and speeds up roll-calls, making it a game-changer for large teams working across different locations.",
    person: "Frederick Chukwuma - CEO",
  },
];

export default testimonials;
