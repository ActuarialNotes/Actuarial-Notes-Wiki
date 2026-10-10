---
aliases:
  - Coding Set
  - Coding Structure
  - Revenue Code
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:5805a089fbc28ba2f287546f8b346f7e7667830e55b4645081d8cd957efccaf6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Medical Coding.md
---
**Medical coding** is the translation of a patient's diagnoses, procedures, services, supplies and drugs into the standard code sets that providers put on a claim, so that payers can adjudicate and pay it and analysts can count and compare care across millions of records. For the health actuary the codes are the data: they define [[Utilization|utilization]] categories, trigger [[Provider Reimbursement|provider payment]] under DRG and fee-schedule contracts, and feed the condition categories of [[Health Risk Adjustment|risk adjustment]] models, so a change in coding moves cost, trend and risk scores even when the care itself hasn't changed.

> $$\text{CMI} = \frac{1}{N}\sum_{j=1}^{N} W_{d(j)}$$

> $$\text{Pay} = N \times \text{CMI} \times B$$

> $$\frac{\text{Pay}_1}{\text{Pay}_0} - 1 = \frac{\text{CMI}_1}{\text{CMI}_0} - 1$$

- **Symbols:** $N$ is the number of inpatient admissions, $d(j)$ is the diagnosis related group that admission $j$ is assigned to, $W_d$ is that group's relative weight, and CMI is the case mix index, the average weight. $B$ is the hospital's base rate per admission. The last line holds when the number of admissions and the base rate do not change, so the payment moves exactly with the case mix index.
- **Diagnoses, ICD-10-CM:** The International Classification of Diseases, 10th Revision, Clinical Modification, codes what is wrong with the patient, in three to seven characters that add detail such as laterality, severity and encounter type. Diagnoses explain why a service was given, support medical necessity, define chronic condition flags and drive risk scores.
- **Inpatient procedures, ICD-10-PCS:** Hospitals code inpatient procedures with the seven-character ICD-10 Procedure Coding System. Each character has a fixed meaning, such as body system, approach and device.
- **Services, CPT and HCPCS:** Current Procedural Terminology (CPT), maintained by the American Medical Association, codes physician and outpatient services as five-digit codes. HCPCS Level II, maintained by CMS, uses a letter and four digits for items CPT doesn't cover, such as durable medical equipment, ambulance services and drugs given in a clinic. Fee schedules, including Medicare's resource-based relative value scale, price services by these codes.
- **Groupings, MS-DRG:** A grouper assigns each inpatient stay to a Medicare Severity diagnosis related group from its principal diagnosis, its procedures and the presence of a complication or comorbidity (CC) or a major one (MCC). Many DRGs come in families of up to three severity levels, so one secondary diagnosis can move a stay to a higher-weighted group.
- **Revenue codes:** Facility claims on the UB-04 form carry four-digit revenue codes, maintained by the National Uniform Billing Committee, that identify the department or type of charge. Examples are room and board, pharmacy, operating room and the 045x series for the emergency room. Analysts use them to split facility cost into service categories and to count events such as emergency visits.
- **Drugs, NDC:** Pharmacy claims identify each drug by its National Drug Code, which names the labeler, the product and the package. NDCs link claims to drug class, brand or generic status and specialty drug lists.
- **How code sets change:** The U.S. replaced ICD-9-CM with ICD-10-CM and ICD-10-PCS on October 1, 2015, with several times as many codes. Every code set is also updated on its own schedule, with new, deleted and revised codes each year. A change breaks the continuity of any series defined by codes, so historical data must be mapped across with a crosswalk, such as CMS's general equivalence mappings, before trend or prevalence is measured.
- **Coding structures and reimbursement:** When payment depends on codes, more complete or more aggressive coding raises payment with no change in care. This shows up as a rising case mix index under DRG contracts, as more patients coded to higher-paying levels of evaluation and management visits under fee schedules, and as higher risk scores under capitation. Part of the rise may be real growth in severity, and separating the two is the actuarial question.

> [!example]- DRG Payment Change from a Coding Shift {Example}
> A hospital has 1,000 admissions a year in one DRG family, paid at a base rate of \$7,000. The illustrative weights are 1.0 without CC or MCC, 1.3 with a CC and 1.9 with an MCC. Last year 60%, 30% and 10% of admissions fell into the three levels. After a documentation improvement program, with the same patients and the same care, the split is 45%, 38% and 17%. Find the change in the case mix index and in the payer's cost.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{CMI}_0 &= 0.60(1.0) + 0.30(1.3) + 0.10(1.9) \\
> > &= 1.180 \\
> > \text{CMI}_1 &= 0.45(1.0) + 0.38(1.3) + 0.17(1.9) \\
> > &= 1.267 \\
> > \frac{\text{CMI}_1}{\text{CMI}_0} - 1 &= \frac{1.267}{1.180} - 1 \\
> > &= 7.37\% \\
> > \Delta\,\text{Pay} &= 1{,}000 \times (1.267 - 1.180) \times 7{,}000 \\
> > &= 609{,}000
> > \end{align*}
> > $$
> > Payment rises from \$8,260,000 to \$8,869,000, a 7.37% increase from coding alone. A payer projecting inpatient cost would see this as unit cost trend, and a payer negotiating the contract might ask for a lower base rate or a case-mix corridor to offset it.

> [!example]- Counting Emergency Visits from Revenue Codes {Example}
> A plan has 30,000 member months. Its facility claims show 480 outpatient claims carrying a 045x emergency room revenue code, and 90 inpatient claims that also carry a 045x code because the patient was admitted through the emergency room. Find the emergency visit rate per 1,000 members per year and the share of visits that led to an admission.
>
> > [!answer]-
> > Visits that end in an admission are billed on the inpatient claim, so both sources must be counted.
> > $$
> > \begin{align*}
> > \text{Visits per 1,000} &= \frac{480 + 90}{30{,}000} \times 12{,}000 \\
> > &= 228 \\
> > \text{Admit share} &= \frac{90}{570} \\
> > &= 15.8\%
> > \end{align*}
> > $$
> > Counting only the outpatient claims would give 192 visits per 1,000, understating emergency use by about 16% and making the plan's emergency rate look better than it is.

> [!tip]- How it appears on the exam
> - **GH-301 identification:** Questions give a claim record or a list of codes and ask which code set each belongs to and what it is used for, such as ICD-10-CM for diagnoses, CPT for professional services, MS-DRG for inpatient payment and revenue codes for facility charge categories.
> - **GH-301 change over time:** Candidates describe how a code set change, such as ICD-9 to ICD-10 or an annual update, affects trend, prevalence, risk scores and reimbursement, and what an actuary should do about it.
> - **GH-301 calculations:** A short calculation shows the effect of a shift in coding on a case mix index, a DRG payment or a fee-schedule payment, as in the first example.

> [!warning]- Exam traps
> - **Coding creep is not trend:** A rising case mix index or risk score with no change in the population is a coding effect. Projecting it as continuing severity or unit cost trend overstates future cost unless the coding change is expected to keep going.
> - **Diagnosis and procedure codes:** ICD-10-CM codes diagnoses for every setting, while ICD-10-PCS codes procedures for inpatient hospital stays only. Physician and outpatient procedures use CPT and HCPCS, so mixing the two procedure systems double counts or misses services.
> - **Breaks in series:** A condition defined by ICD-9 codes before October 2015 and ICD-10 codes after can show a jump in prevalence that is only a mapping effect. Measuring trend across the break without a crosswalk produces a false trend.
> - **Revenue code or claim:** One facility claim carries many revenue code lines, so counting lines counts charges rather than visits or admissions. Count distinct claims or episodes with the code instead.
