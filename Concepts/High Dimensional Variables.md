---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-17
  last_checked_by: agent:validate-v1
  content_hash: sha256:04ef6425db7d7b03ad4f21ab9aafb42189a69d4b349457034c21087ff32a09f3
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §5.5, §9.2, §10.1, PDF pp.65, 100-101, 103-106, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Chalk et al., From GLMs to Comprehensive Insurance Pricing: Techniques and Challenges, CAS Monograph 16, 1st ed., Ch.6 §6.1-6.7, Ch.8 §8.2, PDF pp.85-105, 143, sha256:0b293634c3d6320eac9aca5d2f8ba4ca7954f20db8a462b24771c60b5e046d74 — https://www.casact.org/sites/default/files/2026-02/CAS_Monograph-16_From_GLMs.pdf"
    - "Couret & Venter, Using Multi-Dimensional Credibility to Estimate Class Frequency Vectors in Workers Compensation (ASTIN Bulletin 38(1), 2008), abstract, §2, PDF pp.1-2, 7-11, sha256:ce50d8a0fbc395621d29dd153836b0303a269d94697bb1932b5f334b47ebba18 — https://www.casact.org/sites/default/files/2021-03/8_Couret_Venter.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/High Dimensional Variables.md
---

**High Dimensional Variables** are categorical rating variables with so many levels that most levels have too little data to be estimated reliably on their own. Examples are hundreds or thousands of territories, tens of thousands of vehicle make, model and year combinations, and hundreds of workers compensation class codes. Dummy-coded straight into a [[Generalized Linear Model|GLM]], such a variable either fails to fit or gives every thin level full credibility.

> $$\hat{R}_j = Z_j\,\bar{R}_j + (1 - Z_j)\,C_j$$

> $$Z_j = \frac{E_j}{E_j + K}$$

- $\bar{R}_j$ is level $j$'s own indicated relativity, net of the other rating variables. $C_j$ is its complement: the grand mean, or better, a prediction built from the level's characteristics. $E_j$ is the level's exposure, and $K$ is the expected process variance divided by the variance of the hypothetical means ([[Bühlmann-Straub Credibility]]).
- **Why a plain GLM struggles.** A GLM gives each level the estimate that best fits its own data, whatever the volume, so thin levels get extreme coefficients with wide standard errors. The levels use up degrees of freedom, and a new level (a new vehicle model, a new class) has no coefficient at all. Merging levels crudely throws signal away.
- **Approaches (Exam 8).**
  1. **Group the levels**, by banding indicated relativities or by clustering on loss characteristics. WC classes are grouped into hazard groups this way for excess pricing. Grouping on the response itself overfits unless it is checked on holdout data.
  2. **Replace the level's identity with its characteristics**: vehicle weight, price and safety features, or a territory's density and weather. A model on characteristics extends to thin and brand-new levels.
  3. **Shrink toward the complement.** A GLMM treats the variable as a [[Random Effects|random effect]]. The [[Generalized Linear Models for Insurance Rating (Goldburd et al. - 2020)|GLM monograph]] notes that its estimates land between the GLM's full-credibility value and the grand mean, just as in Bühlmann-Straub. Elastic net and ridge penalties ([[Regularization]]) shrink in a similar way.
  4. **Build a separate model and enter it as an offset.** This is the monograph's approach for territories. A standalone territory model (for example, spatial smoothing) supplies loss costs, which enter the classification GLM as an [[Offset Variable|offset]]. The territory model is in turn offset for the class plan, and the two are iterated toward convergence.
  5. **Borrow strength across outcomes.** Couret and Venter estimate each WC class's vector of claim frequencies by injury type with multi-dimensional credibility, so each injury type's estimate draws on the class's other injury counts. On holdout data this added information beyond the standard seven hazard groups.
- See [[Territorial Rating]], [[Vehicle Make and Model]] and [[Workers Compensation Classification]] for the three standard cases.

> [!example]- Same Indication, Different Credibility {Example}
> Two territories each show an indicated relativity of $1.36$ against a statewide complement of $1.00$. Territory 1 has $500$ exposures and Territory 2 has $18{,}000$. The credibility constant is $K = 2{,}000$. Find each territory's credibility-weighted relativity.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > Z_1 &= \frac{500}{500 + 2{,}000} \\
> > &= 0.20 \\[4pt]
> > \hat{R}_1 &= 0.20(1.36) + 0.80(1.00) \\
> > &= 1.072
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > Z_2 &= \frac{18{,}000}{18{,}000 + 2{,}000} \\
> > &= 0.90 \\[4pt]
> > \hat{R}_2 &= 0.90(1.36) + 0.10(1.00) \\
> > &= 1.324
> > \end{align*}
> > $$
> >
> > A plain GLM would charge both territories $1.36$. Shrinkage keeps 90% of the large territory's indication but only 20% of the small one's, where a $+36\%$ reading on 500 exposures could easily be noise. A complement built from territory characteristics would do better still than a flat $1.00$.

> [!example]- Why Not Dummy-Code 2,400 ZIP Codes? {Example}
> An analyst proposes adding ZIP code, with $2{,}400$ levels, to a personal auto GLM as an ordinary categorical variable. Evaluate the proposal and suggest an alternative.
>
> > [!answer]-
> > **Problems.** There would be $2{,}399$ parameters, most of them estimated from a handful of claims and each given full credibility, so the relativities for small ZIPs are mostly noise. The fit may not converge or may be unstable, and ZIPs with no data in the training period get no estimate. Collapsing the ZIPs to a manageable number of groups instead would discard much of the real geographic signal.
> >
> > **Alternative.** Build territory as its own model, for example by smoothing loss costs spatially and using ZIP characteristics so that neighbours and similar areas lend each other credibility. Then feed its indicated loss cost into the classification GLM as an **offset**. The class variables are then fitted net of geography, so they cannot proxy for it. The territory model is offset for the class plan in turn, and the two are rerun until they settle.
