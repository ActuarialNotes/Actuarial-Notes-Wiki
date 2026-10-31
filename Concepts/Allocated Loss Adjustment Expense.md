---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:1d8fd9f56f48c6898fc7cfee007dd0ff1c5b66734906d7ff1cea7a614c855d9b
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, July 30 2010), Part 4 intro p.369 (PDF 375); Ch.16 pp.370-374 (PDF 376-380); Ch.17 p.386 (PDF 392); Ch.1 p.15 (PDF 21), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch.6 'Loss Adjustment Expenses', pp.121-122 (PDF 133-134), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 3
  open_critical: 0
  log: .verify/Concepts/Allocated Loss Adjustment Expense.md
---

**Allocated Loss Adjustment Expense** (ALAE) is claim adjustment cost that can be attributed to a specific claim — defence counsel fees, expert witnesses, independent adjusters, court costs — as opposed to [[Unallocated Loss Adjustment Expenses ULAE|ULAE]], the claims-department overhead that cannot.

> $$\text{Loss \& ALAE} = \text{Indemnity} + \text{ALAE}$$

> $$\text{ALAE Ratio} = \frac{\text{ALAE}}{\text{Indemnity}}$$

- Because ALAE attaches to a claim, it can be **developed in a triangle** exactly like indemnity. Friedland gives three approaches: develop a **combined** loss-and-ALAE triangle, develop **ALAE separately** in its own triangle, or develop a **ratio of ALAE to loss** and apply it to projected losses.
- Combining is simplest and is the usual choice, but it assumes ALAE develops like indemnity. It often does not: defence costs accrue steadily through litigation while indemnity lands at settlement, so an ALAE-only triangle can have a different shape and a different tail.
- **Developing the ratio of paid ALAE to paid claims** (Friedland Ch.16, pp.371–374). Build a triangle of the ratio of cumulative paid ALAE to cumulative paid claims for each accident year at each age, and develop it to an ultimate ratio like any other triangle — multiplicatively, with age-to-age factors on the ratios, or additively. Ultimate ALAE is the selected ultimate ratio times the selected ultimate claims, and unpaid ALAE is ultimate ALAE less paid ALAE.
  - In the additive version, each age-to-age factor is the difference between the ratios at successive ages (the later ratio minus the earlier one), and the factors are averaged and selected as in the standard development technique. The age-to-ultimate factor is the cumulative sum of the selected differences from that age to the last one, and the projected ultimate ratio is the ratio on the latest diagonal plus that age-to-ultimate factor.
  - Wiser notes that if the ratios are very small at early maturities, the additive approach seems to be more stable.
  - Advantages: the ratio method recognizes the relationship between ALAE and claims; its development factors tend not to be as highly leveraged as development factors based on paid ALAE dollars; and actuarial judgment is easy to apply, particularly in selecting the ultimate ratio for the most recent years, where a projected ratio out of line with earlier years (from a change in how ALAE is recorded, or unusually large expenses) can be set aside for an average of the other years.
  - Disadvantages: any error in the estimate of ultimate claims carries into the estimate of ultimate ALAE, and because the projection starts from the latest observed ratio, whatever distorts that ratio, in the ALAE or in the claims paid to date, carries through as well. Developing paid or reported ALAE on its own uses ALAE data alone, so it is not exposed to errors in the claims. The method also assumes the relationship between ALAE and claims has been stable over the experience period; a change in defense strategy, or in the use of external versus internal defense counsel, undermines it.
- The ALAE ratio varies enormously by line — roughly $30$–$50\%$ of indemnity in professional liability, $15$–$25\%$ in general liability, $10$–$15\%$ in auto liability, and a few percent in property. A load taken from one line and applied to another is a substantial error.
- ALAE can be **countercyclical to indemnity**: money spent defending a claim vigorously may reduce the indemnity paid. A "defence and settle" strategy shift moves both components, in opposite directions, and shows up in the triangles as a change in the ALAE ratio.
- Whether ALAE sits inside "losses" matters for the [[Reinsurance|reinsurance]] treaty too: treaties differ on whether ALAE is included within the limit, shared pro rata, or added on top — which changes both [[Ceded Losses|ceded]] and net figures.

![[Media/Figures/Allocated_Loss_Adjustment_Expense.svg|340]]

> [!example]- ALAE on a Litigated Claim {Example}
> A general liability claim settles with an indemnity payment of $\$100{,}000$. Along the way the insurer paid defence counsel $\$25{,}000$, an expert witness $\$8{,}000$, and court costs $\$2{,}000$.
>
> Compute total incurred and the ALAE ratio, and state how the claim appears in the triangles.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{ALAE} &= \$25{,}000 + \$8{,}000 + \$2{,}000 = \$35{,}000 \\[4pt]
> > \text{Loss \& ALAE} &= \$100{,}000 + \$35{,}000 = \$135{,}000 \\[4pt]
> > \text{ALAE ratio} &= \frac{\$35{,}000}{\$100{,}000} = 35\%
> > \end{align*}$$
> >
> > In a **combined** triangle the claim contributes $\$135{,}000$. In **separate** triangles it contributes $\$100{,}000$ to the indemnity triangle and $\$35{,}000$ to the ALAE triangle — and the two will develop differently, since the defence fees were largely paid before the indemnity settlement.
> >
> > A $35\%$ ratio is at the high end for GL and would be worth investigating: is it one unusually litigated claim, or has the book's mix shifted toward disputed claims?

> [!example]- Estimating Unpaid ALAE by the Ratio Approach {Example}
> An actuary has projected ultimate indemnity of $\$12{,}000{,}000$ for an accident year and $\$7{,}500{,}000$ of indemnity paid to date. Historical ratios of ultimate ALAE to ultimate indemnity for mature years are $0.18$, $0.19$, $0.20$ and $0.19$. ALAE paid to date on this year is $\$1{,}400{,}000$.
>
> Estimate unpaid ALAE.
>
> > [!answer]-
> > Select an ultimate ALAE ratio of $0.19$:
> >
> > $$\begin{align*}
> > \text{Ultimate ALAE} &= 0.19 \times \$12{,}000{,}000 \\
> > &= \$2{,}280{,}000 \\[4pt]
> > \text{Unpaid ALAE} &= \$2{,}280{,}000 - \$1{,}400{,}000 \\
> > &= \$880{,}000
> > \end{align*}$$
> >
> > The check worth doing: ALAE is $61\%$ paid ($1{,}400/2{,}280$) while indemnity is $63\%$ paid ($7{,}500/12{,}000$) — close enough that the ratio approach is defensible here.
> >
> > If instead ALAE were $85\%$ paid against $63\%$ on indemnity, the ratio method would be projecting ALAE that has largely already been spent, and a **separate ALAE triangle** would be the better estimator. That comparison — the relative maturity of the two components — is what decides between the methods.
