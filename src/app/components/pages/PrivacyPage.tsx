import { GlassCard } from '../GlassCard';
import { Footer } from '../Footer';

interface PrivacyPageProps {
  onNavigate: (page: string) => void;
}

export function PrivacyPage({ onNavigate }: PrivacyPageProps) {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl text-white mb-6">Privacy Policy</h1>
          <p className="text-white/60 mb-12">Last Updated: December 25, 2025</p>

          <div className="space-y-6">
            <GlassCard className="p-8" glowColor="cyan">
              <h2 className="text-2xl text-white mb-4">Data Collection</h2>
              <p className="text-white/80 mb-4">
                TriAD collects the following data to provide cognitive health screening services:
              </p>
              <ul className="text-white/80 space-y-2 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-[#06B6D4]">•</span>
                  <span><strong>Voice Data:</strong> Audio recordings for voice biomarker analysis (Agent 1)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#06B6D4]">•</span>
                  <span><strong>Behavioral Data:</strong> Cognitive game performance metrics (Agent 1)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#06B6D4]">•</span>
                  <span><strong>Genetic Data:</strong> Voluntarily provided genetic markers (Agent 2, optional)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#06B6D4]">•</span>
                  <span><strong>Medical Imaging:</strong> Uploaded MRI scans (Agent 3, optional)</span>
                </li>
              </ul>
            </GlassCard>

            <GlassCard className="p-8" glowColor="green">
              <h2 className="text-2xl text-white mb-4">Data Storage & Security</h2>
              <p className="text-white/80 mb-4">
                Your data is handled with the highest level of security:
              </p>
              <ul className="text-white/80 space-y-2 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-[#10B981]">✓</span>
                  <span>All data is encrypted in transit and at rest</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#10B981]">✓</span>
                  <span>Data is stored on HIPAA-compliant servers</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#10B981]">✓</span>
                  <span>Voice recordings are processed locally when possible</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#10B981]">✓</span>
                  <span>Genetic data is anonymized for knowledge base queries</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#10B981]">✓</span>
                  <span>You can request data deletion at any time</span>
                </li>
              </ul>
            </GlassCard>

            <GlassCard className="p-8" glowColor="amber">
              <h2 className="text-2xl text-white mb-4">Data Usage</h2>
              <p className="text-white/80 mb-4">
                Your data is used exclusively for:
              </p>
              <ul className="text-white/80 space-y-2 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-[#FBB020]">1.</span>
                  <span>Generating your personalized cognitive health assessment</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FBB020]">2.</span>
                  <span>Improving our AI models (only with explicit consent)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FBB020]">3.</span>
                  <span>Research purposes (anonymized and aggregated only)</span>
                </li>
              </ul>
              <p className="text-white/80 mt-4 text-sm">
                <strong>We will NEVER:</strong> Sell your data, share it with third parties for marketing, 
                or use it for purposes other than stated above without your explicit consent.
              </p>
            </GlassCard>

            <GlassCard className="p-8" glowColor="none">
              <h2 className="text-2xl text-white mb-4">Your Rights</h2>
              <p className="text-white/80 mb-4">
                You have the following rights regarding your data:
              </p>
              <ul className="text-white/80 space-y-2 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-[#06B6D4]">•</span>
                  <span><strong>Access:</strong> Request a copy of all data we have about you</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#06B6D4]">•</span>
                  <span><strong>Correction:</strong> Update any inaccurate information</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#06B6D4]">•</span>
                  <span><strong>Deletion:</strong> Request complete removal of your data</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#06B6D4]">•</span>
                  <span><strong>Portability:</strong> Download your data in a machine-readable format</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#06B6D4]">•</span>
                  <span><strong>Opt-out:</strong> Withdraw consent for research use at any time</span>
                </li>
              </ul>
            </GlassCard>

            <GlassCard className="p-8" glowColor="none">
              <h2 className="text-2xl text-white mb-4">Cookies & Tracking</h2>
              <p className="text-white/80 text-sm">
                TriAD uses minimal cookies for essential functionality only. We do not use third-party 
                tracking cookies or analytics that collect personally identifiable information.
              </p>
            </GlassCard>

            <div className="p-6 bg-[#FBB020]/10 border-2 border-[#FBB020] rounded-lg">
              <p className="text-white/90 text-sm">
                <span className="text-[#FBB020] font-mono font-bold">IMPORTANT:</span> While TriAD is not 
                designed to collect personally identifiable information (PII) or highly sensitive medical 
                records, any data you voluntarily provide should be considered protected health information. 
                We recommend not using this system for clinical record-keeping.
              </p>
            </div>

            <p className="text-white/60 text-sm">
              For questions about this privacy policy or to exercise your data rights, please contact us 
              at privacy@triad-agents.org
            </p>
          </div>
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
