import { Search, Bell, Menu, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface NavbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function Navbar({ searchTerm, onSearchChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 px-4 md:px-12 py-4 flex items-center justify-between",
        isScrolled ? "bg-black/90 backdrop-blur-md shadow-lg" : "bg-gradient-to-b from-black/80 to-transparent"
      )}
    >
      <div className="flex items-center gap-8">
        {/* Logo */}
        <a href="/" className="text-red-600 font-display text-4xl font-bold tracking-wider hover:scale-105 transition-transform">
          DRAMABOX
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
          <li className="text-white cursor-pointer font-bold">Home</li>
          <li className="hover:text-gray-400 transition-colors cursor-pointer">Series</li>
          <li className="hover:text-gray-400 transition-colors cursor-pointer">Films</li>
          <li className="hover:text-gray-400 transition-colors cursor-pointer">New & Popular</li>
          <li className="hover:text-gray-400 transition-colors cursor-pointer">My List</li>
        </ul>
      </div>

      <div className="flex items-center gap-4 text-white">
        <div className={cn(
          "flex items-center transition-all duration-300 bg-black/50 border border-transparent rounded-sm overflow-hidden",
          (isSearchOpen || searchTerm) ? "border-white/50 w-64 px-2" : "w-8 bg-transparent"
        )}>
          <button onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <Search className="w-5 h-5 cursor-pointer hover:text-gray-300" />
          </button>
          <Input 
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Titles, people, genres"
            className={cn(
              "border-none bg-transparent h-8 focus-visible:ring-0 text-white placeholder:text-gray-400 transition-all duration-300",
              (isSearchOpen || searchTerm) ? "w-full opacity-100 ml-2" : "w-0 opacity-0 p-0"
            )}
          />
        </div>
        
        <span className="hidden sm:block text-sm font-medium cursor-pointer hover:text-gray-300">Kids</span>
        <Bell className="w-5 h-5 cursor-pointer hover:text-gray-300" />
        
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center overflow-hidden border border-transparent group-hover:border-white transition-all">
             {/* Simple avatar placeholder */}
             <span className="font-bold text-xs">DB</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
