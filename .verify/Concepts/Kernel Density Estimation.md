---
target: Concepts/Kernel Density Estimation.md
created: 2026-10-05
---

## [F-001] Edge-convention bullet over-reads what the Spring 2019 Q20 key implies
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-05
- severity: minor
- status: open
- locus: bullet 'An observation exactly b from x'
- claim: The CAS answer key to MAS-I Spring 2019 Q20 counts such an observation, treating the window as the closed interval [y - b, y + b]; some texts write the uniform kernel on a half-open interval.
- evidence: CAS Exam MAS-I Spring 2019 Q20 (PDF p.24; sample 400, 600, 900, 1100, 1200; x = 800; b = 300) with Final Answer Key PDF p.50: key D (z in [0.0003, 0.0004)). Recomputed: triangular estimate = (100 + 200 + 0)/(5 x 300^2) = 0.000667; rectangular counting 1100 (= x + b) = 3/(5 x 600) = 0.001, z = 0.000333 -> D; rectangular excluding 1100 = 2/3000, z = 0 -> A. So the key requires counting an observation lying exactly b ABOVE x (x_i = x + b, i.e. x at the lower edge of that observation's window). The paper has no observation at x - b (400 is 400 away), so the key is silent on the other edge: it is equally consistent with the half-open window (x - b, x + b] that Loss Data Analytics writes in its eq. (4.2), I(x - b < X_i <= x + b) (§4.1.1.4). The convention the key rules out is LDA's Table 4.1 / eq. (4.3) form w(u) = 1/2 I(-1 < u <= 1) with u = (x - X_i)/b, which drops x_i = x + b and gives A — LDA's two forms disagree at exactly this edge (a conflict inside that source, noted, not a vault error). The page's practical guidance (count it) matches the key for the case tested, and the page's own example (x = 600, edge observation 800 = x + b) is the same side; the over-reach is only in saying the key implies the full closed interval. Tse §11.1.2 (the assigned reading) was not reachable to see its own kernel definition.
- source_rank: 1
- proposed_action: Narrow the attribution: say the key (D) requires counting an observation exactly b above x (x_i = x + b), and that a convention excluding it gives z = 0 (option A); do not attribute the full closed interval to the key unless Tse §11.1.2 is checked and defines the kernel on -1 <= u <= 1.
- applied: false
- fingerprint: 829b859d2793
