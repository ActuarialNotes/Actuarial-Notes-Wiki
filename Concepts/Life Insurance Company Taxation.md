---
aliases:
  - Corporate Taxation
  - Taxable Income
  - US Company Tax Rule
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:dd8582bf34be81cd7a344e7d283e50e99251037b53c38f329576de9aef86a2fa
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Life Insurance Company Taxation.md
---
**Life Insurance Company Taxation** is the set of rules that turn a [[Life Insurance Company|life or health insurer's]] reported income into taxable income and the corporate tax due on it. The central difference from other corporations is the reserve: an insurer deducts the increase in its policy reserves, and the tax law limits that deduction to a tax reserve smaller than the reserve in its financial statements. The U.S. rules are in sections 801 to 848 of the Internal Revenue Code, and Canada's start from the [[IFRS 17]] financial statements under the Income Tax Act.

> $$\text{Tax reserve} = \min\left(\max\left(\text{NSV},\ 0.9281\,V^{\text{TRM}}\right),\ V^{\text{stat}}\right)$$

> $$\text{Taxable income} = \text{Book income} + \Delta V^{\text{book}} - \Delta V^{\text{tax}} \pm \text{other adjustments}$$

- **Symbols:** For a U.S. life insurance contract, NSV is its net surrender value, $V^{\text{TRM}}$ is the reserve under the tax reserve method that applies to it, and $V^{\text{stat}}$ is the reserve the company holds for it in the [[NAIC Annual Statement|annual statement]]. In the second block, $\Delta V^{\text{book}}$ and $\Delta V^{\text{tax}}$ are the increases in the reserve as reported and as allowed for tax.
- **U.S. tax reserves after the TCJA:** Since the Tax Cuts and Jobs Act of 2017, the life insurance reserve under section 807(d) is the greater of the net surrender value and 92.81% of the reserve under the tax reserve method, never more than the statutory reserve. The tax reserve method is the method the NAIC prescribes for the contract, such as the [[Commissioners Reserve Valuation Method|CRVM]] for life insurance or CARVM for annuities, and asset adequacy and deficiency reserves are left out.
- **U.S. taxable income:** Life insurance company taxable income is gross income, mostly premiums and investment income, less deductions for benefits paid, increases in tax reserves, [[Policyholder Dividend|policyholder dividends]] and operating expenses. It is taxed at the corporate rate of 21%. Tax-exempt interest and the dividends-received deduction are prorated, so only the company's share, 70% since the TCJA, is sheltered.
- **The DAC tax:** Section 848 makes the insurer capitalise a fixed share of its net premiums as specified policy acquisition expenses: 2.09% for annuities, 2.45% for group life and 9.2% for other contracts, chiefly individual life. The capitalised amount is deducted evenly over 180 months, starting in the second half of the year, whatever the company's actual [[Deferred Acquisition Cost|acquisition costs]] were.
- **Canada, income for tax purposes:** A Canadian life insurer is taxed on its income from carrying on an insurance business in Canada. The computation starts from net income in its IFRS 17 statements, adds back amounts that are not deductible and deducts amounts the statements don't, and is taxed under Part I at the combined federal and provincial rate, roughly 26% to 27% depending on the province.
- **Canadian policy reserves:** The Income Tax Regulations allow a deduction for policy reserves that is based on the IFRS 17 insurance contract liabilities, with prescribed adjustments. Under the rules adopted for IFRS 17, the [[Contractual Service Margin|contractual service margin]] is not deductible, except for 10% of the CSM on life insurance contracts other than segregated funds and the CSM on segregated funds, so profit that the accounts defer in the CSM is mostly taxed when it is written.
- **Other Canadian taxes:** The insurer also pays the 15% [[Investment Income Tax|investment income tax]] on investment income earned for holders of exempt policies, the Part VI capital tax on financial institutions, which can be reduced by Part I tax paid, and provincial premium taxes. Since 2022, members of bank and life insurer groups pay an additional 1.5% on taxable income above a shared \$100 million exemption.
- **Why tax reserves are smaller:** Tax law measures income on a narrower, less conservative basis than solvency reporting. A reserve held for prudence, such as a margin or the unearned profit in a CSM, is a timing difference that brings tax forward, and it gives rise to a deferred tax asset in the financial statements.

> [!example]- U.S. Tax Reserves and the DAC Tax {Example}
> A U.S. life insurer holds three contracts at year-end, with these amounts:
>
> | Contract | Tax reserve method | Net surrender value | Annual statement |
> |---|---|---|---|
> | A | 10,000 | 8,500 | 10,000 |
> | B | 5,000 | 4,900 | 5,000 |
> | C | 4,000 | 4,500 | 4,200 |
>
> Find the tax reserve for each. The insurer also wrote \$2,000,000 of net premiums on individual life contracts in the calendar year. How much must it capitalise under section 848, and how much of that does it deduct this year?
>
> > [!answer]-
> > Each contract takes the greater of its net surrender value and 92.81% of its tax reserve method reserve, capped at the annual statement reserve.
> > $$
> > \begin{align*}
> > V_A &= \max(8{,}500,\ 9{,}281.00) \\
> > &= 9{,}281.00 \\
> > V_B &= \max(4{,}900,\ 4{,}640.50) \\
> > &= 4{,}900.00 \\
> > V_C &= \min\left(\max(4{,}500,\ 3{,}712.40),\ 4{,}200\right) \\
> > &= 4{,}200.00
> > \end{align*}
> > $$
> > Contract B is held at its surrender value, the floor, and contract C is capped at the statutory reserve.
> > $$
> > \begin{align*}
> > \text{Capitalised} &= 0.092(2{,}000{,}000) \\
> > &= 184{,}000 \\
> > \text{Deducted} &= 184{,}000 \times \frac{6}{180} \\
> > &= 6{,}133.33
> > \end{align*}
> > $$
> > Amortisation starts in July, so six of the 180 months fall in the first year. The DAC tax adds \$177,866.67 to this year's taxable income, and the rest is deducted over the next 15 years.

> [!example]- Taxable Income of a Canadian Life Insurer {Example}
> A Canadian life insurer reports net income before tax of \$40.0 million under IFRS 17. Its insurance contract liabilities rose by \$120.0 million, of which \$20.0 million was an increase in the CSM on life insurance contracts that are not segregated funds. Its income includes \$5.0 million of dividends from taxable Canadian corporations, which are deductible. Ignoring other adjustments, find taxable income and Part I tax at an illustrative combined rate of 26.5%.
>
> > [!answer]-
> > The accounts deducted the whole \$120.0 million increase, but only 10% of the CSM increase is deductible for tax, so 90% of it is added back.
> > $$
> > \begin{align*}
> > \text{Add-back} &= 0.90(20.0) \\
> > &= 18.0 \\
> > \text{Taxable income} &= 40.0 + 18.0 - 5.0 \\
> > &= 53.0 \\
> > \text{Part I tax} &= 0.265(53.0) \\
> > &= 14.045
> > \end{align*}
> > $$
> > Part I tax is about \$14.0 million, 35% of book income before tax, because the deferred profit in the CSM is taxed now. When the CSM is released into income in later years, the release has already been taxed and is deducted, so the effective rate falls back over the life of the contracts. The insurer also owes investment income tax and capital tax, computed separately.

> [!tip]- How it appears on the exam
> - **ILA-201U:** Candidates describe and calculate reserves under the U.S. company tax rules, the 92.81% rule, the net surrender value floor and the statutory cap, often for a mix of contracts, and explain how the TCJA changed tax reserves and the DAC tax.
> - **ILA-201I:** Questions on corporate taxation ask how a Canadian life insurer's income for tax purposes is built from its IFRS 17 statements, how the CSM is treated, and how corporate tax interacts with the investment income tax.
> - **GH-201C:** Candidates describe how to compute the taxable income of a Canadian life and health insurer, covering tax reserves against accounting reserves, deductible items and the other taxes the insurer pays.

> [!warning]- Exam traps
> - **Apply the cap last:** The U.S. tax reserve takes the greater of the net surrender value and 92.81% of the tax-method reserve first, then caps the result at the statutory reserve. Applying the cap first lets the floor exceed the statutory amount.
> - **The percentage applies to the tax-method reserve:** The 92.81% multiplies the reserve under the tax reserve method, not the net surrender value, and it excludes asset adequacy and deficiency reserves.
> - **DAC tax is not GAAP DAC:** The section 848 amount is a fixed share of net premiums by contract type. It has nothing to do with the costs a company actually defers under GAAP.
> - **Timing, not permanent:** A smaller tax reserve and a non-deductible CSM bring tax forward but don't change the total tax over the life of the business. A question that asks about the effective tax rate in one year wants the timing effect explained.
> - **Which tax on which income:** Part I tax applies to the insurer's taxable income, while the investment income tax applies to the policyholders' share of investment income on exempt policies. Adding the two bases together double counts.
