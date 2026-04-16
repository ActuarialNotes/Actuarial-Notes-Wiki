// Maps quiz exam topics to the accent colour classes defined in index.css.
// Colours match the wiki's TRACKS definitions:
//   Exam P  → 'blue'   (#2563eb / #3b82f6)
//   Exam FM → 'indigo' (#4f46e5 / #6366f1)

const EXAM_CLASSES: Record<string, string> = {
  'Probability': 'exam-p',
  'Financial Mathematics': 'exam-fm',
}

const ALL_EXAM_CLASSES = Object.values(EXAM_CLASSES)

export function setExamAccent(topic: string) {
  const html = document.documentElement
  html.classList.remove(...ALL_EXAM_CLASSES)
  const cls = EXAM_CLASSES[topic]
  if (cls) html.classList.add(cls)
}
