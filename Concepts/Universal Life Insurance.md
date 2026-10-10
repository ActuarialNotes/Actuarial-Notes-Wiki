---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:66bd40724cd1d33886a6a77e6ac1243863b2ee70196fe58a83344645f6f87add
  sources:
    - "SOA ALTAM Notation and Terminology note (2025-12), Universal Life conventions (ix) corridor factor c: death benefit at least c x account value; (xi) Type A fixed death benefit; (xii) Type B fixed additional death benefit; (xiii) cash value = AV less surrender penalty; (xiv) reserves = AV unless no-lapse guarantee, PDF pp.4-5, sha256:8483e16282f8855d2cb01b174eacd5a89e3049543a460b87d97eb180fceb8f0a — https://www.soa.org/globalassets/assets/files/edu/2026/spring/intro-note/2025-12-altam-notation.pdf"
    - "SOA ALTAM Sample Written-Answer Questions (2026-01), Q50 (Type A, corridor factor 1.5) p.91 and Q53 (Type A, COI at i_q = 4% vs credited 5%, corridor factor 2.2, surrender charge, no-lapse guarantee reserve) pp.97-98, sha256:49872aa3db3e280fce82dc8c261668a20462050dd761c2995ab214ffc31dc4de — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-questions.pdf"
    - "SOA ALTAM Sample Solutions (2026-01), Q52 (Type B: COI = 0.005(100,000)v; profit test uses its own expense assumptions) p.104 and Q53 (CoI = 1.2 q50 (100,000 - AV1) v4%; corridor CoI on 1.2 AV1 for factor 2.2; CV = AV - SC; NLG reserve) p.105, pages read as images, sha256:3e52f41d261382185358d31d5ce2eed38ef94578f2c04dce17a3d38b50385e90 — https://www.soa.org/globalassets/assets/files/edu/2026/spring/questions-solutions/2026-01-altam-solutions.pdf"
    - "SOA ALTAM Syllabus (2026-10), Topic 6 Universal Life (Type A/B account values, no-lapse guarantee reserves, deterministic profit testing) and Topic 4, PDF pp.3-5, sha256:44b64a78219337f43387cb52837c7c2ce590ae2b97321d6e8e4e29ab2cd38c5e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-altam-syllabus.pdf"
    - "26 U.S.C. §7702(a)(2)(B) and (d) cash value corridor (LII), sha256:ee38315f50c073617c2bce50a8f97687453b2096f68d576e7339fef3671d5d81 — https://www.law.cornell.edu/uscode/text/26/7702"
    - "NAIC Life Insurance Buyer's Guide as adopted at Ill. Admin. Code tit. 50, pt. 930, exh. B (LII), sections Term Insurance (renewal, conversion even if not in good health, largest protection per premium dollar), Cash Value Life Insurance (policy loans; unpaid loan and interest subtracted from benefits or cash value), Whole Life (lifetime if premiums paid; same premium; limited-pay to age 65 higher), Universal Life (flexible premiums and face amount; account falls, coverage ends unless more paid or benefit lowered; increases may need proof), sha256:63fd04a11145a404600bda86539dfb0b5d0ca3d26d2ccba09323a3ff7f261ab7 — https://www.law.cornell.edu/regulations/illinois/Ill-Admin-Code-tit-50-930-Exhibit-B"
    - "NAIC, Life Insurance Buyer's Guide (c)2026, p.5 (term vs cash value; renewable vs nonrenewable term; whole life set premium schedule vs universal life flexible premiums) and p.6 (most term policies have no cash value), sha256:c7439cde01522328eca7eab1a7323e5ca193ed8af7d21deb80bda6ae9f36837a — https://content.naic.org/sites/default/files/publication-lig-lp-consumer-life.pdf"
    - "The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Universal Life Insurance.md
---

**Universal Life Insurance** (UL) is a flexible-premium permanent [[Life Insurance|life insurance]] policy built on a transparent **account value**: premiums are credited to the account, expense and cost-of-insurance charges are deducted, and interest is credited at a declared rate. The death benefit is either level (**Type A**) or the account value plus a fixed amount (**Type B**).

> $$AV_t = \left(AV_{t-1} + P_t - EC_t - CoI_t\right)\left(1 + i_t^{c}\right)$$

> $$CoI_t = q^{*}_{x+t-1}\,v_q\,\left(DB_t - AV_t\right)$$

- $P_t$ is the premium (the policyholder chooses it, within limits), $EC_t$ the expense charge, $i^c_t$ the credited rate, $q^{*}$ the cost-of-insurance mortality rate and $v_q = 1/(1+i_q)$ the CoI discount factor. $DB_t - AV_t$ is the additional death benefit, the insurer's net amount at risk
- **Type A:** $DB_t = FA$, the face amount, so $CoI_t$ depends on $AV_t$ and the recursion is solved for $AV_t$. **Type B:** $DB_t = FA + AV_t$, so $CoI_t = q^{*}_{x+t-1}\,v_q\,FA$ directly
- **Corridor:** to keep its tax status as insurance, the death benefit must be at least $c_t\,AV_t$, where $c_t$ is the corridor factor; when this binds, $DB_t = c_t\,AV_t$ replaces $FA$. A surrender pays the cash value $AV_t - SC_t$, after a surrender charge
- **As a product:** Universal life is a cash value policy whose premiums and face amount are both flexible. The owner may pay on any pattern, so long as enough is paid to keep the policy in force: if the account value falls too low to cover the charges, the coverage ends unless the owner pays more or reduces the benefits. Increasing the face amount may require new evidence that the insured qualifies. This flexibility is the key difference from [[Whole Life Insurance|whole life]], whose premiums follow a set schedule.
- The insurer's own profit test projects the account alongside its own interest, mortality and expense assumptions; a **no-lapse guarantee** keeps the cover in force when the account value runs out and needs a [[Reserve|reserve]] of its own

> [!example]- One Year of a Type B Account {Example}
> A Type B UL policy has face amount $100{,}000$ and account value $5{,}000$ at the start of the year. The policyholder pays $2{,}000$. The expense charge is $50$ plus $3\%$ of premium, $q^{*} = 0.004$, $i_q = 4\%$ and $i^c = 4.5\%$. Find the account value and death benefit at year end.
>
> > [!answer]-
> > $EC = 50 + 0.03(2{,}000) = 110$.
> > $$
> > \begin{align*}
> > CoI &= 0.004(100{,}000)/1.04 \\
> > &= 384.62
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > AV_1 &= (5{,}000 + 2{,}000 - 110 - 384.62)(1.045) \\
> > &= 6{,}505.38(1.045) \\
> > &= 6{,}798.13
> > \end{align*}
> > $$
> > The death benefit is $100{,}000 + 6{,}798.13 = 106{,}798.13$: under Type B the amount at risk stays at the face amount, whatever the account does.

> [!example]- Type A Account Value With the Corridor Check {Example}
> A Type A UL policy has face amount $150{,}000$ and $AV_{t-1} = 20{,}000$. The premium is $3{,}000$, the expense charge is $100$ plus $2\%$ of premium, $q^{*}_{x+t-1} = 0.006$, $i_q = 5\%$, $i^c = 4\%$ and the corridor factor is $c_t = 2.5$. Find $AV_t$ and $CoI_t$.
>
> > [!answer]-
> > $EC = 160$ and $k = q^{*}v_q = 0.006/1.05 = 0.0057143$. Assuming the corridor does not bind, $CoI_t = k(150{,}000 - AV_t)$, so
> > $$
> > \begin{align*}
> > AV_t &= \frac{(20{,}000 + 3{,}000 - 160 - 150{,}000k)(1.04)}{1 - 1.04k} \\
> > &= \frac{22{,}862.17}{0.994057} \\
> > &= 22{,}998.85
> > \end{align*}
> > $$
> > $$
> > \begin{align*}
> > CoI_t &= 0.0057143(150{,}000 - 22{,}998.85) \\
> > &= 725.72
> > \end{align*}
> > $$
> > Check: $2.5(22{,}998.85) = 57{,}497 < 150{,}000$, so the death benefit stays at the face amount and the assumption holds. Had the corridor bound, $DB_t = 2.5\,AV_t$ and the CoI would have been recomputed on $1.5\,AV_t$.

> [!tip]- How it appears on the exam
> - **ALTAM** gives the charges, credited rate and premium pattern and asks for the account value, cost of insurance, death benefit and cash value year by year for a Type A or Type B policy, including the corridor test, usually in a spreadsheet layout.
> - ALTAM then profit tests the policy: the insurer's cash flows (premium less charges is not profit — the account is the policyholder's), profit vector and signature, NPV, IRR, profit margin and discounted payback period, under best-estimate or stress assumptions, and reserves for a no-lapse guarantee.
> - **DISC-IA** asks for the features of universal life against whole life: flexible premiums, the visible account, the death benefit options and the cash value.

> [!warning]- Exam traps
> - Charging Type A CoI on the face amount: the amount at risk is $FA - AV_t$, and $AV_t$ appears on both sides, so the recursion has to be solved, not simply evaluated.
> - Using the credited rate $i^c$ to discount the CoI. The CoI discount is at $i_q$, and the two rates are often different in the same question.
> - Skipping the corridor check, or doing it on $AV_{t-1}$. It applies to the year-end account value, and when it binds the answer changes.
> - Treating policyholder charges as the insurer's mortality cost: in the profit test the insurer earns the CoI charge but pays the actual death claims on its own mortality basis.
