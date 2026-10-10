---
target: Concepts/HO-3 Coverage Conditions.md
created: 2026-10-10
---

## [F-001] Severability statement ignores the form's "an insured" rule
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv09
- date: 2026-10-10
- severity: minor
- status: open
- locus: 'Severability of insurance' bullet
- claim: The insurance applies separately to each insured, so an exclusion that applies to one insured does not by itself remove coverage for another...
- evidence: HO 00 03 05 11 Section II – Conditions B (p.22) says only 'This insurance applies separately to each "insured". This condition will not increase our limit of liability for any one "occurrence".' Definition B.5 (p.2) adds: 'Under both Sections I and II, when the word an immediately precedes the word "insured", the words an "insured" together mean one or more "insureds".' Exclusions phrased 'an insured', such as E.1 (expected or intended by an "insured", p.19), therefore remove coverage for every insured when any one insured expected or intended the injury. The page's general rule is true only for exclusions phrased 'that insured' or 'you'.
- source_rank: 2
- proposed_action: Qualify the sentence: severability keeps one insured's exclusion from reaching another except where the exclusion is phrased 'an insured', which the form defines as one or more insureds.
- applied: false
- fingerprint: 0d65f0d5de2c

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv09
- date: 2026-10-10
- status_set: verified
- confidence: high
- checks_run: every rule, number and list checked against the cited form text; worked examples recomputed; links resolve; U.S. framing; exam-section references checked against Exam DISC-IA (CAS).md
- sources_checked: ISO Homeowners 3 – Special Form HO 00 03 05 11 (Maine Bureau of Insurance copy), Section II – Conditions A–J and Sections I and II – Conditions A–G, pp.21–24, sha256:ac539e500a5767946452d1e6ad4c4b7dcc395c6c65c48fc3a8ac92a7c330a1d4 — https://www.maine.gov/pfr/insurance/sites/maine.gov.pfr.insurance/files/inline-files/ho00-03-05-11-homeowners3-special-form.pdf; ISO Personal Auto Policy PP 00 01 09 18 (Virginia SCC specimen), Part F Termination, p.13, sha256:20a8001d97dcc09d70ab2a76579414c3b869ecb4afe23d2446b844ad4c7780c8 — https://www.scc.virginia.gov/media/sccvirginiagov-home/regulated-industries/insurance/insurance-companies/property-casualty-companies/personal-commercial-auto-forms/pp-00-01-09-18.pdf
- note: Section II conditions and Sections I and II conditions (liberalization 60 days, cancellation 10/10/30/30 days, pro rata refund, nonrenewal 30 days, subrogation not for F or property of others, death) match HO 00 03 05 11; the PAP 20-day contrast matches PP 00 01 09 18. Refund example recomputes (584). One minor open finding on the severability sentence.
