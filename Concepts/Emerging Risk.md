---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:97637d72c39dd0f9e61c6cfa50c668da8a51db5eeffea29445c8750f9cddbc02
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Emerging Risk.md
---

An **Emerging Risk** is a new risk, or a familiar risk changing in a new way, whose nature, likelihood and impact are not yet well understood, so that it cannot be measured with the data and models used for established risks. [[Enterprise Risk Management|ERM]] treats emerging risks as a distinct part of [[Risk Identification|risk identification]], spotting them early, judging which deserve attention, and watching them until they can be quantified or dismissed.

A risk is emerging when:

1. It has little or no loss history.
2. Its drivers are still changing.
3. Experts disagree about its size and timing.
4. Its effects may arrive through several channels at once, such as claims, asset values and reputation.

These features rule out fitting a distribution to past losses, so the assessment rests on structured judgment. Climate change, artificial intelligence, antimicrobial resistance and shifts in social attitudes to litigation have each been emerging risks for insurers. A familiar risk can be emerging when its drivers change, such as liability exposure under new court doctrines.

> [!example]- Is a rise in liability claims after a new court doctrine an emerging risk, although liability is an established line? {Example}
> - The hazard is familiar, but its driver, the court doctrine, has changed in a new way.
> - The insurer's loss history predates the doctrine, so it says little about the new size and timing of claims.
> - The risk is emerging. Restricting the list to brand-new hazards misses most of the risks that hurt insurers.

## Identifying emerging risks

**Horizon scanning** looks systematically beyond the current business for weak signals of change, using sources such as scientific literature, court decisions, regulatory consultations, technology trends and claims anomalies. A PESTLE checklist (political, economic, social, technological, legal and environmental) or a [[SWOT Analysis|SWOT analysis]] keeps the scan from missing whole categories.

**Expert judgment** draws on people who see different parts of the business, through brainstorming workshops, structured interviews and expert panels. The **Delphi technique** asks a panel for anonymous estimates over several rounds, feeding back the group's answers between rounds, so that opinions converge without one dominant voice anchoring the rest.

**Surveys** show what the wider industry is worried about. The SOA, with the CAS and the CIA, runs an annual Emerging Risks Survey of risk managers that groups risks into economic, environmental, geopolitical, societal and technological categories and tracks how the top risks change from year to year.

## Assessing emerging risks

Each candidate on a risk register is scored for likelihood, impact and velocity, each on an ordinal scale such as 1 to 5 agreed in advance. Velocity is the speed with which the risk would affect the organisation once it materialises. The priority score of candidate risk $k$ is

> $$S_k = L_k \times I_k \times V_k$$

- $L_k$, $I_k$ and $V_k$ are its likelihood, impact and velocity scores.

A fast risk leaves no time to react, so velocity decides between risks of similar likelihood and impact. Some frameworks add proximity, how soon the risk could arise, or the organisation's preparedness.

> [!example]- How do these three emerging risks rank by likelihood times impact, and by the score that includes velocity? {Example}
> An insurer's emerging-risk committee scores three candidates on 1-to-5 scales:
>
> | Risk | Likelihood | Impact | Velocity |
> | :--- | ---: | ---: | ---: |
> | Failure of an AI underwriting model | 4 | 3 | 4 |
> | Climate-driven rise in heat mortality | 3 | 4 | 2 |
> | Antimicrobial-resistant pandemic | 2 | 5 | 3 |
>
> > [!answer]-
> > - Likelihood times impact gives 12, 12 and 10, so the AI and climate risks tie and the pandemic comes third.
> > - With velocity, $S_{\text{AI}} = 4 \times 3 \times 4 = 48$.
> > - $S_{\text{climate}} = 3 \times 4 \times 2 = 24$.
> > - $S_{\text{pandemic}} = 2 \times 5 \times 3 = 30$.
> > - A model failure could misprice a whole book within weeks, while the climate risk builds over decades and leaves time to adjust premiums and assumptions.
> > - The AI model risk ranks first, the pandemic second and the climate risk third.

## Converting an expert estimate to an annual probability

An expert's estimate is often a probability $p_T$ that the risk crystallises within a horizon of $T$ years. The equivalent constant annual probability, which can be compared with the annual measures used in [[Economic Capital|economic capital]], is

> $$p_{\text{annual}} = 1 - \left(1 - p_T\right)^{1/T}$$

Dividing $p_T$ by $T$ understates it, because chances in different years overlap and don't simply add. The figure is still a judgment, so it is reported with the panel's range and tested in scenarios rather than treated as a fitted parameter.

> [!example]- A Delphi panel gives a 30% chance of a systemic cyber loss within 10 years. What is the equivalent annual probability? {Example}
> - The risk is avoided each year with the same probability, so ten years must leave $70\%$.
> - The annual probability is $1 - 0.70^{0.1} = 0.0350$, about $3.5\%$.
> - Dividing $30\%$ by 10 gives $3\%$, but an annual chance of $3\%$ gives only $1 - 0.97^{10} = 26\%$ over the decade.

## Responding to emerging risks

A high-priority emerging risk gets an owner, [[Key Risk Indicator|key risk indicators]] with thresholds to monitor it, a trigger for reassessment, and [[Stress Testing|stress and scenario tests]] that explore its consequences. An emerging risk's profile changes faster than the annual risk review. As data accumulates, the risk moves into the established [[Risk Taxonomies|risk taxonomy]] and is measured like any other, and a risk that fades is dropped from the list.

Emerging risks often matter most through their links with existing ones, so the assessment asks how each one could amplify the others. That question is the subject of [[Compounding Risk|compounding risk]].

> [!trap] Treating scores as measurements
> Likelihood, impact and velocity scores are ordinal, so their product ranks risks but doesn't measure them. A score of 48 is not twice as bad as 24, and scores can't be summed across risks into a total exposure or used as an expected loss.
