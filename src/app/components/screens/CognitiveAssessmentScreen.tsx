import { useState } from 'react';
import { motion } from 'motion/react';
import { GlassCard } from '../GlassCard';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';

interface CognitiveAssessmentScreenProps {
  onBack: () => void;
  onComplete: (data: CognitiveAssessmentData) => void;
  onNavigate: (page: string) => void;
}

export interface CognitiveAssessmentData {
  timestamp?: string;
  demographics: {
    age: string;
    occupation: string;
    education: string;
    location: string;
    gender: string;
  };
  questions: {
    nose: boolean;
    dream: boolean;
    money: number;
  };
  scenarios: {
    market: string;
    stove: string;
    scam: string;
  };
}

type Step = 'demographics' | 'nose' | 'dream' | 'money' | 'market' | 'stove' | 'scam' | 'complete';

export function CognitiveAssessmentScreen({ onBack, onComplete, onNavigate }: CognitiveAssessmentScreenProps) {
  const [currentStep, setCurrentStep] = useState<Step>('demographics');
  const [assessmentData, setAssessmentData] = useState<CognitiveAssessmentData>({
    demographics: {
      age: '',
      occupation: '',
      education: '',
      location: '',
      gender: ''
    },
    questions: {
      nose: false,
      dream: false,
      money: 3
    },
    scenarios: {
      market: '',
      stove: '',
      scam: ''
    }
  });

  const steps: Step[] = ['demographics', 'nose', 'dream', 'money', 'market', 'stove', 'scam', 'complete'];
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep === 'complete') {
      onComplete(assessmentData);
    } else {
      const nextStepIndex = currentStepIndex + 1;
      setCurrentStep(steps[nextStepIndex]);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1]);
    }
  };

  const updateDemographics = (field: keyof typeof assessmentData.demographics, value: string) => {
    setAssessmentData(prev => ({
      ...prev,
      demographics: { ...prev.demographics, [field]: value }
    }));
  };

  const updateQuestion = (field: keyof typeof assessmentData.questions, value: any) => {
    setAssessmentData(prev => ({
      ...prev,
      questions: { ...prev.questions, [field]: value }
    }));
  };

  const updateScenario = (field: keyof typeof assessmentData.scenarios, value: string) => {
    setAssessmentData(prev => ({
      ...prev,
      scenarios: { ...prev.scenarios, [field]: value }
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'demographics':
        return Object.values(assessmentData.demographics).every(val => val !== '');
      case 'nose':
      case 'dream':
        return true; // Boolean questions always have a value
      case 'money':
        return assessmentData.questions.money > 0;
      case 'market':
      case 'stove':
      case 'scam':
        return assessmentData.scenarios[currentStep as keyof typeof assessmentData.scenarios] !== '';
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'demographics':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl text-white mb-6">Demographics Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 mb-2">Age</label>
                <input
                  type="number"
                  value={assessmentData.demographics.age}
                  onChange={(e) => updateDemographics('age', e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-[#06B6D4] focus:outline-none"
                  placeholder="Enter your age"
                />
              </div>
              
              <div>
                <label className="block text-white/80 mb-2">Gender</label>
                <select
                  value={assessmentData.demographics.gender}
                  onChange={(e) => updateDemographics('gender', e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-[#06B6D4] focus:outline-none"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
              
              <div>
                <label className="block text-white/80 mb-2">Occupation</label>
                <input
                  type="text"
                  value={assessmentData.demographics.occupation}
                  onChange={(e) => updateDemographics('occupation', e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-[#06B6D4] focus:outline-none"
                  placeholder="Enter your occupation"
                />
              </div>
              
              <div>
                <label className="block text-white/80 mb-2">Education Level</label>
                <select
                  value={assessmentData.demographics.education}
                  onChange={(e) => updateDemographics('education', e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-[#06B6D4] focus:outline-none"
                >
                  <option value="">Select education level</option>
                  <option value="high-school">High School</option>
                  <option value="some-college">Some College</option>
                  <option value="bachelors">Bachelor's Degree</option>
                  <option value="masters">Master's Degree</option>
                  <option value="doctorate">Doctorate</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-white/80 mb-2">Location</label>
                <input
                  type="text"
                  value={assessmentData.demographics.location}
                  onChange={(e) => updateDemographics('location', e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-[#06B6D4] focus:outline-none"
                  placeholder="City, Country"
                />
              </div>
            </div>
          </div>
        );

      case 'nose':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl text-white mb-2">The "Nose" Question</h2>
            <p className="text-white/60 mb-6">Olfactory History - Early sign detection</p>
            
            <div className="p-6 bg-white/5 rounded-lg mb-6">
              <p className="text-white/80 mb-4">
                Research shows loss of smell (Anosmia) is often the #1 earliest sign of Alzheimer's, appearing years before memory loss.
              </p>
              <p className="text-[#06B6D4] font-medium">
                Have you noticed that food tastes blander or that you can't smell things like coffee or soap as well as you used to?
              </p>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => updateQuestion('nose', true)}
                className={`flex-1 py-3 px-6 rounded-lg transition-all ${
                  assessmentData.questions.nose === true
                    ? 'bg-[#06B6D4] text-white'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => updateQuestion('nose', false)}
                className={`flex-1 py-3 px-6 rounded-lg transition-all ${
                  assessmentData.questions.nose === false
                    ? 'bg-[#06B6D4] text-white'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                No
              </button>
            </div>
          </div>
        );

      case 'dream':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl text-white mb-2">The "Dream" Question</h2>
            <p className="text-white/60 mb-6">Sleep Behavior Analysis</p>
            
            <div className="p-6 bg-white/5 rounded-lg mb-6">
              <p className="text-white/80 mb-4">
                "REM Sleep Behavior Disorder" (acting out dreams, kicking, shouting) is a massive red flag for neurodegenerative diseases.
              </p>
              <p className="text-[#06B6D4] font-medium">
                Have you been told that you kick, punch, or shout while you are sleeping?
              </p>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => updateQuestion('dream', true)}
                className={`flex-1 py-3 px-6 rounded-lg transition-all ${
                  assessmentData.questions.dream === true
                    ? 'bg-[#06B6D4] text-white'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => updateQuestion('dream', false)}
                className={`flex-1 py-3 px-6 rounded-lg transition-all ${
                  assessmentData.questions.dream === false
                    ? 'bg-[#06B6D4] text-white'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                No
              </button>
            </div>
          </div>
        );

      case 'money':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl text-white mb-2">The "Money" Question</h2>
            <p className="text-white/60 mb-6">Financial Capacity Assessment</p>
            
            <div className="p-6 bg-white/5 rounded-lg mb-6">
              <p className="text-white/80 mb-4">
                Complex math is often the first "Executive Function" to slip.
              </p>
              <p className="text-[#06B6D4] font-medium mb-4">
                Do you find it harder to calculate tips or count change at the store than you did 5 years ago?
              </p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Much easier</span>
                  <span className="text-white/80">Much harder</span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      onClick={() => updateQuestion('money', value)}
                      className={`flex-1 py-3 rounded-lg transition-all ${
                        assessmentData.questions.money === value
                          ? 'bg-[#06B6D4] text-white'
                          : 'bg-white/10 text-white/60 hover:bg-white/20'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-white/60">
                  <span>1</span>
                  <span>2</span>
                  <span>3 - No change</span>
                  <span>4</span>
                  <span>5</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'market':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl text-white mb-2">Scenario: The Market</h2>
            <p className="text-white/60 mb-6">Navigation & Memory Assessment</p>
            
            <div className="p-6 bg-white/5 rounded-lg mb-6">
              <p className="text-white/80 mb-4">
                "You are going to the local market to buy 5 specific items. You realize you left your list at home."
              </p>
              
              <div className="space-y-3">
                {[
                  { value: 'A', label: 'I remember all 5 easily.', analysis: 'Normal memory function' },
                  { value: 'B', label: 'I remember 1 or 2, or I call home to ask.', analysis: 'Mild memory difficulty' },
                  { value: 'C', label: 'I feel panicked and might go back home immediately.', analysis: 'Anxiety/memory failure' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateScenario('market', option.value)}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      assessmentData.scenarios.market === option.value
                        ? 'bg-[#06B6D4] text-white'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    <div className="font-medium mb-1">Option {option.value}: {option.label}</div>
                    <div className="text-sm opacity-80">{option.analysis}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'stove':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl text-white mb-2">Scenario: The Stove</h2>
            <p className="text-white/60 mb-6">Multitasking Assessment</p>
            
            <div className="p-6 bg-white/5 rounded-lg mb-6">
              <p className="text-white/80 mb-4">
                "You are boiling water for tea and the phone rings. You talk for 10 minutes."
              </p>
              
              <div className="space-y-3">
                {[
                  { value: 'A', label: 'I turned the stove off before answering.', analysis: 'Good executive function' },
                  { value: 'B', label: 'I kept checking the stove while talking.', analysis: 'Moderate executive function' },
                  { value: 'C', label: 'I forgot the water was boiling until the pot burned.', analysis: 'Executive dysfunction' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateScenario('stove', option.value)}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      assessmentData.scenarios.stove === option.value
                        ? 'bg-[#06B6D4] text-white'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    <div className="font-medium mb-1">Option {option.value}: {option.label}</div>
                    <div className="text-sm opacity-80">{option.analysis}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'scam':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl text-white mb-2">Scenario: The Scam</h2>
            <p className="text-white/60 mb-6">Judgment Assessment</p>
            
            <div className="p-6 bg-white/5 rounded-lg mb-6">
              <p className="text-white/80 mb-4">
                "You receive a message saying you won a lottery but need to pay a small fee to claim it."
              </p>
              
              <div className="space-y-3">
                {[
                  { value: 'A', label: 'Delete it / Ignore it.', analysis: 'Good financial judgment' },
                  { value: 'B', label: 'Ask a family member about it.', analysis: 'Cautious but reasonable' },
                  { value: 'C', label: 'It sounds exciting, I might reply.', analysis: 'Poor financial judgment' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateScenario('scam', option.value)}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      assessmentData.scenarios.scam === option.value
                        ? 'bg-[#06B6D4] text-white'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    <div className="font-medium mb-1">Option {option.value}: {option.label}</div>
                    <div className="text-sm opacity-80">{option.analysis}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl text-white mb-6">Assessment Complete!</h2>
            
            <div className="p-6 bg-white/5 rounded-lg">
              <p className="text-white/80 mb-4">
                Thank you for completing the cognitive assessment. Your responses have been recorded and will be analyzed as part of the TriAD screening process.
              </p>
              <p className="text-[#10B981]">
                Click "Complete Assessment" to proceed to the next agent.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
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
            <span>Back to Home</span>
          </button>
          <div>
            <h1 className="text-3xl text-white">
              Agent 1: <span className="text-[#06B6D4]">Cognitive Assessment</span>
            </h1>
            <p className="text-white/60 text-sm font-mono mt-1">AGENT_01 // COGNITIVE_SCREENER</p>
          </div>
        </header>

        {/* Progress Bar */}
        <GlassCard className="p-4 mb-8" glowColor="cyan">
          <div className="flex items-center gap-4">
            <span className="text-white font-mono text-sm min-w-[80px]">PROGRESS</span>
            <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#06B6D4] to-[#10B981]"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-[#06B6D4] font-mono text-sm min-w-[60px]">
              {Math.round(progress)}%
            </span>
          </div>
          
          {/* Step indicators */}
          <div className="mt-2 flex gap-1">
            {steps.map((step, index) => (
              <div
                key={step}
                className={`h-2 flex-1 rounded ${
                  index <= currentStepIndex
                    ? 'bg-[#06B6D4]'
                    : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        </GlassCard>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-8" glowColor="cyan">
            {renderStepContent()}
          </GlassCard>
        </div>

        {/* Navigation Buttons */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStepIndex === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                currentStepIndex === 0
                  ? 'bg-white/5 text-white/30 cursor-not-allowed'
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>
            
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                canProceed()
                  ? 'bg-gradient-to-r from-[#06B6D4] to-[#10B981] text-white'
                  : 'bg-white/5 text-white/30 cursor-not-allowed'
              }`}
            >
              {currentStep === 'complete' ? 'Complete Assessment' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
