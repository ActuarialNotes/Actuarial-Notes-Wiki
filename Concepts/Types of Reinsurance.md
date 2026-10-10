---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:cc1bceafb81594756b1fccda9a34cafbc54fbf4103cf5141f47c1b79e44d8734
  sources:
    - "Clark, Basics of Reinsurance Pricing (CAS study note, rev. 2014), §1A pp.3–4, §1B pp.9–12, §2A pp.14–15, casualty layers pp.22–23, 27, sha256:1c4429fee538cc8d90157c1849ca689a3a2173a2670fc57f212d866b493e2c63 — https://www.casact.org/sites/default/files/2021-03/8_Clark.pdf"
    - "IRMI glossary, 'treaty reinsurance', sha256:2ea6c4c63cd94dae4d5233cc2c30dd2524e3f201e938cebb96b290b1170b1cca — https://www.irmi.com/term/insurance-definitions/treaty-reinsurance"
    - "IRMI glossary, 'facultative reinsurance', sha256:35c79f8facd9aa07f36a730f73ab5f787ee1eb89c17d9385eb087734baeb822d — https://www.irmi.com/term/insurance-definitions/facultative-reinsurance"
    - "Myers, Reinsurance Overview (NAMIC Directors' Education, 9 May 2017), slides pp.6–17 (functions, types, facultative uses, pro rata, per-risk/cat XOL, types of reinsurers, marketing), sha256:c8c7fe0c3bbd0f5d327147142f007ff9d13af260c71da725eb9973a0700121a4 — https://www.namic.org/pdf/reinsuranceRe/17dbc_ReinsuranceOverview.pdf"
    - "Friedland, Reserving for Reinsurance (CAS Exam 7 study note), Ch.3 printed pp.48-49: unpaid losses estimated gross, ceded and net; patterns and ELRs typically selected gross and net, sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf"
    - "IFRS Foundation, TRG for IFRS 17 Agenda Paper 03 (Sept 2018), 'Commissions and reinstatement premiums in reinsurance contracts issued', pp.4-5 quoting IFRS 17 para 86(a)-(c), sha256:995b2ccc6c0855f9517951014794a83aa3ae689be96a3541af7ad140ba58e914 — https://www.ifrs.org/-/media/feature/meetings/2018/september/trg-insurance/ap03.pdf"
    - "CIA Educational Note 225060, IFRS 17 – Actuarial Considerations Related to Reinsurance Contracts Issued and Held (17 Jun 2025), intro (reinsurance contracts held recognized and presented separately from underlying contracts, IFRS 17.78 and 17.82) and commission/offset discussion pp.15-17, sha256:ce688039c5e2007481b5c2a36788b7b3ff885423c8798ddd8f93e66ae1a08a19 — https://www.cia-ica.ca/app/themes/wicket/custom/dl_file.php?p=610928&fid=610931"
    - "OSFI, Minimum Capital Test Guideline 2025 (effective 1 Jan 2026): unsecured unregistered reinsurance recoverables deducted from capital available; reinsurance contracts held assets by registered/unregistered status, sha256:80450516aa1bb0a7534ceedcf50e39966406ecdcd52d0109af4a94d3439959ce — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2025"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Types of Reinsurance.md
---

**Types of Reinsurance** are classified on two independent axes: how the cover is **placed** — [[Treaty Reinsurance|treaty]] (a whole portfolio, ceded automatically) or [[Facultative Reinsurance|facultative]] (one risk, underwritten on its own) — and how losses are **shared** — *proportional* (the reinsurer takes the same share of premium and of loss) or *non-proportional* (the reinsurer pays only the part of a loss above a retention).

> $$\text{Ceded}_{\text{QS}} = a\,X$$

> $$\text{Ceded}_{\text{SS}} = \frac{\min\left(\max(V - R,\,0),\; N R\right)}{V}\,X$$

> $$\text{Ceded}_{\text{XS}} = \min\left(\max(X - R,\,0),\; L\right)$$

> $$\text{Ceded}_{\text{Agg}} = \min\left(\max(S - A,\,0),\; L_A\right)$$

- $X$ is one loss (on a risk, a policy or an occurrence); $a$ the quota share cession; $V$ the risk's insured value; $R$ the retention (the retained *line* for surplus share); $N$ the number of lines; $L$ the layer limit; $S$ the aggregate loss for the period; $A$ and $L_A$ the aggregate retention and limit.
- **Proportional:** [[Quota Share]] (the same percentage of every policy) and [[Surplus Share]] (a percentage that rises with the risk's size), each with a ceding commission for the cedant's expenses. **Non-proportional:** [[Excess of Loss]] per risk, per occurrence (casualty, including high [[Clash Cover|clash]] layers, and property [[Catastrophe Loss|catastrophe]]), and [[Aggregate Excess of Loss]] (stop loss, or an aggregate deductible on a layer).
- **The two axes cross.** A treaty can be quota share, surplus share or excess; a facultative certificate can be pro rata or excess. Order matters too: a surplus share may *inure* to the benefit of a per-risk or catastrophe cover, which then applies to what the cedant has left after it.
- **Function (Exam 7).** Capacity to write larger risks than surplus supports; stabilisation of results; catastrophe protection; surplus relief, since a proportional cession's ceding commission recovers acquisition cost on the unearned premium; access to the reinsurer's underwriting expertise; and a way out of a line.
- **Loss cost (Exam 9).** Proportional contracts are priced as a loss ratio on ceded premium; excess contracts as a [[Loss Cost|loss cost]] on subject premium, from experience and exposure rating; aggregate contracts need the full aggregate loss distribution. [[Reinsurance Contract Provisions]] then change the result — see [[Reinsurance Pricing]].
- **Statements and reserves (Exams 6C, 7).** Proportional cessions scale with gross and develop like it. Excess cessions carry little premium but sit on large, late-reported claims, so actuaries typically select development patterns and expected loss ratios gross and net of reinsurance and take ceded as the difference ([[Reinsurance Reserving]]). In Canada, under [[IFRS 17]], every type is a [[Reinsurance Contracts Held|reinsurance contract held]], recognized and presented separately from the underlying contracts rather than netted against gross. A commission that does not depend on claims reduces the premium paid; one contingent on claims (a sliding scale or profit commission) is treated as part of the claims expected to be recovered. [[MCT]] credit depends on [[Registered Reinsurance|registered]] or [[Unregistered Reinsurance|unregistered]] status. A structure that fails [[Risk Transfer]] is [[Deposit Accounting|deposit-accounted]].

> [!example]- One Fire Loss Under Three Treaty Types {Example}
> A commercial property with insured value $\$2{,}000{,}000$ suffers a fire. Compute the ceded amount for a loss of (i) $\$600{,}000$ and (ii) $\$100{,}000$ under each of: (a) a $30\%$ quota share; (b) a surplus share with a $\$250{,}000$ line and $6$ lines; (c) a $\$750{,}000$ xs $\$250{,}000$ per-risk excess.
>
> > [!answer]-
> > **Surplus share cession** for this risk (capacity $6 \times \$250\text{K} = \$1{,}500\text{K}$):
> >
> > $$
> > \begin{align*}
> > s &= \frac{\min(2{,}000 - 250,\ 1{,}500)}{2{,}000} \\
> > &= \frac{1{,}500}{2{,}000} \\
> > &= 75\%
> > \end{align*}
> > $$
> >
> > **(i) Loss of $\$600{,}000$:**
> >
> > - Quota share: $0.30 \times \$600\text{K} = \$180\text{K}$.
> > - Surplus share: $0.75 \times \$600\text{K} = \$450\text{K}$. The cedant keeps $25\%$ — its $12.5\%$ line plus the $12.5\%$ of value above the treaty's capacity, unless it buys facultative cover for that top slice.
> > - Excess: $\min(\max(600 - 250, 0), 750) = \$350\text{K}$.
> >
> > **(ii) Loss of $\$100{,}000$:**
> >
> > - Quota share: $\$30\text{K}$.
> > - Surplus share: $0.75 \times \$100\text{K} = \$75\text{K}$.
> > - Excess: $\$0$, since the loss is below the retention.
> >
> > The small loss is the telling case: surplus share is **not** excess insurance. Once the risk's share is fixed by its size, the reinsurer pays that share of every loss on it, however small. Only the excess treaty cedes nothing below $\$250{,}000$.

> [!example]- Matching the Type to the Need {Example}
> Recommend a type of reinsurance for each cedant: (1) a fast-growing regional insurer whose premium-to-surplus ratio is above its target; (2) a commercial property writer with a few very large buildings in a book of small ones; (3) a coastal homeowners writer whose modelled 1-in-250 hurricane loss exceeds its risk tolerance; (4) a writer worried about a year of many medium-sized losses, none large enough to reach a per-risk layer; (5) an insurer asked to write one unusual chemical plant that its treaties exclude.
>
> > [!answer]-
> > 1. **Quota share.** It cedes premium and unearned premium, and the ceding commission recovers the acquisition cost already paid, so net premium falls and surplus rises: surplus relief and capacity.
> > 2. **Surplus share** (or a per-risk excess). The surplus share cedes a large percentage of the large risks and none of the small ones, which evens out the net amount at risk per building.
> > 3. **Catastrophe excess of loss** per occurrence, sized to the modelled loss, with [[Reinstatements]] so a second event is also covered.
> > 4. **Aggregate excess of loss** (stop loss), which responds to the year's total. The attachment must be reachable, or the contract fails risk transfer.
> > 5. **Facultative**, pro rata or excess, underwritten by the reinsurer on that plant alone.
