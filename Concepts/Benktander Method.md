---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:f056190d9350f7bb4f214494c5f261e38b09e6ada29cacdcd8f5e2c0c1327a11
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Benktander Method.md
---

**Benktander Method** (Gunnar Benktander, also called the iterated BF or GB method) runs the [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] calculation a second time, using the **BF ultimate in place of the a priori** expectation. The result sits between BF and the [[Chain Ladder Method|chain ladder]].

> $$U_{\text{GB}} = C + \left(1 - \tfrac{1}{\text{CDF}}\right) U_{\text{BF}}$$

> $$U_{\text{GB}} = \tfrac{1}{\text{CDF}} \, U_{\text{CL}} + \left(1 - \tfrac{1}{\text{CDF}}\right) U_{\text{BF}}$$

- $C$ is reported (or paid) losses to date and $p = 1/\text{CDF}$ the percentage reported. The second identity is the useful one: Benktander is a **credibility weighting of chain ladder and BF with $Z = p$** — the more of the year that has emerged, the more the answer leans on the data.
- Expressed against the original a priori $U_0$, the weight on the chain ladder is $p(2-p)$:

> $$U_{\text{GB}} = p(2 - p)\,U_{\text{CL}} + \left[1 - p(2-p)\right] U_{0}$$

- Iterating further converges to the chain ladder. BF is the first iteration ($Z = p$ against the a priori), Benktander the second, and the limit is $Z = 1$.
- Benktander is a **compromise for moderately mature years** — roughly $24$–$48$ months in a medium-tail line — where BF still gives the a priori too much weight and the chain ladder is not yet stable.
- Benktander showed the GB estimator has lower mean squared error than either BF or chain ladder over a wide range of conditions, which is its theoretical claim to preference; it needs no data beyond what BF already requires.
- The ordering is fixed by construction: whichever of $U_{\text{CL}}$ and $U_{\text{BF}}$ is larger, $U_{\text{GB}}$ lies between them.

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
> > Benktander always gives the data more weight than BF, and the gap is widest in the middle. At $12$ months it moves from $30\%$ to $51\%$ reliance on emergence — which is why Benktander is *not* the method of choice at very immature ages: if the a priori is the more reliable estimate there, GB has already conceded half the answer to a thin diagonal.
> >
> > At $36$ months GB is $98\%$ chain ladder, so it adds little over the chain ladder itself. The method earns its keep in between — precisely where neither BF nor chain ladder is clearly right.
