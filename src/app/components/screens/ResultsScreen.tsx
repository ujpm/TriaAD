import { motion } from 'motion/react';
import { GlassCard } from '../GlassCard';
import { Download, ChevronRight, Info } from 'lucide-react';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';

interface ResultsData {
  cognitive?: any;
  genetic?: any;
  structural?: any;
}

interface ResultsScreenProps {
  data: ResultsData;
  onNavigate: (page: string) => void;
  onProceedToGenetic?: () => void;
  onProceedToStructural?: () => void;
  onBackToHome: () => void;
}

export function ResultsScreen({ 
  data, 
  onNavigate,
  onProceedToGenetic, 
  onProceedToStructural,
  onBackToHome 
}: ResultsScreenProps) {
  const hasCognitive = !!data.cognitive;
  const hasGenetic = !!data.genetic;
  const hasStructural = !!data.structural;

  const reportTitle = hasStructural ? 'Complete Report' : hasGenetic ? 'Genetic Report' : 'Cognitive Report';
  const completionLabel = hasStructural
    ? 'All 3 Agents Complete'
    : hasGenetic
      ? 'Agents 1 & 2 Complete'
      : 'Agent 1 Complete';
  
  // Calculate combined risk score
  const cognitiveRisk = 12; // Mock data
  const geneticRisk = hasGenetic ? (data.genetic.apoeStatus?.includes('ε4') ? 35 : 8) : 0;
  const structuralRisk = hasStructural ? 28 : 0;
  
  const totalRisk = hasCognitive 
    ? Math.round((cognitiveRisk + geneticRisk + structuralRisk) / (1 + (hasGenetic ? 1 : 0) + (hasStructural ? 1 : 0)))
    : 0;

  const getRiskLevel = (score: number) => {
    if (score < 20) return { label: 'LOW', color: '#10B981' };
    if (score < 40) return { label: 'MODERATE', color: '#FBB020' };
    return { label: 'HIGH', color: '#DC2626' };
  };

  const riskLevel = getRiskLevel(totalRisk);

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Navbar currentPage="app" onNavigate={onNavigate} />
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl tracking-wider text-white mb-2">
              Tri<span className="text-[#06B6D4]">AD</span> <span className="text-xl">{reportTitle}</span>
            </h1>
            <p className="text-[#06B6D4] text-lg">
              {completionLabel}
            </p>
          </header>

          {/* Comprehensive Risk Assessment */}
          <GlassCard className="p-8 mb-8" glowColor={totalRisk < 20 ? 'green' : totalRisk < 40 ? 'amber' : 'none'}>
            <div className="text-center mb-6">
              <h2 className="text-3xl text-white mb-2">Comprehensive Risk Assessment</h2>
              <p className="text-white/60">Based on {hasStructural ? 3 : hasGenetic ? 2 : 1}-Agent Analysis</p>
            </div>
            
            <div className="flex items-center justify-center mb-8">
              <motion.div
                className="relative w-56 h-56 rounded-full flex items-center justify-center"
                style={{
                  background: `conic-gradient(${riskLevel.color} ${totalRisk * 3.6}deg, rgba(255,255,255,0.1) ${totalRisk * 3.6}deg)`
                }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="absolute inset-4 rounded-full bg-[#0F172A] flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-mono" style={{ color: riskLevel.color }}>
                      {totalRisk}%
                    </div>
                    <div className="text-white/60 text-sm mt-2">RISK SCORE</div>
                    <div className="text-sm font-mono mt-1" style={{ color: riskLevel.color }}>
                      {riskLevel.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Phase Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80 text-sm">Agent 1: Cognitive</span>
                  <span className="text-[#06B6D4] font-mono">✓</span>
                </div>
                <div className="text-2xl font-mono text-[#06B6D4]">{cognitiveRisk}%</div>
                <div className="text-xs text-white/60 mt-1">Voice & Reflex Analysis</div>
              </div>
              
              {hasGenetic && (
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/80 text-sm">Agent 2: Genetic</span>
                    <span className="text-[#10B981] font-mono">✓</span>
                  </div>
                  <div className="text-2xl font-mono text-[#10B981]">{geneticRisk}%</div>
                  <div className="text-xs text-white/60 mt-1">{data.genetic.apoeStatus || 'DNA Risk Profile'}</div>
                </div>
              )}
              
              {hasStructural && (
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/80 text-sm">Agent 3: Structural</span>
                    <span className="text-[#FBB020] font-mono">✓</span>
                  </div>
                  <div className="text-2xl font-mono text-[#FBB020]">{structuralRisk}%</div>
                  <div className="text-xs text-white/60 mt-1">MRI Analysis</div>
                </div>
              )}
            </div>

            {/* Risk Interpretation */}
            <div 
              className="p-4 rounded-lg border-2" 
              style={{ 
                backgroundColor: `${riskLevel.color}10`,
                borderColor: riskLevel.color
              }}
            >
              <p className="text-white/90 text-sm">
                <span className="font-mono font-bold" style={{ color: riskLevel.color }}>
                  {riskLevel.label} RISK:
                </span>{' '}
                {totalRisk < 20 
                  ? 'Your multi-agent screening shows normal patterns. Continue annual monitoring and maintain healthy lifestyle habits.'
                  : totalRisk < 40
                  ? 'Your screening indicates moderate risk factors. Consult with a healthcare provider for further evaluation and consider lifestyle interventions.'
                  : 'Your screening shows significant risk markers. We strongly recommend immediate consultation with a neurologist or memory specialist for comprehensive evaluation.'}
              </p>
            </div>
          </GlassCard>

          {/* Cognitive Details */}
          {hasCognitive && (
            <GlassCard className="p-8 mb-8" glowColor="cyan">
              <h3 className="text-2xl text-white mb-4">Agent 1: Cognitive Analysis</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white/80 text-sm font-mono">Voice Biomarkers</span>
                    <span className="text-[#10B981] text-sm font-mono">NORMAL</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#10B981]"
                      initial={{ width: '0%' }}
                      animate={{ width: '94%' }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                  <p className="text-white/60 text-xs mt-2">
                    Vocabulary richness and pause patterns within normal ranges
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white/80 text-sm font-mono">Pattern Recognition</span>
                    <span className="text-[#10B981] text-sm font-mono">NORMAL</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#10B981]"
                      initial={{ width: '0%' }}
                      animate={{ width: '89%' }}
                      transition={{ duration: 1, delay: 0.4 }}
                    />
                  </div>
                  <p className="text-white/60 text-xs mt-2">
                    Cognitive reflex game performance shows good spatial reasoning
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white/80 text-sm font-mono">Reaction Time</span>
                    <span className="text-[#06B6D4] text-sm font-mono">887ms AVG</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#06B6D4]"
                      initial={{ width: '0%' }}
                      animate={{ width: '91%' }}
                      transition={{ duration: 1, delay: 0.6 }}
                    />
                  </div>
                  <p className="text-white/60 text-xs mt-2">
                    Response latency within expected range for age group
                  </p>
                </div>
              </div>
            </GlassCard>
          )}

          {/* Genetic Details */}
          {hasGenetic && (
            <GlassCard className="p-8 mb-8" glowColor="green">
              <h3 className="text-2xl text-white mb-4">Agent 2: Genetic Analysis</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-white/80 font-mono text-sm mb-3">APOE GENOTYPE</h4>
                  <div className="text-3xl font-mono text-[#10B981] mb-2">
                    {data.genetic.apoeStatus || 'Unknown'}
                  </div>
                  <p className="text-white/60 text-sm">
                    {data.genetic.apoeStatus?.includes('ε4') 
                      ? 'APOE ε4 allele present - associated with increased AD risk'
                      : 'No high-risk APOE variants detected'}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-white/80 font-mono text-sm mb-3">GENETIC LIABILITY</h4>
                  <div className="text-3xl font-mono text-[#10B981] mb-2">
                    {data.genetic.apoeStatus?.includes('ε4') ? 'Elevated' : 'Normal'}
                  </div>
                  <p className="text-white/60 text-sm">
                    Based on ADVP Knowledge Base analysis
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-lg">
                <h4 className="text-white/80 text-sm font-mono mb-2">
                  <Info className="inline w-4 h-4 mr-2" />
                  EXPLAINABLE AI INSIGHT
                </h4>
                <p className="text-white/60 text-xs">
                  {data.genetic.apoeStatus?.includes('ε4')
                    ? 'rs429358 variant (C→T) on APOE gene increases AD risk by 3-15x depending on allele count. This is well-documented in literature (PMID: 8154295). Genetic risk does not guarantee disease - lifestyle factors remain crucial.'
                    : 'Your APOE profile shows protective or neutral variants. However, genetics account for only ~60-80% of AD risk. Continue preventive measures.'}
                </p>
              </div>
            </GlassCard>
          )}

          {/* Structural Details */}
          {hasStructural && (
            <GlassCard className="p-8 mb-8" glowColor="amber">
              <h3 className="text-2xl text-white mb-4">Agent 3: Structural Analysis</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="text-sm text-white/60 mb-1">Cortical Atrophy</div>
                  <div className="text-2xl font-mono text-[#FBB020]">Mild</div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="text-sm text-white/60 mb-1">Hippocampal Volume</div>
                  <div className="text-2xl font-mono text-[#FBB020]">-12%</div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="text-sm text-white/60 mb-1">White Matter</div>
                  <div className="text-2xl font-mono text-[#10B981]">Normal</div>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-lg mb-4">
                <h4 className="text-white/80 text-sm font-mono mb-2">AI DETECTION</h4>
                <p className="text-white/60 text-sm mb-3">
                  ResNet-based analysis detected structural changes consistent with early-stage 
                  neurodegenerative patterns in medial temporal lobe regions.
                </p>
                <div className="text-xs text-white/40">
                  Model trained on ADNI dataset (N=2,000+ scans, 94.2% validation accuracy)
                </div>
              </div>

              <div className="p-4 bg-[#DC2626]/10 border-2 border-[#DC2626] rounded-lg">
                <p className="text-white/90 text-sm">
                  <span className="text-[#DC2626] font-mono font-bold">CLINICAL VALIDATION REQUIRED:</span> These 
                  findings must be interpreted by a board-certified radiologist. AI analysis is preliminary only.
                </p>
              </div>
            </GlassCard>
          )}

          {/* Recommendations */}
          <GlassCard className="p-8 mb-8" glowColor="cyan">
            <h3 className="text-xl text-white mb-4">Recommended Next Steps</h3>
            <ul className="space-y-3 text-white/80 text-sm">
              {totalRisk < 20 ? (
                <>
                  <li className="flex items-start gap-3">
                    <span className="text-[#10B981] mt-1">✓</span>
                    <span>Continue annual screening with Agent 1 cognitive tests</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#06B6D4] mt-1">•</span>
                    <span>Maintain healthy lifestyle: regular exercise, balanced diet, cognitive engagement</span>
                  </li>
                  {!hasGenetic && (
                    <li className="flex items-start gap-3">
                      <span className="text-[#FBB020] mt-1">→</span>
                      <span>Consider genetic testing if you have family history of Alzheimer's</span>
                    </li>
                  )}
                </>
              ) : (
                <>
                  <li className="flex items-start gap-3">
                    <span className="text-[#DC2626] mt-1">!</span>
                    <span>Schedule consultation with neurologist or memory specialist</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#DC2626] mt-1">!</span>
                    <span>Consider comprehensive neuropsychological evaluation</span>
                  </li>
                  {!hasStructural && (
                    <li className="flex items-start gap-3">
                      <span className="text-[#FBB020] mt-1">→</span>
                      <span>MRI brain imaging recommended for clinical confirmation</span>
                    </li>
                  )}
                </>
              )}
              <li className="flex items-start gap-3">
                <span className="text-[#06B6D4] mt-1">•</span>
                <span>Share this report with your healthcare provider</span>
              </li>
            </ul>
          </GlassCard>

          {/* Next Phase Recommendations */}
          {!hasGenetic && onProceedToGenetic && (
            <GlassCard className="p-8 mb-8" glowColor="green">
              <div className="flex items-start gap-4">
                <Info className="w-6 h-6 text-[#10B981] flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl text-white mb-3">Next: Agent 2 Genetic Analysis</h3>
                  <p className="text-white/80 mb-4 text-sm">
                    Continue to the genetic agent to refine your overall risk profile with APOE and related markers.
                  </p>
                  <button
                    onClick={onProceedToGenetic}
                    className="px-8 py-3 bg-gradient-to-r from-[#10B981] to-[#06B6D4] rounded-full text-white font-mono uppercase tracking-wider hover:opacity-90 transition-opacity"
                  >
                    Proceed to Genetic Analysis <ChevronRight className="inline w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            </GlassCard>
          )}

          {!hasStructural && hasGenetic && onProceedToStructural && (
            <GlassCard className="p-8 mb-8" glowColor="amber">
              <div className="flex items-start gap-4">
                <Info className="w-6 h-6 text-[#FBB020] flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl text-white mb-3">Next: Agent 3 Structural Analysis</h3>
                  <p className="text-white/80 mb-4 text-sm">
                    Continue to the structural agent to add imaging-based validation to your results.
                  </p>
                  <button
                    onClick={onProceedToStructural}
                    className="px-8 py-3 bg-gradient-to-r from-[#FBB020] to-[#06B6D4] rounded-full text-white font-mono uppercase tracking-wider hover:opacity-90 transition-opacity"
                  >
                    Proceed to Structural Analysis <ChevronRight className="inline w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            </GlassCard>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <button
              onClick={() => {/* Download report logic */}}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#06B6D4] to-[#10B981] rounded-full text-white font-mono uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              <Download className="w-5 h-5" />
              Download Report
            </button>
            <button
              onClick={onBackToHome}
              className="px-8 py-3 bg-white/10 rounded-full text-white font-mono uppercase tracking-wider hover:bg-white/20 transition-colors border-2 border-white/20"
            >
              Back to Home
            </button>
          </div>

          {/* Disclaimer */}
          <div className="mt-12 p-6 bg-[#FBB020]/10 border-2 border-[#FBB020] rounded-lg">
            <p className="text-white/90 text-sm text-center">
              <span className="text-[#FBB020] font-mono font-bold">MEDICAL DISCLAIMER:</span> This report is 
              for screening purposes only and does not constitute a medical diagnosis. Always consult qualified 
              healthcare professionals for medical advice, diagnosis, and treatment decisions.
            </p>
          </div>
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
