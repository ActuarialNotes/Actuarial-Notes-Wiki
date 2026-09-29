---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:c9edd15b746159700a10bf536d062c5e0ee534094d5d874d978072945bf4ddf7
  sources:
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 4, solutions PDF p.4, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 160, solutions PDF p.42, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 169, solutions PDF p.44, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, p.234-238, 249-251, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
    - "SOA Financial Mathematics Exam syllabus, December 2026, p.3, sha256:b4189b65d60ab3c9250a8bf5ed48a28a8365c92ab7d673aba25d50ee339edb39 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-12-exam-fm-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Increasing Annuity.md
---

An **increasing annuity** is an [[Annuities|annuity]] whose payments rise over its term. Exam FM examines two patterns: payments that rise by a fixed amount each period (an **arithmetic** increasing annuity) and payments that rise by a fixed percentage (a [[Geometric Increasing Annuity|geometric]] one). The standard symbols belong to the arithmetic family with payments $1, 2, 3, \ldots, n$, one per period at the effective rate $i$:

> $$(Ia)_{\overline{n}|} = \frac{\ddot{a}_{\overline{n}|} - nv^n}{i}$$

> $$(Is)_{\overline{n}|} = \frac{\ddot{s}_{\overline{n}|} - n}{i}$$

- $(Ia)_{\overline{n}|}$ values payments $1, 2, \ldots, n$ at the ends of periods $1$ to $n$, one period before the first payment; $(Is)_{\overline{n}|} = (1+i)^n\,(Ia)_{\overline{n}|}$ is their value at the last payment. The full treatment is [[Arithmetic Increasing Annuity]].
- Paid at the start of each period, the annuity-due versions divide by $d$ instead of $i$: $(I\ddot{a})_{\overline{n}|} = (\ddot{a}_{\overline{n}|} - nv^n)/d$ and $(I\ddot{s})_{\overline{n}|} = (\ddot{s}_{\overline{n}|} - n)/d$.
- With no end date, the increasing [[Perpetuity|perpetuity]]-immediate $1, 2, 3, \ldots$ is worth $(Ia)_{\overline{\infty}|} = 1/i + 1/i^2$, and the perpetuity-due $(I\ddot{a})_{\overline{\infty}|} = 1/d^2$.
- A first payment $P$ rising by $Q$ a period is a level annuity of $P - Q$ plus $Q\,(Ia)_{\overline{n}|}$ — see [[Arithmetic Progression]]. The mirror image, payments $n, n-1, \ldots, 1$, is the [[Decreasing Annuity|decreasing annuity]] $(Da)_{\overline{n}|}$.
- Payments growing by a constant percentage are the [[Geometric Increasing Annuity|geometric increasing annuity]] and, with no end date, the [[Geometric Increasing Perpetuity|geometric increasing perpetuity]].

> [!example]- A Fund Built from Rising Deposits {Example}
> A fund receives deposits of \$100 at the end of year 1, \$200 at the end of year 2, and so on up to \$1,000 at the end of year 10. It earns $5\%$ effective. Find its value just after the last deposit.
>
> > [!answer]-
> > The deposits are $100 \times (1, 2, \ldots, 10)$, so the value is $100\,(Is)_{\overline{10}|}$, with $s_{\overline{10}|} = 12.577893$:
> > $$
> > \begin{align*}
> > \ddot{s}_{\overline{10}|} &= 1.05 \times 12.577893 \\
> > &= 13.206787 \\
> > (Is)_{\overline{10}|} &= \frac{13.206787 - 10}{0.05} \\
> > &= 64.13574 \\
> > AV &= 100 \times 64.13574 \\
> > &= 6{,}413.57
> > \end{align*}
> > $$
> > The deposits total \$5,500; the other \$913.57 is interest.

> [!example]- A Scholarship That Grows Forever {Example}
> A scholarship pays \$1,000 at the end of the first year, \$2,000 at the end of the second, \$3,000 at the end of the third, and so on forever. At $i = 8\%$, how much must be endowed today?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > PV &= 1{,}000\,(Ia)_{\overline{\infty}|} \\
> > &= 1{,}000\left(\frac{1}{0.08} + \frac{1}{0.08^2}\right) \\
> > &= 1{,}000\,(12.5 + 156.25) \\
> > &= 168{,}750
> > \end{align*}
> > $$
> > The level part alone, $1{,}000/0.08 = 12{,}500$, is under a tenth of it: almost all the value is in the growth.
