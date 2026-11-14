---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:73082d3fe8bac8707ab0e922acd3228623438566a25ab615aa680581be191cd2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/External Systemic Risk.md
---

**External Systemic Risk** is the uncertainty from non-random risks outside the actuarial modelling process: systemic episodes that have not yet occurred but may emerge, and emerging ones whose development is uncertain. In [[A Framework for Assessing Risk Margins (Marshall et al. - 2008)|Marshall et al. (2008)]] it is one of the three sources of uncertainty behind a [[Risk Margin|risk margin]]. Even a valuation model that represents today's reality well can be overtaken by future trends, and models fitted to past data only see past episodes.

The external systemic risk of one valuation portfolio, such as motor outstanding claims, is assessed by risk category. The categories are chosen so that they are independent of each other, so there are no cross terms, and its [[Coefficient of Variation|CoV]] is

> $$\mathrm{CoV}_{\text{ext}} = \sqrt{\sum_{c} \mathrm{CoV}_c^2}$$

- $\mathrm{CoV}_c$ is the CoV assessed for risk category $c$.

The risk categories are:

1. **Economic and social**: standard inflation (AWE and CPI), economic conditions, fuel prices, driving patterns, and systemic shifts in short-tail claim frequency.
2. **Legislative, political and claims inflation**: legislative change and its erosion, court precedents, medical and legal costs, and shifts in large claims. These are combined because they are often correlated, and together they make up most of what is called [[Superimposed Inflation|superimposed inflation]].
3. **Claim management process change**: changes to reporting, payment, finalisation, reopening or case estimation.
4. **Expense**: the cost of managing the run-off of the liabilities, or of maintaining unexpired risk until the date of loss. It is generally small.
5. **Event**: single events causing many claims, material for property and motor, and for medical malpractice or builders' warranty (one doctor, one builder).
6. **Latent claim**: claims from a source not currently thought to be covered; material mainly for workers compensation and liability ([[Latent Liability|latent liabilities]]).
7. **Recovery**: reinsurance and non-reinsurance [[Recoveries|recoveries]], including reinsurers' ability to pay.

Each category is uncorrelated with [[Independent Risk|independent risk]], [[Internal Systemic Risk|internal systemic risk]] and the other categories. In the paper's worked example, external systemic risk is the largest of the three sources for the whole portfolio: a CoV of $6.5\%$, against $3.0\%$ for independent and $4.9\%$ for internal systemic risk.

> [!example]- What is this class's external systemic risk CoV, and where should the effort go? {Example}
> For a workers compensation class's outstanding claims, an actuary assesses these CoVs:
>
> | Category | CoV |
> | :--- | ---: |
> | Economic and social | 2% |
> | Legislative, political and claims inflation | 8% |
> | Claim management process | 3% |
> | Expense | 1% |
> | Event | 0% |
> | Latent claim | 2% |
> | Recovery | 0.5% |
>
> > [!answer]-
> > - The squared CoVs sum to $2^2 + 8^2 + 3^2 + 1^2 + 0^2 + 2^2 + 0.5^2 = 82.25$ (in $\%^2$).
> > - The class's external systemic risk CoV is $\sqrt{82.25} = 9.07\%$.
> > - The legislative, political and claims inflation category supplies $64/82.25 = 78\%$ of the variance, the typical long-tail pattern.
> > - The effort goes there, in discussions with the business and scenario analysis. A rough view of the expense CoV is enough, since halving it would barely move the result.

## Assessing external systemic risk

The potential sources are identified with portfolio and claims management. The categories are then ranked by expected impact, and effort goes to the few that dominate. Event risk tends to dominate property premium liabilities, and legislative, political and claims inflation risk dominates long-tail classes. Quantify with analysis of past systemic episodes, sensitivity tests, [[Catastrophe Modelling|catastrophe models]] and scenarios. Highly skewed risks, such as latent claims, add little at the 75th percentile but more at higher probabilities of adequacy.

## Correlation between portfolios

Across portfolios, each category is combined with its own [[Correlation|correlation]] matrix, and the category totals are then added in the same way. Within a category, portfolios can be correlated with each other and with the matching outstanding claim or premium liability: claims inflation across long-tail classes, or event risk across property and motor. Correlated categories are merged into a broader one so that independence holds. Correlations are set in bands (nil, low, medium, high, full). The PwC paper's hierarchy of root and class-of-business dummy variables is one way to structure them.

> [!example]- What is the event-risk CoV of the combined home and motor premium liabilities? {Example}
> In the paper's example, home premium liabilities make up $25\%$ of the insurer's liabilities with an event risk CoV of $15\%$. Motor premium liabilities are also $25\%$, with $3\%$. The correlation adopted for event risk between the two is $50\%$.
>
> > [!answer]-
> > - The weighted CoVs are $0.25 \times 15\% = 3.75\%$ and $0.25 \times 3\% = 0.75\%$, and the two classes together weigh $50\%$.
> > - The variance is $0.0375^2 + 0.0075^2 + 2(0.5)(0.0375)(0.0075) = 0.00174375$.
> > - The CoV is $\sqrt{0.00174375}/0.50 = 8.35\%$.
> > - With nil correlation it would be $\sqrt{0.0014625}/0.50 = 7.65\%$. One storm damages houses and cars together, so the correlation adds $0.7$ points.
> > - Because the categories are independent of each other, the paper needs only seven $6 \times 6$ matrices, one per category, rather than one $42 \times 42$ matrix.
