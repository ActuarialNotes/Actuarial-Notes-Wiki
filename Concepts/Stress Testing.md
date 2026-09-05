---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:203f6e7a506f7265268c2aba7d1f8d5e6bdd9df3133f13d962a263f1248f1eb0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Stress Testing.md
---

**Stress Testing** is the examination of an insurer's financial position under severe but plausible adverse conditions. It is the general technique underlying [[FCT]] and [[ORSA]], and [[OSFI]] expects it to be embedded in risk management rather than performed once a year for a report.

- **Sensitivity test** — move one variable and observe the effect (a $100$ basis point rate change, a $10\%$ reserve deterioration). Useful for identifying which assumptions matter, and for calibrating attention.
- **Scenario test** — move a coherent set of variables together in a way that could actually happen: a recession raising claim frequency and fraud while depressing asset values and premium volume. Scenarios are harder to build and far more informative, because real adversity is correlated.
- **[[Reverse Stress Testing|Reverse stress test]]** — start from failure and work backwards: what would have to happen for this insurer to become non-viable? It surfaces vulnerabilities that forward scenarios, anchored on the risks management already worries about, systematically miss.
- **Severity calibration is the hard judgement.** A test too mild reveals nothing; one too extreme is dismissed as implausible and ignored. The standard is *severe but plausible*, and the calibration should be documented — usually by reference to historical events, industry experience, or a stated return period.
- **[[Ripple Effect|Ripple effects]] and management actions** must both be modelled: the scenario's second-order consequences, and the realistic responses available. Assuming management can raise capital in the middle of the scenario that caused the problem is the classic way to make a stress test useless.
- **The output must reach a decision.** A stress test that produces a report and no change to limits, reinsurance, capital targets or the business plan has not been used. OSFI's supervisory reviews look for the link between test results and action.

> [!example]- Sensitivity, Scenario and Reverse {Example}
> An insurer wants to understand its exposure to an economic downturn. Design one test of each type and explain what each reveals.
>
> > [!answer]-
> > **Sensitivity test.** Reduce equity values by $25\%$, holding everything else constant. Result: capital available falls by the equity holding times $25\%$ times $(1-t)$; the MCT ratio falls accordingly.
> >
> > *What it reveals:* how much of the capital ratio depends on equity values. Clean, quick, and it tells management whether equities are worth further attention. *What it misses:* everything else that happens in a downturn.
> >
> > **Scenario test.** A recession over two years: equities $-25\%$; credit spreads widen, so corporate bond values fall and one holding defaults; claim frequency rises $6\%$ in commercial lines and fraud indicators rise in personal auto; premium volume falls $8\%$ as insureds reduce coverage; and reserve development turns adverse as claimants pursue larger settlements.
> >
> > *What it reveals:* the **correlation**. Each element alone is survivable; together they attack capital available (investment losses, underwriting losses) and the [[Base Solvency Buffer]] (adverse development raising liabilities) simultaneously. This is where the [[Diversification Credit]] assumption gets tested, and it is the test that changes decisions.
> >
> > **Reverse stress test.** Ask: what combination would take the MCT ratio below $100\%$? Suppose the answer is a $1$-in-$250$ catastrophe combined with the failure of the insurer's largest reinsurer.
> >
> > *What it reveals:* the actual failure mode — which turns out to be **reinsurer concentration**, not investment risk at all. Forward scenarios built around market and underwriting risk would never have found it, because nobody was worried about the reinsurer.
> >
> > **The lesson.** The three are complements, not substitutes. Sensitivities size individual exposures, scenarios test correlation, and the reverse test finds the vulnerability management has not thought of — which is usually the one that matters.
