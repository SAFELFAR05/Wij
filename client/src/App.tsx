import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  useEffect(() => {
    fetchDramas();
    const profile = new URLSearchParams(window.location.search).get('showProfile');
    if (profile === 'true') {
      showProfile();
    }
  }, []);

  const [allDramas, setAllDramas] = useState<any[]>([]);
  const [heroDramaId, setHeroDramaId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [mainContent, setMainContent] = useState(true);
  const [vipContent, setVipContent] = useState(false);
  const [popularContent, setPopularContent] = useState(false);
  const [dubbedContent, setDubbedContent] = useState(false);

  async function fetchDramas() {
    try {
      const response = await fetch('/api/dramas');
      const result = await response.json();
      if (result.success) {
        setAllDramas(result.data.book);
        setupHero(result.data.book[0]);
      }
    } catch (err) {
      console.error('Failed to fetch dramas:', err);
    }
  }

  function setupHero(drama: any) {
    setHeroDramaId(drama.id);
  }

  function showMain() {
    setMainContent(true);
    setVipContent(false);
    setPopularContent(false);
    setDubbedContent(false);
  }

  function showVIP() {
    setMainContent(false);
    setVipContent(true);
    setPopularContent(false);
    setDubbedContent(false);
  }

  function showPopular() {
    setMainContent(false);
    setVipContent(false);
    setPopularContent(true);
    setDubbedContent(false);
  }

  function showDubbed() {
    setMainContent(false);
    setVipContent(false);
    setPopularContent(false);
    setDubbedContent(true);
  }

  function showProfile() {
    setProfileModalVisible(true);
  }

  function closeProfile() {
    setProfileModalVisible(false);
  }

  function closeModal() {
    setModalVisible(false);
  }

  const heroDrama = allDramas[0];

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-500 px-4 py-3 md:px-8 md:py-4 flex items-center justify-between netflix-gradient">
        <div className="flex items-center space-x-4 md:space-x-8">
          <h1 
            className="text-red-600 text-2xl md:text-3xl font-bold tracking-tighter cursor-pointer uppercase"
            onClick={() => window.location.reload()}
          >
            ELFAR<span className="italic">BOX</span>
          </h1>
          <div className="hidden md:flex space-x-4 text-sm font-light">
            <a href="#" onClick={() => showMain()} className="hover:text-gray-300 transition-colors">Beranda</a>
            <a href="/shorts.html" className="hover:text-gray-300 transition-colors">Shorts</a>
            <a href="#" onClick={() => showVIP()} className="hover:text-gray-300 transition-colors">VIP <span className="bg-yellow-500 text-black text-[10px] px-1 rounded-sm font-bold ml-1">NEW</span></a>
            <a href="#" onClick={() => showDubbed()} className="hover:text-gray-300 transition-colors">Sulih Suara</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Serial TV</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Film</a>
          </div>
        </div>
        <div className="flex items-center space-x-3 md:space-x-4">
          <div className="relative group">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-white transition-colors"></i>
            <input type="text" placeholder="Cari drama..." 
              className="bg-black/50 border border-white/20 rounded-full py-1.5 pl-10 pr-4 text-xs md:text-sm focus:outline-none focus:border-red-600 focus:bg-black/80 transition-all w-32 md:w-64" />
          </div>
          <i className="fas fa-bell text-sm md:text-lg cursor-pointer hidden sm:block"></i>
          <div 
            onClick={() => showProfile()}
            className="w-7 h-7 md:w-8 md:h-8 bg-blue-500 rounded cursor-pointer flex items-center justify-center font-bold text-xs md:text-sm"
          >
            U
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Bar */}
      <div className="md:hidden fixed bottom-0 w-full bg-black/20 backdrop-blur-xl border-t border-white/10 z-50 px-6 py-2 pb-4 flex justify-between items-center text-gray-400">
        <button onClick={() => showMain()} className="flex flex-col items-center space-y-0.5 transition-all active:scale-95">
          <i className="fas fa-home text-lg"></i>
          <span className="text-[9px] font-medium tracking-tight">Beranda</span>
        </button>
        <a href="/shorts.html" className="flex flex-col items-center space-y-0.5 transition-all active:scale-95">
          <i className="fas fa-play-circle text-lg"></i>
          <span className="text-[9px] font-medium tracking-tight">Shorts</span>
        </a>
        <button onClick={() => showVIP()} className="flex flex-col items-center space-y-0.5 transition-all active:scale-95">
          <i className="fas fa-crown text-lg text-yellow-500"></i>
          <span className="text-[9px] font-medium tracking-tight">VIP</span>
        </button>
        <button onClick={() => showPopular()} className="flex flex-col items-center space-y-0.5 transition-all active:scale-95">
          <i className="fas fa-fire text-lg"></i>
          <span className="text-[9px] font-medium tracking-tight">Populer</span>
        </button>
        <button onClick={() => showDubbed()} className="flex flex-col items-center space-y-0.5 transition-all active:scale-95">
          <i className="fas fa-language text-lg"></i>
          <span className="text-[9px] font-medium tracking-tight">Sulih</span>
        </button>
        <button onClick={() => showProfile()} className="flex flex-col items-center space-y-0.5 transition-all active:scale-95">
          <i className="fas fa-user text-lg"></i>
          <span className="text-[9px] font-medium tracking-tight">Profil</span>
        </button>
      </div>

      {/* Profile Modal */}
      {profileModalVisible && (
        <div className="modal flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto relative border border-white/20 shadow-2xl scrollbar-hide">
            <button 
              onClick={() => closeProfile()}
              className="absolute top-4 right-4 z-50 bg-black/20 hover:bg-black/40 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            >
              <i className="fas fa-times text-white/70"></i>
            </button>
            <div className="p-8">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-900 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg border border-white/20">U</div>
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Pengguna Setia</h2>
                  <p className="text-white/50 text-sm">elfarbox@elfar.my.id</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-3.5 hover:bg-white/10 rounded-xl transition-all text-white/90 group">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      <i className="fas fa-user-circle text-lg text-white/60"></i>
                    </div>
                    <span className="font-medium">Akun Saya</span>
                  </div>
                  <i className="fas fa-chevron-right text-xs text-white/30 group-hover:translate-x-1 transition-transform"></i>
                </button>
                <button onClick={() => window.location.href = '/about.html'} className="w-full flex items-center justify-between p-3.5 hover:bg-white/10 rounded-xl transition-all text-white/90 group">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      <i className="fas fa-info-circle text-lg text-white/60"></i>
                    </div>
                    <span className="font-medium">Tentang ELFARBOX</span>
                  </div>
                  <i className="fas fa-chevron-right text-xs text-white/30 group-hover:translate-x-1 transition-transform"></i>
                </button>
              </div>
              
              <p className="text-[10px] text-white/30 mt-10 text-center uppercase tracking-[0.2em] font-bold">ELFARBOX v1.2.0</p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      {mainContent && heroDrama && (
        <div 
          className="relative h-[60vh] md:h-[80vh] w-full bg-cover bg-center flex items-end pb-12 md:pb-24 px-4 md:px-12"
          style={{ backgroundImage: `url(${heroDrama.cover})` }}
        >
          <div className="hero-gradient absolute inset-0"></div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-6xl font-bold mb-2 md:mb-4">{heroDrama.name}</h2>
            <p className="text-sm md:text-lg text-gray-200 mb-4 md:mb-6 line-clamp-3">{heroDrama.introduction}</p>
            <div className="flex space-x-3 md:space-x-4">
              <button 
                onClick={() => window.location.href = `/detail.html?id=${heroDrama.id}&episode=1`}
                className="bg-white text-black px-6 py-2 md:px-8 md:py-2 rounded font-bold flex items-center space-x-2 hover:bg-white/80 transition text-sm md:text-base"
              >
                <i className="fas fa-play"></i> <span>Play</span>
              </button>
              <button 
                onClick={() => window.location.href = `/detail.html?id=${heroDrama.id}`}
                className="bg-gray-500/50 text-white px-6 py-2 md:px-8 md:py-2 rounded font-bold flex items-center space-x-2 hover:bg-gray-500/30 transition text-sm md:text-base"
              >
                <i className="fas fa-info-circle"></i> <span>More Info</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {mainContent && (
        <div className="px-4 md:px-12 -mt-12 relative z-20 space-y-8 pb-12 pt-20">
          <div>
            <h3 className="text-xl font-bold mb-4">Trending Now</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {allDramas.map(drama => (
                <div 
                  key={drama.id}
                  onClick={() => window.location.href = `/detail.html?id=${drama.id}`}
                  className="movie-card transition-all duration-300 cursor-pointer group"
                >
                  <div className="relative overflow-hidden rounded-sm md:rounded-md">
                    <img src={drama.cover} alt={drama.name} className="w-full h-auto aspect-[2/3] object-cover" />
                  </div>
                  <p className="mt-2 text-xs md:text-sm font-medium line-clamp-1">{drama.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIP Content */}
      {vipContent && (
        <div className="px-4 md:px-12 pt-24 relative z-20 space-y-12 pb-12">
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-900 p-8 rounded-xl shadow-2xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 uppercase">ELFAR<span className="italic">BOX</span> <span className="text-yellow-200">VIP</span></h2>
              <p className="text-yellow-100 opacity-90">Nikmati akses eksklusif ke pilihan mingguan dan konten premium terbaik.</p>
            </div>
            <button className="bg-white text-yellow-900 px-8 py-3 rounded-full font-bold hover:scale-105 transition shadow-lg">Buka Akses VIP</button>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
