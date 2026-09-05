---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2201c538c869b0a0ecdb1b5c42ad3579438999f8a6f6bf6b6d5a6280c585ab8a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Unregistered Reinsurance.md
---

**Unregistered Reinsurance** is reinsurance ceded to a reinsurer that is **not** licensed by [[OSFI]] to reinsure in Canada — typically an offshore reinsurer or a foreign parent. It is permitted, and Canadian insurers use it heavily, but the [[MCT]] gives **no capital credit** for the ceded liabilities unless the cession is secured by acceptable collateral.

> $$\text{Capital credit} = \min\bigl(\text{Ceded liabilities},\; \text{Acceptable collateral}\bigr)$$

- **Why the restriction.** OSFI cannot examine or intervene in a reinsurer outside its jurisdiction, and cannot compel payment. Collateral substitutes an enforceable asset for the supervision OSFI cannot exercise.
- **Acceptable collateral** typically means assets held in trust in Canada, **letters of credit** from an acceptable financial institution, or **funds withheld** — premium the cedant retains rather than paying over, offsetting the recoverable.
- **Why insurers use it anyway:** access to global reinsurance capacity that is not licensed in Canada, intra-group cessions to a foreign parent, and specialist capacity for catastrophe, aviation and other lines with few registered markets.
- **The costs are real and often understated.** Collateral is expensive — letters of credit carry fees and consume the reinsurer's own credit lines, and funds withheld reduce the reinsurer's investable assets, which it prices into the treaty. An uncollateralised cession is cheaper in premium and worthless in capital.
- **Collectability risk is higher**, and not only from insolvency: enforcement across jurisdictions is slow and expensive, and a dispute with a reinsurer outside Canada is harder to pursue. Under [[IFRS 17]] this must be reflected in the **non-performance risk** allowance on the [[Reinsurance Contracts Held|reinsurance asset]].
- **OSFI's reinsurance expectations** require the insurer to be satisfied that ceded risk is genuinely transferred and recoverable, which for unregistered cessions means documented collateral arrangements and counterparty due diligence.

> [!example]- Is the Collateral Worth Its Cost? {Example}
> An insurer cedes $\$50$ million of liabilities to an unregistered reinsurer. The reinsurer offers two terms: a treaty at a premium of $\$18$ million with no collateral, or the same treaty at $\$19.1$ million with a letter of credit securing the full $\$50$ million. Ceded liabilities reduce the [[Base Solvency Buffer]] by $18\%$ of the amount credited, and the insurer's cost of capital is $10\%$.
>
> Which should it take?
>
> > [!answer]-
> > **Capital released by the collateralised option:**
> >
> > $$0.18 \times \$50\text{M} = \$9\text{M}$$
> >
> > **Annual value of that release**, at a $10\%$ cost of capital:
> >
> > $$0.10 \times \$9\text{M} = \$0.9\text{M}$$
> >
> > **Cost of the collateral:**
> >
> > $$\$19.1\text{M} - \$18\text{M} = \$1.1\text{M}$$
> >
> > **On these numbers, the uncollateralised treaty is cheaper** — $\$1.1$ million to save $\$0.9$ million of capital cost. Strictly on the capital arithmetic, take the cheaper treaty.
> >
> > **But the arithmetic is not the whole decision**, and this is where candidates should push further:
> >
> > - **Collectability.** Without collateral, a $\$50$ million recoverable depends entirely on an offshore counterparty's willingness and ability to pay, enforceable only through foreign courts. The collateral is not merely a capital device; it is security.
> > - **The [[MCT]] position.** If the insurer's ratio is comfortably above its internal target, $\$9$ million of released capital is worth little. If it is near target, that capital may be what allows the insurer to keep writing — and its marginal value is then far above $10\%$.
> > - **Concentration.** If this is one of several cessions to the same reinsurer, the aggregate uncollateralised exposure may breach the insurer's own counterparty limits under OSFI's reinsurance expectations.
> >
> > **The correct answer is conditional**, and saying so is the point: take the uncollateralised treaty if the capital is not needed and the counterparty is strong; take the collateral if either condition fails.
