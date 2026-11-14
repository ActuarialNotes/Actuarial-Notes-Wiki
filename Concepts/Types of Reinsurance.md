---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:bb361dc9bb13b60f8e039ca298012c0689271cf635492beb72020b20063b16d2
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
The **Types of Reinsurance** are classified on two independent axes. By how the cover is **placed**, it is [[Treaty Reinsurance|treaty]] (a whole portfolio, ceded automatically) or [[Facultative Reinsurance|facultative]] (one risk, underwritten on its own). By how losses are **shared**, it is *proportional* (the reinsurer takes the same share of premium and of loss) or *non-proportional* (the reinsurer pays only the part of a loss above a retention).

| Sharing | Treaty | Facultative |
| --- | --- | --- |
| Proportional | [[Quota Share]], [[Surplus Share]] | Pro rata certificate |
| Non-proportional | [[Excess of Loss]] | Excess certificate |

Order matters too: a surplus share may *inure* to the benefit of a per-risk or catastrophe cover, which then applies to what the cedant has left after it.

## Quota share

A quota share cedes the same percentage $a$ of every policy, so the ceded part of a loss $X$ is

> $$\text{Ceded}_{\text{QS}} = a\,X$$

Proportional covers pay the cedant a ceding commission for its expenses.

## Surplus share

A surplus share cedes a percentage that rises with the risk's size. On a risk of insured value $V$, with a retained line $R$ and $N$ lines of capacity, the ceded part of a loss $X$ is

> $$\text{Ceded}_{\text{SS}} = \frac{\min\left(\max(V - R,\,0),\; N R\right)}{V}\,X$$

## Excess of loss

Excess of loss applies per risk or per occurrence. Per-occurrence covers include casualty, with its high [[Clash Cover|clash]] layers, and property [[Catastrophe Loss|catastrophe]]. A layer of limit $L$ excess of a retention $R$ cedes, on each loss $X$,

> $$\text{Ceded}_{\text{XS}} = \min\left(\max(X - R,\,0),\; L\right)$$

> [!example]- What does each treaty cede on this fire loss, and on a smaller one? {Example}
> A commercial property with insured value $\$2{,}000{,}000$ suffers a fire loss of $\$600{,}000$. Compare the cessions on it, and on a loss of $\$100{,}000$, under:
>
> 1. a $30\%$ quota share;
> 2. a surplus share with a $\$250{,}000$ line and $6$ lines;
> 3. a $\$750{,}000$ xs $\$250{,}000$ per-risk excess.
>
> > [!answer]-
> > - The surplus share's capacity is $6 \times \$250\text{K} = \$1{,}500\text{K}$, so it cedes $\min(2{,}000 - 250,\ 1{,}500)/2{,}000 = 75\%$ of this risk.
> > - The cedant keeps $25\%$: its $12.5\%$ line plus the $12.5\%$ of value above the treaty's capacity.
> > - On $\$600$K the quota share cedes $\$180$K and the surplus share $0.75 \times \$600\text{K} = \$450\text{K}$.
> > - Excess: $\min(\max(600 - 250, 0), 750) = \$350\text{K}$.
> > - On $\$100$K the quota share cedes $\$30$K, the surplus share $\$75$K and the excess $\$0$.
> > - Only the excess treaty cedes nothing below $\$250{,}000$.

## Aggregate excess of loss

Aggregate excess of loss is a stop loss, or an aggregate deductible on a layer. With an aggregate loss $S$ for the period, an aggregate retention $A$ and an aggregate limit $L_A$, it cedes

> $$\text{Ceded}_{\text{Agg}} = \min\left(\max(S - A,\,0),\; L_A\right)$$

## Functions of reinsurance

Reinsurance gives the cedant:

1. capacity to write larger risks than surplus supports;
2. stabilisation of results;
3. catastrophe protection;
4. surplus relief, since a proportional cession's ceding commission recovers acquisition cost on the unearned premium;
5. access to the reinsurer's underwriting expertise;
6. a way out of a line.

> [!example]- Which type of reinsurance suits each of these cedants? {Example}
> 1. A fast-growing regional insurer whose premium-to-surplus ratio is above its target.
> 2. A commercial property writer with a few very large buildings in a book of small ones.
> 3. A coastal homeowners writer whose modelled 1-in-250 hurricane loss exceeds its risk tolerance.
> 4. A writer worried about a year of many medium-sized losses, none large enough to reach a per-risk layer.
> 5. An insurer asked to write one unusual chemical plant that its treaties exclude.
>
> > [!answer]-
> > - (1) A quota share cedes premium and unearned premium, and its ceding commission recovers the acquisition cost already paid, so surplus rises.
> > - (2) A surplus share cedes a large percentage of the large risks and none of the small ones, which evens out the net amount at risk per building. A per-risk excess also works.
> > - (3) A catastrophe excess of loss per occurrence, sized to the modelled loss, with [[Reinstatements|reinstatements]] so a second event is also covered.
> > - (4) An aggregate excess of loss responds to the year's total. Its attachment must be reachable, or the contract fails risk transfer.
> > - (5) A facultative cover, pro rata or excess, is underwritten by the reinsurer on that plant alone.

## Pricing by type

Proportional contracts are priced as a loss ratio on ceded premium. Excess contracts are priced as a [[Loss Cost|loss cost]] on subject premium, from experience and exposure rating. Aggregate contracts need the full aggregate loss distribution. [[Reinsurance Contract Provisions]] then change the result in [[Reinsurance Pricing|reinsurance pricing]].

## Reserves and statements by type

Proportional cessions scale with gross and develop like it. Excess cessions carry little premium but sit on large, late-reported claims. So actuaries typically select development patterns and expected loss ratios gross and net of reinsurance and take ceded as the difference, in [[Reinsurance Reserving|reinsurance reserving]].

In Canada, under [[IFRS 17]], every type is a [[Reinsurance Contracts Held|reinsurance contract held]], recognized and presented separately from the underlying contracts rather than netted against gross. A commission that does not depend on claims reduces the premium paid. One contingent on claims (a sliding scale or profit commission) is treated as part of the claims expected to be recovered. [[MCT]] credit depends on [[Registered Reinsurance|registered]] or [[Unregistered Reinsurance|unregistered]] status. A structure that fails [[Risk Transfer|risk transfer]] is [[Deposit Accounting|deposit-accounted]].

> [!trap] Treating surplus share as excess insurance
> Surplus share is proportional. Once the risk's share is fixed by its size, the reinsurer pays that share of every loss on it, however small. On the $\$100$K loss above it cedes $\$75$K, where the excess treaty cedes nothing.
