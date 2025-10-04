import Cta from "@/components/landingSections/CTA";
import FAQs from "@/components/landingSections/Faqs";
import FeatureSection2 from "@/components/landingSections/FeatureSection2";
import FooterSection from "@/components/landingSections/Footer";
import HeroSection from "@/components/landingSections/HeroSection";
import UseCaseSection from "@/components/landingSections/UseCaseSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureSection2 />
      <UseCaseSection />
      <FAQs />
      <Cta />
      <FooterSection />
    </>
  );
}
