---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:146c97d04250a4678ff6cc67f86548cab4a3bb8bf4839710989cc738fe277289
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Catastrophe Exposure Management.md
---

**Catastrophe Exposure Management** is controlling how much catastrophe loss an [[Insurance Portfolio|insurance portfolio]] as a whole can suffer from one event or one bad year. It measures accumulations, sets limits relative to capital, steers what is written where and transfers the excess, so that no plausible catastrophe threatens solvency.

## Measuring the accumulation

The crude measure is total insured value by zone. The modelled measures are the occurrence and aggregate exceedance curves, the [[Probable Maximum Loss|PML]] at return periods such as 1-in-100 and 1-in-250, and tail averages (TVaR), by peril and region, gross and net of reinsurance. The PML at probability level $p$ is a value at risk:

> $$\text{PML}_p = \text{VaR}_p(\text{annual catastrophe loss})$$

- $p$ is $1 - 1/N$ for a 1-in-$N$ return period, so the 1-in-250 PML is $\text{VaR}_{0.996}$.

Geocoding and construction data drive all of these measures ([[Data Quality|data quality]]).

## Setting tolerances

A [[Risk Appetite|risk appetite]] typically caps a net PML or TVaR as a share of surplus, with capacity limits for peak zones.

> [!example]- Can this insurer grow in its peak zone, and how could it fix a breach? {Example}
> Risk appetite caps the net 1-in-250 hurricane PML at 15% of a surplus of $\$800\text{M}$. The gross 1-in-250 PML is $\$420\text{M}$, and the catastrophe programme is $\$300\text{M}$ xs $\$100\text{M}$. A growth plan would raise the gross PML by 10%.
>
> > [!answer]-
> > - The tolerance is $0.15 \times 800 = \$120\text{M}$.
> > - Today the programme covers $100$ to $400$, so the net PML is $100 + (420 - 400) = \$120\text{M}$, exactly at the limit.
> > - After growth, the gross PML is $1.10 \times 420 = \$462\text{M}$.
> > - The net PML becomes $100 + (462 - 400) = \$162\text{M}$, a breach of $\$42\text{M}$.
> > - Buying $\$42\text{M}$ more limit ($\$342\text{M}$ xs $\$100\text{M}$) brings the net back to $\$120\text{M}$. Ceding part of the new business on a quota share, or growing outside the peak zone, also works.
> > - The cost of each fix is weighed against the margin the new business earns.

## Underwriting at the margin

Model-based portfolio management judges each new account by its *marginal* effect $\Delta\rho$ on the portfolio's AAL and tail, not by its stand-alone loss. For a [[Risk Measure|risk measure]] $\rho$, that effect is

> $$\Delta \rho = \rho(\text{portfolio} + \text{account}) - \rho(\text{portfolio})$$

An account in an unrelated region can add little to the portfolio's tail; the same account in the peak zone adds a great deal, and should be priced or declined accordingly ([[Concentration Risk|concentration risk]]).

> [!example]- How do these two accounts change the portfolio's AAL, VaR and TVaR at 99%? {Example}
> Assume at most one event a year. The portfolio's event losses ($M) are below. Account A would add $15$ and $6$ to the two zone A events. Account B would add $25$ and $4$ to the two zone B events.
>
> | Event | Probability | Loss |
> | :--- | ---: | ---: |
> | Zone A major hurricane | 0.008 | 80 |
> | Zone A minor hurricane | 0.030 | 30 |
> | Zone B earthquake | 0.004 | 60 |
> | Zone B hail | 0.050 | 10 |
>
> > [!answer]-
> > - Both accounts add the same expected loss, $0.008(15) + 0.03(6) = 0.004(25) + 0.05(4) = 0.30$, taking the AAL from $2.28$ to $2.58$.
> > - Base: $P(L \geq 80) = 0.008$ and $P(L \geq 60) = 0.012$, so $\text{VaR}_{0.99} = 60$, and the worst 1% is 0.8% at $80$ and 0.2% at $60$.
> > - Base TVaR: $(0.008 \times 80 + 0.002 \times 60)/0.01 = 76$.
> > - With A, the 1% point is still the earthquake at $60$, so $\Delta\text{VaR} = 0$. TVaR is $(0.008 \times 95 + 0.002 \times 60)/0.01 = 88$, so $\Delta\text{TVaR} = 12$.
> > - With B, the earthquake becomes $85$, and the two large events together have probability $0.012$, so $\text{VaR}_{0.99} = 80$ and $\Delta\text{VaR} = 20$. TVaR is $(0.004 \times 85 + 0.006 \times 80)/0.01 = 82$, so $\Delta\text{TVaR} = 6$.
> > - VaR calls account A free and B expensive, and TVaR says the reverse. Account A loads the 1-in-125 event that VaR at 1-in-100 cannot see.

## Transfer and mitigation

Catastrophe excess of loss and quota share [[Reinsurance|reinsurance]], [[CAT Bonds]] and other [[Insurance-Linked Securities]] move the tail off the balance sheet. Policy terms such as percentage hurricane deductibles and sublimits, and mitigation incentives, shrink it at source ([[Risk Mitigation|risk mitigation]]). Recoveries are only as good as the counterparties ([[Reinsurance Credit Risk|reinsurance credit risk]]).

> [!trap] Managing to one PML
> A limit at a single return period can be met by adding risk just beyond it, and model and climate uncertainty are large ([[Model Risk|model risk]], [[Climate Risk|climate risk]]). Track more than one [[Risk Measure|risk measure]] and more than one model, as the VaR and TVaR example shows.
