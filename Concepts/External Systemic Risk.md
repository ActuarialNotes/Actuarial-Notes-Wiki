---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:25f06fee209837b468f4b64d708faf252a74167e6612d8bf93e30548875de082
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/External Systemic Risk.md
---

**External systemic risk** is the uncertainty from non-random risks outside the actuarial modelling process: systemic episodes that have not yet occurred but may emerge, and emerging ones whose development is uncertain. In [[A Framework for Assessing Risk Margins (Marshall et al. - 2008)|Marshall et al. (2008)]] it is one of the three sources of uncertainty behind a [[Risk Margin|risk margin]]. Even a valuation model that represents today's reality well can be overtaken by future trends, and models fitted to past data only see past episodes.

> $$\mathrm{CoV}_{\text{ext}} = \sqrt{\sum_{c} \mathrm{CoV}_c^2}$$

- $\mathrm{CoV}_c$ is the [[Coefficient of Variation|CoV]] assessed for risk category $c$ in one valuation portfolio, such as motor outstanding claims. The categories are chosen so that they are independent of each other, so there are no cross terms. Across portfolios, each category is combined with its own [[Correlation|correlation]] matrix, and the category totals are then added in the same way.
- **The risk categories:**
  - **Economic and social**: standard inflation (AWE and CPI), economic conditions, fuel prices, driving patterns, and systemic shifts in short-tail claim frequency.
  - **Legislative, political and claims inflation**: legislative change and its erosion, court precedents, medical and legal costs, and shifts in large claims. These are combined because they are often correlated, and together they make up most of what is called [[Superimposed Inflation|superimposed inflation]].
  - **Claim management process change**: changes to reporting, payment, finalisation, reopening or case estimation.
  - **Expense**: the cost of managing the run-off of the liabilities, or of maintaining unexpired risk until the date of loss; generally small.
  - **Event**: single events causing many claims, material for property and motor, and for medical malpractice or builders' warranty (one doctor, one builder).
  - **Latent claim**: claims from a source not currently thought to be covered; material mainly for workers compensation and liability ([[Latent Liability|latent liabilities]]).
  - **Recovery**: reinsurance and non-reinsurance [[Recoveries|recoveries]], including reinsurers' ability to pay.
- **Assessing it.** Identify the potential sources with portfolio and claims management, then rank the categories by expected impact and spend effort on the few that dominate. Event risk tends to dominate property premium liabilities, and legislative, political and claims inflation risk dominates long-tail classes. Quantify with analysis of past systemic episodes, sensitivity tests, [[Catastrophe Modelling|catastrophe models]] and scenarios. Highly skewed risks, such as latent claims, add little at the 75th percentile but more at higher probabilities of adequacy.
- **Correlation.** Each category is uncorrelated with [[Independent Risk|independent risk]], [[Internal Systemic Risk|internal systemic risk]] and the other categories. Within a category, portfolios can be correlated with each other and with the matching outstanding claim or premium liability: claims inflation across long-tail classes, or event risk across property and motor. Correlated categories are merged into a broader one so that independence holds. Correlations are set in bands (nil, low, medium, high, full); the PwC paper's hierarchy of root and class-of-business dummy variables is one way to structure them.
- In the paper's worked example, external systemic risk is the largest of the three sources for the whole portfolio: a CoV of $6.5\%$, against $3.0\%$ for independent and $4.9\%$ for internal systemic risk.

> [!example]- Seven Categories to One CoV {Example}
> For a workers compensation class's outstanding claims, an actuary assesses these CoVs: economic and social $2\%$; legislative, political and claims inflation $8\%$; claim management process $3\%$; expense $1\%$; event $0\%$; latent claim $2\%$; recovery $0.5\%$.
>
> Compute the class's external systemic risk CoV, and say where the effort should go.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \mathrm{CoV}_{\text{ext}}^2 &= 2^2 + 8^2 + 3^2 + 1^2 + 0^2 + 2^2 + 0.5^2 \\
> > &= 82.25 \ (\%^2) \\
> > \mathrm{CoV}_{\text{ext}} &= 9.07\%
> > \end{align*}
> > $$
> >
> > The legislative, political and claims inflation category supplies $64/82.25 = 78\%$ of the variance. That is the typical long-tail pattern, so it is where discussions with the business and scenario analysis matter most. Halving the expense CoV would barely move the result, so a rough view of it is enough.

> [!example]- Event Risk Across Home and Motor {Example}
> In the paper's example, home premium liabilities make up $25\%$ of the insurer's liabilities with an event risk CoV of $15\%$. Motor premium liabilities are also $25\%$, with $3\%$. The correlation adopted for event risk between the two is $50\%$.
>
> Compute the event-risk CoV of the combined home and motor premium liabilities, and compare it with nil correlation.
>
> > [!answer]-
> > The weighted CoVs are $0.25 \times 15\% = 3.75\%$ and $0.25 \times 3\% = 0.75\%$, and the two classes together weigh $50\%$.
> >
> > $$
> > \begin{align*}
> > \text{SD}^2 &= 0.0375^2 + 0.0075^2 + 2(0.5)(0.0375)(0.0075) \\
> > &= 0.00140625 + 0.00005625 + 0.00028125 \\
> > &= 0.00174375 \\
> > \mathrm{CoV} &= \frac{\sqrt{0.00174375}}{0.50} \\
> > &= 8.35\%
> > \end{align*}
> > $$
> >
> > With nil correlation the CoV is $\sqrt{0.0014625}/0.50 = 7.65\%$. One storm damages houses and cars together, so the correlation adds $0.7$ points. Because the categories are independent of each other, the paper needs only seven $6 \times 6$ matrices, one per category, rather than one $42 \times 42$ matrix.
