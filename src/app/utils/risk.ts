import type { CognitiveAssessmentData } from '../components/screens/CognitiveAssessmentScreen';

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export function computeCognitiveRisk(data: CognitiveAssessmentData): number {
  const noseRisk = data.questions.nose ? 15 : 0;
  const dreamRisk = data.questions.dream ? 15 : 0;

  const moneyMap: Record<number, number> = {
    1: 0,
    2: 5,
    3: 10,
    4: 15,
    5: 20
  };
  const moneyRisk = moneyMap[data.questions.money] ?? 10;

  const marketMap: Record<string, number> = { A: 0, B: 8, C: 15 };
  const stoveMap: Record<string, number> = { A: 0, B: 8, C: 15 };
  const scamMap: Record<string, number> = { A: 0, B: 5, C: 15 };

  const marketRisk = marketMap[data.scenarios.market] ?? 0;
  const stoveRisk = stoveMap[data.scenarios.stove] ?? 0;
  const scamRisk = scamMap[data.scenarios.scam] ?? 0;

  const ageNum = Number.parseInt(data.demographics.age, 10);
  const ageRisk = Number.isFinite(ageNum) ? clamp(Math.round((ageNum - 50) / 2), 0, 15) : 0;

  const total = noseRisk + dreamRisk + moneyRisk + marketRisk + stoveRisk + scamRisk + ageRisk;
  return clamp(Math.round(total), 0, 100);
}
