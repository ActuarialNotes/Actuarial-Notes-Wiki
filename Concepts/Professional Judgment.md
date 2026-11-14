---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:1f5756343e2d19ff358a554c4310e39f3f6bf6a810fe68a983d8bfb33e23b964
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Professional Judgment.md
---

**Professional Judgment** is the actuary's application of specialized training, together with the broader knowledge and understanding that come from experience, at the points of an assignment where no rule, data set or formula decides the answer. The [[Actuarial Standards of Practice|standards of practice]] require that it be reasonable, documented and disclosed.

In estimating unpaid claims and rates, Friedland's process calls for judgment at every step:

1. Which data to use and how to group it.
2. Which diagnostics matter.
3. Which methods suit the line and the maturity.
4. Which [[Development Factor|development factors]] and [[Trend|trend]] rates to select.
5. How much [[Credibility|credibility]] to give the data.
6. Which estimate to select from the [[Range of Indications|range of indications]].

ASOP No. 1, the introductory U.S. standard, explains that actuaries bring to their assignments not only specialized training but also the broader knowledge that comes from experience, and that the standards often call on them to apply both. The standards give a framework for judgment and do not replace it. ISAP 1 takes the same approach internationally.

> [!example]- Which severity trend rate should this ratemaking analysis select? {Example}
> Exponential fits to severity give 4.1% over 20 points, 5.6% over 12 points and 8.9% over the latest 6 points, and an external index shows 4.5%. The latest points include two unusually large claims. The trend period is 2.5 years.
>
> > [!answer]-
> > - The trend factors are $1.041^{2.5} = 1.1057$, $1.056^{2.5} = 1.1459$ and $1.089^{2.5} = 1.2376$.
> > - The 6-point fit would raise projected losses by about 12% more than the 20-point fit, and it rests on two claims that may not recur.
> > - A selection of 5.0%, giving $1.05^{2.5} = 1.1297$, balances the longer fits, the external index and the recent increase.
> > - The reasons, the fits rejected and the sensitivity of the indication to the choice belong in the documentation.

## Limits of judgment

Judgment is not a substitute for data or analysis. It must be consistent with the evidence, with the [[Accepted Actuarial Practice|accepted practice]] of the field, and with any method or assumption that law or regulation prescribes. Where law or a regulator prescribes a method or assumption, the actuary follows it and discloses that it was prescribed. A selection that no diagnostic supports, or one that moves with the result the principal wants, is bias.

## Selecting from a range of indications

When several methods are judged appropriate, the selected [[Ultimate Loss|ultimate]] is

> $$\hat U^{*} = \sum_{m \in M} w_m\,\hat U_m$$

- $M$ is the set of methods judged appropriate for the data.
- $\hat U_m$ is method $m$'s indicated ultimate.
- $w_m \ge 0$ is the weight given to method $m$, and the weights sum to 1.

The selection therefore lies between the lowest and highest indications. The weights are not estimated statistically. They are the actuary's judgment, written down so another actuary can follow and challenge them. The spread of reasonable indications is not the range of possible outcomes, so selecting within the indications does not mean the actual result will fall there.

> [!example]- Which ultimate and unpaid claims should this actuary select, and why? {Example}
> For accident year 2023 of a general liability book, evaluated at 24 months, the indications are, in \$ millions:
>
> | Method | Ultimate |
> | :--- | ---: |
> | Reported development | 12.6 |
> | Paid development | 10.2 |
> | Bornhuetter-Ferguson, reported | 11.4 |
> | Bornhuetter-Ferguson, paid | 10.8 |
> | Expected claims | 10.5 |
>
> The average case reserve per open claim rose 18% in the latest year, against a severity trend of about 5%, while claim closure rates are unchanged. Paid to date is \$4.2 million.
>
> > [!answer]-
> > - The case reserve test shows a strengthening of case reserves, so the reported methods project the stronger reserves as if they were normal development.
> > - Their high answers are a known bias, so the reported methods get no weight.
> > - Closure rates are stable, so the paid methods are sound.
> > - Paid development is leveraged at 24 months, so it shares the weight equally with paid Bornhuetter-Ferguson: $0.5(10.2) + 0.5(10.8) = 10.5$.
> > - The unpaid claims are $10.5 - 4.2 = 6.3$, and the expected claims method's 10.5 corroborates the selection.
> > - The documentation records the diagnostic, why the reported methods were set aside, the weights, and what would change the selection.
> > - If the strengthening proves to be a change in adequacy that persists, a [[Berquist-Sherman Method|Berquist-Sherman]] adjustment of the reported triangle should be added.
> > - The selected ultimate is \$10.5 million and the unpaid claims \$6.3 million.

## Documentation and disclosure

The reasoning should be recorded well enough that another actuary qualified in the same practice area could make an objective appraisal of the work. A selection recorded only as "based on judgment" does not meet this. The documentation names the evidence, the alternatives considered and why they were rejected. Material assumptions, changes from the previous analysis, reliance on others and the uncertainty in the result are disclosed in the actuarial communication.

## Guarding against bias

Judgment is exposed to [[Cognitive Bias|cognitive biases]] such as anchoring on last year's selection and overconfidence in a narrow range. [[Peer Review|Peer review]], [[Reasonableness Testing|reasonableness tests]] and comparing actual with expected emergence are the usual checks.

> [!trap] Averaging every method
> Giving every method equal weight is not neutral. A method the diagnostics contradict should be set aside or adjusted, because averaging it in carries its bias into the selection. In the example above, an equal average of all five indications would be 11.1, not 10.5.
