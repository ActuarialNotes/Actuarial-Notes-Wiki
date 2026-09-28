---
target: Concepts/Benefit Limit.md
created: 2026-09-28
---

## [F-001] Payment-cap formula given without its condition; P-21-05 also applies a limit to covered costs before coinsurance
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: major
- status: open
- locus: formula block and second bullet, lines 16-21
- claim: Y = min(alpha(X - d)+, u) where u = maximum benefit (benefit limit); Losses above d + u/alpha (for coinsurance alpha) result in the insurer paying exactly u
- evidence: P-21-05 §VI defines a benefit limit as an upper bound on how much the insurer will pay for any loss (PDF p.8), the page convention, and its car example caps the claim payment at 12,500 after the 500 deductible (PDF p.9). But the same section says there is more than one way to provide limits on benefits and gives a health policy that may pay healthcare costs up to 5000 and reimburse only 80% of these costs: if costs were 6000, the insurance would reimburse 4000, which is 80% of the lesser of 5000 and the actual cost (PDF pp.8-9). There the limit caps the covered loss and coinsurance applies after it. The page formula with u = 5000, alpha = 0.8, d = 0 gives min(0.8 x 6000, 5000) = 4800, not the 4000 the source gives, and its d + u/alpha = 6250 threshold is wrong for that policy (the cap binds at 5000). The page never states the order in which limit and coinsurance apply (Concepts/Policyholder.md does). With no coinsurance the two readings coincide, as in SOA sample Q50 (reimburses a loss up to a benefit limit of 10) and Q243 (subject to a benefit limit of 100).
- source_rank: 1
- proposed_action: State that the formula assumes the limit caps the insurer payment after coinsurance, and that a policy that caps the covered loss instead pays alpha times the capped amount (P-21-05 p.9); keep the d + u/alpha threshold tied to the payment-cap reading.
- applied: false
- fingerprint: e0f8da82ca56

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Definition (maximum the insurer pays) vs P-21-05 p.8 verbatim sense and SOA sample Q50 / Q243 usage. Formula Y = min(alpha (X-d)+, u) vs P-21-05 maximum-claim-payment example p.9 - correct for the page definition of u. d + u/alpha threshold: alpha (X - d) >= u iff X >= d + u/alpha - correct under the payment-cap reading. Example recomputed first: 600 - 100 = 500, min(500, 400) = 400, insured retains 200 = 100 + 100 - agrees. Links and embed resolve.
- sources_checked: Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §VI Benefit limits PDF pp.8-9; SOA Exam P Sample Solutions (Aug 2026 revision), Q50 (PDF pp.17-18), Q243 (PDF p.72), Q328 (PDF p.91), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA Probability Exam syllabus, November 2026, objective "Calculate the amount that an insurance company pays to a policyholder for a claim given policy information, including deductibles, coinsurance percentages, and benefit limits, as well as other factors, such as inflation", PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Formula correct for its stated definition of u; one open major - the covered-loss-cap reading P-21-05 also uses is not acknowledged.

## [F-001/R] Payment-cap condition stated; cap-on-covered-loss form added
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- resolves: F-001
- status: resolved
- note: Bullets now say the formula caps the insurer payment (deductible, then coinsurance, then cap at u), as P-21-05 PDF p.8 defines a benefit limit (upper bound on how much the insurer will pay for any loss) and as SOA sample Q50 and Q243 apply it; that a policy may instead cap the covered loss before coinsurance, with P-21-05 PDF pp.8-9 health policy: 0.80 x min(6000, 5000) = 4000 vs payment-cap 4800; that the wording decides and the two agree with no coinsurance; and the d + u/alpha threshold is tied to the payment-cap reading.

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T02:59Z/919b
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Re-verified after resolving F-001: 0.8 x min(6000, 5000) = 4000 (P-21-05) and min(0.8 x 6000, 5000) = 4800; alpha(X - d) >= u iff X >= d + u/alpha. Example recomputed: 600 - 100 = 500, min(500, 400) = 400, insured keeps 100 + 100. Medium: original worked example.
- sources_checked: Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf — §VI Benefit limits: upper bound on how much the insurer will pay PDF p.8; more than one way to provide limits, health policy 80% of the lesser of 5000 and the cost PDF pp.8-9; SOA Exam P Sample Questions (Aug 2026 revision), Q50 (reimburses a loss up to a benefit limit of 10, PDF p.23) and Q243 (PDF pp.102-103), sha256:e47245963f7d2c1c4f8cc5ff1baf2090542d923ac47cbeb27d1f657ac51bf5f0 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-questions.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q50 (PDF pp.17-18), Q243 (PDF p.72), sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA Probability Exam syllabus, November 2026, objective "Calculate the amount that an insurance company pays to a policyholder for a claim given policy information, including deductibles, coinsurance percentages, and benefit limits, as well as other factors, such as inflation", PDF p.3, sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
