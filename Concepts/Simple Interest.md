---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:41e28b4ba298ec53ea52d935a143140acb15a27d41affb1750eb1365f785d5a0
  sources:
    - "SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.12, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.28, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.30, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.31, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.42, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.381, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Simple Interest.md
---

Under **simple interest**, interest is earned only on the original principal — it does not itself earn interest. An investment of $P$ at rate $i$ per period grows to:

> $$A(t) = P(1 + it)$$

- Simple interest is linear in time, in contrast to [[Compound Interest]] which is exponential.
- It is mainly useful over short periods, such as a fraction of a year, where it approximates compound interest: $(1+i)^t \approx 1 + it$ for $0 < t < 1$. (Treasury bills are not an example — their yields are computed on a simple *discount* basis.)
- The [[Accumulation Function]] under simple interest is $a(t) = 1 + it$. When a question specifies simple interest, SOA measures $t$ from the moment each cash flow occurs, so a deposit $C$ made at time $s$ is worth $C\,[1 + i(t - s)]$ at time $t$ (see [[Accumulated Value]]).

![[Media/Figures/Simple_Interest.svg|340]]

> [!example]- Simple Interest Growth {Example}
> $2{,}000$ is invested at 8% per year simple interest for 9 months. Find the accumulated amount.
>
> > [!answer]-
> > $t = 9/12 = 0.75$ years:
> > $$A(0.75) = 2000(1 + 0.08 \times 0.75) = 2000(1.06) = 2120$$
