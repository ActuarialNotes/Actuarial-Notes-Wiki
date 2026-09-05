---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:363fdb2b14e47bfac5162a602e92a6b522062a932836c96c7a9e0ee52ed50fda
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/MSA Ratios.md
---

**MSA Ratios** are the standardised financial ratios computed from Canadian P&C insurers' regulatory filings and published by MSA Research — the industry's common analytical vocabulary. Because every insurer files the same [[Canadian Annual Return]] on the same instructions, the ratios are genuinely comparable across companies, which is what makes external analysis of the Canadian market possible.

> $$\text{Combined ratio} = \frac{\text{Claims incurred} + \text{Expenses}}{\text{Earned premium}}$$

- **Profitability:** loss ratio, expense ratio and **combined ratio** (below $100\%$ is an underwriting profit); return on equity; investment yield; and the operating ratio, which nets investment income against the combined ratio.
- **Leverage:** **premium to surplus** (how much business is supported by each dollar of capital) and **reserves to surplus** (how exposed surplus is to a reserve error). A reserves-to-surplus ratio of $3$ means a $10\%$ reserve deficiency consumes $30\%$ of surplus.
- **Reserve adequacy:** one-year and two-year development on prior-year reserves as a percentage of opening surplus — the ratio that most directly signals a reserving problem, and the analogue of the US Schedule P development measures.
- **Capital and liquidity:** the [[MCT]] ratio and its trend, liquid assets to liabilities, and change in net written premium (rapid growth being a standard failure precursor — see [[PACICC]]).
- **How to read them.** No single ratio diagnoses anything. The combination that signals distress is the one [[PACICC]]'s failure research identifies: **rapid premium growth, high premium-to-surplus leverage, adverse development, and a falling MCT ratio** appearing together.
- **The IFRS 17 complication.** [[Insurance Revenue]] is not earned premium and [[Insurance Service Expenses]] exclude discount unwind, so ratios computed post-transition are not directly comparable with pre-transition history. Any multi-year ratio series spanning 2023 must be read with that break in mind.

> [!example]- Diagnosing an Insurer From Its Ratios {Example}
> | Ratio | Insurer | Industry |
> |---|---|---|
> | Combined ratio | $103\%$ | $96\%$ |
> | Premium to surplus | $2.8$ | $1.4$ |
> | Reserves to surplus | $3.4$ | $1.9$ |
> | One-year development | $+7\%$ of surplus | $-1\%$ |
> | Growth in net written premium | $+31\%$ | $+5\%$ |
> | MCT ratio | $154\%$ | $221\%$ |
>
> Assess.
>
> > [!answer]-
> > **Every ratio points the same way, and together they are the classic pre-failure profile.**
> >
> > 1. **Growth of $31\%$ against an industry $5\%$.** An insurer growing six times the market is winning business on price, not on selection — nobody hands over that much share for any other reason.
> > 2. **Combined ratio $103\%$** confirms it: the business is being written at an underwriting loss.
> > 3. **Leverage of $2.8$ times surplus, double the industry.** The insurer is supporting twice as much business per dollar of capital, so the same loss ratio hurts twice as much.
> > 4. **Reserves at $3.4$ times surplus** means a $10\%$ reserve deficiency wipes out $34\%$ of surplus. There is no room for error.
> > 5. **Adverse development of $7\%$ of surplus** shows the error is already occurring, and given (3), the true deficiency may be larger than reported.
> > 6. **[[MCT]] at $154\%$** — near the supervisory target, and with growth continuing the [[Base Solvency Buffer]] rises every quarter while losses reduce [[Capital Available]]. Both sides of the ratio move against it.
> >
> > **The mechanism.** Growth is funded by capital the insurer does not have, at prices that do not cover cost, with reserves that are already proving light. This is precisely the sequence [[PACICC]]'s failure research describes, and the remedy — stop growing, raise rates, strengthen reserves, raise capital — is one the insurer will resist because it means shrinking.
> >
> > **What should happen:** [[OSFI]] escalates, requires a capital plan and restricts growth; the [[Appointed Actuary]]'s [[FCT]] report models whether the minimum is breached under adverse scenarios; and the reserve adequacy question is answered independently rather than by the same process that produced the current estimate.
