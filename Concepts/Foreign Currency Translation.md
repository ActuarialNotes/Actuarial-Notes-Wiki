---
aliases:
  - Foreign Exchange Rate
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ec90fee2135252f3661021c7dda83ae3e2a323a89e211da105992e4fbcd9b802
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Foreign Currency Translation.md
---
**Foreign Currency Translation** is the restatement of a foreign operation's financial statements from its own currency into the parent's presentation currency, so that the operation can be consolidated into the group's [[Financial Statements|financial statements]]. The foreign exchange rate used for each item, and where the resulting gain or loss is reported, depend on the operation's functional currency: translation differences go to other comprehensive income under the current rate method, and remeasurement gains and losses go to net income under the temporal method.

> $$\Delta\text{CTA} = \text{NA}_0\,(S_1 - S_0) + \text{NI}\,(S_1 - \bar{S}) - \text{Div}\,(S_1 - S_{\text{div}})$$

> $$\text{Transaction gain} = X\,(S_{\text{settle}} - S_{\text{book}})$$

- **Symbols:** $S$ is the exchange rate quoted as units of the presentation currency per unit of foreign currency: $S_0$ at the start of the year, $S_1$ at the balance sheet date (the closing rate), $\bar{S}$ the average rate for the year and $S_{\text{div}}$ the rate when dividends were paid. $\text{NA}_0$ is the operation's net assets at the start of the year, $\text{NI}$ its [[Net Income|net income]] and $\text{Div}$ its dividends, all in foreign currency. $X$ is the foreign-currency amount of a receivable, and its sign is reversed for a payable.
- **Functional and presentation currency:** The functional currency is the currency of the primary economic environment in which an entity operates, judged by the currency of its prices, costs and financing. The presentation currency, called the reporting currency in U.S. GAAP, is the one the group reports in.
- **Current rate method:** When the subsidiary's functional currency is its local currency, assets and liabilities are translated at the closing rate, revenues and expenses at the average rate, and share capital at the historical rate. The balancing figure is the translation adjustment, which goes to other comprehensive income and accumulates in equity as the cumulative translation adjustment (CTA). The exposure is the subsidiary's net assets.
- **Temporal method:** When the subsidiary's functional currency is the parent's currency, its accounts are remeasured as if the parent had made its transactions directly. Monetary items are remeasured at the closing rate and non-monetary items carried at historical cost, such as inventory and fixed assets, at historical rates, with the related expenses following them. The remeasurement gain or loss goes to net income, and the exposure is the net monetary position.
- **Highly inflationary economies:** U.S. GAAP requires the temporal method for a subsidiary in a highly inflationary economy, generally one with cumulative inflation of about 100% over three years. IFRS instead restates the local statements for inflation and then translates them at the current rate.
- **Transaction and translation:** A transaction gain or loss arises when an entity has a receivable or payable in a currency other than its own functional currency, and it goes to net income whatever method the group uses. Translation differences come only from consolidating an operation whose functional currency differs from the presentation currency.
- **Effect on reported metrics:** The current rate method keeps most of the subsidiary's balance sheet ratios as they are in local currency, because all assets and liabilities move with one rate. The temporal method mixes rates and distorts ratios. Reported revenue growth combines real growth with currency movements, so analysts separate them on a constant-currency basis. In the [[Comprehensive Income|comprehensive income]] statement, a translation loss reduces equity without passing through earnings.
- **In valuation:** Koller, Goedhart and Wessels value a foreign business by forecasting its cash flows in the foreign currency and discounting them at a foreign-currency cost of capital, then converting the value at the spot rate. Converting each year's cash flow at the forward rate and discounting at the domestic cost of capital gives the same answer when interest rate parity holds, $F_t = S_0\left[(1+i_d)/(1+i_f)\right]^t$.

> [!example]- Translating a Subsidiary and Deriving the CTA {Example}
> A U.S. insurer formed a euro-functional subsidiary at the start of the year with €1,000 of share capital, when the rate was \$1.10 per euro. During the year the subsidiary earned revenue of €2,000 and incurred expenses of €1,900 and paid no dividends. At year end it has assets of €1,800, of which €500 are cash and receivables, and liabilities of €700. The average rate for the year was \$1.15 and the closing rate is \$1.20. Translate the statements under the current rate method and find the CTA.
>
> > [!answer]-
> > Revenue and expenses are translated at the average rate, giving \$2,300 and \$2,185, so net income is \$115 and becomes retained earnings.
> > $$
> > \begin{align*}
> > \text{Assets} &= 1{,}800(1.20) \\
> > &= 2{,}160 \\
> > \text{Liabilities} &= 700(1.20) \\
> > &= 840 \\
> > \text{Share capital} &= 1{,}000(1.10) \\
> > &= 1{,}100 \\
> > \text{CTA} &= 2{,}160 - 840 - 1{,}100 - 115 \\
> > &= 105
> > \end{align*}
> > $$
> > The formula agrees: $1{,}000(1.20 - 1.10) + 100(1.20 - 1.15) = 105$. The euro strengthened while the subsidiary held net assets in euros, so the CTA is a \$105 gain in other comprehensive income. Under the temporal method the exposure would be the net monetary position instead: €500 of monetary assets against €700 of liabilities. That net monetary liability would make the same rise in the euro a remeasurement loss in net income.

> [!example]- A Transaction Loss on a Reinsurance Recoverable {Example}
> A U.S. life insurer with the U.S. dollar as its functional currency records a reinsurance recoverable of £2,000,000 from a U.K. reinsurer when the rate is \$1.30 per pound. At the year end the rate is \$1.25, and the recoverable is settled early the next year at \$1.27. Find the gains and losses and where they are reported.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Year 1} &= 2{,}000{,}000(1.25 - 1.30) \\
> > &= -100{,}000 \\
> > \text{Year 2} &= 2{,}000{,}000(1.27 - 1.25) \\
> > &= 40{,}000
> > \end{align*}
> > $$
> > The insurer reports a transaction loss of \$100,000 in net income in the first year and a gain of \$40,000 in the second, a net loss of \$60,000 over the life of the recoverable. The losses reach net income, not OCI, because the recoverable is in a currency other than the insurer's functional currency. An insurer would usually hold pound assets or a currency hedge against an exposure like this.

> [!tip]- How it appears on the exam
> - **CFE-201 learning outcome 2c:** Candidates analyze the impact of accounting policies related to taxes and foreign exchange rates on financial statements, from Robinson's chapter on multinational operations. A typical question gives a subsidiary's statements and rates and asks for the translated statements, the CTA or the remeasurement gain, and the effect on ratios.
> - **Method choice:** Written parts ask candidates to identify the functional currency from the facts, choose the method, and explain how the choice changes reported net income, equity and ratios.
> - **Cross-border valuation:** Under outcomes 1a to 1c, Koller's chapter on cross-border valuation supports questions on valuing a foreign business in a consistent currency.

> [!warning]- Exam traps
> - **Method from the parent's view:** The method follows the subsidiary's functional currency. A subsidiary that operates independently in its own currency uses the current rate method, whatever the parent's currency.
> - **Gains in the wrong statement:** Translation adjustments under the current rate method go to OCI, while temporal remeasurement gains and transaction gains go to net income. Putting a CTA in net income misstates earnings.
> - **Opposite exposures:** The current rate method's exposure is net assets, and the temporal method's is net monetary assets. A subsidiary with net assets but net monetary liabilities shows a gain under one method and a loss under the other for the same rate move.
> - **Equity at the closing rate:** Share capital stays at the historical rate and retained earnings build up from translated income. Translating equity at the closing rate leaves no CTA, which is wrong.
> - **The quotation:** A rate quoted as euros per dollar must be inverted before it is used as dollars per euro. A mixed-up quote reverses the sign of every gain and loss.
