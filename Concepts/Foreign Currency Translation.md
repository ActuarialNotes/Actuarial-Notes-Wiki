---
aliases:
  - Foreign Exchange Rate
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:bfbe046e79ad9b75523cbc0823d0061f9d45873f09f7bdd66b34f1b67d67e6ca
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Foreign Currency Translation.md
---

**Foreign Currency Translation** is the restatement of a foreign operation's financial statements from its own currency into the parent's presentation currency, so that the operation can be consolidated into the group's [[Financial Statements|financial statements]]. The foreign exchange rate used for each item, and where the resulting gain or loss is reported, depend on the operation's functional currency.

The **functional currency** is the currency of the primary economic environment in which an entity operates, judged by the currency of its prices, costs and financing. The **presentation currency**, called the reporting currency in U.S. GAAP, is the one the group reports in. The method follows the subsidiary's functional currency, whatever the parent's currency:

| Subsidiary's functional currency | Method | Gain or loss goes to | Exposure |
| --- | --- | --- | --- |
| Its local currency | Current rate method | Other comprehensive income | Net assets |
| The parent's currency | Temporal method | Net income | Net monetary position |

Exchange rates $S$ are quoted as units of the presentation currency per unit of foreign currency. A rate quoted the other way, such as euros per dollar, is inverted first, since a mixed-up quote reverses the sign of every gain and loss.

## Current rate method

When the subsidiary's functional currency is its local currency, assets and liabilities are translated at the closing rate, revenues and expenses at the average rate, and share capital at the historical rate. Retained earnings build up from translated income. The balancing figure is the translation adjustment, which goes to other comprehensive income and accumulates in equity as the cumulative translation adjustment (CTA). Translating equity at the closing rate would leave no CTA, which is wrong.

The change in the CTA over a year is

> $$\Delta\text{CTA} = \text{NA}_0\,(S_1 - S_0) + \text{NI}\,(S_1 - \bar{S}) - \text{Div}\,(S_1 - S_{\text{div}})$$

- $\text{NA}_0$ is the operation's net assets at the start of the year, in foreign currency.
- $\text{NI}$ is its [[Net Income|net income]] and $\text{Div}$ its dividends for the year, in foreign currency.
- $S_0$ is the rate at the start of the year and $S_1$ the closing rate at the balance sheet date.
- $\bar{S}$ is the average rate for the year and $S_{\text{div}}$ the rate when dividends were paid.

> [!example]- What is this subsidiary's CTA at year end under the current rate method? {Example}
> A U.S. insurer formed a euro-functional subsidiary at the start of the year with €1,000 of share capital, when the rate was \$1.10 per euro. During the year the subsidiary earned revenue of €2,000, incurred expenses of €1,900 and paid no dividends. At year end it has assets of €1,800, of which €500 are cash and receivables, and liabilities of €700. The average rate for the year was \$1.15 and the closing rate is \$1.20.
>
> > [!answer]-
> > - Revenue and expenses at the average rate are \$2,300 and \$2,185, so net income is \$115 and becomes retained earnings.
> > - Assets at the closing rate are $1{,}800 \times 1.20 = \$2{,}160$, and liabilities are $700 \times 1.20 = \$840$.
> > - Share capital at the historical rate is $1{,}000 \times 1.10 = \$1{,}100$.
> > - The CTA balances the statement: $2{,}160 - 840 - 1{,}100 - 115 = \$105$.
> > - The formula agrees: $1{,}000 \times (1.20 - 1.10) + 100 \times (1.20 - 1.15) = 105$.
> > - The euro strengthened while the subsidiary held net assets in euros, so the CTA is a \$105 gain in other comprehensive income.

## Temporal method

When the subsidiary's functional currency is the parent's currency, its accounts are remeasured as if the parent had made its transactions directly. Monetary items are remeasured at the closing rate. Non-monetary items carried at historical cost, such as inventory and fixed assets, are remeasured at historical rates, and the related expenses follow them. The remeasurement gain or loss goes to net income, and the exposure is the net monetary position.

A subsidiary with net assets but net monetary liabilities shows a gain under one method and a loss under the other for the same rate move. The subsidiary in the example above holds €500 of monetary assets against €700 of liabilities. Under the temporal method that net monetary liability would make the same rise in the euro a remeasurement loss in net income.

## Highly inflationary economies

U.S. GAAP requires the temporal method for a subsidiary in a highly inflationary economy, generally one with cumulative inflation of about 100% over three years. IFRS instead restates the local statements for inflation and then translates them at the current rate.

## Transaction gains and losses

A transaction gain or loss arises when an entity has a receivable or payable in a currency other than its own functional currency. It goes to net income whatever method the group uses. Translation differences, by contrast, come only from consolidating an operation whose functional currency differs from the presentation currency.

The transaction gain on a receivable is

> $$\text{Transaction gain} = X\,(S_{\text{settle}} - S_{\text{book}})$$

- $X$ is the foreign-currency amount of the receivable, with its sign reversed for a payable.
- $S_{\text{book}}$ is the rate at which it was last recorded, and $S_{\text{settle}}$ the rate at which it is settled or remeasured.

> [!example]- What are the insurer's transaction gains and losses on this recoverable, and where are they reported? {Example}
> A U.S. life insurer with the U.S. dollar as its functional currency records a reinsurance recoverable of £2,000,000 from a U.K. reinsurer when the rate is \$1.30 per pound. At the year end the rate is \$1.25, and the recoverable is settled early the next year at \$1.27.
>
> > [!answer]-
> > - In the first year, $2{,}000{,}000 \times (1.25 - 1.30) = -\$100{,}000$, a transaction loss.
> > - In the second year, $2{,}000{,}000 \times (1.27 - 1.25) = \$40{,}000$, a transaction gain.
> > - Over the life of the recoverable the net loss is \$60,000.
> > - Both reach net income, not other comprehensive income, because the recoverable is in a currency other than the insurer's functional currency.

## Effect on reported metrics

The current rate method keeps most of the subsidiary's balance sheet ratios as they are in local currency, because all assets and liabilities move with one rate. The temporal method mixes rates and distorts ratios. Reported revenue growth combines real growth with currency movements, so analysts separate them on a constant-currency basis. In the [[Comprehensive Income|comprehensive income]] statement, a translation loss reduces equity without passing through earnings.

## Cross-border valuation

Koller, Goedhart and Wessels value a foreign business by forecasting its cash flows in the foreign currency and discounting them at a foreign-currency cost of capital, then converting the value at the spot rate. Converting each year's cash flow at the forward rate and discounting at the domestic cost of capital gives the same answer when interest rate parity holds. Under interest rate parity the forward rate for year $t$ is

> $$F_t = S_0\left(\frac{1+i_d}{1+i_f}\right)^t$$

- $S_0$ is the spot rate.
- $i_d$ and $i_f$ are the domestic and foreign interest rates.

> [!trap] Translation adjustments in net income
> Translation adjustments under the current rate method go to other comprehensive income, while temporal remeasurement gains and transaction gains go to net income. Putting a CTA in net income misstates earnings.
