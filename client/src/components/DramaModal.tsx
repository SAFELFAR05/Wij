import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { type Drama } from "@shared/schema";
import { Play, Plus, ThumbsUp, X, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface DramaModalProps {
  drama: Drama | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DramaModal({ drama, isOpen, onClose }: DramaModalProps) {
  if (!drama) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0 bg-[#141414] border-none text-white overflow-hidden rounded-xl">
        <div className="relative w-full aspect-video md:aspect-[2.35/1] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent z-10" />
          <img 
            src={drama.cover} 
            alt={drama.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 drop-shadow-lg tracking-wide">
              {drama.name}
            </h2>
            <div className="flex items-center gap-4 mb-6">
              <Button 
                onClick={() => console.log("Play clicked")} 
                className="bg-white text-black hover:bg-white/90 font-bold px-8 py-6 text-lg rounded-sm"
              >
                <Play className="mr-2 h-6 w-6 fill-black" /> Play
              </Button>
              <Button 
                variant="outline" 
                className="border-gray-500 text-gray-200 hover:bg-zinc-800 hover:text-white bg-transparent rounded-full p-3 h-12 w-12"
              >
                <Plus className="h-6 w-6" />
              </Button>
              <Button 
                variant="outline" 
                className="border-gray-500 text-gray-200 hover:bg-zinc-800 hover:text-white bg-transparent rounded-full p-3 h-12 w-12"
              >
                <ThumbsUp className="h-6 w-6" />
              </Button>
            </div>
          </div>
          
          <DialogClose className="absolute top-4 right-4 z-50 rounded-full bg-[#181818] p-2 hover:bg-[#2a2a2a] transition-colors">
            <X className="h-6 w-6 text-white" />
          </DialogClose>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 p-8 md:p-12">
          <div>
            <div className="flex items-center gap-3 mb-4 text-sm font-semibold text-gray-400">
              <span className="text-green-500 font-bold">98% Match</span>
              <span className="border border-gray-600 px-1 py-0.5 text-xs rounded text-gray-300">HD</span>
              <span>{drama.chapterCount} Chapters</span>
            </div>
            <p className="text-base md:text-lg leading-relaxed text-gray-300">
              {drama.introduction || "No description available for this drama yet. Watch now to discover the story."}
            </p>
          </div>
          
          <div className="text-sm text-gray-400 space-y-2">
            <div>
              <span className="text-gray-500 block mb-1">Cast:</span>
              <span className="text-gray-200">Ensemble Cast, Top Stars</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">Genres:</span>
              <span className="text-gray-200">Drama, Romance, Thriller</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-1">This show is:</span>
              <span className="text-gray-200">Exciting, Romantic</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
