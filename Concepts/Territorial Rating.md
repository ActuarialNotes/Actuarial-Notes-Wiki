---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-10-17
  last_checked_by: agent:validate-v1
  content_hash: sha256:37b76223f10c21c7012aee8813fdf882f9e5007198a59cccc1cef69ac86c7037
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §9.2, PDF pp.100-101, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Chalk et al., From GLMs to Comprehensive Insurance Pricing: Techniques and Challenges, CAS Monograph 16, 1st ed., §8.2-8.3, §8.8.1, PDF pp.143-146, 152, sha256:0b293634c3d6320eac9aca5d2f8ba4ca7954f20db8a462b24771c60b5e046d74 — https://www.casact.org/sites/default/files/2026-02/CAS_Monograph-16_From_GLMs.pdf"
    - "FSCO, Technical Notes for Automobile Insurance (Oct 2016), §16-17, PDF pp.8-9, sha256:b2ca7a6cdf4e19924f8f4dcb0e2890d723ba9ee3bcd31c31277e72a298f6d2a0 — https://www.casact.org/sites/default/files/2022-05/6C_FSCOTechNotes_102016.pdf"
  open_findings: 3
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

![[Media/Figures/Territorial_Rating.svg|340]]

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
