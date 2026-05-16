import React, { useEffect, useState } from 'react';
import { useStore } from './store/useStore';
import { LoadingScreen, KonfettiCanvas } from './components/CoreUI';
import { ProductList } from './components/ProductList';
import { ProductModal, OrderModal, PaymentModal, AiChatWidget } from './components/Modals';
import { VideoDownloader, GlobalChat, GameCenter } from './components/ExtraFeatures';
import { ADMIN_WA } from './lib/constants';

function App() {
  const { loadInitialData, isBuffering, info } = useStore();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [modalStage, setModalStage] = useState<'detail' | 'order' | 'payment' | null>(null);
  
  const [botNavOpen, setBotNavOpen] = useState<{vdl:boolean, game:boolean, gchat:boolean, cs:boolean}>({
    vdl: false, game: false, gchat: false, cs: false
  });

  const openAppModal = (key: keyof typeof botNavOpen) => {
    setBotNavOpen(prev => ({ ...prev, [key]: true }));
  };

  const closeAppModal = (key: keyof typeof botNavOpen) => {
    setBotNavOpen(prev => ({ ...prev, [key]: false }));
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  if (isBuffering) {
    return <LoadingScreen />;
  }

  const handleSelectProduct = (p: any) => {
    setSelectedProduct(p);
    setModalStage('detail');
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans pb-24 relative overflow-x-hidden">
      <KonfettiCanvas />

      <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white py-1.5 px-4 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap text-[10px] font-medium opacity-90 flex gap-4">
          <span>🎉 PROMO MERDEKA: DISKON 50% PANEL PTERODACTYL</span>
          <span>•</span>
          <span>⚡ AKTIVASI OTOMATIS KURANG DARI 30 MENIT</span>
        </div>
      </div>
      
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-black/5 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-gradient-to-br from-[#1A1A2E] to-[#E94560] rounded-xl flex items-center justify-center text-white font-bold text-lg">
            S
          </div>
          <div>
            <h1 className="text-sm font-bold text-[var(--primary)] leading-none">{info.name || 'Sanz Store'}</h1>
            <p className="text-[9px] text-[var(--text-muted)] font-medium tracking-wide uppercase mt-1">Premium Digital Shop</p>
          </div>
        </div>
        <button className="px-3 py-1.5 border border-[var(--accent)]/20 text-[var(--accent)] text-[11px] font-semibold rounded-lg hover:bg-slate-50 transition-colors">
          <a href={`https://wa.me/${ADMIN_WA}`} target="_blank" rel="noreferrer">
            Owner
          </a>
        </button>
      </nav>

      {/* Hero */}
      <div className="px-4 py-4">
        <div className="relative w-full h-[180px] bg-[var(--primary)] rounded-2xl overflow-hidden group shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)] via-[var(--accent)] to-[var(--accent2)] opacity-40"></div>
          
          <img src="https://img2.pixhost.to/images/7943/727036977_elaina-1778940968296.jpg" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen" alt="Hero" />
          
          <div className="absolute inset-0 flex flex-col justify-center px-6 mix-blend-overlay">
            <span className="text-[10px] text-white/70 uppercase tracking-widest font-bold mb-1">New Arrival</span>
            <h2 className="text-2xl font-extrabold text-white leading-tight">BOT WA MULTI DEVICE</h2>
            <p className="text-xs text-white/80 mt-2">1800+ Fitur Aktif Siap Pakai</p>
          </div>

          <div className="absolute bottom-3 right-3 flex gap-1.5 z-20">
            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="px-4 mb-2 overflow-x-auto no-scrollbar flex gap-3 pb-2">
        {['100% Aman', 'Rating 4.9', 'Proses <30 mnt', 'Update Gratis', 'Support 24/7'].map(b => (
          <div key={b} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[var(--border)] shadow-sm whitespace-nowrap">
            <span className="text-xs">✨</span>
            <span className="text-[10px] text-[var(--text-muted)] font-medium">{b}</span>
          </div>
        ))}
      </div>

      <ProductList onSelectProduct={handleSelectProduct} />

      {/* Bottom Nav */}
      <div className="bg-white/95 backdrop-blur-2xl border-t border-black/5 px-2 py-2.5 flex items-center justify-around fixed bottom-0 left-0 right-0 z-40 pb-safe">
        {['Store', 'Downloader', 'Game', 'Global', 'CS'].map((item, i) => {
          const handlers = [
            () => window.scrollTo({top:0, behavior:'smooth'}),
            () => openAppModal('vdl'),
            () => openAppModal('game'),
            () => openAppModal('gchat'),
            () => openAppModal('cs')
          ];
          
          const icon = i===0?'🏠':i===1?'⬇️':i===2?'🎮':i===3?'💬':'🎧';
          
          return (
            <button key={item} onClick={handlers[i]} className={`flex flex-col items-center gap-1 ${i===0 ? 'opacity-100' : 'opacity-40'}`}>
              <span className={`text-lg ${i===0 ? 'text-[var(--accent)] drop-shadow-sm' : ''}`}>{icon}</span>
              <span className={`text-[9px] ${i===0 ? 'font-bold text-[var(--accent)]' : 'font-medium'}`}>{item}</span>
            </button>
          )
        })}
      </div>

      <ProductModal product={selectedProduct} isOpen={modalStage === 'detail'} onClose={() => setModalStage(null)} onBuy={() => setModalStage('order')} />
      <OrderModal product={selectedProduct} isOpen={modalStage === 'order'} onClose={() => setModalStage(null)} onNext={() => setModalStage('payment')} />
      <PaymentModal product={selectedProduct} isOpen={modalStage === 'payment'} onClose={() => { setModalStage(null); setSelectedProduct(null); }} />
      <AiChatWidget isOpen={botNavOpen.cs} onClose={() => closeAppModal('cs')} />
      <VideoDownloader isOpen={botNavOpen.vdl} onClose={() => closeAppModal('vdl')} />
      <GameCenter isOpen={botNavOpen.game} onClose={() => closeAppModal('game')} />
      <GlobalChat isOpen={botNavOpen.gchat} onClose={() => closeAppModal('gchat')} />
    </div>
  );
}

export default App;
