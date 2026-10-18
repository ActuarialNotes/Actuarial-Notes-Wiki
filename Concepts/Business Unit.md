---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:8f57928f21f521b69207105e41f25eec4954eb21c5105141228f8f1ee746264d
  sources:
    - "Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Chapter 1 excerpt, pp.1-11, sha256:af37057d34a0c9b927fa8d0246eaf121a500e385c6902a8f8db8b08e6a55fe2c — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-5.pdf"
    - "Mildenhall & Major, Pricing Insurance Risk (Wiley 2022), Index excerpt, pp.523-546, sha256:4e7a560b390d357308ca1274a4c35f13e03d3d7c36555455dd25125f675f3517 — https://media.wiley.com/product_data/excerpt/70/11197556/1119755670-10.pdf"
    - "Major & Mildenhall, Pricing and Capital Allocation for Multiline Insurance Firms With Finite Assets in an Imperfect Market (arXiv:2008.12427v1, 2020), pp.5-6 (notation), 19-24 (eqs 18-25), sha256:a68e6551421c0861f18fdaebef82591dd173af6a781c66f6b2758a809994cca4 — https://arxiv.org/pdf/2008.12427v1"
    - "CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), pp.4-5, 7 (Domains B and C; text references; study-note and errata hyperlinks), sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
    - "CAS abstract record, Cummins, Allocation of Capital in the Insurance Industry (RMIR vol. 3 no. 1, pp.7-27, 2000): abstract, sha256:e794f5454cd27647fe926819fa474a13934475e091a93c69aa752413e234b2f8 — https://www.casact.org/abstract/allocation-capital-insurance-industry"
    - "CAS Exam 9 Working Group, Note to Allocation of Capital in the Insurance Industry (Cummins), January 2026, pp.1-3 (r_E = r_A(1+k1+k2) + r1 s1 + r2 s2; corrected r_i = -(k_i/s_i) r_F + beta_i (r_M - r_F)), sha256:b5768e1c98dd51f4bc86b133f9da30de2cb0497d65f0e34af4861cb122c305fc — https://www.casact.org/sites/default/files/2026-01/Exam_9_Erratum_Cummins_Capital-1.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Business Unit.md
---

**A Business Unit** is a separately managed and separately measured part of an insurer — a line of business, a product group, a region, a distribution channel, a subsidiary or any other profit centre — to which [[Financial Risk Management]] assigns [[Risk Capital]], a [[Cost of Capital|capital charge]] and performance targets. It is the unit of decision: where prices are set, growth is chosen, and managers are held accountable.

> $$\text{EVA}_{\text{firm}} = \sum_i \left(\text{NOI}_i - k\,C_i\right)$$

- $\text{NOI}_i$ is unit $i$'s net operating income, $C_i$ its allocated capital and $k$ the hurdle rate. The identity holds only when the allocation is **complete**, $\sum_i C_i = C$ — otherwise the units' results do not add up to the firm's. Merton–Perold marginal capital, for example, leaves part of $C$ unallocated, and someone (usually corporate) has to carry its cost.
- **Unit versus line.** A [[Line of Business]] is a product and regulatory classification; a business unit is organisational and may cut across lines (a commercial division writing several lines) or split one (personal auto by region or channel). The same allocation methods apply to either.
- **Units share one pool of capital.** A unit's capital is notional: if the insurer fails, every unit's policyholders go unpaid together. Separate legal entities can be ring-fenced to a degree, but rating agencies and markets judge the group. The diversification benefit belongs to the portfolio, and the allocation method decides how it is shared.
- **Incentives.** Charged on standalone capital, a unit is over-charged and will underwrite too little of the business that diversifies the firm. Charged on marginal capital, it sees the true effect of its growth on the firm's risk. Use the *same* allocation to set a unit's [[Risk-Adjusted Pricing|target prices]] and to judge its [[Risk-Adjusted Performance|results]], or it is priced to one standard and measured against another.

> [!example]- The Allocation Method Decides Which Unit Passes {Example}
> Two units: X earns $\text{NOI} = \$12$M with standalone capital $\$100$M; Y earns $\$20$M with standalone capital $\$150$M. Together they need $\$200$M, and the hurdle rate is $16\%$.
>
> Compute each unit's RAROC and EVA if capital is allocated (a) in proportion to standalone capital, (b) by Merton–Perold marginal capital scaled up to $\$200$M.
>
> > [!answer]-
> > **(a) Proportional.** $X = 200 \times 100/250 = 80$ and $Y = 120$.
> >
> > - X: RAROC $= 12/80 = 15.0\%$; EVA $= 12 - 0.16(80) = -0.8$
> > - Y: RAROC $= 20/120 = 16.7\%$; EVA $= 20 - 0.16(120) = +0.8$
> >
> > **(b) Scaled marginal.** Marginal capital is $X = 200 - 150 = 50$ and $Y = 200 - 100 = 100$, summing to $150$; scale each by $200/150$:
> >
> > $$
> > \begin{align*}
> > C_X &= 50 \times \tfrac{200}{150} \\
> > &= 66.7 \\
> > C_Y &= 100 \times \tfrac{200}{150} \\
> > &= 133.3
> > \end{align*}
> > $$
> >
> > - X: RAROC $= 12/66.7 = 18.0\%$; EVA $= 12 - 10.67 = +1.33$
> > - Y: RAROC $= 20/133.3 = 15.0\%$; EVA $= 20 - 21.33 = -1.33$
> >
> > The verdict on each unit reverses, while the firm is unchanged: its EVA is $32 - 0.16(200) = 0$ under both methods. X adds only half its standalone capital to the firm's need, so a method that credits diversification rewards it. Before shrinking the unit that "fails", management should be sure the allocation measures what it wants to reward.
