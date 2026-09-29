---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:0a2c1c1bf8b48491ecf0073e60bde0b61c544a03d4c50b7ffdfef5fa03e4c575
  sources:
    - "SOA, Notation and terminology used for Exam FM, p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.57, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.66-67, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Effective Rate.md
---

The **effective interest rate** $i$ is the rate of interest credited once per measurement period, at the end of the period. It is the rate that, applied once per period, produces the same accumulation as an equivalent [[Nominal Interest Rate]] compounded more frequently.

- For a nominal rate $i^{(m)}$ [[Convertible m-thly]]:

> $$i = \left(1 + \frac{i^{(m)}}{m}\right)^m - 1$$

- The effective rate is the standard benchmark for comparing interest rates across different compounding frequencies.
- The effective [[Discount Rate]] $d$ satisfies $d = iv = i/(1+i)$.

![[Media/Figures/Effective_Rate.svg|340]]

> [!example]- Comparing Two Rates {Example}
> Which is better: 7% compounded semi-annually, or 6.9% compounded monthly?
>
> > [!answer]-
> > Convert each to an effective annual rate:
> > $$
> > \begin{align*}
> > i_{\text{semi}} &= \left(1 + \frac{0.07}{2}\right)^2 - 1 \\
> >   &= (1.035)^2 - 1 \\
> >   &= 0.0712250 = 7.12250\%
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > i_{\text{monthly}} &= \left(1 + \frac{0.069}{12}\right)^{12} - 1 \\
> >   &= (1.00575)^{12} - 1 \\
> >   &= 0.0712245 = 7.12245\%
> > \end{align*}
> > $$
> > The two are practically equivalent: 7% semi-annually is higher by only 0.00005 percentage points. (The nominal monthly rate equivalent to 7% semi-annually is $12\left[(1.071225)^{1/12} - 1\right] = 6.90005\%$.) Neither rate is materially better; strictly, the semi-annual rate is marginally higher.
