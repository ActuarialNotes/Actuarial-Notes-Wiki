---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:048f51283fb9fb85c2b18bc6c51bef10be3c45996fbe1f66cd555d0f01ee1764
  sources:
    - "Slud, Actuarial Mathematics and Life-Table Statistics (Univ. of Maryland, 2001, author's posted text), §2.2 pp.39-44 (PDF 49-54: force of mortality, tpx = exp(-int mu), uniform, exponential, Weibull, Gompertz-Makeham, infant mortality); §3.2 pp.62-66 (PDF 72-76: UDD tqx = t qx and mu = q/(1-tq), constant force tpx = px^t, complete = curtate + 1/2, no simple model fits a whole life table); §4.1 pp.99-103 (PDF 109-113: term, pure endowment nEx = v^n npx, endowment = term + pure endowment, deferred = nEx A_{x+n}, d ä + A = 1); §4.2 pp.110-111 (PDF 120-121: Abar = (i/delta) A under UDD); §5.1 p.127 (PDF 137: i/i(m) on the term part only, pure endowment independent of m), sha256:dccaca6b0e9f58a2f472390538e901660d0a45eb816e2869657718735c2b80bb — https://www.math.umd.edu/~slud/s470/BookChaps/01Book.pdf"
    - "Perryman, International Actuarial Notation, PCAS XXXVI (1949), pp.124-130 (general principles of the four spaces; p, q, mu, e, A, E, a; trema, bar, ring, (m); numeral over the status; nEx; endowment assurance; selection [x]+t), sha256:819cf715537c2dd1dd6adbd72e41aa9c6dd7f4b8c5571ab6795f79182b2949d2 — https://www.casact.org/sites/default/files/database/proceed_proceed49_49123.pdf"
    - "SOA Exam FAM-L sample solutions (2024-10), Q4.12 p.23 (Cov(Z1,Z2) = -E[Z1]E[Z2]), Q4.19 p.26, Q6.3-6.4 p.35 (second moments, variances), sha256:9e7f7b03e0252ccb8f69e4f453d443d8d7cb43ef3945d05c935fdf234cae72ab — https://www.soa.org/globalassets/assets/files/edu/2024/fall/solutions/2024-10-exam-fam-l-sample-solutions.pdf"
    - "SOA Exam FAM syllabus, October 2026, Topics 8-10 learning outcomes pp.6-7; Readings p.8 (AMLCR chapters), sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf"
    - "SOA Exam ALTAM syllabus, October 2026, Topic 1 p.2, Topic 3 p.3; Resources p.7 (AMLCR chapters), sha256:44b64a78219337f43387cb52837c7c2ce590ae2b97321d6e8e4e29ab2cd38c5e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-altam-syllabus.pdf"
    - "SOA ILA-101 syllabus 2026-2027, p.3 (mortality, lapse ... assumptions and methods for their development), sha256:6494067f4d7faee58407e441df609030bb743fd6678f122159d3287d00217e49 — https://www.soa.org/globalassets/assets/files/edu/2026/ila-101/2026-2027-ila-101-syllabus.pdf"
    - "SOA ILA-201U syllabus 2026-2027, p.5 (offsets between mortality and longevity risk), sha256:daa04ce74955f3f9410aa18ae501d020420272b16de1fe550a788bf89c1d4e87 — https://www.soa.org/globalassets/assets/files/edu/2026/ila-201u/2026-2027-ila-201u-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Life Insurance.md
---

**Life Insurance** is a contract that pays a benefit on the death of the insured (and, for an endowment, on survival to the end of the term), in exchange for premiums paid while the insured is alive. Actuarially it is valued through its present value [[Random Variable|random variable]] $Z$, whose [[Expected Value|expected value]] is the expected present value (EPV) written $A$ in standard actuarial notation.

> $$\text{Whole life: } Z = v^{K_x + 1}$$

> $$\text{Term } n\text{: } Z = v^{K_x + 1}\,\mathbb{1}\{K_x < n\}$$

> $$\text{Endowment } n\text{: } Z = v^{\min(K_x + 1,\, n)}$$

> $$A^{1}_{x:\overline{n}|} = \sum_{k=0}^{n-1} v^{k+1}\;{}_kp_x\,q_{x+k}$$

- $K_x$ is the curtate future lifetime of $(x)$, so the benefit is paid at the end of the year of death. Paid at the moment of death the time is $T_x$ ($\bar{A}$), and at the end of the $1/m$-th of a year of death the EPV is $A^{(m)}$
- Products: [[Whole Life Insurance|whole life]] ($A_x$), term ($A^{1}_{x:\overline{n}|}$), pure endowment (${}_nE_x = v^n\,{}_np_x$), endowment ($A_{x:\overline{n}|} = A^{1}_{x:\overline{n}|} + {}_nE_x$), and policies with account values such as [[Universal Life Insurance|universal life]] and equity-linked contracts
- **Variance:** the second moment ${}^2\!A$ is $A$ at $v^2$, and $\text{Var}(Z) = {}^2\!A - A^2$ for a benefit of 1. Insurance and [[Life Annuity|annuity]] EPVs are linked by $A_{x:\overline{n}|} = 1 - d\,\ddot{a}_{x:\overline{n}|}$
- Under the uniform distribution of deaths [[Fractional Age Assumption|fractional age assumption]], $\bar{A}_x = \frac{i}{\delta}A_x$ and $A^{(m)}_x = \frac{i}{i^{(m)}}A_x$ (for a term or endowment insurance, only the death part is adjusted)

> [!example]- Three-Year Term Insurance: EPV and Standard Deviation {Example}
> A 3-year term insurance on $(60)$ pays $100{,}000$ at the end of the year of death. Given $q_{60} = 0.010$, $q_{61} = 0.012$, $q_{62} = 0.014$ and $i = 5\%$, find the EPV and the standard deviation of the present value.
>
> > [!answer]-
> > The probabilities of death in years 1, 2, 3 are $0.010$, $0.99(0.012) = 0.01188$ and $0.97812(0.014) = 0.013694$.
> > $$
> > \begin{align*}
> > A^{1}_{60:\overline{3}|} &= 0.010v + 0.01188v^2 + 0.013694v^3 \\
> > &= 0.009524 + 0.010776 + 0.011829 \\
> > &= 0.032128
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > {}^2\!A^{1}_{60:\overline{3}|} &= 0.010v^2 + 0.01188v^4 + 0.013694v^6 \\
> > &= 0.029062
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > \text{SD} &= 100{,}000\sqrt{0.029062 - 0.032128^2} \\
> > &= 100{,}000(0.16742) \\
> > &= 16{,}742
> > \end{align*}
> > $$
> > The EPV is $\$3{,}212.84$ but the standard deviation is five times that: term insurance is almost all risk.

> [!example]- Endowment Insurance and Its Annuity {Example}
> For the same life and rates, find the EPV and standard deviation of a 3-year endowment insurance of $100{,}000$, and use it to find $\ddot{a}_{60:\overline{3}|}$.
>
> > [!answer]-
> > ${}_3p_{60} = 0.96443$, so ${}_3E_{60} = 0.96443v^3 = 0.833108$.
> > $$
> > \begin{align*}
> > A_{60:\overline{3}|} &= 0.032128 + 0.833108 \\
> > &= 0.865236
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > {}^2\!A_{60:\overline{3}|} &= 0.029062 + 0.96443v^6 \\
> > &= 0.748732
> > \end{align*}
> > $$
> > $\text{Var} = 0.748732 - 0.865236^2 = 0.0000986$, so SD $= 100{,}000\sqrt{0.0000986} = 993$.
> > $$
> > \begin{align*}
> > \ddot{a}_{60:\overline{3}|} &= \frac{1 - 0.865236}{0.05/1.05} \\
> > &= 2.83004
> > \end{align*}
> > $$
> > Direct check: $1 + 0.99v + 0.97812v^2 = 2.83004$. The endowment pays at time 3 at the latest, so its value hardly varies.

> [!example]- From Annual to Continuous and Monthly Under UDD {Example}
> At $i = 5\%$, $A_{50} = 0.24905$. Under UDD find $\bar{A}_{50}$ and $A^{(12)}_{50}$.
>
> > [!answer]-
> > $\delta = \ln 1.05 = 0.048790$ and $i^{(12)} = 12(1.05^{1/12} - 1) = 0.048889$.
> > $$
> > \begin{align*}
> > \bar{A}_{50} &= \frac{0.05}{0.048790}(0.24905) \\
> > &= 0.25523
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > A^{(12)}_{50} &= \frac{0.05}{0.048889}(0.24905) \\
> > &= 0.25471
> > \end{align*}
> > $$
> > Paying sooner after death is worth more; monthly lies between annual and continuous.

> [!tip]- How it appears on the exam
> - **FAM** asks to identify the present value random variable for a whole life, term or endowment insurance, annual, $1/m$-thly or continuous, then its mean, variance or a probability such as $P(Z > z)$, often converting between frequencies with UDD or claims acceleration.
> - FAM also tests the insurance–annuity identities and the effect of changing mortality or interest on $A$.
> - **ALTAM**, **ILA-101**, **CP-341** and **ILA-201I** use life insurance as the product being priced, reinsured, valued under IFRS 17 or embedded with options: the questions are about the contract design and its cash flows rather than the symbol.

> [!warning]- Exam traps
> - Squaring the EPV to get the second moment: ${}^2\!A$ is computed at $v^2$ (or $2\delta$), not $(A)^2$; the two differ and their difference is the variance.
> - Applying $i/\delta$ to the whole endowment insurance under UDD. Only the term (death) part is paid within the year; the pure endowment ${}_nE_x$ is already paid at a fixed time.
> - Variance of an endowment as the sum of the term and pure endowment variances: the two parts are mutually exclusive, so the covariance is $-A^1\,{}_nE_x$ and the second moments add instead.
