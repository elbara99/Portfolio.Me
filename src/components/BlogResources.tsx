import { BookOpen, ExternalLink } from "lucide-react";

const resources = [
  {
    title: "OpenAI Documentation",
    description: "Official docs for GPT APIs and best practices",
    url: "https://platform.openai.com/docs",
    category: "AI",
  },
  {
    title: "n8n Workflows",
    description: "Automation platform for building AI workflows",
    url: "https://n8n.io",
    category: "Automation",
  },
  {
    title: "React Documentation",
    description: "Modern React patterns and hooks",
    url: "https://react.dev",
    category: "Frontend",
  },
];

export function BlogResources() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Learning <span className="text-gradient-cyan">Resources</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Some of the resources I use to stay up-to-date with AI and development
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {resources.map((resource) => (
            <a
              key={resource.title}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group gradient-border p-1"
            >
              <div className="bg-card rounded-lg p-6 h-full transition-transform duration-300 group-hover:-translate-y-2">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    {resource.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                  {resource.title}
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-muted-foreground text-sm">
                  {resource.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
