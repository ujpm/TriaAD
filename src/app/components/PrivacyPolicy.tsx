import { GlassCard } from './GlassCard';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen bg-[#0F172A] p-8 font-['Inter'] pt-24">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="text-[#06B6D4] hover:text-[#10B981] mb-6 transition-colors"
        >
          ← Back
        </button>

        <h1 className="text-4xl text-white mb-8">Privacy Policy</h1>

        <GlassCard className="p-8 space-y-6" glowColor="none">
          <section>
            <h2 className="text-2xl text-white mb-4">1. Information We Collect</h2>
            <p className="text-white/80 mb-3">
              TriAD processes the following types of data to provide cognitive screening services:
            </p>
            <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
              <li><strong className="text-white">Voice Data:</strong> Temporary audio recordings for biomarker analysis (automatically deleted after processing)</li>
              <li><strong className="text-white">Behavioral Data:</strong> Reaction times, game performance metrics, interaction patterns</li>
              <li><strong className="text-white">Genetic Data (Optional):</strong> User-uploaded genetic markers or VCF files (processed locally when possible)</li>
              <li><strong className="text-white">Medical Images (Optional):</strong> MRI scans in DICOM/JPEG format for Agent 3 analysis</li>
              <li><strong className="text-white">Technical Data:</strong> Browser type, device information for functionality purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-white mb-4">2. How We Use Your Data</h2>
            <p className="text-white/80 mb-3">Your data is used solely for:</p>
            <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
              <li>Providing cognitive risk assessment through our AI agents</li>
              <li>Generating personalized screening reports</li>
              <li>Improving algorithm accuracy (anonymized and aggregated data only)</li>
              <li>Research purposes (only with explicit consent and full anonymization)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-white mb-4">3. Data Storage and Security</h2>
            <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
              <li><strong className="text-white">Local Processing:</strong> When possible, data is processed on your device and not transmitted</li>
              <li><strong className="text-white">Encryption:</strong> All data in transit uses TLS/SSL encryption</li>
              <li><strong className="text-white">Limited Retention:</strong> Voice recordings are deleted within 24 hours; other data is retained only as long as necessary</li>
              <li><strong className="text-white">No Sale of Data:</strong> We NEVER sell your personal or medical data to third parties</li>
              <li><strong className="text-white">Anonymization:</strong> Research datasets are fully de-identified per HIPAA standards</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-white mb-4">4. Your Rights</h2>
            <p className="text-white/80 mb-3">You have the right to:</p>
            <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
              <li>Access all data we have collected about you</li>
              <li>Request deletion of your data at any time</li>
              <li>Opt-out of research data aggregation</li>
              <li>Download your screening results</li>
              <li>Withdraw consent for data processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-white mb-4">5. HIPAA Compliance (U.S. Users)</h2>
            <p className="text-white/70">
              TriAD is designed with HIPAA principles in mind, though as a screening tool (not a covered entity), 
              full HIPAA compliance requirements may not apply. We implement security safeguards equivalent to 
              HIPAA standards for all health data processing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white mb-4">6. Third-Party Services</h2>
            <p className="text-white/70">
              TriAD may use third-party services for hosting and analytics. These providers are contractually 
              obligated to maintain data privacy and security standards. We do not share identifiable health 
              information with advertisers or marketing platforms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white mb-4">7. Children's Privacy</h2>
            <p className="text-white/70">
              TriAD is not intended for users under 18 years of age. We do not knowingly collect data from minors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white mb-4">8. International Users</h2>
            <p className="text-white/70">
              If you access TriAD from outside the United States, your data may be transferred to and processed 
              in the U.S. By using our service, you consent to such transfer and processing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white mb-4">9. Changes to This Policy</h2>
            <p className="text-white/70">
              We may update this Privacy Policy periodically. Changes will be posted on this page with an updated 
              "Last Modified" date. Continued use after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-white mb-4">10. Contact Us</h2>
            <p className="text-white/70">
              For privacy questions or to exercise your data rights, contact us at:
            </p>
            <p className="text-[#06B6D4] mt-2">privacy@triad.ai</p>
          </section>

          <div className="pt-6 border-t border-white/10">
            <p className="text-white/60 text-sm">
              Last Modified: December 25, 2024
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
