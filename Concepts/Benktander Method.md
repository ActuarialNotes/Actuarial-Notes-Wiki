---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-12
  last_checked_by: agent:validate-v1
  content_hash: sha256:b01c4a2c81aebe2c203cd2d6022338a3c9e2501e25882b4f103ec78289d07dc2
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 9 'Bornhuetter-Ferguson Technique' pp.160-163 (PDF pp.166-169), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/database/studynotes_friedland_estimating.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Benktander Method.md
---

**Benktander Method** (Gunnar Benktander, 1976; also called the iterated BF or GB method) runs the [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] calculation a second time, using the **BF ultimate in place of the a priori** expectation. [[Credible Claims Reserves: The Benktander Method (Mack - 2000)|Mack (2000)]] shows the result is a [[Credibility|credibility]] mixture of BF and the [[Chain Ladder Method|chain ladder]], with the percentage developed as the credibility.

> $$U_{\text{GB}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) U_{\text{BF}}$$

> $$U_{\text{GB}} = \tfrac{1}{\text{CDF}} \, U_{\text{CL}} + \left(1 - \tfrac{1}{\text{CDF}}\right) U_{\text{BF}}$$

- **Notation.** $C$ is reported (or paid) losses to date, $p = 1/\text{CDF}$ is the percentage developed, and $q = 1 - p$.
- **Credibility $Z = p$.** The second identity is the useful one. Benktander weights chain ladder against BF with $Z = p$: the more of the year that has emerged, the more the answer leans on the data. The reserve mixes the same way, $R_{\text{GB}} = q\,U_{\text{BF}} = p\,R_{\text{CL}} + q\,R_{\text{BF}}$. That is Hovinen's (1981) reserve, the same method found independently.
- **Against the original a priori.** Expressed against $U_0$, the weight on the chain ladder is $p(2-p) = 1 - q^2$:

> $$U_{\text{GB}} = p(2 - p)\,U_{\text{CL}} + \left[1 - p(2-p)\right] U_{0}$$

- **Iterating further converges to the chain ladder.** Mack proves it (his Theorem 1). Repeating $R = qU$ then $U = C + R$ from $U_0$ gives $U^{(m)} = (1 - q^m)\,U_{\text{CL}} + q^m U_0$. BF is $m = 1$, Benktander is $m = 2$, and the limit is the chain ladder.
- **Mean squared error.** The comparison is Mack's (2000), not Benktander's. His model is $E(C/U \mid U) = p$ and $\text{Var}(C/U \mid U) = pq\,\beta^2(U)$, with $\alpha^2(U) = U^2\beta^2(U)$. The a priori $U_0$ is independent of $C$, with $E(U_0) = E(U)$. The optimal credibility on the chain ladder, $c^*$, depends on a single volatility measure $t$:

> $$t = \frac{E[\alpha^2(U)]}{\text{Var}(U_0) + \text{Var}(U) - E[\alpha^2(U)]}$$
>
> $$c^* = \frac{p}{p + t}$$

- **Which method wins.** GB has a smaller mean squared error than BF if and only if $t < 2 - p$. It beats the chain ladder if and only if $t > pq/(1+p)$. (Of the other two, BF beats the chain ladder if and only if $p < t$.) So GB is best at every maturity unless the payout pattern is extremely volatile or extremely stable. Mack's numerical examples give $t \approx 0.3$, well inside the GB region, and GB's standard error comes close to both the optimal $c^*$ reserve's and an exact Bayesian model's.
- **The ordering is fixed by construction.** Whichever of $U_{\text{CL}}$ and $U_{\text{BF}}$ is larger, $U_{\text{GB}}$ lies between them. The method needs no data beyond what BF already requires.
- **The a priori must stay fixed.** An a priori revised as the year develops is no longer independent of $C$. Mack likens it to choosing an unknown $c$, much less objective than Benktander's $c = p$.

![[Media/Figures/Benktander_Method.svg|340]]

> [!example]- Benktander Between BF and Chain Ladder {Example}
> An accident year has reported losses $C = \$600$, a priori expected losses $U_0 = \$1{,}000$, and $\text{CDF} = 2.000$ (so $p = 50\%$).
>
> Compute the chain ladder, BF and Benktander ultimates.
>
> > [!answer]-
> > $$\begin{align*}
> > U_{\text{CL}} &= \$600 \times 2.000 = \$1{,}200 \\[6pt]
> > U_{\text{BF}} &= \$600 + 0.50 \times \$1{,}000 \\
> > &= \$1{,}100 \\[6pt]
> > U_{\text{GB}} &= \$600 + 0.50 \times \$1{,}100 \\
> > &= \$1{,}150
> > \end{align*}$$
> >
> > Checking against the credibility form:
> >
> > $$0.50(\$1{,}200) + 0.50(\$1{,}100) = \$1{,}150 \;\checkmark$$
> >
> > and against the a priori form, with $p(2-p) = 0.5(1.5) = 0.75$:
> >
> > $$0.75(\$1{,}200) + 0.25(\$1{,}000) = \$1{,}150 \;\checkmark$$
> >
> > Actual emergence is running ahead of the a priori ($\$1{,}200$ chain ladder against a $\$1{,}000$ expectation), so the ordering is $U_0 < U_{\text{BF}} < U_{\text{GB}} < U_{\text{CL}}$. Benktander moves $75\%$ of the way from the a priori to the chain ladder where BF moved only $50\%$.

> [!example]- How the Weighting Shifts With Maturity {Example}
> A line's reported percentages are $30\%$ at $12$ months, $60\%$ at $24$, and $85\%$ at $36$. For each maturity, give the weight Benktander places on the chain ladder relative to the original a priori.
>
> > [!answer]-
> > The chain ladder weight is $p(2-p)$; BF's is $p$:
> >
> > | Maturity | $p$ | BF weight on CL | GB weight on CL |
> > |---|---|---|---|
> > | $12$ mo | $0.30$ | $0.300$ | $0.510$ |
> > | $24$ mo | $0.60$ | $0.600$ | $0.840$ |
> > | $36$ mo | $0.85$ | $0.850$ | $0.978$ |
> >
> > Benktander always gives the data more weight than BF and less than the chain ladder, and the extra weight over BF is largest in the middle. At $12$ months it moves from $30\%$ to $51\%$ reliance on emergence; at $36$ months it is already $98\%$ chain ladder.
> >
> > Whether that extra weight is right is not a question of maturity alone. In Mack (2000) it depends on the line's volatility $t$: GB beats BF whenever $t < 2 - p$, and beats the chain ladder whenever $t > pq/(1+p)$, at any of these ages.

> [!example]- Optimal Credibility and the Mean Squared Errors {Example}
> For one accident year, all as percentages of premium: the a priori ultimate is $U_0 = 75\%$, the payout pattern gives $p = 0.40$, and paid losses are $C = 36\%$. The actuary assesses $\text{Var}(U) = (25\%)^2$, $\text{Var}(U_0) = (10\%)^2$ and $\text{Var}(C/U \mid U) = 0.08^2$, the last not depending on $U$.
>
> Using Mack's (2000) model, find $t$ and $c^*$, the BF, chain ladder, Benktander and optimal reserves, and the standard error of each.
>
> > [!answer]-
> > With $q = 0.60$ and $E(U) = E(U_0) = 75\%$:
> >
> > $$
> > \begin{align*}
> > \beta^2 &= \frac{0.08^2}{0.40 \times 0.60} \\
> > &= 0.026667 \\
> > E[\alpha^2(U)] &= \big(0.25^2 + 0.75^2\big)\beta^2 \\
> > &= 0.625 \times 0.026667 \\
> > &= 0.016667 \\
> > t &= \frac{0.016667}{0.01 + 0.0625 - 0.016667} \\
> > &= 0.2985 \\
> > c^* &= \frac{0.40}{0.40 + 0.2985} \\
> > &= 0.5726
> > \end{align*}
> > $$
> >
> > **Reserves:**
> >
> > $$
> > \begin{align*}
> > R_{\text{BF}} &= 0.60 \times 75\% \\
> > &= 45.0\% \\
> > R_{\text{CL}} &= 0.60 \times 36\%/0.40 \\
> > &= 54.0\% \\
> > R_{\text{GB}} &= 0.40(54.0\%) + 0.60(45.0\%) \\
> > &= 48.6\% \\
> > R_{c^*} &= 0.5726(54.0\%) + 0.4274(45.0\%) \\
> > &= 50.2\%
> > \end{align*}
> > $$
> >
> > **Mean squared errors**, using $\text{mse}(R_c) = E[\alpha^2(U)]\left(\frac{c^2}{p} + \frac{1}{q} + \frac{(1-c)^2}{t}\right)q^2$, which gives BF at $c = 0$ and the chain ladder at $c = 1$:
> >
> > | Reserve | $c$ | mse | Standard error |
> > |---|---|---|---|
> > | BF | $0$ | $0.03010$ | $17.3\%$ |
> > | Chain ladder | $1$ | $0.02500$ | $15.8\%$ |
> > | Benktander | $0.40$ | $0.01964$ | $14.0\%$ |
> > | Optimal | $0.5726$ | $0.01859$ | $13.6\%$ |
> >
> > The conditions agree. $p = 0.40 > t$, so the chain ladder beats BF. $t = 0.30 < 2 - p = 1.6$, so GB beats BF, and $t > pq/(1+p) = 0.171$, so GB beats the chain ladder.
> >
> > Benktander gets within $0.4$ points of the optimal standard error without estimating any variance at all. These are unconditional errors with the payout pattern taken as known; uncertainty in $p$ would add to all four.
