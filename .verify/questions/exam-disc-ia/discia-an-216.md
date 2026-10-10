---
target: questions/exam-disc-ia/discia-an-216.md
created: 2026-10-10
---

## [F-001] Keyed answer depends on the governing state's law
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- severity: major
- status: open
- locus: stem (no jurisdiction), key A and the explanation of B
- claim: The hull loss is not covered because the pilot did not meet the warranty, whether or not the shortfall caused the loss; a causation test does not apply.
- evidence: NY DFS OGC Opinion 01-11-16 (sha256:08faafc1...): New York courts deny coverage for an expired FAA medical certificate without any causal connection (A is right in New York), but the opinion records the insured's argument that Pennsylvania's 74 Pa.C.S. §5501 made a denial without a causal connection inappropriate, the case being decided on choice of law. Under a causation rule, option B (the loss came from an engine defect, not his health) would be the answer. The stem names no state. The QBE form (sha256:536a2453...) writes the restriction as an exclusion with no causation language.
- source_rank: 2
- proposed_action: State the governing law in the stem (e.g. 'in a state that enforces such exclusions without regard to causation') or reframe the question around the policy wording. Question authoring; not applied.
- applied: false
- fingerprint: 5eab4d4cf789

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- status_set: in_review
- checks_run: Blind recompute from the stem with key and explanation stripped, then compared with the key; every distractor's explanation checked; wiki_link and learning_objective (section title matches the DISC-IA page; question_lint clean).
- sources_checked: QBE Aviation Policy QBAV-AV1002 (07-17), Coverages A-E (passenger BI only if 'including passengers'; medical expense), F-H (open peril ground and flight / not in flight / not in motion), Exclusions 1(a) (in flight for purpose not designated) and 2(a) (in flight piloted by other than designated pilots), limits incl. 'passenger liability limited internally', total loss = insured value less deductible, salvage to the Company, 'pleasure and business' excludes hire, pp.1-8, sha256:536a24536fb92b4498def6223fd9a5417b61a68cbe007c29dd53d3e5c2a526c2 — https://www.qbe.com/us/-/media/north%20america/files/aviation-forms/qbav-av1002-07-17-aviation-policy.pdf; N.Y. Dept. of Financial Services, OGC Opinion No. 01-11-16 (Nov. 13, 2001), 'Causal Connection Between the Policy Exclusion and the Loss' (expired FAA medical certificate: New York courts require no causal connection; plaintiffs argued Pennsylvania statute 74 Pa.C.S. §5501 made denial without causal connection inappropriate), sha256:08faafc1159d55748fd033473a47a06591ce2d0f38a35a195a02c7a1ad69119a — https://www.dfs.ny.gov/insurance/ogco2001/rg111131.htm; The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf
- note: Blind answer A under the form's words (QBE pilot exclusion has no causation language). In review: F-001 (major) — the key depends on the governing state's law; NY requires no causal connection, a Pennsylvania statute was argued to require one, and the stem names no state.
