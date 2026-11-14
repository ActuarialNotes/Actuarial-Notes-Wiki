---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:7f771ebcdb54f25fabe9f617f7474f3b06b802416a77a1589c685da7e78d5787
  sources:
    - "Bahnemann, Distributions for Actuaries, CAS Monograph 2 (2015), §5.1 eq.5.1, §5.2 eq.5.8, Examples 5.2 and 5.4, PDF pp.154-160; §6.2 franchise deductible eqs.6.35-6.36, Example 6.8, PDF pp.190-191, sha256:d4d172f9646852ab018ae3f0df95e5fbdbfabda4db55d6d4596977ed2eaa3ef8 — https://www.casact.org/sites/default/files/2021-03/8_Bahnemann.pdf"
    - "Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.3 §1, PDF p.48; Formula 3.8, PDF p.84; Lee diagrams PDF pp.65, 111-114, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Excess and Deductible Rating.md
---

**Excess and Deductible Rating** is the pricing of coverage that pays only part of each loss (above a deductible or retention, up to a limit, or between an attachment and an exhaustion point) by splitting the expected ground-up loss among the parties with a [[Severity Distribution|severity distribution]] and its [[Limited Expected Value|limited expected values]]. With a deductible or retention $d$ and a limit $u$, the expected ground-up loss per occurrence splits as

> $$
> \begin{aligned}
> E[X] = {} & E[X \wedge d] \\
> & + \left(E[X \wedge u] - E[X \wedge d]\right) \\
> & + \left(E[X] - E[X \wedge u]\right)
> \end{aligned}
> $$

- $X$ is the ground-up loss per occurrence.
- $E[X \wedge v]$ is the limited expected value of $X$ at $v$, for $v = d$ or $u$.

The first term over $E[X]$ is the [[Loss Elimination Ratio|loss elimination ratio]] behind [[Deductible Rating|deductible credits]]. The second term is the insured [[Layer of Insurance|layer]], priced by [[Increased Limits|increased limits factors]]. The third is what [[Excess Insurance|excess coverage]] or [[Excess of Loss|excess-of-loss reinsurance]] pays. Multiplying by the expected claim count $E[N]$ gives the aggregate cost. The excess and limited losses, and a deductible's credit, are areas of a [[Lee Diagram]].

## Excess ratio and loss elimination ratio

The excess ratio at a per-occurrence limit $L$ is the expected loss above the limit divided by the total expected loss:

> $$R(L) = \frac{E[(X-L)_+]}{E[X]}$$

> $$R(L) = 1 - \frac{E[X \wedge L]}{E[X]}$$

- $E[(X-L)_+] = E[X] - E[X \wedge L] = \int_L^\infty S(x)\,dx$ is the expected loss above $L$ per claim, with $S$ the survival function of $X$.

The share of expected loss that stays under the cap is $E[X \wedge L]/E[X] = 1 - R(L)$, the loss elimination ratio of a deductible at $L$. Fisher et al. write the excess ratio for the per-occurrence limit as $k = (E - E\{A_D\})/E$, where $E$ is the total expected loss and $E\{A_D\}$ is the expected loss after application of the per-occurrence limit.

## Franchise deductible

A franchise deductible eliminates all claims less than or equal to the deductible amount $d$, and claims in excess of $d$ are paid in full: a claim of $x > d$ costs the insurer $x$, not $x - d$. The expected loss it eliminates per claim is

> $$E[X \wedge d] - d\,S(d)$$

A straight deductible eliminates $E[X \wedge d]$, so the premium credit for a franchise deductible is less than that for a straight deductible of equal size.

## Fitting a Pareto from the excess severity

For a [[Pareto Distribution|Pareto]] with parameters $(\alpha, \theta)$, the excess severity (mean excess claim size) $e(x) = E[X - x \mid X > x]$ is

> $$e(x) = \frac{x + \theta}{\alpha - 1}$$

It is an increasing linear function of $x$. If the sample excess severities $e_n(x)$ plot close to a straight line with positive slope, a Pareto could be used, and a regression of $e_n(x)$ on $x$ gives the parameters as $\alpha = 1 + 1/\text{slope}$ and $\theta = \text{intercept}/\text{slope}$. A high $R^2$ supports the linear shape, but the slope is sensitive to the size of the largest claims, and the fitted parameters could change significantly with just a few of these numbers. The shape of $e(x)$ also shows only at large $x$, where sample data are the most sparse.

## Problems in pricing excess coverage

Few claims reach the upper layers, so pricing leans on fitted curves and industry data, and the tail fit drives the answer. Data are [[Truncation|truncated]] below deductibles and [[Censoring|censored]] at policy limits. A fixed retention leverages [[Inflation|inflation]] into the excess layer. Excess losses report and settle later. Parameter uncertainty is large relative to the expected loss, which calls for a [[Risk Loads|risk load]].

> [!example]- How does $10\%$ severity inflation change the expected loss per claim in each layer? {Example}
> Severity is Pareto with $\alpha = 2$ and $\theta = \$50{,}000$, so $E[X \wedge u] = \theta u/(\theta + u)$. Severity inflation of $10\%$ raises $\theta$ to $\$55{,}000$. The layers are a primary layer of $\$100{,}000$ xs $0$ and an excess layer of $\$500{,}000$ xs $\$500{,}000$.
>
> > [!answer]-
> > - Before inflation, the primary layer's expected loss is $E[X \wedge 100{,}000] = 50{,}000 \times 100{,}000/150{,}000 = 33{,}333.33$.
> > - After, it is $55{,}000 \times 100{,}000/155{,}000 = 35{,}483.87$, an increase of $6.5\%$.
> > - Before inflation, the excess layer's expected loss is $E[X \wedge 1{,}000{,}000] - E[X \wedge 500{,}000] = 47{,}619.05 - 45{,}454.55 = 2{,}164.50$.
> > - After, it is $52{,}132.70 - 49{,}549.55 = 2{,}583.15$, an increase of $19.3\%$.
> > - The ground-up trend is $+10\%$. The primary layer grows $+6.5\%$ and the excess layer $+19.3\%$, because more claims now pierce $\$500{,}000$.

The problems differ by line. In property, loss is capped by the insured value and damage ratios fall as risk size grows, hence [[Exposure Curves|exposure curves]], and catastrophes accumulate across risks. In liability, nothing below the limit caps the loss: tails are heavy, reporting is slow, and whether ALAE sits inside or outside the limit matters. In workers compensation, statutory benefits have no policy limit, excess cost is driven by rare fatal and permanent-total claims, and large-deductible reimbursements carry [[Credit Risk|credit risk]].

## Expenses in deductible and excess premiums

Expenses do not scale with the layer. Claims handling, fixed expense and the risk provision stay behind when the expected loss moves to the insured, so a high-deductible or high-layer premium looks large relative to its expected loss.

> [!example]- What are the premium and the insured's expected total cost for this large deductible policy? {Example}
> A workers compensation account has expected ground-up losses of $\$800{,}000$. Losses limited to a $\$250{,}000$ per-occurrence deductible are expected to be $\$560{,}000$, and $\$540{,}000$ after a $\$900{,}000$ aggregate deductible limit. The insurer adjusts every claim at $10\%$ of ground-up loss and has fixed expenses of $\$60{,}000$. It targets a $\$25{,}000$ profit and risk provision, and premium tax is $3\%$. Deductible reimbursements are not premium.
>
> > [!answer]-
> > - The insurer's expected loss is the per-occurrence excess plus the aggregate excess, $(800{,}000 - 560{,}000) + (560{,}000 - 540{,}000) = \$260{,}000$.
> > - Claims handling is $10\% \times 800{,}000 = \$80{,}000$.
> > - The premium is $(260{,}000 + 80{,}000 + 60{,}000 + 25{,}000)/(1 - 0.03) = \$438{,}144$.
> > - The insured's expected cost is the premium plus the expected reimbursements, $\$438{,}144 + \$540{,}000 = \$978{,}144$.
> > - Only $59\%$ of the premium is expected loss, because the claims handling on the deductible layer, the fixed expense and the risk provision all remain.
> > - Against a guaranteed-cost premium of $(800{,}000 + 80{,}000 + 60{,}000 + 40{,}000)/0.97 = \$1{,}010{,}309$, the insured saves $\$32{,}165$.
> > - That saving comes from no premium tax on the $\$540{,}000$ of reimbursements and from a smaller risk provision. In exchange, the insurer now carries credit risk on the reimbursements.

## Selection of deductibles and limits

Insureds choose their limits and deductibles knowing their own risk. The GLM monograph therefore estimates coverage-option factors outside the model, by loss elimination and ILF methods, and enters them as an [[Offset Variable|offset]].

> [!trap] Trending an excess layer at the ground-up rate
> A fixed attachment point makes the excess layer grow faster than ground-up losses. In the inflation example, ground-up losses rise $10\%$ and the excess layer $19.3\%$. A rate for the excess layer that is trended at the ground-up $10\%$ is inadequate.
