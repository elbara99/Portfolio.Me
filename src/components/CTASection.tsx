import { Link } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";
import logoBadge from "@/assets/logo-badge.png";

export function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95" />
      
      {/* Subtle texture overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(ellipse at center, transparent 0%, hsl(var(--background)) 70%)`,
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src={logoBadge} 
              alt="EM Logo" 
              className="w-20 h-20 mx-auto rounded-full shadow-lg shadow-primary/20"
            />
          </div>
          
          {/* Main Heading with Badge */}
          <div className="relative inline-block mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide">
              <span className="text-muted-foreground">From Concept To</span>{" "}
              <span className="text-foreground">Creation</span>
              <br />
              <span className="text-muted-foreground">Let's Make It</span>{" "}
              <span className="text-foreground">Happen!</span>
            </h2>
            
            {/* Spinning Badge */}
            <div className="absolute -right-2 sm:-right-4 md:-right-16 -top-4 sm:top-0 md:top-2">
              <div className="relative w-16 sm:w-20 h-16 sm:h-20 md:w-24 md:h-24">
                {/* Rotating text */}
                <svg 
                  className="w-full h-full animate-spin-slow"
                  viewBox="0 0 100 100"
                >
                  <defs>
                    <path
                      id="circlePath"
                      d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    />
                  </defs>
                  <text className="text-[10px] uppercase tracking-[0.3em] fill-primary font-medium">
                    <textPath href="#circlePath">
                      OPEN TO WORK • OPEN TO WORK • 
                    </textPath>
                  </text>
                </svg>
                
                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                    <Compass className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Button */}
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card/50 text-foreground font-medium hover:bg-card hover:border-primary transition-all group mb-8"
          >
            Get In Touch
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          {/* Availability Text */}
          <div className="space-y-2">
            <p className="text-foreground font-semibold">
              I'm available for full-time roles & freelance projects.
            </p>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              I thrive on crafting dynamic web applications, and delivering seamless user experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
