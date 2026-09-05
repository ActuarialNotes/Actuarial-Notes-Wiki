---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:fa29f81a346bd79fb88f77a7a5ef159d806eb022bbc67f6c0f8221902abb00fd
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Rating Agency.md
---

**A Rating Agency** — A.M. Best, S&P, Moody's, DBRS Morningstar and Fitch in the Canadian market — assigns a **financial strength rating** expressing its opinion of an insurer's ability to meet its policyholder obligations. It is an independent, market-facing assessment that sits alongside the regulator's, and for a commercial insurer it can be as consequential as the [[MCT]] ratio.

- **What a rating assesses:** balance sheet strength (capital adequacy on the agency's own model, reserve adequacy, reinsurance quality, liquidity), operating performance, business profile (scale, diversification, market position), and enterprise risk management.
- **How it differs from regulatory assessment.** A rating is an opinion aimed at counterparties and is **published**; supervision is confidential and carries legal powers. Agencies apply their own capital models — Best's BCAR, S&P's capital model — which can differ substantially from the MCT because they are calibrated to different objectives.
- **Why it matters commercially.** Commercial insureds, brokers and reinsurers often require a minimum rating (A- is a common threshold), so a downgrade below it can remove access to whole segments of business regardless of the insurer's actual solvency. Reinsurers price cedants by rating; lenders price debt by it.
- **The downgrade spiral is a [[Ripple Effect|ripple effect]] to model explicitly.** A downgrade reduces business, raises reinsurance and funding costs, and weakens the metrics that produced the rating — which is why [[FCT]] scenarios should carry a downgrade as a consequence rather than treating the rating as fixed.
- **Ratings as an early warning.** Agencies act on forward-looking information and often move before regulatory metrics deteriorate, so a negative outlook is a signal worth taking seriously. Against that, they are demonstrably imperfect — the financial crisis is the standard illustration — and they should not substitute for the insurer's own analysis.
- **Ratings are voluntary.** An insurer can decline to be rated, and many Canadian personal-lines insurers with no commercial counterparty requirement do.

> [!example]- Regulator Satisfied, Agency Not {Example}
> An insurer maintains an MCT ratio of $172\%$, comfortably above the $150\%$ supervisory target, and OSFI has raised no concerns. Its rating agency places it on negative outlook, citing reserve development and business concentration.
>
> How should the [[Appointed Actuary]] and the board respond?
>
> > [!answer]-
> > **Take it seriously rather than dismissing it.** The two assessments answer different questions, and disagreement between them is informative.
> >
> > **Why they can differ:**
> >
> > - **Different capital models.** The agency's model may charge more for reserve risk on this insurer's line mix, or apply a concentration charge the [[MCT]]'s standardised formula does not.
> > - **Different horizons.** The MCT is a point-in-time measure; the agency is forming a forward view, and it has weighted the reserve development trend as a predictor.
> > - **Different tolerances.** A rating of A- requires materially more than the minimum a regulator will accept — a regulator asks whether the insurer will fail, an agency asks whether it will pay every claim comfortably.
> >
> > **What the actuary should do.** Test whether the agency is right about reserves. A negative outlook citing development is an external party independently reaching the conclusion that the reserving process is biased — the same signal a [[Canadian Annual Return]] development exhibit would give. If an actual-versus-expected analysis confirms it, the reserves need strengthening, and the [[MCT]] ratio is overstated too.
> >
> > **What the board should do.** Model the downgrade as a scenario in [[FCT]]: what business is lost if the rating falls below A-, what reinsurance costs, what funding costs. On a commercial book, that consequence can be larger than the reserve deficiency that triggered it.
> >
> > **What neither should do** is treat "we exceed the supervisory target" as an answer. The regulator's threshold is a floor for continued operation, not a statement that the insurer is well capitalised — and the agency is measuring something the insurer's customers actually care about.
