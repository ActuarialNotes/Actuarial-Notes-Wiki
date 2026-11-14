---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:9f293372ec199a418e58f11bae929be8dc4866b0846213b650255bd04afeb68a
  sources:
    - "CAS Enterprise Risk Management Committee, Overview of Enterprise Risk Management (CAS Forum, Summer 2003), pp.105, 109, 114, 122-123, 129, 131-132 (PDF pp.7, 11, 16, 24, 31, 33), sha256:f433c8300785640b2f4fd168d3b38878d1bfbc9b9f8f74c08e43de8e98982efd — https://www.casact.org/sites/default/files/database/forum_03sforum_03sf099.pdf"
    - "Rittenberg & Martens, Enterprise Risk Management - Understanding and Communicating Risk Appetite (COSO, Jan 2012), pp.1, 6, 11 (appetite definition; tolerance = acceptable level of variation relative to a specific objective), sha256:9d2780c3dae839afe27d56adb9461066548b9ace9c64b46369baf778570d0768 — https://www.coso.org/_files/ugd/3059fc_b0013c9344764b0b8c30a7eb7e5c27c9.pdf"
    - "COSO, Enterprise Risk Management: Integrating with Strategy and Performance, Executive Summary (June 2017), p.10 (performance component: prioritize by severity vs appetite, responses, portfolio view), sha256:2d4809dd09687d701944987f65ca6ddc39074a00236abebfd436d79f4563abd1 — https://www.coso.org/_files/ugd/3059fc_61ea5985b03c4293960642fdce408eaa.pdf"
    - "COSO, Enterprise Risk Management - Integrated Framework, Executive Summary (Sept 2004), p.1 (responses: avoidance, reduction, sharing, acceptance), sha256:aa3a3b5ce7f3f65731128f2145d7b99ee8f68dc9bb3e746be9de72e67684261c — https://www.coso.org/_files/ugd/3059fc_ae81f45d98474c9188045cbacbd510bf.pdf"
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s08 CRO integrates silos, sha256:d4360b972503a96e37389598cccade396a0e3625ed78dad905726181812db468 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s08-01-the-risk-management-function.html"
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s08 risk map of all risks, sha256:dec6416a8007b65db78c8e3f276df42752fe416836dc8624db763169180cc31c — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s08-02-beginning-steps-communication-.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Holistic Risk Treatment.md
---

**Holistic risk treatment** chooses how to treat an organization's risks by looking at all of them together, as one portfolio across every unit and category, instead of treating each risk separately in its own department or "silo". It is how [[Enterprise Risk Management|enterprise risk management]] carries out the treatment step of the [[Risk Management Process|risk management process]], judging each treatment by its effect on the whole organization's risk against the [[Risk Appetite|risk appetite]] the board has set.

If two units' results have [[Standard Deviation|standard deviations]] $\sigma_1$ and $\sigma_2$ and [[Correlation|correlation]] $\rho$, the standard deviation of the combined result is

> $$\sigma_P = \sqrt{\sigma_1^2 + \sigma_2^2 + 2\rho\,\sigma_1\sigma_2}$$

and it is never more than the sum of the parts:

> $$\sigma_P \leq \sigma_1 + \sigma_2$$

Only at $\rho = 1$ does the combined risk equal the sum of the parts. At $\rho = -1$ the risks are a perfect *natural hedge*. At $\rho = 0$ the combined risk is $\sqrt{\sigma_1^2 + \sigma_2^2}$, so for a correlation between 0 and 1 it lies between that value and the sum. With many risks the same idea uses a covariance matrix, whose number of entries grows with the square of the number of risks.

If the units' results are positively correlated, the organization can exceed its tolerance while no unit exceeds its limit.

> [!example]- How far is this manufacturer from its tolerance at each correlation? {Example}
> A manufacturer's two divisions have annual results with standard deviations of $\$6$ million and $\$8$ million. Each is inside the $\$9$ million limit set for a single division, but each division head plans to buy extra insurance. The board's tolerance for the whole company is a standard deviation of $\$10$ million. The correlation between the divisions is $-0.5$, $0$ or $0.5$.
>
> > [!answer]-
> > - At $\rho = -0.5$, $\sigma_P = \sqrt{36 + 64 - 48} = \sqrt{52} \approx 7.21$.
> > - At $\rho = 0$, $\sigma_P = \sqrt{36 + 64} = 10.00$.
> > - At $\rho = 0.5$, $\sigma_P = \sqrt{36 + 64 + 48} = \sqrt{148} \approx 12.17$.
> > - The simple sum, $\$14$ million, is never the company's risk.
> > - With $\rho = -0.5$ the divisions partly hedge each other and the company is well inside its tolerance, so the extra insurance each head wants buys little for the company.
> > - With $\rho = 0$ the company sits exactly at its tolerance.
> > - With $\rho = 0.5$ the company is \$2.17 million over tolerance even though each division is inside its own limit, so treatment is needed, chosen for the combined position rather than one purchase per division.

## The portfolio view

The CAS's 2003 ERM overview states three principles: portfolio risk is not the simple sum of the individual risks; understanding it needs the individual risks *and* their interactions; and the risk to the whole organization is what matters for its key decisions. Managing risks separately within silos is "inefficient at best, and can be counter-productive".

The chief risk officer's role is to integrate the silos, because risks interact. A flood can cause fires, and an earthquake that destroys a supplier can interrupt business far away.

## Natural hedges

Some risks offset each other. An insurer that sells both life insurance and annuities to similar customers hedges its mortality risk naturally, since longer lives cost the annuities what they save the life policies, so reinsuring the mortality risk of each product separately would be wasted money. Likewise a group with one division long a currency and another short the same currency does not need two hedges.

> [!example]- What is this insurer's net mortality exposure, and how should it treat it? {Example}
> An insurer writes life insurance and annuities to similar customers. If its customers live longer than expected, the life block gains $\$4$ million and the annuity block loses $\$5$ million. If they die sooner, the life block loses $\$4$ million and the annuity block gains $\$5$ million. Each product manager proposes reinsuring their block's mortality risk.
>
> > [!answer]-
> > - If customers live longer, the net result is $4 - 5 = -\$1$ million.
> > - If they die sooner, the net result is $-4 + 5 = +\$1$ million.
> > - Each block alone faces a swing of $\$4$ million or $\$5$ million, but the two move in opposite directions, so the net exposure is $\$1$ million either way.
> > - Reinsuring each block separately would pay to remove risk that the portfolio has already offset.
> > - The holistic treatment is to retain the hedged part and, if the remaining \$1 million exceeds the company's tolerance, treat only that.

## Concentrations

Correlation also works the other way. The CAS overview notes that inflation, a driver of claim costs in many business segments, is highly correlated with interest rates, a driver of asset values, and calls capturing such correlations "the essence of ERM". Small risks with high frequency in each department can add up to a severe one in the aggregate, which only a map of all the organization's risks shows ([[Risk Assessment]]).

## Risk appetite and risk tolerance

COSO defines risk appetite as "the amount of risk, on a broad level, an organization is willing to accept in pursuit of value", and risk tolerance as the acceptable level of variation for a specific objective. An organization has a portfolio of objectives and a portfolio of risks, so appetite has meaning at both levels. COSO's 2017 framework prioritizes risks by severity in the context of risk appetite, has management select responses, and then develops a portfolio view of the total risk assumed.

## Risk responses

The CAS overview lists the responses as avoiding, retaining (and financing), reducing, transferring or exploiting a risk. COSO's 2004 summary lists avoidance, reduction, sharing and acceptance. A holistic view still uses each of them ([[Risk Treatment]]). What changes is that each is chosen for its effect on the whole portfolio.

Insurance has been the main transfer mechanism for hazard risk, and capital markets for commodity, interest rate and currency risk. Operational and strategic risks have mostly had to be avoided or retained ([[Risk Classifications]]). Exploiting is the response a silo view misses. The overview's steel maker, expecting tariffs on foreign steel, locks in fixed prices with domestic suppliers.

## Integrated risk financing programs

Treating risks together changes how they are financed. In one CAS case a large retailer modelled its hazard and financial risks, individually and as an aggregate portfolio, and used the model to choose among insurance submissions, set retention levels, design an overall risk financing strategy and prioritize risk control. In another, a property-casualty insurer paired a more aggressive asset allocation with an integrated reinsurance program, including an integrated stop-loss cover with an investment hedge. The result is one program sized to the combined risk rather than separate purchases by each unit ([[Risk Diversification]]). The correlated capital models, economic capital and ORSA that apply this to an insurer are in [[Enterprise Risk Management]].

> [!trap] Adding the units' risks
> Adding the units' risks overstates the total unless they move perfectly together. Use the correlation. Two divisions with standard deviations of $\$6$ million and $\$8$ million have a combined risk of $\$14$ million only at $\rho = 1$.
