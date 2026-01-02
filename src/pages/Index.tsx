import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutCard } from "@/components/AboutCard";
import { ExpertiseCards } from "@/components/ExpertiseCards";
import { Marquee } from "@/components/Marquee";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import AIChatWidget from "@/components/AIChatWidget";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        <Hero />
        <AboutCard />
        <ExpertiseCards />
        <Marquee />
        <CTASection />
        <Footer />
        <AIChatWidget />
      </div>
    </PageTransition>
  );
};

export default Index;
