---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:a980d91a0026a31e512c4e1debdf396b820d01a4a34340b94855d9cfd2532492
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance-Linked Securities.md
---

**Insurance-Linked Securities** (ILS) are financial instruments whose value depends on insurance losses — usually catastrophe losses — through which capital-market investors take insurance risk directly rather than through the shares of an insurer or reinsurer. The family covers [[CAT Bonds|cat bonds]], sidecars, industry loss warranties, collateralised reinsurance and related derivatives.

> $$R_{\text{investor}} = r_{\text{collateral}} + s - \ell$$

- $s$ is the premium or spread received and $\ell$ the loss suffered, both as fractions of the capital posted; for a fully collateralised instrument $0 \leq \ell \leq 1$. The expected excess return $s - E[\ell]$ is the price of the risk. Because [[Catastrophe Risk|catastrophe losses]] are nearly independent of financial markets, investors value that return as a diversifier.
- **The main forms:**
  - **Cat bonds** — notes issued by a special purpose reinsurer, tradable among institutional investors, typically multi-year, with indemnity, industry-index, modelled-loss or parametric triggers.
  - **Sidecars** — special purpose vehicles through which a (re)insurer cedes premium and risk on a defined book, for example by a [[Quota Share|quota share]], to outside investors whose funds are held as collateral. They are tactical instruments of limited duration, used in a hard market, and became very popular after Hurricane Katrina.
  - **Industry loss warranties** (ILWs) — pay a fixed limit if an industry loss index exceeds a trigger. Written as reinsurance they add a second trigger on the buyer's own loss, which supplies the indemnity.
  - **Other risk-linked instruments** — contingent capital such as a catastrophe equity put, an option to raise additional equity capital if losses exceed a predetermined level; the instruments have also spread to life insurance and annuities. Exchange-traded catastrophe options, offered on the Chicago Board of Trade from 1995, were among the first attempts, and trading ceased in 1999 for lack of demand.
- **Against traditional [[Reinsurance|reinsurance]]:** collateral replaces a reinsurer's promise, so there is no [[Reinsurance Credit Risk|credit risk]] on the limit; capacity comes from capital markets; and index or parametric triggers trade moral hazard for **basis risk**. Cummins concludes that ILS complement reinsurance rather than replace it. See [[Securitization]] for the economic case.

> [!example]- A Sidecar's Return in Three Years {Example}
> A reinsurer cedes a $40\%$ quota share of its $\$250$ million property-catastrophe book to a sidecar for one year, receiving a $25\%$ ceding commission. Investors fund the sidecar with $\$300$ million held as collateral; its liability is limited to that collateral plus the premium it receives. Ignoring collateral yield, find the investors' return if the book's loss ratio is (a) $30\%$, (b) $250\%$, (c) $400\%$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Sidecar premium} &= 0.40 \times \$250\text{M} \times (1 - 0.25) \\
> > &= \$75\text{M} \\[4pt]
> > \text{Ceded loss} &= 0.40 \times \$250\text{M} \times \text{LR} \\
> > &= \$100\text{M} \times \text{LR}
> > \end{align*}
> > $$
> >
> > - (a) Loss $\$30$M; profit $\$75\text{M} - \$30\text{M} = \$45\text{M}$; return $45/300 = 15.0\%$.
> > - (b) Loss $\$250$M; profit $\$75\text{M} - \$250\text{M} = -\$175\text{M}$; return $-58.3\%$.
> > - (c) Loss $\$400$M exceeds the sidecar's $\$375$M of resources. Investors lose everything ($-100\%$) and the sponsor bears the $\$25$M excess.
> >
> > The sponsor gains capacity and commission income without raising equity; the investors take the sponsor's **underwriting**, not just the hazard, because a quota share passes through its risk selection and pricing. And the cover is limited-recourse: beyond the collateral, the tail comes back to the sponsor.

> [!example]- Industry Loss Warranty: Two Triggers {Example}
> An insurer buys a $\$50$ million ILW in reinsurance form: it pays the full limit if U.S. hurricane industry losses reach $\$30$ billion **and** the buyer's own loss exceeds $\$1$ million. What does it pay if (a) industry losses are $\$34$ billion and the buyer's loss $\$220$ million; (b) industry $\$26$ billion, buyer $\$400$ million; (c) industry $\$34$ billion, buyer nothing?
>
> > [!answer]-
> > - (a) Both triggers met: **$\$50$ million**.
> > - (b) Industry trigger missed: **nothing**, despite a heavy own loss — basis risk.
> > - (c) Own-loss trigger missed: **nothing**.
> >
> > The ILW is standardised protection against a *market-wide* event, with relatively low transaction costs. The own-loss trigger is what makes it indemnity, and regulators treat buying one with that trigger as a reinsurance purchase.
