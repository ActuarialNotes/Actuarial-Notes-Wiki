---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:2015b36a8c55433633d43dc4241c4bf70da4d69b380e21ba3b56fa8e950f354e
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
  - **Sidecars** — special purpose reinsurers formed by a (re)insurer to take a [[Quota Share|quota share]] of a defined book for a year or two, funded by outside investors. Quick and cheap to set up, they multiplied after the 2005 hurricanes, when reinsurance capacity was scarce.
  - **Industry loss warranties** (ILWs) — pay a fixed limit if an industry loss index exceeds a trigger. Written as reinsurance they add a second, low trigger on the buyer's own loss, which supplies the indemnity; written as a swap they carry the index trigger alone.
  - **Collateralised reinsurance** — an ordinary reinsurance contract, often [[Excess of Loss|excess of loss]], written by an investor-backed vehicle that posts the full limit as collateral in a trust: cat-bond economics without a security, a rating or an offering.
  - **Other risk-linked instruments** — catastrophe risk swaps between insurers exposed to different perils, contingent capital such as a catastrophe equity put (the right to issue preferred shares at a pre-set price after a catastrophe), and life-side deals covering extreme mortality. Exchange-traded catastrophe options and futures were tried in the 1990s and failed for lack of liquidity.
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
> > - (c) Own-loss trigger missed: **nothing**. The same contract written as a swap would pay $\$50$ million.
> >
> > The ILW is cheap, standardised protection against a *market-wide* event. The low own-loss trigger is what makes it indemnity — and so reinsurance — while the swap form can be bought by anyone, with or without an insured loss.
