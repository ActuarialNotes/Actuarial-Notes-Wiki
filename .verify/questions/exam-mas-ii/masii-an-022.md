---
target: questions/exam-mas-ii/masii-an-022.md
created: 2026-10-18
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T14:03Z/g6m2
- date: 2026-10-18
- status_set: verified
- confidence: medium
- checks_run: blind recomputation in Python before reading the key; every distractor's stated reasoning reproduced; explanation worked line by line; wiki_link targets exist (spaces as +) and sit on Exam MAS-II (CAS).md; topic/learning_objective match the exam page domain; format per question-writer formats.md; validate_content.py clean
- sources_checked: NIST/SEMATECH e-Handbook of Statistical Methods, §6.4.4.6 Box-Jenkins Model Identification, sha256:5b9f5c9fc2ca32741d35d3218d0c94f95a2fd5cdc4adcdbe28dacc200a185921 — https://www.itl.nist.gov/div898/handbook/pmc/section4/pmc446.htm
- note: 2/sqrt(200) = 0.1414. NIST §6.4.4.6: AR(p) PACF 'becomes zero at lag p + 1 and greater', band approximately ±2/sqrt(N); MA(q) ACF becomes zero after lag q; 'No decay to zero - Series is not stationary'. ACF tails off, PACF significant at lags 1-2 only: AR(2), key E. Cowpertwait (assigned, commercial) not reached; NIST is rank 3.
