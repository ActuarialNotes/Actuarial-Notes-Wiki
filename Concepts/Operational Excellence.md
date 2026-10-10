---
aliases:
  - Business Process
  - Operational Process
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:cf0b9edc5009af42306f8866d1e9db7e01ff3a6f92dcbf520c56b99e1f024265
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Operational Excellence.md
---
**Operational Excellence** is the sustained ability of an organization to run its business processes, the repeatable sequences of activities that turn inputs into an output a customer values, with consistently high quality, short cycle times and low cost. It is pursued through disciplined process improvement, chiefly lean (removing waste so work flows) and six sigma (removing variation so work is right the first time), and is measured by process yield, defect rates and cycle time.

> $$\text{RTY} = \prod_{i=1}^{m} \text{FPY}_i$$

> $$\text{DPMO} = \frac{\text{Defects}}{\text{Units} \times \text{Opportunities}} \times 10^6$$

> $$\sigma_{\text{level}} = \Phi^{-1}\left(1 - \frac{\text{DPMO}}{10^6}\right) + 1.5$$

> $$\text{Lead time} = \frac{\text{Work in process}}{\text{Throughput}}$$

> $$\text{PCE} = \frac{\text{Value-added time}}{\text{Lead time}}$$

- **Symbols:** $\text{FPY}_i$ is the first-pass yield of step $i$, the share of units it completes correctly without rework, and the rolled throughput yield (RTY) is the chance that a unit passes every step first time. DPMO counts defects per million opportunities, where an opportunity is a feature of the output the customer could find defective. $\Phi^{-1}$ is the inverse of the standard [[Normal Distribution|normal]] distribution function, and the 1.5 is the conventional allowance for a process mean drifting over the long run. The lead time relation is Little's law, and PCE is the process cycle efficiency.
- **Business processes:** A process runs across departments from a trigger to an outcome, such as an application to an issued policy or a first notice of loss to a paid claim. Mapping it end to end, with each handoff, queue and decision, usually shows that most of the elapsed time is spent waiting rather than working.
- **Lean:** Lean defines value from the customer's view, maps the value stream, and removes the steps that add none. The wastes it targets include defects, overproduction, waiting, unused talent, transport, excess inventory, unnecessary motion and extra processing. Rework and queues are the main wastes in insurance processes, where the inventory is files rather than parts.
- **Six sigma:** Six sigma reduces variation through the DMAIC cycle: define the problem and the customer's requirements, measure the current process, analyze the root causes of defects, improve the process, and control it so the gain holds. A six sigma process, with the 1.5 sigma shift, produces about 3.4 defects per million opportunities.
- **Measures:** Good process measures are few, reported often and owned by the people who run the process. Typical ones are cycle time, first-pass yield, the share of cases handled straight through without a person, cost per case and customer satisfaction, in contrast with the [[Key Risk Indicator|key risk indicators]] that warn of losses.
- **Automation:** Automation pays most after the process has been simplified, because automating a wasteful step makes the waste faster rather than removing it. Straight-through processing of simple underwriting and claims, and the [[Insurtech|insurtech]] tools built for it, depend on clean data at the first step.
- **Efficiency and resilience:** A process stripped of every buffer can fail badly when a supplier, a system or a site goes down. Operational excellence therefore keeps some slack, early warning indicators and alternative sources in critical processes, which links it to [[Organizational Resilience|organizational resilience]], [[Business Continuity Management|business continuity management]] and [[Operational Risk|operational risk]].
- **In insurance:** The core processes are [[Underwriting|underwriting]] and policy issue, billing, and [[Claims Handling|claims handling]], and improving them lowers the expense ratio, speeds settlement and reduces leakage, the amount paid on claims beyond what the policy owes. [[Insurance Operations]] describes the functions these processes run through.

> [!example]- Yield and Sigma Level Before and After Removing a Rework Step {Example}
> An insurer issues 10,000 commercial policies a year through five steps with first-pass yields of 0.97 (intake), 0.90 (manual re-keying of the application), 0.96 (rating), 0.95 (referral) and 0.99 (issue). Each step's failure is one defect, and the insurer counts five opportunities per policy, one for each feature of the issued policy the customer could find wrong. Automating data capture removes the re-keying step and leaves the other yields unchanged. Find the rolled throughput yield, DPMO and sigma level before and after.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{RTY}_{\text{before}} &= 0.97(0.90)(0.96)(0.95)(0.99) \\
> > &= 0.7882 \\
> > \text{RTY}_{\text{after}} &= 0.97(0.96)(0.95)(0.99) \\
> > &= 0.8758
> > \end{align*}
> > $$
> > The expected defects are $10{,}000(0.03 + 0.10 + 0.04 + 0.05 + 0.01) = 2{,}300$ before and 1,300 after, over 50,000 opportunities.
> > $$
> > \begin{align*}
> > \text{DPMO}_{\text{before}} &= \frac{2{,}300}{50{,}000} \times 10^6 \\
> > &= 46{,}000 \\
> > \sigma_{\text{before}} &= \Phi^{-1}(0.954) + 1.5 \\
> > &= 3.18 \\
> > \text{DPMO}_{\text{after}} &= 26{,}000 \\
> > \sigma_{\text{after}} &= \Phi^{-1}(0.974) + 1.5 \\
> > &= 3.44
> > \end{align*}
> > $$
> > Removing one step raised the share of policies issued right first time from 78.8% to 87.6%. The process is still far from six sigma, and referral is now the weakest step, so it becomes the next target.

> [!example]- Cycle Time of a Claims Process {Example}
> A claims unit closes 50 property claims a working day and has 600 open claims on hand. Adjusters and reviewers spend a total of 1.5 days of actual work on a typical claim. One claim in five is returned for missing documents and waits in a queue for them. After the unit asks for the documents at first notice, the rework queue disappears and the open inventory falls to 350 claims, with throughput unchanged. Find the lead time and process cycle efficiency before and after.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Lead time}_{\text{before}} &= \frac{600}{50} \\
> > &= 12 \text{ days} \\
> > \text{PCE}_{\text{before}} &= \frac{1.5}{12} \\
> > &= 12.5\% \\
> > \text{Lead time}_{\text{after}} &= \frac{350}{50} \\
> > &= 7 \text{ days} \\
> > \text{PCE}_{\text{after}} &= \frac{1.5}{7} \\
> > &= 21.4\%
> > \end{align*}
> > $$
> > The work content did not change, but claims settle five days sooner because they spend less time waiting. Most of the remaining 5.5 days is still queue time, which is where the next improvement lies.

> [!tip]- How it appears on the exam
> - **CFE-201 learning outcome 3c:** Candidates recommend best practices in business processes to achieve operational excellence. The readings for this outcome cover procurement and early warning systems, how financial institutions build resilience to non-financial risk, managing in extreme uncertainty, managing allocations, and reorganizing to capture value quickly.
> - **Question shape:** A case describes an insurer's process, its problems and its constraints, and asks for recommendations with reasons, sometimes with a short calculation of a yield, a cycle time or a cost saving to support them.
> - **Links across the section:** The section's learning objective says managerial accounting and operational processes together drive performance evaluation and decision making, so an answer may need to tie a process change to how its costs are allocated, as in [[Managerial Accounting|managerial accounting]].

> [!warning]- Exam traps
> - **Averaging yields:** The chance of passing every step is the product of the first-pass yields, not their average. Five steps at 95% give an RTY of 77%, not 95%.
> - **Changing the opportunities:** DPMO depends on how many opportunities are counted per unit. Counting more opportunities, or dropping some along with a removed step, changes the sigma level without any real improvement, so keep the definition fixed when comparing.
> - **The 1.5 shift:** The usual sigma table includes the 1.5 sigma shift, so 3.4 DPMO corresponds to six sigma rather than 4.5. Leaving it out understates the sigma level by 1.5.
> - **Cycle time as work time:** Lead time is driven by queues, not by the time spent working on a case. Speeding up the work without reducing the work in process barely shortens the lead time.
> - **Automating first:** Automating a process before simplifying it locks in its waste. A recommendation should remove unnecessary steps and rework before automating what is left.
