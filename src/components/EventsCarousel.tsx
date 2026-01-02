import { useState, useEffect } from "react";
import eventGdsc from "@/assets/event-gdsc-2024.jpg";
import eventGdgBatna from "@/assets/event-gdg-batna.jpg";
import behindTheScenes from "@/assets/behind-the-scenes.jpeg";

const events = [
  {
    id: 1,
    image: eventGdsc,
    label: "DevForDev 2024",
  },
  {
    id: 2,
    image: eventGdgBatna,
    label: "GDG Batna DevFest",
  },
  {
    id: 3,
    image: behindTheScenes,
    label: "Behind the Scenes",
  },
];

export const EventsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % events.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getCardStyle = (index: number) => {
    const diff = (index - activeIndex + events.length) % events.length;
    
    if (diff === 0) {
      // Active card - center
      return {
        transform: "translateX(0%) scale(1) rotateY(0deg)",
        zIndex: 30,
        opacity: 1,
      };
    } else if (diff === 1) {
      // Right card
      return {
        transform: "translateX(35%) scale(0.85) rotateY(-15deg)",
        zIndex: 20,
        opacity: 0.7,
      };
    } else {
      // Left card
      return {
        transform: "translateX(-35%) scale(0.85) rotateY(15deg)",
        zIndex: 10,
        opacity: 0.7,
      };
    }
  };

  return (
    <div className="w-full py-12">
      <div className="relative h-[400px] md:h-[450px] flex items-center justify-center perspective-1000">
        <div className="relative w-[280px] md:w-[320px] h-[360px] md:h-[400px]">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="absolute inset-0 transition-all duration-700 ease-out cursor-pointer"
              style={{
                ...getCardStyle(index),
                transformStyle: "preserve-3d",
              }}
              onClick={() => setActiveIndex(index)}
            >
              <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-border/30 bg-card">
                <img
                  src={event.image}
                  alt={event.label}
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Label */}
      <div className="text-center mt-6">
        <p className="text-lg font-medium text-foreground transition-all duration-500">
          {events[activeIndex].label}
        </p>
      </div>
      
      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-4">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex 
                ? "bg-primary w-6" 
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
