---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:228623356f46e7c84efedf831c0377f5e169c2956105267343bd0a411b6ceb4f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Reverse Stress Testing.md
---

**Reverse Stress Testing** starts from failure and works backwards: instead of asking "what happens if X occurs?", it asks **"what would have to occur for this insurer to become non-viable?"** It is a required element of [[FCT]] and a standard tool in [[ORSA]], and its value is that it finds vulnerabilities that forward scenarios — anchored on the risks management already has in mind — systematically miss.

- **Non-viability, not merely a bad year.** The endpoint is the point at which the business model fails: capital below the minimum, an inability to meet obligations, or a loss of market access from which the insurer cannot recover.
- **Why it finds different things.** Forward [[Stress Testing|stress tests]] test the risks management chose to test. A reverse test starts from an outcome and searches over all combinations that could produce it, so it surfaces the exposure nobody was watching — a single reinsurer, a single distribution channel, a single jurisdiction's regulatory decision.
- **The output is a description of failure modes**, and it is qualitative as much as quantitative. Naming the combination is often more valuable than pricing its probability, because the response — a limit, a diversification requirement, a contingency plan — follows from the naming.
- **Plausibility is assessed afterwards.** The exercise deliberately does not begin with a probability constraint; a scenario is first identified as a failure mode and then judged for how plausible it is. Filtering for plausibility first defeats the purpose.
- **It feeds the [[Internal Target Capital Ratio|internal target]] and the recovery plan.** If the identified failure mode is credible, the insurer must either hold capital against it, reduce the exposure that creates it, or have a documented plan for responding to it.
- The technique is used across financial regulation — banking supervisors and [[Solvency II]] both require it — and the Canadian application is through FCT's requirement that the actuary consider what would render the insurer non-viable.

> [!example]- Working Backwards From Failure {Example}
> An insurer with a $185\%$ MCT ratio, capital available of $\$370$ million and a base solvency buffer of $\$200$ million asks what would make it non-viable.
>
> Conduct the reverse stress test.
>
> > [!answer]-
> > **The target.** Non-viability requires the ratio below $100\%$, so capital available below $\$200$ million — a loss of **$\$170$ million after tax**, or roughly $\$233$ million pre-tax. (The buffer would also move, generally upward in stress, so this is conservative in the insurer's favour.)
> >
> > **What combinations reach $\$233$ million?**
> >
> > - **Catastrophe plus reinsurer failure.** A $1$-in-$250$ event costing $\$310$ million gross, with $\$270$ million reinsured — of which $60\%$ sits with one reinsurer who fails. Retained: $\$40$M plus $\$162$M uncollected $= \$202$M, plus reinstatement costs. **Close to sufficient on its own.**
> > - **Reserve deterioration plus rate suppression.** A $12\%$ deficiency on $\$900$ million of liabilities is $\$108$ million, and three years of suppressed rates at a $107\%$ combined ratio on $\$500$ million of premium adds roughly $\$105$ million. **Together, sufficient.**
> > - **Investment collapse alone.** With a bond-dominated portfolio, reaching $\$233$ million requires a market event more severe than $2008$. **Not sufficient alone** — which is itself a useful finding.
> >
> > **What the exercise reveals.** The failure modes are **reinsurer concentration** and **the combination of reserve error with rate suppression** — neither of which is the risk an investment committee spends its time on, and the first of which the [[MCT]] does not charge for at all.
> >
> > **The actions that follow:**
> >
> > - Cap any single reinsurer's share of the catastrophe programme, and require collateral or [[Registered Reinsurance|registered]] status.
> > - Set the [[Internal Target Capital Ratio|internal target]] above the level implied by the second combination, not merely above the supervisory target.
> > - Build the first combination into the [[FCT]] adverse scenarios so it is tested annually rather than once.
> >
> > **The general point:** the reverse test converted an abstract $185\%$ ratio into two named, addressable exposures. That translation is what makes it worth doing.
