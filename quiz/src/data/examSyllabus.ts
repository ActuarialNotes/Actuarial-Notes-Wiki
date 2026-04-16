export interface SubtopicDef {
  name: string
}

export interface TopicDef {
  name: string
  subtopics: SubtopicDef[]
}

export interface ExamSyllabus {
  examId: string
  /** Matches QuizSession.topic (e.g. "Probability") */
  examTopic: string
  examLabel: string
  topics: TopicDef[]
}

// Subtopic names must match the values in EXAM_SUBTOPICS (Landing.tsx) exactly,
// as they are what gets stored in quiz_sessions.subtopic.
export const EXAM_SYLLABI: ExamSyllabus[] = [
  {
    examId: 'P',
    examTopic: 'Probability',
    examLabel: 'Exam P',
    topics: [
      {
        name: 'General Probability',
        subtopics: [
          { name: 'General Probability' },
          { name: 'Bayes Theorem' },
          { name: 'Combinatorics' },
        ],
      },
      {
        name: 'Univariate Random Variables',
        subtopics: [
          { name: 'Univariate Random Variables' },
          { name: 'Expected Value' },
          { name: 'Common Distributions' },
        ],
      },
      {
        name: 'Multivariate Random Variables',
        subtopics: [
          { name: 'Multivariate Random Variables' },
        ],
      },
    ],
  },
  {
    examId: 'FM',
    examTopic: 'Financial Mathematics',
    examLabel: 'Exam FM',
    topics: [
      {
        name: 'Interest Theory',
        subtopics: [
          { name: 'Time Value of Money' },
          { name: 'Interest Rates' },
          { name: 'Annuities' },
          { name: 'Loans' },
          { name: 'Bonds' },
        ],
      },
      {
        name: 'Derivatives',
        subtopics: [
          { name: 'Derivatives' },
        ],
      },
    ],
  },
]
