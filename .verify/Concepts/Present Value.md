---
target: Concepts/Present Value.md
created: 2026-09-28
---

## [F-001] Worked example's result is 40 cents off: 5000/1.500730 = 3331.71, not 3332.11
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: Example 'Present Value of a Lump Sum', answer line (line 29)
- claim: 'PV = 5,000/(1.07)^6 = 5,000 v^6 = 5,000/1.500730 ≈ $3,332.11'
- evidence: Recomputed in python: 1.07^6 = 1.5007304 (the page's intermediate is right); 5000/1.5007304 = 3331.711. The page's 3332.11 is 0.40 too high. The method and the intermediate are correct; only the last division is off.
- source_rank: 5
- proposed_action: Replace 3,332.11 with 3,331.71.
- applied: false
- fingerprint: 87002ca22562

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: medium
- checks_run: Definition and PV = FV(1+i)^-n = FV v^n vs NOTE p.1 (v = 1/(1+i); 'present value' when all cash flows are discounted) and Finan §7 p.50 (ν^t is the present value of 1 due at t): match. PV = sum C_t v^t vs Finan §7 p.50: match. Example: F-001 (minor, 3332.11 vs 3331.71; open — the replacement rests on my recomputation only). Also linked from Exam MAS-I (CAS) as 'an actuarial [[Present Value]]': the page covers the deterministic PV that an actuarial PV takes the expectation of — no conflicting definition. Links [[Annuity Immediate]], [[Net Present Value]], [[Deferred Annuity]] resolve; figure exists; LaTeX ok.
- sources_checked: SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money (5-15%), learning outcomes a)-d), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §7 Present Value and Discount Functions, PDF p.50, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf

## [F-001/R] Worked example corrected to 3,331.71
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- resolves: F-001
- status: resolved
- note: Final figure $3,332.11 replaced with $3,331.71; method and intermediate unchanged. Recomputed in python: 1.07^6 = 1.5007304 (page's 1.500730 right), 5000/1.5007304 = 3331.711 -> 3,331.71. PV = FV v^n with v = 1/(1+i) per SOA notation note p.1 and Finan §7 p.50 (ν^t the present value of 1 due at t).

## [C-002] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-29T19:42Z/d7d3
- date: 2026-09-29
- status_set: verified
- confidence: medium
- checks_run: Re-verified after resolving F-001. Definition and PV = FV(1+i)^−n = FV v^n vs NOTE p.1 (v = 1/(1+i); 'present value' when all cash flows are discounted) and Finan §7 p.50 (ν^t the present value of 1 due at the end of t periods; Example 7.1 PV = 8000(1.11)^−3): match. PV = Σ C_t v^t vs Finan §7 p.50: match. Syllabus Topic 1 a) p.2 (present value, discount factor). Example recomputed in python: 1.07^6 = 1.5007304, 5000/1.5007304 = 3331.711 -> 3,331.71 = page. Links [[Annuity Immediate]], [[Net Present Value]], [[Deferred Annuity]] resolve; figure exists; LaTeX ok. Example is the vault's own -> medium.
- sources_checked: SOA, Notation and terminology used for Exam FM, p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.50, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Financial Mathematics Exam syllabus, December 2026, p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf
