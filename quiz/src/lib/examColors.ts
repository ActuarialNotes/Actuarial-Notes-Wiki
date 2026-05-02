export const EXAM_COLORS: Record<string, string> = {
  'Probability': 'hsl(221, 83%, 53%)',
  'Financial Mathematics': 'hsl(243, 75%, 59%)',
}

export function getExamColor(topic: string): string | undefined {
  return EXAM_COLORS[topic]
}
