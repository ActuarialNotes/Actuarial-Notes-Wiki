---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:f92369bf93a0feb9c2e693e778413faa288174d51f71dea60879d69a31f7968e
  sources:
    - "CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), pp.104-109 (forces behind ERM; CAS ERM definition p.109), sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf"
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s08-01 traditional function: owner in small firms, reports to treasurer, CRO integrates silos, sha256:d4360b972503a96e37389598cccade396a0e3625ed78dad905726181812db468 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s08-01-the-risk-management-function.html"
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s05-04 rating organizations expect ERM activities, sha256:4d894cf157c8f6b7a4c620f551f76e788a2b6fb98bf979d3cbe23c3f32071592 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s05-04-types-of-risks-risk-exposures.html"
    - "European Union Agency for Railways, terminology entry \"Risk management\" quoting ISO 31000:2018(en) 3.2, entry, sha256:851374b90fb0a3671e5e38bc7ecd643401e7135818498c432ff45f7f18e0cf85 — https://www.era.europa.eu/era-railway-terminology-collection/riskmanagement/term/sms_safety_culture_human_and_organisational_factor"
    - "NC State ERM Initiative, \"ISO's Risk Management Framework\" (summary of ISO 31000:2018), process elements, sha256:d225c2986035263284b625785ad916009690b86e1285788533c2467438c02a48 — https://erm.ncsu.edu/resource-center/isos-risk-management-framework"
    - "COSO, Enterprise Risk Management: Integrating with Strategy and Performance, Executive Summary (June 2017), pp.6-7 (five components, twenty principles), sha256:2d4809dd09687d701944987f65ca6ddc39074a00236abebfd436d79f4563abd1 — https://www.coso.org/_files/ugd/3059fc_61ea5985b03c4293960642fdce408eaa.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Risk Management.md
---
**Risk Management** is, in the words of ISO 31000, the "coordinated activities to direct and control an organization with regard to [[Risk|risk]]", and its purpose is to create and protect value. An organization practices it as a management discipline, through a risk manager or chief risk officer, a stated policy and a repeating [[Risk Management Process|process]].

The environment it works in has moved from buying insurance for pure loss exposures toward [[Enterprise Risk Management|enterprise risk management]], which treats every source of risk, with its upside as well as its downside, as one portfolio:

| | Traditional risk management | Enterprise risk management |
| :--- | :--- | :--- |
| Risks covered | Specific pure risks | Hazard, financial, operational and strategic risks together |
| Main tools | Insurance and loss control | Every treatment, insurance among them |
| View of risk | Something to minimize or avoid | A threat, and also an opportunity |
| Who leads it | A risk manager reporting to the treasurer | A chief risk officer on the executive team |

Risk management grew out of corporate insurance buying. The risk manager was responsible for specific pure risks, mainly by buying insurance and running loss control to keep employees and property safe, and typically reported to the treasurer.

> [!example]- What would change for this food distributor under enterprise risk management? {Example}
> A food distributor's risk manager reports to the treasurer and is responsible for buying property, auto and liability insurance and for the safety program. The board asks what would change under enterprise risk management.
>
> > [!answer]-
> > - Under the traditional approach the risk manager handles hazard risks, the pure loss exposures that insurance and loss control address.
> > - Fuel prices, customer concentration, a failure of the routing software and the loss of a major contract are managed, if at all, by other departments separately.
> > - Under ERM a chief risk officer on the executive team oversees all these risks together: hazard, financial, operational and strategic.
> > - The company can then see that a fuel price spike and a slowdown in demand may hit at the same time, that some risks offset each other, and that some, such as expanding into a market it knows well, are worth taking.
> > - Insurance remains one of the tools, but it is no longer the whole of the program.

## Who manages risk

In a sole proprietorship or small company the owner performs the risk management function. Larger organizations have a risk manager, and those practicing ERM a chief risk officer on the executive team. The authority of each is set by a policy statement from top management. A risk manager may decide routine matters, such as which small losses to retain, and only recommend larger ones.

## Forces behind enterprise risk management

The CAS's 2003 overview of ERM names the forces behind the move to a broader view:

1. **More, and more complicated, risks.** Hazard risks such as fire and product liability have long been managed, but financial risks grew in importance, and new risks such as foreign exchange came with globalization. High-profile failures of control (Barings Bank, Enron) and of understanding a business (Long Term Capital Management) raised awareness of operational and strategic risks.
2. **External pressures.** Regulators, rating agencies, stock exchanges, institutional investors and corporate governance bodies came to insist that senior management take responsibility for managing risk across the whole enterprise. Firms evaluated by credit rating organizations are expected to show their ERM activities, and shareholders of public companies want stable, predictable earnings.
3. **A portfolio point of view.** Following modern portfolio theory, the risk of the whole organization is not the simple sum of its parts, and risks that offset each other are natural hedges. Managing risks in separate silos can therefore be inefficient or even counterproductive.
4. **Quantification.** Catastrophe modeling, which spread after Hurricane Andrew in 1992, and value at risk in banking made it easier to quantify risks, though operational and strategic risks remain hard to measure ([[Risk Measure]]).
5. **Boundaryless benchmarking.** ERM tools and processes are shared across industries and countries, not confined to insurance.
6. **Risk as opportunity.** Organizations once took a defensive posture, seeing risk as something to minimize or avoid. Many now also keep or pursue risks they have a special ability to manage, so risk management can create value as well as protect it ([[Risk Management Objectives]]).

The organization's risk depends on how its risks interact, so the total can be less (offsetting risks) or more (correlated risks) than the parts suggest.

> [!example]- Which force behind enterprise risk management does each of these developments reflect? {Example}
> A mid-sized manufacturer sees four developments:
>
> 1. The rating agency that rates its bonds now asks for a description of how the board oversees the company's major risks.
> 2. Its two divisions each planned to hedge the same currency, one exposure long and one short, until the new chief risk officer combined them.
> 3. It begins using vendor catastrophe models to estimate its plants' earthquake exposure.
> 4. It decides to keep its workers compensation risk, which it understands well, and to bid for contracts its competitors avoid because of their safety demands.
>
> > [!answer]-
> > - The rating agency's request is an external pressure: an outside party insists that senior management take responsibility for enterprise-wide risk.
> > - The combined hedge is the portfolio point of view: the divisions' exposures offset, so separate hedges cost money without reducing the company's net risk.
> > - The catastrophe models are quantification: they make a rare, severe risk measurable.
> > - Keeping the workers compensation risk is risk as opportunity: the company keeps a risk it can manage better than others and uses that ability for competitive advantage.

## Frameworks

ISO 31000 (2018) sets principles, a framework and a process. COSO's 2017 framework, *Enterprise Risk Management: Integrating with Strategy and Performance*, organizes ERM into five components supported by twenty principles. The CAS defines ERM as the discipline by which an organization assesses, controls, exploits, finances and monitors risks from all sources to increase its value to its stakeholders.

## The risk management process

Risks are classified by type ([[Risk Taxonomies]]) and measured ([[Risk Measure]]). The process identifies them ([[Risk Identification]]), assesses them ([[Risk Assessment]]), treats them ([[Risk Treatment]], [[Risk Control]], [[Risk Transfer]]) and monitors the results. [[Business Continuity Management|Business continuity management]], with its [[Business Continuity Plan|business continuity plan]], and [[Organizational Resilience|organizational resilience]] prepare the organization for disruption.

> [!trap] Equating risk management with insurance buying
> Insurance is one technique among many. An answer that equates managing a risk with insuring it describes the traditional role the course contrasts with ERM.
