---
target: Concepts/Equation of Value.md
created: 2026-09-28
---

## [F-001] Comparison-date invariance stated unconditionally; it fails under simple interest
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: major
- status: open
- locus: second bullet (line 21)
- claim: 'A different choice of comparison date gives a different equation but the same solution for the unknown.'
- evidence: Finan §12 p.101: 'With compound interest, an equation of value will produce the same answer for an unknown value regardless of what comparison date is selected ... Whereas the choice of a comparison date has no effect on the answer obtained with compound interest, the same cannot be said of simple interest or simple discount.' Finan Example 12.3 (p.101-102): two payments of 100 at t=0 and t=5, 5% simple interest from each payment's date — comparison date 10 gives 275, comparison date 15 gives 260; recomputed in python: 100(1.5)+100(1.25) = 275.00 and [100(1.75)+100(1.5)]/1.25 = 260.00. Simple interest is on the FM syllabus (SYL Topic 1 b), p.2) with exactly this per-cash-flow convention (NOTE p.2). A student who trusts the bullet will treat the comparison date as irrelevant on a simple-interest question.
- source_rank: 1
- proposed_action: Maintainer: qualify the bullet with 'under compound interest' and note that under simple interest the answer depends on the comparison date.
- applied: false
- fingerprint: ec740cefcc9b

## [F-002] 'Using the same Interest Rate' is not a requirement of an equation of value
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: first bullet (line 20)
- claim: 'All cash flows must be moved to the same point in time using the same [[Interest Rate]] before comparing.'
- evidence: Finan Example 12.4 (p.102) writes one equation of value at t=5 in which investor A's deposits accumulate at 4% convertible quarterly and investor B's at force δ_t = 1/(6+t): 1000(1.01)^20 + 1000(1.01)^8 = (11/6)X, X = 1256.21. SOA sample Q403 (questions p.170; solution p.106) equates Fund Y's balance 5461 to 930.83 s_5|i, where 930.83 comes from Fund X's 9% convertible quarterly and s_5 from Fund Y's rate i. The same point in time is required (Finan §12 p.100: 'accumulated or discounted to a common date, called the comparison date'); the same rate is not.
- source_rank: 1
- proposed_action: Maintainer: drop 'using the same Interest Rate' or say each cash flow is moved at the rate that applies to it.
- applied: false
- fingerprint: 45098e033ba4

## [F-003] Calls the value at a general comparison date the 'present value', against SOA's terminology
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- severity: minor
- status: open
- locus: lead sentence and formula block (lines 14-18)
- claim: An equation of value 'equates the Present Value (or Accumulated Value) of all obligations to the present value of all payments at a chosen comparison date'; formula 'PV of inflows = PV of outflows at the comparison date'.
- evidence: NOTE p.1 (page image): the value at a given date of cash flows before and after it is the 'current value'; 'The term present value is used when all cash flows are discounted and the term future value is used when all cash flows are accumulated.' The page's own example (comparison date t=3) accumulates the time-2 debt and discounts the time-5 debt, so the quantity equated is a current value, not a present value. Finan §12 p.100 defines the equation of value as the one that 'accumulates or discounts each payment to the comparison date'. SYL Topic 1 a) (p.2) lists present value, current value and equation of value as separate terms to define.
- source_rank: 1
- proposed_action: Maintainer: phrase the equation as value of inflows = value of outflows at the comparison date (current value), keeping 'present value' for comparison date 0.
- applied: false
- fingerprint: 156346380329

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-09-28T14:47Z/aa33
- date: 2026-09-28
- status_set: verified
- confidence: low
- checks_run: Definition vs Finan §12 p.100 (common comparison date; accumulate or discount each payment) and SYL Topic 1 d) p.2: substance matches; terminology vs NOTE p.1 -> F-003 (minor). Comparison-date invariance vs Finan p.101-102 -> F-001 (major, open; Example 12.3 recomputed 275 vs 260). 'Same interest rate' vs Finan Ex 12.4 p.102 and SOA Q403/S403 -> F-002 (minor). Worked example recomputed: X = 1000(1.06) + 2000(1.06)^-2 = 1060 + 1779.993 = 2839.99 = page (compound interest, so the comparison-date choice does not matter there). Links resolve; figure exists; LaTeX ok.
- sources_checked: SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf; SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money (5-15%), learning outcomes a)-d), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §12 Equations of Value and Time Diagrams, PDF p.100, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §12 Equations of Value and Time Diagrams (Examples 12.2-12.3), PDF p.101, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §12 Equations of Value and Time Diagrams (Examples 12.3-12.4), PDF p.102, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf; SOA Exam FM Sample Questions (rev. Aug 2026), Q 403, questions PDF p.170, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf; SOA Exam FM Sample Solutions (rev. Aug 2026), Q 403, solutions PDF p.106, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf
