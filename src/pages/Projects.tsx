import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { ArrowRight } from "lucide-react";
import fessityDashboard from "@/assets/fessity-dashboard.png";
import hospitalManagement from "@/assets/hospital-management.png";
import aiChatbot from "@/assets/ai-chatbot.png";
import automationsWorkflows from "@/assets/automations-workflows.png";
import satelliteAnalysis from "@/assets/satellite-analysis.png";

const techIcons: Record<string, string> = {
  "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "TailwindCSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  "Supabase": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
  "Shadcn": "https://avatars.githubusercontent.com/u/139895814?s=200&v=4",
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "Express": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  "OpenAI": "https://cdn.worldvectorlogo.com/logos/openai-2.svg",
  "API": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  "n8n": "https://n8n.io/favicon.ico",
  "Webhooks": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  "Automation": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg",
  "Google Earth Engine": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "Sentinel-2": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  "NDVI": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
};

const projects = [
  {
    id: 1,
    title: "Fessity",
    category: "WEB APP",
    year: "2024",
    description: "A full-featured e-commerce dashboard with product management, analytics, and order tracking with clean design",
    images: [fessityDashboard],
    technologies: ["React", "TypeScript", "TailwindCSS", "Supabase", "Shadcn"],
    gradient: "from-pink-500 via-rose-500 to-pink-600",
    github: "https://github.com/elbara99",
  },
  {
    id: 2,
    title: "Hospital Management",
    category: "WEB APP",
    year: "2024",
    description: "A comprehensive hospital management solution with patient records, appointments, and doctor dashboards",
    images: [hospitalManagement],
    technologies: ["JavaScript", "Node.js", "MongoDB", "Express"],
    gradient: "from-violet-600 via-purple-600 to-indigo-700",
    github: "https://github.com/elbara99/Hospital-Management-Sys",
  },
  {
    id: 3,
    title: "AI Chatbot",
    category: "AI AUTOMATION",
    year: "2024",
    description: "An intelligent AI-powered chatbot for conversational interactions and customer support automation",
    images: [aiChatbot],
    technologies: ["JavaScript", "OpenAI", "Node.js", "API"],
    gradient: "from-cyan-500 via-teal-500 to-emerald-600",
    github: "https://github.com/elbara99/ai-chatbot",
  },
  {
    id: 4,
    title: "Automations & Workflows",
    category: "N8N AUTOMATION",
    year: "2025",
    description: "Collection of automation workflows and integrations using n8n and various APIs for business efficiency",
    images: [automationsWorkflows],
    technologies: ["n8n", "Webhooks", "API", "Automation"],
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    github: "https://github.com/elbara99/Automations-Workflows",
  },
  {
    id: 5,
    title: "Satellite Analysis",
    category: "DATA SCIENCE",
    year: "2024",
    description: "Environmental analysis using Google Earth Engine and Sentinel-2 imagery with NDVI, EVI, and SAVI indices",
    images: [satelliteAnalysis],
    technologies: ["Google Earth Engine", "Python", "Sentinel-2", "NDVI"],
    gradient: "from-emerald-500 via-green-500 to-teal-600",
    github: "https://github.com/elbara99/Satellite-Data-Analysis",
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-24 lg:mb-32 group transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-16'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Left Column - Info */}
      <div className={`space-y-6 ${!isEven ? 'lg:order-2' : ''}`}>
        {/* Header with number, category, and year */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground font-mono">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="w-8 h-px bg-border" />
            <span className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
              {project.category}
            </span>
          </div>
          <span className="px-3 py-1 text-xs font-mono border border-border rounded-full text-muted-foreground">
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight">
          {project.title}
        </h2>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-2 pt-4">
          {project.technologies.map((tech) => (
            <div
              key={tech}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50 text-xs hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
            >
              {techIcons[tech] && (
                <img 
                  src={techIcons[tech]} 
                  alt={tech} 
                  className="w-4 h-4"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
              <span className="text-foreground font-medium">{tech}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column - Card */}
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className={`block ${!isEven ? 'lg:order-1' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${project.gradient} p-6 md:p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:scale-[1.02]`}>
          {/* Description */}
          <div className="flex items-start justify-between mb-6">
            <p className="text-white/90 text-sm md:text-base leading-relaxed max-w-[85%]">
              {project.description}
            </p>
            <div className="flex-shrink-0 w-10 h-10 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <ArrowRight className="w-5 h-5 text-white transform group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>

          {/* Stacked Images */}
          <div className="relative h-[280px] md:h-[320px] perspective-1000">
            {/* Background shadow card */}
            <div 
              className="absolute inset-0 rounded-xl bg-black/20 transform transition-all duration-500"
              style={{
                transform: isHovered 
                  ? 'translateX(-30px) translateY(20px) rotateY(8deg) scale(0.9)' 
                  : 'translateX(-15px) translateY(10px) rotateY(5deg) scale(0.95)',
              }}
            />
            
            {/* Secondary card peek */}
            <div 
              className="absolute inset-0 rounded-xl bg-black/30 overflow-hidden transform transition-all duration-500"
              style={{
                transform: isHovered 
                  ? 'translateX(-20px) translateY(15px) rotateY(5deg) scale(0.95)' 
                  : 'translateX(-8px) translateY(5px) rotateY(3deg) scale(0.97)',
              }}
            >
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover object-top opacity-50"
              />
            </div>

            {/* Main card */}
            <div 
              className="absolute inset-0 rounded-xl overflow-hidden border border-white/10 shadow-2xl transform transition-all duration-500"
              style={{
                transform: isHovered 
                  ? 'translateX(10px) translateY(-5px) rotateY(-3deg) scale(1.02)' 
                  : 'translateX(0) translateY(0) rotateY(0deg) scale(1)',
              }}
            >
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* View Details circle badge */}
            <div 
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-white/80 flex items-center justify-center backdrop-blur-sm bg-white/10 transition-all duration-500 z-20 ${
                isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`}
              style={{
                animation: isHovered ? 'spin 8s linear infinite' : 'none',
              }}
            >
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <defs>
                  <path
                    id={`circlePath-${project.id}`}
                    d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                  />
                </defs>
                <text className="text-[10px] fill-white font-medium tracking-[0.15em] uppercase">
                  <textPath href={`#circlePath-${project.id}`} startOffset="0%">
                    VIEW DETAILS • VIEW DETAILS •
                  </textPath>
                </text>
              </svg>
              <div className="w-3 h-3 rounded-full bg-white" />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

const Projects = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHeaderVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <PageTransition>
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div 
            ref={headerRef}
            className={`mb-20 text-center transition-all duration-700 ease-out ${
              headerVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-xs tracking-[0.3em] text-muted-foreground mb-4 uppercase">Selected Work</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Featured <span className="text-gradient-cyan italic">Projects</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A showcase of my work in AI, automation, and full-stack development
            </p>
          </div>

          {/* Projects List */}
          <div className="space-y-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
    </PageTransition>
  );
};

export default Projects;
