---
target: Concepts/Insurable Risk.md
created: 2026-10-10
---

## [F-001] Flood example: expected cost per home divides by all 10,000 homes, not the 4,000 exposed
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- severity: minor
- status: open
- locus: example 'How Correlation Defeats Pooling', closing paragraph
- claim: 'The flood's expected cost is only \$800 a home a year, so the premium is affordable.'
- evidence: Recomputed from the example's own data (rank 5, falsifies): E[S_flood] = 0.01 x 800,000,000 = 8,000,000, borne by the 4,000 valley homes the flood can reach, so 8,000,000 / 4,000 = 2,000 per exposed home (= 0.01 x 200,000). 800 is 8,000,000 spread over all 10,000 homes, 6,000 of which have no flood exposure. Every other figure in the example reproduces: E[S_fire] = 4,000,000; SD = 200,000 x sqrt(19.96) = 893,532; CV 0.223; SD_flood = 800,000,000 x sqrt(0.0099) = 79,598,995; CV 9.95; 800M/8M = 100; 1 - 1/sqrt(2) = 29.3%.
- source_rank: 5
- proposed_action: \$2,000 a valley home a year.
- applied: true
- fingerprint: 6e655287087b

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Applied in the working tree: 'only \$2,000 a valley home a year' (0.01 x 200,000).

## [F-002] The Institutes' six-item list rests only on a third-party flashcard deck
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- severity: minor
- status: open
- locus: lead paragraph ('The Institutes list six: ...') and the six bullets' framing
- claim: The Institutes list six characteristics of an ideally insurable loss exposure: pure risk, accidental, definite and measurable, large number of similar units, independent and not catastrophic, economically feasible premium.
- evidence: The Institutes' DISC-IA course text is not public. The only source found this run carrying exactly this six-item list is a Brainscape flashcard deck labelled 'CAS Online Course 1' (Assignment 5, card 5: 'Pure risk; Fortuitous losses (from insured's standpoint); Definite and measurable; Large number of similar exposure units; Independent and not catastrophic; Economically feasible premium'), read via WebFetch — a weak rank-3 source. The common textbook list (Rejda: large number of exposure units, accidental, determinable and measurable, no catastrophic loss, calculable chance of loss, economically feasible premium) differs in two items. The page's mathematics checks (equicorrelated variance of a mean; limit (sigma/mu)sqrt(rho)).
- source_rank: 3
- proposed_action: Read The Institutes' DISC-IA text (or the CPCU 500 text it follows) and cite it, or attribute the list as a summary rather than The Institutes' wording.
- applied: false
- fingerprint: a02e6b186e79

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- status_set: in_review
- checks_run: Both examples recomputed before reading (figures in F-001). CV formula re-derived: Var(mean) = sigma^2[1 + (n-1)rho]/n for equicorrelated units; rho = 0 gives 1/sqrt(n); n -> infinity gives (sigma/mu)sqrt(rho). Flood and war exclusions in the homeowners form: HO 00 03 05 11 Section I Exclusions A.3, A.6. The six-item list and its attribution: only a flashcard deck (F-002).
- sources_checked: ISO HO 00 03 05 11, Homeowners 3 – Special Form (Maine Bureau of Insurance copy), Section I Exclusions A.3 water/flood, A.6 war (pp.12-13), sha256:ac539e500a5767946452d1e6ad4c4b7dcc395c6c65c48fc3a8ac92a7c330a1d4 — https://www.maine.gov/pfr/insurance/sites/maine.gov.pfr.insurance/files/inline-files/ho00-03-05-11-homeowners3-special-form.pdf; Brainscape flashcards 'Assignment 5: Insurance as a Risk Management Technique' (CAS Online Course 1 pack), card 5, read via WebFetch 2026-10-10, no digest — https://brainscape.com/flashcards/assignment-5-insurance-as-a-risk-managem-12871202/packs/21196986
- note: Left in_review: the list's attribution to The Institutes needs The Institutes' own text, which is not public. F-001 (arithmetic) fixed.

## [F-002/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- resolves: F-002
- status: resolved
- note: Lead-authorized clean-up, applied: 'The Institutes list six:' restated as 'Six characteristics are commonly listed:'. The list now rests on what was read: Wikipedia 'Insurability' (large number of similar exposure units; definite loss; accidental loss that is 'pure', speculative business risks generally not insurable; affordable premium; losses ideally independent and non-catastrophic), IRMI 'pure risk' and 'speculative risk' (pure risks generally insurable, speculative generally not), and the CAS Online Course 1 flashcard deck carrying the same six items.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv06
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Re-verify after F-002's restatement. Each of the six characteristics is matched by two independent rank-3 sources (Wikipedia 'Insurability' and the flashcard deck; IRMI for pure vs speculative risk). Mathematics and both examples re-checked as in the earlier pass (F-001's 2,000 per valley home in place).
- sources_checked: Wikipedia, 'Insurability' (fetched 2026-10-10), sha256:68a5a12ac2c667fd605a4bb9c343733bee449dc6a0d6e8c1adc8928182da0233 — https://en.wikipedia.org/wiki/Insurability; IRMI Insurance Glossary, 'pure risk' (fetched 2026-10-10), sha256:53c02db03b0c4161afef15f3c858c900ee18e236a7a33bad7d389f085eabe39d — https://www.irmi.com/term/insurance-definitions/pure-risk; IRMI Insurance Glossary, 'speculative risk' (fetched 2026-10-10), sha256:33cd8e29012019052d89c1dafc07296e1b395ae4bb0addc4f1e6b9d23ade348e — https://www.irmi.com/term/insurance-definitions/speculative-risk; ISO HO 00 03 05 11, Homeowners 3 – Special Form (Maine Bureau of Insurance copy), Section I Exclusions A.3 water/flood, A.6 war (pp.12-13), sha256:ac539e500a5767946452d1e6ad4c4b7dcc395c6c65c48fc3a8ac92a7c330a1d4 — https://www.maine.gov/pfr/insurance/sites/maine.gov.pfr.insurance/files/inline-files/ho00-03-05-11-homeowners3-special-form.pdf; Brainscape flashcards 'Assignment 5: Insurance as a Risk Management Technique' (CAS Online Course 1 pack), card 5, read via WebFetch 2026-10-10, no digest — https://brainscape.com/flashcards/assignment-5-insurance-as-a-risk-managem-12871202/packs/21196986
- note: Medium: rank-3 sources only, two independent ones agreeing on each item, as the brief allows.
