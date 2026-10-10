---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:c3608b73fbb7efdff518ebcd26c1d78ed13d0106bfeda9b4669ca63e61a11efa
  sources:
    - "15 U.S.C. s.1012 (McCarran-Ferguson Act), via LII, section text and notes, sha256:535ac29a8bf43a413de01cd9bf4496970aff48d88a47c87cfbf296696012ef32 — https://www.law.cornell.edu/uscode/text/15/1012"
    - "15 U.S.C. s.1013 (McCarran-Ferguson Act), via LII, section text and notes, sha256:12aef39131def2a132d65c7de84d47975d9938b1a5765a660f036c6b1efa0e6c — https://www.law.cornell.edu/uscode/text/15/1013"
    - "31 U.S.C. s.313 (Federal Insurance Office), via LII, subsection (c), sha256:9f170b74e80f0454bfd17f9b05bc4b63940b4e9bcc7ea477203b184ac5d64629 — https://www.law.cornell.edu/uscode/text/31/313"
    - "Faegre Drinker, \"Election Night for Insurance Geeks\" (Sept 2018, rank 3), elected vs appointed commissioners, sha256:4fe7458510362a9b5f7ae5c4c68a188c9e8add4a3a2e3c611fce6b38da6618ef — https://www.faegredrinker.com/en/insights/publications/2018/9/election-night-for-insurance-geeks-state-insurance-commissioner-seats-up-for-grabs-in-november"
    - "NAIC Risk-Based Capital (RBC) for Insurers Model Act (#312), s.1 definitions (Regulatory Action Level RBC = 1.5 x ACL; P&C trend test band), s.4, sha256:973063eff4e1d044765b1d06e88d025da452d900d587faadd85528ba4c45bf63 — https://content.naic.org/sites/default/files/model-law-312.pdf"
    - "NAIC 2025 P&C Statement of Actuarial Opinion Instructions (exposure draft), paras 1 (appointment, replacement letters), Actuarial Report (May 1), sha256:a9e51366f82d79c99aa58d7725c76147e66126313f830d162fb39dd2c691a16d — https://content.naic.org/sites/default/files/call_materials/027_Property_2025_Actuarial_Opinion_01272025_0.pdf"
    - "Insurance Companies Act (S.C. 1991, c. 47), Justice Laws full text, ss.357, 363-364, 369, sha256:9c041a9b453cb6cd89fbe883b60546990c43aa794a458cf5fde014225b17b1a2 — https://laws-lois.justice.gc.ca/eng/acts/I-11.8/FullText.html"
    - "OSFI Backgrounder: Guideline E-15 changes, whole page, sha256:6d4bab8a248063af7368e4dbf1dd4b1f79e3ea5445dd68e04b73f9ae0a95dc7d — https://www.osfi-bsif.gc.ca/en/news/backgrounder-guideline-e-15-appointed-actuary-legal-requirements-qualifications-peer-review"
    - "OSFI Minimum Capital Test Guideline (2026), chapter 1 overview, sha256:80450516aa1bb0a7534ceedcf50e39966406ecdcd52d0109af4a94d3439959ce — https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/minimum-capital-test-guideline-2026"
    - "OSFI Guide to Intervention, overview, sha256:e25219d08ef1ddace65847e66bf6b98dbf122cb09ef3841dadce1d0c672750ee — https://www.osfi-bsif.gc.ca/en/supervision/guide-intervention-federally-regulated-life-insurance-companies"
    - "CCIR, About, whole page, sha256:ae0d1b2e5c6521cb423a1785ca96dfb7b38931fcc97a9bd5399089a8bae1c94c — https://www.ccir-ccrra.org/AboutCCIR"
    - "S. Harrington, testimony to Senate Banking Committee, July 18 2006, PDF pp.3-4, 9, sha256:b9f8f73ee163f8da541f0b1eac83254cafbcf66cdd8e508c0fb8e770a7fcf20c — https://www.banking.senate.gov/download/harrington-july-18-2006&download=1"
    - "NAIC testimony (Csiszar), Senate Commerce Committee, Oct 22 2003, PDF p.3 (\"one overriding reason\"); p.5 (UCAA), sha256:b465c2a47d11ff54d304ff2c91a26987265d74208a77e37fdb2c6c65157c1d1a — https://content.naic.org/sites/default/files/naic_archive/testimony_0310_csiszar.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Regulator.md
---

**An Insurance Regulator** is a governmental agency with statutory authority over insurers — to license them, set and enforce capital and reporting requirements, review rates and policy forms, police market conduct, and take control of a failing company. In Canada that authority is split between [[OSFI]] (federal solvency) and each province's [[Superintendent of Insurance]]; in the United States it rests primarily with each state's insurance department, coordinated through the NAIC.

> $$\text{Canada} = \underbrace{\text{OSFI}}_{\text{solvency}} + \underbrace{\text{Provinces}}_{\text{licensing, conduct, rates}}$$
>
> $$\text{U.S.} = \underbrace{\text{Domiciliary state}}_{\text{solvency lead}} + \underbrace{\text{Each licensing state}}_{\text{rates, forms, conduct}}$$

- **United States.** Each state's department, headed by a commissioner (appointed in most states, elected in some), licenses insurers, reviews rates and forms, and conducts financial and market-conduct examinations. The McCarran-Ferguson Act (1945) leaves the business of insurance to the states: a federal statute does not override state insurance law unless it specifically relates to insurance, and federal [[Antitrust Law|antitrust law]] applies only to the extent the states do not regulate (boycott, coercion and intimidation excepted, and since 2021 health insurance, 15 U.S.C. 1013(c)). The **domiciliary** state leads solvency supervision; every other state where the insurer is licensed regulates its rates and conduct there. See [[State and Federal Insurance Regulation]].
- **The NAIC is not a regulator.** It is the commissioners' association: it writes model laws, the [[NAIC Annual Statement]] and its instructions, the statutory accounting manual, the [[Risk-Based Capital|RBC]] formula and the [[IRIS Ratios]], and its accreditation program makes adoption of core solvency standards effectively mandatory. At federal level the Federal Insurance Office, created by [[Dodd-Frank]], monitors the industry but does not regulate it.
- **Canada.** [[OSFI]] supervises federally regulated insurers' solvency through the [[MCT]], guidelines and staged intervention; provincial regulators ([[Financial Services Regulatory Authority of Ontario|FSRA]], the [[Autorité des marchés financiers|AMF]] and others) license insurers, approve auto rates where required and police conduct, and prudentially supervise provincially incorporated insurers. The [[Canadian Council of Insurance Regulators]] coordinates them. See [[Insurance Regulation]].
- **What regulators require of the actuary.** In both countries the board must appoint a qualified actuary whose opinion on the reserves the regulator relies on. U.S.: the SAO attached to the Annual Statement, the confidential [[Actuarial Opinion Summary]], an [[Actuarial Report]] available by May 1, and notice to the domiciliary commissioner when the actuary is appointed or replaced. Canada: the [[Appointed Actuary]]'s opinion and report, [[FCT]], the [[Duty to Report]], and OSFI's qualification and [[Peer Review|peer review]] expectations (OSFI is eliminating the peer review requirement under Guideline E-15 from January 1, 2027, keeping the Superintendent's power to request one).
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
> > **Canada:** OSFI must be notified of the change in appointment, and an actuary whose appointment is revoked must submit a written statement of the circumstances and reasons to the directors and the Superintendent (Insurance Companies Act s.363); a replacement may not accept the appointment before receiving it — the protection that keeps a dismissal over a valuation visible.
> >
> > **Why:** both regimes are designed to stop **opinion shopping** — replacing an actuary until one signs the number management wants. The regulator cannot see every valuation, so it makes the removal of an inconvenient actuary impossible to hide.

> [!tip]- How it appears on the exam
> - **DISC-IA:** The Insurance Regulation section asks who the insurance regulators are. Questions ask what a state insurance department and its commissioner do, why the NAIC is not itself a regulator, and which state regulates a given activity of a multistate insurer, as in the first example.
> - **Related objectives:** Why they regulate is on [[Reasons for Insurance Regulation]]; what they do is spread over [[Insurance Licensing]], [[Solvency Monitoring]], [[State Rating Laws]], [[Policy Form Regulation]] and [[State Market Conduct Regulation]].
