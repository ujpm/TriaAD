import { useState } from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../GlassCard';
import { ArrowLeft, Upload, Info, Image as ImageIcon } from 'lucide-react';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';

interface StructuralScreenProps {
  onBack: () => void;
  onComplete: (data: any) => void;
  onNavigate: (page: string) => void;
}

export function StructuralScreen({ onBack, onComplete, onNavigate }: StructuralScreenProps) {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [scanType, setScanType] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileNames = Array.from(files).map(f => f.name);
      setUploadedFiles(prev => [...prev, ...fileNames]);
    }
  };

  const handleSubmit = () => {
    onComplete({
      scanType,
      fileCount: uploadedFiles.length,
      uploadedFiles,
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
              Agent 3: <span className="text-[#FBB020]">Structural Analysis</span>
            </h1>
            <p className="text-white/60 text-sm font-mono mt-1">AGENT_03 // SPECIALIST</p>
          </div>
        </header>

        <div className="max-w-4xl mx-auto space-y-6">
        {/* Info Banner */}
        <GlassCard className="p-6" glowColor="amber">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-[#FBB020] flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-white font-mono mb-2">Why Brain Imaging?</h3>
              <p className="text-white/80 text-sm mb-3">
                MRI scans reveal structural changes in the brain such as cortical atrophy and hippocampal 
                volume loss, which are key indicators of Alzheimer's Disease progression.
              </p>
              <p className="text-white/60 text-xs">
                This agent provides clinical validation and is typically recommended only for high-risk individuals 
                identified through Agents 1 and 2.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Scan Type Selection */}
        <GlassCard className="p-8" glowColor="cyan">
          <h2 className="text-2xl text-white mb-6">Scan Type</h2>
          <p className="text-white/60 mb-6 text-sm">
            Select the type of brain imaging you'll be uploading:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { id: 'mri-t1', label: 'MRI T1-Weighted', desc: 'Standard structural MRI' },
              { id: 'mri-flair', label: 'MRI FLAIR', desc: 'Fluid-attenuated inversion recovery' },
              { id: 'ct', label: 'CT Scan', desc: 'Computed tomography' },
              { id: 'other', label: 'Other', desc: 'Other imaging modality' }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setScanType(type.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  scanType === type.id
                    ? 'bg-[#FBB020]/20 border-[#FBB020] shadow-[0_0_20px_rgba(251,176,32,0.3)]'
                    : 'bg-white/5 border-white/20 hover:border-[#06B6D4]'
                }`}
              >
                <div className="text-white font-mono mb-1">{type.label}</div>
                <div className="text-white/60 text-xs">{type.desc}</div>
              </button>
            ))}
          </div>
        </GlassCard>

        {/* File Upload */}
        <GlassCard className="p-8" glowColor="green">
          <h2 className="text-2xl text-white mb-6">Upload Brain Scans</h2>
          <p className="text-white/60 mb-6 text-sm">
            Upload your MRI or CT scan images. Supported formats: DICOM (.dcm), JPEG, PNG
          </p>

          <div className="border-2 border-dashed border-white/20 rounded-lg p-12 text-center hover:border-[#06B6D4] transition-colors mb-4">
            <ImageIcon className="w-12 h-12 text-white/40 mx-auto mb-4" />
            <input
              type="file"
              accept=".dcm,.jpg,.jpeg,.png"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="scan-upload"
            />
            <label
              htmlFor="scan-upload"
              className="cursor-pointer"
            >
              <div className="text-white/80 mb-2">
                {uploadedFiles.length > 0 
                  ? `${uploadedFiles.length} file(s) uploaded` 
                  : 'Click to upload scan images'}
              </div>
              <div className="text-white/40 text-xs">Supports DICOM, JPEG, PNG formats</div>
            </label>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white/80 text-sm font-mono mb-3">Uploaded Files:</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {uploadedFiles.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-white/60 text-xs">
                    <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                    <span>{file}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </GlassCard>

        {/* AI Model Info */}
        <GlassCard className="p-8" glowColor="none">
          <h3 className="text-xl text-white mb-4">Deep Learning Analysis</h3>
          <p className="text-white/80 mb-4 text-sm">
            Our Specialist agent uses state-of-the-art deep learning for structural analysis:
          </p>
          <ul className="text-white/80 space-y-2 text-sm">
            <li className="flex items-start gap-3">
              <span className="text-[#FBB020]">✓</span>
              <span>ResNet/CNN architecture trained on ADNI dataset</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#FBB020]">✓</span>
              <span>Detects cortical atrophy patterns</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#FBB020]">✓</span>
              <span>Measures hippocampal volume loss</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#FBB020]">✓</span>
              <span>Provides region-specific analysis with heatmaps</span>
            </li>
          </ul>
        </GlassCard>

        {/* Clinical Note */}
        <div className="p-6 bg-[#DC2626]/10 border-2 border-[#DC2626] rounded-lg">
          <p className="text-white/90 text-sm">
            <span className="text-[#DC2626] font-mono font-bold">IMPORTANT:</span> MRI analysis results 
            must be validated by a board-certified radiologist or neurologist. This AI analysis is for 
            screening purposes only and does not replace professional radiological interpretation.
          </p>
        </div>

        {/* Submit Button */}
        {uploadedFiles.length > 0 && scanType && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <button
              onClick={handleSubmit}
              className="px-12 py-4 bg-gradient-to-r from-[#FBB020] to-[#06B6D4] rounded-full text-white font-mono uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Analyze Brain Scans →
            </button>
          </motion.div>
        )}

        {/* Skip Option */}
        <div className="text-center">
          <button
            onClick={onBack}
            className="text-white/60 hover:text-white text-sm font-mono transition-colors"
          >
            Skip Structural Analysis
          </button>
        </div>
      </div>

      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
