---
aliases:
  - International Business
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:310e2ddad33f4faf7003598c23fe4cea1bd0976219759d7b666f9f602fef4ac8
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/International Insurance.md
---
**International Insurance** is the coverage an organization with operations, employees or property in other countries buys to insure them, and the set of issues an [[Insurer|insurer]] faces in writing business across borders. The central question is whether a policy is admitted, issued by an insurer licensed in the country where the risk sits, or non-admitted, issued from abroad. Many countries prohibit or tax non-admitted cover, so multinationals combine local admitted policies with a master policy from their home country.

> $$P_{\text{loc}} = \min\left(X_{\text{loc}},\ L_{\text{loc}}\right)$$

> $$P_{\text{m}} = \min\left(X_{\text{m}},\ L_{\text{m}}\right) - P_{\text{loc}}$$

> $$\text{Value}_{\$} = \frac{\text{Amount}_{\text{LC}}}{\text{LC per }\$}$$

- **Symbols:** $X_{\text{loc}}$ is the loss covered under the local policy's terms and $L_{\text{loc}}$ its limit, both converted to the master policy's currency. $X_{\text{m}}$ is the loss covered under the master policy's broader terms and $L_{\text{m}}$ its limit. The master policy pays the difference between what it would pay alone and what the local policy pays, and the last formula converts a local-currency amount into dollars at the exchange rate.
- **Admitted versus non-admitted:** An admitted policy complies with local law, is issued in the local language and currency, pays local premium taxes, and can pay claims locally. A non-admitted policy issued from abroad may be illegal where compulsory local placement applies, may leave the local subsidiary unable to receive a claim payment, and can create tax penalties. In other countries non-admitted cover is permitted and is simpler and cheaper.
- **Controlled master program:** A global program has a master policy issued to the parent in its home country and local admitted policies in each country, written by the lead insurer's own offices or network partners. The local policies satisfy local law, and the master policy sets the program's broadest terms and highest limits.
- **DIC and DIL:** The master policy pays difference in conditions (DIC), covering perils or terms the local policy leaves out, and difference in limits (DIL), paying above a local limit up to the master limit. Where a local claim payment from abroad is not permitted, a financial interest clause pays the parent for its financial interest in the subsidiary's loss instead.
- **Fronting:** A local insurer issues the admitted policy and cedes most or all of the risk by [[Reinsurance|reinsurance]] to the lead insurer or to the multinational's captive, keeping a fronting fee. The fronting insurer stays liable to the policyholder, so it bears the reinsurer's credit risk.
- **Coverages for people abroad:** Foreign voluntary workers compensation pays a company's home-country employees working abroad the benefits of their home jurisdiction, with repatriation and medical evacuation, since local workers compensation may not cover them. Foreign liability, foreign auto, kidnap and ransom, and political risk policies fill other gaps.
- **Financial considerations for an insurer:** Writing abroad exposes an insurer to currency risk, since premiums, reserves and claims are in local currency while its capital and reporting are in its home currency ([[Foreign Currency Translation]]). It must meet local licensing, capital and reserving rules, may face limits on foreign ownership or on moving profits and capital home, and pays local premium and income taxes, with tax treaties and transfer pricing rules governing what is taxed where. Differences in legal systems change claim costs too ([[International Legal Environment]]).

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

> [!example]- Currency Risk on a Foreign Book {Example}
> An insurer writes a one-year book abroad for a premium of 30,000,000 local currency units (LC) and pays claims of 24,000,000 LC. The exchange rate is 5 LC per dollar when the premium is received and 4 LC per dollar when the claims are paid. Compare the dollar result if the insurer converts the premium to dollars at once with the result if it holds local-currency assets until the claims are paid.
>
> > [!answer]-
> > Converting at once fixes the premium in dollars, while the claims cost more dollars after the local currency strengthens.
> > $$
> > \begin{align*}
> > \text{Premium}_{\$} &= \frac{30{,}000{,}000}{5} \\
> > &= 6{,}000{,}000 \\
> > \text{Claims}_{\$} &= \frac{24{,}000{,}000}{4} \\
> > &= 6{,}000{,}000 \\
> > \text{Matched profit}_{\$} &= \frac{30{,}000{,}000 - 24{,}000{,}000}{4} \\
> > &= 1{,}500{,}000
> > \end{align*}
> > $$
> > Unmatched, the 20% underwriting margin in local terms becomes a dollar result of zero. Holding assets in the currency of the liabilities removes the exchange-rate effect on the claims, which is why insurers match local reserves with local assets and why regulators often require them to be held locally.

> [!tip]- How it appears on the exam
> - **DISC-IA:** Questions ask the difference between admitted and non-admitted coverage, how a controlled master program works, what DIC, DIL and the financial interest clause do, and which coverages protect employees and property abroad. The applied version gives a foreign loss and asks how the local and master policies share it.
> - **GI-201:** The reading on financial considerations in international business asks for the issues an insurer faces abroad: currency, regulation and licensing, taxation, moving funds home, and political and legal risk. Expect to describe them and explain how an insurer manages each, such as matching currencies or fronting through a local insurer.

> [!warning]- Exam traps
> - **Master pays the difference:** The master policy pays only what it would pay alone less what the local policy pays. Adding the two policies' limits overstates the program's capacity.
> - **Non-admitted is not always allowed:** A non-admitted policy may be valid in the parent's country and still unable to pay a claim in the subsidiary's country. That is the reason for local admitted policies and the financial interest clause.
> - **Fronting keeps the risk on paper:** The fronting insurer remains liable to the policyholder even after ceding all of the risk. If the reinsurer fails, the fronting insurer pays.
> - **Currency cuts both ways:** A strengthening local currency raises the home-currency cost of local claims. Converting premium at once and paying claims later leaves the insurer exposed, and matching assets to liabilities by currency removes the exposure.
