// The answer checks (docs/answer-checking.md), as one chunk the app loads
// when a written part is first locked in (hooks/useAnswerChecks.ts) rather
// than with the first page: nothing reads them before an answer is confirmed.
export { checkNumericAnswer, numericCheckMessage } from './numericCheck'
export { checklistMessage, checklistSuggestion, partChecklist } from './essayChecklist'
