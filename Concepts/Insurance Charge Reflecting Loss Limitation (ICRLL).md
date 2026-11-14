---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:e3f1cc2a8992724d1aab7f9dfdfe161b0c7b6b6c090ed780e38a4afd253adf55
  sources:
    - "Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.3 §5.2 p.84-85 (PDF pp.89-90) Formula 3.10, fn.49 and worked example; Ch.2 p.18 (PDF p.23) and p.21 (PDF p.26), sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Charge Reflecting Loss Limitation (ICRLL).md
---

The **Insurance Charge Reflecting Loss Limitation (ICRLL)** procedure prices an aggregate limit on losses that are also subject to a per-occurrence limit by reading an *unlimited* [[Table M]] at an adjusted size and entry ratio, so that it approximates the limited table Table M$_D$. Until 2019 the NCCI published only the unlimited Table M and used ICRLL in its workers compensation retrospective rating manual.

For an expected unlimited aggregate loss $E$ and an expected loss limited per occurrence to $D$ of $\mathrm{E}\{A_D\}$, the fraction of losses expected above the per-occurrence limit is

> $$k = \frac{E - \mathrm{E}\{A_D\}}{E}$$

The pre-2019 NCCI manual calls $k$ "ER". Exam solutions often call it the "LER": the share of loss the per-occurrence limit eliminates from the insured's losses. That is $1 - \text{LER}$ in the deductible sense of [[Loss Elimination Ratio]], whose LER is the share *below* the deductible. When the per-occurrence charge is given as a ratio to standard premium, dividing it by the expected loss ratio gives $k$.

The loss group adjustment factor is

> $$\text{Loss group adjustment factor} = \frac{1 + 0.8\,k}{1 - k}$$

The Expected Loss Group (ELG) is chosen on the adjusted expected loss

> $$E_{\text{ELG}} = E \times (\text{state/hazard group relativity}) \times \frac{1 + 0.8\,k}{1 - k}$$

The entry ratio is the aggregate limit over the expected *limited* loss, $\mathrm{E}\{A_D\} = E(1 - k)$:

> $$r = \frac{\text{aggregate limit}}{\mathrm{E}\{A_D\}}$$

The total expected loss cost is the per-occurrence charge plus the aggregate charge:

> $$\text{Total expected loss cost} = \big(E - \mathrm{E}\{A_D\}\big) + \phi(r) \times \mathrm{E}\{A_D\}$$

- $\phi(r)$ is the charge at entry ratio $r$ in the chosen ELG's column of the unlimited Table M.

The adjusted expected loss selects the ELG only. The charge multiplies the expected limited loss, the only losses the aggregate limit can act on. Divided by standard premium, the total is expressed as a percent of standard premium.

> [!idea] The idea
> Capping each occurrence makes an account's aggregate loss steadier, as a larger account's is, so ICRLL reads the charge from a larger account's column of Table M instead of from a separate table for each limit.

> [!example]- What is this large deductible policy's total expected loss cost under ICRLL? {Example}
> A large deductible workers compensation policy has:
>
> | Item | Value |
> | :--- | ---: |
> | Expected unlimited losses | $1,200,000 |
> | Expected losses limited to the per-occurrence deductible | $900,000 |
> | State/hazard group relativity | 1.05 |
> | Aggregate deductible limit | $1,350,000 |
>
> The unlimited Table M, in the ELG that contains the adjusted expected loss, gives $\phi(1.5) = 0.12$.
>
> > [!answer]-
> > - The excess ratio is $k = (1{,}200{,}000 - 900{,}000)/1{,}200{,}000 = 0.25$.
> > - The loss group adjustment factor is $(1 + 0.8 \times 0.25)/(1 - 0.25) = 1.20/0.75 = 1.60$.
> > - The ELG is chosen on $\$1{,}200{,}000 \times 1.05 \times 1.60 = \$2{,}016{,}000$, which is $1.68$ times the expected loss.
> > - The entry ratio is $\$1{,}350{,}000/\$900{,}000 = 1.5$.
> > - The aggregate charge is $0.12 \times \$900{,}000 = \$108{,}000$, and the per-occurrence charge is $\$1{,}200{,}000 - \$900{,}000 = \$300{,}000$.
> > - The total expected loss cost is $\$108{,}000 + \$300{,}000 = \$408{,}000$.

## Why the size is adjusted upward

Table M$_D$ is indexed by size, deductible and entry ratio, and ICRLL maps those three indices onto the two of the unlimited table by changing the entry ratio and the size category. A per-occurrence limit reduces the variance of the severity distribution, much of which comes from the few largest losses, and so the variance of the limited aggregate loss. Less variance means a lower charge at entry ratios above 1, just as a larger risk (more expected claims) has a lower charge.

The adjustment factor exceeds 1 and grows with $k$. So ICRLL enters Table M at a larger ELG, whose aggregate distribution is less variable, with lower charges above an entry ratio of 1, to approximate the limited distribution. A plan with a per-occurrence limit therefore usually has a lower aggregate charge $\phi(r_G)$ at entry ratios above 1 than the unlimited Table M charge at the same entry ratio for the same risk.

## Overlap of the per-occurrence and aggregate limits

Losses above the per-occurrence limit are already priced in the per-occurrence charge. An unlimited Table M charge counts those losses again whenever they push the aggregate over its limit, which is the **overlap** of the two limits. Pricing the aggregate on limited losses, as ICRLL approximates, removes the double count.

## Advantages and disadvantage

A single unlimited Table M gives reasonable charges that would otherwise need a large number of Tables M$_D$. ICRLL can also adapt a Table M from one book of business to a similar book without enough data for its own tables. Its disadvantage is that it is only an approximation to Table M$_D$ and may add error to the aggregate charge. Where electronic Tables M$_D$ or a [[Table L]] are available, the adjustment is not needed.

> [!trap] Entry ratio on unlimited loss
> Under ICRLL the entry ratio is the aggregate limit over the expected *limited* loss. In the example, dividing by the unlimited $\$1{,}200{,}000$ gives an entry ratio of $1.125$ instead of $1.5$.
