---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:a99f32b564f8b5f9f7d5162291656393a1c965f66cef24f28c3b8294f026f4a3
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch.10 statistical and operational criteria PDF pp.167-168; full credibility 1,082 and square-root rule PDF p.230, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS 2010), ch.3 homogeneity and credibility, Longley-Cook cake, changing mix PDF pp.35-36, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021, CAS-hosted copy), §12.4.3 PDF p.537 (clusters always found), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Data Segmentation.md
---

**Data Segmentation** is the division of ratemaking or reserving data into groups, such as line, coverage, jurisdiction, class, territory or policy limit, fine enough that each group is [[Homogeneity|homogeneous]] and large enough that its experience is [[Credibility|credible]]. Each further split makes the groups more alike but leaves each with less data. A segment's estimate is often [[Credibility|credibility-weighted]] with a complement, such as the combined experience:

> $$\text{Estimate} = Z \times \text{Segment Pure Premium} + (1 - Z) \times \text{Combined Pure Premium}$$

> $$Z = \min\left(1, \sqrt{\frac{n}{n_F}}\right)$$

- $Z$ is the credibility of the segment's own experience.
- $n$ is the segment's number of claims.
- $n_F$ is the [[Full Credibility Standard|full credibility standard]], such as Werner & Modlin's 1,082 claims.

> [!idea] The idea
> A split is worth making only while the gain in homogeneity outweighs the credibility it costs each group.

> [!example]- A commercial property class has 30,000 sprinklered exposures with 900 claims and $\$4{,}500{,}000$ of losses, and 10,000 non-sprinklered exposures with 400 claims and $\$3{,}600{,}000$. With a full credibility standard of 1,082 claims and the combined pure premium as the complement, what is each group's estimated pure premium? {Example}
> - The sprinklered pure premium is $4{,}500{,}000/30{,}000 = \$150.00$, the non-sprinklered $3{,}600{,}000/10{,}000 = \$360.00$, and the combined $8{,}100{,}000/40{,}000 = \$202.50$.
> - The credibilities are $\sqrt{900/1{,}082} = 0.912$ and $\sqrt{400/1{,}082} = 0.608$.
> - The sprinklered estimate is $0.912 \times 150 + 0.088 \times 202.50 = \$154.62$.
> - The non-sprinklered estimate is $0.608 \times 360 + 0.392 \times 202.50 = \$298.26$.
> - Non-sprinklered risks cost $298.26/154.62 = 1.93$ times as much even after credibility, so the split is worth making.

## Segmenting reserving data

Reserve estimation methods work best on homogeneous data: claims with similar characteristics, settlement rates, severity, frequency and development patterns. The CAS Statement of Principles on loss and LAE reserves directs the actuary to consider the homogeneity and credibility of the data in designing a reserve study. Two segments are combined only when:

1. **Their development patterns are similar.** Age-to-age factors and CDFs that agree at each age support combining. Different coverages within a line, such as auto liability and physical damage, have different reporting and payment patterns and tail lengths, and are kept apart.
2. **Their mix is stable.** Segments whose exposures and claim counts grow at different rates are unlike populations, because the combined factors describe the past mix. Differing policy limits distort the combined severity and development the same way.
3. **The combination adds credibility that is needed.** A segment with little volume may be combined with a related, larger one, and a segment large enough to be credible on its own is analyzed separately, especially if its development differs.

Similar claim frequency is not a reason to combine, because segments with similar frequency can develop differently. Diagnostics such as severities, paid-to-reported ratios, disposal rates and average case reserves are compared across the segments. Geographic differences in legislation, courts and claims handling can call for separate regions. Separate analyses cost time in data preparation, selections and review, and volatile segment estimates can swing reported results that investors, rating agencies and regulators watch.

> [!example]- State A has 2,000 claims a year and State B has 150, growing at the same rate. Their reported CDFs at each age differ by less than 1%. Should they be developed together? {Example}
> - State B's 150 claims a year are not fully credible on their own.
> - The two states develop alike and grow at the same rate, so combining them will not distort the development factors.
> - They are developed together, and the combined factors are applied to each state's own losses.
> - If State B were growing much faster, or its CDFs were longer, it would be analyzed separately despite its thin data.

## Segmenting ratemaking data

Losses are developed and trended on homogeneous bodies of claims: liability and property claims separately, coverages within a line where they behave differently, and states where there is enough volume. In a classification analysis, a level with little exposure has low credibility. Its relativity has wide standard errors, moves from year to year and may reverse. Such levels are grouped with adjacent levels rather than dropping the variable, and fitted relativities that are stable across individual years show a persistent effect rather than noise. Cross-classifying several variables leaves too little data in each cell, and a multivariate model such as a [[Generalized Linear Model|GLM]] uses all the data to estimate each variable's effect.

> [!example]- A homeowners experience period has 9,600 claims. An analyst proposes pure premiums for each of the $20 \times 8 \times 4 = 640$ cells of territory, protection class and construction type. With a full credibility standard of 1,082 claims, how credible is a cell, compared with territory alone? {Example}
> - A cell averages $9{,}600/640 = 15$ claims, a credibility of $\sqrt{15/1{,}082} = 0.118$.
> - A territory alone averages $9{,}600/20 = 480$ claims, a credibility of $\sqrt{480/1{,}082} = 0.666$.
> - The 640-cell table is almost all complement. A multivariate model estimates each variable's effect from all 9,600 claims instead.

## Segments from the data

When the groups are not given in advance, [[Clustering|cluster analysis]] can propose them. It groups risks or classes whose features are similar under a chosen [[Similarity and Distance Measures|distance measure]], to combine them into groups with enough volume to be credible, as NCCI's hazard groups combine workers compensation classes. Clusters formed from the features alone, without loss data, need not differ in expected cost. A clustering algorithm will find clusters in any data, so a proposed segment is held to the same tests as any other: risks with similar expected costs within it, different expected costs from other segments, enough volume to be credible and stability on other data or time periods.

> [!trap] Slicing the data too finely
> Every split makes groups more alike and less credible. The 640-cell table above looks detailed but says very little, because each cell's 15 claims give it 12% credibility. Split only where the groups differ and each keeps enough volume.
