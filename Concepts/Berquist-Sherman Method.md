---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:58c9ff271657a94009a6a6890c629a6c35335f09c6ae1db84b74e1214191e0fd
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.13 Berquist-Sherman Techniques, PDF pp.289-298 (printed 283-292): case adequacy adjustment, settlement rate adjustment (pp.288-290), XYZ Insurer combined adjustment (p.292), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Berquist-Sherman Method.md
---

**Berquist-Sherman Method** restates a historical [[Development Triangle|triangle]] so that every year reflects **current** claims practice, removing the distortion caused by a change in [[Case Adequacy|case reserve adequacy]] or in [[Settlement Rate|claim settlement rates]]. Development factors are then selected from the restated triangle.

> $$\text{Adjusted Avg Case}_{\text{AY},n} = \text{Avg Case}_{\text{latest},n} \times \left(1 + t\right)^{-(\text{years before latest})}$$

> $$\text{Adjusted Reported}_{\text{AY},n} = \text{Paid}_{\text{AY},n} + \text{Adjusted Avg Case}_{\text{AY},n} \times \text{Open Counts}_{\text{AY},n}$$

**The case adequacy adjustment** (for a *reported* triangle):

1. Compute **average case outstanding** per open claim at each accident year and maturity.
2. Select a severity trend $t$ — the rate at which average case outstanding *should* grow if adequacy were unchanged.
3. **Trend the latest diagonal's** average case outstanding backwards at $t$ to restate each historical cell at today's adequacy level.
4. Multiply the restated averages by the open claim counts to get adjusted case reserves, add paid, and rebuild the reported triangle.
5. Select factors from the **restated** triangle.

**The settlement rate adjustment** (for a *paid* triangle):

1. Compute **disposal rates** — closed claims ÷ ultimate claims — at each accident year and maturity.
2. Select the disposal rates on the latest diagonal as the basis, and multiply the selected disposal rate at each age by each accident year's ultimate claim counts to get the adjusted closed claim counts. The latest diagonal is then unchanged, in both the closed counts and the paid claims.
3. For each historical cell, estimate the paid losses that *would* have been paid had that year closed claims at the current rate. Berquist and Sherman fit an exponential curve, Y = a × e^(bX), to cumulative paid claims Y against cumulative closed claim counts X between each pair of successive ages in an accident year, and read the adjusted paid claims off the curve at the adjusted closed counts: by interpolation when the adjusted count lies between two actual counts, otherwise by extrapolation from the pair with the closest range (Friedland, Ch. 13, p. 289).
4. Rebuild the paid triangle at the common disposal pattern and select factors from it.

**Both adjustments together** (Friedland, Ch. 13, p. 292): when case adequacy and settlement rate have both changed, the two adjustments are combined into a single adjusted reported triangle, which gives one projection in place of two.

- Adjusted open claim counts are reported claim counts minus adjusted closed claim counts.
- Adjusted reported claims are the adjusted average case outstanding times the adjusted open claim counts, plus the adjusted paid claims from the settlement rate adjustment.

Further points:

- The trigger for either adjustment is a **diagonal effect**: age-to-age factors on the latest diagonal all above (or all below) their column history. That is a calendar-year signal, and averaging it into the selections applies a one-time shift as though it were an ongoing pattern.
- Which adjustment applies is decided by the **diagnostic**, not by preference: a jump in average case outstanding across all years points to adequacy; a jump in closure rates points to settlement speed. Both can be happening at once.
- The adjustments are **large and judgment-laden** — the severity trend and the target disposal pattern are both selections — so the restated result should be compared against methods that are insensitive to the distortion in question (paid methods for a case-adequacy change; reported methods for a settlement-rate change).
- Berquist-Sherman does not fix the diagonal itself. Strengthened reserves are on the books and belong in the estimate; what the restatement fixes is the *factors*, which would otherwise develop the strengthening a second time.

![[Media/Figures/Berquist-Sherman_Method.svg|340]]

> [!example]- Case Adequacy Adjustment {Example}
> Average case outstanding per open claim at $12$ months:
>
> | AY | Avg case O/S | Open claims |
> |---|---|---|
> | $2022$ | $\$4{,}000$ | $250$ |
> | $2023$ | $\$4{,}200$ | $250$ |
> | $2024$ | $\$5{,}500$ | $250$ |
>
> Paid at $12$ months is $\$300{,}000$ for each year. The selected severity trend is $5\%$; average case outstanding grew $31\%$ in the latest year, indicating a strengthening.
>
> Restate the $12$-month reported column.
>
> > [!answer]-
> > Trend the **latest** average ($\$5{,}500$) backwards at $5\%$ to put every year on today's adequacy level:
> >
> > $$\begin{align*}
> > 2023: \; \$5{,}500 / 1.05 &= \$5{,}238 \\
> > 2022: \; \$5{,}500 / 1.05^{2} &= \$4{,}989
> > \end{align*}$$
> >
> > Adjusted case reserves and reported losses:
> >
> > | AY | Adj. avg | Adj. case | Adj. reported |
> > |---|---|---|---|
> > | $2022$ | $\$4{,}989$ | $\$1{,}247{,}250$ | $\$1{,}547{,}250$ |
> > | $2023$ | $\$5{,}238$ | $\$1{,}309{,}500$ | $\$1{,}609{,}500$ |
> > | $2024$ | $\$5{,}500$ | $\$1{,}375{,}000$ | $\$1{,}675{,}000$ |
> >
> > Against the original reported figures ($\$1{,}300{,}000$, $\$1{,}350{,}000$, $\$1{,}675{,}000$), the older years have been raised by around $19\%$ while the latest is unchanged.
> >
> > The consequence for the factors is the point: in the original triangle, the $12$-month column was artificially *low* in the old years relative to their subsequent (post-strengthening) development, inflating the $12$–$24$ factors. Restating the base removes that inflation, and the factors selected from the adjusted triangle no longer develop the strengthening a second time.

> [!example]- Which Adjustment Does the Data Call For? {Example}
> Diagnostics for a liability book:
>
> | AY at 24 mo | Avg case O/S | Closed ÷ reported counts | Paid ÷ reported losses |
> |---|---|---|---|
> | $2021$ | $\$12{,}000$ | $58\%$ | $0.42$ |
> | $2022$ | $\$12{,}600$ | $59\%$ | $0.43$ |
> | $2023$ | $\$13{,}100$ | $67\%$ | $0.52$ |
> | $2024$ | $\$13{,}700$ | $74\%$ | $0.61$ |
>
> Which Berquist-Sherman adjustment applies?
>
> > [!answer]-
> > **The settlement rate adjustment, on the paid triangle.**
> >
> > Average case outstanding is growing $\approx 4.5\%$ a year — steady, and consistent with ordinary severity trend. There is no sign of a case adequacy shift.
> >
> > The closed-to-reported ratio, though, has moved from $58\%$ to $74\%$ in three years, and the paid-to-reported ratio has moved with it. Claims are **closing much faster**.
> >
> > The consequences:
> >
> > - **Paid development factors are biased.** Historical factors were built on a book that had paid only $42\%$ of reported losses by $24$ months; AY 2024 has paid $61\%$. Applying the old factors to the new diagonal over-develops it substantially.
> > - **Reported development is largely unaffected**, since reported losses include case reserves whether or not the claim has closed.
> >
> > So: restate the **paid** triangle to a common disposal rate before selecting paid factors, and use the **reported** chain ladder — which is insensitive to settlement speed — as the check on the result. Applying the case adequacy adjustment here would correct a distortion that is not present.
