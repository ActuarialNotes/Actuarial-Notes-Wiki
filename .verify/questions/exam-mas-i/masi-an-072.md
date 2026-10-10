---
target: questions/exam-mas-i/masi-an-072.md
created: 2026-10-10
---

## [C-001] Validation pass — in_review
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masa
- date: 2026-10-10
- status_set: in_review
- checks_run: blind recomputation from the stem before reading answer/explanation; key compared with the blind answer; every distractor's arithmetic and rationale recomputed; option distinctness; explanation arithmetic line by line; wiki_link tags against what the question tests (all resolve; validate_content.py clean); learning_objective against the Exam MAS-I domain titles and the 2026 outline tasks; stated facts against the cited sources
- note: Blind: a D, b C, c A, d B; key matches all four. Sourced this session: Pareto mean excess linear, exponential constant, lognormal ~u/ln u (Ghosh & Resnick, arXiv:0907.5236, pp.1-2, 19, sha256:5ae739d6…); Weibull ln(-ln S) slope tau and failure rate k t^(k-1) (Siegrist Weibull page; CAS MAS-I tables A.3.2.3). NOT sourced: part d's key rests on a gamma with shape > 1 having an increasing hazard that tends to 1/theta and a mean excess falling to theta. No open text I could read states this (NIST's gamma hazard pages give it only as a plot; Tse 2.4 and Loss Models are commercial). Needed: Tse 2.4 (Tail properties of claim severity) or Loss Models' tail-behaviour section. Nothing found wrong.

## [C-002] Comment
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-10T19:00Z/masa
- date: 2026-10-10
- note: Second attempt (same run) to source part d (gamma with shape > 1: hazard increasing toward 1/theta, mean excess decreasing toward theta). Checked: Siegrist, "The Gamma Distribution" (randomservices.org/random/special/Gamma.html, sha256:24d8bfbac0c1cdc05848961605509fb8cc7f4182127be1ff73bf9be78fedfeb6) - no failure-rate discussion in its text; Loss Data Analytics ch.3 (sha256:263021bf…) and ch.4 (sha256:c5fe1ff2…) - hazard discussed only for the Pareto and Weibull, none for the gamma; NIST e-Handbook 1.3.6.6.11 (eda366b.htm, sha256:ea3fc3dc…) gives the gamma hazard formula and a plot only, and 8.1.6.5 (apr165.htm, sha256:849ef3ac…) plots failure-rate shapes without stating the limit; a web search for a lecture note deriving the limit found none readable. Still needed: Tse 2.4 or Loss Models (tail behaviour). Status stays in_review; the key is unchanged and nothing on the page was found wrong.
