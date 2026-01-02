import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Github, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Experience", path: "/experience" },
  { label: "Projects", path: "/projects" },
  { label: "Contact", path: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between h-14 px-6 bg-card/80 backdrop-blur-md rounded-full border border-border/50 shadow-lg">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-xl font-bold text-foreground hover:text-primary transition-colors"
          >
            Elbara<span className="text-primary">.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-1">
            <a
              href="https://github.com/elbara99"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-2 p-4 bg-card/95 backdrop-blur-md rounded-2xl border border-border/50 shadow-lg">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200",
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center gap-2 px-4 py-2 mt-2 border-t border-border/50">
                <a
                  href="https://github.com/elbara99"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
