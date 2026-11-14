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
  content_hash: sha256:f391381293af436b9b025f951aa5b109deca3298db9e43b67b6170eb6d8e104a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Life Insurance Company Taxation.md
---
**Life Insurance Company Taxation** is the set of rules that turn a [[Life Insurance Company|life or health insurer's]] reported income into taxable income and the corporate tax due on it. The central difference from other corporations is the reserve: an insurer deducts the increase in its policy reserves, and the tax law limits that deduction to a tax reserve smaller than the reserve in its financial statements.

Starting from the income in the insurer's financial statements, its taxable income is

> $$\text{Taxable income} = \text{Book income} + \Delta V^{\text{book}} - \Delta V^{\text{tax}} \pm \text{other adjustments}$$

- $\Delta V^{\text{book}}$ is the increase in the reserve as reported.
- $\Delta V^{\text{tax}}$ is the increase in the reserve allowed for tax.

Tax law measures income on a narrower, less conservative basis than solvency reporting. A reserve held for prudence, such as a margin or the unearned profit in a [[Contractual Service Margin|CSM]], is a timing difference that brings tax forward, and it gives rise to a deferred tax asset in the financial statements. A smaller tax reserve brings tax forward but doesn't change the total tax over the life of the business.

## U.S. tax reserves

The U.S. rules are in sections 801 to 848 of the Internal Revenue Code. Since the Tax Cuts and Jobs Act of 2017 (TCJA), the tax reserve for a life insurance contract under section 807(d) is

> $$\text{Tax reserve} = \min\left(\max\left(\text{NSV},\ 0.9281\,V^{\text{TRM}}\right),\ V^{\text{stat}}\right)$$

- $\text{NSV}$ is the contract's net surrender value.
- $V^{\text{TRM}}$ is the reserve under the tax reserve method that applies to the contract.
- $V^{\text{stat}}$ is the reserve the company holds for the contract in the [[NAIC Annual Statement|annual statement]].

The tax reserve method is the method the NAIC prescribes for the contract, such as the [[Commissioners Reserve Valuation Method|CRVM]] for life insurance or CARVM for annuities. Asset adequacy and deficiency reserves are left out.

> [!example]- What is the tax reserve for each of these three contracts? {Example}
> A U.S. life insurer holds three contracts at year-end, with these amounts:
>
> | Contract | Tax reserve method | Net surrender value | Annual statement |
> | :--- | ---: | ---: | ---: |
> | A | 10,000 | 8,500 | 10,000 |
> | B | 5,000 | 4,900 | 5,000 |
> | C | 4,000 | 4,500 | 4,200 |
>
> > [!answer]-
> > - Each contract takes the greater of its net surrender value and 92.81% of its tax reserve method reserve, capped at the annual statement reserve.
> > - Contract A: $\max(8{,}500,\ 9{,}281.00) = 9{,}281.00$, below the cap of $10{,}000$.
> > - Contract B: $\max(4{,}900,\ 4{,}640.50) = 4{,}900.00$, held at its net surrender value.
> > - Contract C: $\max(4{,}500,\ 3{,}712.40) = 4{,}500$, which the cap at the annual statement reserve reduces to $4{,}200.00$.

## U.S. taxable income and the DAC tax

Life insurance company taxable income is gross income, mostly premiums and investment income, less deductions for benefits paid, increases in tax reserves, [[Policyholder Dividend|policyholder dividends]] and operating expenses. It is taxed at the corporate rate of 21%. Tax-exempt interest and the dividends-received deduction are prorated, so only the company's share, 70% since the TCJA, is sheltered.

Section 848 makes the insurer capitalise a fixed share of its net premiums as specified policy acquisition expenses: 2.09% for annuities, 2.45% for group life and 9.2% for other contracts, chiefly individual life. The capitalised amount is deducted evenly over 180 months, starting in the second half of the year. It is a fixed share of premiums whatever the company's actual [[Deferred Acquisition Cost|acquisition costs]] were.

> [!example]- How much must this insurer capitalise under section 848, and how much of that does it deduct this year? {Example}
> A U.S. life insurer wrote $\$2{,}000{,}000$ of net premiums on individual life contracts in the calendar year.
>
> > [!answer]-
> > - The capitalised amount is $0.092 \times 2{,}000{,}000 = \$184{,}000$.
> > - Amortisation starts in July, so six of the 180 months fall in the first year.
> > - The deduction this year is $184{,}000 \times 6/180 = \$6{,}133.33$.
> > - The DAC tax adds $\$177{,}866.67$ to this year's taxable income, and the rest is deducted over the next 15 years.

## Canadian taxation

A Canadian life insurer is taxed on its income from carrying on an insurance business in Canada. The computation starts from net income in its [[IFRS 17]] statements, adds back amounts that are not deductible and deducts amounts the statements don't. The result is taxed under Part I at the combined federal and provincial rate, roughly 26% to 27% depending on the province.

The Income Tax Regulations allow a deduction for policy reserves that is based on the IFRS 17 insurance contract liabilities, with prescribed adjustments. The contractual service margin is not deductible, except for 10% of the CSM on life insurance contracts other than segregated funds and the CSM on segregated funds. Profit that the accounts defer in the CSM is therefore mostly taxed when the contract is written.

The insurer also pays:

- the 15% [[Investment Income Tax|investment income tax]] on investment income earned for holders of exempt policies;
- the Part VI capital tax on financial institutions, which can be reduced by Part I tax paid;
- provincial premium taxes;
- since 2022, as a member of a bank or life insurer group, an additional 1.5% on taxable income above a shared $\$100$ million exemption.

> [!example]- What are this Canadian insurer's taxable income and Part I tax? {Example}
> A Canadian life insurer reports net income before tax of $\$40.0$ million under IFRS 17. Its insurance contract liabilities rose by $\$120.0$ million, of which $\$20.0$ million was an increase in the CSM on life insurance contracts that are not segregated funds. Its income includes $\$5.0$ million of deductible dividends from taxable Canadian corporations. Other adjustments are ignored, and the combined rate is an illustrative 26.5%.
>
> > [!answer]-
> > - The accounts deducted the whole $\$120.0$ million increase, but only 10% of the CSM increase is deductible for tax.
> > - The add-back is $0.90 \times 20.0 = 18.0$ million.
> > - Taxable income is $40.0 + 18.0 - 5.0 = 53.0$ million.
> > - Part I tax is $0.265 \times 53.0 = 14.045$, about $\$14.0$ million, or 35% of book income before tax.
> > - The rate is high because the deferred profit in the CSM is taxed now. When the CSM is released into income in later years, the release has already been taxed and is deducted.

> [!trap] Applying the cap before the floor
> The U.S. tax reserve takes the greater of the net surrender value and 92.81% of the tax reserve method reserve first, then caps the result at the statutory reserve. Applying the cap first lets the floor exceed the statutory amount, as it would for contract C above.
