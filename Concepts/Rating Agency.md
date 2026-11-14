---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:304449c882be572982e6398265ed695f2cb0c940f75722b3f74630d0d40d6597
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Rating Agency.md
---
![[Media/Figures/Rating_Agency.svg|340]]

A **Rating Agency** assigns an insurer a financial strength rating, its opinion of the insurer's ability to meet its policyholder obligations. In the Canadian market the agencies are A.M. Best, S&P, Moody's, DBRS Morningstar and Fitch.

A rating assesses:

1. Balance sheet strength: capital adequacy on the agency's own model, reserve adequacy, reinsurance quality and liquidity.
2. Operating performance.
3. Business profile: scale, diversification and market position.
4. Enterprise risk management.

Ratings are voluntary. An insurer can decline to be rated, and many Canadian personal-lines insurers with no commercial counterparty requirement do.

## Ratings and regulatory assessment

A rating is an independent, market-facing assessment that sits alongside the regulator's. It is an opinion aimed at counterparties, and it is published. Supervision is confidential and carries legal powers.

Agencies apply their own capital models, such as Best's BCAR and S&P's capital model, which can differ substantially from the [[MCT]] because they are calibrated to different objectives. A rating of A- requires materially more than the minimum a regulator will accept. A regulator asks whether the insurer will fail, and an agency asks whether it will pay every claim comfortably.

> [!example]- How should the Appointed Actuary and the board respond to this negative outlook? {Example}
> An insurer maintains an MCT ratio of $172\%$, comfortably above the $150\%$ supervisory target, and OSFI has raised no concerns. Its rating agency places it on negative outlook, citing reserve development and business concentration.
>
> > [!answer]-
> > - The two assessments answer different questions, so their disagreement is informative rather than a reason to dismiss the outlook.
> > - The agency's capital model may charge more for reserve risk on this line mix, or apply a concentration charge the MCT's standardised formula does not.
> > - The MCT is a point-in-time measure. The agency forms a forward view, and it has weighted the reserve development trend as a predictor.
> > - The [[Appointed Actuary]] tests whether the agency is right about reserves. A negative outlook citing development is the same signal a [[Canadian Annual Return]] development exhibit would give. If actual-versus-expected analysis confirms it, the reserves need strengthening and the MCT ratio is overstated too.
> > - The board models the downgrade as an [[FCT]] scenario: the business lost below A-, and the higher reinsurance and funding costs. On a commercial book that consequence can be larger than the reserve deficiency behind it.
> > - Neither treats "we exceed the supervisory target" as an answer. The regulator's threshold is a floor for continued operation, not a statement that the insurer is well capitalised.

## Why a rating matters commercially

Commercial insureds, brokers and reinsurers often require a minimum rating, and A- is a common threshold. A downgrade below it can remove access to whole segments of business regardless of the insurer's actual solvency. Reinsurers price cedants by rating, and lenders price debt by it. For a commercial insurer a rating can be as consequential as the MCT ratio.

A downgrade reduces business, raises reinsurance and funding costs, and weakens the metrics that produced the rating. This downgrade spiral is a [[Ripple Effect|ripple effect]], which is why [[FCT]] scenarios should carry a downgrade as a consequence rather than treat the rating as fixed.

## Ratings as an early warning

Agencies act on forward-looking information and often move before regulatory metrics deteriorate, so a negative outlook is a signal worth taking seriously. They are also demonstrably imperfect, with the financial crisis the standard illustration, and they do not substitute for the insurer's own analysis.

> [!trap] Treating the MCT ratio as the answer to a rating concern
> An MCT ratio above the supervisory target says the insurer clears the regulator's floor. It does not answer an agency's concern, because the agency's model and tolerance are different and stricter.
