---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-28
  last_checked_by: agent:validate-v1
  content_hash: sha256:1b4e0596038ae3fca628d9d61375e48de275f0e5e070b8ca57ce900fc7122d13
  sources:
    - "SOA, Notation and terminology used for Exam FM (rev. Dec 2025), PDF p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, Topic 1 Time Value of Money (5-15%), learning outcomes a)-d), PDF p.2, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), Part 'Rate of Return of an Investment' introduction, PDF p.275, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §30 Discounted Cash Flow Technique, PDF p.277, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets (Arkansas Tech, 2009), §30 Discounted Cash Flow Technique, PDF p.278, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Net Present Value.md
---

The **net present value** (NPV) is the sum of the present values of all cash flows associated with a project or investment, with inflows treated as positive and outflows as negative. Discounting each cash flow $C_t$ at effective rate $i$ using $v = (1+i)^{-1}$:

> $$NPV = \sum_t C_t\, v^t$$

> $$= PV(\text{inflows}) - PV(\text{outflows})$$

- A positive NPV means the investment creates value at rate $i$ — the inflows more than compensate for the outflows at the chosen discount rate.
- A negative NPV means the opposite.
- The **internal rate of return** (IRR) is the rate $i^*$ at which $NPV = 0$.

![[Media/Figures/Net_Present_Value.svg|340]]

> [!example]- Comparing Two Investment Projects {Example}
> Project A requires an outlay of \$$10{,}000$ today and returns \$$4{,}000$ at the end of each of the next 3 years. Project B requires \$$10{,}000$ today and returns \$$12{,}500$ at the end of year 3 only. Using $i = 6\%$, which project has the higher NPV?
>
> > [!answer]-
> > **Project A:**
> > $$NPV_A = -10{,}000 + 4{,}000\,a_{\overline{3}|0.06}$$
> > $$a_{\overline{3}|} = \frac{1-(1.06)^{-3}}{0.06} = \frac{1-0.83962}{0.06} \approx 2.6730$$
> > $$NPV_A = -10{,}000 + 4{,}000 \times 2.6730 \approx -10{,}000 + 10{,}692 = \$692$$
> >
> > **Project B:**
> > $$NPV_B = -10{,}000 + 12{,}500\,(1.06)^{-3} = -10{,}000 + 12{,}500 \times 0.83962 \approx -10{,}000 + 10{,}495 = \$495$$
> >
> > Project A has the higher NPV (\$$692 > \$495$), so Project A is preferred at a 6% discount rate.
