---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:50ce4f09d8732c16d29b3a202b87f531f1bdb589a9cfe039a85edbda4e4116c3
  sources:
    - "NC State ERM Initiative, \"ISO's Risk Management Framework\" (summary of ISO 31000:2018), process elements, sha256:d225c2986035263284b625785ad916009690b86e1285788533c2467438c02a48 — https://erm.ncsu.edu/resource-center/isos-risk-management-framework"
    - "CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), pp.105, 110-114 (PDF pp.7, 12-16): seven steps from AS/NZS 4360, three contexts, Coldhard Steel, sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf"
    - "COSO, Enterprise Risk Management: Integrating with Strategy and Performance, Executive Summary (June 2017), pp.6-7 (performance component), sha256:2d4809dd09687d701944987f65ca6ddc39074a00236abebfd436d79f4563abd1 — https://www.coso.org/_files/ugd/3059fc_61ea5985b03c4293960642fdce408eaa.pdf"
    - "Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.3 p.45 Exhibit 3.1 (four steps); p.55 periodic review, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Management Process.md
---

The **risk management process** is the repeating sequence of steps by which an organization manages its risks: establish the context and the criteria risks will be judged by, identify the risks, analyze and evaluate them, treat them, and monitor and review the results, with communication and consultation running through every step. Standards and frameworks word the steps differently, ISO 31000 in six process elements, the CAS's ERM framework in seven steps and COSO through its components, but each describes the same cycle, and each feeds what monitoring learns back into the first step.

> $$\sigma_{A+B} = \sqrt{\sigma_A^2 + \sigma_B^2 + 2\rho\,\sigma_A\,\sigma_B}$$

- **Symbols:** $\sigma_A$ and $\sigma_B$ are the standard deviations of the outcomes of two risks, $\rho$ is the [[Correlation|correlation]] between them, and $\sigma_{A+B}$ is the standard deviation of their combined effect. The formula belongs to the step that integrates individual risks into an aggregate picture, and it shows the CAS principle that portfolio risk is not the simple sum of the individual risks: the total equals $\sigma_A + \sigma_B$ only when $\rho = 1$.
- **ISO 31000 (2018):** The process has six elements. **Communication and consultation** builds awareness and understanding of risk among stakeholders. **Scope, context and criteria** fit the process to the organization. **Risk assessment** consists of risk identification, risk analysis and risk evaluation. **Risk treatment** selects and implements responses. **Monitoring and review** improve how well the process works, and **recording and reporting** communicate risk information for decisions.
- **The CAS ERM framework (2003):** Based on the Australian/New Zealand standard AS/NZS 4360, it lists seven iterative steps. **Establish context** covers the external context (the organization's relationship with its environment, including a SWOT analysis and its stakeholders), the internal context (its objectives, strategies, key performance indicators and governance) and the risk management context (the risk categories that matter and common risk metrics). Then **identify risks**, **analyze and quantify** them, **integrate** them into an aggregate risk profile, **assess and prioritize** them by their contribution to that profile, **treat or exploit** them, and **monitor and review**, feeding the results back into the context.
- **COSO (2017):** The COSO framework organizes enterprise risk management into five components: governance and culture; strategy and objective-setting; performance; review and revision; and information, communication and reporting. The performance component holds the familiar steps, in which risks are identified, assessed for severity, prioritized against the [[Risk Appetite|risk appetite]], given responses, and viewed as a portfolio.
- **The traditional version:** Risk management of pure loss exposures is often taught as four steps: identify the potential losses, measure their [[Frequency|frequency]] and [[Severity|severity]], select the techniques to treat them, and implement and monitor the decision. The enterprise versions add context-setting at the start and the integration of risks into one portfolio.
- **Identification and assessment:** [[Risk Identification|Risk identification]] finds and describes the risks, and [[Risk Assessment|risk assessment]] measures their likelihood and impact so they can be ranked. In ISO's wording, assessment is the umbrella term for identification, analysis and evaluation together.
- **Treatment:** [[Risk Treatment|Risk treatment]] chooses among avoiding a risk, controlling it, retaining it, transferring it and, for risks with an upside, exploiting it.
- **Monitoring and review:** The process never ends. Monitoring checks that the decisions were right and were carried out, and that the risks have not changed so much that the plans need revising; when either fails, the process returns to identification.

> [!example]- Placing a Manufacturer's Actions in the Process {Example}
> A steel parts maker sets up a risk management committee led by its chief financial officer, with members from safety, quality control, human resources, marketing and finance, and agrees to measure every risk by value at risk over one year. It then:
>
> 1. Runs workshops, surveys and brainstorming sessions to list its hazard, financial, operational and strategic risks.
> 2. Has actuaries project the cost and variability of its workers compensation losses, and asks human resources for best-case, expected and worst-case wage scenarios for the next labor contract.
> 3. Builds a simulation model that combines all the risks using a common economic scenario generator.
> 4. Plots each risk by frequency and severity on a risk map and ranks the top four.
> 5. Considers a large deductible on workers compensation, tightens its credit terms, opens early talks with the union, and signs fixed-price contracts with domestic suppliers ahead of expected tariffs.
> 6. Schedules monthly committee meetings to track progress against its goals.
>
> Name the CAS framework step for the committee's formation and for each numbered action.
>
> > [!answer]-
> > Forming the committee and choosing a common risk metric is **establish context**, the risk management context in particular. Then:
> > - **1. Identify risks.**
> > - **2. Analyze and quantify risks:** Distributions and scenarios are built for each material risk.
> > - **3. Integrate risks:** Combining all distributions, with their correlations, into an aggregate risk profile.
> > - **4. Assess and prioritize risks.**
> > - **5. Treat or exploit risks:** The deductible is retention, the credit terms and early talks are risk control, and the fixed-price contracts exploit an expected tariff increase.
> > - **6. Monitor and review.**

> [!example]- Why Integration Changes the Picture {Example}
> With illustrative figures in \$ millions, a distributor's annual result from a currency exposure has a standard deviation of 3, and its result from fuel prices has a standard deviation of 4. Find the standard deviation of the combined result if the two are uncorrelated, if their correlation is 0.5, and if it is −0.5. Compare each with the sum of the two.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \rho = 0:\quad \sigma_{A+B} &= \sqrt{9 + 16} \\
> > &= 5.0 \\
> > \rho = 0.5:\quad \sigma_{A+B} &= \sqrt{9 + 16 + 2(0.5)(3)(4)} \\
> > &= 6.08 \\
> > \rho = -0.5:\quad \sigma_{A+B} &= \sqrt{9 + 16 - 12} \\
> > &= 3.61
> > \end{align*}
> > $$
> > The sum of the two standard deviations is 7.0, reached only if the risks move perfectly together. With a negative correlation the two partly offset each other, a natural hedge, so treating each risk separately, as if the total were 7.0, would buy protection the organization as a whole does not need.

> [!tip]- How it appears on the exam
> - **DISC-RM:** The introduction to risk management ends with the process for managing risk. Questions list activities and ask for their order, or describe one activity and ask which step it belongs to.
> - **Linked sections:** The later sections on identifying risk, business continuity and treating risk each go deeper into one step, so a question on [[Risk Identification]] or [[Risk Treatment]] can also ask where that step sits in the cycle.
> - **Frameworks:** A question may name a step in ISO, COSO or CAS wording, such as establishing the context or recording and reporting, and ask what it involves.

> [!warning]- Exam traps
> - **Assessment has two meanings:** In ISO 31000, risk assessment covers identification, analysis and evaluation. In the traditional four-step process it means measuring risks after they are identified. Read which usage the question intends.
> - **Context comes first:** The process starts by establishing the organization's objectives, stakeholders and risk criteria, not by listing risks. An answer that starts with identification skips the step that defines what counts as a risk.
> - **The cycle does not end at treatment:** Monitoring and review, and recording and reporting, are part of the process. An answer that stops once a technique is chosen leaves out the step that catches changed risks.
> - **Risks are not additive:** Adding the risk of each unit overstates the total unless the risks move perfectly together, and correlated risks can make one shock hit several units at once.
