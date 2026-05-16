import React from 'react';
import { useStore } from '../store/useStore';
import { dbSet } from '../lib/firebase';
import { formatRupiah, escapeHtml } from '../lib/utils';
import { Star, Copy, QrCode, Upload, ArrowRight, X, Phone } from 'lucide-react';
import { ADMIN_WA, PAYMENT_CFG } from '../lib/constants';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  header?: string;
  themeColor?: string;
}

export const BottomSheet = ({ isOpen, onClose, children, header, themeColor = 'from-[var(--accent)] to-[var(--accent2)]' }: ModalProps) => {
  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={(e) => { if(e.target === e.currentTarget) onClose(); }}>
      <div className="modal-sheet relative overflow-y-auto no-scrollbar">
        <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${themeColor}`}></div>
        <div className="modal-handle"></div>
        {header && (
          <div className="px-5 pb-3 flex items-center justify-between border-b border-[var(--border2)]">
            <h3 className="font-bold text-[var(--text)]">{header}</h3>
            <button onClick={onClose} className="p-1.5 bg-[var(--bg3)] rounded-full text-[var(--text-muted)] hover:text-black">
              <X size={16} />
            </button>
          </div>
        )}
        <div className="p-5 pb-8 overflow-y-auto max-h-[80vh]">
          {children}
        </div>
      </div>
    </div>
  );
}

export const ProductModal = ({ product, isOpen, onClose, onBuy }: { product: any, isOpen: boolean, onClose: () => void, onBuy: () => void }) => {
  const [selectedVarian, setSelectedVarian] = React.useState(0);

  if (!product) return null;

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="-mt-5 -mx-5 mb-5 relative aspect-video bg-gradient-to-br from-[#16213E] to-[#0F3460] p-4 flex flex-col justify-end">
        {product.imgUrl && <img src={product.imgUrl} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" alt="" />}
        <h2 className="relative z-10 text-white font-bold text-lg uppercase">{product.title}</h2>
        <p className="relative z-10 text-blue-200/70 text-[10px] leading-none uppercase tracking-wider">SANZ STORE</p>
      </div>

      <div className="mb-4">
        <h3 className="text-[17px] font-bold text-[var(--text)]">{product.title}</h3>
        <div className="text-[20px] font-bold text-[var(--accent)] mt-1">{product.varians[selectedVarian]?.price || product.price}</div>
        <p className="text-[11px] text-[var(--text-muted)] mt-1">{product.available}</p>
      </div>

      <div className="mb-5">
        <p className="text-[10px] font-semibold uppercase text-[var(--text-muted)] tracking-wide mb-2">Pilih Varian</p>
        <div className="grid grid-cols-2 gap-2">
          {product.varians.map((v: any, i: number) => (
            <button 
              key={i} 
              onClick={() => setSelectedVarian(i)}
              className={`p-2 rounded-lg border text-xs font-semibold text-left transition-colors ${selectedVarian === i ? 'border-[var(--accent)] bg-[rgba(15,52,96,0.04)] text-[var(--accent)]' : 'border-[var(--border)] text-[var(--text-muted)]'}`}
            >
              <div className="flex justify-between items-center">
                <span>{v.name}</span>
                <span>{v.price}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <button onClick={onBuy} className="flex-1 bg-gradient-primary text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2">
          <span>🛒</span> Beli Sekarang
        </button>
        <button className="flex-1 bg-[var(--bg3)] border border-[var(--border)] text-[var(--text-muted)] font-bold py-3 rounded-xl transition-colors hover:bg-gray-200">
          Cek Order
        </button>
      </div>

      <div className="mb-6">
        <h4 className="font-bold mb-2 text-sm text-[var(--primary)]">Deskripsi</h4>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed">{product.desc}</p>
      </div>

      <div>
        <h4 className="font-bold mb-3 text-sm text-[var(--primary)]">Keunggulan Fitur</h4>
        <div className="grid grid-cols-2 gap-3">
          {product.features?.map((f: any, i: number) => (
            <div key={i} className="bg-[var(--bg2)] p-3 rounded-xl border border-[var(--border2)]">
              <div className="text-xl mb-1.5">{f.icon}</div>
              <h5 className="font-bold text-xs mb-1 text-[var(--primary)]">{f.name}</h5>
              <p className="text-[10px] text-[var(--text-muted)] leading-snug">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
}

export const OrderModal = ({ product, isOpen, onClose, onNext }: { product: any, isOpen: boolean, onClose: () => void, onNext: () => void }) => {
  if (!product) return null;
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} header={`Order: ${product.title}`} themeColor="from-[#E94560] to-[#EF4444]">
      <div className="flex items-center justify-between mb-6 relative">
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gray-200 -z-10 -translate-y-1/2"></div>
        {[ 'Produk', 'Data', 'Bayar' ].map((step, i) => (
          <div key={step} className="flex flex-col items-center gap-1.5 bg-white px-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white transition-colors ${i === 0 ? 'bg-[var(--green)]' : i === 1 ? 'bg-[var(--primary)]' : 'bg-gray-300 text-gray-500'}`}>
              {i === 0 ? '✓' : i + 1}
            </div>
            <span className={`text-[9px] font-bold ${i === 1 ? 'text-[var(--primary)]' : 'text-gray-400'}`}>{step}</span>
          </div>
        ))}
      </div>

      <div className="bg-[var(--bg2)] border border-[var(--border)] rounded-xl p-4 mb-5">
        <h4 className="font-bold text-xs text-[var(--primary)] mb-1">Informasi Pesanan</h4>
        <div className="flex justify-between items-center text-xs mt-2">
          <span className="text-[var(--text-muted)]">Nama Produk</span>
          <span className="font-semibold">{product.title}</span>
        </div>
        <div className="flex justify-between items-center text-xs mt-2">
          <span className="text-[var(--text-muted)]">Harga</span>
          <span className="font-bold text-[var(--accent)]">{product.price}</span>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {product.cat === 'panel' ? (
          <>
            <div>
              <label className="text-[10px] font-semibold text-[var(--text-muted)] uppercase mb-1.5 block">Username Panel</label>
              <input type="text" className="w-full bg-[var(--bg3)] border border-[var(--border)] rounded-lg px-3 py-2.5 text-xs focus:border-[var(--primary)] outline-none" placeholder="Masukkan username" required />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-[var(--text-muted)] uppercase mb-1.5 block">Password Panel</label>
              <input type="password" className="w-full bg-[var(--bg3)] border border-[var(--border)] rounded-lg px-3 py-2.5 text-xs focus:border-[var(--primary)] outline-none" placeholder="Buat password" required />
            </div>
          </>
        ) : (
          <div className="bg-[rgba(16,185,129,0.05)] text-[var(--green)] border border-[rgba(16,185,129,0.2)] p-3 rounded-lg text-xs font-semibold text-center">
            ✔ Produk ini tidak memerlukan form tambahan
          </div>
        )}
      </div>

      <button onClick={onNext} className="w-full bg-gradient-primary text-white font-bold py-3 rounded-xl shadow-[0_4px_14px_rgba(15,52,96,0.25)] hover:shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2">
        Lanjut ke Pembayaran <ArrowRight size={16}/>
      </button>
    </BottomSheet>
  );
}

export const PaymentModal = ({ product, isOpen, onClose }: { product: any, isOpen: boolean, onClose: () => void }) => {
  const [method, setMethod] = React.useState('qris');
  const [proof, setProof] = React.useState<File | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const { playKonfetti } = useStore();

  const handleConfirm = async () => {
    if(!proof) return;
    setIsUploading(true);
    // Mimic upload to imgbb (using dummy timeout)
    await new Promise(r => setTimeout(r, 1500));
    setIsUploading(false);
    playKonfetti();
    onClose();
    
    // Open WA
    const text = encodeURIComponent(`Halo Admin, saya sudah membayar pesanan:\n\nProduk: ${product.title}\nHarga: ${product.price}\nMetode: ${method.toUpperCase()}`);
    window.open(`https://wa.me/${ADMIN_WA}?text=${text}`, '_blank');
  };

  if(!product) return null;

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} header="Pembayaran" themeColor="from-[#0F3460] to-[#1A1A2E]">
      <div className="bg-[rgba(15,52,96,0.06)] border border-[var(--primary)]/10 rounded-xl p-4 mb-5 flex justify-between items-center">
        <div>
          <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wide font-semibold">Total Tagihan</p>
          <p className="text-[20px] font-bold text-[var(--accent)]">{product.price}</p>
        </div>
      </div>

      <h4 className="font-bold text-xs text-[var(--primary)] mb-3">Pilih Metode</h4>
      <div className="grid grid-cols-2 gap-2 mb-6">
        {['dana', 'gopay', 'ovo', 'qris'].map(m => (
          <button key={m} onClick={() => setMethod(m)} className={`p-3 rounded-xl border flex items-center gap-2 transition-colors ${method === m ? 'border-[var(--primary)] bg-[rgba(15,52,96,0.04)]' : 'border-[var(--border)]'}`}>
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${method === m ? 'border-[var(--primary)]' : 'border-gray-300'}`}>
              {method === m && <div className="w-2 h-2 rounded-full bg-[var(--primary)]"></div>}
            </div>
            <span className="text-xs font-bold uppercase">{m}</span>
          </button>
        ))}
      </div>

      {method === 'qris' ? (
        <div className="mb-6 flex flex-col items-center">
          <div className="bg-white p-2 rounded-2xl border border-[var(--border)] shadow-sm mb-3">
            <img src={PAYMENT_CFG.qris.url} alt="QRIS" className="w-48 h-48 object-contain rounded-xl" />
          </div>
          <p className="text-[10px] text-[var(--text-muted)] mb-2">Scan QR code di atas menggunakan E-Wallet / Mobile Banking Anda.</p>
        </div>
      ) : (
        <div className="mb-6 bg-[var(--bg2)] border border-[var(--border)] rounded-xl p-4">
          <p className="text-[10px] text-[var(--text-muted)] mb-1">Transfer ke Nomor {method.toUpperCase()}:</p>
          <div className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-[var(--border)]">
            <span className="text-sm font-bold tracking-widest">
              {(PAYMENT_CFG as any)[method]?.no}
            </span>
            <button className="text-[var(--accent)] flex items-center gap-1 bg-[rgba(15,52,96,0.1)] px-2 py-1 rounded text-[10px] font-bold">
              <Copy size={12}/> Salin
            </button>
          </div>
        </div>
      )}

      <h4 className="font-bold text-xs text-[var(--primary)] mb-2">Upload Bukti Transfer</h4>
      <label className="border-2 border-dashed border-[var(--border)] rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-[var(--bg2)] transition-colors mb-6">
        {proof ? (
          <div className="text-xs font-semibold text-[var(--green)] flex items-center gap-2">✓ Foto berhasil dipilih</div>
        ) : (
          <>
            <Upload className="w-6 h-6 text-[var(--text-muted)] mb-2" />
            <span className="text-xs font-semibold text-[var(--text-muted)]">Pilih foto atau drag kesini</span>
          </>
        )}
        <input type="file" className="hidden" accept="image/*" onChange={e => e.target.files && setProof(e.target.files[0])} />
      </label>

      <button disabled={!proof || isUploading} onClick={handleConfirm} className="w-full bg-gradient-primary text-white font-bold py-3.5 rounded-xl shadow-md disabled:opacity-50 transition-opacity">
        {isUploading ? 'Memproses...' : 'Konfirmasi — Sudah Bayar'}
      </button>
    </BottomSheet>
  );
}

export const AiChatWidget = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [msgs, setMsgs] = React.useState([{ from: 'bot', text: 'Halo! Ada yang bisa dibantu?' }]);
  const [input, setInput] = React.useState('');

  const send = () => {
    if(!input.trim()) return;
    setMsgs([...msgs, { from: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMsgs(prev => [...prev, { from: 'bot', text: 'Admin sedang offline, silahkan klik Lanjut WA 😊' }]);
    }, 1000);
  }

  return (
    <>
      <button onClick={onClose} className={`fixed bottom-[75px] right-4 w-12 h-12 bg-gradient-to-br from-[#1A1A2E] to-[#E94560] rounded-full text-white shadow-lg shadow-[#1A1A2E]/30 flex items-center justify-center text-xl z-40 transition-transform ${isOpen?'scale-0':'scale-100 animate-pulse'}`}>
        💬
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-[8px] font-bold">1</div>
      </button>
      
      {isOpen && (
        <div className="fixed bottom-[90px] right-4 w-[320px] h-[450px] bg-white rounded-[20px] shadow-[0_8px_40px_rgba(0,0,0,0.15)] z-50 flex flex-col border border-[var(--border)] overflow-hidden animate-slideUp origin-bottom-right">
          <div className="bg-gradient-primary p-4 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur border border-white/10 flex items-center justify-center text-xl">👩🏻‍💻</div>
              <div>
                <h4 className="text-white font-bold text-sm leading-tight flex items-center gap-1">Una <span className="bg-white/20 px-1 py-0.5 rounded text-[8px]">AI</span></h4>
                <div className="flex items-center gap-1 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full"></div>
                  <span className="text-white/80 text-[10px]">Online</span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white"><X size={18}/></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 bg-[var(--bg2)] flex flex-col gap-3">
            {msgs.map((m, i) => (
              <div key={i} className={`max-w-[85%] p-3 text-xs leading-relaxed ${m.from === 'bot' ? 'bg-white rounded-2xl rounded-tl-sm border border-[var(--border2)] text-[var(--text)] self-start shadow-sm' : 'bg-gradient-primary text-white rounded-2xl rounded-tr-sm self-end shadow-md'}`}>
                {m.text}
              </div>
            ))}
          </div>

          <div className="p-3 bg-white border-t border-[var(--border)] shrink-0">
            <div className="flex gap-2">
              <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} type="text" placeholder="Ketik pesan..." className="flex-1 bg-[var(--bg3)] border border-[var(--border)] rounded-full px-4 text-xs outline-none focus:border-[var(--primary)] transition-colors" />
              <button onClick={send} className="w-[38px] h-[38px] rounded-full bg-gradient-primary text-white flex items-center justify-center shrink-0 shadow-md">
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
