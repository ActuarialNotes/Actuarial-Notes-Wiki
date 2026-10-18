---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:571dc09255fc2b197232a7040a723967e07edeb029c8bda556f10fe03824f9df
  sources:
    - "Goldfarb, Risk-Adjusted Performance Measurement for P&C Insurers (CAS study note, rev. Oct 2010), pp.3-5, 9-11, 31-44, sha256:b0ee2f3239c7f53d07401d4c56828d9a1129d5c1f7b660603d811a50019d7b8e — https://www.casact.org/sites/default/files/database/studynotes_goldfarb8.2.pdf"
    - "Ward & Lee, Practical Application of the Risk-Adjusted Return on Capital Framework (CAS Forum 2002), pp.113, 120-125 (PDF pp.35, 42-47), sha256:8fba670b85d32b9ddcb5477e4dde607564737f24c7b39489347ec575b247ff4d — https://www.casact.org/sites/default/files/database/forum_02sforum_02sf079.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026, pp.4-5, 7 (Domains B and C; text references), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Index excerpt, pp.523-546, sha256:4e7a560b390d357308ca1274a4c35f13e03d3d7c36555455dd25125f675f3517 — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-10.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk-Adjusted Performance.md
---

**Risk-Adjusted Performance** measures the economic result of a [[Business Unit|business unit]] or [[Line of Business|line of business]] relative to the [[Risk Capital]] it uses, so that units carrying very different risk can be compared and each is judged on whether it earns its [[Cost of Capital]]. The two standard measures are the risk-adjusted return on capital (**RAROC**) and economic value added (**EVA**).

> $$\text{RAROC}_i = \frac{\text{NOI}_i}{C_i}$$

> $$\text{EVA}_i = \text{NOI}_i - k\,C_i$$

- $\text{NOI}_i$ is the unit's net operating income (pre- or after-tax, with the hurdle on the same basis) — underwriting result plus investment income on the funds it generates; $C_i$ is its allocated capital; $k$ the hurdle rate. Conventions differ on the capital itself: some credit the line with investment income on its allocated capital as well as on its reserves, others credit only the policyholder-supplied funds — as CAS's model solution to Exam 9 Spring 2013 Q15 does — so state which is used. Since $\text{EVA}_i = (\text{RAROC}_i - k)\,C_i$, a unit creates value exactly when its RAROC exceeds the hurdle.
- **RAROC ranks, EVA sizes.** RAROC is a ratio; EVA is in dollars and adds across units (when the allocation is complete), which is the advantage of a profitability measure denominated in dollars.
- **Measure economics, not accounting.** Reserves should be at present value and the investment income on them credited to the line. A long-tailed line holds capital for several years, so its charge must cover every year the capital is tied up — a single year's capital understates its cost.
- **The verdict depends on the allocation.** RAROC and EVA inherit whatever capital allocation feeds them: two reasonable allocations can rank the same two units in opposite orders (see the example on [[Business Unit]], and [[Risk-Adjusted Pricing]] for the same capital used to set prices).
- **Acting on it.** A unit below its hurdle can be repriced, reinsured (lowering its capital), re-underwritten or shrunk; one comfortably above it is a candidate for growth. This is the "evaluate economic performance" step of [[Financial Risk Management]].

> [!example]- RAROC and EVA Across Three Lines {Example}
> The hurdle rate is $10\%$. After-tax NOI and allocated capital ($\$$M):
>
> - Personal auto: NOI $45$, capital $300$
> - Commercial property: NOI $30$, capital $400$
> - Workers compensation: NOI $12$, capital $80$
>
> Compute RAROC and EVA for each line and for the firm.
>
> > [!answer]-
> > - Personal auto: RAROC $= 45/300 = 15.0\%$; EVA $= 45 - 30 = +15$
> > - Commercial property: RAROC $= 30/400 = 7.5\%$; EVA $= 30 - 40 = -10$
> > - Workers compensation: RAROC $= 12/80 = 15.0\%$; EVA $= 12 - 8 = +4$
> >
> > $$
> > \begin{align*}
> > \text{RAROC}_{\text{firm}} &= \frac{87}{780} \\
> > &= 11.2\% \\
> > \text{EVA}_{\text{firm}} &= 87 - 0.10(780) \\
> > &= 9
> > \end{align*}
> > $$
> >
> > The line EVAs add to the firm's: $15 - 10 + 4 = 9$. Auto and workers compensation earn the same RAROC, but auto creates almost four times the value. Property destroys $\$10$M — before cutting it, check whether its tail-driven capital allocation is right and whether catastrophe reinsurance would lower its capital by more than it costs.

> [!example]- Long-Tailed Capital and the One-Year Illusion {Example}
> A commercial liability accident year ties up capital of $\$100$M in year 1, $\$60$M in year 2 and $\$30$M in year 3 as claims settle. The present value of its NOI over its life is $\$14$M. An analyst reports RAROC $= 14/100 = 14\%$ against a $10\%$ hurdle. Evaluate the line with a charge of $10\%$ on each year's capital, paid at year-end and discounted at $10\%$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{PV(charges)} &= \frac{10}{1.1} + \frac{6}{1.1^2} + \frac{3}{1.1^3} \\
> > &= 9.09 + 4.96 + 2.25 \\
> > &= 16.30 \\
> > \text{EVA} &= 14 - 16.30 \\
> > &= -\$2.30\text{M}
> > \end{align*}
> > $$
> >
> > Dividing lifetime profit by first-year capital ignores the two further years the capital is held. Charged for all three, the line falls short of its cost of capital by $\$2.3$M in present value — it looks profitable only because its capital consumption is understated.
