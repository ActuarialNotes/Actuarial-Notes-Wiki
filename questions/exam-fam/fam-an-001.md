---
id: "fam-an-001"
exam: "Exam FAM"
topic: "Cash Flow"
learning_objective: "Option Pricing Fundamentals"
difficulty: easy
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Cash+Flow
  - Concepts/Payoff
  - Concepts/European+Option
answer: "B"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-19
  last_checked_by: agent:validate-v1
  content_hash: sha256:4d15d853d53aef774f1db23bb4ecfad415e0215264729cb48fb4cb116adf3acf
  sources:
    - "Wikipedia, Put option (fetched 2026-10-19), Put option: holder's right to sell at strike to the writer; writer receives premium, buys at strike on exercise; writer long the underlying; value K-S at exercise, sha256:09e1271c87e00bfee9d9819260d6473327585d7265ed72b01eb8f12552a7120b — https://en.wikipedia.org/wiki/Put_option"
    - "SOA Exam FAM Syllabus, October 2026, Topic 6 (a), (c) p.5; Topic 7 (a), (b) p.6; Topic 2 (m) p.3, sha256:90172025d8bd9d69e18e974fdee447963e54258e5f0e419aa3ef5b7d3e55a00e — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-fam-syllabus.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-fam/fam-an-001.md
---

An investor writes (sells) one 1-year European put option on a non-dividend-paying stock. You are given:

i) The strike price is 50.

ii) The put premium is 4.20.

iii) The continuously compounded risk-free interest rate is 5%.

iv) The stock price at expiry is 43.

Determine the cash flows to the writer of the put at time 0 and at expiry.

- A) Pays 4.20 at time 0; receives 7.00 at expiry
- B) Receives 4.20 at time 0; pays 7.00 at expiry
- C) Receives 4.20 at time 0; pays nothing at expiry
- D) Receives 4.20 at time 0; pays 2.58 at expiry
- E) Nothing at time 0; pays 2.80 at expiry

## Explanation

The buyer of an option pays the premium at time 0; the writer receives it. At expiry the put's holder may sell the stock for the strike, so the put pays its holder

$$(K - S_T)^+ = \max(50 - 43,\ 0) = 7$$

and the writer, on the other side of the contract, pays that amount. The writer's cash flows are therefore **+4.20 at time 0 and -7.00 at expiry**. The answer is **B**.

Profit is a summary of these two cash flows (here the profit at expiry is $P e^{r} - 7 = -2.58$, with premium $P = 4.20$ and $r = 0.05$), not a cash flow of its own; the interest rate matters only if you want that summary.

**Why not the others**

- **A** is the *holder's* (long put's) cash flows: the signs are reversed.
- **C** treats the option as a call. A call with strike 50 expires worthless at $S_T = 43$; a put is in the money when the stock falls below the strike.
- **D** deducts the accumulated premium from the payoff, $K - S_T - P e^{r} = 2.58$, while also counting the premium received at time 0, so the premium is counted twice.
- **E** reports the profit ignoring interest, 4.20 - 7.00 = -2.80, as if it were a payment at expiry. The premium changes hands at time 0, not at expiry.
