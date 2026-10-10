---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a6cdec7801f1ad9415161cc25ecd0e650b4bf26f6c4fc21243b6b6061592e36f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Professional Judgment.md
---

**Professional Judgment** is the actuary's application of specialized training together with the broader knowledge and understanding that come from experience, at the points of an assignment where no rule, data set or formula decides the answer. In general insurance work it is exercised in choosing data, methods and assumptions, in weighing divergent indications, and in selecting the final estimate, and the [[Actuarial Standards of Practice|standards of practice]] require that it be reasonable, documented and disclosed.

> $$\hat U^{*} = \sum_{m \in M} w_m\,\hat U_m$$

> $$\sum_{m \in M} w_m = 1$$

> $$\hat U^{*} \in \Big[\min_{m \in M} \hat U_m,\ \max_{m \in M} \hat U_m\Big]$$

- **Symbols:** $M$ is the set of methods judged appropriate for the data, $\hat U_m$ is method $m$'s indicated [[Ultimate Loss|ultimate]], and $w_m \ge 0$ is the weight given to it. The weights are not estimated statistically. They are the actuary's judgment, written down so another actuary can follow and challenge them.
- **Source in the standards:** ASOP No. 1, the introductory U.S. standard, explains that actuaries bring to their assignments not only specialized training but also the broader knowledge that comes from experience, and that the standards often call on them to apply both. The standards give a framework for judgment rather than replacing it, and ISAP 1 takes the same approach internationally.
- **Where it enters:** Friedland's process for estimating unpaid claims and rates calls for judgment at every step. It decides which data to use and how to group it, which diagnostics matter, which methods suit the line and the maturity, which [[Development Factor|development factors]] and [[Trend|trend]] rates to select, how much [[Credibility|credibility]] to give the data, and finally which estimate to select from the [[Range of Indications|range of indications]].
- **Limits:** Judgment is not a substitute for data or analysis. It must be consistent with the evidence, with the [[Accepted Actuarial Practice|accepted practice]] of the field, and with any method or assumption that law or regulation prescribes. A selection that no diagnostic supports, or one that moves with the result the principal wants, is not judgment but bias.
- **Documentation and disclosure:** The reasoning should be recorded well enough that another actuary qualified in the same practice area could make an objective appraisal of the work. Material assumptions, changes from the previous analysis, reliance on others and the uncertainty in the result are disclosed in the actuarial communication.
- **Guarding against bias:** Judgment is exposed to [[Cognitive Bias|cognitive biases]] such as anchoring on last year's selection and overconfidence in a narrow range. [[Peer Review|Peer review]], [[Reasonableness Testing|reasonableness tests]] and comparing actual with expected emergence are the usual checks.

> [!example]- Selecting an Ultimate From Divergent Indications {Example}
> For accident year 2023 of a general liability book, evaluated at 24 months, an actuary has these indications, in \$ millions: reported development 12.6, paid development 10.2, Bornhuetter-Ferguson on reported claims 11.4, Bornhuetter-Ferguson on paid claims 10.8, and expected claims 10.5. Diagnostics show the average case reserve per open claim rose 18% in the latest year, against a severity trend of about 5%, while claim closure rates are unchanged. Paid to date is \$4.2 million. Select an ultimate and the unpaid claims, and document the reasons.
>
> > [!answer]-
> > The case reserve test shows a strengthening of case reserves, so the reported methods project the stronger reserves as if they were normal development. Their high answers are a known bias, not extra uncertainty, so they get no weight. Closure rates are stable, so the paid methods are sound. Paid development is leveraged at 24 months, so it shares the weight equally with paid Bornhuetter-Ferguson.
> > $$
> > \begin{align*}
> > \hat U^{*} &= 0.5(10.2) + 0.5(10.8) \\
> > &= 10.5 \\
> > \text{Unpaid} &= 10.5 - 4.2 \\
> > &= 6.3
> > \end{align*}
> > $$
> > The selected ultimate is \$10.5 million and the unpaid claims \$6.3 million, corroborated by the expected claims method at 10.5. The documentation records the diagnostic, why the reported methods were set aside, the weights, and what would change the selection: if the strengthening proves to be a change in adequacy that persists, a [[Berquist-Sherman Method|Berquist-Sherman]] adjustment of the reported triangle should be added.

> [!example]- Choosing a Trend Rate Among Fits {Example}
> A ratemaking analysis has exponential fits to severity of 4.1% over 20 points, 5.6% over 12 points and 8.9% over the latest 6 points, and an external index shows 4.5%. The latest points include two unusually large claims. The trend period is 2.5 years. Compare the trend factors and select one.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > 1.041^{2.5} &= 1.1057 \\
> > 1.056^{2.5} &= 1.1459 \\
> > 1.089^{2.5} &= 1.2376
> > \end{align*}
> > $$
> > The 6-point fit would raise projected losses by about 12% more than the 20-point fit, and it rests on two claims that may not recur. A selection of 5.0%, giving $1.05^{2.5} = 1.1297$, balances the longer fits, the external index and the recent increase. The reasons, the fits rejected and the sensitivity of the indication to the choice belong in the documentation.

> [!tip]- How it appears on the exam
> - **GI-101 (objective 1p):** Written questions ask the candidate to describe the role of professional judgment in actuarial work, with its sources in the standards and its limits.
> - **Real-life scenarios (GI-101 topic 7):** Candidates choose methods, set aside indications a diagnostic contradicts, select ultimates and justify the selections, as in the first example. Marks go to the reasons, not only the number.
> - **Linked objectives:** Judgment appears beside the actuary's responsibilities for data and documentation in the same topic, so answers often pair it with what must be recorded and disclosed.

> [!warning]- Exam traps
> - **Averaging everything:** Giving every method equal weight is not neutral. A method the diagnostics contradict should be set aside or adjusted, because averaging it in carries its bias into the selection.
> - **Judgment without reasons:** "Based on judgment" alone earns little. The answer should name the evidence, the alternatives considered and why they were rejected.
> - **Judgment against prescription:** Where law or a regulator prescribes a method or assumption, the actuary follows it and discloses that it was prescribed. Judgment does not override the law.
> - **Range of estimates versus outcomes:** The spread of reasonable indications is not the range of possible outcomes. Selecting within the indications does not mean the actual result will fall there.
