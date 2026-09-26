---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:481ebeac05ae329ef9380fee7e511c7511569ed8a9314f7b1e20f42204859ed0
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Regulator.md
---

**An Insurance Regulator** is a governmental agency with statutory authority over insurers — to license them, set and enforce capital and reporting requirements, review rates and policy forms, police market conduct, and take control of a failing company. In Canada that authority is split between [[OSFI]] (federal solvency) and each province's [[Superintendent of Insurance]]; in the United States it rests primarily with each state's insurance department, coordinated through the NAIC.

> $$\text{Canada} = \underbrace{\text{OSFI}}_{\text{solvency}} + \underbrace{\text{Provinces}}_{\text{licensing, conduct, rates}}$$
>
> $$\text{U.S.} = \underbrace{\text{Domiciliary state}}_{\text{solvency lead}} + \underbrace{\text{Each licensing state}}_{\text{rates, forms, conduct}}$$

- **United States.** Each state's department, headed by a commissioner (appointed in most states, elected in some), licenses insurers, reviews rates and forms, and conducts financial and market-conduct examinations. The McCarran-Ferguson Act (1945) leaves the business of insurance to the states: a federal statute does not override state insurance law unless it specifically relates to insurance, and federal [[Antitrust Law|antitrust law]] applies only to the extent the states do not regulate (boycott, coercion and intimidation excepted). The **domiciliary** state leads solvency supervision; every other state where the insurer is licensed regulates its rates and conduct there. See [[State and Federal Insurance Regulation]].
- **The NAIC is not a regulator.** It is the commissioners' association: it writes model laws, the [[NAIC Annual Statement]] and its instructions, the statutory accounting manual, the [[Risk-Based Capital|RBC]] formula and the [[IRIS Ratios]], and its accreditation program makes adoption of core solvency standards effectively mandatory. At federal level the Federal Insurance Office, created by [[Dodd-Frank]], monitors the industry but does not regulate it.
- **Canada.** [[OSFI]] supervises federally regulated insurers' solvency through the [[MCT]], guidelines and staged intervention; provincial regulators ([[Financial Services Regulatory Authority of Ontario|FSRA]], the [[Autorité des marchés financiers|AMF]] and others) license insurers, approve auto rates where required and police conduct, and prudentially supervise provincially incorporated insurers. The [[Canadian Council of Insurance Regulators]] coordinates them. See [[Insurance Regulation]].
- **What regulators require of the actuary.** In both countries the board must appoint a qualified actuary whose opinion on the reserves the regulator relies on. U.S.: the SAO attached to the Annual Statement, the confidential [[Actuarial Opinion Summary]], an [[Actuarial Report]] available by May 1, and notice to the domiciliary commissioner when the actuary is appointed or replaced. Canada: the [[Appointed Actuary]]'s opinion and report, [[FCT]], the [[Duty to Report]], and OSFI's qualification and [[Peer Review|peer review]] expectations.
- **Regulators, auditors and rating agencies** all assess the same insurer for different users. Only the regulator can compel: examinations, capital plans, restrictions on business, and ultimately rehabilitation or liquidation.

> [!example]- Which U.S. Regulator? {Example}
> An insurer domiciled in Iowa writes auto insurance in Iowa, Illinois and Texas. Identify the regulator for each: (1) its periodic financial examination; (2) a rate increase for Texas policies; (3) its RBC ratio falling to $140\%$ of Authorized Control Level; (4) a pattern of complaints from Illinois policyholders.
>
> > [!answer]-
> > 1. **Iowa**, the domiciliary state, leads the financial examination; other states rely on it.
> > 2. **Texas**, under its own rate law — the domiciliary state has no say over Texas rates.
> > 3. **Iowa.** At $140\%$ the insurer is below the $150\%$ Regulatory Action Level, so the domiciliary commissioner may examine it and order corrective action.
> > 4. **Illinois**, through a market-conduct examination.
> >
> > There is no single "U.S. regulator": solvency follows domicile, while rates and conduct follow the policyholder.

> [!example]- Why Regulators Watch the Actuary's Replacement {Example}
> After the Appointed Actuary tells management that carried reserves are near the bottom of the reasonable range, the board replaces the actuary. What must happen in each country, and why?
>
> > [!answer]-
> > **United States:** the insurer must notify the domiciliary insurance department within five business days, then within ten business days send a letter stating whether there were disagreements with the former actuary in the preceding $24$ months — over the opinion's type, scope, disclosures, risk of material adverse deviation or data quality — whether or not resolved. The former actuary is asked to respond, and both letters go to the commissioner.
> >
> > **Canada:** OSFI must be notified of the change in appointment, and the actuary is entitled to state the reasons — the protection that keeps a dismissal over a valuation visible.
> >
> > **Why:** both regimes are designed to stop **opinion shopping** — replacing an actuary until one signs the number management wants. The regulator cannot see every valuation, so it makes the removal of an inconvenient actuary impossible to hide.
