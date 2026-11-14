---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:d9e527c9711b6a83c52657d05a44813d1db7b0470642e93bbecbc4a0aac0df41
  sources:
    - "OSFI, Minimum Capital Test Guideline (2024), Guideline A, §1.1.1, §1.1.2, §1.2.1, sha256:ec08c0d9b998c17749d099bdc0e96aeb4508a912b9a5d4eb390335602b03fd0e — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2024"
    - "OSFI Guideline A-4, Regulatory Capital and Internal Capital Targets (December 2017), p.3, sha256:f68346b481f701b9a9ccac13cac872c8e7c009c96d2a7a51b66e523c00e6b1fa — https://www.casact.org/sites/default/files/2021-03/6C_OSFI_Target_Capital.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Materiality.md
---

![[Media/Figures/Materiality.svg|340]]

**Materiality** is the threshold above which an error, omission or difference would be expected to affect a user's decision. It is a judgement made by the actuary for the purpose of the work, not a fixed percentage.

The [[Standards of Practice]] require the actuary to:

1. **Select a materiality standard** for the work, by asking who uses it and what decision it affects.
2. **Apply it consistently.** Using a small threshold when it favours one conclusion and a large one when it favours another is a result-driven judgement, not a materiality one.
3. **Disclose it**, where relevant.

The standard depends on the purpose. The standard for a [[Statement of Actuarial Opinion]] on liabilities is not the same as for a [[FCT|financial condition testing]] report or a pricing exercise, because the users and the decisions differ. Common reference points, none of them a rule, are a percentage of [[Insurance Contract Liabilities]], of equity or [[Capital Available]], of pre-tax income, or the amount that would change the [[MCT]] ratio enough to alter the supervisory picture. The last is often the binding one for an insurer near a target.

Materiality cuts both ways. It permits approximation and simplification below the threshold, which is what makes actuarial work practicable, and it requires attention above it. An actuary who applies a large materiality standard to justify ignoring a problem has inverted the concept.

The [[External Auditor]]'s materiality is set for the financial statements as a whole and may differ from the actuary's. The two should be discussed rather than assumed to coincide, since a difference means one of them is testing something the other is not.

> [!example]- What materiality standard suits this valuation? {Example}
> An insurer has [[Insurance Contract Liabilities]] of $\$800$ million, [[Capital Available]] of $\$260$ million, minimum capital required of $\$150$ million (an [[MCT]] ratio of $173\%$) and pre-tax income of $\$35$ million. Its [[Internal Target Capital Ratio|internal target]] is $170\%$, and the tax rate is $27\%$.
>
> > [!answer]-
> > - $1\%$ of liabilities is $\$8$ million.
> > - $5\%$ of capital available is $\$13$ million.
> > - $10\%$ of pre-tax income is $\$3.5$ million.
> > - At the internal target, capital available would be $1.70 \times \$150\text{M} = \$255\text{M}$, so a fall of $\$5$ million after tax, about $\$7$ million before tax, crosses it.
> > - The last is the tightest and the most decision-relevant, because this insurer sits 3 points above its internal target.
> > - Select roughly $\$5$ to $\$7$ million, and document why.

## Applying the standard

An item below the threshold may be treated as immaterial only once the actuary has investigated it and concluded that it is. Unexplained is not the same as immaterial. An item above the threshold must be corrected, or disclosed with its effect quantified.

> [!example]- With a materiality standard of $\$5$ to $\$7$ million, how should the actuary treat each of these findings? {Example}
> The insurer above has three findings:
>
> 1. A $\$3$ million data reconciliation difference.
> 2. A $\$9$ million potential understatement in one line's tail.
> 3. Eleven separate approximations, each conservative by about $\$0.8$ million.
>
> > [!answer]-
> > - The $\$3$ million difference is below the threshold. The actuary must investigate it, conclude that it is immaterial and disclose the conclusion.
> > - The $\$9$ million understatement is above the threshold. It would take the MCT ratio to about $169\%$, below the internal target, so it must be corrected in the liability or disclosed with its effect quantified.
> > - The eleven approximations total $11 \times \$0.8\text{M} = \$8.8\text{M}$, all in the same direction. Each is immaterial, but together they are material and biased, so they must be assessed in aggregate.

> [!trap] Judging one-directional items one at a time
> Individually immaterial items that all lean the same way can be material in total. A set of small conservative approximations, each below the threshold, can add up to a significant bias.
