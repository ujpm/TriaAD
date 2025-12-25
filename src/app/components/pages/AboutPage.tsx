import { GlassCard } from '../GlassCard';
import { Footer } from '../Footer';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl text-white mb-6">About TriAD</h1>
          <p className="text-xl text-[#06B6D4] mb-12 font-mono">
            Progressive Multi-Agent Diagnosis System
          </p>

          {/* Mission */}
          <GlassCard className="p-8 mb-8" glowColor="cyan">
            <h2 className="text-2xl text-white mb-4">Our Mission</h2>
            <p className="text-white/80 mb-4">
              TriAD shifts the paradigm from "Reactive Diagnosis" (waiting for symptoms) to "Proactive Triage." 
              By making the first step free and accessible, we empower users to own their cognitive health data 
              before it's too late.
            </p>
            <p className="text-white/80">
              We believe early detection of Alzheimer's Disease should not be a privilege reserved for those 
              who can afford expensive scans. Everyone deserves access to cognitive health screening.
            </p>
          </GlassCard>

          {/* The Gap */}
          <GlassCard className="p-8 mb-8" glowColor="green">
            <h2 className="text-2xl text-white mb-4">The Gap We're Filling</h2>
            <div className="space-y-4 text-white/80">
              <p>
                <span className="text-[#10B981] font-mono">The Problem:</span> Alzheimer's Disease is often 
                diagnosed too late because the "Gold Standard" tests (PET Scans/MRI) are expensive ($3,000+), 
                invasive, and inaccessible to rural or low-income populations.
              </p>
              <p>
                <span className="text-[#10B981] font-mono">The Gap:</span> Millions of people live with 
                undiagnosed cognitive decline because they cannot afford a specialist visit.
              </p>
              <p>
                <span className="text-[#10B981] font-mono">The Inequity:</span> Current diagnostic AI focuses 
                heavily on MRI scans, ignoring the 90% of the world that needs a simple, zero-cost screening 
                tool first.
              </p>
            </div>
          </GlassCard>

          {/* Tech Stack */}
          <GlassCard className="p-8 mb-8" glowColor="amber">
            <h2 className="text-2xl text-white mb-4">Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-[#FBB020] font-mono text-sm mb-3">FRONTEND</h3>
                <ul className="text-white/60 text-sm space-y-2">
                  <li>• React (Vite)</li>
                  <li>• Tailwind CSS</li>
                  <li>• Motion/React (Animations)</li>
                  <li>• Glassmorphism UI Design</li>
                </ul>
              </div>
              <div>
                <h3 className="text-[#FBB020] font-mono text-sm mb-3">BACKEND & AI</h3>
                <ul className="text-white/60 text-sm space-y-2">
                  <li>• Python (FastAPI/Flask)</li>
                  <li>• Scikit-Learn (Risk Scoring)</li>
                  <li>• PyTorch (MRI Analysis)</li>
                  <li>• NLTK (Voice Processing)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-[#FBB020] font-mono text-sm mb-3">DATASETS</h3>
                <ul className="text-white/60 text-sm space-y-2">
                  <li>• ADVP (Alzheimer's Variant Portal)</li>
                  <li>• Bio-Hermes (Digital Biomarkers)</li>
                  <li>• ADNI & Kaggle MRI Datasets</li>
                </ul>
              </div>
              <div>
                <h3 className="text-[#FBB020] font-mono text-sm mb-3">KEY FEATURES</h3>
                <ul className="text-white/60 text-sm space-y-2">
                  <li>• Explainable AI (Glass-Box)</li>
                  <li>• Knowledge Base Lookup</li>
                  <li>• Progressive Triage System</li>
                </ul>
              </div>
            </div>
          </GlassCard>

          {/* Impact */}
          <GlassCard className="p-8 mb-8" glowColor="cyan">
            <h2 className="text-2xl text-white mb-4">Our Impact</h2>
            <p className="text-white/80 mb-4">
              By implementing a "Funnel of Truth" architecture, TriAD ensures that:
            </p>
            <ul className="text-white/80 space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-[#10B981] mt-1">✓</span>
                <span>Everyone can access Phase 1 screening for free, on any device</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#10B981] mt-1">✓</span>
                <span>Healthcare systems save money by preventing unnecessary expensive tests</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#10B981] mt-1">✓</span>
                <span>High-risk individuals are identified early for intervention</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#10B981] mt-1">✓</span>
                <span>Genetic and structural analyses provide explainable, actionable insights</span>
              </li>
            </ul>
          </GlassCard>

          {/* Disclaimer */}
          <div className="p-6 bg-[#FBB020]/10 border-2 border-[#FBB020] rounded-lg">
            <p className="text-white/90 text-sm">
              <span className="text-[#FBB020] font-mono font-bold">IMPORTANT:</span> TriAD is a screening 
              and risk assessment tool, not a diagnostic medical device. All results should be discussed with 
              a qualified healthcare professional. This system does not replace clinical judgment or 
              professional medical diagnosis.
            </p>
          </div>
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
