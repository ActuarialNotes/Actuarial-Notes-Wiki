---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:fec3c9ad2fd79bd51c3b937bd1224c7b8f7837f8f4fbf20b220cd23db3b98c78
  sources:
    - "SOA, Notation and terminology used for Exam FM, p.1, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "SOA, Notation and terminology used for Exam FM, p.2, sha256:f6cfa778c3c08d8118ff41f1cda86eda553cf5542b73ade914082fa55a292a0c — https://www.soa.org/globalassets/assets/Files/Edu/2019/exam-fm-notation-terminology2.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.41, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Questions (rev. Aug 2026), Q 403, questions PDF pp.170-171, sha256:d20b5cf2b78cb4cddb3dc556e0df62c40b7d510b7941b546809cc58c4b71a069 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-questions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 403, solutions PDF p.106, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Fund Accumulation.md
---

**Fund accumulation** is the growth of a fund's balance over time from an initial deposit and/or a stream of periodic deposits or withdrawals, each earning interest at the fund's rate. It generalizes the single-sum [[Accumulation Function]] to a fund that also receives ongoing cash flows.

> $$AV_n = F_0(1+i)^n + \sum_t C_t(1+i)^{n-t}$$

- $F_0$ is the initial balance, $C_t$ is the net deposit (or withdrawal, if negative) at time $t$, and $i$ is the fund's effective interest rate.
- When the deposits are a level $C$ at the end of each period — times $t = 1, \ldots, n$ — $\sum_t C_t(1+i)^{n-t}$ reduces to $C\cdot s_{\overline{n}|i}$, the [[Annuity Immediate|annuity-immediate]] accumulated value. Level deposits at the start of each period ($t = 0, \ldots, n-1$) give $C\cdot \ddot{s}_{\overline{n}|i}$ instead (an [[Annuity Due]]).
- A common Exam FM scenario: amounts withdrawn from one fund are immediately deposited into and accumulate within a **second** fund earning a different rate — the accumulated value in the second fund uses its own rate, even though the deposits originated from the first fund's activity.
- Directly related to [[Accumulated Value]] and [[Future Value]].

![[Media/Figures/Fund_Accumulation.svg|340]]

> [!example]- Fund with an Initial Deposit and Level Additions {Example}
> \$$2{,}000$ is deposited into a fund today, and an additional \$$300$ is deposited at the end of each year for 6 years. The fund earns an annual effective interest rate of $5\%$. Find the accumulated value of the fund at the end of year 6.
>
> > [!answer]-
> > $$F_0(1.05)^6 = 2{,}000(1.34010) \approx \$2{,}680.19$$
> > $$300\cdot s_{\overline{6}|0.05} = 300\left(\frac{1.34010-1}{0.05}\right) = 300(6.80191) \approx \$2{,}040.57$$
> > $$AV_6 \approx 2{,}680.19 + 2{,}040.57 = \$4{,}720.76$$

> [!example]- Reinvesting Interest From One Fund Into Another {Example}
> \$$500$ is deposited into Fund A, which earns an annual effective rate of $5\%$. At the end of each year, the interest earned by Fund A is withdrawn and deposited into Fund B, which earns $8\%$. Find the accumulated value of Fund B at the end of year 4.
>
> > [!answer]-
> > Since the \$$500$ principal stays in Fund A, it earns level interest of $500(0.05) = \$25$ per year, deposited into Fund B.
> > $$s_{\overline{4}|0.08} = \frac{(1.08)^4 - 1}{0.08} = \frac{1.36049-1}{0.08} \approx 4.50611$$
> > $$AV_B = 25 \times 4.50611 \approx \$112.65$$
