---
target: Concepts/Large Deductible Policy.md
created: 2026-10-31
---

## [F-001] 'Too sparse to price from' is in no reading checked
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-31T12:21Z/714a
- date: 2026-10-31
- severity: minor
- status: open
- locus: 'Thin data at high deductibles' bullet, first sentence
- claim: An insured's own losses above a high d are too sparse to price from, so excess ratios come from size-of-loss distributions or fitted curves.
- evidence: Fisher et al. PDF p.23 says only that the per-occurrence excess charge is often an expected ratio of excess/total losses applied to the total loss estimate, the ratios being the subject of Distributions for Actuaries; Werner Ch.15 PDF pp.315-317 takes the LERs as given. Neither says the insured's own data is too sparse. The leverage half is supported: Bahnemann PDF p.167, 'the existence of a fixed underlying limit magnifies, or leverages, the effect of the basic uniform claim-size trend on the aggregate excess loss'. Not changed here: the sentence is quoted by the Exam 8 answerability record (cas8-2019-q12:r6), and the claim is plausible, so it is left for a sourced restatement.
- source_rank: 2
- proposed_action: Restate to Fisher p.23 (excess ratios applied to the total loss estimate, estimated from loss distributions per Bahnemann), or cite a reading that says it; re-quote cas8-2019-q12:r6 if the words change.
- applied: false
- fingerprint: cf66c3c4bf36

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-31T12:21Z/714a
- date: 2026-10-31
- status_set: verified
- confidence: medium
- checks_run: Whole page (never verified before). Werner: $1m WC example, the four considerations, the premium formula (excess losses + ALAE + fixed + credit risk + risk margin)/(1 - V - Q), excess = E x (1 - LER), otherwise as standard deductible pricing (PDF pp.315-317). Fisher: insurer pays up front and bills back, premium covers the retro components except losses below both the per-occurrence and aggregate deductible, lower premium tax/commission (pp.27-28); SIR differences — claims handled by insured/TPA, no ALAE within the retention and retention on loss only, minimal ULAE and lower tax base, no credit risk, limit not eroded with the $1m/$250k illustration (pp.28-29); aggregate charge on limited losses (pp.89-90, 117). Bahnemann p.167 leverage of a fixed limit. Old SIR sentence ('insured pays its own claims and the policy sits above them') is fully carried by the new bullet (claims handling; limit not eroded); its Deductible Recovery and related-mechanism links kept. Example recomputed: 600,000 + 216,000 + 60,000 + 54,000 + 27,000 + 72,000 = 1,029,000; /0.87 = 1,182,759; GC 2,676,000/0.87 = 3,075,862; outlay 2,982,759 — all match; no question's figures.
- sources_checked: Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.15 'Large Deductible Policies', printed pp.303-305 (PDF pp.315-317), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf; Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.2 §5, PDF pp.27-29; Ch.3 ICRLL pricing PDF pp.89-90 and answer 13 PDF p.117, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf; Bahnemann, Distributions for Actuaries, CAS Monograph 2 (2015), §5 inflation and a fixed limit, printed p.155 (PDF p.167), sha256:d4d172f9646852ab018ae3f0df95e5fbdbfabda4db55d6d4596977ed2eaa3ef8 — https://www.casact.org/sites/default/files/2021-03/8_Bahnemann.pdf
- note: Medium: F-001 (minor, open) — 'too sparse to price from' is in no reading checked; left because an answerability quote rests on it.
