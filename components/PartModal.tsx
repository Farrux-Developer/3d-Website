'use client';

import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, Zap, ShieldAlert } from 'lucide-react';
import { partsData } from '@/lib/partsData';
import { useEffect } from 'react';

export default function PartModal({ id }: { id: string }) {
  const router = useRouter();
  const data = partsData[id];

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') router.back();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  if (!data) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-end p-8 pointer-events-none">
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="pointer-events-auto relative w-full max-w-md backdrop-blur-md bg-black/60 border border-white/10 p-8 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Decorative gradients */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 blur-3xl rounded-full" />

          <button
            onClick={() => router.back()}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                {data.status === 'optimal' ? (
                  <Activity className="text-green-400" size={20} />
                ) : data.status === 'warning' ? (
                  <ShieldAlert className="text-yellow-400" size={20} />
                ) : (
                  <ShieldAlert className="text-red-400" size={20} />
                )}
                <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                  {data.name}
                </h2>
              </div>
              <p className="text-sm font-mono text-white/40 uppercase tracking-widest">
                ID: {data.id.toUpperCase()}-X9
              </p>
            </div>

            <p className="text-white/80 leading-relaxed text-lg">
              {data.description}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="space-y-1">
                <p className="text-xs text-white/40 uppercase font-semibold tracking-wider">Material</p>
                <p className="font-mono text-sm">{data.material}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-white/40 uppercase font-semibold tracking-wider flex items-center gap-1">
                  <Zap size={12} /> Power Draw
                </p>
                <p className="font-mono text-sm text-yellow-300">{data.powerDraw}</p>
              </div>
            </div>
            
            <div className="pt-4">
               <button 
                onClick={() => router.back()}
                className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 transition-colors rounded-lg font-medium tracking-wide"
               >
                 Acknowledge & Close
               </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
