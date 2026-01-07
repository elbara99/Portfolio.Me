import { Github, Linkedin, Mail, Code2, Layers, Zap } from "lucide-react";
import headshot from "@/assets/headshot.png";

const skills = [
  "Python", "React", "TypeScript", "Node.js", "n8n Specialist",
  "Custom Node Dev", "Error Handling", "Self-Hosting",
  "OpenAI", "AI Agents", "Automation"
];

const socialLinks = [
  { icon: Github, href: "https://github.com/elbara99", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/elbara-mouaffak-781655206/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:elbaraemoueffek@gmail.com", label: "Email" },
];

const features = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Crafting maintainable, elegant solutions",
    color: "text-neon-cyan",
  },
  {
    icon: Layers,
    title: "AI Architecture",
    description: "Building scalable, intelligent systems",
    color: "text-neon-purple",
  },
  {
    icon: Zap,
    title: "Automation",
    description: "Optimizing workflows for efficiency",
    color: "text-yellow-500",
  },
];

export function AboutCard() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left - Profile Image */}
            <div className="relative flex justify-center lg:justify-start">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 blur-xl opacity-60" />

                {/* Image container */}
                <div className="relative rounded-3xl overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm p-4">
                  <img
                    src={headshot}
                    alt="Elbara Mouaffak"
                    className="w-full max-w-md h-auto rounded-2xl object-cover"
                  />

                  {/* RGB bottom glow bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-green-500 to-blue-500" />
                </div>
              </div>
            </div>

            {/* Right - Info Card */}
            <div className="bg-card/80 backdrop-blur-sm rounded-3xl border border-border/50 p-5 sm:p-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-1">Elbara Mouaffak</h2>
                  <p className="text-muted-foreground text-xs sm:text-sm">UNIVERSITY OF BATNA 2</p>
                  <p className="text-muted-foreground text-xs sm:text-sm">AI ENGINEERING STUDENT</p>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={link.label}
                    >
                      <link.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Headline */}
              <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                Passionate about technology
                <br />
                and AI craftsmanship.
              </h3>

              {/* Description */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                I thrive on learning, building, and solving complex challenges — always reflecting on how each
                experience contributes to personal and team growth.
              </p>

              {/* Expertise */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3">Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-xs font-medium rounded-full bg-muted/50 text-muted-foreground border border-border/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="bg-muted/30 rounded-xl p-3 sm:p-4 text-center border border-border/30"
                  >
                    <feature.icon className={`w-5 sm:w-6 h-5 sm:h-6 mx-auto mb-2 ${feature.color}`} />
                    <h5 className="text-xs sm:text-sm font-semibold mb-1">{feature.title}</h5>
                    <p className="text-xs text-muted-foreground leading-tight">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
