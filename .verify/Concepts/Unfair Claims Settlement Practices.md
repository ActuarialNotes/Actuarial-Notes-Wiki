---
target: Concepts/Unfair Claims Settlement Practices.md
created: 2026-10-10
---

## [F-001] Bad-faith link lands on a Canadian page
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- severity: minor
- status: open
- locus: Scope bullet
- claim: 'A claimant who sues an insurer for [[Bad Faith Damages|bad faith]] does so under other law' links the Bad Faith Damages page.
- evidence: Concepts/Bad Faith Damages.md is framed on Canadian law (leading authority Whiten v. Pilot Insurance, SCC 2002); this page describes the U.S. NAIC model act, whose §1 says it creates no private cause of action (Model #900 p.1).
- source_rank: 1
- proposed_action: Link a U.S. treatment of first-party/third-party bad faith, or add a U.S. section to Bad Faith Damages.
- applied: false
- fingerprint: b7c09585be75

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv05
- date: 2026-10-10
- status_set: verified
- confidence: high
- checks_run: Every rule checked against the model texts: §3 flagrant/general business practice; the fourteen §4 acts A-N (the page's 13 bullets merge H and I); §1 scope exclusions and no private cause of action; #902 §3 calendar days, §4 file data for current + 2 preceding years, reconstruction, dates; §5 disclosure, exhibit of property, 'final'/'release'; §6 15-day acknowledgment unless paid, agent notice, 21-day department reply, 15-day other replies, forms; §7A 21-day decision, written denial citing provision, fraud relief; §7B 21 days then 45-day letters; §7D 30/60-day limitation notice; §7F 30-day payment; §7H department review; §8A auto total loss methods; §8B. Penalties §6A ($1,000/$100,000; flagrant $25,000/$250,000), §6B, §7. Recomputed the deadline example (15, 61, 96: all three late) and the penalty example (40,000; 100,000; 250,000). Paraphrase, not copied form wording.
- sources_checked: NAIC Unfair Claims Settlement Practices Act, Model #900 (Jan 1997 printing), §§1, 3, 4A–N, 5, 6A–B, 7, prefatory note, pp.1–4, sha256:ba1d03c3819ae83500abaa0d6f50bba07a896d4be0ba26b84405095c131f6ba2 — https://content.naic.org/sites/default/files/model-law-900.pdf; NAIC Unfair Property/Casualty Claims Settlement Practices Model Regulation, Model #902 (Jul 1997 printing), §§2–9, pp.1–9, sha256:f33578860a5603a165819316747c996514340f371ca42f77f00621e3b3d41f55 — https://content.naic.org/sites/default/files/model-law-902.pdf
- note: High: every substantive claim is in the NAIC model act or regulation (rank 1). One minor finding open (bad-faith link target).
