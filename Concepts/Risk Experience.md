---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-17
  last_checked_by: agent:validate-v1
  content_hash: sha256:8fb9a82c6ef73404e2d22f42bc17c9676d789071d59f57006d779eaa42e95199
  sources:
    - "Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, 2016), Ch.15 experience rating, PDF pp.301-305, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.1 §1-5, Ch.2 §3, PDF pp.8-9, 26, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf"
    - "Mahler, An Example of Credibility and Shifting Risk Parameters (PCAS LXXVII, 1990), §4.2, PDF pp.10-12, sha256:101593b055845cf0882738352dde247da6c40bb5f029f394b5c1ebc597dfdb58 — https://www.casact.org/sites/default/files/database/proceed_proceed90_90225.pdf"
    - "Bailey & Simon, An Actuarial Note on the Credibility of Experience of a Single Private Passenger Car (PCAS XLVI, 1959), conclusion (3), PDF p.3, sha256:3e44bb5b3d17e96aaae61b27b0d72889043c44feb049a3ca3444095101f456e2 — https://www.casact.org/sites/default/files/2021-03/8_Bailey_Simon.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Risk Experience.md
---

**Risk Experience** is the observed loss history of a particular risk — its claims, losses and exposures over a stated period — as distinct from the experience its class would lead one to expect. Experience rating, retrospective rating and credibility theory all turn on how much weight that record deserves.

> $$\hat{\mu}_i = Z_i\,\bar{X}_i + (1 - Z_i)\,\hat{\mu}$$

> $$Z_i = \frac{m_i}{m_i + \hat{v}/\hat{a}}$$

- $\bar X_i$ is risk $i$'s observed mean (loss per exposure, or claim frequency) over exposure $m_i$, and $\hat\mu$ is the class or collective mean. $\hat v$ is the [[Expected Value of Process Variance|expected process variance]] and $\hat a$ the [[Variance of Hypothetical Means|variance of the hypothetical means]].
- **In experience rating (Exam 8)** the risk's own experience $A$ is usually three completed policy years, excluding the most recent immature one. It is capped per claim, or split into primary and excess. It has to be on the **same basis** as the expected losses $E$ — same limits, same maturity, same exposure — because the mod measures only how far the record shows the risk to differ from others in its [[Rating Class|class]]. The mod is not a charge-back for past losses ([[Experience Rating]]).
- **In retrospective and loss-sensitive rating** the "actual loss" is the current policy's own losses, limited per occurrence and bounded by the minimum and maximum. Incurred plans first value them about 18 months after inception and then annually, so the premium follows development ([[Loss Sensitive Rating]]).
- **In credibility estimation (MAS-II)** experience does double duty. It supplies each risk's own mean, and pooled across risks it is the data the structural parameters are estimated from. $\hat v$ comes from year-to-year variation within risks, and $\hat a$ from how much the risk means spread beyond what $\hat v$ explains (*non-parametric*). Alternatively, an assumed family supplies one of them — for Poisson counts $\hat v = \bar X$ (*semi-parametric*). See [[Empirical Bayes Credibility]].
- **Limits on what experience says.** Mahler showed that risk parameters shift over time, so older years predict less. Bailey and Simon found that adding a second year raised credibility by only about two-fifths, not double. A change in operations can make the record out of date, which is where [[Schedule Rating|schedule rating]] comes in.

> [!example]- Putting Experience on the Same Basis as Expected {Example}
> A risk's policy year is valued 18 months after inception at $\$120{,}000$ of reported limited losses. Expected *ultimate* limited losses for a risk of its class and size are $\$200{,}000$, of which $55\%$ is expected to be reported by 18 months. How does its experience compare with expectation?
>
> > [!answer]-
> > Comparing immature actual losses with ultimate expected losses is wrong:
> >
> > $$\frac{120{,}000}{200{,}000} = 0.60$$
> >
> > That would suggest the risk is $40\%$ better than expected. Put both at the same maturity, or complete the actual losses with the expected unreported:
> >
> > $$
> > \begin{align*}
> > \frac{A}{E_{18}} &= \frac{120{,}000}{0.55 \times 200{,}000} \\
> > &= 1.09 \\[6pt]
> > \frac{A + E_{\text{unrep}}}{E} &= \frac{120{,}000 + 0.45 \times 200{,}000}{200{,}000} \\
> > &= 1.05
> > \end{align*}
> > $$
> >
> > Both versions show the risk running *slightly worse* than expected. The completed ratio is milder, because only the reported part is the risk's own experience. The naive ratio would have handed a large, unwarranted credit to a risk whose losses are simply still coming in.

> [!example]- Estimating Structural Parameters from Portfolio Experience {Example}
> Last year, a portfolio of $1{,}000$ policies had $700$ with no claims, $220$ with one, $60$ with two and $20$ with three. Each policy's count is assumed Poisson given its own mean. Estimate $\hat v$, $\hat a$ and the credibility-weighted frequency for a policy that had two claims.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \bar{X} &= \frac{220 + 120 + 60}{1{,}000} \\
> > &= 0.40 \\[4pt]
> > s^2 &= \frac{640 - 1{,}000(0.40)^2}{999} \\
> > &= 0.4805 \\[4pt]
> > \hat{v} &= \bar{X} \\
> > &= 0.40 \\[4pt]
> > \hat{a} &= s^2 - \hat{v} \\
> > &= 0.0805 \\[4pt]
> > Z &= \frac{1}{1 + 0.40/0.0805} \\
> > &= 0.1675 \\[4pt]
> > \hat{\mu} &= 0.1675(2) + 0.8325(0.40) \\
> > &= 0.668
> > \end{align*}
> > $$
> >
> > Here $640 = \sum x^2 = 220(1) + 60(4) + 20(9)$. The portfolio's variance exceeds its mean, and that excess is the evidence that policies genuinely differ. Even so, one year of one policy's experience earns only $17\%$ weight: two claims move its estimate from $0.40$ to $0.67$, not to $2$.
