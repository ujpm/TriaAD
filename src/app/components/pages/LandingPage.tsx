import { motion } from 'motion/react';
import { GlassCard } from '../GlassCard';
import { Brain, Dna, Scan, ChevronRight, Shield, Globe, TrendingUp } from 'lucide-react';
import { Footer } from '../Footer';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl text-white mb-6">
              Tri<span className="text-[#06B6D4]">AD</span>
            </h1>
            <p className="text-2xl md:text-3xl text-[#06B6D4] mb-8 font-mono">
              Democratizing Alzheimer's Detection
            </p>
            <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto">
              A Progressive Multi-Agent Triage System that makes early Alzheimer's detection 
              accessible, affordable, and accurate for everyone.
            </p>
            
            <motion.button
              onClick={() => onNavigate('app')}
              className="px-12 py-4 bg-gradient-to-r from-[#06B6D4] to-[#10B981] rounded-full text-white font-mono uppercase tracking-wider"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Free Screening <ChevronRight className="inline w-5 h-5 ml-2" />
            </motion.button>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-4xl font-mono text-[#10B981] mb-2">$0</div>
              <div className="text-white/60 text-sm">Agent 1 Cost</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-4xl font-mono text-[#06B6D4] mb-2">3 Agents</div>
              <div className="text-white/60 text-sm">Progressive Triage</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-4xl font-mono text-[#FBB020] mb-2">100%</div>
              <div className="text-white/60 text-sm">Explainable AI</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 px-6 bg-[#0A0F1E]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl text-white mb-12 text-center">The Problem</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard className="p-8" glowColor="none">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl text-white mb-3">Expensive</h3>
              <p className="text-white/60 text-sm">
                Gold standard tests (PET/MRI) cost $3,000+, making them inaccessible to most populations.
              </p>
            </GlassCard>
            <GlassCard className="p-8" glowColor="none">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-xl text-white mb-3">Inaccessible</h3>
              <p className="text-white/60 text-sm">
                Rural and low-income communities lack access to specialists and diagnostic facilities.
              </p>
            </GlassCard>
            <GlassCard className="p-8" glowColor="none">
              <div className="text-5xl mb-4">⏰</div>
              <h3 className="text-xl text-white mb-3">Too Late</h3>
              <p className="text-white/60 text-sm">
                Millions live with undiagnosed cognitive decline because early screening isn't available.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* The Solution - 3 Agents */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl text-white mb-4 text-center">The TriAD Solution</h2>
          <p className="text-center text-white/60 mb-16 max-w-2xl mx-auto">
            Progressive triage powered by three specialized AI agents. Start with zero-cost screening, 
            unlock precision diagnostics only when needed.
          </p>

          <div className="space-y-8">
            {/* Agent 1 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-8" glowColor="cyan">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-[#06B6D4]/20 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-8 h-8 text-[#06B6D4]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl text-white">Agent 1: The Screener</h3>
                      <span className="px-3 py-1 bg-[#10B981]/20 text-[#10B981] text-xs font-mono rounded-full">
                        ZERO-COST
                      </span>
                    </div>
                    <p className="text-white/80 mb-4">
                      Accessible digital phenotyping using voice biomarkers and cognitive reflex games.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-[#06B6D4] font-mono">Input:</span>
                        <span className="text-white/60 ml-2">Voice analysis + Cognitive games</span>
                      </div>
                      <div>
                        <span className="text-[#06B6D4] font-mono">Output:</span>
                        <span className="text-white/60 ml-2">Cognitive Health Score</span>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Agent 2 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard className="p-8" glowColor="green">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-[#10B981]/20 flex items-center justify-center flex-shrink-0">
                    <Dna className="w-8 h-8 text-[#10B981]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl text-white">Agent 2: The Geneticist</h3>
                      <span className="px-3 py-1 bg-[#FBB020]/20 text-[#FBB020] text-xs font-mono rounded-full">
                        OPTIONAL
                      </span>
                    </div>
                    <p className="text-white/80 mb-4">
                      Biological risk stratification with explainable genetic analysis.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-[#10B981] font-mono">Input:</span>
                        <span className="text-white/60 ml-2">Genetic markers (APOE, VCF)</span>
                      </div>
                      <div>
                        <span className="text-[#10B981] font-mono">Output:</span>
                        <span className="text-white/60 ml-2">Genetic Liability Profile</span>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Agent 3 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <GlassCard className="p-8" glowColor="amber">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-[#FBB020]/20 flex items-center justify-center flex-shrink-0">
                    <Scan className="w-8 h-8 text-[#FBB020]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl text-white">Agent 3: The Specialist</h3>
                      <span className="px-3 py-1 bg-[#FBB020]/20 text-[#FBB020] text-xs font-mono rounded-full">
                        OPTIONAL
                      </span>
                    </div>
                    <p className="text-white/80 mb-4">
                      Clinical validation through structural brain imaging analysis.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-[#FBB020] font-mono">Input:</span>
                        <span className="text-white/60 ml-2">MRI Scans (DICOM/JPEG)</span>
                      </div>
                      <div>
                        <span className="text-[#FBB020] font-mono">Output:</span>
                        <span className="text-white/60 ml-2">Radiological Classification</span>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Innovations */}
      <section className="py-20 px-6 bg-[#0A0F1E]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl text-white mb-12 text-center">Key Innovations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard className="p-8 text-center" glowColor="cyan">
              <Globe className="w-12 h-12 text-[#06B6D4] mx-auto mb-4" />
              <h3 className="text-xl text-white mb-3">Health Equity First</h3>
              <p className="text-white/60 text-sm">
                We don't start with the MRI. We start with the voice. Accessible to rural communities and developing nations.
              </p>
            </GlassCard>
            <GlassCard className="p-8 text-center" glowColor="green">
              <Shield className="w-12 h-12 text-[#10B981] mx-auto mb-4" />
              <h3 className="text-xl text-white mb-3">Explainable AI</h3>
              <p className="text-white/60 text-sm">
                Glass-box knowledge engine provides medical citations for genetic risk, avoiding AI hallucinations.
              </p>
            </GlassCard>
            <GlassCard className="p-8 text-center" glowColor="amber">
              <TrendingUp className="w-12 h-12 text-[#FBB020] mx-auto mb-4" />
              <h3 className="text-xl text-white mb-3">Resource Optimization</h3>
              <p className="text-white/60 text-sm">
                Progressive triage prevents unnecessary expensive tests, saving healthcare systems money.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <GlassCard className="p-12" glowColor="cyan">
            <h2 className="text-3xl text-white mb-6">
              Ready to Start Your Cognitive Health Journey?
            </h2>
            <p className="text-white/60 mb-8 max-w-2xl mx-auto">
              Begin with our free, accessible Agent 1 screening. Works on any device, anywhere.
            </p>
            <motion.button
              onClick={() => onNavigate('app')}
              className="px-12 py-4 bg-gradient-to-r from-[#06B6D4] to-[#10B981] rounded-full text-white font-mono uppercase tracking-wider"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Launch TriAD System
            </motion.button>
            <p className="text-white/40 text-xs mt-6 font-mono">
              ⚠️ For screening purposes only. Not a substitute for professional medical diagnosis.
            </p>
          </GlassCard>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
