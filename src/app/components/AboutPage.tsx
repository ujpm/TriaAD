import { motion } from 'motion/react';
import { GlassCard } from './GlassCard';
import { Code, Database, Cpu, Globe } from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
}

export function AboutPage({ onBack }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-[#0F172A] p-8 font-['Inter']">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <button
            onClick={onBack}
            className="text-[#06B6D4] hover:text-[#10B981] mb-6 transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-5xl tracking-wider text-white mb-4">
            About Tri<span className="text-[#06B6D4]">AD</span>
          </h1>
          <p className="text-xl text-white/70">
            Progressive Multi-Agent Triage for Alzheimer's Detection
          </p>
        </motion.div>

        {/* Mission */}
        <GlassCard className="p-8 mb-8" glowColor="cyan">
          <h2 className="text-2xl text-white mb-4">Our Mission</h2>
          <p className="text-white/80 mb-4">
            Alzheimer's Disease affects over 55 million people worldwide, yet diagnosis remains inaccessible to the majority due to high costs and limited infrastructure. The "Gold Standard" tests—PET scans and MRIs—cost upwards of $3,000 and are unavailable in rural or underserved areas.
          </p>
          <p className="text-white/80">
            <span className="text-[#06B6D4] font-bold">TriAD exists to change this.</span> We believe early detection should not be a privilege. By creating a progressive triage system that starts with zero-cost, accessible screening, we're democratizing cognitive health monitoring for everyone.
          </p>
        </GlassCard>

        {/* The Gap */}
        <GlassCard className="p-8 mb-8" glowColor="amber">
          <h2 className="text-2xl text-white mb-4">The Gap We're Filling</h2>
          <div className="space-y-4 text-white/80">
            <div className="flex gap-4">
              <div className="text-[#FBB020] text-2xl">•</div>
              <div>
                <span className="font-bold text-white">Accessibility Gap:</span> Millions live with undiagnosed cognitive decline because they cannot afford specialist visits or live too far from imaging centers.
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-[#FBB020] text-2xl">•</div>
              <div>
                <span className="font-bold text-white">Technology Gap:</span> Current diagnostic AI heavily focuses on MRI analysis, ignoring the 90% of the world that needs simple screening tools first.
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-[#FBB020] text-2xl">•</div>
              <div>
                <span className="font-bold text-white">Equity Gap:</span> Early detection is only available to those who can pay, creating a two-tier healthcare system.
              </div>
            </div>
          </div>
        </GlassCard>

        {/* The Solution */}
        <GlassCard className="p-8 mb-8" glowColor="green">
          <h2 className="text-2xl text-white mb-4">Our Solution: "Funnel of Truth" Architecture</h2>
          <p className="text-white/80 mb-6">
            Instead of demanding expensive data upfront, TriAD uses a progressive triage model that guides users from accessible screening to clinical validation:
          </p>
          
          <div className="space-y-6">
            <div className="border-l-4 border-[#10B981] pl-4">
              <h3 className="text-lg text-white mb-2">Step 1: Universal Access (Agent 1)</h3>
              <p className="text-white/70 text-sm">
                Everyone starts with free, smartphone-based cognitive screening using voice analysis and behavioral games. No equipment needed.
              </p>
            </div>
            
            <div className="border-l-4 border-[#06B6D4] pl-4">
              <h3 className="text-lg text-white mb-2">Step 2: Precision Filtering (Agent 2)</h3>
              <p className="text-white/70 text-sm">
                At-risk users can add genetic data for deeper risk stratification, using our explainable knowledge base that cites medical literature.
              </p>
            </div>
            
            <div className="border-l-4 border-[#FBB020] pl-4">
              <h3 className="text-lg text-white mb-2">Step 3: Clinical Confirmation (Agent 3)</h3>
              <p className="text-white/70 text-sm">
                Only high-risk cases proceed to MRI analysis, optimizing healthcare resources and patient costs.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Tech Stack */}
        <GlassCard className="p-8 mb-8" glowColor="none">
          <h2 className="text-2xl text-white mb-6">Technology Stack</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Code className="w-6 h-6 text-[#06B6D4]" />
                <h3 className="text-lg text-white">Frontend</h3>
              </div>
              <ul className="text-white/70 text-sm space-y-2 ml-9">
                <li>• React (Vite) for fast, modern UI</li>
                <li>• Tailwind CSS with Glassmorphism design</li>
                <li>• Motion for smooth animations</li>
                <li>• TypeScript for type safety</li>
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <Cpu className="w-6 h-6 text-[#10B981]" />
                <h3 className="text-lg text-white">AI/ML</h3>
              </div>
              <ul className="text-white/70 text-sm space-y-2 ml-9">
                <li>• PyTorch for MRI analysis</li>
                <li>• Scikit-Learn for risk scoring</li>
                <li>• NLTK for voice processing</li>
                <li>• ResNet/CNN architectures</li>
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <Database className="w-6 h-6 text-[#FBB020]" />
                <h3 className="text-lg text-white">Data Sources</h3>
              </div>
              <ul className="text-white/70 text-sm space-y-2 ml-9">
                <li>• ADVP.hg38 (Alzheimer's Variant Portal)</li>
                <li>• Bio-Hermes digital biomarkers</li>
                <li>• ADNI MRI datasets</li>
                <li>• Kaggle clinical data</li>
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-6 h-6 text-[#06B6D4]" />
                <h3 className="text-lg text-white">Backend</h3>
              </div>
              <ul className="text-white/70 text-sm space-y-2 ml-9">
                <li>• Python (FastAPI/Flask)</li>
                <li>• Pandas for data processing</li>
                <li>• Knowledge base lookup engine</li>
                <li>• RESTful API architecture</li>
              </ul>
            </div>
          </div>
        </GlassCard>

        {/* Explainability */}
        <GlassCard className="p-8 mb-8" glowColor="cyan">
          <h2 className="text-2xl text-white mb-4">Why "Glass-Box" Genetics Matters</h2>
          <p className="text-white/80 mb-4">
            Unlike black-box AI models that provide risk scores without explanation, our Agent 2 uses a <span className="text-[#06B6D4] font-bold">deterministic knowledge base</span>.
          </p>
          <p className="text-white/80 mb-4">
            When we say "Your APOE-ε4 variant increases risk," we cite the exact gene (rs429358), the medical literature, and the mechanism. This builds trust and enables doctors to validate our findings.
          </p>
          <div className="p-4 bg-white/5 rounded-lg border-l-4 border-[#06B6D4]">
            <p className="text-white/90 text-sm italic">
              "Transparency in AI healthcare isn't optional—it's essential for patient safety and clinical adoption."
            </p>
          </div>
        </GlassCard>

        {/* Impact Vision */}
        <GlassCard className="p-8 mb-8" glowColor="green">
          <h2 className="text-2xl text-white mb-4">Our Vision for Impact</h2>
          <p className="text-white/80 mb-6">
            By 2030, we envision TriAD becoming the first-line screening tool used by:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-3xl mb-2">🏥</div>
              <div className="text-white text-sm">Primary Care Clinics</div>
              <div className="text-white/60 text-xs mt-1">Free annual screenings</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-3xl mb-2">🌍</div>
              <div className="text-white text-sm">Rural Communities</div>
              <div className="text-white/60 text-xs mt-1">Smartphone-based access</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-3xl mb-2">👴</div>
              <div className="text-white text-sm">At-Home Monitoring</div>
              <div className="text-white/60 text-xs mt-1">Early symptom tracking</div>
            </div>
          </div>
        </GlassCard>

        {/* Disclaimer */}
        <div className="p-6 bg-[#FBB020]/10 border-2 border-[#FBB020] rounded-lg mb-8">
          <p className="text-white/90 text-sm">
            <span className="text-[#FBB020] font-mono font-bold">⚠️ IMPORTANT:</span> TriAD is a research tool and screening aid, not a diagnostic medical device. 
            It is not FDA-approved and should not be used as a substitute for professional medical advice, diagnosis, or treatment. 
            Always seek the advice of your physician or qualified healthcare provider with any questions regarding a medical condition.
          </p>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={onBack}
            className="px-8 py-3 bg-gradient-to-r from-[#06B6D4] to-[#10B981] rounded-full text-white font-mono uppercase tracking-wider hover:scale-105 transition-transform"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
