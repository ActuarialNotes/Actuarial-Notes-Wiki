---
Title: "Managing Interest Rate Risk: ALM, Franchise Value, and Strategy"
Authors: "William H. Panning"
Publisher: "Willis Re"
Year: "2006"
date: "2006"
Type: "Paper"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2021-03/9_Panning.pdf)"
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:9dda1e05caec882305ff24eb4fbfd89e5a13c36ffaa8b5ccb815b63755176b0c
  sources:
    - "Panning, Managing Interest Rate Risk: ALM, Franchise Value, and Strategy (Willis Re Working Paper, July 2006), pp.1-12 read in full (title page, contents p.2, Sections 1-8, Table 1 p.9, formulas pp.6-9 read from the rendered pages), sha256:9f569b0edf7a677b08716b2c06103c0c7826007d00c5a17c5f4d32f129e32278 — https://www.casact.org/sites/default/files/2021-03/9_Panning.pdf"
    - "CAS Exam 9 Content Outline, Fall 2026 (v01 2026-03-18), p.5 Domain C tasks C1-C7 and pp.7-8 text references, sha256:be1980d41470fed30dec1b9af9412f4e936d666e65d01237684acde11f3e7fc8 — https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf"
  open_findings: 0
  open_critical: 0
  log: ".verify/Resources/Books/Managing Interest Rate Risk: ALM, Franchise Value, and Strategy (Panning - 2006).md"
---
![[Managing Interest Rate Risk- ALM, Franchise Value, and Strategy (Panning - 2006) - Cover.svg]]

A Willis Re working paper on how an insurer's asset-liability management can account for franchise value, the present value of its future renewals. Its author, William H. Panning of Willis Re, argues that accounting rules do not recognize franchise value even though it can be a significant part of an insurer's total economic value and is exposed to interest rate risk. Using a simplified insurance firm, he quantifies that value and its duration, and shows how a pricing strategy can manage it without creating rating agency or regulatory problems.

> [!info] On the syllabus
> - [[Exam 9 (CAS)|Exam 9]] — objectives C3 and C5; the whole paper (listed in the content outline as an online publication, tasks C3 and C5).

## Executive Summary
- The objective of asset-liability management (ALM) is to measure and manage the degree to which an insurer's economic value is adversely exposed to changes in interest rates, which makes ALM a component of [[Enterprise Risk Management|enterprise risk management]].
- As practiced by most insurers, ALM fails to take into account franchise value, the economic value to the firm of future renewals; accounting rules do not recognize it, but it can be a significant portion of an insurer's total economic value, which is reflected in its market value.
- For a firm with substantial franchise value, strategies that limit economic risk from changes in interest rates can create rating agency or regulatory problems, since those entities view the firm from an accounting point of view.
- The solution presented is a pricing strategy that controls the interest rate exposure of the future cash flows from new business, extending the analysis first presented in Panning (1994).

## 1 Introduction
- Many property-casualty executives believe they are managing the value of the firm, but are managing only the portion visible in the accounting numbers; ALM protects the value of the firm only if it recognizes the invisible portion of that value and makes it visible to senior management.
- In the direct-marketing example the paper opens with, the first policy is sold at an expected loss because direct marketing costs more than selling through an agent, but it obtains a customer likely to renew repeatedly with no marketing costs or commissions, so the later profits more than offset the first-policy loss.
- The prospective renewals are a valuable asset, which the paper calls franchise value; accounting rules typically do not recognize it, except that a firm sold for more than its book value has the excess booked by the purchaser as goodwill.
- The economic model showed that the better strategy was to grow the business as quickly as possible in the early years, despite the accounting losses, so as to maximize profits from renewals later on.
- Three implications for ALM follow:
    - Franchise value is real, and is typically, although imperfectly, reflected in an insurer's stock price.
    - Because franchise value is the present value of expected future cash flows from renewal business, it is exposed to [[Interest Rate Risk|interest rate risk]], yet ALM as typically practiced ignores it.
    - Franchise value is typically invisible to senior executives, so it remains unmeasured, unreported and unmanaged, and ALM remains incomplete until it is recognized, measured and reported.
- The paper's objective is to quantify franchise value, measure its sensitivity to changes in interest rates, demonstrate a significant challenge to managing that risk effectively, and show how firms can solve the problem with an appropriate pricing strategy.

## 2 A simplified insurance firm
- A simple model is best for creating understanding, whereas a model for applying that understanding is necessarily more complex; here the purpose is understanding, so the model ignores many realistic but irrelevant complexities.
- The model addresses four questions: how significant franchise value is as a component of a firm's overall value, how sensitive it is to interest rate risk, what strategies firms can use to protect it from interest rate risk, and which of those strategies is best.
- The firm's characteristics:
    - It writes all of its business on January 1 of each year and pays all expenses for the year on that same day.
    - On December 31 it learns the true value of the losses and loss adjustment expenses on the policies it wrote in January and pays them that day, so accident year, policy year and calendar year are identical for this company.
    - Expenses and expected losses are identical every year.
    - A profit is immediately dividended to shareholders, and a loss is immediately met by raising equity to restore the initial surplus, so surplus is identical every year.
    - The model ignores insolvency, taxes, loss payments over multiple years and the costs of raising capital.
    - The term structure of interest rates is flat, and all calculations occur on January 1, right after the new business is written.
- The notation:
    - $P$ is the written premium, which can vary yearly; $E$ is the annual expenses, constant; $L$ is the expected loss and loss adjustment expenses paid each year, constant.
    - $y$ is the risk-free interest rate, used both for the income from the firm's assets and for discounting its future cash flows.
    - $S$ is the surplus, the same every year; $k$ is the target return on surplus.
    - $cr$ is client retention, the percentage of clients who renew their policies from one year to the next.
    - $F$ is the franchise value, the present value of cash flows from future renewals; $C$ is the current economic value, the present value of surplus and business already written.
- The firm's total economic value is the combination of current economic value and franchise value; the paper notes that total economic value, as imperfectly represented by market value, also includes the present value of growth prospects, which it does not model.
- The untaxed net income of the firm is set equal to the target dollar return on surplus; the first three terms are underwriting income and the remaining terms are interest earned on surplus plus premiums less expenses:

> $$P - L - E + (S + P - E)\,y = k\,S$$

- The firm achieves its target return on surplus by setting its premium to:

> $$P = \frac{S\,(k-y) + L}{1+y} + E$$

## 3 The value of the firm
- The firm's current economic value $C$ is the value of its current assets (surplus plus premiums less expenses) less the discounted value of its expected losses; this representation ignores risk premiums, which the paper treats as important but appropriately addressed on another occasion:

> $$C = S + P - E - \frac{L}{1+y}$$

- With $S = 50$, $L = 75$, $E = 25$ and $y = 5\%$, the premium that achieves a target return on surplus of $k = 15\%$ is $P = 101.19$, and $C = 54.76$.
- Franchise value takes both the time value of money and client retention into account: if interest rates and the target return stay unchanged, the values $P$, $L$ and $E$ in a given year are followed by $P\cdot cr$, $L\cdot cr$ and $E\cdot cr$ in the next year, so the present-value multiplier is $d = cr/(1+y)$.
- The present value of future premiums is $P(d + d^2 + \dots + d^n)$, which converges to $P\,d/(1-d)$ as $n \to \infty$; when $cr = 1$ this is identical to the formula for the present value of a perpetuity.
- Future expenses have present value $E\,d/(1-d)$, and losses, paid a year after premiums and expenses, have present value $[L\,d/(1-d)]/(1+y)$; combined, they give the franchise value:

> $$F = \left[P - E - \frac{L}{1+y}\right]\frac{d}{1-d}$$

- With client retention $cr = 90\%$ and the parameter values above, $F = 28.57$ and the firm's total economic value is 83.33, taken to be identical to its total market value when it is publicly traded, which makes the ratio of market value to economically adjusted book value approximately 1.5.
- Figure 1 shows the market-to-book ratio against client retention, climbing rapidly at high retention levels.
- Figure 2 shows franchise value as a percent of total market value $F + C$; when client retention is 80% or greater, franchise value is a significant percentage (20% or more) of the firm's total market value.
- The figures are illustrative because they hold the other variables constant; franchise value is also significantly affected by the level of interest rates, by the target return on surplus and, most important, by pricing strategy.

## 4 The interest rate sensitivity of franchise value
- The firm sets its premiums so that expected net income equals $k\,S$, where the target return on surplus may be fixed or may depend on current interest rates: $k = a + b\,y$, where $a$ and $b$ are constants for a given firm and $y$ is the spot interest rate for the maturity of its liabilities, here one year.
- If $b = 0$ the target dollar return is simply $a\,S$, for example a CEO setting a 15% target (so $b = 0$ and $a = 15\%$); a fixed target can be problematic because interest rates may rise to exceed it, as they briefly did in the early 1980s.
- A more pragmatic policy sets the target return as the risk-free rate plus a risk premium, so $b = 1$ and $a$ is the risk premium, say 10%, which with $y = 5\%$ again gives a 15% target return.
- Under pricing policies where $b \neq 0$ the premiums vary with the level of interest rates, which must be taken into account when calculating the duration of franchise value; the values of $a$ and $b$ are behavioral assumptions reflecting what the firm actually does, not necessarily what it professes to do.
- Given this specification of $k$, the franchise value can be restated, producing the same value as before for combinations of $a$ and $b$ that give a 15% target return:

> $$F = \frac{cr\cdot S\cdot\left(a + (b-1)\,y\right)}{(1+y)(1+y-cr)}$$

- By definition the [[Duration|duration]] of $F$ with respect to interest rates is $D = -\frac{dF/dy}{F}$, the negative of the first derivative of $F$ with respect to $y$ as a percentage of the current value of $F$; the paper gives the result of "a series of tedious calculations", and for $a = 15\%$ and $b = 0$, $D = 17.6$:

> $$D = \frac{a - b + 1}{(1+y)(a + b\,y - y)} + \frac{1}{1+y-cr}$$

- Table 1 gives the present value and duration of the components of franchise value, and the dollar duration of franchise value is the sum of the present value times the duration of each component:
    - Premiums have an annual value of 101.19, a present value of 607.14, a duration of 7.85 and a dollar duration of 4,768.71.
    - Losses have an annual value of -75.00, a present value of -428.57, a duration of 7.62 and a dollar duration of -3,265.31.
    - Expenses have an annual value of -25.00, a present value of -150.00, a duration of 6.67 and a dollar duration of -1,000.00.
    - The total has a present value of 28.57, a duration of 17.62 and a dollar duration of 503.40; the key is to calculate the present value and dollar duration of the total first, and divide the latter by the former to obtain the duration of the total.
- The duration of future premiums is significantly higher than that of losses and expenses because premium cash flows are interest-sensitive: when interest rates rise, premium cash flows become smaller under the assumed pricing policy (a constant 15% target return).
- A rise in interest rates therefore has a double impact: the present value of each dollar of future premiums declines, and the number of dollars of future premiums also declines; the first effect is unavoidable, but the magnitude of the second can be changed by adopting a different pricing strategy.

## 5 Managing the interest rate risk of franchise value
- A principal goal of ALM is to measure and manage the sensitivity of a firm's total economic value to changes in interest rates.
- In the example, the firm invests its current assets (surplus plus written premiums less expenses) in a portfolio with a duration of one year, and its liabilities have a maturity of one year and a duration just less than one year, so the duration of its current economic value (54.76) is one year.
- Taking franchise value of 28.57 into account makes the total economic value 83.33, or 52% larger than the current economic value, and this additional component has a duration of 17.62; the total economic value therefore has a duration of $(54.76 \times 1 + 28.57 \times 17.62)/83.33 = 6.70$.
- The traditional approach to reducing that duration is to reduce the duration of invested assets, either by changing the composition of the investment portfolio or by purchasing derivative securities that modify the asset duration; reducing the asset duration to zero reduces the duration of total economic value only to 5.18.
- With client retention of 95% rather than 90%, franchise value is an even greater portion of total economic value, and reducing the asset duration to zero reduces the duration of total economic value only from 10.03 to 8.76.
- This presents a practical dilemma with two aspects:
    - The greater the franchise value, the more difficult it is to manage the interest rate risk of total economic value by reducing the duration of the investment portfolio; a firm with significant franchise value would have to reduce the duration of its invested assets to zero or below, which is infeasible in practice although possible in principle.
    - The benefits of such a strategy would be totally invisible to regulatory authorities and rating agencies, who see only accounting numbers and might view actions intended to protect total economic value as increasing the firm's risk or as jeopardizing its solvency and financial ratings.

## 6 Using pricing strategy to manage total economic value
- A solution is a pricing strategy that substantially alters the sensitivity of total economic value to interest rates: changing the parameters from $a = 15\%$ and $b = 0$ to $a = 10\%$ and $b = 1$ leaves the target return at 15% when the risk-free yield is 5%, but cuts the duration of franchise value from 17.62 to 7.62 and of total economic value from 6.70 to 3.27.
- A more systematic approach is to find a combination of $a$ and $b$ such that both the return on surplus and the duration of total economic value are acceptable, by systematic numerical search or constrained optimization; to keep a 15% target return with a total economic value of zero duration, the firm in the example should use $a = 6.2\%$ and $b = 1.763$.
- Figure 3 shows the effect of interest rates and of these three pricing strategies on franchise value.
- Managing the duration of total economic value through pricing has limitations: a desired combination of target return on surplus and target duration can be rigidly maintained only over a rather narrow range of interest rates, because large changes in rates disrupt the combination; the same limitation is ubiquitous in ALM because of the nonlinearity of prices relative to interest rates, as with the duration of a bond portfolio.
- Very ambitious ALM goals require more complex strategies than the simple duration management considered here.
- The strategy's virtue is that it avoids the rating agency and regulatory risk of managing the duration of invested assets, because implementing a pricing strategy is nearly as invisible to those external audiences as the franchise value it protects.
- Financial service firms are not very transparent to outsiders such as rating agencies, stock analysts and regulators, who rely heavily on rules of thumb and on the idiosyncratic data available in statutory reports; the paper illustrates this with a regulator meeting dominated by a single downgraded municipal bond that was about 0.1% of the bond portfolio.

## 7 Conclusion
- It has long been recognized that exposure to interest rate risk depends on the assets and liabilities on the balance sheet and the volatility of interest rates; the paper adds two insights.
- The first is that relying on traditional accounting rules to identify a firm's economic assets and liabilities can blind us to the importance of franchise value, the present value of an insurer's future renewals; the paper demonstrates it for the direct marketing of personal lines insurance, quantifies it for plausible parameters, and quantifies the sensitivity of franchise value and total economic value to interest rates.
- The second is that a firm's exposure to interest rate risk can also depend on a third variable, the pricing strategy it adopts, which can avoid the difficulties of protecting franchise value and is flexible in achieving a targeted duration and a targeted return on surplus.
- Pricing strategy has limitations as an ALM tool, but they arise from the pricing nonlinearities that also afflict the more conventional methods.
- The second insight generalizes Panning (1999), which showed that the risk of an equity portfolio can be substantially altered by an appropriate dynamic investment strategy, to a dynamic pricing strategy for managing the interest rate risk of franchise value.
- The author hopes the analysis will make franchise value, an important but invisible asset, more visible and ultimately enable insurers to manage it.

## 8 References
- Four references: Babbel and Merrill (2005), Panning (1994), Panning (1999) and Panning (2003).

## Sources
- [Managing Interest Rate Risk: ALM, Franchise Value, and Strategy (Panning, Willis Re)](https://www.casact.org/sites/default/files/2021-03/9_Panning.pdf) — the document, a 12-page PDF with a text layer (sha256 9f569b0edf7a…): title page, executive summary, the contents list, Sections 1–8, Table 1 and the formulas, read from the text and checked against the rendered pages; the title page prints no date, so the year comes from the content outline's citation
- [CAS Exam 9 Content Outline, Fall 2026](https://www.casact.org/sites/default/files/2026-03/Exam_9_CO_2026_Fall.pdf) — the citation (Willis Re Working Paper, July 2006), the abbreviation Panning, the tasks C3 and C5 and the online-publication source type
