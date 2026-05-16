import { useState, useRef } from 'react';
import { useStore } from '../store/useStore';
import { Star } from 'lucide-react';

const TiltCard = ({ children, isFeatured, onClick }: { children: React.ReactNode, isFeatured: boolean, onClick: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'none'
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'all 0.5s ease'
    });
  };

  return (
    <div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={style}
      className={`bg-white border border-black/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer ${isFeatured ? 'col-span-2' : ''}`}
    >
      {children}
    </div>
  )
}

export const ProductList = ({ onSelectProduct }: { onSelectProduct: (p: any) => void }) => {
  const { products, reviews } = useStore();
  const [activeTab, setActiveTab] = useState('Semua');
  const tabs = ['Semua', 'Bot WA', 'Panel', 'Script'];

  const filtered = products.filter((p: any) => {
    if (activeTab === 'Semua') return true;
    if (activeTab === 'Bot WA' && p.cat === 'bot-wa') return true;
    if (activeTab === 'Panel' && p.cat === 'panel') return true;
    if (activeTab === 'Script' && p.cat === 'source-code') return true;
    return false;
  });

  return (
    <div className="px-4 py-6" id="products">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mb-6 pb-2">
        {tabs.map(t => (
          <button 
            key={t}
            onClick={() => setActiveTab(t)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${activeTab === t ? 'bg-gradient-to-r from-[#1A1A2E] to-[#E94560] text-white shadow-md' : 'bg-[#F1F3F5] text-slate-500 border border-black/5'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center px-1 mb-4">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Populer 🔥</h3>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          <span className="text-[10px] text-slate-500 font-medium">{Math.floor(Math.random() * (85 - 12 + 1)) + 12} Aktif</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filtered.map((p, i) => {
          const isFeatured = i === filtered.length - 1 && filtered.length % 2 !== 0;
          
          return (
            <TiltCard 
              key={p.id} 
              isFeatured={isFeatured}
              onClick={() => onSelectProduct(p)}
            >
              <div className={`h-24 relative bg-gradient-to-br ${p.cat==='bot-wa'?'from-indigo-900 to-slate-900':p.cat==='panel'?'from-blue-900 to-[#1A1A2E]':'from-[#2e1065] to-[#1e1b4b]'} p-3 flex flex-col justify-end overflow-hidden`}>
                <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-white/10 blur-xl"></div>
                {p.imgUrl && <img src={p.imgUrl} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" alt={p.title} />}
                
                {p.cat==='bot-wa' ? (
                  <span className="absolute top-2 left-2 bg-gradient-to-r from-[#1A1A2E] to-[#E94560] text-[8px] text-white px-2 py-0.5 rounded-full font-bold uppercase">Baru</span>
                ) : (
                  <span className="absolute top-2 right-2 bg-black/40 text-[8px] text-white px-2 py-0.5 rounded-full border border-white/20">{p.cat.replace('-',' ')}</span>
                )}

                <div className="relative z-10 mt-8">
                  <p className="text-[9px] font-bold text-white tracking-[1.5px] uppercase">{p.imgTitle || p.title}</p>
                  <p className="text-[7.5px] text-white/60">SANZ STORE</p>
                </div>
              </div>

              <div className="p-3">
                <h4 className="text-[11px] font-bold text-[#1A1A2E]">{p.title}</h4>
                
                <div className="flex items-center gap-1 my-1">
                  <span className="text-yellow-500 text-[10px]">★★★★★</span>
                  <span className="text-[9px] text-slate-400">(128)</span>
                </div>

                <p className="text-xs font-bold bg-gradient-to-r from-[#1A1A2E] to-[#E94560] bg-clip-text text-transparent">{p.price}</p>
                
                <div className="mt-2 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  <span className="text-[9px] text-emerald-600 font-medium">Stok Unlimited</span>
                </div>
              </div>
            </TiltCard>
          )
        })}
      </div>
    </div>
  )
}
