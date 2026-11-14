---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:0e20377c568c501d612ab350ad55b6918f5165bd8ca550d4d2f9ef3e154fd877
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Workers Compensation Insurance.md
---
![[Media/Figures/Workers_Compensation_Insurance.svg|340]]

**Workers Compensation Insurance** in Canada is a compulsory, exclusive, provincially administered [[Social Insurance|social insurance]] program. Workers injured on the job receive no-fault medical care, wage replacement and rehabilitation from a provincial board, funded entirely by employer assessments, and in exchange they give up the right to sue their employer.

The [[Meredith Principles]] are its foundation:

1. No-fault compensation.
2. Collective employer liability.
3. Security of payment.
4. Exclusive jurisdiction of the board.
5. An independent board.

## The historic bargain

Before workers compensation, an injured worker had to prove employer negligence and faced three defences that defeated most claims: contributory negligence, assumption of risk and the fellow-servant rule. The bargain trades the possibility of a full tort recovery for the certainty of a limited benefit.

> [!example]- Does the workers compensation bargain favour this worker? {Example}
> A worker suffers a permanent partial disability. Under the provincial board they receive lifetime wage-loss benefits with a present value of $\$310{,}000$, paid without proving fault and beginning within weeks. Had they been able to sue and prove employer negligence, a court would have assessed $\$540{,}000$. The worker's chance of proving negligence is $45\%$, and litigation would take four years.
>
> > [!answer]-
> > - The expected value of the tort route, ignoring costs and delay, is $0.45 \times \$540{,}000 = \$243{,}000$, already below the $\$310{,}000$ certain benefit.
> > - Legal costs of perhaps $25\%$ on a contingency basis reduce the expected recovery to about $\$182{,}000$.
> > - Four years of delay reduce the present value further, and leave an injured worker with no income for four years.
> > - The tort outcome is $\$540{,}000$ with probability $0.45$ and $\$0$ with probability $0.55$, a risk a worker unable to work cannot bear.
> > - The bargain favours this worker substantially. A worker with a clearly negligent employer and a severe injury gives up a great deal, because the benefit schedule is capped well below full compensation.
> > - The system transfers value from the strongest claims to the weakest ones, which is the defining property of [[Social Insurance|social insurance]].

## Provincial boards and private insurers

Private insurers do not write workers compensation in any province. The boards (WSIB in Ontario, WorkSafeBC, WCB Alberta, CNESST in Quebec) hold a monopoly. This is the largest single difference from the United States, where private carriers write workers compensation in most states.

## Funding and rate setting

Employers are assigned to rate groups by industry and pay an assessment per $\$100$ of insurable payroll. The assessment is adjusted by [[Experience Rating|experience rating]], so an employer's own claim record affects its rate.

The boards target full funding of the liability for benefits already awarded. Many spent decades recovering from unfunded positions, and funding ratios are a standing policy issue.

Permanent disability and survivor benefits are lifetime annuities, so a board's liability behaves like a pension plan's. It is sensitive to the discount rate, mortality and indexation, and actuaries value it on that basis rather than by triangle methods.

## Statutory benefits in ratemaking

Statutes set the benefit structure: the compensation rate as a percentage of pre-injury wage, and minimum and maximum weekly benefits as percentages of the state average weekly wage. Werner & Modlin price a benefit change by its direct effect on total benefits across the wage distribution and a judgmental indirect effect on claimant behaviour. The calculation is on [[Policy Provision Changes]].

## Interaction with private insurance

An employer's general liability policy does not cover employee injury, because the board has exclusive jurisdiction. The board's [[Salvage and Subrogation|subrogation]] rights against negligent third parties bring it into ordinary liability claims. An injured worker's tort claim against a third party is coordinated with board benefits as a [[Collateral Benefits|collateral benefit]].

> [!trap] Assuming private insurers write it in Canada
> In the United States private carriers write workers compensation in most states, but in Canada the provincial boards hold a monopoly. An employer cannot buy it from a private insurer, and its general liability policy does not cover employee injury.
