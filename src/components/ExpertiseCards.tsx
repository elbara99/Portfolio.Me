import { Link } from "react-router-dom";
import { Copy, MapPin, Code2, Layers, Sparkles, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import headshot from "@/assets/headshot.png";

const techRow1 = [
  { name: "OpenAI", icon: "https://cdn.worldvectorlogo.com/logos/openai-2.svg" },
  { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
  { name: "LangChain", icon: "https://avatars.githubusercontent.com/u/126733545?s=200&v=4" },
  { name: "HuggingFace", icon: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg" },
];

const techRow2 = [
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Scikit-learn", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg" },
  { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
  { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
  { name: "Jupyter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
];

const techRow3 = [
  { name: "n8n", icon: "https://n8n.io/favicon.ico" },
  { name: "Claude AI", icon: "https://www.anthropic.com/images/icons/apple-touch-icon.png" },
  { name: "Gemini", icon: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
];

const techRow4 = [
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
];

const features = [
  { title: "AI Model Training", subtitle: "Deep Learning" },
  { title: "Data Pipeline", subtitle: "ETL & Processing" },
  { title: "API Integration", subtitle: "RESTful Services" },
  { title: "Workflow Automation", subtitle: "n8n & Custom" },
  { title: "RAG Systems", subtitle: "LLM Applications" },
];

export function ExpertiseCards() {
  const { toast } = useToast();

  const copyEmail = () => {
    navigator.clipboard.writeText("elbaraemoueffek@gmail.com");
    toast({
      title: "Email copied!",
      description: "Email address copied to clipboard.",
    });
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Collaboration Card - Large */}
            <div className="md:col-span-2 group relative overflow-hidden bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-5 sm:p-8 hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Orbiting collaboration design */}
              <div className="relative h-36 sm:h-48 mb-6 flex items-center justify-center">
                {/* Outer orbit path */}
                <div className="absolute w-60 sm:w-80 h-32 sm:h-40 border border-border/30 rounded-full" />
                {/* Inner orbit path */}
                <div className="absolute w-40 sm:w-56 h-20 sm:h-28 border border-border/20 rounded-full" />
                
                {/* Central avatar with glow */}
                <div className="relative z-10">
                  <div className="absolute inset-0 bg-neon-purple/40 rounded-full blur-xl animate-pulse" />
                  <div className="relative w-20 h-20 rounded-full border-2 border-primary overflow-hidden shadow-lg shadow-primary/30">
                    <img src={headshot} alt="Elbara" className="w-full h-full object-cover" />
                  </div>
                </div>
                
                {/* Orbiting avatars - outer ring */}
                <div className="absolute w-60 sm:w-80 h-32 sm:h-40 animate-spin" style={{ animationDuration: "20s" }}>
                  <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 w-8 sm:w-10 h-8 sm:h-10 rounded-full border border-border/50 bg-muted/50 overflow-hidden shadow-md">
                    <img src="https://i.pravatar.cc/100?img=1" alt="Collaborator" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 w-7 sm:w-9 h-7 sm:h-9 rounded-full border border-pink-500/50 bg-muted/50 overflow-hidden shadow-md">
                    <img src="https://i.pravatar.cc/100?img=5" alt="Collaborator" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute top-1/2 -left-3 sm:-left-4 -translate-y-1/2 w-6 sm:w-8 h-6 sm:h-8 rounded-full border border-border/50 bg-muted/50 overflow-hidden shadow-md">
                    <img src="https://i.pravatar.cc/100?img=3" alt="Collaborator" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute top-1/2 -right-3 sm:-right-4 -translate-y-1/2 w-7 sm:w-9 h-7 sm:h-9 rounded-full border border-green-500/50 bg-muted/50 overflow-hidden shadow-md">
                    <img src="https://i.pravatar.cc/100?img=8" alt="Collaborator" className="w-full h-full object-cover" />
                  </div>
                </div>
                
                {/* Orbiting avatars - inner ring (reverse) */}
                <div className="absolute w-40 sm:w-56 h-20 sm:h-28 animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }}>
                  <div className="absolute top-0 left-1/4 -translate-x-1/2 -translate-y-1/2 w-6 sm:w-8 h-6 sm:h-8 rounded-full border border-border/40 bg-muted/50 overflow-hidden shadow-md">
                    <img src="https://i.pravatar.cc/100?img=12" alt="Collaborator" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute bottom-0 right-1/4 translate-x-1/2 translate-y-1/2 w-6 sm:w-8 h-6 sm:h-8 rounded-full border border-blue-500/50 bg-muted/50 overflow-hidden shadow-md">
                    <img src="https://i.pravatar.cc/100?img=15" alt="Collaborator" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              
              <div className="relative flex items-center gap-2 mb-2">
                <Code2 className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                <span className="text-xs uppercase tracking-wider text-muted-foreground">Collaboration</span>
              </div>
              <p className="relative text-lg text-foreground group-hover:text-foreground transition-colors">
                I prioritize client collaboration, fostering open communication
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mt-4">
                Book a call <span>→</span>
              </Link>
            </div>

            {/* Tech Stack Card */}
            <div className="lg:row-span-2 group relative overflow-hidden bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-4 sm:p-6 hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5">
              {/* Animated background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-neon-purple/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />
              </div>
              
              <div className="relative">
                <h3 className="text-xl font-semibold text-center mb-2">
                  Passionate about cutting-edge
                </h3>
                <p className="text-primary text-xl font-semibold text-center mb-6">technologies</p>
                
                {/* Scrolling rows container */}
                <div className="space-y-3 overflow-hidden">
                  {/* Row 1 - scroll left */}
                  <div className="flex gap-3 animate-scroll-left">
                    {[...techRow1, ...techRow1, ...techRow1].map((tech, index) => (
                      <div
                        key={`row1-${index}`}
                        className="flex-shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50 text-sm hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                      >
                        <img src={tech.icon} alt={tech.name} className="w-4 h-4" />
                        <span className="text-foreground whitespace-nowrap">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Row 2 - scroll right */}
                  <div className="flex gap-3 animate-scroll-right">
                    {[...techRow2, ...techRow2, ...techRow2].map((tech, index) => (
                      <div
                        key={`row2-${index}`}
                        className="flex-shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50 text-sm hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                      >
                        <img src={tech.icon} alt={tech.name} className="w-4 h-4" />
                        <span className="text-foreground whitespace-nowrap">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Row 3 - scroll left */}
                  <div className="flex gap-3 animate-scroll-left" style={{ animationDuration: "25s" }}>
                    {[...techRow3, ...techRow3, ...techRow3].map((tech, index) => (
                      <div
                        key={`row3-${index}`}
                        className="flex-shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50 text-sm hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                      >
                        <img src={tech.icon} alt={tech.name} className="w-4 h-4" />
                        <span className="text-foreground whitespace-nowrap">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Row 4 - scroll right */}
                  <div className="flex gap-3 animate-scroll-right" style={{ animationDuration: "22s" }}>
                    {[...techRow4, ...techRow4, ...techRow4].map((tech, index) => (
                      <div
                        key={`row4-${index}`}
                        className="flex-shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50 text-sm hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                      >
                        <img src={tech.icon} alt={tech.name} className="w-4 h-4" />
                        <span className="text-foreground whitespace-nowrap">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Download Resume Button */}
                <div className="flex justify-center mt-6">
                  <a
                    href="/resume.pdf"
                    download="Elbara_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/50 bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 hover:border-primary transition-all duration-300 group-hover:scale-105"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Resume</span>
                  </a>
                </div>
                
                {/* Browser Mockup - Websites that Impact */}
                <div className="mt-6 relative">
                  {/* Outer glow rings */}
                  <div className="absolute inset-0 -m-8">
                    <div className="absolute inset-0 border border-border/20 rounded-full" />
                    <div className="absolute inset-4 border border-border/10 rounded-full" />
                  </div>
                  
                  {/* Browser window */}
                  <div className="relative bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 overflow-hidden">
                    {/* Browser header */}
                    <div className="flex items-center gap-2 px-4 py-2 border-b border-border/30 bg-muted/30">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                      <div className="flex-1 flex justify-center">
                        <div className="px-8 py-1 rounded-md bg-muted/50 text-xs text-muted-foreground">
                          <span className="opacity-50">🔒</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Browser content */}
                    <div className="p-6 text-center">
                      <h4 className="text-lg font-semibold mb-1">Websites that</h4>
                      <p className="text-primary text-lg font-semibold mb-4">Impact.</p>
                      
                      {/* Decorative lines */}
                      <div className="flex justify-center gap-1 mb-4">
                        <div className="w-12 h-0.5 bg-border/50 rounded" />
                        <div className="w-8 h-0.5 bg-border/30 rounded" />
                      </div>
                      
                      {/* Buttons */}
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          to="/projects"
                          className="px-4 py-1.5 rounded-full border border-border/50 bg-background/50 text-sm font-medium hover:border-primary hover:bg-primary/10 transition-all duration-300"
                        >
                          Start →
                        </Link>
                        <Link
                          to="/experience"
                          className="px-4 py-1.5 rounded-full bg-muted/50 text-sm hover:bg-muted transition-all duration-300"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Zone Card */}
            <div className="group relative overflow-hidden bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-6 hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5">
              <div className="relative">
                <p className="text-lg font-medium text-center mb-2">
                  I'm very flexible with time
                </p>
                <p className="text-primary text-center mb-4">zone communications</p>
                
                <div className="flex items-center justify-center gap-2 mb-6">
                  <span className="px-3 py-1 rounded-full bg-muted/50 text-xs font-medium hover:bg-muted transition-colors">
                    <span className="text-muted-foreground">DZ</span> Algeria
                  </span>
                  <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium border border-primary/30 animate-pulse">
                    <span>🇩🇿</span> Batna
                  </span>
                  <span className="px-3 py-1 rounded-full bg-muted/50 text-xs font-medium hover:bg-muted transition-colors">
                    <span className="text-muted-foreground">FR</span> France
                  </span>
                </div>
                
                {/* Globe visualization with animation */}
                <div className="relative h-32 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border border-primary/30 relative group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-2 rounded-full border border-primary/20 animate-spin-slow" style={{ animationDuration: "20s" }} />
                    <div className="absolute inset-4 rounded-full border border-primary/10 animate-spin-slow" style={{ animationDuration: "15s", animationDirection: "reverse" }} />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-transparent" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary animate-pulse" />
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-4">
                  <MapPin className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">Remote</span>
                </div>
                <p className="text-foreground font-medium">Algeria</p>
              </div>
            </div>

            {/* Let's Work Together Card */}
            <div className="group relative overflow-hidden bg-gradient-to-br from-muted/80 to-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-8 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5">
              {/* Animated gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <h3 className="text-2xl font-semibold mb-1 group-hover:text-primary transition-colors duration-300">Let's work together</h3>
                <p className="text-primary text-xl mb-6">on your next project</p>
                
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/50 text-sm hover:border-primary hover:bg-primary/10 transition-all duration-300 group-hover:scale-105"
                >
                  <Copy className="w-4 h-4" />
                  <span>elbaraemoueffek@gmail.com</span>
                </button>
              </div>
            </div>

            {/* Websites that Impact Card */}
            <div className="group relative overflow-hidden bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-6 hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5">
              <div className="flex items-center gap-1 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500 group-hover:animate-pulse" />
                <div className="w-3 h-3 rounded-full bg-yellow-500 group-hover:animate-pulse" style={{ animationDelay: "0.2s" }} />
                <div className="w-3 h-3 rounded-full bg-green-500 group-hover:animate-pulse" style={{ animationDelay: "0.4s" }} />
              </div>
              
              <div className="text-center py-4">
                <h3 className="text-lg font-semibold mb-1">Websites that</h3>
                <p className="text-primary text-lg font-semibold group-hover:scale-110 transition-transform duration-300 inline-block">Impact.</p>
              </div>
              
              <div className="flex items-center justify-center gap-2 mt-4">
                <Link
                  to="/projects"
                  className="px-4 py-2 rounded-lg border border-border/50 text-sm hover:border-primary hover:bg-primary/10 transition-all duration-300"
                >
                  Start →
                </Link>
                <Link
                  to="/experience"
                  className="px-4 py-2 rounded-lg bg-muted/50 text-sm hover:bg-muted transition-all duration-300"
                >
                  Details
                </Link>
              </div>
            </div>

            {/* Features Marquee Card */}
            <div className="md:col-span-2 group relative overflow-hidden bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-4 hover:border-primary/50 transition-all duration-500">
              <div className="flex gap-4 animate-marquee">
                {[...features, ...features].map((feature, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 px-4 py-3 rounded-xl bg-muted/30 border border-border/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                  >
                    <p className="text-sm font-medium text-foreground">{feature.title}</p>
                    <p className="text-xs text-muted-foreground">{feature.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Currently Building Card */}
            <div className="md:col-span-3 group relative overflow-hidden bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-6 hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5">
              {/* Animated line */}
              <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary via-neon-purple to-primary w-0 group-hover:w-full transition-all duration-1000" />
              
              <div className="relative flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                  <Layers className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">The Inside Scoop</span>
                  <h3 className="text-lg font-medium text-foreground">Currently building AI-powered automation solutions</h3>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
