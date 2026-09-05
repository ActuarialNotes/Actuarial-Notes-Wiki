---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8fbf3f450b32ef7cbac38f5037f9a1fcdcfa6c874dfa229e49b77b325ad4f42f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Territorial Rating.md
---

**Territorial Rating** is the use of a policyholder's geographic location as a rating variable. It is among the most predictive variables in auto and property insurance and among the most politically contested, because territory correlates with income and with racial and ethnic composition — so a rate difference justified by loss experience can look, and function, like a difference based on who lives there.

> $$\text{Territory relativity} = \frac{\text{Territory pure premium}}{\text{Statewide pure premium}}$$

- **Why territory predicts:** traffic density and collision frequency, theft and vandalism rates, road and weather conditions, litigation propensity and local award levels, repair and medical cost levels, and — for property — [[Flood Insurance|flood]], hail, wildfire and fire-protection differences.
- **Why it is contested:** territory is not chosen the way a vehicle is, it correlates with protected and socio-economic characteristics, and boundaries are drawn by the insurer. A boundary that splits a city along an income line invites the objection that the variable is doing the work of a prohibited one — see [[Unfair Discrimination]] and [[Bias in Actuarial Practice]].
- **Canadian restrictions** are real: Ontario limits how narrowly auto territories may be drawn and has repeatedly examined postal-code rating in the Greater Toronto Area; some provinces prohibit territory in auto rating altogether, and public auto insurers ([[Public Auto Insurance]]) generally use very coarse territories or none.
- **Credibility and smoothing** matter more here than for most variables: small territories have volatile experience, so raw relativities are [[Credibility|credibility-weighted]] toward a larger region and spatially smoothed so that adjacent territories do not show implausible jumps.
- Removing or flattening territory creates the standard cross-subsidy: low-cost rural and suburban policyholders subsidise high-cost urban ones, and — because urban policyholders are more numerous in most provinces — the aggregate transfer can be large.

> [!example]- Should These Territories Be Merged? {Example}
> Two adjacent urban territories show the following auto liability experience over five years.
>
> - Territory A: $18{,}000$ earned exposures, pure premium $\$540$
> - Territory B: $2{,}400$ earned exposures, pure premium $\$910$
>
> The province requires that territorial relativities be actuarially supported and limits the number of territories in a city. Should B remain separate?
>
> > [!answer]-
> > Two questions decide it: is the difference **real**, and is it **defensible**?
> >
> > **Real?** $2{,}400$ exposures over five years is $12{,}000$ exposure-years — for liability, that is partially but not fully credible. The indicated relativity for B versus the combined average is large, but a substantial part of the $\$910$ could be a handful of severe claims. Compute the combined pure premium:
> >
> > $$\begin{align*}
> > \bar{P} &= \frac{18{,}000(\$540) + 2{,}400(\$910)}{20{,}400} \\
> > &= \frac{\$9{,}720{,}000 + \$2{,}184{,}000}{20{,}400} \\
> > &= \$583.53
> > \end{align*}$$
> >
> > B's raw relativity is $910/583.53 = 1.56$. With, say, $Z = 0.45$, the credibility-weighted relativity is $0.45(1.56) + 0.55(1.00) = 1.25$ — a materially different answer, and the one the filing should use.
> >
> > **Defensible?** If B is a distinct area with a known cost driver — higher theft, a congested corridor, a court district with higher awards — the difference survives scrutiny. If B is simply a lower-income neighbourhood adjacent to A with no identifiable cost driver, the regulator will treat the boundary as a proxy and reject it.
> >
> > A defensible filing shows the credibility calculation, the smoothing, and the *reason* the territories differ. Showing only the raw relativity is what turns a technical filing into a political one.
