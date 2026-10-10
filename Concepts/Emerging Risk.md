---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9bd63f8366b0ca08a1847fe01603e9de8b9334dbb8ae919f981298ae104e6c61
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Emerging Risk.md
---

**An emerging risk** is a new risk, or a familiar risk changing in a new way, whose nature, likelihood and impact are not yet well understood, so that it cannot be measured with the data and models used for established risks. Climate change, artificial intelligence, antimicrobial resistance and shifts in social attitudes to litigation have each been emerging risks for insurers. [[Enterprise Risk Management|ERM]] treats them as a distinct part of [[Risk Identification|risk identification]]: the task is to spot them early, judge which deserve attention, and watch them until they can be quantified or dismissed.

> $$S_k = L_k \times I_k \times V_k$$

> $$p_{\text{annual}} = 1 - \left(1 - p_T\right)^{1/T}$$

- **Symbols:** $S_k$ is the priority score of candidate risk $k$ on a risk register. $L_k$, $I_k$ and $V_k$ are its scores for likelihood, impact and velocity, each on an ordinal scale such as 1 to 5 agreed in advance. In the second block, $p_T$ is an expert's probability that the risk crystallises within a horizon of $T$ years, and $p_{\text{annual}}$ is the equivalent constant annual probability, which lets the estimate be compared with the annual measures used in [[Economic Capital|economic capital]].
- **What makes a risk emerging:** The risk has little or no loss history, its drivers are still changing, and experts disagree about its size and timing. Its effects may also arrive through several channels at once, such as claims, asset values and reputation. These features rule out fitting a distribution to past losses, so the assessment rests on structured judgment.
- **Horizon scanning:** The organisation looks systematically beyond its current business for weak signals of change, using sources such as scientific literature, court decisions, regulatory consultations, technology trends and claims anomalies. A PESTLE checklist (political, economic, social, technological, legal and environmental) or a [[SWOT Analysis|SWOT analysis]] keeps the scan from missing whole categories.
- **Expert judgment:** Brainstorming workshops, structured interviews and expert panels draw on people who see different parts of the business. The Delphi technique asks a panel for anonymous estimates over several rounds, feeding back the group's answers between rounds, so that opinions converge without one dominant voice anchoring the rest.
- **Surveys:** External surveys show what the wider industry is worried about. The SOA, with the CAS and the CIA, runs an annual Emerging Risks Survey of risk managers that groups risks into economic, environmental, geopolitical, societal and technological categories and tracks how the top risks change from year to year.
- **Assessment:** Each candidate is scored for likelihood, impact and velocity, the speed with which the risk would affect the organisation once it materialises. A fast risk leaves no time to react, so velocity decides between risks of similar likelihood and impact. Some frameworks add proximity, how soon the risk could arise, or the organisation's preparedness.
- **Responses:** A high-priority emerging risk gets an owner, [[Key Risk Indicator|key risk indicators]] to monitor it, and [[Stress Testing|stress and scenario tests]] that explore its consequences. As data accumulates, the risk moves into the established [[Risk Taxonomies|risk taxonomy]] and is measured like any other, and a risk that fades is dropped from the list.
- **Interaction:** Emerging risks often matter most through their links with existing ones, so the assessment should ask how each one could amplify the others. That question is the subject of [[Compounding Risk|compounding risk]].

> [!example]- Ranking Three Emerging Risks on a Risk Register {Example}
> An insurer's emerging-risk committee scores three candidates on 1-to-5 scales.
>
> | Risk | Likelihood | Impact | Velocity |
> |---|---|---|---|
> | Failure of an AI underwriting model | 4 | 3 | 4 |
> | Climate-driven rise in heat mortality | 3 | 4 | 2 |
> | Antimicrobial-resistant pandemic | 2 | 5 | 3 |
>
> Rank the risks by likelihood times impact, then by the score that includes velocity. Explain why the rankings differ.
>
> > [!answer]-
> > Likelihood times impact gives 12, 12 and 10, so the AI and climate risks tie and the pandemic comes third. Multiplying by velocity separates them.
> > $$
> > \begin{align*}
> > S_{\text{AI}} &= 4 \times 3 \times 4 \\
> > &= 48 \\
> > S_{\text{climate}} &= 3 \times 4 \times 2 \\
> > &= 24 \\
> > S_{\text{pandemic}} &= 2 \times 5 \times 3 \\
> > &= 30
> > \end{align*}
> > $$
> > The AI model risk ranks first, the pandemic second and the climate risk third. A model failure could misprice a whole book within weeks, while the climate risk builds over decades and leaves time to adjust premiums and assumptions, so it falls to third even though it ties for first on likelihood and impact. The scores are ordinal, so the products rank the risks but don't measure them: a score of 48 is not twice as bad as 24.

> [!example]- Converting a Panel's Ten-Year Estimate to an Annual Probability {Example}
> After two Delphi rounds, an expert panel's median estimate is a 30% chance that a systemic cyber event causes the insurer a loss above \$50 million within the next 10 years. The capital model works with annual probabilities. Find the equivalent constant annual probability.
>
> > [!answer]-
> > The risk survives each year with the same probability, so ten survivals must leave 70%.
> > $$
> > \begin{align*}
> > p_{\text{annual}} &= 1 - (1 - 0.30)^{1/10} \\
> > &= 1 - 0.70^{0.1} \\
> > &= 0.0350
> > \end{align*}
> > $$
> > The annual probability is about 3.5%. Dividing 30% by 10 would understate it, because an annual chance of 3% gives only $1 - 0.97^{10} = 26\%$ over the decade: chances in different years overlap, so they don't simply add. The figure is still a judgment, so it should be reported with the panel's range and tested in scenarios rather than treated as a fitted parameter.

> [!tip]- How it appears on the exam
> - **CFE-101:** Questions ask candidates to detect emerging risks in a case study, describe identification techniques such as horizon scanning, the Delphi technique and industry surveys, and recommend how each risk should be monitored. A common follow-up asks candidates to assess and rank the risks they found using likelihood, impact and velocity, and to justify the ranking.
> - **Monitoring:** The third learning outcome of the risk identification section asks for a monitoring mechanism, which usually means proposing [[Key Risk Indicator|key risk indicators]] with thresholds and an owner for each emerging risk.

> [!warning]- Exam traps
> - **Treating scores as measurements:** Likelihood, impact and velocity scores are ordinal, so their product ranks risks but cannot be added across risks or used as an expected loss. Answers that sum scores into a total exposure lose marks.
> - **Ignoring velocity:** Two risks with the same likelihood and impact are not equally urgent if one arrives overnight. A ranking that leaves velocity out misses the reason a fast-moving risk needs controls in place before it occurs.
> - **Emerging versus new:** A familiar risk can be emerging when its drivers change, such as liability exposure under new court doctrines. Restricting the list to brand-new hazards misses most of the risks that hurt insurers.
> - **Identification without follow-up:** Naming a risk is not enough. A good answer assigns an owner, a monitoring mechanism and a trigger for reassessment, because an emerging risk's profile changes faster than the annual risk review.
