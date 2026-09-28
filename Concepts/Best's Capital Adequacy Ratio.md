---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d65bc76a2641f70e7cf0979d9957b319045a5648102feace18a5e79e00a5cf7d
  sources: []
  open_findings: 0
  open_critical: 0
  log: ".verify/Concepts/Best's Capital Adequacy Ratio.md"
---

**Best's Capital Adequacy Ratio** (BCAR) is A.M. Best's measure of an insurer's balance-sheet strength: the capital it has, set against the **net required capital** (NRC) that its investment, credit and underwriting risks call for once a covariance adjustment allows that those risks are unlikely to peak together. BCAR is **not on the Fall 2026 syllabus** — the outline assigns only pp. 1–7 and Appendix A of [[Feldblum]], excluding formulae, and BCAR sits in Section 5 (p. 15) — but twelve 2013–2019 questions draw on it, and the outline's financial-health task still names the [[Key Financial Measures|key financial measures]] used by [[Rating Agency|rating agencies]].

> $$\begin{aligned} \text{NRC} &= \sqrt{S} + B_7 \\ S &= B_1^2 + B_2^2 + B_3^2 + (0.5B_4)^2 \\ &\quad + (0.5B_4 + B_5)^2 + B_6^2 \end{aligned}$$
>
> $$\text{BCAR} = \frac{\text{Adjusted surplus}}{\text{NRC}}$$

- **The components:** $B_1$ fixed-income securities, $B_2$ equity securities, $B_3$ interest rate, $B_4$ credit, $B_5$ loss and LAE reserves, $B_6$ net premiums written and $B_7$ business (off-balance-sheet) risk — grouped as **investment**, **credit** and **underwriting** risk, the three categories the 2015–2017 answers name. BCAR feeds balance-sheet strength, which the 2015 answer lists with operating performance and business profile as the components of a Best's rating.
- **Calibration** (Feldblum): BCAR keeps the [[Risk-Based Capital|RBC]] structure of independent categories with a covariance adjustment, adds interest-rate risk and risks hard to read from the statements (asbestos and pollution, catastrophe), and calibrates every charge to a **$1\%$ expected policyholder deficit** — the capital $Z$ at which aggregate excess-of-loss cover above $Z$ has a pure premium of $1\%$ of reserves. On industry figures a $120$ basis point rate rise gives that $1\%$, so each portfolio is stressed by $120$ bp.
- **The covariance (square-root) adjustment** recognises that the components are unlikely to develop at the same time. It shrinks small categories most: with equal volatility, equities one-tenth the size of reserves have one-tenth their marginal effect (Feldblum). Feldblum prints the root as a plain sum of $B_1^2$ to $B_6^2$; the published answers, like A.M. Best's own criteria, add **half the credit charge to the reserve charge** before squaring. $B_7$ stays outside the root because A.M. Best expects capital for it without a diversification benefit.
- **The later form.** A.M. Best's current criteria — and the Fall 2019 answer — add catastrophe risk $B_8^2$ inside the root and state BCAR as a score, $(\text{AC} - \text{NRC}) / \text{AC} \times 100$, positive when available capital (AC) exceeds NRC; scores are read at several VaR confidence levels. The 2013 and 2014 answers use the ratio above, and the 2013 answer reads a BCAR over $100\%$ as secure. Common 2019 errors were writing $0.5B_4^2$ for $(0.5B_4)^2$ and not multiplying by $100$.
- **The natural catastrophe stress test** takes a first event off surplus, raises recoverables and reserves by $40\%$ of the ceded and net losses, and deducts a second event (worked below). Its purpose is to show how sensitive balance-sheet strength is to a catastrophe — A.M. Best does not require an insurer to survive two major events. How far the stressed BCAR may fall — the **tolerance** — depends on **financial flexibility** (able and willing to replace capital at once), **historical volatility** of balance sheet and results, and **exposure to frequency** (several events in a season).
- **Compared with the [[MCT]].** BCAR charges significantly for **future premium**, because A.M. Best expects the balance sheet to support next year's planned business as well as the current book (2018 answer); the MCT's unexpired-coverage margin applies its factors to the greater of net unexpired coverage and $30\%$ of net premiums received in the past year. Both reduce capital for diversification, but the MCT's [[Diversification Credit|diversification credit]] uses one $50\%$ correlation between asset risk (credit plus market) and insurance risk, where BCAR takes a square root over all its components. Against DCAT (renamed [[FCT]] in 2020), BCAR's catastrophe test shares the multiple events but uses a different severity threshold (2015 answer).

> [!example]- Net Required Capital and BCAR {Example}
> An insurer reports (\$000s): $B_1 = 6{,}000$, $B_2 = 14{,}000$, $B_3 = 2{,}500$, $B_5 = 52{,}000$, $B_6 = 24{,}000$, $B_7 = 100$, and adjusted surplus of $80{,}000$. For credit risk: agents' balances of $3{,}000$ carry a $5\%$ factor; reinsurer X (rated A+) owes recoverables of $40{,}000$ plus a ceded reserve deficiency of $1{,}000$, with a $2\%$ capital factor; reinsurer Y (rated A-) owes $15{,}000$ plus $1{,}500$, with a $6\%$ factor. The reinsurance dependence factor is $1.20$, with a minimum dependence charge of $1\%$ of adjusted recoverables.
>
> (a) Calculate BCAR as the 2013 sample answer does. (b) If the insurer also had a catastrophe charge $B_8 = 20{,}000$, what score would the later form give, taking available capital as $80{,}000$?
>
> > [!answer]-
> > **(a) Credit risk.** Recoverables are charged on the amount including the ceded deficiency:
> >
> > $$
> > \begin{align*}
> > \text{Recoverables charge} &= 41{,}000(0.02) + 16{,}500(0.06) \\
> > &= 820 + 990 \\
> > &= 1{,}810 \\
> > \text{Dependence} &= \max\big(1{,}810(0.20),\ 0.01(57{,}500)\big) \\
> > &= \max(362,\ 575) \\
> > &= 575 \\
> > B_4 &= 150 + 1{,}810 + 575 \\
> > &= 2{,}535
> > \end{align*}
> > $$
> >
> > **Net required capital**, with half of $B_4$ standing alone and half added to the reserve charge:
> >
> > $$
> > \begin{align*}
> > S &= 6{,}000^2 + 14{,}000^2 + 2{,}500^2 + 1{,}267.5^2 \\
> > &\quad + 53{,}267.5^2 + 24{,}000^2 \\
> > &= 3{,}653{,}283{,}113 \\
> > \text{NRC} &= \sqrt{S} + 100 \\
> > &= 60{,}442 + 100 \\
> > &= 60{,}542 \\
> > \text{BCAR} &= \frac{80{,}000}{60{,}542} \\
> > &= 132\%
> > \end{align*}
> > $$
> >
> > Above $100\%$, so secure on the 2013 reading. The components sum to $101{,}135$, so the covariance adjustment removes about $40\%$ of gross required capital — and almost all of what is left is reserve and premium risk.
> >
> > **(b) Later form.** $B_8^2$ joins the root:
> >
> > $$
> > \begin{align*}
> > \text{NRC} &= \sqrt{S + 20{,}000^2} + 100 \\
> > &= 63{,}765 \\
> > \text{BCAR} &= \frac{80{,}000 - 63{,}765}{80{,}000} \times 100 \\
> > &= 20.3
> > \end{align*}
> > $$
> >
> > Adding a $20{,}000$ charge raises NRC by only about $3{,}200$: inside the root a charge much smaller than the reserve charge adds little. The positive score says available capital exceeds NRC, by $20\%$ of available capital.

> [!example]- The Natural Catastrophe Stress Test {Example}
> The insurer above (adjusted surplus $80{,}000$, in \$000s) has earthquake as its main catastrophe exposure and a $25\%$ tax rate. For the first event, its gross pre-tax PML is $150{,}000$ and its net pre-tax PML $30{,}000$ (after retention, coinsurance and reinstatement premium). Its 1-in-100 year net pre-tax earthquake PML is $16{,}000$. With the higher recoverables and reserves, net required capital rises to $64{,}000$.
>
> Apply the stress test as the 2013 and 2016 sample answers describe it, and discuss whether A.M. Best would tolerate the result for a subsidiary of an international group with ten years of stable combined ratios.
>
> > [!answer]-
> > **The adjustments:**
> >
> > $$
> > \begin{align*}
> > \text{1. First event off surplus} &= 30{,}000(1 - 0.25) \\
> > &= 22{,}500 \\
> > \text{2. Recoverables up} &= 0.40(150{,}000 - 30{,}000) \\
> > &= 48{,}000 \\
> > \text{3. Reserves up} &= 0.40(30{,}000) \\
> > &= 12{,}000 \\
> > \text{4. Second event off surplus} &= 16{,}000(1 - 0.25) \\
> > &= 12{,}000
> > \end{align*}
> > $$
> >
> > The second event is the 1-in-100 year loss because earthquake is the main exposure; where hurricanes dominate, the answers take the second event equal to the first. Steps 2 and 3 are why NRC rises — larger recoverables raise the credit charge, larger reserves the reserve charge.
> >
> > $$
> > \begin{align*}
> > \text{Stressed surplus} &= 80{,}000 - 22{,}500 - 12{,}000 \\
> > &= 45{,}500 \\
> > \text{Stressed BCAR} &= \frac{45{,}500}{64{,}000} \\
> > &= 71\%
> > \end{align*}
> > $$
> >
> > **Tolerance.** A fall from $132\%$ to $71\%$ is large, but all three factors favour this insurer: a parent group gives **financial flexibility** to replace capital quickly; stable results mean low **historical volatility**; and an **earthquake** is not a peril that recurs within a season the way hail, tornado or hurricane can. A regional mutual with volatile results and hail exposure, stressed to the same figure, would get less tolerance. A.M. Best's current criteria keep steps 1–3, on the 1-in-100 year all-perils PML, and in place of a second-event deduction adjust the $B_8$ catastrophe charge for the reinsurance left after the first event.
