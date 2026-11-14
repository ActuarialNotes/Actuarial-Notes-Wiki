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
  content_hash: sha256:26fbb6219dd80ff582c96b99118b2919da1cc74e43d0986f33baa343de7448f6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Medical Coding.md
---
**Medical Coding** is the translation of a patient's diagnoses, procedures, services, supplies and drugs into the standard code sets that providers put on a claim, so that payers can adjudicate and pay it and analysts can count and compare care across millions of records. The codes define [[Utilization|utilization]] categories, trigger [[Provider Reimbursement|provider payment]] under DRG and fee-schedule contracts, and feed the condition categories of [[Health Risk Adjustment|risk adjustment]] models.

| Code set | What it codes | Form and maintainer |
| --- | --- | --- |
| ICD-10-CM | Diagnoses, in every setting | Three to seven characters |
| ICD-10-PCS | Inpatient hospital procedures | Seven characters, each with a fixed meaning |
| CPT | Physician and outpatient services | Five digits, American Medical Association |
| HCPCS Level II | Items CPT doesn't cover, such as durable medical equipment, ambulance services and drugs given in a clinic | A letter and four digits, CMS |
| MS-DRG | Inpatient stays, grouped for payment | Assigned by a grouper |
| Revenue codes | The department or type of charge on a facility claim | Four digits on the UB-04, National Uniform Billing Committee |
| NDC | Drugs on pharmacy claims | Labeler, product and package |

**Diagnoses** explain why a service was given, support medical necessity, define chronic condition flags and drive risk scores. The extra characters of an ICD-10-CM code add detail such as laterality, severity and encounter type, and those of ICD-10-PCS give body system, approach and device. **Services** are priced by CPT and HCPCS code in fee schedules, including Medicare's resource-based relative value scale. **The grouper** assigns each inpatient stay to a Medicare Severity diagnosis related group from its principal diagnosis, its procedures and the presence of a complication or comorbidity (CC) or a major one (MCC). Many DRGs come in families of up to three severity levels, so one secondary diagnosis can move a stay to a higher-weighted group. **Revenue codes** such as room and board, pharmacy, operating room and the 045x series for the emergency room let analysts split facility cost into service categories and count events such as emergency visits. **NDCs** link claims to drug class, brand or generic status and specialty drug lists.

## How code sets change

The U.S. replaced ICD-9-CM with ICD-10-CM and ICD-10-PCS on October 1, 2015, with several times as many codes. Every code set is also updated on its own schedule, with new, deleted and revised codes each year. A change breaks the continuity of any series defined by codes. A condition defined by ICD-9 codes before the switch and ICD-10 codes after can show a jump in prevalence that is only a mapping effect, so historical data are mapped across with a crosswalk, such as CMS's general equivalence mappings, before trend or prevalence is measured.

## Coding and reimbursement

When payment depends on codes, more complete or more aggressive coding raises payment with no change in care. Under DRG contracts this shows as a rising case mix index, under fee schedules as more patients coded to higher-paying levels of evaluation and management visits, and under capitation as higher risk scores. Part of the rise may be real growth in severity, and separating the two is the actuarial question.

If admission $j$ of a hospital's $N$ admissions is assigned to DRG $d(j)$ with relative weight $W_{d(j)}$, the case mix index (CMI) is

> $$\text{CMI} = \frac{1}{N}\sum_{j=1}^{N} W_{d(j)}$$

The hospital's DRG payment is

> $$\text{Pay} = N \times \text{CMI} \times B$$

- $B$ is the hospital's base rate per admission.

When the number of admissions and the base rate do not change, the payment moves exactly with the case mix index:

> $$\frac{\text{Pay}_1}{\text{Pay}_0} - 1 = \frac{\text{CMI}_1}{\text{CMI}_0} - 1$$

> [!example]- How much do the case mix index and the payer's cost change from this coding shift? {Example}
> A hospital has 1,000 admissions a year in one DRG family, paid at a base rate of $\$7{,}000$. After a documentation improvement program, with the same patients and the same care, the split across the family's levels changes.
>
> | Level | Illustrative weight | Last year | This year |
> | :--- | ---: | ---: | ---: |
> | No CC or MCC | 1.0 | 60% | 45% |
> | With CC | 1.3 | 30% | 38% |
> | With MCC | 1.9 | 10% | 17% |
>
> > [!answer]-
> > - Last year's CMI is $0.60(1.0) + 0.30(1.3) + 0.10(1.9) = 1.180$.
> > - This year's CMI is $0.45(1.0) + 0.38(1.3) + 0.17(1.9) = 1.267$.
> > - The CMI rises $1.267/1.180 - 1 = 7.37\%$.
> > - The payment rises by $1{,}000 \times 0.087 \times 7{,}000 = \$609{,}000$, from $\$8{,}260{,}000$ to $\$8{,}869{,}000$, from coding alone.
> > - A payer projecting inpatient cost would see this as unit cost trend. A payer negotiating the contract might ask for a lower base rate or a case-mix corridor to offset it.

## Counting events from revenue codes

One facility claim carries many revenue code lines, so counting lines counts charges rather than visits or admissions. Events are counted as distinct claims or episodes carrying the code.

> [!example]- What is this plan's emergency visit rate per 1,000 members per year? {Example}
> A plan has 30,000 member months. Its facility claims show 480 outpatient claims carrying a 045x emergency room revenue code, and 90 inpatient claims that also carry a 045x code because the patient was admitted through the emergency room.
>
> > [!answer]-
> > - Visits that end in an admission are billed on the inpatient claim, so both sources are counted.
> > - The rate is $(480 + 90)/30{,}000 \times 12{,}000 = 228$ visits per 1,000.
> > - The share of visits that led to an admission is $90/570 = 15.8\%$.
> > - Counting only the outpatient claims would give 192 per 1,000, understating emergency use by about 16%.

> [!trap] Projecting coding creep as trend
> A rising case mix index or risk score with no change in the population is a coding effect. Projecting the 7.37% in the example as continuing unit cost trend overstates future cost unless the coding change is expected to keep going.
