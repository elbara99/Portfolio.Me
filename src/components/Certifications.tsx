import { Award, ExternalLink } from "lucide-react";

const certifications = [
  {
    title: "AI Engineer",
    issuer: "DataCamp",
    date: "2024",
    url: "#",
    color: "from-neon-cyan to-neon-purple",
  },
];

export function Certifications() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient-cyan">Certifications</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional credentials and achievements
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="grid gap-4">
            {certifications.map((cert) => (
              <a
                key={cert.title}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group gradient-border p-1"
              >
                <div className="bg-card rounded-lg p-6 flex items-center gap-6 transition-transform duration-300 group-hover:-translate-y-1">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cert.color} p-0.5 shrink-0`}>
                    <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                      <Award className="w-7 h-7 text-foreground" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {cert.issuer} • {cert.date}
                    </p>
                  </div>
                  
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
