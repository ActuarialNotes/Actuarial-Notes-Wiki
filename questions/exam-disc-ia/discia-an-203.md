---
id: "discia-an-203"
exam: "Exam DISC-IA"
topic: "Types of Annuities"
learning_objective: "7. Life and Health Insurance"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Types+of+Annuities
  - Concepts/Annuity+Contract
answer: "C"
points: 1
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:06871ef29c3e385706a635a1cb9ff5c747b6db8462332e44d8f3ef0b40eeb44e
  sources:
    - "NAIC Buyer's Guide to Fixed Deferred Annuities as adopted at Okla. Admin. Code 365:25 App. S, pp.1-6 (single/flexible/scheduled premium; immediate = income within one year, usually one payment; minimum guaranteed rate; initial and renewal rates; surrender/withdrawal charges, free withdrawal; payout options life only (highest), life with period certain usually 10 or 20 years with beneficiary receiving the rest of the period, joint and survivor; death benefit commonly greater of contract value or premiums paid; return of premium not taxed; 10% penalty before 59 1/2; qualified plans; free look), sha256:deb3ce4ecc5f566237ca8aa695a5b491a05c088472ddae05553d6d22ee1f12df — https://www.oid.ok.gov/wp-content/uploads/2019/10/BUYERS-GUIDE.pdf"
    - "NAIC Buyer's Guide for Deferred Annuities (Revised 2013; TIAA reprint), PDF pp.6-12 (immediate vs deferred; accumulation/payout; basic death benefit; surrender charge with ~10% free; tax deferral; salesperson state licence, VA seller FINRA-registered; prospectus; fixed/fixed indexed/variable; participation, cap, spread; never less than zero; M&E and fund charges; annuitize; GMAB/GMIB/GLWB; ordinary income tax, 10% penalty before 59 1/2; IRA same tax advantages; free look usually 10-30 days; guarantees depend on insurer strength), sha256:a002e363b194ac63b19db864c1deb39c7151aa0e0a94d4a10889af5166d9d6f2 — https://www.tiaa.org/public/pdf/NAIC+Deferred+Annuity+Buyers+Guide.pdf"
    - "The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-ia/discia-an-203.md
---

A buyer pays a single premium of \$50,000 into a fixed deferred annuity. The insurer credits an initial rate of 3.5% for the first two years, and the contract guarantees a minimum rate of 1.5%. For the third year the insurer declares a renewal rate of 1.0%. What is the account value at the end of year 3, before any charges?

- A) \$52,283.92
- B) \$54,096.86
- C) \$54,364.67
- D) \$55,435.89

## Explanation

A fixed annuity credits the rate the insurer declares, but never less than the minimum guaranteed rate stated in the contract. The declared 1.0% is below the 1.5% minimum, so year 3 is credited at 1.5%:

$$
\begin{align*}
AV_3 &= 50{,}000\,(1.035)^2(1.015) \\
&= \mathbf{54{,}364.67}
\end{align*}
$$

- **A** credits the 1.5% minimum in all three years, ignoring the higher initial rate the insurer promised for the first two.
- **B** credits the declared 1.0% in year 3, below the contractual minimum.
- **D** keeps the 3.5% initial rate in year 3. The initial rate applies only for its stated period, and the renewal rate can be lower.
