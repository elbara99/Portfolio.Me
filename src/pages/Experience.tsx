import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EventsCarousel } from "@/components/EventsCarousel";
import { PageTransition } from "@/components/PageTransition";
import { MapPin, Briefcase, Github, ExternalLink } from "lucide-react";
import headshot from "@/assets/headshot.png";

const experiences = [
  {
    id: 1,
    dateRange: "SEP 2021 - PRESENT",
    company: "University of Batna 2",
    location: "Batna, Algeria",
    type: "Student",
    role: "AI Engineering Student",
    avatar: headshot,
    descriptions: [
      {
        text: "Pursuing a degree in **Artificial Intelligence Engineering**, focusing on machine learning, deep learning, and data science fundamentals.",
        highlights: ["Artificial Intelligence Engineering"]
      },
      {
        text: "Developed skills in **Python, TensorFlow, and PyTorch** through coursework and personal projects, achieving **top 10%** class standing.",
        highlights: ["Python, TensorFlow, and PyTorch", "top 10%"]
      },
      {
        text: "Built multiple **AI-powered applications** including chatbots, image classifiers, and automation workflows using **n8n and LLM APIs**.",
        highlights: ["AI-powered applications", "n8n and LLM APIs"]
      },
      {
        text: "Collaborated with **cross-functional teams** in hackathons, winning recognition at **DevFest 2025** and **DevsForDevs 2024**.",
        highlights: ["cross-functional teams", "DevFest 2025", "DevsForDevs 2024"]
      }
    ],
    techBadges: [
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
      { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "n8n", icon: "https://n8n.io/favicon.ico" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Problem Solving", icon: null },
      { name: "Teamwork", icon: null },
      { name: "Research", icon: null },
    ]
  },
  {
    id: 2,
    dateRange: "JAN 2024 - PRESENT",
    company: "Freelance",
    location: "Remote",
    type: "Self-employed",
    role: "AI & Automation Developer",
    avatar: null,
    descriptions: [
      {
        text: "Built **AI-powered automation solutions** for clients, reducing manual work by **80%** and improving operational efficiency.",
        highlights: ["AI-powered automation solutions", "80%"]
      },
      {
        text: "Developed **full-stack web applications** using React, TypeScript, and Supabase, delivering **5+ production projects**.",
        highlights: ["full-stack web applications", "5+ production projects"]
      },
      {
        text: "Created **custom chatbots and RAG systems** using LangChain and OpenAI APIs for knowledge base automation.",
        highlights: ["custom chatbots and RAG systems"]
      }
    ],
    techBadges: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
      { name: "OpenAI", icon: "https://cdn.worldvectorlogo.com/logos/openai-2.svg" },
      { name: "LangChain", icon: "https://avatars.githubusercontent.com/u/126733545?s=200&v=4" },
    ]
  },
  {
    id: 3,
    dateRange: "2023 - PRESENT",
    company: "Github",
    location: "Open Source",
    type: "Contributor",
    role: "Open Source Contributor",
    avatar: null,
    descriptions: [
      {
        text: "Contributed to **open-source projects with 100+ Github stars**, improving code quality, feature implementations, and documentation.",
        highlights: ["open-source projects with 100+ Github stars"]
      },
      {
        text: "Engaged with **developer communities**, collaborating on innovative solutions and best practices.",
        highlights: ["developer communities"]
      }
    ],
    techBadges: [
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    ]
  }
];

const toolIcons = [
  { icon: "https://n8n.io/favicon.ico", name: "n8n" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", name: "Figma" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", name: "VS Code" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", name: "Git" },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/notion/notion-original.svg", name: "Notion", invert: true },
  { icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", name: "Linux" },
];

// Helper function to render text with bold highlights
const renderDescription = (text: string, highlights: string[]) => {
  let result = text;
  highlights.forEach(highlight => {
    result = result.replace(`**${highlight}**`, `<strong class="text-foreground font-semibold">${highlight}</strong>`);
  });
  return <span dangerouslySetInnerHTML={{ __html: result }} />;
};

const Experience = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".timeline-item");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <PageTransition>
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "1s" }} />
      </div>

      <main className="pt-24 pb-20 relative z-10">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-20 timeline-item opacity-0 translate-y-8 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0">
            <p className="text-xs tracking-[0.3em] text-muted-foreground mb-4 uppercase">The Experience</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Experience That <br />
              Brings <span className="text-gradient-cyan italic">Ideas to Life</span>
            </h1>
          </div>

          {/* Experience Timeline */}
          <div className="max-w-5xl mx-auto relative">
            {/* Main Timeline Line with animated glow */}
            <div className="hidden lg:block absolute left-[300px] top-0 bottom-0 w-[3px] -translate-x-1/2">
              <div className="absolute inset-0 bg-gradient-to-b from-primary via-neon-purple to-neon-green rounded-full" />
              <div className="absolute inset-0 bg-gradient-to-b from-primary via-neon-purple to-neon-green blur-md opacity-40 animate-pulse" />
              {/* Animated traveling light */}
              <div className="absolute w-full h-20 bg-gradient-to-b from-transparent via-white/60 to-transparent animate-timeline-glow" />
            </div>

            {experiences.map((exp, index) => (
              <div 
                key={exp.id}
                className="timeline-item opacity-0 translate-y-8 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0 relative grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-0 mb-12 group/exp"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Left Column - Company Info */}
                <div className="relative lg:pr-16">
                  {/* Animated dot on timeline */}
                  <div className="hidden lg:flex absolute right-0 top-8 translate-x-1/2 z-10 items-center justify-center">
                    <div className="absolute w-8 h-8 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: '2s' }} />
                    <div className="relative w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/30 group-hover/exp:scale-150 group-hover/exp:bg-neon-purple transition-all duration-300" />
                  </div>

                  <div className="lg:text-right p-6 lg:p-0">
                    <p className="text-xs tracking-wider text-muted-foreground mb-2 uppercase group-hover/exp:text-primary transition-colors duration-300">{exp.dateRange}</p>
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover/exp:translate-x-[-4px] lg:group-hover/exp:translate-x-0 transition-transform duration-300">{exp.company}</h3>
                    <div className="flex items-center gap-2 lg:justify-end text-sm text-muted-foreground mb-1 group-hover/exp:text-muted-foreground/80 transition-colors">
                      <MapPin className="w-3.5 h-3.5 group-hover/exp:text-primary transition-colors" />
                      <span>{exp.location}</span>
                    </div>
                    <div className="flex items-center gap-2 lg:justify-end text-sm text-muted-foreground group-hover/exp:text-muted-foreground/80 transition-colors">
                      <Briefcase className="w-3.5 h-3.5 group-hover/exp:text-primary transition-colors" />
                      <span>{exp.type}</span>
                    </div>
                  </div>
                </div>

                {/* Right Column - Role Details */}
                <div className="lg:pl-16 p-6 lg:py-0 bg-card/30 lg:bg-transparent rounded-2xl lg:rounded-none border border-border/30 lg:border-0 lg:border-l lg:border-border/30 group-hover/exp:border-primary/30 transition-colors duration-300">
                  <h4 className="text-2xl font-semibold text-foreground mb-6 group-hover/exp:text-primary transition-colors duration-300">{exp.role}</h4>
                  
                  <div className="space-y-4 mb-6">
                    {exp.descriptions.map((desc, i) => (
                      <p 
                        key={i} 
                        className="text-muted-foreground leading-relaxed text-sm opacity-80 group-hover/exp:opacity-100 transition-opacity duration-300"
                        style={{ transitionDelay: `${i * 50}ms` }}
                      >
                        {renderDescription(desc.text, desc.highlights)}
                      </p>
                    ))}
                  </div>

                  {/* Tech Badges with stagger animation */}
                  <div className="flex flex-wrap gap-2">
                    {exp.techBadges.map((tech, techIndex) => (
                      <div
                        key={tech.name}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50 text-xs hover:border-primary/50 hover:bg-primary/5 hover:scale-105 transition-all duration-300 hover:shadow-md hover:shadow-primary/10"
                        style={{ transitionDelay: `${techIndex * 30}ms` }}
                      >
                        {tech.icon && (
                          <img src={tech.icon} alt={tech.name} className="w-3.5 h-3.5" />
                        )}
                        <span className="text-foreground">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Events Carousel Section */}
          <div className="mt-32 mb-20 timeline-item opacity-0 translate-y-8 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0">
            <div className="text-center mb-8">
              <p className="text-xs tracking-[0.3em] text-muted-foreground mb-4 uppercase">Community</p>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Events & <span className="text-gradient-cyan italic">Connections</span>
              </h2>
            </div>
            <EventsCarousel />
          </div>

          {/* MY SITE Section */}
          <div className="mt-20 text-center timeline-item opacity-0 translate-y-8 transition-all duration-700 ease-out [&.animate-in]:opacity-100 [&.animate-in]:translate-y-0">
            <p className="text-xs tracking-[0.3em] text-muted-foreground mb-4 uppercase">My Site</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Explore, experiment
            </h2>
            <p className="text-3xl md:text-5xl font-bold text-gradient-cyan italic mb-16">
              && say hello
            </p>

            {/* Bottom Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
              {/* Uses Card */}
              <div className="group relative overflow-hidden bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-6 hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5">
                {/* Outer glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-br from-primary/10 via-transparent to-neon-purple/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                    {toolIcons.map((tool, i) => (
                      <div 
                        key={tool.name}
                        className="flex-shrink-0 w-11 h-11 rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center group-hover:scale-105 group-hover:border-primary/30 transition-all duration-300"
                        style={{ transitionDelay: `${i * 50}ms` }}
                      >
                        <img 
                          src={tool.icon} 
                          alt={tool.name} 
                          className={`w-5 h-5 ${tool.invert ? 'dark:invert' : ''}`}
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs tracking-wider text-muted-foreground mb-2 uppercase">Uses</p>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">Check out my favorite tools</h3>
                </div>
              </div>

              {/* Projects Card */}
              <Link 
                to="/projects"
                className="group relative overflow-hidden bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-6 hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="absolute -inset-1 bg-gradient-to-br from-neon-purple/10 via-transparent to-primary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="h-28 mb-6 flex items-center justify-center">
                    <div className="relative">
                      {/* Device mockups */}
                      <div className="w-16 h-24 rounded-lg bg-gradient-to-br from-muted to-muted/50 border border-border/50 transform -rotate-12 absolute -left-6 group-hover:rotate-[-15deg] transition-transform duration-500">
                        <div className="absolute inset-1.5 rounded bg-gradient-to-br from-primary/20 to-neon-purple/20" />
                      </div>
                      <div className="w-20 h-28 rounded-lg bg-gradient-to-br from-muted to-muted/50 border border-border/50 relative z-10 group-hover:scale-105 transition-transform duration-500">
                        <div className="absolute inset-2 rounded bg-gradient-to-br from-neon-purple/30 to-primary/30" />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs tracking-wider text-muted-foreground mb-2 uppercase">Projects</p>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">See what I've built</h3>
                </div>
              </Link>

              {/* Contact Card */}
              <Link 
                to="/contact"
                className="group relative overflow-hidden bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-6 hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="absolute -inset-1 bg-gradient-to-br from-primary/10 via-transparent to-neon-purple/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="h-28 mb-6 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-colors" />
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/50 group-hover:scale-110 group-hover:border-primary transition-all duration-300 shadow-lg shadow-primary/20">
                        <img src={headshot} alt="Elbara" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs tracking-wider text-muted-foreground mb-2 uppercase">Contact</p>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">Let's connect</h3>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
    </PageTransition>
  );
};

export default Experience;