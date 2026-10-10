---
target: Concepts/Directors and Officers Liability Insurance.md
created: 2026-10-10
---

## [F-001] Two market-practice claims not in the sources read
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- severity: minor
- status: open
- locus: 'Side C, entity coverage' ('it carries the largest retention') and 'Allocation and order of payments' (Side A excess / DIC policy)
- claim: Side C carries the largest retention; some boards buy a separate Side A excess or difference-in-conditions policy that only individuals can draw on.
- evidence: Chubb PF-55501/PF-55502 (07/21) (sha256:a97417e8...) sets retentions in the Declarations without ranking them, and offers an 'Additional Limit of Liability Dedicated for Executives' for non-indemnified loss (the closest analogue), but no separate Side A DIC policy. The D&O Diary (sha256:f6fbcb78...) and 8 Del. C. 145 (sha256:6854d085...) do not address either point. Plausible market practice, unsourced here.
- source_rank: 3
- proposed_action: Cite a specimen or reputable source for the Side C retention ranking and Side A DIC policies, or qualify them.
- applied: false
- fingerprint: b1023aafd8f8

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T21:00Z/dv07
- date: 2026-10-10
- status_set: verified
- confidence: medium
- checks_run: Sides A/B/C, no retention for non-indemnifiable or financially impaired loss, priority of payments (non-indemnified, then indemnified, then organization), insured v. insured with securityholder, whistleblower, financial impairment and employment carve-backs, conduct exclusions only on final non-appealable adjudication with defense advanced, severability (no imputation), pending/prior proceedings, allocation, claims-made, defense costs erode the limit, private-company entity cover broad: Chubb PF-55501/PF-55502 (07/21). Public-company entity cover limited to Securities Claims: D&O Diary. Derivative settlements non-indemnifiable: 8 Del. C. 145(b) (expenses only). Examples recomputed: P_A 1,000,000, P_B 7,000,000, P_C 8,500,000 -> 7,000,000 after priority; company bears 5,000,000; 15,000,000 + 5,000,000 = 20,000,000. Claims example consistent with the exclusions read.
- sources_checked: Chubb, The ForeFront Portfolio Policy Guidebook (specimen forms PF-55501 GTC (07/21) Retention, Severability, Payment Priority, Recourse pp.20-29; PF-55502 D&O and Entity Liability for Private Companies (07/21) Insuring Clauses A-C, Insured v. Insured carve-backs, Conduct (final non-appealable adjudication), ERISA exclusion, advancement pp.30-43; PF-55505 EPL (07/21) Insuring Clauses A-B (Third Party Liability), Employment Claim incl. administrative charge and applicants, Loss exclusions, Exclusions C-D incl. wage and hour, duty to defend or reimbursement pp.73-83; PF-55506 Fiduciary (07/21) Loss exclusions for benefits due and contributions, settlor capacity, Exclusions A-E pp.84-96), sha256:a97417e82bbcbe6773ba442938c4b575ea10b43d40f7b918a5a085f6f3dde294 — https://www.Chubb.com/content/dam/chubb-sites/chubb-com/us-en/the_forefront_portfolio_policy_guide.pdf; Kevin LaCroix, D&O Diary, 'Thinking About the Differences Between Private Company and Public Company D&O Insurance' (June 2019): public company entity coverage limited to Securities Claims, sha256:f6fbcb788786ce102633759912a7e1e95627950bc95a6f1b14a948cdef554f9c — https://www.dandodiary.com/2019/06/articles/d-o-insurance/thinking-about-the-differences-between-private-company-and-public-company-do-insurance/; 8 Del. C. §145(b) (indemnification in actions by or in the right of the corporation limited to expenses) and (g) (power to purchase D&O insurance), sha256:6854d085538edb49b067d2ed41fdd9129b06ee46d32f1492a830abeabb9c2a06 — https://delcode.delaware.gov/title8/c001/sc04/index.html; The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf
- note: Verified medium: private-company mechanics from a carrier specimen (primary form), the public-company Side C limit from one rank-3 source; F-001 (minor) open for the Side C retention ranking and Side A DIC policies.
