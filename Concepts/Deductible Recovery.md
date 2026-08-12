**Deductible Recovery** is the amount an insurer bills back to a policyholder for claim payments it advanced within that policyholder's deductible. It arises in **large-deductible programmes**, where the insurer pays claims in full — for statutory, licensing and claims-control reasons — and then reimburses itself from the insured.

> $$\text{Recovery} = \min\!\left(X,\; d\right) \text{ per occurrence}$$

> $$\text{Net Loss} = \text{Gross Paid} - \text{Collected Recoveries}$$

- Economically a large deductible resembles a [[Self-Insured Retention|self-insured retention]], but the mechanics differ: under an SIR the insured pays its own claims and the insurer's limit sits above the retention; under a large deductible the insurer pays ground-up and collects afterwards.
- That difference creates **credit risk**. The insurer has already paid the claimant; if the insured becomes insolvent before reimbursing, the shortfall is a retained loss. Programmes are therefore collateralized — letters of credit, trusts, surety — sized off the actuarial estimate of unpaid recoveries.
- Recoveries must be **estimated and developed on their own**, like [[Salvage and Subrogation|salvage and subrogation]]: billing lags payment, and the recovery pattern is a function of the deductible level and the size-of-loss distribution, not of the loss pattern.
- The insurer reserves **gross** and carries the expected recoveries as an offsetting asset, discounted for expected uncollectibility. Reporting net without disclosing the gross figure hides the credit exposure.
- Because the deductible erodes with [[Inflation|inflation]], the recoverable share of a growing loss falls over time — the same leverage that affects [[Deductible Rating|deductible pricing]], working here on the balance sheet.

![[Media/Figures/Deductible_Recovery.svg|340]]

> [!example]- Recovery on a Single Claim {Example}
> A workers compensation policy carries a $\$250{,}000$ per-occurrence deductible. The insurer pays a $\$400{,}000$ claim in full and bills the insured.
>
> State the gross loss, the recovery and the net loss, and the effect if the insured pays only $\$200{,}000$ before failing.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Gross paid} &= \$400{,}000 \\
> > \text{Recovery due} &= \min(\$400{,}000,\; \$250{,}000) = \$250{,}000 \\
> > \text{Net loss} &= \$150{,}000
> > \end{align*}$$
> >
> > If only $\$200{,}000$ is collected:
> >
> > $$\text{Net loss} = \$400{,}000 - \$200{,}000 = \$200{,}000$$
> >
> > The $\$50{,}000$ shortfall is written off as uncollectible. Note that the insurer's *underwriting* result on this account was never intended to include the deductible layer at all — the whole $\$50{,}000$ is credit loss, not claim experience, and the collateral held against the programme is what is supposed to prevent it.

> [!example]- Reserving a Large-Deductible Programme {Example}
> A programme has projected gross ultimate losses of $\$40{,}000{,}000$ and gross paid to date of $\$22{,}000{,}000$. The deductible structure has historically recovered $62\%$ of gross losses. Recoveries collected to date are $\$12{,}800{,}000$. Two insureds representing $8\%$ of outstanding recoveries are in financial distress, with collateral covering half their exposure.
>
> State the unpaid claim position.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Gross unpaid} &= \$40{,}000{,}000 - \$22{,}000{,}000 \\
> > &= \$18{,}000{,}000 \\[6pt]
> > \text{Ultimate recoveries} &= 0.62 \times \$40{,}000{,}000 \\
> > &= \$24{,}800{,}000 \\[4pt]
> > \text{Unbilled / uncollected recoveries} &= \$24{,}800{,}000 - \$12{,}800{,}000 \\
> > &= \$12{,}000{,}000
> > \end{align*}$$
> >
> > Provision for uncollectibility — $8\%$ at risk, half collateralized:
> >
> > $$\$12{,}000{,}000 \times 0.08 \times 0.50 = \$480{,}000$$
> >
> > $$\begin{align*}
> > \text{Net unpaid} &= \$18{,}000{,}000 - \$12{,}000{,}000 + \$480{,}000 \\
> > &= \$6{,}480{,}000
> > \end{align*}$$
> >
> > Three separate estimates sit inside that figure — the gross ultimate, the recovery ratio, and the collectability provision — and only the first is a conventional reserving exercise. The second depends on the size-of-loss distribution against the deductible, and the third is a credit judgment. An actuary reporting only the $\$6.48$M net figure has compressed all three into a number whose largest uncertainty is not actuarial.
