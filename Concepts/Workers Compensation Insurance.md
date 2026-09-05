---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:15bb97ea11cd121212d0948323320a10d736e0ed7f038107999fe8fb5ed9fe0c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Workers Compensation Insurance.md
---

**Workers Compensation Insurance** in Canada is a compulsory, exclusive, provincially administered [[Social Insurance|social insurance]] program: workers injured on the job receive no-fault medical care, wage replacement and rehabilitation from a provincial board, funded entirely by employer assessments, and in exchange they **give up the right to sue** their employer.

- **The [[Meredith Principles]]** are the foundation: no-fault compensation, collective employer liability, security of payment, exclusive jurisdiction of the board, and an independent board. Candidates should be able to name and explain all five.
- **The historic bargain.** Before workers' compensation, an injured worker had to prove employer negligence and faced three defences (contributory negligence, assumption of risk, the fellow-servant rule) that defeated most claims. The trade is certainty of a limited benefit for the possibility of a full tort recovery.
- **Not written by private insurers** in any province — the boards (WSIB in Ontario, WorkSafeBC, WCB Alberta, CNESST in Quebec) hold a monopoly. This is the largest single difference from the United States, where private carriers write workers' compensation in most states, and it is a standard 6C versus 6U comparison.
- **Funding and rate setting.** Employers are assigned to rate groups by industry and pay an assessment per $\$100$ of insurable payroll, adjusted by [[Experience Rating|experience rating]] so that an employer's own claim record affects its rate. The boards target **full funding** of the liability for benefits already awarded — many spent decades recovering from unfunded positions, and funding ratios are a standing policy issue.
- **Long-tail liabilities.** Permanent disability and survivor benefits are lifetime annuities, so a board's liability behaves like a pension plan's: sensitive to discount rate, mortality and indexation, and valued by actuaries on that basis rather than by triangle methods.
- **Interaction with private insurance.** An employer's general liability policy does not cover employee injury (the board has exclusive jurisdiction), but the board's **subrogation** rights against negligent third parties bring it into ordinary liability claims, and an injured worker's tort claim against a third party is coordinated with board benefits as a [[Collateral Benefits|collateral benefit]].

> [!example]- The Historic Bargain, Priced {Example}
> A worker suffers a permanent partial disability. Under the provincial board they receive lifetime wage-loss benefits with a present value of $\$310{,}000$, paid without proving fault, beginning within weeks. Had they been able to sue and prove employer negligence, a court would have assessed $\$540{,}000$. The worker's chance of proving negligence is assessed at $45\%$, and litigation would take four years.
>
> Evaluate the bargain from the worker's perspective.
>
> > [!answer]-
> > **Expected value of the tort route**, ignoring costs and delay:
> >
> > $$0.45 \times \$540{,}000 = \$243{,}000$$
> >
> > That is already **below** the $\$310{,}000$ certain benefit. Adjusting further:
> >
> > - **Legal costs** of perhaps $25\%$ on a contingency basis reduce the expected recovery to roughly $\$182{,}000$.
> > - **Four years of delay** reduces the present value further, and — decisively for an injured worker with no income — means four years with nothing.
> > - **Variance.** The tort outcome is $\$540{,}000$ with probability $0.45$ and $\$0$ with probability $0.55$. A worker unable to work has no capacity to bear that risk.
> >
> > So the bargain favours this worker substantially, which is why it has survived a century. **Where it does not:** a worker with a clearly negligent employer and a severe injury — high probability of success and a large award — gives up a great deal, and receives a benefit schedule capped well below full compensation. The system deliberately transfers value from the strongest claims to the weakest ones, which is the defining property of [[Social Insurance|social insurance]] rather than a flaw in it.
