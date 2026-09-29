---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:514613c2e190bf7ef75508fa52a9320d9db4f7e5003d33d36b0f076aee6ab975
  sources:
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money (5-15%), learning outcomes a)-d), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §1 The Meaning of Interest, PDF p.10, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §3 Effective Interest Rate (EIR), PDF p.22, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 410, questions PDF p.173, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 410, solutions PDF p.108, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Interest Rate.md
---

The **interest rate** (or rate of interest) $i$ is the amount of interest earned per unit of principal per unit of time. Under [[Compound Interest]], $1$ invested grows to $(1+i)^n$ after $n$ periods.

- The interest rate connects [[Present Value]] and [[Future Value]]:

> $$\text{FV} = \text{PV} \cdot (1+i)^n$$

> $$\text{PV} = \frac{\text{FV}}{(1+i)^n}$$

- The **effective annual interest rate** is the interest earned over a year per unit invested at the start of the year, however often interest is credited during the year — an account credited quarterly whose balance grows 4.5% a year has an effective annual rate of 4.5%. SOA denotes it $i$, and a nominal rate convertible $m$ times a year $i^{(m)}$.
- Related measures include the [[Nominal Interest Rate|nominal rate]] convertible $m$-thly, the [[Discount Rate]], and the [[Force of Interest]].

![[Media/Figures/Interest_Rate.svg|340]]

> [!example]- Finding the Interest Rate {Example}
> An investment of $5{,}000$ grows to $6{,}802.44$ in 5 years under compound interest. Find the annual effective interest rate.
>
> > [!answer]-
> > $$6802.44 = 5000(1+i)^5 \implies (1+i)^5 = 1.36049 \implies i = 1.36049^{1/5} - 1 = 0.0635 = 6.35\%$$
