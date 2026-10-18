---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:4329b1ed3b45b822ce8fc393c5f15e601f131319ca22de4d460d7b18b885fc8b
  sources:
    - "CAS Exam 9 Practice Items and Solutions (2026; retired Spring 2026 items), Items 3 (M&M 11.3: cost of capital i = [g(s)-s]/[1-g(s)], g(s) = (s+i)/(1+i), LR = s/g(s)) and 4 (M&M pp.317-318: Shapley allocation), sha256:9cf61c6c2597a9a1a6d2d548d83f78a1a56e73778226176ab30308aa85f615fb — https://www.casact.org/sites/default/files/2026-08/Exam9_PracticeItems_2026.xlsx"
    - "Major & Mildenhall, Pricing and Capital Allocation for Multiline Insurance Firms With Finite Assets in an Imperfect Market (arXiv:2008.12427v1, 2020), pp.1-9 (notation p.5-6), 18-24 (eqs 18-25), sha256:a68e6551421c0861f18fdaebef82591dd173af6a781c66f6b2758a809994cca4 — https://arxiv.org/pdf/2008.12427v1"
    - "Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Chapter 1 excerpt, pp.4-11, sha256:af37057d34a0c9b927fa8d0246eaf121a500e385c6902a8f8db8b08e6a55fe2c — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-5.pdf"
    - "Goldfarb, Risk-Adjusted Performance Measurement for P&C Insurers (CAS study note, rev. Oct 2010), pp.3-5, 9-11, 31-44, sha256:b0ee2f3239c7f53d07401d4c56828d9a1129d5c1f7b660603d811a50019d7b8e — https://www.casact.org/sites/default/files/database/studynotes_goldfarb8.2.pdf"
    - "Robbin, IRR, ROE, and PVI/PVE (CAS Forum Winter 2007), pp.189-191, 201-206, 227-229 (PDF pp.1-3, 13-18, 39-41), sha256:151252827511805261ec416c1454571361957b728d9fcce961f15c7fab268e7c — https://casact.org/sites/default/files/database/forum_07wforum_07w195.pdf"
    - "Myers & Read, Capital Allocation for Insurance Companies (Brattle working paper, Aug 2001), pp.2-9, 22, 44-45, sha256:681450625dce92c765b9fb1762de4d299d060bb852906e79b3233bb6e4aa7a9b — https://www.brattle.com/wp-content/uploads/2017/10/Capital-Allocation-for-Insurance-Companies.pdf"
    - "Ward & Lee, Practical Application of the Risk-Adjusted Return on Capital Framework (CAS Forum 2002), pp.113, 120-125 (PDF pp.35, 42-47), sha256:8fba670b85d32b9ddcb5477e4dde607564737f24c7b39489347ec575b247ff4d — https://www.casact.org/sites/default/files/database/forum_02sforum_02sf079.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026, pp.4-5, 7 (Domains B and C; text references), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Index excerpt, pp.523-546, sha256:4e7a560b390d357308ca1274a4c35f13e03d3d7c36555455dd25125f675f3517 — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-10.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk-Adjusted Pricing.md
---

**Risk-Adjusted Pricing** sets an insurance premium that covers expected losses and expenses plus a margin paying the [[Cost of Capital]] on the [[Risk Capital]] the business consumes — with that capital, and so the margin, measured by the risk's contribution to the insurer's *total* risk rather than by its standalone volatility. It is the capital-based derivation of the profit and risk provision in a rate.

> $$P = E[X \wedge a] + \iota\,(a - P)$$

> $$P = \nu\,E[X \wedge a] + \delta\,a$$

- In Mildenhall and Major's notation: $X$ is the loss, $a$ the assets held (set by a [[Risk Measure]] such as VaR or TVaR), $E[X \wedge a]$ the expected loss the insurer can actually pay, $Q = a - P$ the capital investors supply, $M = P - E[X \wedge a]$ the margin, and $\iota = M/Q$ the cost of capital. Solving the first line for $P$ gives the second, with $\nu = 1/(1+\iota)$ and $\delta = \iota/(1+\iota)$, so $\nu + \delta = 1$. This is **constant cost of capital (CCoC)** pricing; expenses and the time value of money are added on top.
- **From portfolio to policy.** The formula prices the whole portfolio; each [[Line of Business|line]] or policy then needs its share of the margin. Allocating capital (see [[Risk Capital]]) and charging every unit the same $\iota$ is one choice. Mildenhall and Major instead allocate the margin directly, which lets units earn different implied returns on capital.
- **RAROC-target form.** With allocated capital $C_i$ held for one period, invested at yield $y$ and credited to the line, and premium collected at inception, the premium that earns hurdle $k$ is $P_i = \text{PV}(E[L_i]) + \text{PV}(\text{expenses}_i) + \frac{(k - y)\,C_i}{1 + y}$ — the capital earns $y$ while held, so pricing supplies only the spread, discounted from year end to inception. A convention that credits no investment income to the capital needs the full $k\,C_i/(1+y)$.
- **Price to the margin, not the standalone risk.** A policy that diversifies the book needs less capital and so less margin. Pricing on standalone capital overprices diversifying risks, which competitors pricing on the portfolio then take away.
- **Relation to classic loads.** [[Risk Loads]] based on variance or standard deviation, and the [[Profit and Contingency Provision]] of ratemaking, are the same idea expressed without an explicit capital model; [[Insurance Pricing]] with a capital model makes the load traceable to a cost.

> [!example]- Constant Cost of Capital Price for a Portfolio {Example}
> A portfolio has $E[X \wedge a] = \$1{,}000$M. The insurer holds assets $a = \$1{,}600$M, set by its risk measure, and targets a cost of capital $\iota = 12.5\%$. Find the premium, margin, capital, loss ratio and premium-to-capital leverage.
>
> > [!answer]-
> > $\nu = 1/1.125 = 0.8889$ and $\delta = 0.125/1.125 = 0.1111$.
> >
> > $$
> > \begin{align*}
> > P &= 0.8889(1{,}000) + 0.1111(1{,}600) \\
> > &= \$1{,}066.7\text{M} \\
> > M &= 1{,}066.7 - 1{,}000 \\
> > &= \$66.7\text{M} \\
> > Q &= 1{,}600 - 1{,}066.7 \\
> > &= \$533.3\text{M}
> > \end{align*}
> > $$
> >
> > Check: $M/Q = 66.7/533.3 = 12.5\%$. The loss ratio is $1{,}000/1{,}066.7 = 93.75\%$ and premium-to-capital leverage is $1{,}066.7/533.3 = 2.0$. Premium funds part of the assets, so investors supply only $\$533$M of the $\$600$M above expected loss.

> [!example]- Pricing on Allocated versus Standalone Capital {Example}
> A large commercial account has present value of expected loss $\$800$K and expenses $\$150$K. Its marginal (Euler) allocated capital is $\$1{,}000$K; standalone it would need $\$2{,}500$K. The hurdle is $12\%$, capital is invested at $4\%$, and capital is held for one year. Ignore taxes. Price the account both ways.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > P_{\text{allocated}} &= 800 + 150 + \frac{(0.12 - 0.04)(1{,}000)}{1.04} \\
> > &= \$1{,}026.9\text{K} \\
> > P_{\text{standalone}} &= 800 + 150 + \frac{(0.08)(2{,}500)}{1.04} \\
> > &= \$1{,}142.3\text{K}
> > \end{align*}
> > $$
> >
> > The standalone price is $\$115.4$K ($11.2\%$) higher. The account diversifies the book — it adds only $\$1.0$M to the firm's capital need — so the standalone quote charges it for risk the firm never holds. A competitor pricing on its portfolio would write the account at about $\$1{,}027$K and still earn $12\%$ on the capital it actually uses.
