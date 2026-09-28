---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:5f7b1f18f6ee8eeca58b9336c777bb4e27cb5ca35c8ea91fc32d547cb8e7df35
  sources:
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §53 The Term Structure of Interest Rates and Yield Curves, PDF p.460, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §53 The Term Structure of Interest Rates and Yield Curves, PDF p.461, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 73, questions PDF p.32, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 73, solutions PDF p.21, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 99, questions PDF p.43, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 99, solutions PDF p.28, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 5 General Cash Flows, Portfolios, and Asset Liability Management (20-30%), learning outcomes a)-c), PDF p.5, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Forward Rate.md
---

A **forward rate** $f_{t_1, t_2}$ is the interest rate agreed upon today for an investment (or loan) beginning at a future time $t_1$ and maturing at time $t_2$. Forward rates are implied by the [[Yield Curve]] via [[Spot Rate]]s:

> $$(1+s_{t_2})^{t_2} = (1+s_{t_1})^{t_1} \cdot (1+f_{t_1, t_2})^{t_2-t_1}$$

> $$f_{t, t+1} = \frac{(1+s_{t+1})^{t+1}}{(1+s_t)^t} - 1$$

- The second formula gives the one-period forward rate from time $t$ to $t+1$
- Forward rates are used to price interest rate derivatives and to construct [[Yield Curve]]s from market data

![[Media/Figures/Forward_Rate.svg|340]]

> [!example]- Computing a Forward Rate {Example}
> The 1-year spot rate is $4\%$ and the 2-year spot rate is $5\%$. Find the 1-year forward rate for year 2.
>
> > [!answer]-
> > $$(1.05)^2 = (1.04)(1+f_{1,2}) \implies 1+f_{1,2} = \frac{(1.05)^2}{1.04} = \frac{1.1025}{1.04} = 1.0601$$
> > $$f_{1,2} = 6.01\%$$
