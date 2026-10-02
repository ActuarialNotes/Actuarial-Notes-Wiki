---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:196df7c754de461b1dcbefde94759b9758a59b7bc8077d39e5da53bcf811b3e9
  sources:
    - "SOA Financial Mathematics Exam syllabus, December 2026, p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.28, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.41-43, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.58, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.84, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.100-102, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Simple vs Compound Interest.md
---

Under **[[Simple Interest|simple interest]]** only the original principal earns interest, so a unit grows linearly; under **[[Compound Interest|compound interest]]** the interest earned each period is reinvested and itself earns interest, so a unit grows exponentially. At rate $i$ the two [[Accumulation Function|accumulation functions]] are:

> $$a_{\text{simple}}(t) = 1 + it$$

> $$a_{\text{compound}}(t) = (1+i)^t$$

- For $i > 0$ the two agree at $t = 0$ and $t = 1$; compound interest gives **less** than simple interest for $0 < t < 1$ and **more** for $t > 1$:

> $$(1+i)^t \begin{cases} < 1 + it & 0 < t < 1 \\ = 1 + it & t = 0 \text{ or } t = 1 \\ > 1 + it & t > 1 \end{cases}$$

- Simple interest adds a constant **amount** each period, so its effective rate in period $n$, $i_n = \dfrac{i}{1 + i(n-1)}$, falls over time. Compound interest adds a constant **proportion**, so its effective rate is $i$ in every period.
- With compound interest an [[Equation of Value]] gives the same answer at any comparison date; with simple interest the answer depends on the comparison date chosen.
- The discount counterparts are simple discount, $a(t)^{-1} = 1 - dt$, and compound discount, $a(t)^{-1} = (1-d)^t$ (see [[Effective Discount Rate]]).

> [!example]- Short and Long Horizons {Example}
> $1{,}000$ is invested at 8% a year. Find the accumulated value after 6 months and after 3 years under simple and under compound interest.
>
> > [!answer]-
> > After 6 months ($t = 0.5$):
> > $$
> > \begin{align*}
> > \text{Simple: } 1000(1 + 0.08 \times 0.5) &= 1040.00 \\
> > \text{Compound: } 1000(1.08)^{0.5} &= 1039.23
> > \end{align*}
> > $$
> > After 3 years ($t = 3$):
> > $$
> > \begin{align*}
> > \text{Simple: } 1000(1 + 0.08 \times 3) &= 1240.00 \\
> > \text{Compound: } 1000(1.08)^{3} &= 1259.71
> > \end{align*}
> > $$
> > Simple interest is ahead for the half year and behind over three years, as the comparison above says.

> [!example]- The Comparison Date Matters Under Simple Interest {Example}
> An insurer owes a claimant $500$ now and $500$ in 4 years, and agrees instead to pay a single amount $P$ at time 6. Interest is 6% simple from the date each payment is made. Find $P$ using a comparison date of time 6, then time 10. Compare with 6% compound interest.
>
> > [!answer]-
> > Comparison date 6:
> > $$
> > \begin{align*}
> > P &= 500(1 + 0.06 \times 6) + 500(1 + 0.06 \times 2) \\
> >   &= 680 + 560 \\
> >   &= 1240.00
> > \end{align*}
> > $$
> > Comparison date 10, where $P$ itself earns 4 years of simple interest:
> > $$
> > \begin{align*}
> > P(1 + 0.06 \times 4) &= 500(1 + 0.06 \times 10) + 500(1 + 0.06 \times 6) \\
> > 1.24P &= 800 + 680 \\
> > P &= 1193.55
> > \end{align*}
> > $$
> > Under 6% compound interest, $P = 500(1.06)^6 + 500(1.06)^2 = 709.26 + 561.80 = 1271.06$ at time 6, and the same $1271.06$ from a comparison date of time 10.
