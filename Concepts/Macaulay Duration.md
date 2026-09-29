---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:1889dad75e698ccf0a5f1802efabd3eaa5721c035f8510778d61264421cf0520
  sources:
    - "SOA study note FM-24-17, Alps, Using Duration and Convexity to Approximate Change in Present Value (2017), pp.5-6, sha256:530436d4707ecadba3a7bef6e1a9661b8d9e9bb173486edfb6924bc4a4992040 — https://www.soa.org/globalassets/assets/Files/Edu/2017/fm-duration-convexity-present-value.pdf"
    - "SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 31, questions PDF p.15, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 31, solutions PDF pp.10-11, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 144, solutions PDF p.39, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Macaulay Duration.md
---

**Macaulay duration** $D_{Mac}$ is the weighted-average time to receipt of a bond's cash flows, where each cash flow is weighted by its [[Present Value]] as a fraction of total price:

> $$D_{Mac} = \frac{\displaystyle\sum_{t=1}^{n} t \cdot C_t \cdot v^t}{\displaystyle\sum_{t=1}^{n} C_t \cdot v^t}$$

> $$= \frac{\displaystyle\sum_{t} t \cdot \text{PV}(C_t)}{P}$$

- where $v = 1/(1+j)$ and $P$ is the bond price; Macaulay duration is measured in time units (years)
- The relationship to [[Modified Duration]] is $D_{Mod} = D_{Mac}/(1+j)$
- For a level [[Perpetuity]]-immediate — payments of 1 at the **end** of each period, forever — $D_{Mac} = (1+j)/j = 1/d$ periods. The formula depends on that timing: a perpetuity-due pays each amount one period sooner, so it does not apply there

![[Media/Figures/Macaulay_Duration.svg|340]]

> [!example]- Macaulay Duration of a Bond {Example}
> A 2-year bond pays $100$ per year plus $1000$ at maturity, priced at $j = 5\%$. Find $D_{Mac}$.
>
> > [!answer]-
> > $\text{PV}_1 = 100/1.05 = 95.24$, $\text{PV}_2 = 1100/1.05^2 = 997.73$. $P = 95.24 + 997.73 = 1092.97$.
> > $$D_{Mac} = \frac{1 \times 95.24 + 2 \times 997.73}{1092.97} = \frac{95.24 + 1995.46}{1092.97} = \frac{2090.70}{1092.97} = 1.913 \text{ years}$$
