---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:581e7a1c2b9e7fd0f309703daafb2044a892459436630f34a1de60fbd089ef83
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Key Financial Measures.md
---

**Key Financial Measures** are the standard ratios regulators, [[Rating Agency|rating agencies]], analysts and management use to summarise an insurer's profitability, leverage, reserve adequacy, liquidity and capital strength. They are the numbers through which a growth plan, a reserve change or a [[Reinsurance Strategy|reinsurance strategy]] is actually judged.

> $$\text{Premium-to-surplus} = \frac{\text{Net written premium}}{\text{Policyholders' surplus}}$$
>
> $$\text{Operating ratio} = \text{Combined ratio} - \text{Investment income ratio}$$

- **Profitability** — loss and LAE ratio, expense ratio, [[Combined Ratio|combined ratio]], the operating ratio (combined ratio net of investment income as a percentage of premium), and return on equity. See [[Basic Insurance Ratios]].
- **Leverage** — premium to surplus (how much business each dollar of capital supports) and reserves to surplus (how far a reserve error reaches into capital); see [[Insurance Leverage]]. The NAIC's [[IRIS Ratios]] flag net premiums written to surplus of $300\%$ or more and gross premiums written to surplus of $900\%$ or more.
- **Reserve adequacy** — one-year and two-year development on prior reserves as a percentage of surplus (IRIS flags $20\%$ or more), and an estimated current reserve deficiency to surplus. Development is the measure most often ahead of a failure.
- **Reinsurance and liquidity** — recoverables to surplus, overdue and uncollateralised recoverables ([[Schedule F]] in the U.S.), surplus aid to surplus, and liabilities to liquid assets.
- **Capital** — the [[MCT]] ratio in Canada, the [[Risk-Based Capital|RBC]] ratio in the U.S., and each rating agency's own capital model. Agencies adjust reported capital for items they do not trust in a stress — goodwill, deferred tax assets, surplus relief from quota share reinsurance, holding-company debt — and weigh operating performance, business profile and risk management alongside it.
- **Canada under IFRS 17.** The [[MSA Ratios]] and the industry's key performance indicators were rebuilt around [[Insurance Revenue]] and the [[Insurance Service Result]] from 2023; ratios spanning the transition are a break, not a trend.

> [!example]- Quota Share Effect on Leverage and Profit {Example}
> An insurer writes $\$600$ million of net premium on $\$200$ million of surplus, with $\$300$ million of unearned premium at year end. Its expected loss and LAE ratio is $66\%$ and expense ratio $30\%$. It buys a $25\%$ quota share on its in-force and future business with a $30\%$ ceding commission (not exceeding the acquisition costs on ceded business). Under U.S. statutory accounting, find premium-to-surplus before and after, and the underwriting profit given up.
>
> > [!answer]-
> > **Before:** $600 / 200 = 3.00$ — at the IRIS threshold, so flagged.
> >
> > **Surplus relief** on the ceded unearned premium:
> >
> > $$
> > \begin{align*}
> > \text{Relief} &= 0.30 \times (0.25 \times 300) \\
> > &= 22.5 \\[4pt]
> > \text{P/S after} &= \frac{0.75 \times 600}{200 + 22.5} \\
> > &= \frac{450}{222.5} \\
> > &= 2.02
> > \end{align*}
> > $$
> >
> > **Profit ceded** each year, on ceded premium of $\$150$ million:
> >
> > $$
> > \begin{align*}
> > \text{Reinsurer's margin} &= 150 - 0.30(150) - 0.66(150) \\
> > &= 150 - 45 - 99 \\
> > &= 6
> > \end{align*}
> > $$
> >
> > Leverage falls from $3.00$ to about $2.02$, at a cost of $\$6$ million a year — a quarter of the $\$24$ million expected underwriting profit. Whether that is worth it depends on the reinsurer's credit quality and on how a rating agency treats the $\$22.5$ million of relief, which it may reverse.

> [!example]- Which Treaty Moves Which Measure? {Example}
> An insurer is choosing between a $25\%$ quota share and a catastrophe excess of loss treaty. Which key measures does each improve?
>
> > [!answer]-
> > - **Quota share:** cuts premium-to-surplus and, over time, reserves-to-surplus; gives statutory surplus relief; cedes profit proportionally; adds reinsurance recoverables and therefore credit risk. In Canada, ceded liabilities reduce the MCT requirement only if the reinsurer is [[Registered Reinsurance|registered]] or the cession is collateralised.
> > - **Catastrophe excess of loss:** barely changes premium leverage, but cuts the [[Probable Maximum Loss|PML]], the catastrophe capital charges (the [[Earthquake Exposure Risk Margin]] in the MCT, the catastrophe component of RBC) and earnings volatility — the measures a rating agency stresses.
> >
> > A leverage problem calls for the quota share; a tail problem for the excess of loss. Buying the wrong one improves a ratio nobody was worried about.
