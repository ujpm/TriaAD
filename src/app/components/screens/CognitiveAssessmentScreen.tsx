import { useEffect, useMemo, useRef, useState } from 'react';
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
  voice?: {
    transcript: string;
    totalWords: number;
    uniqueWords: number;
    vocabularyRichness: number;
    fillerCount: number;
    hesitationRate: number;
  };
  game?: {
    kind: 'stroop';
    trials: number;
    accuracy: number;
    averageReactionMs: number;
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

type Step =
  | 'demographics'
  | 'voice'
  | 'stroop'
  | 'nose'
  | 'dream'
  | 'money'
  | 'market'
  | 'stove'
  | 'scam'
  | 'complete';

type StroopInk = 'red' | 'green' | 'blue' | 'yellow';

const FILLER_WORDS = new Set(['um', 'umm', 'uh', 'er', 'ah', 'like']);

const getWords = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z\s']/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

const analyzeTranscript = (transcript: string) => {
  const words = getWords(transcript);
  const totalWords = words.length;
  const uniqueWords = new Set(words).size;
  const vocabularyRichness = totalWords > 0 ? uniqueWords / totalWords : 0;
  const fillerCount = words.reduce((acc, w) => (FILLER_WORDS.has(w) ? acc + 1 : acc), 0);
  const hesitationRate = totalWords > 0 ? fillerCount / totalWords : 0;

  return {
    totalWords,
    uniqueWords,
    vocabularyRichness,
    fillerCount,
    hesitationRate
  };
};

const inkStyles: Record<StroopInk, string> = {
  red: 'text-[#EF4444]',
  green: 'text-[#10B981]',
  blue: 'text-[#06B6D4]',
  yellow: 'text-[#FBB020]'
};

const wordLabel: Record<StroopInk, string> = {
  red: 'RED',
  green: 'GREEN',
  blue: 'BLUE',
  yellow: 'YELLOW'
};

const randomInk = (exclude?: StroopInk): StroopInk => {
  const inks: StroopInk[] = ['red', 'green', 'blue', 'yellow'];
  const options = exclude ? inks.filter(i => i !== exclude) : inks;
  return options[Math.floor(Math.random() * options.length)];
};

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
    voice: {
      transcript: '',
      totalWords: 0,
      uniqueWords: 0,
      vocabularyRichness: 0,
      fillerCount: 0,
      hesitationRate: 0
    },
    game: {
      kind: 'stroop',
      trials: 0,
      accuracy: 0,
      averageReactionMs: 0
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

  const steps: Step[] = ['demographics', 'voice', 'stroop', 'nose', 'dream', 'money', 'market', 'stove', 'scam', 'complete'];
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const speechRecognitionRef = useRef<any>(null);
  const [isListening, setIsListening] = useState(false);

  const [stroopStarted, setStroopStarted] = useState(false);
  const [stroopIndex, setStroopIndex] = useState(0);
  const [stroopWord, setStroopWord] = useState<StroopInk>('red');
  const [stroopInk, setStroopInk] = useState<StroopInk>('blue');
  const [stroopCorrect, setStroopCorrect] = useState(0);
  const [stroopTotalMs, setStroopTotalMs] = useState(0);
  const stroopStartTimeRef = useRef<number>(0);

  const stroopTotalTrials = useMemo(() => {
    const education = assessmentData.demographics.education;
    if (education === 'doctorate') return 16;
    if (education === 'masters') return 14;
    return 12;
  }, [assessmentData.demographics.education]);

  useEffect(() => {
    return () => {
      try {
        speechRecognitionRef.current?.stop?.();
      } catch {
        // noop
      }
    };
  }, []);

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

  const updateVoiceTranscript = (transcript: string) => {
    const analyzed = analyzeTranscript(transcript);
    setAssessmentData(prev => ({
      ...prev,
      voice: {
        transcript,
        ...analyzed
      }
    }));
  };

  const startVoiceCapture = () => {
    const SpeechRecognitionCtor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) {
      return;
    }

    try {
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.stop?.();
      }
    } catch {
      // noop
    }

    const recognition = new SpeechRecognitionCtor();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const chunks: string[] = [];
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const result = event.results[i];
        if (result?.[0]?.transcript) chunks.push(result[0].transcript);
      }
      if (chunks.length) {
        const incoming = chunks.join(' ');
        setAssessmentData(prev => {
          const current = prev.voice?.transcript || '';
          const transcript = `${current} ${incoming}`.trim();
          const analyzed = analyzeTranscript(transcript);
          return {
            ...prev,
            voice: {
              transcript,
              ...analyzed
            }
          };
        });
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    speechRecognitionRef.current = recognition;
    setIsListening(true);
    recognition.start();

    window.setTimeout(() => {
      try {
        recognition.stop();
      } catch {
        // noop
      }
    }, 15000);
  };

  const startStroop = () => {
    setStroopStarted(true);
    setStroopIndex(0);
    setStroopCorrect(0);
    setStroopTotalMs(0);
    const word = randomInk();
    const ink = randomInk(word);
    setStroopWord(word);
    setStroopInk(ink);
    stroopStartTimeRef.current = performance.now();
    setAssessmentData(prev => ({
      ...prev,
      game: {
        kind: 'stroop',
        trials: 0,
        accuracy: 0,
        averageReactionMs: 0
      }
    }));
  };

  const answerStroop = (answer: StroopInk) => {
    if (!stroopStarted) return;
    const ms = Math.max(0, Math.round(performance.now() - stroopStartTimeRef.current));
    const correct = answer === stroopInk;

    setStroopTotalMs(prev => prev + ms);
    setStroopCorrect(prev => prev + (correct ? 1 : 0));

    const nextIndex = stroopIndex + 1;
    setStroopIndex(nextIndex);

    if (nextIndex >= stroopTotalTrials) {
      const finalCorrect = stroopCorrect + (correct ? 1 : 0);
      const finalTotalMs = stroopTotalMs + ms;
      const accuracy = Math.round((finalCorrect / stroopTotalTrials) * 100);
      const averageReactionMs = Math.round(finalTotalMs / stroopTotalTrials);

      setAssessmentData(prev => ({
        ...prev,
        game: {
          kind: 'stroop',
          trials: stroopTotalTrials,
          accuracy,
          averageReactionMs
        }
      }));

      setStroopStarted(false);
      return;
    }

    const word = randomInk();
    const ink = Math.random() < 0.75 ? randomInk(word) : word;
    setStroopWord(word);
    setStroopInk(ink);
    stroopStartTimeRef.current = performance.now();
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'demographics':
        return Object.values(assessmentData.demographics).every(val => val !== '');
      case 'voice': {
        const totalWords = assessmentData.voice?.totalWords ?? 0;
        return totalWords >= 15;
      }
      case 'stroop': {
        const trials = assessmentData.game?.trials ?? 0;
        return trials > 0;
      }
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

      case 'voice': {
        const SpeechRecognitionCtor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const supported = !!SpeechRecognitionCtor;
        const voice = assessmentData.voice;

        return (
          <div className="space-y-6">
            <h2 className="text-2xl text-white mb-2">Voice Biomarkers (Temporal Lobe)</h2>
            <p className="text-white/60 mb-6">
              Objective signal. We look for hesitation frequency ("um/uh") and vocabulary richness.
            </p>

            <div className="p-6 bg-white/5 rounded-lg">
              <p className="text-white/80 mb-3">
                Speak for ~15 seconds: describe your morning routine or a recent event.
              </p>

              <div className="flex flex-wrap gap-3 items-center">
                <button
                  onClick={startVoiceCapture}
                  disabled={!supported || isListening}
                  className={`px-6 py-3 rounded-lg transition-all ${
                    supported && !isListening
                      ? 'bg-gradient-to-r from-[#06B6D4] to-[#10B981] text-white'
                      : 'bg-white/5 text-white/30 cursor-not-allowed'
                  }`}
                >
                  {supported ? (isListening ? 'Listening…' : 'Start Voice Test') : 'Speech Recognition Unavailable'}
                </button>

                <div className="text-white/60 text-sm">
                  {supported
                    ? 'You can also paste/edit the transcript below.'
                    : 'Paste a transcript below (demo fallback).'}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-white/80 mb-2">Transcript</label>
                <textarea
                  value={voice?.transcript || ''}
                  onChange={(e) => updateVoiceTranscript(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-[#06B6D4] focus:outline-none"
                  placeholder="Paste or type what you said…"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white/5 rounded-lg">
                <div className="text-white/60 text-xs">TOTAL WORDS</div>
                <div className="text-2xl font-mono text-white">{voice?.totalWords ?? 0}</div>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <div className="text-white/60 text-xs">VOCAB RICHNESS</div>
                <div className="text-2xl font-mono text-white">
                  {Math.round(((voice?.vocabularyRichness ?? 0) * 100))}%
                </div>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <div className="text-white/60 text-xs">HESITATION RATE</div>
                <div className="text-2xl font-mono text-white">
                  {Math.round(((voice?.hesitationRate ?? 0) * 100))}%
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'stroop': {
        const game = assessmentData.game;

        return (
          <div className="space-y-6">
            <h2 className="text-2xl text-white mb-2">Executive Function (Stroop Test)</h2>
            <p className="text-white/60 mb-6">
              Objective signal. This tests inhibition/processing speed by forcing your brain to ignore the word and select the ink color.
            </p>

            {!stroopStarted && (game?.trials ?? 0) === 0 && (
              <div className="p-6 bg-white/5 rounded-lg">
                <p className="text-white/80 mb-4">
                  Tap <span className="text-[#06B6D4] font-medium">the ink color</span>, not the word.
                </p>
                <button
                  onClick={startStroop}
                  className="px-6 py-3 bg-gradient-to-r from-[#06B6D4] to-[#10B981] rounded-lg text-white transition-opacity hover:opacity-90"
                >
                  Start Test ({stroopTotalTrials} trials)
                </button>
              </div>
            )}

            {stroopStarted && (
              <div className="p-6 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-white/60 text-sm font-mono">
                    TRIAL {stroopIndex + 1} / {stroopTotalTrials}
                  </div>
                  <div className="text-white/60 text-sm font-mono">Answer as fast as you can</div>
                </div>

                <div className="text-center py-10">
                  <div className={`text-6xl font-mono tracking-wider ${inkStyles[stroopInk]}`}>{wordLabel[stroopWord]}</div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {(Object.keys(wordLabel) as StroopInk[]).map((ink) => (
                    <button
                      key={ink}
                      onClick={() => answerStroop(ink)}
                      className="py-3 px-4 bg-white/10 text-white/80 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      {wordLabel[ink]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!stroopStarted && (game?.trials ?? 0) > 0 && (
              <div className="p-6 bg-white/5 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="text-white/60 text-xs">TRIALS</div>
                    <div className="text-2xl font-mono text-white">{game?.trials}</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="text-white/60 text-xs">ACCURACY</div>
                    <div className="text-2xl font-mono text-white">{game?.accuracy}%</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <div className="text-white/60 text-xs">AVG REACTION</div>
                    <div className="text-2xl font-mono text-white">{game?.averageReactionMs}ms</div>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    onClick={startStroop}
                    className="px-6 py-3 bg-white/10 text-white/80 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Retake Test
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      }

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
