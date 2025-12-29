import { useDramas } from "@/hooks/use-dramas";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { DramaCard } from "@/components/DramaCard";
import { DramaModal } from "@/components/DramaModal";
import { useState, useMemo } from "react";
import { Loader2 } from "lucide-react";
import { type Drama } from "@shared/schema";
import { motion } from "framer-motion";

export default function Home() {
  const { data: dramas, isLoading, isError } = useDramas();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDrama, setSelectedDrama] = useState<Drama | null>(null);

  // Filter dramas based on search
  const filteredDramas = useMemo(() => {
    if (!dramas) return [];
    if (!searchTerm) return dramas;
    return dramas.filter((d) => 
      d.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [dramas, searchTerm]);

  // Select a random drama for the hero section
  const heroDrama = useMemo(() => {
    if (!dramas || dramas.length === 0) return null;
    // Use a stable index or random based on day to prevent hydration mismatches if doing SSR (not an issue here but good practice)
    // For now, simple random is fine for SPA
    return dramas[Math.floor(Math.random() * dramas.length)];
  }, [dramas]);

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
        <p className="text-gray-400">Unable to load content. Please try again later.</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-6 bg-red-600 text-white px-6 py-2 rounded font-bold hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white selection:bg-red-600 selection:text-white">
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Hero Section - Only show if not searching */}
      {!searchTerm && heroDrama && (
        <div className="mb-8">
          <Hero drama={heroDrama} onMoreInfo={() => setSelectedDrama(heroDrama)} />
        </div>
      )}

      {/* Main Content Area */}
      <main className={`relative z-10 px-4 md:px-12 pb-24 ${searchTerm ? 'pt-24' : '-mt-24'}`}>
        
        {searchTerm ? (
          <div className="mb-8">
            <h2 className="text-2xl font-medium text-gray-400 mb-6">
              Search results for "{searchTerm}"
            </h2>
            {filteredDramas.length === 0 ? (
              <p className="text-gray-500">No dramas found matching your search.</p>
            ) : (
              <motion.div 
                layout
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 gap-y-8"
              >
                {filteredDramas.map((drama) => (
                  <DramaCard 
                    key={drama.id} 
                    drama={drama} 
                    onClick={setSelectedDrama} 
                  />
                ))}
              </motion.div>
            )}
          </div>
        ) : (
          /* Browse Rows */
          <div className="space-y-12">
            <section>
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-100 hover:text-white cursor-pointer transition-colors inline-block">
                Trending Now
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {dramas?.slice(0, 6).map((drama) => (
                  <DramaCard 
                    key={drama.id} 
                    drama={drama} 
                    onClick={setSelectedDrama} 
                  />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-100 hover:text-white cursor-pointer transition-colors inline-block">
                Top Rated Dramas
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {dramas?.slice(6, 12).map((drama) => (
                  <DramaCard 
                    key={drama.id} 
                    drama={drama} 
                    onClick={setSelectedDrama} 
                  />
                ))}
              </div>
            </section>
            
            <section>
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-100 hover:text-white cursor-pointer transition-colors inline-block">
                New Releases
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {dramas?.slice(12, 24).map((drama) => (
                  <DramaCard 
                    key={drama.id} 
                    drama={drama} 
                    onClick={setSelectedDrama} 
                  />
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="px-4 md:px-12 py-16 text-gray-500 text-sm bg-black/50 mt-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-4 mb-4">
             {/* Social icons placeholder */}
             <div className="w-6 h-6 bg-gray-800 rounded-sm"></div>
             <div className="w-6 h-6 bg-gray-800 rounded-sm"></div>
             <div className="w-6 h-6 bg-gray-800 rounded-sm"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 gap-y-3 mb-8">
            <a href="#" className="hover:underline">Audio Description</a>
            <a href="#" className="hover:underline">Help Center</a>
            <a href="#" className="hover:underline">Gift Cards</a>
            <a href="#" className="hover:underline">Media Center</a>
            <a href="#" className="hover:underline">Investor Relations</a>
            <a href="#" className="hover:underline">Jobs</a>
            <a href="#" className="hover:underline">Terms of Use</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Legal Notices</a>
            <a href="#" className="hover:underline">Cookie Preferences</a>
            <a href="#" className="hover:underline">Corporate Information</a>
            <a href="#" className="hover:underline">Contact Us</a>
          </div>
          <button className="border border-gray-500 px-4 py-1 hover:text-white mb-4 text-xs">
            Service Code
          </button>
          <div>
            &copy; 2024 DramaBox, Inc.
          </div>
        </div>
      </footer>

      {/* Detail Modal */}
      <DramaModal 
        drama={selectedDrama} 
        isOpen={!!selectedDrama} 
        onClose={() => setSelectedDrama(null)} 
      />
    </div>
  );
}
