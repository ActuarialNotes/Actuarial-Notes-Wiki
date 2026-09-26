---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:848f5653bcf26278f6a8c6216851ebb9cdc2e8fd823947aa5e584abf075671af
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Credit Rating Migration.md
---

**Credit Rating Migration** models an issuer's movement between credit rating grades over time as a [[Markov Chain]], with default as an absorbing state: a rating transition matrix gives the one-year probability of moving from each grade to every other grade or to default, and its powers give multi-year migration and default probabilities.

> $$P(\text{default within } n \text{ years} \mid \text{rated } i) = P_{iD}^{\,n}$$

> $$\text{Expected credit loss} = \text{Exposure} \times \text{PD} \times \text{LGD}$$

- Rows are the current rating, columns the rating a year later; default $D$ is absorbing, $P_{DD} = 1$. Because $D$ can't be left, being in $D$ at time $n$ means having defaulted by time $n$, so $P^n_{iD}$ is the **cumulative** default probability (PD) and $P^n_{iD} - P^{n-1}_{iD}$ the default probability in year $n$ alone. LGD is the loss given default, the share of exposure not recovered.
- **Migration matters even for a grade with no one-year default risk.** A high-grade bond can default within two years only by first being downgraded; the [[Chapman-Kolmogorov Equations]] pick up that path.
- Credit rating agencies publish historical one-year transition matrices in their default studies; multi-year probabilities come from matrix powers under the Markov assumption.
- **The Markov assumption is an approximation.** Transition rates vary with the credit cycle, so the matrix is not really constant, and recently downgraded issuers tend to be downgraded again (rating momentum), so the next move depends on more than the current grade.
- Actuarial uses: [[Credit Risk]] on an insurer's [[Bonds|bond]] portfolio and [[Reinsurance Credit Risk|reinsurer default risk]] on recoverables. The [[Stationary Distribution]] is of no use here — with default absorbing, all probability eventually ends in $D$ — so the work is over finite horizons.

> [!example]- Two-Year Default Probabilities {Example}
> An insurer's investment team uses the one-year rating matrix
> $$\mathbf{P} = \begin{array}{c|cccc} & A & B & C & D \\ \hline A & 0.90 & 0.08 & 0.02 & 0 \\ B & 0.05 & 0.85 & 0.08 & 0.02 \\ C & 0 & 0.10 & 0.80 & 0.10 \\ D & 0 & 0 & 0 & 1 \end{array}$$
> Find the two-year default probabilities for an A-rated and a B-rated bond, and the B bond's default probability in year 2 alone.
>
> > [!answer]-
> > Condition on the rating after one year:
> >
> > $$
> > \begin{align*}
> > P^2_{AD} &= 0.08(0.02) + 0.02(0.10) \\
> > &= 0.0036 \\
> > P^2_{BD} &= 0.85(0.02) + 0.08(0.10) + 0.02(1) \\
> > &= 0.017 + 0.008 + 0.020 \\
> > &= 0.045
> > \end{align*}
> > $$
> >
> > The B bond's year-2 default probability is $0.045 - 0.020 = 0.025$. The A bond cannot default in one year but has a $0.36\%$ chance within two, entirely through downgrades.

> [!example]- Expected Credit Loss on a Bond Portfolio {Example}
> The insurer holds $\$20$ million of A bonds and $\$10$ million of B bonds. Loss given default is $60\%$. Using the two-year default probabilities above and ignoring timing, find the expected credit loss over two years.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{ECL} &= 0.60\,\big(20{,}000{,}000(0.0036) + 10{,}000{,}000(0.045)\big) \\
> > &= 0.60\,(72{,}000 + 450{,}000) \\
> > &= \$313{,}200
> > \end{align*}
> > $$
> >
> > The B bonds are a third of the exposure but $450/522 = 86\%$ of the expected loss.
