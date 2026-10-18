---
target: questions/exam-mas-ii/masii-an-005.md
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
- sources_checked: NIST/SEMATECH e-Handbook of Statistical Methods, §6.4.4.6 Box-Jenkins Model Identification, sha256:5b9f5c9fc2ca32741d35d3218d0c94f95a2fd5cdc4adcdbe28dacc200a185921 — https://www.itl.nist.gov/div898/handbook/pmc/section4/pmc446.htm; NIST/SEMATECH e-Handbook of Statistical Methods, §6.4.4.8 Box-Jenkins Model Diagnostics, sha256:679fab31f21e0a357942a10c8214750aee9e5933bf2986958974a176e03d866f — https://www.itl.nist.gov/div898/handbook/pmc/section4/pmc448.htm
- note: 2/sqrt(120) = 0.1826. NIST §6.4.4.8: residuals of an adequate model should be white noise, checked on their autocorrelation plot; §6.4.4.6: 'High values at fixed intervals - include seasonal autoregressive term', and for monthly data 'a seasonal AR 12 term'; slow decay indicates non-stationarity (D's reasoning). Cowpertwait, the assigned Domain D reading, is a commercial book and was not reached; NIST is rank 3.
