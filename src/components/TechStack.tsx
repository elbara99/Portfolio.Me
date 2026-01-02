import { AnimatedTechOrbit } from "./AnimatedTechOrbit";

const technologies = [
  { name: "Python", category: "Language" },
  { name: "TypeScript", category: "Language" },
  { name: "React", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "n8n", category: "Automation" },
  { name: "OpenAI", category: "AI" },
  { name: "MongoDB", category: "Database" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Supabase", category: "Backend" },
  { name: "Three.js", category: "Graphics" },
  { name: "p5.js", category: "Creative" },
  { name: "Shopify", category: "E-Commerce" },
  { name: "WooCommerce", category: "E-Commerce" },
  { name: "Git", category: "Tools" },
  { name: "Docker", category: "DevOps" },
  { name: "Figma", category: "Design" },
];

export function TechStack() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="gradient-border p-1">
          <div className="bg-card rounded-lg p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Tech <span className="text-gradient-cyan">Stack</span>
              </h2>
              <p className="text-muted-foreground">Technologies I work with daily</p>
            </div>

            {/* Animated Orbit Visualization */}
            <div className="mb-12">
              <AnimatedTechOrbit />
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {technologies.map((tech, index) => (
                <div
                  key={tech.name}
                  className="group relative px-4 py-2 rounded-lg bg-muted border border-border hover:border-primary transition-all duration-300 cursor-default"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <span className="font-medium text-sm group-hover:text-primary transition-colors">
                    {tech.name}
                  </span>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-foreground text-background text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {tech.category}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
