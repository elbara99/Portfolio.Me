import { Github, Linkedin, Mail, Heart } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/elbara99", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/elbara-mouaffak-781655206/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:elbaraemoueffek@gmail.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-2xl font-bold text-gradient-cyan mb-2">EM</p>
            <p className="text-muted-foreground text-sm">
              Building the future with AI
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          <div className="text-center md:text-right">
            <p className="text-muted-foreground text-sm flex items-center gap-1 justify-center md:justify-end">
              Made with <Heart className="w-4 h-4 text-destructive fill-destructive" /> by Elbara
            </p>
            <p className="text-muted-foreground/60 text-xs mt-1">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
