---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ef8ef2ae2ea57fde5846934b5ab3107d84f570a9c0052453a24896011a063faa
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Materiality.md
---

**Materiality** is the threshold above which an error, omission or difference would be expected to affect a user's decision. It is a **judgement made by the actuary for the purpose of the work**, not a fixed percentage, and the [[Standards of Practice]] require the actuary to select a materiality standard, apply it consistently, and — where relevant — disclose it.

- **Purpose-dependent.** The materiality standard for a [[Statement of Actuarial Opinion]] on liabilities is not the same as for a [[FCT|financial condition testing]] report or a pricing exercise, because the users and the decisions differ. The actuary selects it by asking **who uses this work and what decision does it affect?**
- **Common reference points**, none of them a rule: a percentage of [[Insurance Contract Liabilities]], of equity or [[Capital Available]], of pre-tax income, or an amount that would change the [[MCT]] ratio enough to alter the supervisory picture. The last is often the binding one for an insurer near a target.
- **It cuts both ways.** Materiality permits approximation and simplification below the threshold — which is what makes actuarial work practicable — and it *requires* attention above it. An actuary who applies a large materiality standard to justify ignoring a problem has inverted the concept.
- **Consistency matters.** Using a small threshold when it favours one conclusion and a large one when it favours another is not a materiality judgement; it is a result-driven one.
- **Aggregation.** Individually immaterial items that are all one-directional can be material in total. A set of small conservative approximations, each below threshold, can add to a significant bias.
- **The [[External Auditor]]'s materiality is set for the financial statements as a whole** and may differ from the actuary's. The two should be discussed rather than assumed to coincide, since a difference means one of them is testing something the other is not.

> [!example]- Setting and Applying a Materiality Standard {Example}
> An insurer has [[Insurance Contract Liabilities]] of $\$800$ million, [[Capital Available]] of $\$260$ million, a [[Base Solvency Buffer]] of $\$150$ million (so an [[MCT]] ratio of $173\%$), and pre-tax income of $\$35$ million. Its [[Internal Target Capital Ratio|internal target]] is $170\%$.
>
> Select a materiality standard for the valuation, and apply it to three findings: a $\$3$ million data reconciliation difference; a $\$9$ million potential understatement in one line's tail; and eleven separate approximations each conservative by about $\$0.8$ million.
>
> > [!answer]-
> > **Selecting the standard.** Candidate reference points:
> >
> > - $1\%$ of liabilities: $\$8$M
> > - $5\%$ of capital available: $\$13$M
> > - $10\%$ of pre-tax income: $\$3.5$M
> > - The amount that would take the MCT ratio below the $170\%$ internal target: capital available would need to fall to $1.70 \times \$150 = \$255$M, so **$\$5$ million** pre-tax (roughly $\$7$M pre-tax at a $27\%$ rate).
> >
> > The last is the tightest and the most decision-relevant: this insurer sits $3$ points above its internal target, so a modest error changes the supervisory picture. **Select roughly $\$5$–$7$ million**, and document why.
> >
> > **Applying it:**
> >
> > - **The $\$3$ million reconciliation difference** is below threshold. It may be treated as immaterial — but the actuary must **investigate it and conclude** that it is, and disclose the conclusion. Unexplained is not the same as immaterial.
> > - **The $\$9$ million tail understatement** is above threshold and must be addressed: either corrected in the liability, or disclosed with a quantified effect. It would take the ratio to roughly $169\%$, below the internal target — which is precisely why the standard was set where it was.
> > - **The eleven approximations** total $\$8.8$ million, all in the same direction. Individually immaterial, **collectively material and biased**. They must be assessed in aggregate; treating each separately is the classic aggregation error the standards warn about.
> >
> > **The lesson:** materiality is chosen with the decision in mind, applied consistently, and never used as a reason to leave something uninvestigated.
