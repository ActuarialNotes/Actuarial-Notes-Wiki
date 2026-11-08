// The ticks key for an examiner's report's rubric, beside a part's samples'
// 0, 1, 2 … (lib/essayChecklist.ts). Its own module so the quiz card can name
// it without pulling the checklist code into the first page's bundle — that
// loads lazily, with the other answer checks (hooks/useAnswerChecks.ts).
export const RUBRIC = -1
