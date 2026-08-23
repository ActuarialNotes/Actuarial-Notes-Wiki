---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:625d94d5d84f2f4851c28726c43fe4f7e391e94426e753ccd06417553335d8dd
  sources: []
  open_findings: 0
  log: .verify/Concepts/Allocated Loss Adjustment Expense.md
---

**Allocated Loss Adjustment Expense** (ALAE) is claim adjustment cost that can be attributed to a specific claim — defence counsel fees, expert witnesses, independent adjusters, court costs — as opposed to [[Unallocated Loss Adjustment Expenses ULAE|ULAE]], the claims-department overhead that cannot.

> $$\text{Loss \& ALAE} = \text{Indemnity} + \text{ALAE}$$

> $$\text{ALAE Ratio} = \frac{\text{ALAE}}{\text{Indemnity}}$$

- Because ALAE attaches to a claim, it is captured in case reserves and can be **developed in a triangle** exactly like indemnity. Friedland gives three approaches: develop a **combined** loss-and-ALAE triangle, develop **ALAE separately** in its own triangle, or develop a **ratio of ALAE to loss** and apply it to projected losses.
- Combining is simplest and is the usual choice, but it assumes ALAE develops like indemnity. It often does not: defence costs accrue steadily through litigation while indemnity lands at settlement, so an ALAE-only triangle can have a different shape and a different tail.
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
