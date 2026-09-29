---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:2e9a526d74eaa017c54144e98a499116551f87fbda9ff3ca38878985498c164d
  sources:
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.234-237, 249, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 4, solutions PDF p.4, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Arithmetic Progression.md
---

In the context of annuities, an **arithmetic progression** is a sequence of payments that changes by a fixed amount $Q$ each period: starting from a first payment $P$, the payments are $P,\ P+Q,\ P+2Q,\ \ldots,\ P+(n-1)Q$. Paid at the end of each of $n$ periods at the effective rate $i$ per period, they have present value

> $$PV = P\,a_{\overline{n}|} + Q\,\frac{a_{\overline{n}|} - nv^n}{i}$$

- The first term values a level payment of $P$ every period; the second values what is added on top of it, $0, Q, 2Q, \ldots, (n-1)Q$. $Q > 0$ gives an increasing annuity, $Q < 0$ a [[Decreasing Annuity|decreasing]] one.
- Equivalently, write each payment $P + (t-1)Q$ as $(P-Q) + Qt$: a [[Level Annuity|level annuity]] of $P - Q$ plus $Q$ times the [[Arithmetic Increasing Annuity|increasing annuity]] $1, 2, \ldots, n$:

> $$PV = (P-Q)\,a_{\overline{n}|} + Q\,(Ia)_{\overline{n}|}$$

> $$(Ia)_{\overline{n}|} = \frac{\ddot{a}_{\overline{n}|} - nv^n}{i}$$

- The first increase arrives with the second payment, so a level annuity of $P$ *plus* $Q\,(Ia)_{\overline{n}|}$ overstates the value by $Q\,a_{\overline{n}|}$.
- The accumulated value at time $n$ is $P\,s_{\overline{n}|} + Q\,(s_{\overline{n}|} - n)/i$. With $P, Q > 0$ and no end date, the [[Perpetuity|perpetuity]]-immediate is worth $P/i + Q/i^2$.
- Paid at the start of each period instead, the present value is $P\,\ddot{a}_{\overline{n}|} + Q\,(a_{\overline{n}|} - nv^n)/d$.

![[Media/Figures/Arithmetic_Progression.svg|340]]

> [!example]- Payments Rising from 100 to 500 {Example}
> Payments of $100, 200, 300, 400, 500$ are made at the end of years 1–5. Find the PV at $i=6\%$.
>
> > [!answer]-
> > $P = 100$, $Q = 100$, $n = 5$, with $a_{\overline{5}|} = 4.212364$ and $5v^5 = 3.736291$:
> > $$
> > \begin{align*}
> > PV &= 100\,a_{\overline{5}|} + 100\,\frac{a_{\overline{5}|} - 5v^5}{0.06} \\
> > &= 100(4.212364) + 100\,\frac{0.476073}{0.06} \\
> > &= 421.24 + 793.45 \\
> > &= 1{,}214.69
> > \end{align*}
> > $$
> > Here $P - Q = 0$, so this is exactly $100\,(Ia)_{\overline{5}|} = 100(12.146912)$.

> [!example]- A Lease That Rises Each Year {Example}
> A lease pays \$1,000 at the end of the first year, and each later payment is \$50 more than the one before, for 10 payments in all. Find its present value at $i = 5\%$.
>
> > [!answer]-
> > $P = 1{,}000$, $Q = 50$, with $a_{\overline{10}|} = 7.721735$ and $10v^{10} = 6.139133$:
> > $$
> > \begin{align*}
> > PV &= 1{,}000\,a_{\overline{10}|} + 50\,\frac{a_{\overline{10}|} - 10v^{10}}{0.05} \\
> > &= 7{,}721.73 + 50\,\frac{1.582602}{0.05} \\
> > &= 7{,}721.73 + 1{,}582.60 \\
> > &= 9{,}304.34
> > \end{align*}
> > $$
> > Check with the other split: $950\,a_{\overline{10}|} + 50\,(Ia)_{\overline{10}|} = 7{,}335.65 + 50(39.373783) = 9{,}304.34$. Taking $1{,}000\,a_{\overline{10}|} + 50\,(Ia)_{\overline{10}|}$ instead gives $9{,}690.42$ — too much by $50\,a_{\overline{10}|} = 386.09$.
