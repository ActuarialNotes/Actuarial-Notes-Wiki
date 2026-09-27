---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0dde4ea182565eb90a8076a39c57f388f199e166fb61ffe4d184d7976f02ac84
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Two-Stage Model.md
---

A **Two-Stage Model** builds a rating plan in two passes. A first stage, either a [[Generalized Linear Model|GLM]] or relativities fixed in advance, supplies predictions. A second stage, often a different model type, estimates only what remains, starting where the first left off through an [[Offset Variable|offset]], a residual target or a preadjusted target. The stages are recombined by multiplying their relativities.

> $$\log \text{pred}_2 = \log \text{pred}_1 + \log(\text{second-stage effect})$$

> $$r_j = \frac{\sum_{i \in j} c_i}{\sum_{i \in j} e_i u_i}$$

> $$w_j = \sum_{i \in j} e_i u_i$$

- $u_i$ is record $i$'s first-stage predicted frequency, $e_i$ its exposure and $c_i$ its claim count, and $j$ is a group such as a ZIP code. There are three equivalent set-ups for a Poisson log-link second stage. It can model frequency with $\log u_i$ as the **offset**; model the **residual** $r_j$, actual over predicted claims, with **weight** $w_j$, the predicted claims; or model Shi's **preadjusted** frequency, which is the same thing. Residuals are ratios, not differences, because the second stage becomes one more multiplicative rating table.
- **Weights for other targets** (Shi 2010), with $l_i$ the incurred loss:
  - *Severity (Gamma):* response $\sum l_i / \sum c_i u_i$, weight $\sum c_i$.
  - *Loss cost (Tweedie, power $p$):* response $\sum l_i / \sum e_i u_i$, weight $\sum e_i u_i^{2-p}$.
- **Why two stages.**
  - *Fixed relativities.* A deductible scale, a marketing no-claims-bonus scale, or relativities a regulator sets. The GLM is refitted with them as an offset.
  - *Controlled filings.* Current rates serve as a fixed first stage, and a second-stage GLM shows the incremental changes.
  - *Features that can fail at quote time.* Credit score from an enrichment service is correlated with age. Fitting age first and then adding credit keeps the age relativity right on a day the service is down.
  - *What a GLM cannot "grasp".* Geospatial smoothing: fit the GLM without ZIP code, then smooth its offsets or residuals by location with another model, such as a generalized additive model ([[Territorial Rating]]).
  - *Specialist sub-models.* A separate credit score model fitted to the first GLM's residuals, then entered as one feature ([[Credit-Based Insurance Scoring]]). Or a target-encoded high-cardinality variable fitted in a second-stage GLM, so the other tables need not change ([[Target Encoding]]).
  - *A fixed cost per mile* in usage-based insurance, with $\log(\text{mileage})$ as the offset.
- **Offsets leak into correlated features.** When a relativity is offset, features correlated with it move to bring predictions back toward what the full model would give. Sometimes that is wanted, as when age partly corrects a too-generous no-claims discount, but it can create reversals. When a variable is **banned**, omitting it lets correlated features proxy for it. Fitting with it and then dropping its coefficient avoids that. When its relativities are **fixed** by the regulator, including it and replacing its coefficient avoids the same spillover. Either way the intercept may need re-estimating (an off-balance).
- **Leakage.** The second stage must use the first stage's **cross-validation predictions**, or an overfitted first stage "uses up" the signal ([[Data Leakage]]).
- A deductible relativity offset in both frequency and severity models can be split equally, the square root in each. The recombined plan can be simplified: several correlated vehicle tables multiply into one relativity, and a ZIP table becomes a ZIP-to-group map plus a group relativity table.

> [!example]- Offsetting a Marketing Discount {Example}
> A Poisson GLM fitted with driver age and no-claims bonus (NCB) has base frequency $0.08$, age-band E relativity $0.45$ and NCB 4 relativity $0.85$. Every claim costs $\$8{,}000$. Marketing has promised an NCB 4 relativity of $0.30$. Refitting age with $\log$ (marketing NCB relativity) as an offset gives a base of $0.085$ and an age E relativity of $1.05$ (age A stays at $1.00$). Compare the age E, NCB 4 pure premium (a) from the GLM, (b) with the GLM's age relativities and marketing's NCB, and (c) from the offset refit, and comment.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{(a)} &= 0.08 \times 0.45 \times 0.85 \times 8{,}000 \\
> > &= \$244.80 \\[4pt]
> > \text{(b)} &= 0.08 \times 0.45 \times 0.30 \times 8{,}000 \\
> > &= \$86.40 \\[4pt]
> > \text{(c)} &= 0.085 \times 1.05 \times 0.30 \times 8{,}000 \\
> > &= \$214.20
> > \end{align*}
> > $$
> >
> > Simply substituting the marketing scale leaves this class at $35\%$ of its indicated cost. Because most NCB 4 drivers are older, the offset refit raises the older age bands' relativities to make up much of the shortfall, reaching $87.5\%$ of the indicated cost. The price is a **reversal**: age E ($1.05$) now rates above age A ($1.00$), so older drivers look riskier than younger ones. A young driver who has earned NCB 4 gets the full discount *and* a youth relativity that no longer loads for youth, so is badly undercharged. The offset limits the damage; it does not repair the scale.

> [!example]- A Second-Stage ZIP Code Model on Residuals {Example}
> A first-stage frequency GLM excluding location is summarized by ZIP code:
>
> - ZIP 1: $6$ actual claims, $4.0$ expected
> - ZIP 2: $0$ actual, $0.8$ expected
> - ZIP 3: $12$ actual, $13.2$ expected
>
> (a) Give the second-stage response and weight for each ZIP. (b) The smoothed second stage returns relativities $1.25$, $0.95$ and $0.93$. What is the final frequency for a risk in ZIP 1 whose first-stage prediction is $0.040$?
>
> > [!answer]-
> > **(a)** The response is actual over expected claims, and the weight is the expected claims:
> >
> > $$
> > \begin{align*}
> > r_1 &= 6 / 4.0 \\
> > &= 1.500 \\[4pt]
> > r_2 &= 0 / 0.8 \\
> > &= 0 \\[4pt]
> > r_3 &= 12 / 13.2 \\
> > &= 0.909
> > \end{align*}
> > $$
> >
> > with weights $4.0$, $0.8$ and $13.2$. ZIP 2's ratio of $0$ rests on less than one expected claim, so it carries little weight. For a Poisson log-link model this gives the same fit as modelling claim frequency with the log of the first-stage prediction as an offset.
> >
> > **(b)** Multiply the stages: $0.040 \times 1.25 = 0.050$. The smoothing has pulled ZIP 1's raw $1.50$ toward its neighbours. The expected counts must be the first stage's cross-validation predictions, or the residuals understate what location adds.
