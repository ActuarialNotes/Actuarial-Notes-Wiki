---
aliases:
  - International Business
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:986c80db4dfcaebbc939797efc518b2b8ce3506404d4c08324b33f4d74160be0
  sources:
    - "Swiss Re Corporate Solutions, 'The importance of DIC, DIL and Financial Interest Coverage in international programs' (CMP = master policy in home country + local admitted policies; DIC/DIL respond only where a local policy exists; FINC reimburses the parent where non-admitted cover is not permitted; admitted vs non-admitted definitions), sha256:2252d9392876610ffb97be28f59f5d0f2f21de8237a33926e1dbf0bca3977c77 — https://corporatesolutions.swissre.com/insights/knowledge/importance-difference-conditions-difference-limits-financial-interest-coverage-international-programs.html"
    - "Swiss Re Corporate Solutions, 'Understanding your insurance options as a multinational' (master policy fills gaps by DIC/DIL; FINC paid to parent), sha256:8406248fd1870138166482694739422df199a0ec1e40f1faf747cfae9ba66de2 — https://corporatesolutions.swissre.com/insights/knowledge/multinational-benefits-international-program.html"
    - "Chubb, Global Risk Spotlight: Navigating the Nuances of DIC and DIL Clauses (Canada), pp.2-4 (CMP; BRIC countries prohibit non-admitted insurance; penalties for unlicensed carriers paying claims locally), sha256:a74697f7fd3f83b2c85ed987fc15e2c260f6d5d6833eaf493b6fbf46fef63d61 — https://www.chubb.com/content/dam/chubb-sites/chubb-com/ca-en/hosted-docs/multinational-page/global-risk-spotlight-navigating-the-nuances-of-dic-and-dil-clauses-canada.pdf"
    - "SOA GI-201 Syllabus (2026-2027), outcome 1j (issues regarding international business) and reading 'Financial Considerations in International Business' (Business Law for Insurance Professionals, Assignment 3, pp.3.29-3.39), PDF pp.2,5, sha256:4dbbf9122436567ff8e22809f250e5be00e12897cd6b67c6ed52e3f53e05dcc9 — https://www.soa.org/globalassets/assets/files/edu/2026/gi-201/2026-2027-gi-201-syllabus.pdf"
    - "The Institutes, CAS DISC IA Course Syllabus (c)2023, PDF p.3-4, sections 7 a-d, 12 a-f, 13 a-d, sha256:e9ce8e88d95d49d9154b6aac841f04fec43c68392171d59ca1fca10b058dd50b — https://www.casact.org/sites/default/files/2022-12/DISC_IA.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/International Insurance.md
---
**International Insurance** is the coverage an organization with operations, employees or property in other countries buys to insure them, and the set of issues an [[Insurer|insurer]] faces in writing business across borders. The central question is whether a policy is admitted, issued by an insurer licensed in the country where the risk sits, or non-admitted, issued from abroad. Many countries prohibit non-admitted cover, so multinationals combine local admitted policies with a master policy from their home country.

> $$P_{\text{loc}} = \min\left(X_{\text{loc}},\ L_{\text{loc}}\right)$$

> $$P_{\text{m}} = \min\left(X_{\text{m}},\ L_{\text{m}}\right) - P_{\text{loc}}$$

- **Symbols:** $X_{\text{loc}}$ is the loss covered under the local policy's terms and $L_{\text{loc}}$ its limit, both converted to the master policy's currency. $X_{\text{m}}$ is the loss covered under the master policy's broader terms and $L_{\text{m}}$ its limit. The master policy pays the difference between what it would pay alone and what the local policy pays.
- **Admitted versus non-admitted:** An admitted policy is issued by an insurer licensed by the local regulator. A non-admitted policy is issued by an insurer without a local licence. Where non-admitted insurance is not permitted, such an insurer may not issue policies, collect premiums or handle claims in the country, and an unlicensed carrier found investigating or paying a claim there can face substantial fines and penalties. Other countries permit non-admitted cover.
- **Controlled master program:** A global program has a master policy issued to the parent in its home country and local admitted policies in each country, written by the lead insurer's own offices or network partners. The local policies satisfy local law, and the master policy sets the program's broadest terms and highest limits.
- **DIC and DIL:** The master policy pays difference in conditions (DIC), covering perils or terms the local policy leaves out, and difference in limits (DIL), paying above a local limit up to the master limit. Where a local claim payment from abroad is not permitted, a financial interest clause pays the parent for its financial interest in the subsidiary's loss instead.

> [!example]- A Master Policy Filling DIC and DIL Gaps {Example}
> A U.S. manufacturer's plant abroad is insured under a local admitted property policy with a limit of 20,000,000 in local currency, and under the parent's master policy with a \$25,000,000 limit. The exchange rate is 5 local currency units per dollar. A fire causes \$6,500,000 of property damage and \$1,500,000 of business interruption loss. The local policy does not cover business interruption, and the master policy covers both. How much does each policy pay?
>
> > [!answer]-
> > Convert the local limit to dollars, then pay the local policy first on its own terms.
> > $$
> > \begin{align*}
> > L_{\text{loc}} &= \frac{20{,}000{,}000}{5} \\
> > &= 4{,}000{,}000 \\
> > P_{\text{loc}} &= \min(6{,}500{,}000,\ 4{,}000{,}000) \\
> > &= 4{,}000{,}000 \\
> > P_{\text{m}} &= \min(8{,}000{,}000,\ 25{,}000{,}000) - 4{,}000{,}000 \\
> > &= 4{,}000{,}000
> > \end{align*}
> > $$
> > The master policy's \$4,000,000 is \$2,500,000 of DIL on the property damage above the local limit and \$1,500,000 of DIC for the business interruption the local policy excludes. If the country forbids a non-admitted insurer paying the local subsidiary, the master policy pays the U.S. parent under its financial interest clause.

> [!tip]- How it appears on the exam
> - **DISC-IA:** Questions ask the difference between admitted and non-admitted coverage, how a controlled master program works, and what DIC, DIL and the financial interest clause do. The applied version gives a foreign loss and asks how the local and master policies share it.
> - **GI-201:** Learning outcome 1j asks candidates to demonstrate knowledge of the issues regarding international business for insurance companies, from the reading "Financial Considerations in International Business".

> [!warning]- Exam traps
> - **Master pays the difference:** The master policy pays only what it would pay alone less what the local policy pays. Adding the two policies' limits overstates the program's capacity.
> - **Non-admitted is not always allowed:** A non-admitted policy may be valid in the parent's country and still unable to pay a claim in the subsidiary's country. That is the reason for local admitted policies and the financial interest clause.
