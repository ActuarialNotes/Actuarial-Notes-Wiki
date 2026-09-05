---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:477059089edfef5b87ba6ba744b8ee5ac9939cafbee2f6f7b9d8767b961f65e9
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Quarterly Return.md
---

**The Quarterly Return** is the abbreviated regulatory filing a Canadian P&C insurer submits to [[OSFI]] after each of the first three quarters. It is a reduced version of the [[Canadian Annual Return]] — unaudited financial statements, the [[MCT]] calculation, and key supporting exhibits — giving the regulator a current read on capital and results between annual filings.

- **Why quarterly.** An annual filing alone would leave a regulator eleven months behind a deteriorating insurer. Capital erodes fast once it starts, and [[OSFI]]'s early-intervention model depends on seeing the [[MCT]] ratio and its trend at least four times a year.
- **What it contains:** interim [[Financial Position|statement of financial position]] and income statement, the MCT calculation with [[Capital Available]] and the [[Base Solvency Buffer]], premium and claims by class, and reinsurance information — but **not** the audited statements, not the full [[Notes to Financial Statements|note]] disclosure, and not the [[Statement of Actuarial Opinion]].
- **The actuary's quarterly role** is lighter but real. [[Insurance Contract Liabilities]] must still be estimated for the interim statements, usually by rolling forward the last full valuation with actual-versus-expected analysis rather than by repeating it in full. The [[Standards of Practice]] apply to that work as to any other.
- **What the roll-forward can miss.** A quarterly estimate that simply applies expected emergence will not detect a deterioration in the underlying pattern. Actual-versus-expected analysis by accident year is the control that catches it, and it is why a quarter's favourable or adverse "actual versus expected" is more informative than the reported result.
- **Trend reading.** OSFI and analysts read the sequence of quarterly MCT ratios, not any one of them; direction matters more than level, which is the same principle that governs the annual return's development exhibit.

> [!example]- What the Quarterly Sequence Shows {Example}
> An insurer's [[MCT]] ratios by quarter over two years: $202\%$, $198\%$, $195\%$, $191\%$, $186\%$, $178\%$, $169\%$, $158\%$. The internal target is $180\%$ and the supervisory target is $150\%$.
>
> When should the actuary have raised this, and what does the pattern indicate?
>
> > [!answer]-
> > **Eight consecutive declines, accelerating** — roughly $4$ points per quarter in year 1 and $9$ points per quarter in year 2. The insurer breached its internal target at quarter 6 and is now $8$ points above the supervisory target.
> >
> > **When it should have been raised:** long before the internal target was breached. Four consecutive declines by quarter 4 is a trend, not noise, and the ordinary quarterly review should have produced the question "why?" at that point. Waiting for a target breach means acting when the remaining buffer is smallest.
> >
> > **Extrapolation.** At $9$ points a quarter, the supervisory target is breached next quarter and the $100\%$ minimum within seven quarters. That projection belongs in front of the board now.
> >
> > **The diagnosis to establish.** Is the fall in the numerator or the denominator?
> >
> > - **[[Capital Available]] falling** — underwriting losses, reserve strengthening, dividends, or unrealised investment losses through [[Comprehensive Income|OCI]]. Each has a different remedy.
> > - **[[Base Solvency Buffer]] rising** — growth in premium and liabilities, a shift into riskier lines, or increased [[Concentration Risk|catastrophe]] exposure. Growth consuming capital is a different problem from losses destroying it.
> >
> > **The escalation.** A trend threatening the supervisory target is a matter with material adverse effects on financial condition, engaging the [[Duty to Report]] path under the [[Insurance Companies Act]] if management does not act. The [[FCT]] report must model whether adverse scenarios breach the minimum, and [[OSFI]] will require a capital restoration plan and will likely restrict dividends.
