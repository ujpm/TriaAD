import { motion } from 'motion/react';
import { Brain, Shield, Stethoscope, ChevronRight, Users, Zap, Lock } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface LandingPageProps {
  onGetStarted: () => void;
  onNavigate: (page: string) => void;
}

export function LandingPage({ onGetStarted, onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#0F172A] font-['Inter']">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-96 h-96 bg-[#06B6D4]/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 10, repeat: Infinity }}
            style={{ top: '10%', left: '10%' }}
          />
          <motion.div
            className="absolute w-96 h-96 bg-[#10B981]/20 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 12, repeat: Infinity }}
            style={{ bottom: '10%', right: '10%' }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">
          {/* Logo & Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-7xl tracking-wider text-white mb-4">
              Tri<span className="text-[#06B6D4]">AD</span>
            </h1>
            <p className="text-3xl text-[#06B6D4] mb-4">Tri-Agent Diagnosis</p>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Democratizing Alzheimer's Detection: A Progressive Multi-Agent Triage System
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-20"
          >
            <button
              onClick={onGetStarted}
              className="px-12 py-5 bg-gradient-to-r from-[#06B6D4] to-[#10B981] rounded-full text-white font-mono uppercase tracking-widest text-lg hover:scale-105 transition-transform inline-flex items-center gap-3"
            >
              Start Free Screening
              <ChevronRight className="w-6 h-6" />
            </button>
            <p className="text-white/60 text-sm mt-4">
              No signup required • 100% Free • Works on any device
            </p>
          </motion.div>

          {/* The Problem */}
          <GlassCard className="p-10 mb-16" glowColor="amber">
            <h2 className="text-3xl text-white mb-6 text-center">The Problem</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl font-mono text-[#FBB020] mb-2">$3,000+</div>
                <p className="text-white/80 text-sm">
                  Cost of "Gold Standard" tests (PET/MRI) - unaffordable for millions
                </p>
              </div>
              <div>
                <div className="text-4xl font-mono text-[#FBB020] mb-2">90%</div>
                <p className="text-white/80 text-sm">
                  Of the world lacks access to expensive diagnostic imaging
                </p>
              </div>
              <div>
                <div className="text-4xl font-mono text-[#FBB020] mb-2">Too Late</div>
                <p className="text-white/80 text-sm">
                  Diagnosis often occurs years after symptoms begin
                </p>
              </div>
            </div>
          </GlassCard>

          {/* The 3 Agents */}
          <div className="mb-16">
            <h2 className="text-4xl text-white mb-12 text-center">
              How It Works: <span className="text-[#06B6D4]">3-Agent Architecture</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Agent 1 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <GlassCard className="p-8 h-full" glowColor="green">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#10B981]/20 flex items-center justify-center">
                      <Brain className="w-6 h-6 text-[#10B981]" />
                    </div>
                    <div>
                      <div className="text-2xl font-mono text-[#06B6D4]">01</div>
                      <h3 className="text-xl text-white">The Screener</h3>
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-[#10B981]/20 text-[#10B981] rounded-full text-xs font-mono">
                      ZERO-COST • COMPULSORY
                    </span>
                  </div>
                  <p className="text-white/80 text-sm mb-4">
                    Voice biomarkers + cognitive games analyzing reaction time, vocabulary richness, and pattern recognition.
                  </p>
                  <div className="text-xs text-white/60 font-mono">
                    <div>📱 Works on any smartphone</div>
                    <div>🌍 Accessible anywhere</div>
                    <div>⚡ 5-minute test</div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Agent 2 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <GlassCard className="p-8 h-full" glowColor="cyan">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#06B6D4]/20 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-[#06B6D4]" />
                    </div>
                    <div>
                      <div className="text-2xl font-mono text-[#06B6D4]">02</div>
                      <h3 className="text-xl text-white">The Geneticist</h3>
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-[#06B6D4]/20 text-[#06B6D4] rounded-full text-xs font-mono">
                      OPTIONAL • IF AT-RISK
                    </span>
                  </div>
                  <p className="text-white/80 text-sm mb-4">
                    Glass-box genetic analysis using ADVP knowledge base. Explains which variants (e.g., APOE-ε4) drive risk.
                  </p>
                  <div className="text-xs text-white/60 font-mono">
                    <div>🧬 Upload genetic data</div>
                    <div>📊 Explainable results</div>
                    <div>🔬 Clinical citations</div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Agent 3 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <GlassCard className="p-8 h-full" glowColor="amber">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#FBB020]/20 flex items-center justify-center">
                      <Stethoscope className="w-6 h-6 text-[#FBB020]" />
                    </div>
                    <div>
                      <div className="text-2xl font-mono text-[#06B6D4]">03</div>
                      <h3 className="text-xl text-white">The Specialist</h3>
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-[#FBB020]/20 text-[#FBB020] rounded-full text-xs font-mono">
                      OPTIONAL • HIGH-RISK
                    </span>
                  </div>
                  <p className="text-white/80 text-sm mb-4">
                    Deep learning MRI analysis detecting cortical atrophy and structural brain changes.
                  </p>
                  <div className="text-xs text-white/60 font-mono">
                    <div>🧠 MRI scan analysis</div>
                    <div>🎯 Clinical validation</div>
                    <div>📋 Comprehensive report</div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>

          {/* Key Innovations */}
          <div className="mb-16">
            <h2 className="text-3xl text-white mb-8 text-center">Key Innovations</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <GlassCard className="p-6" glowColor="none">
                <Users className="w-10 h-10 text-[#10B981] mb-4" />
                <h3 className="text-lg text-white mb-2">Health Equity First</h3>
                <p className="text-white/70 text-sm">
                  We start with voice, not MRI. Making early detection accessible to rural communities and developing nations.
                </p>
              </GlassCard>

              <GlassCard className="p-6" glowColor="none">
                <Zap className="w-10 h-10 text-[#06B6D4] mb-4" />
                <h3 className="text-lg text-white mb-2">Explainable Genetics</h3>
                <p className="text-white/70 text-sm">
                  Deterministic knowledge base with medical citations. No AI hallucinations.
                </p>
              </GlassCard>

              <GlassCard className="p-6" glowColor="none">
                <Lock className="w-10 h-10 text-[#FBB020] mb-4" />
                <h3 className="text-lg text-white mb-2">Resource Optimization</h3>
                <p className="text-white/70 text-sm">
                  Filter patients early to prevent unnecessary expensive tests for low-risk individuals.
                </p>
              </GlassCard>
            </div>
          </div>

          {/* Impact */}
          <GlassCard className="p-10 text-center" glowColor="green">
            <h2 className="text-3xl text-white mb-4">Our Impact</h2>
            <p className="text-white/80 text-lg max-w-3xl mx-auto mb-6">
              TriAD shifts the paradigm from <span className="text-[#FBB020]">"Reactive Diagnosis"</span> (waiting for symptoms) 
              to <span className="text-[#10B981]">"Proactive Triage"</span>. By making the first step free and accessible, 
              we empower users to own their cognitive health data before it's too late.
            </p>
            <button
              onClick={onGetStarted}
              className="px-10 py-4 bg-gradient-to-r from-[#06B6D4] to-[#10B981] rounded-full text-white font-mono uppercase tracking-wider hover:scale-105 transition-transform"
            >
              Begin Your Journey
            </button>
          </GlassCard>

          {/* Disclaimer */}
          <div className="mt-12 p-6 bg-[#FBB020]/10 border-2 border-[#FBB020] rounded-lg">
            <p className="text-white/90 text-sm text-center">
              <span className="text-[#FBB020] font-mono font-bold">⚠️ DISCLAIMER:</span> TriAD is a screening tool, not a diagnostic device. 
              This is not medical advice. Always consult with qualified healthcare professionals for diagnosis and treatment. 
              Results should not replace professional medical evaluation.{' '}
              <button onClick={() => onNavigate('privacy')} className="text-[#06B6D4] underline">Privacy Policy</button>
              {' • '}
              <button onClick={() => onNavigate('terms')} className="text-[#06B6D4] underline">Terms & Conditions</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
