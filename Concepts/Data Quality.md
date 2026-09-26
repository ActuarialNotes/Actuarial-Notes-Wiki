---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:795e8c94a47826653fe3bed0c2732baf32e501ac98f8032c965fa6a5051e0472
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Data Quality.md
---

**Data Quality** is whether the data behind an actuarial analysis are *appropriate* (suitable for the intended purpose and relevant to what is being analyzed), *reasonable* and *sufficient* (enough records and data elements for the analysis). [[ASOP 23 - Data Quality (ASB - 2016)|ASOP No. 23]] sets out what an actuary must do about it: select the data, review it, decide how it can be used, and disclose its limitations.

> $$\text{Reconciliation difference} = \sum_{i} \text{Premium}_i^{\,\text{data}} - \text{Premium}^{\,\text{financial records}}$$

- The reconciliation above is the most common single review check: totals built from the modelling data (premium, exposure, paid losses, claim counts) are compared with an independent source such as the financial statements. A difference is not automatically an error — it has to be **explained** (a missing month, a line of business excluded, a timing difference)
- **Selection** (ASOP 23 §3.2): consider the data elements wanted and the alternatives; weigh whether the data are appropriate and current, internally consistent, consistent with readily available external information, sufficient, and what their known limitations are
- **Review** (§3.3): make a reasonable effort to learn the *definition* of each data element and to identify questionable values or inconsistent relationships — a policy effective after it expires, a claim reported before the accident, negative exposure. A review is not an **audit**, and the actuary is not required to perform one
- **Use** (§3.4): judge whether the data are acceptable as they are, need enhancement, can be used with judgmental adjustments, or are too inadequate to use at all
- **Reliance** (§3.5–3.6): the accuracy of data supplied by others is their responsibility, but the actuary still reviews it and discloses the reliance. This is the stakeholder side of PCPA objective A1 — the business owners, underwriters and IT staff who supply data and context are the first source of both
- Poor-quality data are a leading source of [[Model Risk|model risk]]: a model will fit whatever it is given

> [!example]- Reconciling a Modelling Extract {Example}
> A homeowners modelling extract totals $\$41{,}600{,}000$ of written premium for the year. The annual statement shows $\$43{,}200{,}000$ for the same line. The data owner explains that $\$1{,}500{,}000$ of premium on policies written through a program administrator is booked outside the policy system. What remains unexplained, and what should the actuary do?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Difference} &= 41{,}600{,}000 - 43{,}200{,}000 \\
> > &= -1{,}600{,}000 \\
> > \text{Unexplained} &= -1{,}600{,}000 + 1{,}500{,}000 \\
> > &= -100{,}000
> > \end{align*}
> > $$
> > $\$100{,}000$ — about $0.2\%$ of premium — remains unexplained. That is small enough that it is unlikely to matter to a rating model, but it should still be noted. The **$\$1.5$M program business** is the real finding: those policies are missing from the model data entirely. The actuary must decide whether their absence biases the analysis — and disclose it either way.

> [!example]- Questionable Values Found in Review {Example}
> Reviewing a personal auto file, an actuary finds $312$ policies with a driver age of $0$ and $41$ with driver age above $110$. How should these be handled under ASOP 23?
>
> > [!answer]-
> > First, **find the definition**: ask the data owner what the field means and why these values occur. Age $0$ is often a default written when the field was left blank, which makes it [[Missing Data|missing data]] in disguise, not a real age. Values above $110$ are more likely keying errors or dates of birth entered in the wrong format.
> >
> > Then decide on **use**: correct the values from source if practical; otherwise treat them as missing rather than letting a model fit a relativity to "age 0." Finally **disclose**: in summary form, the questionable values found and the steps taken to fix them.
