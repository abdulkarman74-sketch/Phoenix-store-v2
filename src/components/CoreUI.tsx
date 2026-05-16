import { useEffect, useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useStore } from '../store/useStore';

export const KonfettiCanvas = () => {
  const { shouldPlayKonfetti } = useStore();

  useEffect(() => {
    if (shouldPlayKonfetti) {
      const end = Date.now() + 3 * 1000;
      const colors = ['#EF4444', '#0F3460', '#F59E0B', '#10B981', '#1A1A2E'];

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
  }, [shouldPlayKonfetti]);

  return <canvas id="konfetti-canvas" className="fixed inset-0 pointer-events-none z-[8000]" />;
}

export const LoadingScreen = () => {
  const { info, isBuffering } = useStore();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!isBuffering) {
      const delay = info.loadingDelay ? parseInt(info.loadingDelay) * 1000 : 3000;
      const t = setTimeout(() => setVisible(false), delay);
      return () => clearTimeout(t);
    }
  }, [isBuffering, info]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-[var(--primary)] to-black flex flex-col items-center justify-center transition-opacity duration-500">
      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[var(--accent)] to-[var(--accent2)] animate-pulse-shadow mb-6 flex items-center justify-center shadow-[0_0_40px_rgba(233,69,96,0.3)]">
        <span className="text-white font-bold text-3xl">S</span>
      </div>
      <h1 className="text-white text-2xl font-bold tracking-tight mb-2">
        {info.loadingTitle || 'Sanz Store'}
      </h1>
      <p className="text-gray-400 text-sm mb-10">{info.loadingSub || 'Loading...'}</p>
      
      <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)] w-1/2 animate-shimmer rounded-full"></div>
      </div>
    </div>
  );
};
