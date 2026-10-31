---
aliases:
  - Fractional Age
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:bfad937b111f7a60ba6207a501c298cf2c174a5b05855e046ac1579ace03cdb0
  sources:
    - "Slud, Actuarial Mathematics and Life-Table Statistics (Univ. of Maryland, 2001, author's posted text), §2.2 pp.39-44 (PDF 49-54: force of mortality, tpx = exp(-int mu), uniform, exponential, Weibull, Gompertz-Makeham, infant mortality); §3.2 pp.62-66 (PDF 72-76: UDD tqx = t qx and mu = q/(1-tq), constant force tpx = px^t, complete = curtate + 1/2, no simple model fits a whole life table); §4.1 pp.99-103 (PDF 109-113: term, pure endowment nEx = v^n npx, endowment = term + pure endowment, deferred = nEx A_{x+n}, d ä + A = 1); §4.2 pp.110-111 (PDF 120-121: Abar = (i/delta) A under UDD); §5.1 p.127 (PDF 137: i/i(m) on the term part only, pure endowment independent of m), sha256:dccaca6b0e9f58a2f472390538e901660d0a45eb816e2869657718735c2b80bb — https://www.math.umd.edu/~slud/s470/BookChaps/01Book.pdf"
    - "Paris, FSU MAP 4176 Test 7 solutions, Problem 3 p.2 (claims acceleration: A^(4) = (1+i)^(3/8) A), sha256:070f205c3e1412009473981e8255dbc903d2c70c0e8ff510b18ac6779afb90a3 — https://www.math.fsu.edu/~paris/MAP4175-6/MAP4176_Test7_Spring2019_Solutions.pdf"
    - "Frees, Actuarial Mathematics (UW-Madison), UDD in the MDT, whole page (1 - q'(j) = (p(tau))^(q(j)/q(tau)), as with constant transition forces), sha256:2560cb6b7c35a907d3bd7f66f7dc279554f4073edee075230f1b4c36ae5ddca5 — https://users.ssc.wisc.edu/~ewfrees/actuarial-mathematics/multiple-decrement-models/6-building-mult-decrement-tables-from-associated-single-life-functions/2-udd-in-the-mdt/"
    - "Frees, Actuarial Mathematics (UW-Madison), UDD in the Single Decrement Models, whole page (n = 2: q(1) = q'(1)(1 - q'(2)/2)), sha256:dd883e01d0b110a397780002a4817778022458fa690369f3bb3a1f4b22aeeb8d — https://users.ssc.wisc.edu/~ewfrees/actuarial-mathematics/multiple-decrement-models/6-building-mult-decrement-tables-from-associated-single-life-functions/3-udd-in-the-single-decrement-models/"
    - "SOA Tables for Exam FAM (2024-10), Standard Ultimate Life Table pp.20-21; Makeham's law formula p.22, sha256:430c8babdb38ff53ae7ce7d5d1d3bd55c2890eeb9ae96db5015121d1c2f11e17 — https://www.soa.org/globalassets/assets/files/edu/2024/fall/2024-10-exam-fam-tables.pdf"
    - "SOA Exam FAM syllabus, October 2026, Topics 8-10 learning outcomes pp.6-7; Readings p.8 (AMLCR chapters), sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf"
    - "SOA Exam ALTAM syllabus, October 2026, Topic 1 p.2, Topic 3 p.3; Resources p.7 (AMLCR chapters), sha256:44b64a78219337f43387cb52837c7c2ce590ae2b97321d6e8e4e29ab2cd38c5e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-altam-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Fractional Age Assumption.md
---
**A Fractional Age Assumption** fixes how deaths, or other decrements, are spread within each year of age. With it, a [[Life Table|life table]] that gives only $\ell_x$ or $q_x$ at integer ages also yields ${}_sp_x$, ${}_sq_x$ and the force of [[Hazard Rate|mortality]] $\mu_{x+s}$ for $0 < s < 1$. The two in AMLCR Section 3.3 are **uniform distribution of deaths** (UDD) and **constant force of mortality**.

> $$\text{UDD:}\quad {}_sq_x = s\,q_x$$

> $$\text{UDD:}\quad \mu_{x+s} = \frac{q_x}{1 - s\,q_x}$$

> $$\text{Constant force:}\quad {}_sp_x = \left(p_x\right)^s$$

> $$\text{Constant force:}\quad \mu_{x+s} = -\ln p_x$$

- **What UDD means.** $\ell_{x+s}$ is linear in $s$, so the density ${}_sp_x\,\mu_{x+s} = q_x$ is flat over the year. Equivalently, $T_x = K_x + R$, where $R$ is [[Uniform Continuous Distribution|uniform]] on $(0,1)$ and independent of the curtate lifetime $K_x$. This gives $\mathring{e}_x = e_x + \tfrac12$. Under a constant force, $\ell_{x+s}$ is exponential in $s$ and $\mu$ is flat within the year.
- **Within a year, not from age $x$.** For $0 \le t < t+s \le 1$, UDD gives ${}_sq_{x+t} = s\,q_x/(1 - t\,q_x)$, while a constant force gives ${}_sp_{x+t} = (p_x)^s$. Across an integer age, split the period and multiply the pieces.
- **Insurance values (FAM).** Under UDD, $\bar{A}_x = \tfrac{i}{\delta}A_x$ and $A^{(m)}_x = \tfrac{i}{i^{(m)}}A_x$. The claims acceleration approximation $\bar{A}_x \approx (1+i)^{1/2}A_x$ assumes instead that deaths are paid, on average, half a year early.
- **Multiple decrements (ALTAM).** UDD in the multiple decrement table, or constant forces, gives $p'^{(j)}_x = \left(p^{(\tau)}_x\right)^{q^{(j)}_x/q^{(\tau)}_x}$. UDD in each single decrement table instead gives, for two decrements, $q^{(1)}_x = q'^{(1)}_x\left(1 - \tfrac12 q'^{(2)}_x\right)$.

> [!example]- Survival Across a Birthday {Example}
> Given $q_{60} = 0.02$ and $q_{61} = 0.025$, find ${}_{0.75}q_{60.5}$ under UDD and under a constant force of mortality.
>
> > [!answer]-
> > Split at age 61: ${}_{0.75}p_{60.5} = {}_{0.5}p_{60.5}\cdot{}_{0.25}p_{61}$.
> > $$
> > \begin{align*}
> > \text{UDD:}\ {}_{0.75}p_{60.5} &= \frac{p_{60}}{1 - 0.5\,q_{60}}\left(1 - 0.25\,q_{61}\right) \\
> > &= \frac{0.98}{0.99}(0.99375) \\
> > &= 0.983712 \\
> > \text{Constant force:}\ {}_{0.75}p_{60.5} &= (0.98)^{0.5}(0.975)^{0.25} \\
> > &= 0.983703
> > \end{align*}
> > $$
> > So ${}_{0.75}q_{60.5} = 0.016288$ under UDD and $0.016297$ under a constant force. When $q$ is small the two assumptions agree to about five decimals.

> [!example]- From Annual to Continuous Insurance Values {Example}
> On the SULT at $i = 5\%$, $A_{50} = 0.18931$. Find $\bar{A}_{50}$ under UDD and by claims acceleration, and find $A^{(12)}_{50}$ under UDD.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \bar{A}_{50} &= \frac{i}{\delta}A_{50} \\
> > &= \frac{0.05}{\ln 1.05}(0.18931) \\
> > &= 1.024797(0.18931) \\
> > &= 0.19400 \\
> > \bar{A}_{50} &\approx (1.05)^{1/2}(0.18931) \\
> > &= 0.19399 \\
> > A^{(12)}_{50} &= \frac{0.05}{0.048889}(0.18931) \\
> > &= 0.19361
> > \end{align*}
> > $$
> > Paying at the moment of death raises the value by about $2.5\%$. Monthly payment raises it by a little less.

> [!example]- Deconstructing a Multiple Decrement Table {Example}
> A two-decrement model has $q^{(1)}_x = 0.03$ (death) and $q^{(2)}_x = 0.12$ (withdrawal). Assuming UDD in the multiple decrement table, find the associated single decrement rates $q'^{(1)}_x$ and $q'^{(2)}_x$.
>
> > [!answer]-
> > $q^{(\tau)}_x = 0.15$, so $p^{(\tau)}_x = 0.85$.
> > $$
> > \begin{align*}
> > p'^{(1)}_x &= (0.85)^{0.03/0.15} \\
> > &= 0.968019 \\
> > p'^{(2)}_x &= (0.85)^{0.12/0.15} \\
> > &= 0.878082
> > \end{align*}
> > $$
> > So $q'^{(1)}_x = 0.03198$ and $q'^{(2)}_x = 0.12192$, and $p'^{(1)}_x\,p'^{(2)}_x = 0.85$. Each independent rate is higher than its dependent rate. With withdrawal removed, more lives remain exposed to death, and the reverse holds for withdrawal.

> [!tip]- How it appears on the exam
> - **FAM** gives a life table at integer ages and asks for a probability, $\mu_{x+s}$, or the complete expectation $\mathring{e}_x$ or ${}_n\mathring{e}_x$ at a fractional age or duration. The question states which assumption to use.
> - **FAM** converts annual insurance values to continuous or $m$-thly ones with $i/\delta$ or $i/i^{(m)}$ under UDD, or with claims acceleration. These are then used in a premium or variance calculation.
> - **ALTAM** builds a multiple decrement table from single decrement rates, or recovers them from it, under UDD in the multiple decrement table or in the single decrement tables. The table then feeds a premium, policy value or pension valuation.

> [!warning]- Exam traps
> - **${}_sq_{x+t} \neq s\,q_x$.** Under UDD the denominator is $1 - t\,q_x$. Dropping it understates the probability slightly, which matters when the answer choices are close.
> - **Mixing the assumptions.** $(p_x)^s$ is the constant-force answer, while $1 - s\,q_x$ is UDD. A question that says UDD and is worked with exponents lands on the neighbouring choice.
> - **Annuities do not convert like insurance.** $\bar{a}_x = (1 - \bar{A}_x)/\delta$ must be built from the converted $\bar{A}_x$. Multiplying $\ddot{a}_x$ by $i/\delta$ is wrong.
> - **Two kinds of multiple decrement UDD.** UDD in the multiple decrement table, or constant forces, uses the power formula. UDD in each single decrement table uses $q'^{(1)}\left(1 - \tfrac12 q'^{(2)}\right)$. They give different tables.
