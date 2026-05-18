import Navbar from "@/components/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ProductSpotlight from "@/components/landing/ProductSpotlight";
import WorkflowSection from "@/components/landing/WorkflowSection";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/Footer";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20">
        <HeroSection />
        <ProductSpotlight />
        <WorkflowSection />
        <FeaturesGrid />
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
