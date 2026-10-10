---
target: Concepts/Medical Payments Coverage.md
created: 2026-10-10
---

## [F-001] Expense list not in the cited PAP edition
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv09
- date: 2026-10-10
- severity: minor
- status: open
- locus: 'What counts as an expense' bullet, first sentence
- claim: Covered services include medical, surgical, X-ray, dental, ambulance, hospital and professional nursing services, prosthetic devices and funeral services.
- evidence: ISO PP 00 01 09 18 Part B Insuring Agreement A (p.5) says only 'We will pay reasonable expenses incurred for necessary medical and funeral services because of "bodily injury" ... services rendered within three years'. The enumerated list does not appear anywhere in the 09 18 PAP; it is the list in the HO-3's Coverage F (HO 00 03 05 11 Section II B, p.17). The claim is not wrong in substance, but the page attributes to Part B a list the form does not print.
- source_rank: 2
- proposed_action: Delete the enumerated sentence, or attribute it ('medical services such as ...') without presenting it as form wording.
- applied: false
- fingerprint: 69c9e2b147a6

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv09
- date: 2026-10-10
- status_set: verified
- confidence: high
- checks_run: every rule, number and list checked against the cited form text; worked examples recomputed; links resolve; U.S. framing; exam-section references checked against Exam DISC-IA (CAS).md
- sources_checked: ISO Personal Auto Policy PP 00 01 09 18 (Virginia SCC specimen), Part B, pp.5–6; Part A Limit of Liability B, p.4, sha256:20a8001d97dcc09d70ab2a76579414c3b869ecb4afe23d2446b844ad4c7780c8 — https://www.scc.virginia.gov/media/sccvirginiagov-home/regulated-industries/insurance/insurance-companies/property-casualty-companies/personal-commercial-auto-forms/pp-00-01-09-18.pdf
- note: Every rule on the page (insureds, three-year window, 13 exclusions, per-person limit, other insurance, no duplicate payment) matches PP 00 01 09 18 Part B; both examples recompute (14,200; four-case family example). One minor open finding: the enumerated expense list is not in the 09 18 form.

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv09
- date: 2026-10-10
- resolves: F-001
- status: resolved
- note: Applied: the enumerated list is replaced by what PP 00 01 09 18 Part B Insuring Agreement A (p.5) says — reasonable expenses incurred for necessary medical and funeral services — and that the form lists no particular kinds of service.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv09
- date: 2026-10-10
- status_set: verified
- confidence: high
- checks_run: every rule, number and list checked against the cited form text; worked examples recomputed; links resolve; U.S. framing; exam-section references checked against Exam DISC-IA (CAS).md
- sources_checked: ISO Personal Auto Policy PP 00 01 09 18 (Virginia SCC specimen), Part B, pp.5–6; Part A Limit of Liability B, p.4, sha256:20a8001d97dcc09d70ab2a76579414c3b869ecb4afe23d2446b844ad4c7780c8 — https://www.scc.virginia.gov/media/sccvirginiagov-home/regulated-industries/insurance/insurance-companies/property-casualty-companies/personal-commercial-auto-forms/pp-00-01-09-18.pdf; ISO Personal Auto Policy PP 00 01 09 18 (Virginia SCC specimen), Part B Insuring Agreement A, p.5 (re-check of the F-001 fix), sha256:20a8001d97dcc09d70ab2a76579414c3b869ecb4afe23d2446b844ad4c7780c8 — https://www.scc.virginia.gov/media/sccvirginiagov-home/regulated-industries/insurance/insurance-companies/property-casualty-companies/personal-commercial-auto-forms/pp-00-01-09-18.pdf
- note: Every rule on the page (insureds, three-year window, 13 exclusions, per-person limit, other insurance, no duplicate payment) matches PP 00 01 09 18 Part B; both examples recompute (14,200; four-case family example). F-001 fixed this run; previously one minor finding: the enumerated expense list is not in the 09 18 form. Re-verified after the fix: the edited sentence checked against the same source.
