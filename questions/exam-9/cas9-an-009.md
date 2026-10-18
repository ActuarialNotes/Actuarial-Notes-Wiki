---
id: "cas9-an-009"
exam: "Exam 9"
topic: "Prepayment Risk"
learning_objective: "Financial Risk Management (FRM)"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Prepayment+Risk
  - Concepts/Credit+Risk
  - Concepts/Interest+Rate+Risk
answer: "C"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:a1b7e0219012c26876147729bd7ac227c2a3193ffc734a5f9d295e5e04158f36
  sources:
    - "The Bond Market Association (SIFMA), Uniform Practices — Chapter SF, Standard Formulas for the Analysis of Mortgage-Backed Securities (02/01/99), Ch. SF, §B.2 a-c, pp.SF-5–SF-6, sha256:9ca07655579c51cd2d9bb783d4d3486e99150f19d99ddf7b0782573c1b738784 — https://www.sifma.org/wp-content/uploads/2017/08/chsf.pdf"
    - "Fannie Mae, Guaranteed MBS Pass-Through Securities (Mega Certificates) prospectus supplement, October 1, 1996, Reinvestment Risk p.2; Prepayment Considerations p.3, sha256:162dd92f71f1e30122ea74c2cbaa57fa4982fd537545f6ebfa74cd9e0fa6d690 — https://capmrkt.fanniemae.com/sites/g/files/koqyhd216/files/syndicated/mbs/megapros/FM_October_1_1996.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), task C5 and its readings p.5, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/questions/exam-9/cas9-an-009.md
---

An insurer's investment portfolio holds a mortgage pass-through security. At the start of month 10 of the pool's life, the remaining pool balance is \$50,000,000 and the scheduled principal for the month is \$150,000. Prepayments are assumed to follow 150% of the PSA benchmark, under which 100% PSA is a conditional prepayment rate (CPR) of 0.2% per month of age, rising to 6% at month 30 and level thereafter.

Calculate the prepayment the insurer should expect from the pool in month 10.

- A) \$83,855
- B) \$124,625
- C) \$126,372
- D) \$390,247
- E) \$1,495,500

## Explanation

> [!note] Outside the Exam 9 readings
> Task C5 names prepayment as an example of interest rate and credit risk, but neither C5 reading (Panning; Coval, Jurek & Stafford) treats it. This question tests the market's standard conventions for measuring it — the PSA benchmark, CPR and SMM — which are on [[Mortgage-Backed Security]], not in an Exam 9 reading.

At month 10, 100% PSA is a CPR of 10 × 0.2% = 2%, so 150% PSA is a CPR of 3%. The CPR is an annual rate; the single monthly mortality (SMM) is the monthly rate that compounds to it:

$$
\text{SMM} = 1 - (1 - 0.03)^{1/12} = 0.0025350
$$

Prepayment applies to the balance remaining after scheduled principal:

$$
\text{Prepayment} = 0.0025350 \times (50{,}000{,}000 - 150{,}000) = \mathbf{\$126{,}372}
$$

The answer is **C**. If rates fall and refinancing accelerates, this figure rises and principal comes back just when it can only be reinvested at lower yields — the risk the insurer is short.

**Why not the others**

- **A** — \$83,855 uses 100% PSA (CPR 2%) and forgets the 150% multiple.
- **B** — \$124,625 divides the CPR by 12 instead of converting it with compounding.
- **D** — \$390,247 uses the seasoned rate, a CPR of 1.5 × 6% = 9%, though the pool is only in month 10 of the 30-month ramp.
- **E** — \$1,495,500 applies the annual CPR to a single month's balance.
