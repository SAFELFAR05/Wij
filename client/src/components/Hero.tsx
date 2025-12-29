import { type Drama } from "@shared/schema";
import { Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  drama: Drama;
  onMoreInfo: () => void;
}

export function Hero({ drama, onMoreInfo }: HeroProps) {
  return (
    <div className="relative h-[85vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={drama.cover}
          alt={drama.name}
          className="h-full w-full object-cover object-top"
        />
        {/* Gradients for text readability and cinematic look */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-[20%] left-4 md:left-12 lg:left-16 max-w-xl z-10">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-4 drop-shadow-xl tracking-wide leading-none">
          {drama.name}
        </h1>
        
        <p className="text-lg md:text-xl text-gray-200 mb-6 drop-shadow-md line-clamp-3 font-medium">
          {drama.introduction || "Experience the drama unfolding in this spectacular series. Love, betrayal, and destiny intertwine."}
        </p>

        <div className="flex flex-wrap gap-4">
          <Button 
            className="bg-white text-black hover:bg-white/90 font-bold text-lg px-8 py-6 rounded-sm flex items-center gap-2 transition-transform active:scale-95"
          >
            <Play className="h-6 w-6 fill-black" /> Play
          </Button>
          
          <Button 
            onClick={onMoreInfo}
            className="bg-gray-500/70 text-white hover:bg-gray-500/50 backdrop-blur-sm font-bold text-lg px-8 py-6 rounded-sm flex items-center gap-2 transition-transform active:scale-95"
          >
            <Info className="h-6 w-6" /> More Info
          </Button>
        </div>
      </div>
    </div>
  );
}
