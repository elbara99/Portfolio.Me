import { Download, FileText } from "lucide-react";

export function ResumeCard() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="gradient-border p-1">
            <div className="bg-card rounded-lg p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-purple p-0.5 mx-auto mb-6">
                <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                  <FileText className="w-8 h-8 text-foreground" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-2">Download My Resume</h3>
              <p className="text-muted-foreground mb-6">
                Get a detailed overview of my experience, skills, and education
              </p>
              
              <a
                href="/resume.pdf"
                download="Elbara_Mouaffak_Resume.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity glow-cyan"
              >
                <Download className="w-5 h-5" />
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
