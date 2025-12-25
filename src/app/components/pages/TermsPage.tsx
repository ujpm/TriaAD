import { GlassCard } from '../GlassCard';
import { Footer } from '../Footer';

interface TermsPageProps {
  onNavigate: (page: string) => void;
}

export function TermsPage({ onNavigate }: TermsPageProps) {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl text-white mb-6">Terms & Conditions</h1>
          <p className="text-white/60 mb-12">Last Updated: December 25, 2025</p>

          <div className="space-y-6">
            <div className="p-6 bg-[#DC2626]/10 border-2 border-[#DC2626] rounded-lg mb-8">
              <h2 className="text-xl text-[#DC2626] font-mono mb-3">⚠️ CRITICAL DISCLAIMER</h2>
              <p className="text-white/90 text-sm mb-3">
                <strong>TriAD IS NOT A DIAGNOSTIC MEDICAL DEVICE.</strong> It is a screening and risk 
                assessment tool designed for educational and informational purposes only.
              </p>
              <ul className="text-white/80 text-sm space-y-2">
                <li className="flex items-start gap-3">
                  <span className="text-[#DC2626]">•</span>
                  <span>Results do NOT constitute a medical diagnosis</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#DC2626]">•</span>
                  <span>Do NOT use TriAD as a substitute for professional medical advice</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#DC2626]">•</span>
                  <span>Always consult a qualified healthcare provider for diagnosis and treatment</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#DC2626]">•</span>
                  <span>In case of medical emergency, call your local emergency services immediately</span>
                </li>
              </ul>
            </div>

            <GlassCard className="p-8" glowColor="cyan">
              <h2 className="text-2xl text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-white/80 text-sm">
                By accessing and using TriAD, you acknowledge that you have read, understood, and agree to be 
                bound by these Terms & Conditions. If you do not agree with these terms, please do not use 
                this service.
              </p>
            </GlassCard>

            <GlassCard className="p-8" glowColor="green">
              <h2 className="text-2xl text-white mb-4">2. Intended Use</h2>
              <p className="text-white/80 mb-4 text-sm">
                TriAD is intended for:
              </p>
              <ul className="text-white/80 space-y-2 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-[#10B981]">✓</span>
                  <span>Preliminary cognitive health screening</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#10B981]">✓</span>
                  <span>Educational awareness about Alzheimer's risk factors</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#10B981]">✓</span>
                  <span>Encouraging users to seek professional evaluation if indicated</span>
                </li>
              </ul>
              <p className="text-white/80 mt-4 text-sm">
                <strong>NOT intended for:</strong> Clinical diagnosis, treatment planning, or medical 
                decision-making without professional consultation.
              </p>
            </GlassCard>

            <GlassCard className="p-8" glowColor="amber">
              <h2 className="text-2xl text-white mb-4">3. User Responsibilities</h2>
              <p className="text-white/80 mb-4 text-sm">
                By using TriAD, you agree to:
              </p>
              <ul className="text-white/80 space-y-2 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-[#FBB020]">•</span>
                  <span>Provide accurate and truthful information</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FBB020]">•</span>
                  <span>Be at least 18 years old or have parental/guardian consent</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FBB020]">•</span>
                  <span>Not use the service for any illegal or unauthorized purpose</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FBB020]">•</span>
                  <span>Understand that results are probabilistic and not definitive</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FBB020]">•</span>
                  <span>Consult healthcare professionals for medical decisions</span>
                </li>
              </ul>
            </GlassCard>

            <GlassCard className="p-8" glowColor="none">
              <h2 className="text-2xl text-white mb-4">4. Limitation of Liability</h2>
              <p className="text-white/80 mb-4 text-sm">
                <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</strong>
              </p>
              <ul className="text-white/80 space-y-2 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-[#06B6D4]">•</span>
                  <span>TriAD provides the service "AS IS" without warranties of any kind</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#06B6D4]">•</span>
                  <span>We are not liable for any medical decisions made based on TriAD results</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#06B6D4]">•</span>
                  <span>We are not responsible for false positives, false negatives, or inaccurate results</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#06B6D4]">•</span>
                  <span>We are not liable for any damages arising from use of this service</span>
                </li>
              </ul>
            </GlassCard>

            <GlassCard className="p-8" glowColor="none">
              <h2 className="text-2xl text-white mb-4">5. No Doctor-Patient Relationship</h2>
              <p className="text-white/80 text-sm">
                Use of TriAD does NOT create a doctor-patient relationship. The AI agents are computational 
                tools, not licensed medical professionals. All recommendations should be validated by 
                qualified healthcare providers.
              </p>
            </GlassCard>

            <GlassCard className="p-8" glowColor="none">
              <h2 className="text-2xl text-white mb-4">6. Data Collection & Privacy</h2>
              <p className="text-white/80 text-sm">
                By using TriAD, you consent to data collection as described in our Privacy Policy. 
                Please review the Privacy Policy to understand how we handle your information.
              </p>
            </GlassCard>

            <GlassCard className="p-8" glowColor="none">
              <h2 className="text-2xl text-white mb-4">7. Intellectual Property</h2>
              <p className="text-white/80 text-sm">
                All content, algorithms, and technologies used in TriAD are proprietary. You may not 
                reproduce, distribute, or create derivative works without explicit permission.
              </p>
            </GlassCard>

            <GlassCard className="p-8" glowColor="none">
              <h2 className="text-2xl text-white mb-4">8. Modifications to Service</h2>
              <p className="text-white/80 text-sm">
                We reserve the right to modify, suspend, or discontinue any part of TriAD at any time 
                without notice. We may also update these Terms & Conditions periodically.
              </p>
            </GlassCard>

            <GlassCard className="p-8" glowColor="none">
              <h2 className="text-2xl text-white mb-4">9. Governing Law</h2>
              <p className="text-white/80 text-sm">
                These terms shall be governed by and construed in accordance with applicable local, 
                national, and international laws. Disputes shall be resolved through binding arbitration.
              </p>
            </GlassCard>

            <div className="p-6 bg-[#FBB020]/10 border-2 border-[#FBB020] rounded-lg">
              <p className="text-white/90 text-sm">
                <span className="text-[#FBB020] font-mono font-bold">ACKNOWLEDGMENT:</span> By clicking 
                "I Agree" or using the TriAD system, you acknowledge that you have read and understood 
                these terms, including the disclaimer that TriAD is NOT a medical diagnostic tool.
              </p>
            </div>

            <p className="text-white/60 text-sm">
              For questions about these terms, please contact us at legal@triad-agents.org
            </p>
          </div>
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
