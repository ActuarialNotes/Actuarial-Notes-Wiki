---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:f0a24876e16c006fbe8c36d065240864f67a5396146ec3108d3870eac78357d6
  sources:
    - "NC State ERM Initiative, \"ISO's Risk Management Framework\" (summary of ISO 31000:2018), process elements, sha256:d225c2986035263284b625785ad916009690b86e1285788533c2467438c02a48 — https://erm.ncsu.edu/resource-center/isos-risk-management-framework"
    - "CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), pp.105, 110-114 (PDF pp.7, 12-16): seven steps from AS/NZS 4360, three contexts, Coldhard Steel, sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf"
    - "COSO, Enterprise Risk Management: Integrating with Strategy and Performance, Executive Summary (June 2017), pp.6-7 (performance component), sha256:2d4809dd09687d701944987f65ca6ddc39074a00236abebfd436d79f4563abd1 — https://www.coso.org/_files/ugd/3059fc_61ea5985b03c4293960642fdce408eaa.pdf"
    - "Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.3 p.45 Exhibit 3.1 (four steps); p.55 periodic review, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Management Process.md
---

The **Risk Management Process** is the repeating sequence of steps by which an organization manages its risks: establish the context and the criteria risks will be judged by, identify the risks, analyze and evaluate them, treat them, and monitor and review the results, with communication and consultation running through every step. Standards and frameworks word the steps differently, ISO 31000 in six process elements, the CAS's ERM framework in seven steps and COSO through its components, but each describes the same cycle and feeds what monitoring learns back into the first step.

1. **Establish the context.** Set the organization's objectives, stakeholders and the criteria risks will be judged by.
2. **Identify.** [[Risk Identification|Risk identification]] finds and describes the risks.
3. **Analyze and evaluate.** [[Risk Assessment|Risk assessment]] measures the risks' likelihood and impact so they can be ranked.
4. **Treat.** [[Risk Treatment|Risk treatment]] chooses among avoiding a risk, controlling it, retaining it, transferring it and, for risks with an upside, exploiting it.
5. **Monitor and review.** The process never ends. Monitoring checks that the decisions were right and were carried out, and that the risks have not changed so much that the plans need revising; when either fails, the process returns to identification.

## The CAS ERM framework

The CAS ERM framework (2003), based on the Australian/New Zealand standard AS/NZS 4360, lists seven iterative steps:

1. **Establish context** covers the external context (the organization's relationship with its environment, including a SWOT analysis and its stakeholders), the internal context (its objectives, strategies, key performance indicators and governance) and the risk management context (the risk categories that matter and common risk metrics).
2. **Identify risks.**
3. **Analyze and quantify risks.** Distributions and scenarios are built for each material risk.
4. **Integrate risks.** Combining all distributions, with their correlations, into an aggregate risk profile.
5. **Assess and prioritize risks** by their contribution to that profile.
6. **Treat or exploit risks.**
7. **Monitor and review**, feeding the results back into the context.

> [!example]- Which CAS framework step is the committee's formation, and which is each numbered action? {Example}
> A steel parts maker sets up a risk management committee led by its chief financial officer, with members from safety, quality control, human resources, marketing and finance, and agrees to measure every risk by value at risk over one year. It then:
>
> 1. Runs workshops, surveys and brainstorming sessions to list its hazard, financial, operational and strategic risks.
> 2. Has actuaries project the cost and variability of its workers compensation losses, and asks human resources for best-case, expected and worst-case wage scenarios for the next labor contract.
> 3. Builds a simulation model that combines all the risks using a common economic scenario generator.
> 4. Plots each risk by frequency and severity on a risk map and ranks the top four.
> 5. Considers a large deductible on workers compensation, tightens its credit terms, opens early talks with the union, and signs fixed-price contracts with domestic suppliers ahead of expected tariffs.
> 6. Schedules monthly committee meetings to track progress against its goals.
>
> > [!answer]-
> > - Forming the committee and choosing a common risk metric is establishing the context, the risk management context in particular.
> > - Action 1 is identifying risks.
> > - Action 2 is analyzing and quantifying risks, because it builds a distribution or scenarios for each risk on its own.
> > - Action 3 is integrating risks, because it combines all the risks into one aggregate profile.
> > - Action 4 is assessing and prioritizing risks.
> > - Action 5 is treating or exploiting risks: the deductible is retention, the credit terms and early talks are risk control, and the fixed-price contracts exploit an expected tariff increase.
> > - Action 6 is monitoring and reviewing.

## ISO 31000

ISO 31000 (2018) has six process elements:

1. **Communication and consultation** builds awareness and understanding of risk among stakeholders.
2. **Scope, context and criteria** fit the process to the organization.
3. **Risk assessment** consists of risk identification, risk analysis and risk evaluation.
4. **Risk treatment** selects and implements responses.
5. **Monitoring and review** improve how well the process works.
6. **Recording and reporting** communicate risk information for decisions.

Monitoring and review, and recording and reporting, are part of the process. An answer that stops once a technique is chosen leaves out the step that catches changed risks.

## COSO

The COSO framework (2017) organizes enterprise risk management into five components: governance and culture; strategy and objective-setting; performance; review and revision; and information, communication and reporting. The performance component holds the familiar steps, in which risks are identified, assessed for severity, prioritized against the [[Risk Appetite|risk appetite]], given responses, and viewed as a portfolio.

## The traditional four-step process

Risk management of pure loss exposures is often taught as four steps:

1. Identify the potential losses.
2. Measure their [[Frequency|frequency]] and [[Severity|severity]].
3. Select the techniques to treat them.
4. Implement and monitor the decision.

The enterprise versions add context-setting at the start and the integration of risks into one portfolio. The word assessment has two meanings. In ISO 31000, risk assessment covers identification, analysis and evaluation. In the traditional four-step process it means measuring risks after they are identified.

## Integrating risks

Portfolio risk is not the simple sum of the individual risks. If two risks have outcomes with standard deviations $\sigma_A$ and $\sigma_B$, the standard deviation of their combined effect is

> $$\sigma_{A+B} = \sqrt{\sigma_A^2 + \sigma_B^2 + 2\rho\,\sigma_A\,\sigma_B}$$

- $\rho$ is the [[Correlation|correlation]] between the two risks.

The total equals $\sigma_A + \sigma_B$ only when $\rho = 1$.

> [!example]- What is the standard deviation of this distributor's combined result at each correlation? {Example}
> With illustrative figures in \$ millions, a distributor's annual result from a currency exposure has a standard deviation of 3, and its result from fuel prices has a standard deviation of 4. The correlation between them is 0, 0.5 or −0.5.
>
> > [!answer]-
> > - Uncorrelated, $\sigma_{A+B} = \sqrt{9 + 16} = 5.0$.
> > - With $\rho = 0.5$, $\sigma_{A+B} = \sqrt{9 + 16 + 12} = 6.08$.
> > - With $\rho = -0.5$, $\sigma_{A+B} = \sqrt{9 + 16 - 12} = 3.61$.
> > - The sum of the two standard deviations is 7.0, reached only if the risks move perfectly together.
> > - With a negative correlation the two partly offset each other, a natural hedge, so treating each risk separately, as if the total were 7.0, would buy protection the organization as a whole does not need.

> [!trap] Starting with identification
> The process starts by establishing the organization's objectives, stakeholders and risk criteria, not by listing risks. An answer that starts with identification skips the step that defines what counts as a risk.
