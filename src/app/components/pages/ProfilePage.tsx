import { motion } from 'motion/react';
import { GlassCard } from '../GlassCard';
import { Footer } from '../Footer';
import { Brain, Dna, Scan, User, Shield, ChevronRight } from 'lucide-react';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <h1 className="text-5xl text-white mb-2">Your Profile</h1>
              <p className="text-white/60">
                Demo workspace for screening history and account preferences.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => onNavigate('app')}
                className="px-6 py-3 bg-gradient-to-r from-[#06B6D4] to-[#10B981] rounded-full text-white font-mono uppercase tracking-wider"
              >
                Start Screening <ChevronRight className="inline w-5 h-5 ml-2" />
              </button>
              <button
                onClick={() => onNavigate('login')}
                className="px-6 py-3 bg-white/10 rounded-full text-white font-mono uppercase tracking-wider hover:bg-white/20 transition-colors border-2 border-white/20"
              >
                Switch User
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <GlassCard className="p-8" glowColor="cyan">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-[#06B6D4]/20 flex items-center justify-center">
                  <User className="w-7 h-7 text-[#06B6D4]" />
                </div>
                <div>
                  <div className="text-white text-xl">Demo User</div>
                  <div className="text-white/60 text-sm">demo@triad.local</div>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-white/70">
                  <span>Account type</span>
                  <span className="text-white">Demo</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Data storage</span>
                  <span className="text-white">Local only</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Consent</span>
                  <span className="text-white">Not collected</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white/5 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#10B981] mt-0.5" />
                  <p className="text-white/70 text-xs">
                    For the demo, data is not persisted across refresh. In production this would integrate secure auth, encrypted storage, and consent management.
                  </p>
                </div>
              </div>
            </GlassCard>

            <div className="lg:col-span-2 space-y-6">
              <GlassCard className="p-8" glowColor="green">
                <h2 className="text-2xl text-white mb-6">Latest Screening Snapshot</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Brain className="w-5 h-5 text-[#06B6D4]" />
                      <span className="text-white/80 text-sm">Agent 1</span>
                    </div>
                    <div className="text-white text-lg">Cognitive</div>
                    <div className="text-white/60 text-xs">No run yet</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Dna className="w-5 h-5 text-[#10B981]" />
                      <span className="text-white/80 text-sm">Agent 2</span>
                    </div>
                    <div className="text-white text-lg">Genetic</div>
                    <div className="text-white/60 text-xs">No run yet</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Scan className="w-5 h-5 text-[#FBB020]" />
                      <span className="text-white/80 text-sm">Agent 3</span>
                    </div>
                    <div className="text-white text-lg">Structural</div>
                    <div className="text-white/60 text-xs">No run yet</div>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => onNavigate('app')}
                    className="px-8 py-3 bg-gradient-to-r from-[#10B981] to-[#06B6D4] rounded-full text-white font-mono uppercase tracking-wider hover:opacity-90 transition-opacity"
                  >
                    Run a new screening
                  </button>
                </div>
              </GlassCard>

              <GlassCard className="p-8" glowColor="amber">
                <h2 className="text-2xl text-white mb-4">Preferences (Demo)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="text-white/80 text-sm mb-1">Report export</div>
                    <div className="text-white">PDF (planned)</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="text-white/80 text-sm mb-1">Notifications</div>
                    <div className="text-white">Email reminders (planned)</div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
