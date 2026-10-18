// **Regional variants** — one exam sat under a syllabus per jurisdiction. CAS
// Exam 6 is 6C (Canada), 6U (United States), 6I (International) and 6T (the
// CAS's credit for Chinese Taipei's exams); the SOA's GH 201 and ILA 201 have
// U.S., Canadian and International editions. Each variant has its own study
// guide, but they are one exam on the tracks (`CAS-6`, `FSA-GH201`), so an exam
// strip shows the exam once and asks for the region underneath
// (`components/ExamVariantPicker.tsx`) — the Resources page and the Store.
//
// Pure and tested.

/** The region a variant's closing letter names: `6C` → Canada. */
const REGION: Readonly<Record<string, string>> = {
  C: 'Canada',
  U: 'United States',
  I: 'International',
  T: 'Chinese Taipei',
}

/** A variant's code, from its label: `Exam 6C` → `6C`, `Exam GH-201U` → `GH-201U`. */
export function variantCode(label: string): string {
  return label.replace(/^Exam\s+/i, '').trim()
}

/** The region a variant is for — `Exam 6C` → "Canada" — or null for a label with no regional letter. */
export function variantRegion(label: string): string | null {
  const m = /\d([CUIT])$/.exec(variantCode(label))
  return m ? REGION[m[1]!]! : null
}

/** The exam a variant is one of: `Exam 6C` → "Exam 6", `Exam GH-201U` → "Exam GH-201". */
export function variantExamName(label: string): string {
  return variantRegion(label) ? label.replace(/[CUIT]$/, '') : label
}

export interface ExamVariantGroup<T extends { label: string; key: string }> {
  /** The exam_progress key the variants share. */
  key: string
  /** The exam's own name, without a region: "Exam 6". */
  name: string
  /** The strip entries it stands for, in their order — one for an exam with no variants. */
  members: T[]
}

/**
 * A strip of exams with each exam's regional variants folded into one entry —
 * entries that share a progress key and each name a region. Order is kept: a
 * group stands where its first variant stood.
 */
export function groupExamVariants<T extends { label: string; key: string }>(strip: readonly T[]): ExamVariantGroup<T>[] {
  const groups: ExamVariantGroup<T>[] = []
  const byKey = new Map<string, ExamVariantGroup<T>>()
  for (const entry of strip) {
    const held = byKey.get(entry.key)
    if (held && variantRegion(entry.label) && held.members.every(m => variantRegion(m.label))) {
      held.members.push(entry)
      held.name = variantExamName(held.members[0]!.label)
      continue
    }
    const group = { key: entry.key, name: entry.label, members: [entry] }
    groups.push(group)
    if (!held) byKey.set(entry.key, group)
  }
  return groups
}
