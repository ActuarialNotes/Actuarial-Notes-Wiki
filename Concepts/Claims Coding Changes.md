**Claims Coding Changes** are changes in how claims are categorized in the claims system — coverage codes, cause-of-loss codes, claim vs. claimant counting, the treatment of reopened claims, or the line to which a claim is assigned. They move data between cells without changing any underlying cost.

> $$\text{Apparent change} = \text{True change} + \text{Reclassification effect}$$

- The signature is a **sharp, one-time shift concentrated at a single valuation date**, offset by a corresponding shift somewhere else. Losses do not appear or disappear in aggregate; they move.
- Coding changes primarily corrupt **segment-level** analyses. A pure reclassification leaves the total reserve indication unaffected while making the affected lines' triangles unusable — which is dangerous precisely because the aggregate check passes.
- **Claim count definitions** are the most common casualty: counting per claimant instead of per claim, beginning or ceasing to count claims closed without payment, or treating a reopened claim as new. Any of these makes a [[Claim Count Triangle|count triangle]] discontinuous and produces a spurious [[Frequency|frequency]] trend.
- Distinguish from [[Claims Processing Changes]], which alter the **timing** of payments and reserve changes and so change the shape of the development curve. Coding changes alter **allocation**.
- The remedies, in order of preference: recode the history consistently, map the old and new schemes and restate, or (last resort) select factors from post-change diagonals only and accept the loss of history.
- This is exactly what Friedland's Chapter 4 management interview is for. A coding change is invisible in the triangle until it has already distorted the factors, and it is trivially identifiable by asking.

> [!example]- A Coverage Reclassification {Example}
> An insurer migrates claims systems on $1/1/2023$. Slip-and-fall claims at insured premises were coded "GL — premises" in the old system and "GL — operations" in the new one.
>
> What happens to the two sub-line triangles?
>
> > [!answer]-
> > The premises triangle shows a sharp **drop** starting on the $12/31/2023$ diagonal; the operations triangle shows a matching **rise**. The combined GL triangle is unaffected.
> >
> > An actuary selecting factors from either sub-line's full history blends two definitions. Premises development factors will be understated (the recent diagonal is artificially low relative to its own history) and operations overstated.
> >
> > Fixes: recode the historical claims to the new scheme, or select factors for the affected sub-lines from post-migration data only. Where neither is possible, the honest answer is to analyze GL in total — the level at which the reclassification nets out — and allocate the result, disclosing that the sub-line split is not supported by the data.

> [!example]- A Claim Count Definition Change {Example}
> Reported claim counts and reported losses at $12$ months:
>
> | AY | Counts | Losses | Severity |
> |---|---|---|---|
> | $2021$ | $2{,}000$ | $\$9{,}000$K | $\$4{,}500$ |
> | $2022$ | $2{,}060$ | $\$9{,}500$K | $\$4{,}612$ |
> | $2023$ | $2{,}120$ | $\$9{,}900$K | $\$4{,}670$ |
> | $2024$ | $2{,}950$ | $\$10{,}300$K | $\$3{,}492$ |
>
> Diagnose.
>
> > [!answer]-
> > Counts jumped $39\%$ in $2024$ while losses grew only $4\%$, so average severity fell $25\%$. A genuine $39\%$ frequency increase with no corresponding loss growth is close to impossible — the extra claims would have to be almost costless.
> >
> > That is the signature of a **counting change**: the insurer has started counting something it did not count before, most likely claims closed without payment, or claimants rather than claims.
> >
> > The consequences run through everything built on counts:
> >
> > - **[[Frequency-Severity Method|Frequency-severity]] projections** break — the frequency series has a step change and the severity series has an offsetting one.
> > - **Count development factors** are corrupted for any year spanning the change.
> > - **Average case outstanding**, the main [[Case Adequacy|case adequacy]] diagnostic, is divided by a redefined denominator and will appear to fall.
> >
> > The fix is to obtain counts on a consistent definition — usually available by re-extracting with the old filter — before any count-based analysis is run.
