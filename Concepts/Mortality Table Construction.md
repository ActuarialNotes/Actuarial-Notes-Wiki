---
aliases:
  - Modern Mortality Table
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:45250b880c1dc7bec7cfe843d0cb7d9b66764b691733d41d2ff38bdb76ff8d68
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Mortality Table Construction.md
---
**Mortality Table Construction** is the process of turning a body of insured-lives data into a table of [[Mortality|mortality]] rates that a [[Life Insurance Company|life insurer]] can use for pricing, valuation or [[Experience Study|experience studies]]. The modern process measures exposure and deaths, computes crude rates, smooths them by graduation, builds a select and ultimate structure with relative risk classes, projects the rates with an improvement scale, and adds margins or blends the result with an industry table according to its [[Credibility|credibility]].

> $$\hat{q}_{[x]+t} = \frac{D_{[x]+t}}{E_{[x]+t}}$$

> $$\min_{v}\ \sum_{x} w_x\left(v_x - u_x\right)^2 + h\sum_{x}\left(\Delta^{z} v_x\right)^2$$

> $$q^{\text{blend}}_x = \left[Z \cdot \text{A/E} + (1 - Z)\right] q^{\text{ind}}_x$$

- **Symbols:** $D_{[x]+t}$ is the number of deaths and $E_{[x]+t}$ the exposure for lives selected (underwritten) at age $x$ and now in policy duration $t+1$. In the graduation, $u_x$ are the crude rates, $v_x$ the graduated rates, $w_x$ the weights (usually the exposures), $\Delta^{z}$ the $z$-th difference and $h$ the smoothing parameter. In the blend, $Z$ is the credibility of the company's own actual-to-expected ratio and $q^{\text{ind}}_x$ is the industry table.
- **Data and exposure:** Exposure is counted from the later of each policy's issue date and the start of the study, and it ends at death, lapse, maturity or the end of the study, and it can be counted by policies or by amounts insured. An amount-based table gives more weight to large policies, which tend to show lower mortality, so the two bases give different rates and the table must state which it uses. The [[Actual vs Expected Analysis|actual-to-expected]] ratio against a reference table is often the more stable statistic to carry forward than the crude rates themselves.
- **Graduation:** Crude rates jump from age to age because of random variation, so they are smoothed. Whittaker-Henderson graduation trades fit, the weighted squared deviations, against smoothness, the squared $z$-th differences, and a larger $h$ gives a smoother table. Parametric curves such as Gompertz or Makeham, and [[Smoothing Spline|splines]], are the common alternatives, and the extreme ages, where data are thin, are usually filled by fitting a curve and grading it into the graduated rates.
- **Select and ultimate:** Mortality is low just after underwriting and rises with duration as the effect of selection wears off. A table therefore gives select rates $q_{[x]+t}$ for durations within the select period and ultimate rates $q_{x+t}$ after it, and each select column should grade smoothly into the ultimate column.
- **Relative risk and preferred classes:** Insurers sell several underwriting classes, such as preferred and standard, and smoker and nonsmoker. A modern table supplies relative risk tables, which are multiples of the base table, and the classes' multiples must average back to the base table on the expected mix of business.
- **Mortality improvement:** A table is built for a central calendar year and then projected with an improvement scale, $q(x,t) = q(x,t_0)\prod_{s=t_0+1}^{t}\left(1-\phi(x,s)\right)$, where $\phi(x,s)$ is the rate of improvement at age $x$ in year $s$. Improvement is applied first to bring the study data to the table's base year and then, if the purpose allows it, to project beyond.
- **Margins:** A best-estimate table, such as a valuation basic table, is the starting point for pricing. A valuation table, such as a CSO table, adds margins, so that its rates are higher for life insurance and lower for annuities, because the margin must work against the insurer.
- **Credibility:** A company's own experience is rarely large enough to stand alone. Its A/E ratio is blended with the industry table by [[Limited Fluctuation Credibility|limited fluctuation]] or [[Bühlmann Credibility|Bühlmann]] credibility, and the blended ratio is applied to the industry rates.

> [!example]- Whittaker-Henderson Graduation of Crude Rates {Example}
> A study of ages 50 to 54 gives the crude mortality rates below, per 1,000, with exposures in thousands of life-years used as weights. The rates are graduated by Whittaker-Henderson with $z = 2$ and $h = 5$, which gives graduated rates of 2.165, 2.401, 2.533, 2.857 and 3.246 per 1,000.
>
> | Age | 50 | 51 | 52 | 53 | 54 |
> |---|---|---|---|---|---|
> | Crude rate $u_x$ | 2.10 | 2.60 | 2.30 | 2.90 | 3.30 |
> | Exposure $w_x$ | 8 | 10 | 9 | 7 | 6 |
>
> Compute the Whittaker-Henderson objective for the crude rates and for the graduated rates, and check the total expected deaths.
>
> > [!answer]-
> > The crude rates fit perfectly, so their fit term is 0, but their second differences are $-0.80$, $0.90$ and $-0.20$.
> > $$
> > \begin{align*}
> > S_{\text{crude}} &= 0.80^2 + 0.90^2 + 0.20^2 \\
> > &= 1.49 \\
> > F_{\text{crude}} + h\,S_{\text{crude}} &= 0 + 5(1.49) \\
> > &= 7.45
> > \end{align*}
> > $$
> > For the graduated rates, the weighted squared deviations sum to $F = 0.951$ and the squared second differences to $S = 0.0514$.
> > $$
> > \begin{align*}
> > F + h\,S &= 0.951 + 5(0.0514) \\
> > &= 1.208
> > \end{align*}
> > $$
> > The graduated rates give the smaller objective, so they are the better compromise between fit and smoothness at $h = 5$. They are found by solving $(W + hK^{\top}K)\,v = Wu$, where $K$ takes second differences. Because the penalty is unchanged when a straight line is added to $v$, the solution keeps the weighted sum of the rates, so the graduated table expects the same $8(2.10) + 10(2.60) + 9(2.30) + 7(2.90) + 6(3.30) = 103.6$ deaths that were observed, and with $z = 2$ it keeps their weighted mean age too.

> [!example]- Blending Company Experience with an Industry Table {Example}
> A company's mortality study of a block of preferred nonsmoker policies has 270 deaths and an actual-to-expected ratio of 85% against an industry table. Full credibility requires the number of deaths that gives a 90% probability of being within 5% of the true ratio, and partial credibility follows the square-root rule. The industry rate at age 55 is $q^{\text{ind}}_{55} = 0.00400$. Find the blended A/E ratio and the company's assumed $q_{55}$.
>
> > [!answer]-
> > Deaths are treated as Poisson, so the full-credibility standard is $(z/k)^2$ deaths.
> > $$
> > \begin{align*}
> > n_F &= \left(\frac{1.645}{0.05}\right)^2 \\
> > &= 1{,}082.4 \\
> > Z &= \sqrt{\frac{270}{1{,}082.4}} \\
> > &= 0.4994 \\
> > \text{A/E}^{\text{blend}} &= 0.4994(0.85) + 0.5006(1.00) \\
> > &= 0.9251 \\
> > q_{55} &= 0.9251(0.00400) \\
> > &= 0.00370
> > \end{align*}
> > $$
> > The company keeps about half of its favorable experience, so it assumes rates 7.5% below the industry table rather than 15% below. Blending the ratio rather than each age's crude rate keeps the industry table's shape, which the company's sparse data could not estimate age by age.

> [!tip]- How it appears on the exam
> - **ILA-101 framework questions:** Candidates describe the steps of building a modern table, from data collection and exposure through graduation, select and ultimate structure, relative risk, improvement and margins, and they explain the considerations at each step.
> - **Calculation:** Questions ask for crude rates from a small study, an A/E ratio, a credibility-weighted rate, or the effect of an improvement scale on a rate between two calendar years.
> - **Evaluation:** Some questions give a draft table or its features and ask what is wrong with it, such as select rates that cross the ultimate rates, preferred classes whose rates do not balance to the base table, or improvement applied twice.

> [!warning]- Exam traps
> - **Counts versus amounts:** A table built by amounts gives lower rates than one built by policy counts for the same data, because large policies have lower mortality. Comparing a company's count-based A/E ratio with an amount-based table mixes the two bases.
> - **Exposure for deaths:** In an initial-exposure study a death contributes exposure to the end of its year of age, not only to the date of death. Stopping the exposure at death understates the exposure and overstates $\hat q$.
> - **Improvement to the base year:** Study data from several calendar years must be brought to the table's base year before they are combined, and the table's improvement scale then starts from that year. Applying the scale from the study's central year as well counts the same improvement twice.
> - **Margins in the right direction:** A margin raises mortality for life insurance but lowers it for annuities. Loading a payout annuity table upward makes it less conservative, not more.
> - **Graduation that moves the total:** A graduation that changes the total expected deaths has changed the level of the table, not only its shape. Whittaker-Henderson with exposure weights preserves the total, so a large difference signals the wrong weights.
