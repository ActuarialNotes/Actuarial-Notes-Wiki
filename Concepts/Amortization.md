---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:b47d57e5a3bf828a53fae1af3f78bde60e99ae3b1e1a9fde5e984241738ca92a
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 3 Loans (15-25%), learning outcomes a)-b), PDF p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), Part 'Loan Repayment Methods' introduction, PDF p.333, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §37 Finding the Loan Balance Using Prospective and Retrospective Methods, PDF p.334-335, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §38 Amortization Schedules, PDF p.342, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §38 Amortization Schedules, PDF p.346, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 128, questions PDF p.54, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Amortization.md
---

**Amortization** is the process of repaying a loan through a series of level periodic payments $P$, each covering the interest accrued on the [[Outstanding Balance]] plus a portion of principal. The payment $P$ is determined by:

> $$P = \frac{L}{a_{\overline{n}|i}}$$

- Because interest is charged on the declining balance, the interest portion of each payment decreases over time while the principal portion increases — but the total payment remains constant.
- At the end of the $n$-th payment the loan is exactly paid off.
- Interest in payment $k$: $I_k = P \cdot (1 - v^{n-k+1})$ where $v = 1/(1+i)$
- Principal in payment $k$: $PR_k = P \cdot v^{n-k+1}$
- Outstanding balance after payment $k$: $OB_k = P \cdot a_{\overline{n-k}|i}$

![[Media/Figures/Amortization.svg|340]]

> [!example]- Amortizing a Loan {Example}
> A \$$10{,}000$ loan is repaid with level annual payments over 4 years at $i = 5\%$ per year. Find the annual payment and the interest and principal portions of the first payment.
>
> > [!answer]-
> > $$P = \frac{10000}{a_{\overline{4}|5\%}} = \frac{10000}{3.5460} = \$2{,}820.12$$
> > **Payment 1 interest**: $I_1 = 10000 \times 0.05 = \$500.00$
> > **Payment 1 principal**: $PR_1 = 2820.12 - 500.00 = \$2{,}320.12$
> > **Outstanding balance after payment 1**: $OB_1 = 10000 - 2320.12 = \$7{,}679.88$, which equals $P \cdot a_{\overline{3}|5\%} = 2820.12(2.7232) = \$7{,}679.88$.
