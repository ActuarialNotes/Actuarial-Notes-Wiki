---
aliases:
  - Organizational Process
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5f24c86fd9179e22415dbfe14d6b203d6a4570bbc2d5255909f6640193cc428f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Internal Control.md
---

An **Internal Control** is a policy, procedure or activity built into an organisational process to give reasonable assurance that the process meets its objectives: operations that are effective and efficient, reporting that is reliable, and compliance with laws and regulations. Controls are the main tool for reducing [[Operational Risk|operational]] and other [[Non-Financial Risk|non-financial risks]].

The inherent risk $IR$ of a process is its expected loss, or a risk score, before any controls. If the controls remove a fraction $e$ of it, their combined effectiveness, the residual risk left after them is

> $$RR = IR \times (1 - e)$$

With $m$ controls acting independently in sequence, the combined effectiveness is

> $$e = 1 - \prod_{j=1}^{m} (1 - e_j)$$

- $e_j$ is the fraction of the loss reaching control $j$ that it removes.

Each control costs money and can slow the process, so a control is worth adding when the loss it removes exceeds its cost. Controls are part of the [[Risk Control|risk control]] response to risk alongside avoidance, transfer and acceptance.

> [!example]- What residual risk do these two controls leave, and is the detective control worth adding? {Example}
> With no controls, an insurer's claims-payment process would lose $\$2.0$ million a year to erroneous and fraudulent payments. The controls are:
>
> | Control | Effectiveness | Annual cost |
> | :--- | ---: | ---: |
> | Preventive: second approval for payments above $\$10{,}000$ | 70% | $\$150{,}000$ |
> | Detective: monthly sample audit of paid claims, with recovery | 40% of what remains | $\$100{,}000$ |
>
> > [!answer]-
> > - The detective control acts on the loss the preventive control lets through.
> > - The combined effectiveness is $1 - (1 - 0.70)(1 - 0.40) = 0.82$.
> > - The residual risk is $2.0 \times (1 - 0.82) = 0.36$, or $\$360{,}000$ a year.
> > - With the preventive control alone, the residual is $2.0 \times 0.30 = 0.60$, or $\$600{,}000$.
> > - The detective control removes a further $\$240{,}000$ for a cost of $\$100{,}000$, so it is worth adding. The audit's deterrent effect, which the loss figures may not capture, adds to the case.

## Types of control

- **Preventive** controls stop an error or fraud before it happens, such as a payment limit or a second approval.
- **Detective** controls find one afterwards, such as a reconciliation or a sample audit.
- **Corrective** controls limit the damage and fix the cause, such as recovery of overpayments or a change to the system.

Preventive controls are usually cheaper per error avoided, while detective controls catch what preventive ones miss. A detective control finds losses that have already happened, so recovery is uncertain and the loss may be public before it is found. High-severity risks therefore need prevention.

An automated control, such as a system edit that rejects a duplicate claim number, works the same way every time once it is tested, but a design flaw repeats on every transaction. A manual control can use judgment but varies with the person, the workload and the day.

## Segregation of duties

No one person should control every stage of a transaction, such as setting up a payee, approving a payment and reconciling the account. Splitting these stages means fraud requires collusion and an honest error is more likely to be noticed.

## The COSO framework

The Committee of Sponsoring Organizations of the Treadway Commission (COSO) sets out internal control in five components:

1. The control environment.
2. Risk assessment.
3. Control activities.
4. Information and communication.
5. Monitoring activities.

The control environment, meaning tone at the top, integrity and accountability, underlies the other four. That is why a strong [[Risk Aware Culture|risk culture]] matters as much as any single control.

## Three lines of defence

1. Business managers own the risks and run the controls.
2. The risk management and compliance functions set standards and challenge the first line.
3. Internal audit gives independent assurance to the board.

The [[External Auditor|external auditor]] and the regulator sit outside the three lines. The second line advises on and challenges controls but does not run them, and internal audit should not design the controls it later audits.

## Testing control effectiveness

A control is tested for design, whether it would address the risk if it worked as intended, and for operating effectiveness, whether it worked through the period. A well-designed control that isn't performed gives no assurance. Operating tests sample transactions and count exceptions, and a control is relied on only when the plausible exception rate is below a tolerable rate set in advance.

> [!example]- Can internal audit rely on this control, and would the answer change with no exceptions? {Example}
> Internal audit tests the second-approval control by sampling 60 large payments from the year. It will rely on the control only if, at 95% confidence, the exception rate is below a tolerable rate of 10%. The test finds 3 payments without a valid approval.
>
> > [!answer]-
> > - The observed rate is $3/60 = 5\%$, but reliance rests on the 95% upper confidence bound $p_U$.
> > - $p_U$ is the exception rate at which a sample of 60 would show 3 or fewer exceptions with probability $5\%$. For $X$ binomial with $n = 60$ and $p = p_U$, it solves $P(X \le 3) = 0.05$.
> > - Solving gives $p_U = 0.124$, above the tolerable rate of $10\%$.
> > - Audit cannot rely on the control, and reports a deficiency or extends the sample.
> > - With no exceptions, $p_U = 1 - 0.05^{1/60} = 0.049$, so a clean sample would support reliance even at a tolerable rate of $5\%$.

> [!trap] Adding control effectiveness
> Two controls of $70\%$ and $40\%$ don't remove $110\%$ of the risk. The second acts on what the first lets through, so the rates combine through their complements, $1 - (0.30)(0.60) = 82\%$.
