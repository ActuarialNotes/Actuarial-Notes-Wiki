---
id: p-074
topic: Univariate Random Variables
subtopic: Expected Value
difficulty: medium
type: multiple-choice
tags:
  - exam-p
  - binomial-distribution
  - expected-value
wiki_link: Concepts/Expected+Value
answer: E
points: 1
---

A tour operator has a bus that can accommodate 20 tourists. The operator knows that tourists may not show up, so he sells 21 tickets. The probability that an individual tourist will not show up is 0.02, independent of all other tourists.

Each ticket costs 50, and is non-refundable if a tourist fails to show up. If a tourist shows up and a seat is not available, the tour operator has to pay 100 (ticket cost + 50 penalty) to the tourist.

Calculate the expected revenue of the tour operator.

- A) 955
- B) 962
- C) 967
- D) 976
- E) 985

## Explanation

The tour operator initially collects $21 \times 50 = 1050$ from selling 21 tickets.

A penalty is paid if and only if all 21 tourists show up. The number of tourists that show up, $N$, follows a binomial distribution with $n=21$ and $p = 1 - 0.02 = 0.98$.

The probability that all 21 show up is $P(N = 21) = \binom{21}{21}(0.98)^{21}(0.02)^0 = (0.98)^{21} \approx 0.654$.

If all 21 show up, the operator must pay back 100 to the 21st passenger. The expected penalty payout is $100 \times P(N=21) = 100(0.654) = 65.4$.

The expected revenue is the collected amount minus the expected penalty:
$$E[\text{Revenue}] = 1050 - 65.4 = 984.6 \approx 985$$
