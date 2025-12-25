import type { CognitiveAssessmentData } from '../components/screens/CognitiveAssessmentScreen';

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const educationTier = (education: string | undefined) => {
  switch (education) {
    case 'doctorate':
      return 'doctorate';
    case 'masters':
      return 'masters';
    case 'bachelors':
      return 'bachelors';
    default:
      return 'other';
  }
};

const expectedStroopAccuracy = (tier: ReturnType<typeof educationTier>) => {
  switch (tier) {
    case 'doctorate':
      return 92;
    case 'masters':
      return 90;
    case 'bachelors':
      return 88;
    default:
      return 85;
  }
};

const expectedVocabularyRichness = (tier: ReturnType<typeof educationTier>) => {
  switch (tier) {
    case 'doctorate':
      return 0.45;
    case 'masters':
      return 0.42;
    case 'bachelors':
      return 0.4;
    default:
      return 0.35;
  }
};

const educationReactionAdjustmentMs = (tier: ReturnType<typeof educationTier>) => {
  // Cognitive reserve: for higher education, average performance should be better,
  // so we make thresholds stricter (lower expected ms).
  switch (tier) {
    case 'doctorate':
      return -75;
    case 'masters':
      return -50;
    case 'bachelors':
      return -25;
    default:
      return 0;
  }
};

const computeVoiceRisk = (data: CognitiveAssessmentData): number => {
  if (!data.voice) return 0;

  const tier = educationTier(data.demographics.education);
  const expectedRichness = expectedVocabularyRichness(tier);
  const richness = data.voice.vocabularyRichness ?? 0;
  const hesitationRate = data.voice.hesitationRate ?? 0;

  // Richness deficit: 0..10 points
  const richnessDeficit = clamp((expectedRichness - richness) / 0.18, 0, 1);
  const richnessRisk = Math.round(richnessDeficit * 10);

  // Hesitation excess: 0..10 points (target <= 6% filler words)
  const hesitationExcess = clamp((hesitationRate - 0.06) / 0.12, 0, 1);
  const hesitationRisk = Math.round(hesitationExcess * 10);

  return clamp(richnessRisk + hesitationRisk, 0, 20);
};

const computeStroopRisk = (data: CognitiveAssessmentData): number => {
  if (!data.game || data.game.kind !== 'stroop' || (data.game.trials ?? 0) <= 0) return 0;

  const ageNum = Number.parseInt(data.demographics.age, 10);
  const age = Number.isFinite(ageNum) ? ageNum : 50;

  const tier = educationTier(data.demographics.education);
  const expectedAcc = expectedStroopAccuracy(tier);

  // Age normalization layer (5-10ms/decade): use 8ms per decade as a middle.
  const ageAdjustmentMs = ((age - 20) / 10) * 8;
  const expectedMs = 650 + ageAdjustmentMs + educationReactionAdjustmentMs(tier);

  const accuracy = data.game.accuracy ?? 0;
  const avgMs = data.game.averageReactionMs ?? 0;

  // Accuracy deficit: 0..12 points
  const accDeficit = clamp((expectedAcc - accuracy) / 20, 0, 1);
  const accuracyRisk = Math.round(accDeficit * 12);

  // Reaction penalty: 0..18 points
  const rtDelta = avgMs - expectedMs;
  const rtPenalty = clamp(rtDelta / 450, 0, 1);
  const reactionRisk = Math.round(rtPenalty * 18);

  return clamp(accuracyRisk + reactionRisk, 0, 30);
};

export function computeCognitiveRisk(data: CognitiveAssessmentData): number {
  const voiceRisk = computeVoiceRisk(data);
  const stroopRisk = computeStroopRisk(data);

  const noseRisk = data.questions.nose ? 12 : 0;
  const dreamRisk = data.questions.dream ? 12 : 0;

  const moneyMap: Record<number, number> = {
    1: 0,
    2: 4,
    3: 8,
    4: 12,
    5: 16
  };
  const moneyRisk = moneyMap[data.questions.money] ?? 8;

  const marketMap: Record<string, number> = { A: 0, B: 6, C: 10 };
  const stoveMap: Record<string, number> = { A: 0, B: 6, C: 10 };
  const scamMap: Record<string, number> = { A: 0, B: 4, C: 10 };

  const marketRisk = marketMap[data.scenarios.market] ?? 0;
  const stoveRisk = stoveMap[data.scenarios.stove] ?? 0;
  const scamRisk = scamMap[data.scenarios.scam] ?? 0;

  const total = voiceRisk + stroopRisk + noseRisk + dreamRisk + moneyRisk + marketRisk + stoveRisk + scamRisk;
  return clamp(Math.round(total), 0, 100);
}
