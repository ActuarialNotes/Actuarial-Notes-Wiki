---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:4eb4c68b6b498ecb62f5478853c4cc6add7d9ad657aefefbc6da313a9d34eef2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Solvency II.md
---

**Solvency II** is the European Union's risk-based solvency regime for insurers, in force since 2016. Canadian candidates study it as the **international benchmark** against which the Canadian framework is compared: it is more explicitly principles-based, uses a market-consistent balance sheet, and permits approved **internal models** in place of the standard formula.

> $$\text{Solvency ratio} = \frac{\text{Own funds}}{\text{SCR}}$$

- **The three pillars:** *Pillar 1* — quantitative requirements (technical provisions, the **Solvency Capital Requirement** and the **Minimum Capital Requirement**); *Pillar 2* — governance and supervisory review, including the **ORSA** (which Canada adopted); *Pillar 3* — disclosure and reporting.
- **The SCR is calibrated to a $99.5\%$ VaR over one year** — the capital needed so that the probability of ruin in a year is $0.5\%$. The **MCR** is a lower floor, breach of which triggers the most severe intervention. The explicit probabilistic calibration is a clear contrast with the [[MCT]], whose factors are calibrated but whose overall confidence level is not stated as a single figure.
- **Technical provisions** are a **best estimate plus a risk margin**, the risk margin computed by a prescribed **cost of capital** method at a specified rate. Compare [[IFRS 17]]'s [[Risk Adjustment for Non-Financial Risk|risk adjustment]], which is entity-specific with a disclosed confidence level and no prescribed method.
- **Internal models** may replace the standard formula for all or part of the SCR, subject to supervisory approval and stringent use, validation and documentation tests. Canada's [[MCT]] does not permit a general internal model for P&C insurers, which is the largest structural difference between the regimes.
- **Comparison points to be able to make:**
  - Both are risk-based, three-pillar frameworks with an ORSA and public disclosure.
  - Solvency II is market-consistent throughout and states its calibration; the MCT is factor-based with a $1.5$ [[Base Solvency Buffer|buffer]] multiplier and target ratios.
  - Solvency II permits internal models; the MCT does not.
  - Canada supervises through a federal-provincial split ([[Federal-Provincial Jurisdiction]]); the EU through national supervisors coordinated by EIOPA.
- Both descend from the same international work — the IAIS Insurance Core Principles and the emerging global capital standard — so convergence rather than divergence is the direction.

> [!example]- Comparing the Two Regimes {Example}
> An insurer operating in both Canada and the EU reports an [[MCT]] ratio of $195\%$ and a Solvency II ratio of $148\%$. Management asks which regulator is being tougher.
>
> > [!answer]-
> > **Neither ratio can be read against the other**, and saying why is the substance of the answer.
> >
> > **The denominators measure different things.**
> >
> > - The **SCR** is calibrated to a $99.5\%$ one-year VaR — an explicit probability statement.
> > - The **[[Base Solvency Buffer]]** is $1.5$ times factor-based [[Capital Required]], with no single stated confidence level. So a $148\%$ Solvency II ratio means own funds are $1.48$ times a $99.5\%$ VaR; a $195\%$ MCT ratio means capital available is $1.95 \times 1.5 = 2.9$ times capital required. The multipliers are not comparable.
> >
> > **The numerators differ too.** Own funds under Solvency II are computed on a market-consistent balance sheet with technical provisions at best estimate plus a prescribed cost-of-capital risk margin; [[Capital Available]] starts from IFRS equity with regulatory deductions. Different liability measurement produces different capital.
> >
> > **What can legitimately be said:**
> >
> > - Against each regime's **own thresholds**: $195\%$ against a $150\%$ supervisory target is comfortable; $148\%$ against a $100\%$ SCR requirement is adequate but with less headroom than the Canadian figure suggests, since a fall to $100\%$ is a regulatory event in both.
> > - Against **peers** in each jurisdiction, which is the only genuinely comparable benchmark.
> >
> > **The management answer:** the two ratios are not evidence about relative toughness; they are two different measurements of the same company. If a single view is needed, the honest route is an economic capital model — which is exactly what [[ORSA]] asks the insurer to build, and why ORSA exists in both regimes.
