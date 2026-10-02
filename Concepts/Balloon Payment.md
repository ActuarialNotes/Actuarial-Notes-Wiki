---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:195aaaaf6e0d03cff8ffe12222584c907814992d612c4010c1234e25a6331979
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.184-185, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.335, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.376, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA study note FM-23-05, Broverman, Review of Calculator Functions for the Texas Instruments BA II Plus, p.11-12, sha256:1b71586cc1b08d7bc36c04ecb3d4e6b367fce30f394e63efafc879e6b6e466fa — https://www.soa.org/globalassets/assets/files/edu/FM-23-05.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 232, questions PDF pp.96-97, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 337, solutions PDF p.89, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 126, solutions PDF p.35, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Balloon Payment.md
---

A **balloon payment** is a final loan payment that is larger than the regular periodic payments.

- It arises in two ways. When a loan is repaid by level payments "for as long as necessary", the term is usually not a whole number of periods, and the small remainder can be paid together with the last regular payment, making that last payment larger than the others. A loan can also be scheduled with regular payments too small to repay it by the last date, so the final payment clears whatever is left.
- Either way, the balloon payment is the [[Outstanding Balance]] just after the previous payment, accumulated for one period — the regular payment due then plus whatever the regular payments leave unpaid.
- Contrast with a [[Drop Payment]]: the same remainder can instead be paid one period after the last regular payment, as a separate payment that is smaller than the regular one.
- For a loan of $L$ with $n-1$ regular payments of $K$ followed by one balloon payment $B$ at time $n$, at interest rate $i$:

> $$B = L(1+i)^n - K \cdot s_{\overline{n-1}|i} \cdot (1+i)$$

- Or equivalently, $B$ is the [[Outstanding Balance]] $OB_{n-1}$ accumulated one more period: $B = OB_{n-1}(1+i)$.

![[Media/Figures/Balloon_Payment.svg|340]]

> [!example]- Balloon Payment on a Loan {Example}
> A borrower takes a \$$10{,}000$ loan at $8\%$ annual interest. The borrower makes payments of \$$1{,}200$ at the end of each year for 9 years, then clears the loan with a balloon payment at the end of year 10. Find the balloon payment.
>
> > [!answer]-
> > First find the outstanding balance after 9 payments using the retrospective method, with $(1.08)^9 = 1.999005$ and $s_{\overline{9}|8\%} = 12.487558$:
> >
> > $$
> > \begin{align*}
> > OB_9 &= 10000(1.08)^9 - 1200\,s_{\overline{9}|8\%} \\
> > &= 19990.05 - 14985.07 \\
> > &= \$5{,}004.98
> > \end{align*}
> > $$
> >
> > The balloon payment at time 10 is:
> >
> > $$
> > \begin{align*}
> > B &= OB_9(1.08) \\
> > &= 5004.98(1.08) \\
> > &= \$5{,}405.38
> > \end{align*}
> > $$
> >
> > The final payment is more than four times the regular \$$1{,}200$ payment.

> [!example]- Balloon or Drop: Paying Off the Remainder {Example}
> A \$$10{,}000$ loan at $8\%$ annual interest is repaid by payments of \$$1{,}500$ at the end of each year for as long as necessary. Find how many full payments of \$$1{,}500$ can be made, and the final payment if the remainder is added to the last full payment or is instead paid one year after it.
>
> > [!answer]-
> > Solve $10000 = 1500\,a_{\overline{n}|8\%}$, so $a_{\overline{n}|} = 6.666667$:
> >
> > $$
> > \begin{align*}
> > n &= \frac{-\ln(1 - 0.08 \times 6.666667)}{\ln 1.08} \\
> > &= \frac{0.762140}{0.076961} \\
> > &= 9.90
> > \end{align*}
> > $$
> >
> > So 9 full payments can be made, and something is still owed just after the 9th:
> >
> > $$
> > \begin{align*}
> > X &= 10000(1.08)^9 - 1500\,s_{\overline{9}|8\%} \\
> > &= 19990.05 - 18731.34 \\
> > &= 1258.71
> > \end{align*}
> > $$
> >
> > **Balloon:** added to the 9th payment, the final payment is $1500 + 1258.71 = \$2{,}758.71$ — 8 payments of \$$1{,}500$ and a 9th, larger one. (The formula above with $n = 9$ gives the same: $10000(1.08)^9 - 1500\,s_{\overline{8}|8\%}(1.08) = 2758.71$.)
> >
> > **Drop:** paid one year later instead, the final payment is $1258.71(1.08) = \$1{,}359.41$ at time 10 — 9 payments of \$$1{,}500$ and a 10th, smaller one. That is a [[Drop Payment]], not a balloon.
