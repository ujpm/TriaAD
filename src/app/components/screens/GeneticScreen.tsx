import { useState } from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../GlassCard';
import { ArrowLeft, Upload, Info } from 'lucide-react';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';

interface GeneticScreenProps {
  onBack: () => void;
  onComplete: (data: any) => void;
  onNavigate: (page: string) => void;
}

export function GeneticScreen({ onBack, onComplete, onNavigate }: GeneticScreenProps) {
  const [apoeStatus, setApoeStatus] = useState('');
  const [hasData, setHasData] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      setHasData(true);
    }
  };

  const handleSubmit = () => {
    onComplete({
      apoeStatus,
      uploadedFile,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="min-h-screen bg-[#0F172A] font-['Inter']">
      <Navbar currentPage="app" onNavigate={onNavigate} />
      <div className="pt-24 p-8">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[#06B6D4] hover:text-[#10B981] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Results</span>
          </button>
          <div>
            <h1 className="text-3xl text-white">
              Agent 2: <span className="text-[#10B981]">Genetic Analysis</span>
            </h1>
            <p className="text-white/60 text-sm font-mono mt-1">AGENT_02 // GENETICIST</p>
          </div>
        </header>

        <div className="max-w-4xl mx-auto space-y-6">
        {/* Info Banner */}
        <GlassCard className="p-6" glowColor="green">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-[#10B981] flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-white font-mono mb-2">Why Genetic Testing?</h3>
              <p className="text-white/80 text-sm mb-3">
                Genetic markers like APOE ε4 significantly increase Alzheimer's risk. Combined with your 
                cognitive screening, genetic data provides a more complete risk profile.
              </p>
              <p className="text-white/60 text-xs">
                This agent is optional but recommended for users with family history or elevated cognitive risk scores.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* APOE Status Selection */}
        <GlassCard className="p-8" glowColor="cyan">
          <h2 className="text-2xl text-white mb-6">APOE Status</h2>
          <p className="text-white/60 mb-6 text-sm">
            If you know your APOE genotype from a genetic test (e.g., 23andMe, AncestryDNA), select it below:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['ε2/ε2', 'ε2/ε3', 'ε2/ε4', 'ε3/ε3', 'ε3/ε4', 'ε4/ε4', 'Unknown'].map((variant) => (
              <button
                key={variant}
                onClick={() => {
                  setApoeStatus(variant);
                  setHasData(true);
                }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  apoeStatus === variant
                    ? 'bg-[#10B981]/20 border-[#10B981] shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                    : 'bg-white/5 border-white/20 hover:border-[#06B6D4]'
                }`}
              >
                <div className="text-white font-mono">{variant}</div>
                {variant.includes('ε4') && variant !== 'Unknown' && (
                  <div className="text-[#FBB020] text-xs mt-1">Higher Risk</div>
                )}
              </button>
            ))}
          </div>
        </GlassCard>

        {/* VCF Upload */}
        <GlassCard className="p-8" glowColor="amber">
          <h2 className="text-2xl text-white mb-6">Upload Genetic Data (Optional)</h2>
          <p className="text-white/60 mb-6 text-sm">
            Upload your VCF file from genetic testing services for comprehensive analysis:
          </p>

          <div className="border-2 border-dashed border-white/20 rounded-lg p-12 text-center hover:border-[#06B6D4] transition-colors">
            <Upload className="w-12 h-12 text-white/40 mx-auto mb-4" />
            <input
              type="file"
              accept=".vcf,.txt"
              onChange={handleFileUpload}
              className="hidden"
              id="vcf-upload"
            />
            <label
              htmlFor="vcf-upload"
              className="cursor-pointer"
            >
              <div className="text-white/80 mb-2">
                {uploadedFile ? uploadedFile : 'Click to upload VCF file'}
              </div>
              <div className="text-white/40 text-xs">Supports .vcf and .txt formats</div>
            </label>
          </div>

          <div className="mt-4 p-4 bg-white/5 rounded-lg">
            <p className="text-white/60 text-xs">
              <strong>Privacy Note:</strong> Your genetic data is anonymized and queried against our 
              ADVP Knowledge Base. Raw data is never stored on external servers.
            </p>
          </div>
        </GlassCard>

        {/* Knowledge Base Info */}
        <GlassCard className="p-8" glowColor="none">
          <h3 className="text-xl text-white mb-4">Explainable Genetics</h3>
          <p className="text-white/80 mb-4 text-sm">
            Unlike "black-box" AI models, our Geneticist agent uses a curated Knowledge Base:
          </p>
          <ul className="text-white/80 space-y-2 text-sm">
            <li className="flex items-start gap-3">
              <span className="text-[#10B981]">✓</span>
              <span>ADVP.hg38 Database (Alzheimer's Disease Variant Portal)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#10B981]">✓</span>
              <span>Medical citations for each genetic risk factor</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#10B981]">✓</span>
              <span>Deterministic lookup prevents AI hallucinations</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#10B981]">✓</span>
              <span>Transparent risk scoring based on published research</span>
            </li>
          </ul>
        </GlassCard>

        {/* Submit Button */}
        {hasData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <button
              onClick={handleSubmit}
              className="px-12 py-4 bg-gradient-to-r from-[#10B981] to-[#06B6D4] rounded-full text-white font-mono uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Generate Genetic Analysis →
            </button>
          </motion.div>
        )}

        {/* Skip Option */}
        <div className="text-center">
          <button
            onClick={onBack}
            className="text-white/60 hover:text-white text-sm font-mono transition-colors"
          >
            Skip Genetic Analysis
          </button>
        </div>
      </div>

      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
