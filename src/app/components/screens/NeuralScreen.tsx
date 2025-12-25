import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../GlassCard';
import { Mic, Grid3x3, ArrowLeft } from 'lucide-react';

interface NeuralScreenProps {
  onBack: () => void;
  onComplete: () => void;
}

export function NeuralScreen({ onBack, onComplete }: NeuralScreenProps) {
  const [mode, setMode] = useState<'voice' | 'game'>('voice');
  const [progress, setProgress] = useState(0);
  const [selectedTiles, setSelectedTiles] = useState<number[]>([]);
  const [isListening, setIsListening] = useState(false);

  // Simulate progress
  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prev => Math.min(prev + 2, 100));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  const toggleTile = (index: number) => {
    setSelectedTiles(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleStartVoice = () => {
    setIsListening(true);
    setTimeout(() => setIsListening(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] p-8 font-['Inter']">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[#06B6D4] hover:text-[#10B981] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>
        <div>
          <h1 className="text-3xl text-white">
            Phase 1: <span className="text-[#06B6D4]">Neural Analysis</span>
          </h1>
          <p className="text-white/60 text-sm font-mono mt-1">AGENT_01 // COGNITIVE_SCREENER</p>
        </div>
      </header>

      {/* Progress Bar */}
      <GlassCard className="p-4 mb-8" glowColor="cyan">
        <div className="flex items-center gap-4">
          <span className="text-white font-mono text-sm min-w-[80px]">PROGRESS</span>
          <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#06B6D4] to-[#10B981]"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-[#06B6D4] font-mono text-sm min-w-[60px]">
            {progress}%
          </span>
        </div>
        
        {/* Progress Bar Visualization */}
        <div className="mt-2 flex gap-1">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded ${
                i < Math.floor(progress / 5)
                  ? 'bg-[#06B6D4]'
                  : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      </GlassCard>

      {/* Mode Selector */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setMode('voice')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
            mode === 'voice'
              ? 'bg-[#06B6D4] text-white'
              : 'bg-white/10 text-white/60 hover:bg-white/20'
          }`}
        >
          <Mic className="w-5 h-5" />
          <span>Voice Mode</span>
        </button>
        <button
          onClick={() => setMode('game')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
            mode === 'game'
              ? 'bg-[#06B6D4] text-white'
              : 'bg-white/10 text-white/60 hover:bg-white/20'
          }`}
        >
          <Grid3x3 className="w-5 h-5" />
          <span>Game Mode</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto">
        {mode === 'voice' ? (
          <GlassCard className="p-12" glowColor={isListening ? 'green' : 'cyan'}>
            <div className="text-center mb-8">
              <h2 className="text-2xl text-white mb-2">Voice Biomarker Analysis</h2>
              <p className="text-white/60">Analyze Speech Pattern</p>
            </div>

            {/* Waveform Visualization */}
            <div className="flex items-center justify-center gap-1 h-48 mb-8">
              {Array.from({ length: 50 }).map((_, i) => {
                const height = isListening
                  ? Math.random() * 100 + 50
                  : 20;
                const color = isListening
                  ? i % 3 === 0 ? '#06B6D4' : i % 3 === 1 ? '#10B981' : '#FBB020'
                  : '#06B6D4';
                
                return (
                  <motion.div
                    key={i}
                    className="w-2 rounded-full"
                    style={{ backgroundColor: color }}
                    animate={{
                      height: isListening ? [20, height, 20] : 20
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: isListening ? Infinity : 0,
                      delay: i * 0.02
                    }}
                  />
                );
              })}
            </div>

            {/* Controls */}
            <div className="text-center">
              <motion.button
                onClick={handleStartVoice}
                className="px-8 py-4 bg-gradient-to-r from-[#06B6D4] to-[#10B981] rounded-full text-white font-mono uppercase tracking-wider"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isListening}
              >
                {isListening ? 'ANALYZING...' : 'START VOICE TEST'}
              </motion.button>
              
              {isListening && (
                <motion.p
                  className="text-[#10B981] mt-4 font-mono text-sm"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🎤 Recording voice sample...
                </motion.p>
              )}
            </div>

            {/* Instructions */}
            <div className="mt-8 p-4 bg-white/5 rounded-lg">
              <p className="text-white/80 text-sm font-mono">
                <span className="text-[#06B6D4]">INSTRUCTION:</span> Please describe your morning routine. 
                We analyze vocabulary richness, pause patterns, and semantic coherence.
              </p>
            </div>
          </GlassCard>
        ) : (
          <GlassCard className="p-12" glowColor="cyan">
            <div className="text-center mb-8">
              <h2 className="text-2xl text-white mb-2">Cognitive Reflex Test</h2>
              <p className="text-white/60">Select tiles matching the pattern</p>
            </div>

            {/* Game Grid */}
            <div className="grid grid-cols-6 gap-3 max-w-md mx-auto mb-8">
              {Array.from({ length: 36 }).map((_, i) => {
                const isSelected = selectedTiles.includes(i);
                const isTarget = [5, 12, 19, 26].includes(i); // Diagonal pattern
                
                return (
                  <motion.button
                    key={i}
                    onClick={() => toggleTile(i)}
                    className={`aspect-square rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'bg-[#10B981] border-[#10B981] shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                        : 'bg-white/5 border-white/20 hover:border-[#06B6D4]'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-2xl"
                      >
                        ✓
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Game Instructions */}
            <div className="p-4 bg-white/5 rounded-lg mb-6">
              <p className="text-white/80 text-sm font-mono">
                <span className="text-[#06B6D4]">TASK:</span> Select all tiles that form a diagonal line from top-right to bottom-left. 
                This tests pattern recognition and spatial reasoning.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-2xl font-mono text-[#06B6D4]">{selectedTiles.length}</div>
                <div className="text-xs text-white/60 mt-1">SELECTED</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-2xl font-mono text-[#10B981]">
                  {Math.floor(Math.random() * 500 + 800)}ms
                </div>
                <div className="text-xs text-white/60 mt-1">AVG REACTION</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-2xl font-mono text-[#FBB020]">
                  {Math.floor(progress / 10)}
                </div>
                <div className="text-xs text-white/60 mt-1">ATTEMPTS</div>
              </div>
            </div>
          </GlassCard>
        )}
      </div>

      {/* Complete Button */}
      {progress >= 100 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-8"
        >
          <button
            onClick={onComplete}
            className="px-12 py-4 bg-gradient-to-r from-[#10B981] to-[#06B6D4] rounded-full text-white font-mono uppercase tracking-wider"
          >
            COMPLETE ANALYSIS →
          </button>
        </motion.div>
      )}
    </div>
  );
}
