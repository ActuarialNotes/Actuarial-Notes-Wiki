---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:05d8bc3ac3a10986a2a59162e10d92dac4fa5dafd9f0de22738b750416b610f6
  sources:
    - "NAIC, Automobile Insurance: A Shopping Tool for Consumers (© 2014; Colorado DOI copy), pp.12-13, 17 (printed 10-11, 15), sha256:b03458a5fdf0192a263ce489c66c4c4d50cebc54a90916f3e18b266f30073977 — https://doi.colorado.gov/sites/doi/files/documents/Buyers%20Guide%20to%20Auto%20Insurance.pdf"
    - "ISO PP 00 01 09 18 Personal Auto Policy (Virginia SCC specimen), Part F Termination A-B, sha256:20a8001d97dcc09d70ab2a76579414c3b869ecb4afe23d2446b844ad4c7780c8 — https://www.scc.virginia.gov/media/sccvirginiagov-home/regulated-industries/insurance/insurance-companies/property-casualty-companies/personal-commercial-auto-forms/pp-00-01-09-18.pdf"
    - "New York Insurance Law §3425(c)(1), (d)(1), (f)(1)-(2) (NY Senate site; read via WebFetch 2026-10-10 — the scripted fetch was refused 403, so no sha256) — https://www.nysenate.gov/legislation/laws/ISC/3425"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating (CAS Monograph 5, 2nd ed.), pp.4-5 (PDF pp.14-15), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "FTC, Credit-Based Insurance Scores: Impacts on Consumers of Automobile Insurance (Report to Congress, July 2007), p.29 (Hawaii by statute; California, Massachusetts), sha256:4ab0292ce105ff017feb03304dd6f89120b87fa76f8afea1594d7f2c7cbeb05d — https://www.ftc.gov/sites/default/files/documents/reports/credit-based-insurance-scores-impacts-consumers-automobile-insurance-report-congress-federal-trade/p044804facta_report_credit-based_insurance_scores.pdf"
    - "IRMI Glossary, 'assigned risk plan', entry, sha256:b73e8f7c5737d90162c6e7c7cd52ddd8261413a8690d122faabd5d13f0992fad — https://www.irmi.com/term/insurance-definitions/assigned-risk-plan"
    - "IRMI Glossary, 'residual market', entry, sha256:52e4a41b843097cd006cc271375fceca16e41a5dbb4cecfd58f1a58dd19fcee5 — https://www.irmi.com/term/insurance-definitions/residual-market"
    - "Maryland DBM FY2024 operating budget, Maryland Automobile Insurance Fund, Insured Division, sha256:437ad83c90f881c250ec232531ed2df932434a466b22177563d20ed75fc104f2 — https://dbm.maryland.gov/budget/Documents/operbudget/2024/agency/MarylandAutomobileInsuranceFund.pdf"
    - "IRMI Glossary, 'motor vehicle record (MVR)', entry, sha256:b8eac348a0f86568d7e92079c070b64dd60e132e3b3b580e6fc61e1a4892e035 — https://www.irmi.com/term/insurance-definitions/motor-vehicle-record"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Personal Auto Underwriting.md
---

**Personal Auto Underwriting** is an insurer's decision whether to write a private passenger auto applicant under the [[Personal Auto Policy|personal auto policy]], in which risk tier, and at what price. State law limits which factors may be used and when a policy, once written, may be cancelled or nonrenewed.

The same information decides both questions: whether to insure the applicant, and how much to charge. In a multiplicative rating plan the premium is

> $$\text{Premium} = \text{Base rate} \times \prod_k f_k$$

- $f_k$ is the relativity for the applicant's level of rating factor $k$, such as driver age, driving record or territory.

Most insurers use a multiplicative plan like this, often fitted with a log-link [[Generalized Linear Model|GLM]], so a violation surcharge is a percentage of the premium rather than a flat amount.

> [!example]- What is this applicant's premium, and what is it in a state that bars credit in auto rating? {Example}
> An insurer's base liability rate is \$600. A 19-year-old applicant has (hypothetical) relativities of 1.40 for age and experience, 1.25 for one at-fault accident, 1.10 for territory, 1.05 for commuting use and 0.90 for a favorable insurance score.
>
> > [!answer]-
> > - The premium is $600 \times 1.40 \times 1.25 \times 1.10 \times 1.05 \times 0.90 = \$1{,}091.48$.
> > - Without the credit factor the 0.90 drops out, and the premium is $1{,}091.48 / 0.90 = 1{,}212.75$.
> > - The applicant's good credit can't offset the accident in that state.

## Underwriting factors

The factors an underwriter weighs are:

1. **Driving record.** Convictions for speeding and other violations, and accidents the driver caused, raise the premium for every driver insured on the policy. Insurers get conviction records from the state Department of Motor Vehicles (the motor vehicle report) and claims histories from third-party databases such as CLUE.
2. **Driver characteristics.** Age, years of driving experience, gender and marital status are common factors where a state permits them. Younger and less experienced drivers generally pay more.
3. **The vehicle and its use.** [[Vehicle Make and Model|Cars]] that cost more to repair or replace, new cars and cars often stolen are rated higher, while alarms and better passenger protection earn lower rates. More annual mileage and business use raise the premium, and some insurers price on driving measured by a device in the car.
4. **Territory.** The garaging address places the car in a territory whose claims experience sets its relativity, and urban territories generally cost more than suburban or rural ones ([[Territorial Rating]]).
5. **Insurance score and education.** Where state law allows, insurers may use an insurance credit score or the applicant's education. A few states bar credit in private passenger auto ([[Credit-Based Insurance Scoring]]).
6. **Prior coverage.** An applicant with no prior insurance, a new driver, or one with a poor record may not find coverage in the voluntary market.

## The principal operator

When a household has more than one driver and car, the insurer's principal operator rule decides which driver rates each car: some insurers use the driver who uses the car most, and others the highest-risk driver, usually the youngest. Only that driver's relativity is applied to the car.

> [!example]- What is this car's premium under a most-use rule and under a highest-risk rule? {Example}
> A household insures a sports car with a (hypothetical) base premium of \$800 and a vehicle relativity of 1.20. The parent drives it almost every day, with a driver relativity of 1.00. The 17-year-old drives it now and then, with a relativity of 1.80.
>
> > [!answer]-
> > - Under a most-use rule the parent rates the car, so the premium is $800 \times 1.20 \times 1.00 = \$960$.
> > - Under a highest-risk rule the teenager rates it, so the premium is $800 \times 1.20 \times 1.80 = \$1{,}728$.
> > - The household pays \$768 more at the insurer that rates the car on the teenager, even though the parent drives it most.

## Cancellation and nonrenewal

The ISO policy lets the insurer cancel for any reason during the first 60 days of a new policy, but after that, or at any time on a renewal, only for nonpayment, a suspended or revoked license of a driver in the household or a regular driver of the car, or material misrepresentation. A ticket is none of these. The insurer can reflect it in the renewal price or consider nonrenewal. Nonrenewal needs at least 20 days' notice ([[PAP Duties and General Provisions]]).

States regulate termination and often go further. New York requires nonrenewal notice 45 to 60 days before the policy ends. It limits an insurer's nonrenewals and conditional renewals of auto policies to 2% of its covered policies in each rating territory each year, with one more allowed for every two new policies it voluntarily writes there. Underwriting therefore matters most before the policy is written.

> [!example]- May this New York insurer act in each case? {Example}
> The insurer wrote a new auto policy 90 days ago. (a) It learns the named insured got a speeding ticket last month. (b) The premium is unpaid. (c) It wants to nonrenew 1,500 of the 50,000 auto policies it has in one rating territory this year, having written no new policies there.
>
> > [!answer]-
> > - (a) No. After 60 days a ticket is not a permitted reason to cancel.
> > - (b) Yes. Nonpayment of premium is a permitted reason, and the notice must state the amount due.
> > - (c) Not all of them. Nonrenewals are capped at $0.02 \times 50{,}000 = 1{,}000$ policies in the territory.

## The residual market

Because auto liability insurance is required in most states, drivers the voluntary market declines need access to it, at a higher premium. An assigned risk plan shares them among all insurers writing auto in the state, and other states use a joint underwriting association, a reinsurance facility or a state fund such as the Maryland Automobile Insurance Fund ([[Automobile Plans]]).

> [!trap] Sending a declined driver to the guaranty fund
> A [[Guaranty Funds|guaranty fund]] pays claims of insolvent insurers. A driver who can't buy coverage goes to the assigned risk plan or the state's other residual mechanism.
