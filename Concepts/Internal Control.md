---
aliases:
  - Organizational Process
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a79c2f832f7677aa9a008fd58d6fec8dc37ed314acee8103a0fb673cb2ede09f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Internal Control.md
---
**An internal control** is a policy, procedure or activity built into an organisational process to give reasonable assurance that the process meets its objectives: operations that are effective and efficient, reporting that is reliable, and compliance with laws and regulations. Controls are the main tool for reducing [[Operational Risk|operational]] and other [[Non-Financial Risk|non-financial risks]], and the system of internal control is what the board, management and auditors rely on to know that a process works as designed.

> $$RR = IR \times (1 - e)$$

> $$e = 1 - \prod_{j=1}^{m} (1 - e_j)$$

- **Symbols:** $IR$ is the inherent risk of a process, the expected loss (or a risk score) before any controls. $RR$ is the residual risk left after them, and $e$ is the combined effectiveness of the controls, the fraction of the inherent loss they remove. With $m$ controls acting independently in sequence, each removing a fraction $e_j$ of what reaches it, the combined effectiveness is the second block.
- **Preventive, detective and corrective:** A preventive control stops an error or fraud before it happens, such as a payment limit or a second approval. A detective control finds one afterwards, such as a reconciliation or a sample audit. A corrective control limits the damage and fixes the cause, such as recovery of overpayments or a change to the system. Preventive controls are usually cheaper per error avoided, while detective controls catch what preventive ones miss.
- **Manual and automated:** An automated control, such as a system edit that rejects a duplicate claim number, works the same way every time once it is tested, but a design flaw repeats on every transaction. A manual control can use judgment but varies with the person, the workload and the day.
- **Segregation of duties:** No one person should control every stage of a transaction, such as setting up a payee, approving a payment and reconciling the account. Splitting these stages means fraud requires collusion and an honest error is more likely to be noticed.
- **The COSO framework:** The Committee of Sponsoring Organizations of the Treadway Commission (COSO) sets out internal control in five components: the control environment, risk assessment, control activities, information and communication, and monitoring activities. The control environment, meaning tone at the top, integrity and accountability, underlies the other four, which is why a strong [[Risk Aware Culture|risk culture]] matters as much as any single control.
- **Three lines of defence:** Business managers own the risks and run the controls (first line), the risk management and compliance functions set standards and challenge the first line (second line), and internal audit gives independent assurance to the board (third line). The [[External Auditor|external auditor]] and the regulator sit outside the three lines.
- **Testing effectiveness:** A control is tested for design (would it address the risk if it worked as intended) and for operating effectiveness (did it work through the period). Operating tests sample transactions and count exceptions, and a control is relied on only when the plausible exception rate is below a tolerable rate set in advance.
- **Cost and benefit:** Each control costs money and can slow the process, so a control is worth adding when the loss it removes exceeds its cost. Controls are part of the [[Risk Control|risk control]] response to risk alongside avoidance, transfer and acceptance.

> [!example]- Residual Risk in a Claims-Payment Process {Example}
> An insurer estimates that, with no controls, its claims-payment process would lose \$2.0 million a year to erroneous and fraudulent payments. A preventive control, requiring a second approval for payments above \$10,000, is 70% effective and costs \$150,000 a year. A detective control, a monthly audit of a sample of paid claims with recovery of overpayments, is 40% effective on what remains and costs \$100,000 a year. Find the residual risk and combined effectiveness with both controls, and decide whether the detective control is worth adding to the preventive one.
>
> > [!answer]-
> > The detective control acts on the loss the preventive control lets through.
> > $$
> > \begin{align*}
> > e &= 1 - (1 - 0.70)(1 - 0.40) \\
> > &= 0.82 \\
> > RR &= 2.0 \times (1 - 0.82) \\
> > &= 0.36
> > \end{align*}
> > $$
> > The two controls together remove 82% of the inherent risk, leaving \$360,000 a year. With the preventive control alone, the residual is $2.0 \times 0.30 = 0.60$, or \$600,000, so the detective control removes a further \$240,000 for a cost of \$100,000 and is worth adding. Its 40% applies only to what the first control misses, which is why the combined effectiveness is 82% rather than 110%. Even then, the decision should consider the deterrent effect of the audit, which the loss figures may not capture.

> [!example]- Testing Whether a Control Operates Effectively {Example}
> Internal audit tests the second-approval control by sampling 60 large payments from the year and checking each for a valid second approval. It will rely on the control only if, at 95% confidence, the exception rate is below a tolerable rate of 10%. The test finds 3 payments without a valid approval. Can audit rely on the control? Would the answer change if it had found none?
>
> > [!answer]-
> > The observed rate is $3/60 = 5\%$, but audit needs an upper confidence bound. The 95% upper bound $p_U$ is the exception rate at which a sample of 60 would show 3 or fewer exceptions with probability 5%.
> > $$
> > \begin{align*}
> > \sum_{i=0}^{3} \binom{60}{i} p_U^{\,i} (1 - p_U)^{60 - i} &= 0.05 \\
> > p_U &= 0.124
> > \end{align*}
> > $$
> > The upper bound of 12.4% is above the tolerable rate of 10%, so audit cannot rely on the control and should report a deficiency or extend the sample. With no exceptions the bound has a closed form.
> > $$
> > \begin{align*}
> > p_U &= 1 - 0.05^{1/60} \\
> > &= 0.049
> > \end{align*}
> > $$
> > A clean sample would support reliance even at a tolerable rate of 5%. The bound, not the observed rate, decides reliance, because a sample of 60 can show 5% by chance when the true rate is twice that.

> [!tip]- How it appears on the exam
> - **CFE-101:** Questions ask candidates to demonstrate the use of controls in an organisational process described in a case, such as underwriting, claims payment, investment trading or model running. A good answer identifies the risks at each step, proposes preventive and detective controls with segregation of duties, and says how the controls would be tested and who would test them.
> - **Governance:** Questions on the internal environment ask how COSO's components and the three lines of defence divide responsibility for controls, and where a described organisation falls short.
> - **Calculations:** A calculation may give inherent risk, control effectiveness and costs and ask for residual risk, the combined effect of several controls, or whether a control is worth its cost.

> [!warning]- Exam traps
> - **Adding effectiveness:** Two controls of 70% and 40% don't remove 110% of the risk. The second control acts on what the first lets through, so the effectiveness rates combine multiplicatively through their complements.
> - **Design versus operation:** A well-designed control that isn't performed gives no assurance. A design review alone cannot show that a control works, which takes evidence from testing over the period.
> - **Detective is not preventive:** A detective control finds losses that have already happened, so recovery is uncertain and the loss may be public before it is found. Answers that rely only on detective controls for high-severity risks miss the need for prevention.
> - **Blurring the lines:** The second line advises on and challenges controls but does not run them, and internal audit should not design the controls it later audits. Giving one function two roles undermines the independence the model relies on.
