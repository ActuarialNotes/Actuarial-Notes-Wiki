// A resource page's `Authors:` front matter is one string, written the way the
// book's own title page writes it — either "Given Surname, Given Surname"
// ("Dennis D. Wackerly, William Mendenhall, Richard L. Scheaffer") or the
// citation form, where the comma separates a surname from its initials
// ("Hogg, R.V., Tanis, E.A., and Zimmerman, D.L."). The metadata cards show
// authors as pills, so the string has to be split into one name per pill — and
// a naive comma split turns the second form into "Hogg" / "R.V." / "Tanis".
//
// So: split on commas, semicolons and conjunctions, then fold the fragments
// that can't stand alone as a name (bare initials, a suffix, "et al.") back
// onto the name before them.

/** "R.V.", "A.J.", "Y.-K.", "S. M." — initials, never a whole name. */
const INITIALS_RE = /^[A-Z]\.(?:[-\s]?[A-Z]\.)*$/

/** Fragments that trail a name rather than being one. */
const TRAILING_RE = /^(?:jr\.?|sr\.?|ii|iii|iv|et al\.?|ph\.?d\.?|m\.?d\.?|f?[cs]as|as[ab])$/i

const CONJUNCTION_RE = /\s+(?:and|&)\s+/i
/** A conjunction left stranded at the front by the comma split ("and Zimmerman"). */
const LEADING_CONJUNCTION_RE = /^(?:and|&)\s+/i

// A person's name is a few capitalised words; an organisation's runs longer and
// leans on lowercase connectives ("American Academy of Actuaries").
function looksLikePersonName(part: string): boolean {
  const words = part.split(/\s+/).filter(Boolean)
  return words.length > 0 && words.length <= 4 && words.every(w => !/^[a-z]/.test(w))
}

// "and" joins two authors ("Dobson, A.J. and Barnett, A.G.") but also sits
// inside plenty of organisation names, so only treat it as a separator when
// both sides read as a person's name.
function splitConjunctions(part: string): string[] {
  const pieces = part.split(CONJUNCTION_RE).map(p => p.trim()).filter(Boolean)
  if (pieces.length < 2) return [part]
  if (!pieces.every(looksLikePersonName)) return [part]
  return pieces
}

/**
 * Split an author front-matter string into individual author names, in the
 * order they were written. Returns `[]` for a missing or blank value.
 */
export function splitAuthors(raw?: string | null): string[] {
  if (!raw) return []
  const text = raw.replace(/\s+/g, ' ').trim()
  if (!text) return []

  const fragments = text
    .split(/\s*[;,]\s*/)
    .map(p => p.trim().replace(LEADING_CONJUNCTION_RE, ''))
    .filter(Boolean)
    .flatMap(splitConjunctions)

  const names: string[] = []
  for (const fragment of fragments) {
    const trailing = INITIALS_RE.test(fragment) || TRAILING_RE.test(fragment)
    if (trailing && names.length > 0) {
      names[names.length - 1] = `${names[names.length - 1]}, ${fragment}`
    } else {
      names.push(fragment)
    }
  }
  return names
}
