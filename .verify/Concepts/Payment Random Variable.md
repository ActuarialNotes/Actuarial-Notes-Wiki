---
target: Concepts/Payment Random Variable.md
created: 2026-09-28
---

## [F-001] Payment formula fixes limit-before-coinsurance order without saying so
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- severity: major
- status: open
- locus: formula block, line 16
- claim: Y = alpha min((X-d)_+, u), where d = deductible, u = benefit limit, alpha = coinsurance
- evidence: P-21-05 PDF p.8 defines: A benefit limit sets an upper bound on how much the insurer will pay for any loss. SOA Exam P sample Q50 (reimburses a loss up to a benefit limit of 10; solution PDF p.17 pays min(Y,10), E = 1.9) and Q243 (benefit 50 max(X,Y) subject to a benefit limit of 100) apply the limit as a cap on the payment itself. Under the page formula the maximum payment is alpha u, not u: in the page example (d=200, alpha=0.75, u=900, X=1500) the page gets 0.75 x 900 = 675, whereas a cap on the insurer payment gives min(0.75 x 1300, 900) = 900. P-21-05 PDF p.9 does illustrate the page order (a policy paying health costs up to 5000 at 80% reimburses 4000 on 6000 of costs, 80% of the lesser of 5000 and the actual cost), so the formula is right for that policy wording; the missing condition is that the limit applies to the amount above the deductible before coinsurance, and the page gives no form for a limit that caps the payment.
- source_rank: 1
- proposed_action: State the order the formula assumes (limit on the amount above the deductible, then coinsurance, maximum payment alpha u) and add the cap-on-payment form Y = min(alpha (X-d)_+, u), noting that the policy wording decides. Author wording; not auto-fixed.
- applied: false
- fingerprint: fa738b4a96be

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-27T19:59Z/bfa2
- date: 2026-09-28
- status_set: verified
- confidence: low
- checks_run: Definition against P-21-05 §VI (PDF pp.7-9) and SOA sample solution Q216 (the payment random variable is 1000(X-2) if positive); formula Y = alpha min((X-d)_+, u) matches the P-21-05 p.9 illustration (80% of the lesser of 5000 and cost) and the p.9 deductible 500 / maximum claim payment 12,500 example, but omits the order condition (F-001); point mass at 0 when X<=d against P-21-05 p.8 claim payment distribution (0 with probability 0.90); example recomputed before reading the answer: 0.75 x min(1300, 900) = 675, insured share 1500 - 675 = 825 = 200 + 400 + 225, agrees; 4 wiki-links and 1 embed resolve
- sources_checked: Anderson & Brown, Risk and Insurance (SOA study note P-21-05, 2005), §III theorem on S_n (PDF pp.4-5), §VI Deductibles (PDF p.7) and Benefit Limits (PDF pp.8-9), sha256:1cb44e7f9ee240a9a0597a89dbf3a055ab70d07a8739132c75440051ee655922 — https://www.soa.org/globalassets/assets/files/edu/P-21-05.pdf; SOA Exam P Sample Solutions (Aug 2026 revision), Q50 (PDF p.17), Q216, Q243, sha256:efade84ea0ba886e00f07be817c94eae33d3b2ec5ca378e6cad4b74d77136135 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-solutions.pdf; SOA Exam P Sample Questions (Aug 2026 revision), Q50 and Q243 wording, sha256:e47245963f7d2c1c4f8cc5ff1baf2090542d923ac47cbeb27d1f657ac51bf5f0 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-05-exam-p-sample-questions.pdf; SOA, Probability Exam (Exam P) Syllabus, November 2026, Topic 2 outcomes e-f (PDF p.3) and Topic 3 outcome i (PDF p.4), sha256:bed27462961aa988fc66c90fefa34af47ea324e2ab9109889c4e4f8f78d97397 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-11-exam-p-syllabus.pdf
- note: Confidence lowered: open major F-001 bears on the main formula (convention-dependent order of benefit limit and coinsurance).
