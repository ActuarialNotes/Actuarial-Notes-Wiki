---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:1ecee74fa23ccc0a3c7ea91c81a01d474197efe05eb976f05a378d968234d0ba
  sources:
    - "SOA, Notation and terminology used for Exam FM, p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.157-160, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Annuity Due.md
---

An **annuity-due** is a series of $n$ level payments of 1 made at the **beginning** of each period. Because each payment is received one period earlier than in an [[Annuity Immediate|annuity-immediate]], the annuity-due is worth exactly $(1+i)$ times as much.

> $$\ddot{a}_{\overline{n}|} = (1+i)\,a_{\overline{n}|}$$

> $$= \frac{1-v^n}{d}$$

- The accumulated value at the end of the last period (one period after the final payment) is $\ddot{s}_{\overline{n}|}$:

> $$\ddot{s}_{\overline{n}|} = (1+i)\,s_{\overline{n}|}$$

> $$= \frac{(1+i)^n - 1}{d}$$

- Here $d = i/(1+i)$ is the effective annual [[Discount Rate]].
- Annuities-due arise naturally when payments are made at the start of a period, such as lease payments, insurance premiums paid in advance, or tuition fees.

![[Media/Figures/Annuity_Due.svg|340]]

> [!example]- Present Value of a 4-Year Annuity-Due {Example}
> A lease requires payments of \$$800$ at the **beginning** of each year for 4 years. The effective annual rate is $i = 5\%$. Find the present value.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > a_{\overline{4}|0.05} &= \frac{1-(1.05)^{-4}}{0.05} \\
> > &= \frac{1-0.822702}{0.05} \\
> > &= 3.545951 \\
> > \ddot{a}_{\overline{4}|0.05} &= (1.05)(3.545951) \\
> > &= 3.723248 \\
> > PV &= 800 \times 3.723248 \\
> > &= \$2{,}978.60
> > \end{align*}
> > $$
