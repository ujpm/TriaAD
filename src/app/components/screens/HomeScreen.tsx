import { motion } from 'motion/react';
import { GlassCard } from '../GlassCard';
import { Lock } from 'lucide-react';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';

interface HomeScreenProps {
  onInitiateScan: () => void;
  onNavigate: (page: string) => void;
}

export function HomeScreen({ onInitiateScan, onNavigate }: HomeScreenProps) {
  const phases = [
    { id: 1, title: 'Agent 1: Cognitive', subtitle: 'Voice & Reflex Analysis', locked: false },
    { id: 2, title: 'Agent 2: Genetic', subtitle: 'DNA Risk Profiling', locked: true },
    { id: 3, title: 'Agent 3: Structural', subtitle: 'Neural Imaging', locked: true }
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] font-['Inter']">
      <Navbar currentPage="app" onNavigate={onNavigate} />
      <div className="pt-24 p-8">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl tracking-wider text-white">
              Tri<span className="text-[#06B6D4]">AD</span> <span className="text-xl">agents</span>
            </h1>
            <div className="flex items-center gap-2">
              <motion.div
                className="w-3 h-3 rounded-full bg-[#10B981]"
                animate={{
                  boxShadow: [
                    '0 0 10px rgba(16, 185, 129, 0.5)',
                    '0 0 20px rgba(16, 185, 129, 0.8)',
                    '0 0 10px rgba(16, 185, 129, 0.5)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
              <span className="text-[#10B981] text-sm font-mono">SYSTEM READY</span>
            </div>
          </div>
          <p className="text-[#06B6D4] mt-2 text-lg">Democratizing Alzheimer's Detection</p>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Bio-Scanner */}
        <div className="flex flex-col items-center justify-center">
          <GlassCard className="p-12 flex flex-col items-center justify-center min-h-[500px]" glowColor="cyan">
            {/* Bio-Scanner Circle */}
            <div className="relative">
              {/* Outer rotating rings */}
              <motion.div
                className="absolute inset-0 w-64 h-64 rounded-full border-2 border-[#06B6D4]/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-4 w-56 h-56 rounded-full border-2 border-[#10B981]/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Center circle */}
              <motion.div
                className="relative w-64 h-64 rounded-full bg-gradient-to-br from-[#06B6D4]/20 to-[#10B981]/20 flex items-center justify-center"
                animate={{
                  boxShadow: [
                    '0 0 40px rgba(6, 182, 212, 0.4)',
                    '0 0 60px rgba(16, 185, 129, 0.4)',
                    '0 0 40px rgba(6, 182, 212, 0.4)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="text-center">
                  <div className="text-6xl mb-2">🧬</div>
                  <p className="text-[#06B6D4] font-mono text-sm">BIO-SCANNER</p>
                  <p className="text-white/60 text-xs mt-1">v3.1.4</p>
                </div>
              </motion.div>

              {/* Scanning line effect */}
              <motion.div
                className="absolute top-0 left-0 w-64 h-1 bg-gradient-to-r from-transparent via-[#06B6D4] to-transparent"
                animate={{ y: [0, 256, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ filter: 'blur(2px)' }}
              />
            </div>

            {/* Initiate Scan Button */}
            <motion.button
              onClick={onInitiateScan}
              className="mt-12 px-12 py-4 bg-gradient-to-r from-[#06B6D4] to-[#10B981] rounded-full text-white font-mono uppercase tracking-widest relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="relative z-10">INITIATE SCAN</span>
            </motion.button>
          </GlassCard>
        </div>

        {/* Right Side: Phase Cards */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl text-white mb-4">Diagnostic Pipeline</h2>
          {phases.map((phase, index) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <GlassCard 
                className="p-6" 
                glowColor={phase.locked ? 'none' : 'green'}
                locked={phase.locked}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-2xl text-[#06B6D4]">
                        {String(phase.id).padStart(2, '0')}
                      </span>
                      <h3 className="text-xl text-white">{phase.title}</h3>
                    </div>
                    <p className="text-white/60 ml-10">{phase.subtitle}</p>
                    
                    {!phase.locked && phase.id === 1 && (
                      <div className="mt-4 ml-10">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                          <span className="text-[#10B981] text-sm font-mono">AVAILABLE</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {phase.locked && (
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5">
                      <Lock className="w-6 h-6 text-white/40" />
                    </div>
                  )}
                </div>

                {/* Progress bar for active phase */}
                {!phase.locked && phase.id === 1 && (
                  <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#06B6D4] to-[#10B981]"
                      initial={{ width: '0%' }}
                      animate={{ width: '0%' }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                )}
              </GlassCard>
            </motion.div>
          ))}

          {/* Info Box */}
          <GlassCard className="p-6 mt-4" glowColor="none">
            <div className="text-white/80">
              <p className="text-sm mb-2">
                <span className="text-[#06B6D4] font-mono">INFO:</span> The TriAD system uses progressive triage to democratize Alzheimer's detection.
              </p>
              <p className="text-xs text-white/60">
                Agent 1 is zero-cost and accessible on any device. High-risk results unlock subsequent agents.
              </p>
            </div>
          </GlassCard>
        </div>
      </div>

      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
