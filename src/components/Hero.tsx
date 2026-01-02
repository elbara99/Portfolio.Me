import { useState, useEffect, lazy, Suspense } from "react";
import { Sparkles } from "lucide-react";

const NeuralNetworkVisualization = lazy(() => import("./NeuralNetworkVisualization"));

const roles = ["AI Engineer", "Automation Specialist", "Full-Stack Developer"];

const floatingTags = [
  { text: "AI Magic", position: "top-0 left-1/4", delay: "0s" },
  { text: "Clean Code", position: "top-8 right-0", delay: "0.5s" },
];

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect for roles
  useEffect(() => {
    const role = roles[currentRole];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedRole.length < role.length) {
          setDisplayedRole(role.slice(0, displayedRole.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedRole.length > 0) {
          setDisplayedRole(role.slice(0, displayedRole.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayedRole, isDeleting, currentRole]);

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden bg-background">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 relative">
            {/* Floating Tags */}
            {floatingTags.map((tag, index) => (
              <div
                key={index}
                className={`absolute ${tag.position} px-4 py-2 rounded-lg bg-card/80 backdrop-blur-sm border border-border text-sm font-medium animate-float hidden lg:block`}
                style={{ animationDelay: tag.delay }}
              >
                {tag.text}
              </div>
            ))}

            {/* Welcome Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span className="text-sm text-muted-foreground">Welcome to my universe</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-none">
                Hello
              </h1>
              <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                <span className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold">I'm</span>
                <div className="relative">
                  <div className="px-4 sm:px-6 py-2 sm:py-3 bg-card border border-border rounded-lg">
                    <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-gradient-cyan">
                      Elbara
                    </span>
                  </div>
                  {/* Decorative dots */}
                  <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-neon-cyan/50 hidden sm:block" />
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-neon-purple/50 hidden sm:block" />
                </div>
              </div>
            </div>

            {/* Role with typewriter */}
            <div className="flex items-center gap-2">
              <div className="px-5 py-2.5 rounded-lg bg-card/50 backdrop-blur-sm border border-border inline-flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-neon-purple" />
                <span className="text-lg font-medium">
                  {displayedRole}
                  <span className="inline-block w-0.5 h-5 bg-primary ml-1 animate-blink" />
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed">
              AI Enthusiast 🤖 | Automation Expert ⚡
              <br />
              <span className="italic">
                Building intelligent systems & shaping modern web experiences
                with clean, efficient code 💻 ✨
              </span>
            </p>

          </div>

          {/* Right Content - Neural Network Visualization */}
          <div className="relative mt-8 lg:mt-0 h-[400px] md:h-[500px]">
            {/* Glow effect behind */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 via-transparent to-neon-purple/10 blur-3xl scale-110" />

            <div className="relative h-full bg-card/30 backdrop-blur-xl rounded-2xl border border-border/50 overflow-hidden shadow-2xl">
              {/* Window Header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-card/80">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
                <span className="ml-4 text-sm text-muted-foreground font-mono">neural_network.py</span>
                <div className="ml-auto flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                  <span className="text-xs text-muted-foreground">Training</span>
                </div>
              </div>

              {/* Neural Network Canvas */}
              <div className="relative h-[calc(100%-52px)]">
                <Suspense fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm text-muted-foreground">Loading Neural Network...</span>
                    </div>
                  </div>
                }>
                  <NeuralNetworkVisualization />
                </Suspense>
              </div>
            </div>
          </div>
        </div>

        {/* Mouse interaction hint */}

      </div>
    </section>
  );
}
