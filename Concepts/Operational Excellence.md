---
aliases:
  - Business Process
  - Operational Process
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c93dd5886918a8da0427ba60010b338cf60103846feb41655792026b7b9dce25
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Operational Excellence.md
---

**Operational Excellence** is the sustained ability of an organization to run its business processes with consistently high quality, short cycle times and low cost. A **business process** is a repeatable sequence of activities that turns inputs into an output a customer values.

Operational excellence is pursued through disciplined process improvement, chiefly lean, which removes waste so work flows, and six sigma, which removes variation so work is right the first time. It is measured by process yield, defect rates and cycle time.

The rolled throughput yield (RTY) of a process with $m$ steps is the probability that a unit passes every step first time, which is

> $$\text{RTY} = \prod_{i=1}^{m} \text{FPY}_i$$

- $\text{FPY}_i$ is the first-pass yield of step $i$, the share of units it completes correctly without rework.

> [!example]- What is this process's rolled throughput yield, before and after the re-keying step is removed? {Example}
> An insurer issues commercial policies through five steps with first-pass yields of 0.97 (intake), 0.90 (manual re-keying of the application), 0.96 (rating), 0.95 (referral) and 0.99 (issue). Automating data capture removes the re-keying step and leaves the other yields unchanged.
>
> > [!answer]-
> > - Before, the RTY is $0.97 \times 0.90 \times 0.96 \times 0.95 \times 0.99 = 0.7882$.
> > - After, the RTY is $0.97 \times 0.96 \times 0.95 \times 0.99 = 0.8758$.
> > - Removing one step raises the share of policies issued right first time from 78.8% to 87.6%.
> > - Referral is now the weakest step, so it becomes the next target.

## Business processes

A process runs across departments from a trigger to an outcome, such as an application to an issued policy or a first notice of loss to a paid claim. Mapping it end to end, with each handoff, queue and decision, usually shows that most of the elapsed time is spent waiting rather than working.

Good process measures are few, reported often and owned by the people who run the process. Typical ones are cycle time, first-pass yield, the share of cases handled straight through without a person, cost per case and customer satisfaction. They differ from the [[Key Risk Indicator|key risk indicators]] that warn of losses.

Automation pays most after the process has been simplified, because automating a wasteful step makes the waste faster rather than removing it. A recommendation should remove unnecessary steps and rework before automating what is left. Straight-through processing of simple underwriting and claims, and the [[Insurtech|insurtech]] tools built for it, depend on clean data at the first step.

A process stripped of every buffer can fail badly when a supplier, a system or a site goes down. Operational excellence therefore keeps some slack, early warning indicators and alternative sources in critical processes, which links it to [[Organizational Resilience|organizational resilience]], [[Business Continuity Management|business continuity management]] and [[Operational Risk|operational risk]].

An insurer's core processes are [[Underwriting|underwriting]] and policy issue, billing, and [[Claims Handling|claims handling]]. Improving them lowers the expense ratio, speeds settlement and reduces leakage, the amount paid on claims beyond what the policy owes. [[Insurance Operations]] describes the functions these processes run through.

## Lean

Lean defines value from the customer's view, maps the value stream, and removes the steps that add none. The wastes it targets include defects, overproduction, waiting, unused talent, transport, excess inventory, unnecessary motion and extra processing. Rework and queues are the main wastes in insurance processes, where the inventory is files rather than parts.

By Little's law, the lead time of a process is

> $$\text{Lead time} = \frac{\text{Work in process}}{\text{Throughput}}$$

The process cycle efficiency (PCE) is

> $$\text{PCE} = \frac{\text{Value-added time}}{\text{Lead time}}$$

Lead time is driven by queues, not by the time spent working on a case. Speeding up the work without reducing the work in process barely shortens the lead time.

> [!example]- What are this claims unit's lead time and process cycle efficiency, before and after the change? {Example}
> A claims unit closes 50 property claims a working day and has 600 open claims on hand. Adjusters and reviewers spend a total of 1.5 days of actual work on a typical claim. One claim in five is returned for missing documents and waits in a queue for them. After the unit asks for the documents at first notice, the rework queue disappears and the open inventory falls to 350 claims, with throughput unchanged.
>
> > [!answer]-
> > - Before, the lead time is $600/50 = 12$ days and the PCE is $1.5/12 = 12.5\%$.
> > - After, the lead time is $350/50 = 7$ days and the PCE is $1.5/7 = 21.4\%$.
> > - The work content did not change, but claims settle five days sooner because they spend less time waiting.
> > - Most of the remaining 5.5 days is still queue time, which is where the next improvement lies.

## Six sigma

Six sigma reduces variation through the DMAIC cycle:

1. **Define** the problem and the customer's requirements.
2. **Measure** the current process.
3. **Analyze** the root causes of defects.
4. **Improve** the process.
5. **Control** the process so the gain holds.

An opportunity is a feature of the output the customer could find defective. The number of defects per million opportunities is

> $$\text{DPMO} = \frac{\text{Defects}}{\text{Units} \times \text{Opportunities}} \times 10^6$$

- $\text{Opportunities}$ is the number of opportunities counted per unit.

The sigma level of the process is

> $$\sigma_{\text{level}} = \Phi^{-1}\left(1 - \frac{\text{DPMO}}{10^6}\right) + 1.5$$

- $\Phi^{-1}$ is the inverse of the standard [[Normal Distribution|normal]] distribution function.
- The 1.5 is the conventional allowance for a process mean drifting over the long run.

A six sigma process, with the 1.5 sigma shift, produces about 3.4 defects per million opportunities. Leaving the shift out understates the sigma level by 1.5. DPMO depends on how many opportunities are counted per unit, so the count is kept fixed when two processes or two periods are compared.

> [!example]- What are the DPMO and sigma level of this policy-issue process, before and after the re-keying step is removed? {Example}
> The insurer above issues 10,000 commercial policies a year through steps with first-pass yields of 0.97, 0.90 (re-keying), 0.96, 0.95 and 0.99. Each step's failure is one defect, and the insurer counts five opportunities per policy.
>
> > [!answer]-
> > - The expected defects before are $10{,}000 \times (0.03 + 0.10 + 0.04 + 0.05 + 0.01) = 2{,}300$, over $10{,}000 \times 5 = 50{,}000$ opportunities.
> > - The DPMO before is $2{,}300/50{,}000 \times 10^6 = 46{,}000$, so the sigma level is $\Phi^{-1}(0.954) + 1.5 = 3.18$.
> > - Removing re-keying removes its 1,000 expected defects, leaving 1,300 and a DPMO of $26{,}000$.
> > - The sigma level after is $\Phi^{-1}(0.974) + 1.5 = 3.44$, still far from six sigma.

> [!trap] Averaging the first-pass yields
> The probability of passing every step is the product of the first-pass yields, not their average. Five steps at 95% give an RTY of 77%, not 95%.
