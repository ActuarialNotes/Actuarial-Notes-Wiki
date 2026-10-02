---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-09-29
  last_checked_by: agent:validate-v1
  content_hash: sha256:fd604a09edc7dc8cbab30ccae429d0f1c44109b7b13449820d4fcd865b0f9890
  sources:
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 382, solutions PDF p.101, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 307, solutions PDF p.81, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "SOA Exam FM Sample Solutions (rev. Aug 2026), Q 333, solutions PDF p.88, sha256:ae4ec6082b43944a0c44cefaf02cdc24cf2e011dcd57366ea5f9cb32d3323f69 — https://www.soa.org/globalassets/assets/files/edu/2018/2018-10-exam-fm-sample-solutions.pdf"
    - "Finan, A Basic Course in the Theory of Interest and Derivatives Markets, pp.486-489, sha256:41664968f8b6dcf60e4af92ed71bad63eda94dded40bc63e619fd3c2755efa93 — https://departments.central.edu/actsci/files/2011/08/Exam_FM_Study_GuideFinan.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Full Immunization.md
---

**Full immunization** protects an [[Asset-Liability Portfolio|asset-liability position]] against **any** immediate change in the interest rate — small or large, up or down — in contrast to [[Redington Immunization]], which only covers small changes. A single liability $L$ due at time $T$ is fully immunized when all three conditions hold:

1. $PV(\text{assets}) = PV(\text{liability})$ at the current rate $i$
2. The [[Duration]] of the assets equals the duration of the liability ([[Duration Matching]])
3. There is an asset cash flow before the liability date and one after it

With two zero-coupon assets, $A$ at time $T-a$ and $B$ at time $T+b$, conditions 1 and 2 are the two equations

> $$A\,v^{T-a} + B\,v^{T+b} = L\,v^{T}$$

> $$(T-a)\,A\,v^{T-a} + (T+b)\,B\,v^{T+b} = T\,L\,v^{T}$$

- $v = 1/(1+i)$; condition 3 is $a > 0$ and $b > 0$
- Dividing through by $v^T$ reduces them to $A(1+i)^{a} + B(1+i)^{-b} = L$ and $a\,A(1+i)^{a} = b\,B(1+i)^{-b}$
- Under these conditions the surplus $PV_A - PV_L$ is zero at $i$ and positive at every other rate, whichever way the rate moves
- For several liabilities, repeat the construction for each one: two asset cash flows per liability. As with Redington immunization, the portfolio must be rebalanced periodically to keep the durations equal

![[Media/Figures/Full_Immunization.svg|340]]

> [!example]- Full Immunization Setup {Example}
> A single liability of $L$ is due at time $T$. Show how to fully immunize with two assets.
>
> > [!answer]-
> > Purchase two zero-coupon bonds: one maturing before $T$ (at time $T_1 < T$) and one after $T$ (at time $T_2 > T$), with amounts $A_1$ and $A_2$ such that $A_1 v^{T_1} + A_2 v^{T_2} = L v^T$ **and** the durations match, $T_1 A_1 v^{T_1} + T_2 A_2 v^{T_2} = T L v^T$. Present values and durations matched, with the liability bracketed by the two asset dates, the surplus rises whichever way the rate moves.

> [!example]- Immunizing a 15-Year Liability with 10- and 20-Year Zeros {Example}
> An investor owes $1{,}000$ in 15 years. Zero-coupon bonds of every term yield $4\%$. Find the maturity values $A$ (10-year) and $B$ (20-year) that fully immunize the liability, and the surplus if the rate immediately moves to $2\%$ or $6\%$.
>
> > [!answer]-
> > Here $a = b = 5$, so the reduced equations are
> > $$
> > \begin{align*}
> > A(1.04)^{5} + B(1.04)^{-5} &= 1{,}000 \\
> > 5A(1.04)^{5} &= 5B(1.04)^{-5}
> > \end{align*}
> > $$
> > Each term is therefore $500$:
> > $$
> > \begin{align*}
> > A &= 500(1.04)^{-5} = 410.96 \\
> > B &= 500(1.04)^{5} = 608.33
> > \end{align*}
> > $$
> > At $4\%$ both sides are worth $1{,}000(1.04)^{-15} = 555.26$. After an immediate move:
> > $$
> > \begin{align*}
> > i = 2\%:\ \ 410.96(1.02)^{-10} + 608.33(1.02)^{-20} &= 746.52 \\
> > 1{,}000(1.02)^{-15} &= 743.01 \\
> > i = 6\%:\ \ 410.96(1.06)^{-10} + 608.33(1.06)^{-20} &= 419.16 \\
> > 1{,}000(1.06)^{-15} &= 417.27
> > \end{align*}
> > $$
> > The surplus is $3.50$ at $2\%$ and $1.89$ at $6\%$ — positive in both directions.
