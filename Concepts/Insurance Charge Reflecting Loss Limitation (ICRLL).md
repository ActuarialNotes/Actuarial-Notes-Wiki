---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:fc650d6e4626cac3ee30bf788e438b0b222fdb868a54a9379803d0891855f8ec
  sources:
    - "Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.3 §5.2 p.84-85 (PDF pp.89-90) Formula 3.10, fn.49 and worked example; Ch.2 p.18 (PDF p.23) and p.21 (PDF p.26), sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Charge Reflecting Loss Limitation (ICRLL).md
---

The **Insurance Charge Reflecting Loss Limitation (ICRLL)** procedure prices an aggregate limit on losses that are also subject to a per-occurrence limit by reading an *unlimited* [[Table M]] at an adjusted size and entry ratio, so that it approximates the limited table Table M$_D$. Until 2019 the NCCI published only the unlimited Table M and used ICRLL in its workers compensation retrospective rating manual.

> $$\text{Loss group adjustment factor} = \frac{1 + 0.8\,k}{1 - k}$$

> $$E_{\text{ELG}} = E \times (\text{state/hazard group relativity}) \times \frac{1 + 0.8\,k}{1 - k}$$

> $$r = \frac{\text{aggregate limit}}{\mathrm{E}\{A_D\}}$$

> $$\text{Total expected loss cost} = \big(E - \mathrm{E}\{A_D\}\big) + \phi(r) \times \mathrm{E}\{A_D\}$$

- $E$ is the expected unlimited aggregate loss, $\mathrm{E}\{A_D\}$ the expected loss limited per occurrence to $D$, and $k = (E - \mathrm{E}\{A_D\})/E$ the fraction of losses expected above the per-occurrence limit (called "ER" in the pre-2019 NCCI manual). Exam solutions often call $k$ the "LER": the share of loss the per-occurrence limit eliminates from the insured's losses. That is $1 - \text{LER}$ in the deductible sense of [[Loss Elimination Ratio]], whose LER is the share *below* the deductible.
- **$k$ and the expected limited loss.** Since $k = (E - \mathrm{E}\{A_D\})/E$, the expected limited loss is $\mathrm{E}\{A_D\} = E(1 - k)$. So the entry ratio is the aggregate limit divided by $E(1 - k)$, the expected unlimited loss times one minus $k$.
- **Where $k$ comes from.** $k$ is the expected ratio of per-occurrence excess losses to total losses, the same ratio a retrospective plan applies to the total loss estimate to charge for its per-occurrence limit. When that per-occurrence charge is given as a ratio to standard premium, dividing it by the expected loss ratio gives $k$.
- **The procedure.** (1) Multiply the expected unlimited loss by the state/hazard group relativity and by the loss group adjustment factor, and use the result to choose the Expected Loss Group. (2) Compute the entry ratio as the aggregate limit over the expected *limited* loss. (3) Read $\phi(r)$ from that ELG's column of the unlimited Table M. (4) The aggregate charge is $\phi(r) \times \mathrm{E}\{A_D\}$, and the per-occurrence charge is $E - \mathrm{E}\{A_D\}$; their sum is the total expected loss cost. Divided by standard premium, it is expressed as a percent of standard premium.
- **Both indices of Table M are modified.** Table M$_D$ is indexed by size, deductible and entry ratio; ICRLL maps those three indices onto the two of the unlimited table, by changing the entry ratio and the size category.
- **Why the size is adjusted upward.** A per-occurrence limit reduces the variance of the severity distribution — much of it comes from the few largest losses — and so the variance of the limited aggregate loss. Less variance means a lower charge at entry ratios above 1, just as a larger risk (more expected claims) has a lower charge. The adjustment factor exceeds 1 and grows with $k$, so ICRLL enters Table M at a larger ELG, whose aggregate distribution is less variable, with lower charges above an entry ratio of 1, to approximate the limited distribution. A plan with a per-occurrence limit therefore usually has a lower aggregate charge $\phi(r_G)$ at entry ratios above 1 than the unlimited Table M charge at the same entry ratio for the same risk.
- **Why not just use the unlimited charge.** Losses above the per-occurrence limit are already priced in the per-occurrence charge. An unlimited Table M charge counts those losses again whenever they push the aggregate over its limit — the **overlap** of the two limits. Pricing the aggregate on limited losses, as ICRLL approximates, removes the double count.
- **Advantages:** a single unlimited Table M gives reasonable charges that would otherwise need a large number of Tables M$_D$, and it can adapt a Table M from one book of business to a similar book without enough data for its own tables. **Disadvantage:** it is only an approximation to Table M$_D$ and may add error to the aggregate charge. Where electronic Tables M$_D$ or a [[Table L]] are available, the adjustment is not needed.

> [!idea] The idea
> Capping each occurrence makes an account's year-to-year total steadier, which is exactly what a bigger account looks like in Table M. So instead of a separate table for every limit, ICRLL pretends the risk is bigger — by more, the more of its loss the limit cuts off — and reads the charge from that flatter column.

> [!example]- Pricing an Aggregate Deductible with ICRLL {Example}
> A large deductible workers compensation policy has expected unlimited losses of $\$1{,}200{,}000$, expected losses limited to the per-occurrence deductible of $\$900{,}000$, a state/hazard group relativity of $1.05$, and an aggregate deductible limit of $\$1{,}350{,}000$. Suppose the unlimited Table M, in the ELG that contains the adjusted expected loss, gives $\phi(1.5) = 0.12$. Find the total expected loss cost.
>
> > [!answer]-
> > **Excess ratio and adjustment factor.**
> >
> > $$
> > \begin{align*}
> > k &= \frac{1{,}200{,}000 - 900{,}000}{1{,}200{,}000} \\
> > &= 0.25 \\
> > \frac{1 + 0.8(0.25)}{1 - 0.25} &= \frac{1.20}{0.75} \\
> > &= 1.60
> > \end{align*}
> > $$
> >
> > **ELG selection and entry ratio.**
> >
> > $$
> > \begin{align*}
> > E_{\text{ELG}} &= \$1{,}200{,}000 \times 1.05 \times 1.60 \\
> > &= \$2{,}016{,}000 \\
> > r &= \frac{\$1{,}350{,}000}{\$900{,}000} \\
> > &= 1.5
> > \end{align*}
> > $$
> >
> > **Loss cost.**
> >
> > $$
> > \begin{align*}
> > \text{Aggregate charge} &= 0.12 \times \$900{,}000 \\
> > &= \$108{,}000 \\
> > \text{Per-occurrence charge} &= \$1{,}200{,}000 - \$900{,}000 \\
> > &= \$300{,}000 \\
> > \text{Total} &= \$408{,}000
> > \end{align*}
> > $$
> >
> > The ELG is chosen on a figure 1.68 times the expected loss, but the charge is applied to the expected *limited* loss, the only losses the aggregate limit can act on.

> [!tip]- How it appears on the exam
> - **Exam 8** gives expected unlimited and limited losses (or standard premium, a loss ratio and $k$), a state/hazard group relativity, an ELG table and a Table M excerpt, and asks for the aggregate charge and the total expected loss cost under ICRLL — sometimes beside the same charge from a Table M$_D$.
> - It asks why ICRLL moves the risk to a larger ELG, why it gives reasonable charges, and its advantages and disadvantages against a limited Table M.

> [!warning]- Exam traps
> - **Entry ratio on unlimited loss:** under ICRLL the entry ratio is the aggregate limit over expected *limited* loss.
> - **Pricing with the adjusted loss:** the adjusted expected loss selects the ELG only; the charge multiplies expected limited loss.
> - **Dropping the per-occurrence charge:** the total expected loss cost is the per-occurrence excess $E - \mathrm{E}\{A_D\}$ *plus* the aggregate charge.
