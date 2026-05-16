import React, { useState } from 'react';
import { BottomSheet } from './Modals';

export const VideoDownloader = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [url, setUrl] = useState('');
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} header="Video Downloader" themeColor="from-[#EF4444] to-[#B91C1C]">
      <div className="flex gap-2 mb-4 bg-[var(--bg2)] p-1 rounded-xl">
        {['TikTok', 'Instagram', 'YouTube'].map(t => (
          <button key={t} className={`flex-1 text-xs py-2 rounded-lg font-bold ${t==='TikTok' ? 'bg-white shadow text-[#EF4444]' : 'text-gray-500'}`}>{t}</button>
        ))}
      </div>
      <input type="url" value={url} onChange={e=>setUrl(e.target.value)} placeholder="Paste link video disini..." className="w-full bg-[var(--bg3)] border border-[var(--border)] rounded-xl px-4 py-3 text-xs outline-none focus:border-[#EF4444] mb-3" />
      <button className="w-full bg-gradient-to-r from-[#EF4444] to-[#B91C1C] text-white font-bold py-3 rounded-xl shadow-md">Ambil Video</button>
      <div className="mt-8 text-center text-[10px] text-gray-400">Riwayat download kosong</div>
    </BottomSheet>
  );
}

export const GlobalChat = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} header="Global Chat" themeColor="from-[#10B981] to-[#047857]">
      <div className="h-[300px] bg-[var(--bg2)] rounded-xl p-4 flex flex-col items-center justify-center border border-[var(--border)]">
        <p className="text-xs font-semibold text-gray-500 mb-2">Login Guest</p>
        <input type="text" placeholder="Nama Anda..." className="bg-white border border-[var(--border)] rounded-lg px-3 py-2 text-xs outline-none focus:border-[#10B981] mb-2" />
        <button className="bg-gradient-to-r from-[#10B981] to-[#047857] text-white text-xs font-bold px-4 py-2 rounded-lg">Masuk Chat</button>
      </div>
    </BottomSheet>
  );
}

export const GameCenter = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} header="Game Center" themeColor="from-[#F59E0B] to-[#D97706]">
      <div className="flex gap-2 mb-6">
        <button className="flex-1 bg-[rgba(245,158,11,0.1)] border border-[#F59E0B] text-[#D97706] font-bold py-3 rounded-xl flex flex-col items-center gap-1">
          <span className="text-xl">♟️</span>
          <span className="text-xs">Catur</span>
        </button>
        <button className="flex-1 bg-[var(--bg3)] text-[var(--text-muted)] font-bold py-3 rounded-xl flex flex-col items-center gap-1 opacity-50">
          <span className="text-xl">🏃</span>
          <span className="text-xs">Subway Surfer</span>
          <span className="text-[8px] bg-black text-white px-1.5 rounded">Coming Soon</span>
        </button>
      </div>
      <div className="aspect-square bg-[#E5E7EB] rounded-xl flex items-center justify-center p-4">
        <div className="text-center">
          <h4 className="font-bold text-sm text-[var(--primary)] mb-1">Catur vs AI</h4>
          <p className="text-xs text-gray-500 mb-4">Fitur ini sedang dalam pengembangan.</p>
          <button className="bg-[var(--accent)] text-white text-xs font-bold px-4 py-2 rounded-lg">Mulai Main (Demo)</button>
        </div>
      </div>
    </BottomSheet>
  );
}
