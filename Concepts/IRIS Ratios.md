---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:dbcf704928930f4da2b5e841129fd4f6f5d37cd49ee8e8b6b28b3267f534db53
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/IRIS Ratios.md
---

**IRIS Ratios** are the thirteen property/casualty financial ratios that the NAIC's Insurance Regulatory Information System computes from each insurer's statutory annual statement and compares with a published **usual range**, so that state regulators can decide which insurers to look at first. They are a public screening tool, not a verdict.

> $$\text{NPW to PHS} = \frac{\text{Net premiums written}}{\text{Policyholders' surplus}}$$
>
> $$\text{One-year development to PHS} = \frac{\text{One-year loss and LAE reserve development}}{\text{Prior year-end PHS}}$$

- **The thirteen P&C ratios and their usual ranges** (NAIC *IRIS Ratios Manual*, 2025 edition; a result is unusual when it is **equal to or beyond** the bound):
  - *Overall* — (1) gross premiums written to PHS, below $900\%$; (2) net premiums written to PHS, below $300\%$; (3) change in net premiums written, $-33\%$ to $+33\%$; (4) surplus aid to PHS, below $15\%$.
  - *Profitability* — (5) two-year overall operating ratio, below $100\%$; (6) investment yield, $2.0\%$ to $5.5\%$; (7) gross change in PHS, $-10\%$ to $+50\%$; (8) change in adjusted PHS, $-10\%$ to $+25\%$.
  - *Liquidity* — (9) adjusted liabilities to liquid assets, below $100\%$; (10) gross agents' balances in collection to PHS, below $40\%$.
  - *Reserves* — (11) one-year and (12) two-year reserve development to PHS, each below $20\%$; (13) estimated current reserve deficiency to PHS, below $25\%$.
- The ranges are reviewed every year and have moved (the investment-yield band in particular), so cite the current manual.
- **Reading them together.** Ratios 1–2 measure [[Insurance Leverage|leverage]]; 3, 7 and 8 flag rapid change; 5–6 profitability; 9–10 liquidity; 11–13 reserve adequacy, built from [[Schedule P]] Part 2. A positive development ratio means reserves were **deficient**. Ratio 4 warns that ceding commissions may be flattering the others.
- **What an unusual value means.** Only that the insurer merits a closer look. The manual says outright that stable insurers can fall outside several ranges in a volatile year — surplus is the denominator of most ratios, so an equity-market fall moves many at once — and that no state should rely on IRIS as its only surveillance.
- **Where it sits.** IRIS results are public; the NAIC's regulator-only scoring tools and the Analyst Team build on them within [[Solvency Monitoring]]. Unlike [[Risk-Based Capital]], an IRIS result carries no legal consequence.

> [!example]- Two-Year Overall Operating Ratio {Example}
> An insurer reports, in $\$$ millions (current year, prior year): losses and LAE incurred $400$, $350$; policyholder dividends $5$, $5$; earned premium $520$, $480$; other underwriting expenses $160$, $150$; other income $2$, $2$; net written premium $540$, $500$; net investment income $40$, $36$. Compute IRIS ratio 5.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Loss ratio} &= \frac{400 + 350 + 5 + 5}{520 + 480} \\
> > &= 76.0\% \\
> > \text{Expense ratio} &= \frac{160 + 150 - 2 - 2}{540 + 500} \\
> > &= 29.4\% \\
> > \text{Investment income ratio} &= \frac{40 + 36}{520 + 480} \\
> > &= 7.6\% \\
> > \text{Operating ratio} &= 76.0 + 29.4 - 7.6 \\
> > &= 97.8\%
> > \end{align*}
> > $$
> > Reported as $98\%$: inside the usual range. Underwriting alone runs at about $105\%$; investment income turns it into a small operating profit.

> [!example]- Leverage and Reserve Development {Example}
> The same insurer has policyholders' surplus of $\$180$ million this year-end and $\$170$ million last year-end. Schedule P shows one-year reserve development of $+\$38$ million. Compute ratios 2 and 11 and interpret them with the $98\%$ operating ratio.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{NPW to PHS} &= \frac{540}{180} \\
> > &= 300\% \\
> > \text{One-year development} &= \frac{38}{170} \\
> > &= 22.4\%
> > \end{align*}
> > $$
> > Both are unusual: $300\%$ is **equal to** the bound, and $22\%$ exceeds $20\%$.
> >
> > The development ratio says last year's reserves were short by more than a fifth of last year's surplus — so that surplus, and the leverage computed on it, were overstated. If this year's reserves are set the same way, the $98\%$ operating ratio is flattered too, which is what ratio 13 tests. The analyst's next steps: Schedule P Part 2 by line and accident year to locate the deficiency, and ratio 12 — if two-year development is persistently worse than one-year, the manual flags possible deliberate under-reserving and an on-site examination may be needed.
