---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e9cacc371bfa7593e28bc2ee148d5846b953a56ffe0d1d34f63cc06ab8e1d237
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Key Financial Measures.md
---

**Key Financial Measures** are the standard ratios that regulators, [[Rating Agency|rating agencies]], analysts and management use to summarise an insurer's profitability, leverage, reserve adequacy, liquidity and capital strength. A growth plan, a reserve change or a [[Reinsurance Strategy|reinsurance strategy]] is judged through them.

## Profitability

The profitability measures are the loss and LAE ratio, the expense ratio, the [[Combined Ratio|combined ratio]], the operating ratio and return on equity (see [[Basic Insurance Ratios]]). The operating ratio is the combined ratio net of investment income as a percentage of premium:

> $$\text{Operating ratio} = \text{Combined ratio} - \text{Investment income ratio}$$

- The investment income ratio is investment income as a percentage of premium.

## Leverage

The leverage measures are premium to surplus, which shows how much business each dollar of capital supports, and reserves to surplus, which shows how far a reserve error reaches into capital (see [[Insurance Leverage]]). Premium to surplus is

> $$\text{Premium-to-surplus} = \frac{\text{Net written premium}}{\text{Policyholders' surplus}}$$

The NAIC's [[IRIS Ratios]] flag net premiums written to surplus of $300\%$ or more and gross premiums written to surplus of $900\%$ or more.

> [!example]- How does a quota share change this insurer's premium-to-surplus, and what profit does it give up? {Example}
> An insurer writes $\$600$ million of net premium on $\$200$ million of surplus, with $\$300$ million of unearned premium at year end. Its expected loss and LAE ratio is $66\%$ and its expense ratio $30\%$. It buys a $25\%$ quota share on its in-force and future business with a $30\%$ ceding commission, not exceeding the acquisition costs on the ceded business. Use U.S. statutory accounting.
>
> > [!answer]-
> > - Before, premium-to-surplus is $600/200 = 3.00$, at the IRIS threshold, so it is flagged.
> > - The ceded unearned premium is $0.25 \times 300 = \$75$ million, and the ceding commission on it gives surplus relief of $0.30 \times 75 = \$22.5$ million.
> > - After, net written premium is $0.75 \times 600 = \$450$ million, and premium-to-surplus is $450/(200 + 22.5) = 2.02$.
> > - On ceded premium of $\$150$ million, the reinsurer's margin is $150 - 0.30(150) - 0.66(150) = 150 - 45 - 99 = \$6$ million a year.
> > - Leverage falls from $3.00$ to about $2.02$ at a cost of $\$6$ million a year, a quarter of the $\$24$ million expected underwriting profit. Whether that is worth it depends on the reinsurer's credit quality and on how a rating agency treats the $\$22.5$ million of relief, which it may reverse.

## Reserve adequacy

The reserve adequacy measures are one-year and two-year development on prior reserves as a percentage of surplus, which IRIS flags at $20\%$ or more, and an estimated current reserve deficiency to surplus. Development is the measure most often ahead of a failure.

## Reinsurance and liquidity

The reinsurance and liquidity measures are recoverables to surplus, overdue and uncollateralised recoverables ([[Schedule F]] in the U.S.), surplus aid to surplus, and liabilities to liquid assets.

## Capital

The capital measures are the [[MCT]] ratio in Canada, the [[Risk-Based Capital|RBC]] ratio in the U.S., and each rating agency's own capital model. Agencies adjust reported capital for items they do not trust in a stress, such as goodwill, deferred tax assets, surplus relief from quota share reinsurance and holding-company debt. They weigh operating performance, business profile and risk management alongside it.

> [!example]- An insurer is choosing between a $25\%$ quota share and a catastrophe excess of loss treaty. Which key measures does each improve? {Example}
> - A quota share cuts premium-to-surplus and, over time, reserves-to-surplus, and gives statutory surplus relief.
> - It also cedes profit proportionally and adds reinsurance recoverables, and with them credit risk. In Canada, ceded liabilities reduce the MCT requirement only if the reinsurer is [[Registered Reinsurance|registered]] or the cession is collateralised.
> - A catastrophe excess of loss treaty barely changes premium leverage.
> - It cuts the [[Probable Maximum Loss|PML]], the catastrophe capital charges (the [[Earthquake Exposure Risk Margin]] in the MCT, the catastrophe component of RBC) and earnings volatility, which are the measures a rating agency stresses.
> - A leverage problem therefore calls for the quota share, and a tail problem for the excess of loss.

## Key measures in Canada under IFRS 17

The [[MSA Ratios]] and the Canadian industry's key performance indicators were rebuilt around [[Insurance Revenue]] and the [[Insurance Service Result]] from 2023. A ratio spanning the transition has a break in the series at 2023, so its movement across the transition is not a trend.
