---
target: questions/exam-srm/srm-an-002.md
created: 2026-10-18
---

## [C-001] Validation pass — verified
- entry_type: comment
- author: agent:validate-v1
- run_id: 2026-10-18T19:37Z/7805
- date: 2026-10-18
- status_set: verified
- confidence: high
- checks_run: blind recomputation: test-MSE minimum at degree 3 (27.1), test MSE rising above it while training MSE falls -> E, before reading the key; every figure the explanation quotes re-read off the table (gaps 1.8/2.3/2.2/4.8/12.1, degree 8 second-worst test MSE); distractor rationales checked against ISLR; section citations against the PDF outline; syllabus scope
- sources_checked: James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer, 2021), §2.2.1 Measuring the Quality of Fit, pp.31-32 (PDF pp.42-43); §5.1.1, pp.198-200 (PDF pp.207-209), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf; SOA Exam SRM syllabus, January 2027 (Basics of Statistical Learning; Linear Models obj. 7; Time Series Models obj. 1-2; readings ISLR Ch.2 §1-3, Ch.3 §1-6, Ch.5 §1; Frees Ch.8 §1-4, Ch.9 §1-5), sha256:2165c0dec2c26a810a100a504f6a38ac05f02348c1af26e4c8ad71b679eb56af — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-01-exam-srm-syllabus.pdf
- note: Key E confirmed. ISLR §2.2.1 p.32: 'a monotone decrease in the training MSE and a U-shape in the test MSE'; 'we almost always expect the training MSE to be smaller than the test MSE' (refutes C exactly as the explanation does); 'Overfitting refers specifically to the case in which a less flexible model would have yielded a smaller test MSE' (degrees 5 and 8). The table is invented data, internally consistent. Citations §2.2.1 and §5.1.1 are correct. Within SRM 'Basics of Statistical Learning' obj. 2-4 (training set vs test set approach).
