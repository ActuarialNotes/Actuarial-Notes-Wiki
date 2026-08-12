**Cumulative Development Factor** (CDF, or age-to-ultimate factor) is the product of all selected [[Age to Age Factor|age-to-age factors]] from a given maturity through to ultimate, including the [[Tail Factor|tail]].

> $$\text{CDF}_{n \to \text{ult}} = \left(\prod_{k \ge n} f_{k \to k+1}\right) \times \text{Tail}$$

> $$\text{Ultimate} = C_n \times \text{CDF}_{n \to \text{ult}}$$

- The reciprocal is the **percentage reported** (or paid): $p_n = 1/\text{CDF}_n$, and $1 - p_n$ is the percentage unreported. These are the quantities the [[Bornhuetter-Ferguson Method|BF]], [[Cape Cod Method|Cape Cod]] and [[Benktander Method|Benktander]] methods actually use — the CDF and the emergence pattern are the same information in two forms.
- CDFs are built **backwards from the tail**: start with the tail factor, multiply in each successive age-to-age factor moving toward younger ages. They decrease monotonically with maturity.
- The CDF measures **leverage**. At a CDF of $4$, a dollar of distortion on the diagonal becomes four dollars of ultimate — which is why the chain ladder is unreliable at immature ages in [[Long Tail Lines|long-tail lines]] and why methods that develop only the *unreported* portion are preferred there.
- A CDF is specific to the triangle it came from: paid CDFs differ from reported CDFs, count CDFs from dollar CDFs, and a CDF built on data capped at a retention differs from a gross one. Borrowing across bases is a common and consequential error.
- Sensitivity to the tail rises sharply with the length of the tail: for a short-tail line the tail is a rounding difference, for a long-tail line it can be the largest single assumption in the analysis.

![[Media/Figures/Cumulative_Development_Factor.svg|340]]

> [!example]- Building CDFs and Reading the Emergence Pattern {Example}
> Selected factors: $f_{12\text{–}24} = 1.500$, $f_{24\text{–}36} = 1.200$, $f_{36\text{–}48} = 1.050$, tail $= 1.020$.
>
> Build the CDF table and the implied emergence pattern.
>
> > [!answer]-
> > Working backwards from the tail:
> >
> > $$\begin{align*}
> > \text{CDF}_{48} &= 1.020 \\
> > \text{CDF}_{36} &= 1.050 \times 1.020 = 1.071 \\
> > \text{CDF}_{24} &= 1.200 \times 1.071 = 1.285 \\
> > \text{CDF}_{12} &= 1.500 \times 1.285 = 1.928
> > \end{align*}$$
> >
> > | Age | CDF | $\%$ reported | $\%$ unreported |
> > |---|---|---|---|
> > | $12$ | $1.928$ | $51.9\%$ | $48.1\%$ |
> > | $24$ | $1.285$ | $77.8\%$ | $22.2\%$ |
> > | $36$ | $1.071$ | $93.4\%$ | $6.6\%$ |
> > | $48$ | $1.020$ | $98.0\%$ | $2.0\%$ |
> >
> > An accident year with $\$600{,}000$ reported at $12$ months has an ultimate of
> >
> > $$\$600{,}000 \times 1.928 = \$1{,}156{,}800$$
> >
> > of which $48.1\%$ — $\$556{,}800$ — is IBNR. Nearly half the estimate is an assumption at that maturity.

> [!example]- Paid and Reported CDFs Must Reconcile {Example}
> For the same accident year at $24$ months: paid $\$1{,}800{,}000$ with a paid CDF of $2.40$; reported $\$3{,}150{,}000$ with a reported CDF of $1.30$.
>
> Compare the estimates and diagnose.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Ultimate}_{\text{paid}} &= \$1{,}800{,}000 \times 2.40 = \$4{,}320{,}000 \\
> > \text{Ultimate}_{\text{reported}} &= \$3{,}150{,}000 \times 1.30 = \$4{,}095{,}000
> > \end{align*}$$
> >
> > A $5.5\%$ gap, with paid running higher. Both estimates rest on the *same* underlying claims, so the difference is information about the diagonal, not about the ultimate.
> >
> > Implied case reserves are $\$3{,}150{,}000 - \$1{,}800{,}000 = \$1{,}350{,}000$. The paid method says total future payments will be $\$2{,}520{,}000$; the reported method says $\$2{,}295{,}000$. The reported method is therefore implicitly claiming that case reserves plus a modest IBNR will cover the run-off, while the paid method — which knows nothing about case reserves — projects more.
> >
> > The reconciliation to perform: check whether **case adequacy has weakened** (which would make the reported figure too low and the paid method right), or whether **settlement has accelerated** (which would inflate the paid diagonal and make the paid method too high). The [[Claim Count Triangle|closure rate]] and average case outstanding decide between them; the gap itself does not.
