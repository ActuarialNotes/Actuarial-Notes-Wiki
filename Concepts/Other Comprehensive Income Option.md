---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f7abacbc7cc294e7b0f6febb45b23f5106f0d160dd188abce09d448dfcd9b9a0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Other Comprehensive Income Option.md
---

**The Other Comprehensive Income Option** is the [[IFRS 17]] accounting policy choice to present the effect of **changes in discount rates** on insurance contract liabilities in **other comprehensive income** rather than in profit or loss, leaving a systematic finance expense — based on the rate locked in at initial recognition — in profit.

> $$\text{IFIE} = \underbrace{\text{Systematic amount (locked-in rate)}}_{\text{profit or loss}} + \underbrace{\text{Rate change effect}}_{\text{OCI}}$$

- **Elected by portfolio**, and applied consistently to all groups within it. The choice is a policy, not a period-by-period decision, and it must be disclosed.
- **The purpose is to reduce accounting mismatch.** Many insurers hold bonds at **fair value through OCI**; if their liability discount-rate effects went to profit while the asset fair-value movements went to OCI, a parallel rate movement would swing reported profit with no economic change. Putting the liability effect in OCI aligns them.
- **Nothing is hidden.** Total [[Comprehensive Income]] is identical either way — the option affects only *where* the effect appears. What changes is the volatility of **profit**, and profit is what most readers and many incentive schemes look at.
- **It is not free of judgement.** The systematic amount left in profit is computed at the locked-in rate, which requires tracking that rate by group — the same operational burden as [[Contractual Service Margin|CSM]] accretion.
- **Reinsurance held** may be treated the same way, and consistency between the gross and ceded presentation is important or the option reintroduces the mismatch it was meant to remove.
- **The residual in OCI is informative.** Once assets and liabilities are both in OCI, what remains there is the effect of the **duration mismatch** — a direct read on how well the insurer has matched, which is exactly what [[Duration|duration]] analysis is meant to reveal.

> [!example]- Should This Insurer Elect the Option? {Example}
> Consider two insurers.
>
> - **Insurer A**: liabilities of $\$800$ million with duration $6$ years; assets predominantly bonds classified at **fair value through OCI**, duration $5.8$ years.
> - **Insurer B**: liabilities of $\$800$ million with duration $1.5$ years; assets predominantly short-term instruments and equities held at **fair value through profit or loss**.
>
> Advise each.
>
> > [!answer]-
> > **Insurer A: elect the option.** Its assets' fair-value movements already go to OCI, and its liabilities are long enough that an $80$ basis point rate move changes them by roughly
> >
> > $$6 \times 0.0080 \times \$800\text{M} = \$38.4\text{M}$$
> >
> > Without the election, that $\$38$ million lands in profit each time rates move while the offsetting asset movement sits in OCI. With the election, both sit in OCI, and profit shows only the predictable unwind. Given the close duration match ($6.0$ against $5.8$), the OCI residual will be small — an accurate picture.
> >
> > **Insurer B: do not elect.** Its assets are at fair value through **profit or loss**, so asset movements are already in profit. Putting liability rate effects in OCI would *create* the mismatch rather than remove it. And with a $1.5$-year liability duration, the effect is small anyway:
> >
> > $$1.5 \times 0.0080 \times \$800\text{M} = \$9.6\text{M}$$
> >
> > **The decision rule** is simply: **follow the assets.** The option exists to align the liability presentation with wherever the backing assets' movements are reported, and electing it for its own sake — to smooth profit — inverts the purpose and can make the statements less informative rather than more.
