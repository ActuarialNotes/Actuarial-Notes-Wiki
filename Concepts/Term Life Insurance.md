---
aliases:
  - Term Life
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:729175477dedf4cd4128de54b5a23e9c8aa6c39905e73ff48c2b718583cc9116
  sources:
    - "SOA Exam FAM Tables (2024-10), Standard Ultimate Life Table at i = 0.05, PDF pp.20-21 (age 50: ä 17.0245, A 0.18931, 2A 0.05108, ä50:10 8.0550, 10E50 0.60182; age 60: ä 14.9041, A 0.29028, 2A 0.10834, q60 0.003398; q61 0.003792; q62 0.004234), sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
    - "SOA Exam FAM Syllabus (2026-02), Topics 9(a)-(e) and 10(a) (PV random variables for life insurance at annual, 1/m-thly and continuous frequency; future loss random variables for term life), PDF p.7, sha256:a0187852c071732f310db9e311d35cda0f59deff1b346c88cb0678be8887cba0 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/syllabi/2026-02-fam-syllabus.pdf"
    - "SOA Exam FAM-L Sample Questions (2024-10), Q1.1 (underwriting/adverse selection) p.3 and Q4.2 (2-year term paid at end of half-year of death, Pr(Z > 277,000)) p.27, sha256:4aaf3469628f2b63a689c187d963857a5a6e749c5eaca9978b264d854f60a28d — https://www.soa.org/globalassets/assets/files/edu/2024/fall/questions/2024-10-exam-fam-l-sample-questions.pdf"
    - "Slud, Actuarial Mathematics and Life-Table Statistics (Univ. of Maryland, (c)2001), §4.1 pp.98-100 (term insurance A^1_{x:n}, decreasing term, nEx = v^n npx) and §4.2 p.108 eq.(4.24), p.111 eq.(4.33) (A-bar term = (i/δ)A term under fractional-age uniformity), sha256:dccaca6b0e9f58a2f472390538e901660d0a45eb816e2869657718735c2b80bb — https://www.math.umd.edu/~slud/s470/BookChaps/01Book.pdf"
    - "NAIC, Life Insurance Buyer's Guide (c)2026, p.5 (term vs cash value; renewable vs nonrenewable term; whole life set premium schedule vs universal life flexible premiums) and p.6 (most term policies have no cash value), sha256:c7439cde01522328eca7eab1a7323e5ca193ed8af7d21deb80bda6ae9f36837a — https://content.naic.org/sites/default/files/publication-lig-lp-consumer-life.pdf"
    - "NAIC Life Insurance Buyer's Guide as adopted at Ill. Admin. Code tit. 50, pt. 930, exh. B (LII), sections Term Insurance (renewal, conversion even if not in good health, largest protection per premium dollar), Cash Value Life Insurance (policy loans; unpaid loan and interest subtracted from benefits or cash value), Whole Life (lifetime if premiums paid; same premium; limited-pay to age 65 higher), Universal Life (flexible premiums and face amount; account falls, coverage ends unless more paid or benefit lowered; increases may need proof), sha256:63fd04a11145a404600bda86539dfb0b5d0ca3d26d2ccba09323a3ff7f261ab7 — https://www.law.cornell.edu/regulations/illinois/Ill-Admin-Code-tit-50-930-Exhibit-B"
    - "SOA / RGA, Report on the Conversion Experience Study for Level Premium Term Plans (2016), Background p.4 ('an element of anti-selection is present for those that elect to convert'), sha256:417801bca1d76828236eb5434597b34374398585d0985369a4e71bde51460a2f — https://www.soa.org/globalassets/assets/files/research/research-2016-06-conversion-mortality-study.pdf"
    - "The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Term Life Insurance.md
---
**Term Life Insurance** pays a sum insured if the insured dies within a fixed term of $n$ years, and nothing if the insured survives the term. For a life aged $x$ paid at the end of the year of death, its present value random variable is $Z$ and its expected present value (EPV), the net single premium, is $A^{1}_{x:\overline{n}|}$, where the 1 over $x$ shows that the benefit is paid only if $(x)$ dies before the term ends. It is the simplest form of [[Life Insurance|life insurance]], with no savings element.

> $$Z = \begin{cases} v^{K_x+1} & K_x \le n-1 \\ 0 & K_x \ge n \end{cases}$$

> $$A^{1}_{x:\overline{n}|} = \sum_{k=0}^{n-1} v^{k+1}\,{}_kp_x\,q_{x+k}$$

> $$\bar{A}^{1}_{x:\overline{n}|} = \int_0^n e^{-\delta t}\,{}_tp_x\,\mu_{x+t}\,dt$$

> $$\text{Var}(Z) = {}^2A^{1}_{x:\overline{n}|} - \left(A^{1}_{x:\overline{n}|}\right)^2$$

> $$A_x = A^{1}_{x:\overline{n}|} + {}_nE_x\,A_{x+n}$$

- **Symbols:** $K_x$ is the curtate [[Future Lifetime Random Variable|future lifetime]], and ${}^2A^{1}_{x:\overline{n}|}$ is the EPV at $v^2$, which is the second moment of $Z$ because $Z^2 = (v^2)^{K_x+1}$ on death within the term. $\bar{A}^{1}_{x:\overline{n}|}$ values a benefit paid at the moment of death, $e^{-\delta T_x}$ when $T_x < n$. Under UDD, $\bar{A}^{1}_{x:\overline{n}|} = \frac{i}{\delta}A^{1}_{x:\overline{n}|}$.
- **From whole life values:** The last block splits a [[Whole Life Insurance|whole life]] insurance into term cover for $n$ years and a whole life insurance deferred $n$ years, where ${}_nE_x = v^n\,{}_np_x$ is the [[Pure Endowment|pure endowment]] factor. For the second moment the deferral factor is $v^{2n}\,{}_np_x$, so ${}^2A^{1}_{x:\overline{n}|} = {}^2A_x - v^n\,{}_nE_x\,{}^2A_{x+n}$. The recursion $A^{1}_{x:\overline{n}|} = v\,q_x + v\,p_x\,A^{1}_{x+1:\overline{n-1}|}$ gives the same values one year at a time.
- **Level and decreasing term:** A level term insurance pays the same sum throughout. A decreasing term insurance reduces the sum each year, often to match the balance of a loan, and its EPV is $\sum_{k=0}^{n-1} b_{k+1}\,v^{k+1}\,{}_kp_x\,q_{x+k}$ for a benefit $b_{k+1}$ on death in year $k+1$.
- **The product:** Because nothing is paid on survival, term insurance is the cheapest way to buy a large death benefit for a fixed period. Level-premium term policies are often renewable at the end of the term or convertible to permanent insurance without new evidence of health, and these options expose the insurer to [[Adverse Selection|adverse selection]]. A renewed term policy charges a higher premium, and the right to renew may end at a stated age. A nonrenewable policy cannot be continued, so the insured must apply, and qualify, for a new one. Most term policies build no cash value.

> [!example]- Ten-Year Term on the SULT {Example}
> On the SULT at $5\%$, $A_{50} = 0.18931$, $A_{60} = 0.29028$, ${}^2A_{50} = 0.05108$, ${}^2A_{60} = 0.10834$, ${}_{10}E_{50} = 0.60182$, $\ddot{a}_{50} = 17.0245$ and $\ddot{a}_{60} = 14.9041$. For a 10-year term insurance of \$100,000 on $(50)$, paid at the end of the year of death, find the EPV, the standard deviation of the present value, and the net annual premium payable for 10 years.
>
> > [!answer]-
> > Here $v^{10} = 0.613913$, so the second-moment deferral factor is $0.613913(0.60182) = 0.369465$.
> > $$
> > \begin{align*}
> > A^{1}_{50:\overline{10}|} &= 0.18931 - 0.60182(0.29028) \\
> > &= 0.014614 \\
> > {}^2A^{1}_{50:\overline{10}|} &= 0.05108 - 0.369465(0.10834) \\
> > &= 0.011052 \\
> > \text{Var}(Z) &= 0.011052 - 0.014614^2 \\
> > &= 0.010838 \\
> > \text{SD} &= 100{,}000\sqrt{0.010838} \\
> > &= 10{,}411 \\
> > \ddot{a}_{50:\overline{10}|} &= 17.0245 - 0.60182(14.9041) \\
> > &= 8.05491 \\
> > P &= \frac{1{,}461.4}{8.05491} \\
> > &= 181.43
> > \end{align*}
> > $$
> > The EPV is \$1,461.40, but the standard deviation is about seven times as large. Almost every policy pays nothing, and the few that pay cost \$100,000.

> [!example]- Decreasing Term Insurance {Example}
> A 3-year decreasing term insurance on $(60)$ pays \$150,000, \$100,000 or \$50,000 at the end of the year of death in years 1, 2 or 3. On the SULT, $q_{60} = 0.003398$, $q_{61} = 0.003792$, $q_{62} = 0.004234$ and $i = 5\%$. Find the EPV.
>
> > [!answer]-
> > The probabilities of death in each year are $q_{60} = 0.003398$, $0.996602(0.003792) = 0.003779$ and $0.996602(0.996208)(0.004234) = 0.004204$.
> > $$
> > \begin{align*}
> > \text{EPV} &= \frac{150{,}000(0.003398)}{1.05} + \frac{100{,}000(0.003779)}{1.05^2} \\
> > &\quad + \frac{50{,}000(0.004204)}{1.05^3} \\
> > &= 485.43 + 342.77 + 181.58 \\
> > &= 1{,}009.78
> > \end{align*}
> > $$
> > A level benefit of \$150,000 for three years would cost \$1,544.31. The decreasing cover costs about a third less, because the sum falls just as the probability of death rises.

> [!example]- Continuous Term Insurance under a Constant Force {Example}
> A life has a constant force of mortality $\mu = 0.01$, and $\delta = 0.04$. A 20-year term insurance pays 1 at the moment of death. Find its EPV and the standard deviation of its present value.
>
> > [!answer]-
> > Under a constant force, $\bar{A}^{1}_{x:\overline{n}|} = \frac{\mu}{\mu+\delta}\left(1 - e^{-(\mu+\delta)n}\right)$, and the second moment replaces $\delta$ by $2\delta$.
> > $$
> > \begin{align*}
> > \bar{A}^{1}_{x:\overline{20}|} &= 0.2\left(1 - e^{-1}\right) \\
> > &= 0.126424 \\
> > {}^2\bar{A}^{1}_{x:\overline{20}|} &= \tfrac{1}{9}\left(1 - e^{-1.8}\right) \\
> > &= 0.092745 \\
> > \text{Var}(\bar{Z}) &= 0.092745 - 0.126424^2 \\
> > &= 0.076762
> > \end{align*}
> > $$
> > The standard deviation is $\sqrt{0.076762} = 0.27706$, more than twice the EPV.

> [!tip]- How it appears on the exam
> - **FAM** asks candidates to identify the present value random variable of a term insurance paid annually, at the end of the $1/m$-th of a year of death, or at the moment of death, and to find its EPV, second moment, variance or a probability such as $\Pr(Z > A^{1}_{x:\overline{n}|})$.
> - **SULT questions:** A FAM question can require $A^{1}_{x:\overline{n}|}$ to be built from whole life and pure endowment values, as in the first example, because the SULT tabulates $A_x$, ${}^2A_x$ and ${}_nE_x$ rather than term insurance values.
> - **Premiums and losses:** Term life is one of the policies in FAM's premium section, which asks for its net or gross premium and its [[Future Loss Random Variable|future loss random variable]].
> - **DISC-IA** lists term life insurance under its Life and Health Insurance section beside whole life and universal life, which is the product view: what the contract pays and how it differs from permanent insurance.

> [!warning]- Exam traps
> - **Squaring the EPV:** The second moment is ${}^2A^{1}_{x:\overline{n}|}$ at $v^2$, not $\left(A^{1}_{x:\overline{n}|}\right)^2$. The difference between the two is the variance.
> - **The deferral factor at $v^2$:** In ${}^2A^{1}_{x:\overline{n}|} = {}^2A_x - v^n\,{}_nE_x\,{}^2A_{x+n}$, the factor is $v^{2n}\,{}_np_x$. Using ${}_nE_x$ alone in the first example gives $0.05108 - 0.60182(0.10834) < 0$, which is impossible for a second moment.
> - **Term versus endowment:** A term insurance pays nothing on survival. Adding ${}_nE_x$ to $A^{1}_{x:\overline{n}|}$ gives the [[Endowment Insurance|endowment insurance]], a different and much dearer contract.
> - **The premium annuity:** Premiums for an $n$-year term are payable for at most $n$ years, so the premium uses $\ddot{a}_{x:\overline{n}|}$. Dividing by $\ddot{a}_x$ assumes premiums continue after the cover has ended.
