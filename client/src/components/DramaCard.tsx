import { type Drama } from "@shared/schema";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

interface DramaCardProps {
  drama: Drama;
  onClick: (drama: Drama) => void;
}

export function DramaCard({ drama, onClick }: DramaCardProps) {
  return (
    <motion.div
      layoutId={`card-${drama.id}`}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      whileTap={{ scale: 0.98 }}
      className="relative aspect-[2/3] rounded-md overflow-hidden cursor-pointer group bg-zinc-900"
      onClick={() => onClick(drama)}
    >
      <img
        src={drama.cover}
        alt={drama.name}
        className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
        loading="lazy"
      />
      
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 mb-2 font-display tracking-wide">
          {drama.name}
        </h3>
        <div className="flex items-center gap-2 text-xs text-gray-300 mb-3">
          <span className="bg-zinc-800 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider border border-zinc-700">
            {drama.chapterCount} Chapters
          </span>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 bg-white text-black text-xs font-bold py-1.5 rounded flex items-center justify-center gap-1 hover:bg-gray-200 transition-colors">
            <Play className="w-3 h-3 fill-black" /> Play
          </button>
        </div>
      </div>
    </motion.div>
  );
}
