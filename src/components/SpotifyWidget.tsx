import { Music } from "lucide-react";

export function SpotifyWidget() {
  return (
    <article className="relative overflow-hidden bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-6 hover:border-primary/50 transition-all duration-300 group h-full">
      {/* Animated gradient background */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-bl from-green-500/15 via-transparent to-emerald-500/15 animate-gradient-shift" />
        <div className="absolute top-0 left-0 w-32 h-32 bg-green-500/25 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-28 h-28 bg-emerald-500/20 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-0 w-20 h-20 bg-primary/15 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10">
        <header className="flex items-start gap-4 mb-5">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-primary/15 border border-border/50 flex items-center justify-center group-hover:bg-green-500/20 transition-colors duration-300">
              <Music className="w-6 h-6 text-primary group-hover:text-green-400 transition-colors duration-300" />
            </div>
            <div className="absolute inset-0 bg-green-500/40 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors duration-300">Quran & Reflection</h3>
            <p className="text-sm text-muted-foreground">What I listen to for peace and focus</p>
          </div>
        </header>

        <div className="rounded-xl overflow-hidden border border-border/50 group-hover:border-green-500/30 transition-colors duration-300">
          <iframe
            className="w-full"
            src="https://open.spotify.com/embed/playlist/5CjjfCGcxt97R6BukX25kj?utm_source=generator&theme=0"
            width="100%"
            height="380"
            style={{ border: 0 }}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Quran playlist on Spotify"
          />
        </div>

        <footer className="mt-4">
          <h4 className="text-sm font-medium group-hover:text-primary transition-colors duration-300">Quran & Mood</h4>
          <p className="text-xs text-muted-foreground mt-1">
            A calm playlist for deep focus, reflection, and spiritual reset.
          </p>
        </footer>
      </div>
    </article>
  );
}
