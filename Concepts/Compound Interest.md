---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:132970b99797a2b768cf2fccff8e4a811035b7e924a705ee1eb79894538e72df
  sources:
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money (5-15%), learning outcomes a)-d), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §6 Exponential Accumulation Functions: Compound Interest, PDF p.41, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §6 Exponential Accumulation Functions: Compound Interest (Theorem 6.1), PDF p.42, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §7 Present Value and Discount Functions, PDF p.50, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §9 Nominal Rates of Interest and Discount, PDF p.66, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Compound Interest.md
---

Under **compound interest**, interest earned in each period is added to the principal and itself earns interest in subsequent periods. An investment of $P$ at effective annual rate $i$ grows to:

> $$A(t) = P(1+i)^t$$

- The [[Accumulation Function]] is $a(t) = (1+i)^t$, which is exponential (vs. linear under [[Simple Interest]]).
- Compound interest is the standard convention for actuarial and financial calculations.
- For $n$ periods at rate $i$, the accumulation factor $(1+i)^n$ is called the **accumulation factor**, and $(1+i)^{-n} = v^n$ is the **discount factor** $v$.

![[Media/Figures/Compound_Interest.svg|340]]

> [!example]- Comparing Simple vs. Compound Interest {Example}
> $1{,}000$ is invested for 3 years at 6% per year. Compare simple vs. compound accumulation.
>
> > [!answer]-
> > Simple: $1000(1 + 0.06 \times 3) = 1000(1.18) = 1180$
> > Compound: $1000(1.06)^3 = 1000(1.19102) = 1191.02$
> > Compound interest yields more because earned interest is reinvested.
