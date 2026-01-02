import { Plus } from "lucide-react";

const items = [
  "SECURE",
  "RELIABLE",
  "ENGAGING",
  "ACCESSIBLE",
  "RESPONSIVE",
  "DYNAMIC",
  "SCALABLE",
  "SEARCH OPTIMIZED",
  "INTERACTIVE",
];

export function Marquee() {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Diagonal ribbon */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] py-4 bg-gradient-to-r from-primary via-primary/90 to-primary"
        style={{
          transform: "translateX(-50%) translateY(-50%) rotate(-3deg)",
        }}
      >
        <div className="flex animate-marquee">
          {[...items, ...items, ...items].map((item, index) => (
            <div key={index} className="flex items-center gap-4 mx-4 whitespace-nowrap">
              <Plus className="w-4 h-4 text-primary-foreground" />
              <span className="text-sm md:text-base font-bold tracking-wider text-primary-foreground uppercase">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Spacer for layout */}
      <div className="h-8" />
    </section>
  );
}
