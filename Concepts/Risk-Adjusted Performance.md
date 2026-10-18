---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:86e79f985e8be91301affe1ad37cb50b8aba593e8cc0586e475a7b76996fe6c4
  sources:
    - "Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Chapter 1 excerpt, pp.1-11, sha256:af37057d34a0c9b927fa8d0246eaf121a500e385c6902a8f8db8b08e6a55fe2c — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-5.pdf"
    - "Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Index excerpt, pp.523-546, sha256:4e7a560b390d357308ca1274a4c35f13e03d3d7c36555455dd25125f675f3517 — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-10.pdf"
    - "Major & Mildenhall, Pricing and Capital Allocation for Multiline Insurance Firms With Finite Assets in an Imperfect Market (arXiv:2008.12427v1, 2020), pp.5-6 (notation), 19-24 (eqs 18-25), sha256:a68e6551421c0861f18fdaebef82591dd173af6a781c66f6b2758a809994cca4 — https://arxiv.org/pdf/2008.12427v1"
    - "CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), pp.4-5, 7 (Domains B and C; text references; study-note and errata hyperlinks), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "CAS abstract record, Cummins, Allocation of Capital in the Insurance Industry (RMIR vol. 3 no. 1, pp.7-27, 2000): abstract, sha256:e794f5454cd27647fe926819fa474a13934475e091a93c69aa752413e234b2f8 — https://www.casact.org/abstract/allocation-capital-insurance-industry"
    - "CAS Exam 9 Working Group, Note to Allocation of Capital in the Insurance Industry (Cummins), January 2026, pp.1-3 (r_E = r_A(1+k1+k2) + r1 s1 + r2 s2; corrected r_i = -(k_i/s_i) r_F + beta_i (r_M - r_F)), sha256:b5768e1c98dd51f4bc86b133f9da30de2cb0497d65f0e34af4861cb122c305fc — https://www.casact.org/sites/default/files/2026-01/Exam_9_Erratum_Cummins_Capital-1.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk-Adjusted Performance.md
---

**Risk-Adjusted Performance** measures the economic result of a [[Business Unit|business unit]] or [[Line of Business|line of business]] relative to the [[Risk Capital]] it uses, so that units carrying very different risk can be compared and each is judged on whether it earns its [[Cost of Capital]]. The two standard measures are the risk-adjusted return on capital (**RAROC**) and economic value added (**EVA**).

> $$\text{RAROC}_i = \frac{\text{NOI}_i}{C_i}$$

> $$\text{EVA}_i = \text{NOI}_i - k\,C_i$$

- $\text{NOI}_i$ is the unit's after-tax net operating income — underwriting result plus investment income on the funds it generates, including the capital allocated to it; $C_i$ is its allocated capital; $k$ the hurdle rate. Since $\text{EVA}_i = (\text{RAROC}_i - k)\,C_i$, a unit creates value exactly when its RAROC exceeds the hurdle.
- **RAROC ranks, EVA sizes.** RAROC is a ratio and flatters small, high-margin units; EVA is in dollars and adds across units (when the allocation is complete), so it is the measure to use when deciding where to grow. Maximising RAROC can shrink the firm below the size that maximises value.
- **Measure economics, not accounting.** Reserves should be at present value and the investment income on them credited to the line. A long-tailed line holds capital for several years, so its charge must cover every year the capital is tied up — a single year's capital understates its cost.
- **The verdict depends on the allocation.** RAROC and EVA inherit whatever capital allocation feeds them (see the example on [[Business Unit]]). Use the same allocation for [[Risk-Adjusted Pricing]] and for performance measurement.
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
