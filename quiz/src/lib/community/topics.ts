// The Community tab's **topics** — what a reader browses and follows
// (docs/community.md). One catalogue, read by every surface: the topic pills,
// a topic's own page, the For You feed and the badges on a post or an event.
//
// A topic is matched off the *words* of what it tags — a post's title and the
// start of its text, an event's title and summary — by plain patterns. That is
// deliberate: the tags are a reading aid, not a claim about the post, so they
// must be a rule a reader could apply by eye, never a model's judgment. A
// child topic (one exam) implies its parent (Exams); a pattern list errs on
// missing a post rather than mis-tagging one, so the ambiguous words ("P" on
// its own, "bill", "R") are left out. Pure and tested.

export type TopicId =
  | 'exams'
  | 'exam-p'
  | 'exam-fm'
  | 'exam-fam'
  | 'exam-srm'
  | 'exam-pa'
  | 'exam-altam'
  | 'exam-astam'
  | 'exam-mas-i'
  | 'exam-mas-ii'
  | 'exam-5'
  | 'exam-6'
  | 'exam-7'
  | 'exam-8'
  | 'exam-9'
  | 'careers'
  | 'reforms'
  | 'ai-tech'
  | 'pc'
  | 'life-health'
  | 'climate'
  | 'credentials'
  | 'events'

export interface CommunityTopic {
  id: TopicId
  label: string
  /** One line under the topic's name on its page. */
  blurb: string
  /** A child topic is one corner of its parent; matching it tags the parent too. */
  parent?: TopicId
  patterns: readonly RegExp[]
}

const exam = (id: TopicId, label: string, patterns: RegExp[]): CommunityTopic => ({
  id,
  label,
  blurb: `Posts and events that mention ${label}.`,
  parent: 'exams',
  patterns,
})

export const COMMUNITY_TOPICS: readonly CommunityTopic[] = [
  {
    id: 'exams',
    label: 'Exams',
    blurb: 'Sittings, study plans, results and the manuals people study from.',
    patterns: [
      /\bexams?\b/i,
      /\bstudy (manual|plan|hours|schedule)s?\b/i,
      /\b(passed|failed|pass mark|pass rate|results)\b/i,
      /\bsittings?\b/i,
      /\b(ACTEX|Coaching Actuaries|TIA|Infinite Actuary|Rising Fellow|ASM|AnalystPrep|Adapt)\b/,
    ],
  },
  exam('exam-p', 'Exam P', [/\bexam\s*p(-1)?\b/i, /\bp\s+exam\b/i, /\bP\/FM\b/]),
  exam('exam-fm', 'Exam FM', [/\bexam\s*fm\b/i, /\bFM\b/]),
  exam('exam-fam', 'Exam FAM', [/\bFAM(-[SL])?\b/, /\bexam\s*fam\b/i]),
  exam('exam-srm', 'Exam SRM', [/\bSRM\b/, /\bexam\s*srm\b/i]),
  exam('exam-pa', 'Exam PA', [/\bexam\s*pa\b/i, /\bPA exam\b/]),
  exam('exam-altam', 'Exam ALTAM', [/\bALTAM\b/i]),
  exam('exam-astam', 'Exam ASTAM', [/\bASTAM\b/i]),
  exam('exam-mas-i', 'Exam MAS-I', [/\bMAS[-\s]?(I|1)\b/]),
  exam('exam-mas-ii', 'Exam MAS-II', [/\bMAS[-\s]?(II|2)\b/]),
  exam('exam-5', 'Exam 5', [/\b(exam|cas)\s*5\b/i]),
  exam('exam-6', 'Exam 6', [/\b(exam|cas)\s*6[CUIT]?\b/i]),
  exam('exam-7', 'Exam 7', [/\b(exam|cas)\s*7\b/i]),
  exam('exam-8', 'Exam 8', [/\b(exam|cas)\s*8\b/i]),
  exam('exam-9', 'Exam 9', [/\b(exam|cas)\s*9\b/i]),
  {
    id: 'careers',
    label: 'Careers',
    blurb: 'Jobs, internships, interviews, offers and pay.',
    patterns: [
      /\b(jobs?|internships?|interns?|interview(s|ing|ed)?|job offers?|offers?|salary|salaries|recruiters?|hiring|resumes?|careers?|entry[-\s]level|promotions?|raises?|bonus(es)?|layoffs?|laid off|job hunt(ing)?)\b/i,
    ],
  },
  {
    id: 'reforms',
    label: 'Reforms & Regulation',
    blurb: 'Rule changes, regulators and the reforms that reshape the work.',
    patterns: [
      /\b(reforms?|regulat(ion|ions|or|ors|ory)|legislation|legislative)\b/i,
      /\b(IFRS\s*17|LDTI|OSFI|NAIC|FSRA|AMF|LICAT|MCT|ORSA|Solvency II|statutory accounting)\b/i,
      /\b(rate filings?|rate caps?|tort reform|no-fault|Prop(osition)?\s*103)\b/i,
    ],
  },
  {
    id: 'ai-tech',
    label: 'AI & Technology',
    blurb: 'Models, code and the tools that are changing actuarial work.',
    patterns: [
      /\bAI\b/,
      /\b(ChatGPT|LLMs?|large language models?|machine learning|deep learning|neural net\w*|copilot|Claude)\b/i,
      /\b(python|SQL|VBA|RStudio|programming|coding|automation|data science|predictive model\w*)\b/i,
    ],
  },
  {
    id: 'pc',
    label: 'Property & Casualty',
    blurb: 'Reserving, ratemaking, reinsurance and the CAS side of the profession.',
    patterns: [
      /\b(P&C|P & C|property (and|&) casualty|casualty)\b/i,
      /\b(reserving|ratemaking|reinsurance|homeowners?|workers'? comp(ensation)?|auto insurance|commercial lines|personal lines|loss reserves?)\b/i,
      /\b(CAS|ACAS|FCAS)\b/,
    ],
  },
  {
    id: 'life-health',
    label: 'Life, Health & Pensions',
    blurb: 'Life insurance, annuities, health, retirement and the SOA side.',
    patterns: [
      /\b(life insurance|annuit(y|ies)|health (insurance|care|actuar\w*)|healthcare|pensions?|retirement|mortality|longevity|long[-\s]term care|medicare|medicaid|group benefits)\b/i,
      /\b(SOA|ASA|FSA)\b/,
    ],
  },
  {
    id: 'climate',
    label: 'Climate & Catastrophe',
    blurb: 'Climate risk, catastrophe models and the events that test them.',
    patterns: [/\b(climate|wildfires?|hurricanes?|floods?|flooding|catastroph\w*|cat models?|earthquakes?|severe convective|ESG)\b/i],
  },
  {
    id: 'credentials',
    label: 'Credentials & Professionalism',
    blurb: 'Associateship, fellowship, professionalism and continuing education.',
    patterns: [
      /\b(ASA|FSA|ACAS|FCAS|ACIA|FCIA|CERA|CSPA|APC)\b/,
      /\b(credentials?|fellowship|associateship|professionalism|continuing education|CE credits?|CPD)\b/i,
    ],
  },
  {
    id: 'events',
    label: 'Meetings & Events',
    blurb: 'Annual meetings, seminars, webinars and local get-togethers.',
    patterns: [/\b(conferences?|annual meetings?|spring meetings?|seminars?|webinars?|meetups?|meet-ups?|symposi(um|a)|networking events?|summits?|conventions?)\b/i],
  },
]

const BY_ID = new Map(COMMUNITY_TOPICS.map(t => [t.id, t]))

export function topicById(id: string): CommunityTopic | undefined {
  return BY_ID.get(id as TopicId)
}

export function isTopicId(id: unknown): id is TopicId {
  return typeof id === 'string' && BY_ID.has(id as TopicId)
}

/** The top-level topics, in catalogue order — the pill row. */
export const ROOT_TOPICS: readonly CommunityTopic[] = COMMUNITY_TOPICS.filter(t => !t.parent)

/** A topic's children, in catalogue order (the exams under Exams). */
export function childTopics(id: TopicId): CommunityTopic[] {
  return COMMUNITY_TOPICS.filter(t => t.parent === id)
}

/**
 * The topics some text is about, in catalogue order. A child that matches
 * brings its parent with it, so following Exams also shows a post that only
 * names Exam FM.
 */
export function topicsFor(text: string): TopicId[] {
  if (!text) return []
  const hit = new Set<TopicId>()
  for (const topic of COMMUNITY_TOPICS) {
    if (topic.patterns.some(p => p.test(text))) {
      hit.add(topic.id)
      if (topic.parent) hit.add(topic.parent)
    }
  }
  return COMMUNITY_TOPICS.filter(t => hit.has(t.id)).map(t => t.id)
}

/**
 * Whether something tagged `tags` belongs under `topic`. A parent topic
 * includes everything tagged with any of its children.
 */
export function inTopic(tags: readonly TopicId[], topic: TopicId): boolean {
  if (tags.includes(topic)) return true
  return tags.some(t => BY_ID.get(t)?.parent === topic)
}

/** Whether something tagged `tags` is in any of the followed topics. */
export function inAnyTopic(tags: readonly TopicId[], followed: readonly TopicId[]): boolean {
  return followed.some(f => inTopic(tags, f))
}

/** A follow set read back from storage: known ids only, each once, in catalogue order. */
export function cleanFollows(raw: unknown): TopicId[] {
  if (!Array.isArray(raw)) return []
  const wanted = new Set(raw.filter(isTopicId))
  return COMMUNITY_TOPICS.filter(t => wanted.has(t.id)).map(t => t.id)
}

/** The follow set with `id` toggled. */
export function toggleFollow(follows: readonly TopicId[], id: TopicId): TopicId[] {
  return follows.includes(id) ? follows.filter(f => f !== id) : cleanFollows([...follows, id])
}

/** A topic's own page. */
export function topicRoute(id: TopicId): string {
  return `/community/topic/${id}`
}
