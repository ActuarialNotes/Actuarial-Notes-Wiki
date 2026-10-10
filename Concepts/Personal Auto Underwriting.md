---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:e15fd191b87d7325bbfbaacfee85e6ff7f154ca0dbfeffdd45b15f20151814f0
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

**Personal Auto Underwriting** is an insurer's decision whether to write a private passenger auto applicant under the [[Personal Auto Policy|personal auto policy]], in which risk tier, and at what price. It rests on the drivers' records and characteristics, the vehicle and its use, where it is garaged, prior coverage and, where state law allows, an insurance credit score. State law limits which factors may be used and when a policy, once written, may be cancelled or nonrenewed. Drivers the voluntary market declines are insured through a residual market.

> $$\text{Premium} = \text{Base rate} \times \prod_k f_k$$

- **Symbols:** $f_k$ is the relativity for the applicant's level of rating factor $k$, such as driver age, driving record or territory. Most insurers use a multiplicative plan like this, often fitted with a log-link [[Generalized Linear Model|GLM]], so a violation surcharge is a percentage of the premium rather than a flat amount. The same information decides both questions: whether to insure the applicant, and how much to charge.
- **Driving record:** Convictions for speeding and other violations, and accidents the driver caused, raise the premium for every driver insured on the policy. Insurers get conviction records from the state Department of Motor Vehicles (the motor vehicle report) and claims histories from third-party databases such as CLUE.
- **Driver characteristics:** Age, years of driving experience, gender and marital status are common factors where a state permits them. Younger and less experienced drivers generally pay more. When a household has more than one driver and car, the insurer's principal operator rule decides which driver rates each car: some insurers use the driver who uses the car most, and others the highest-risk driver, usually the youngest.
- **The vehicle and its use:** [[Vehicle Make and Model|Cars]] that cost more to repair or replace, new cars and cars often stolen are rated higher, as are some features such as all-wheel drive or sports models, while alarms and better passenger protection earn lower rates. More annual mileage and business use raise the premium, and some insurers price on driving measured by a device in the car.
- **Territory:** The garaging address places the car in a territory whose claims experience sets its relativity, and urban territories generally cost more than suburban or rural ones ([[Territorial Rating]]).
- **Insurance score and education:** Where state law allows, insurers may use an insurance credit score or the applicant's education. Credit use is governed by the federal Fair Credit Reporting Act and by state laws, and a few states bar it in private passenger auto ([[Credit-Based Insurance Scoring]]).
- **Prior coverage:** An applicant with no prior insurance, a new driver, or one with a poor record may not find coverage in the voluntary market. The consumer's route is the state's program for high-risk drivers, at a higher premium.
- **Cancellation and nonrenewal:** The ISO policy lets the insurer cancel for any reason during the first 60 days of a new policy, but after that, or at any time on a renewal, only for nonpayment, a suspended or revoked license of a driver in the household or a regular driver of the car, or material misrepresentation. Nonrenewal needs at least 20 days' notice ([[PAP Duties and General Provisions]]). States regulate termination and often go further. New York, for example, requires nonrenewal notice 45 to 60 days before the policy ends, and limits an insurer's nonrenewals and conditional renewals of auto policies to 2% of its covered policies in each rating territory each year, with one more allowed for every two new policies it voluntarily writes there, under a formula the superintendent sets. Underwriting therefore matters most **before** the policy is written.
- **The residual market:** Because auto liability insurance is required in most states, drivers with poor loss histories need access to it. An assigned risk plan shares them among all insurers writing auto in the state, and other states use a joint underwriting association, a reinsurance facility or a state fund such as the Maryland Automobile Insurance Fund ([[Automobile Plans]]).

> [!example]- Pricing an Applicant {Example}
> An insurer's base liability rate is \$600. A 19-year-old applicant has (hypothetical) relativities of 1.40 for age and experience, 1.25 for one at-fault accident, 1.10 for territory, 1.05 for commuting use and 0.90 for a favorable insurance score. Find the premium, and the premium in a state that bars credit in auto rating, with the other relativities unchanged.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Premium} &= 600 \times 1.40 \times 1.25 \times 1.10 \times 1.05 \times 0.90 \\
> > &= 1{,}091.48
> > \end{align*}
> > $$
> > Without the credit factor the 0.90 drops out, and the premium is $1{,}091.48 / 0.90 = 1{,}212.75$. The applicant's good credit can't offset the accident in that state, and the insurer must decide whether the price still fits its guidelines for a young driver with an at-fault accident.

> [!example]- Which Driver Rates the Car? {Example}
> A household insures a sports car with a (hypothetical) base premium of \$800 and a vehicle relativity of 1.20. The parent drives it almost every day, with a driver relativity of 1.00, and the 17-year-old drives it now and then, with a relativity of 1.80. Find the car's premium under a most-use principal operator rule and under a highest-risk rule.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Most use} &= 800 \times 1.20 \times 1.00 \\
> > &= 960 \\
> > \text{Highest risk} &= 800 \times 1.20 \times 1.80 \\
> > &= 1{,}728
> > \end{align*}
> > $$
> > The same household pays \$768 more for the car at an insurer that rates it on the teenager, even though the parent drives it most.

> [!example]- Can the Insurer Get Off the Risk? {Example}
> A New York insurer wrote a new auto policy 90 days ago. Decide whether it may act if (a) it learns the named insured got a speeding ticket last month; (b) the premium is unpaid; (c) it wants to nonrenew 1,500 of the 50,000 auto policies it has in one rating territory this year, having written no new policies there.
>
> > [!answer]-
> > - **(a) No:** After 60 days, a policy may be cancelled only for nonpayment, a suspended or revoked license, or fraud or material misrepresentation. A ticket is none of these. The insurer can reflect it in the renewal price or consider nonrenewal.
> > - **(b) Yes:** Nonpayment of premium is a permitted reason, and the notice must state the amount due.
> > - **(c) Not all of them:** Nonrenewals are capped at 2% of covered policies in the territory, $0.02 \times 50{,}000 = 1{,}000$, unless it earns more by writing new policies there.

> [!tip]- How it appears on the exam
> - **DISC-RM:** The objective is underwriting personal auto insurance. Questions describe an applicant and ask which factor most affects acceptability or price, where the underwriter gets a driving record, or how a principal operator rule changes a car's premium.
> - **State restrictions:** A question may ask what the insurer can do about a risk it no longer wants once a policy is past its first 60 days, or why some factors can't be used in some states.
> - **The declined driver:** Expect a question on where a driver the voluntary market rejects gets the coverage the state requires.

> [!warning]- Exam traps
> - **A ticket is not a reason to cancel:** After the first 60 days the policy can be cancelled only for the reasons it lists. A worsening driving record is dealt with at renewal, not by cancellation.
> - **Allowed somewhere is not allowed everywhere:** Credit, gender, marital status and education are rating factors only where state law permits. An answer that applies one in every state ignores the restrictions.
> - **The guaranty fund is not a residual market:** A [[Guaranty Funds|guaranty fund]] pays claims of insolvent insurers. A driver who can't buy coverage goes to the assigned risk plan or the state's other residual mechanism.
> - **Records come from the DMV and claims databases:** The motor vehicle report gives convictions; a loss history database gives claims. Neither comes from the applicant's word alone.
