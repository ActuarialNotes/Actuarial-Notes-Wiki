#!/usr/bin/env python3
"""
ontology_map.py — canonical mapping data for question standardization.

For every distinct `topic` (or `subtopic`, when the topic is a broad exam area)
found in the question bank, this maps to:
  - concept:            the exact Concepts/<name>.md page the topic should be (and
                        the page that must appear in `wiki_link`).
  - learning_objective: the exam syllabus callout name, verbatim, from
                        "Exam P-1 (SOA).md" / "Exam FM-2 (SOA).md".

`standardize_questions.py` consumes this; it is intentionally data-only.

When `concept` has no Concepts/<concept>.md page, standardize_questions.py
creates a stub. Trivial naming variants (apostrophes, "X Distribution" -> "X",
plural -> singular) are folded onto an existing page; genuinely new groupings
get a new page.
"""

# Exam P syllabus learning objectives (verbatim callout names)
P_GENERAL = "General Probability"
P_UNIVARIATE = "Univariate Random Variables"
P_MULTIVARIATE = "Multivariate Random Variables"

# Exam FM syllabus learning objectives (verbatim callout names)
FM_TVM = "Time Value of Money"
FM_ANNUITIES = "Annuities/Cash Flows with Non-Contingent Payments"
FM_LOANS = "Loans"
FM_BONDS = "Bonds"
FM_GENERAL = "General Cash Flows, Portfolios, and Asset Liability Management"

# key (raw topic or subtopic string, quotes stripped) -> (concept page, learning objective)
ONTOLOGY: dict[str, tuple[str, str]] = {
    # ── Exam P ────────────────────────────────────────────────────────────────
    "Conditional Probability": ("Conditional Probability", P_GENERAL),
    "Expected Value": ("Expected Value", P_UNIVARIATE),
    "Discrete Univariate Distributions": ("Discrete Univariate Distributions", P_UNIVARIATE),
    "Discrete Distributions": ("Discrete Univariate Distributions", P_UNIVARIATE),
    "Variance and Standard Deviation": ("Variance and Standard Deviation", P_UNIVARIATE),
    "Central Limit Theorem": ("Central Limit Theorem", P_MULTIVARIATE),
    "Bayes' Theorem": ("Bayes Theorem", P_GENERAL),
    "Bayes Theorem": ("Bayes Theorem", P_GENERAL),
    "Set Theory and Venn Diagrams": ("Set Theory", P_GENERAL),
    "Set Theory": ("Set Theory", P_GENERAL),
    "Venn Diagram": ("Venn Diagram", P_GENERAL),
    "Continuous Univariate Distributions": ("Continuous Univariate Distributions", P_UNIVARIATE),
    "Probability Rules": ("Probability Rules", P_GENERAL),
    "Linear Combinations of Random Variables": ("Linear Combinations of Random Variables", P_MULTIVARIATE),
    "Conditional Probability Function": ("Conditional Probability Function", P_MULTIVARIATE),
    "Independent Random Variables": ("Independent Random Variables", P_MULTIVARIATE),
    "Transformations of Random Variables": ("Continuous Univariate Distributions", P_UNIVARIATE),
    "Percentiles": ("Percentile", P_UNIVARIATE),
    "Law of Total Probability": ("The Law of Total Probability", P_GENERAL),
    "Total Probability": ("The Law of Total Probability", P_GENERAL),
    "Probability": ("Probability", P_GENERAL),
    "Independence": ("Independent Events", P_GENERAL),
    "Independent Events": ("Independent Events", P_GENERAL),
    "Distribution of Order Statistics": ("Order Statistics", P_MULTIVARIATE),
    "Poisson Distribution": ("Poisson", P_UNIVARIATE),
    "Normal Distribution": ("Normal", P_UNIVARIATE),
    "Exponential Distribution": ("Exponential", P_UNIVARIATE),
    "Binomial Distribution": ("Binomial", P_UNIVARIATE),
    "Covariance and Correlation": ("Covariance and Correlation Coefficient", P_MULTIVARIATE),
    "Combinatorics and Counting": ("Combinatorics", P_GENERAL),
    "Combinatorics": ("Combinatorics", P_GENERAL),

    # ── Exam FM ───────────────────────────────────────────────────────────────
    "Immunization": ("Immunization", FM_GENERAL),
    "Bond Pricing": ("Bond Price", FM_BONDS),
    "Bond Amortization": ("Bond Amortization", FM_BONDS),
    "Loan Amortization": ("Loan Amortization", FM_LOANS),
    "Loan Repayment Comparison": ("Loan Repayment Comparison", FM_LOANS),
    "Duration": ("Duration", FM_GENERAL),
    "Geometrically Increasing Annuity": ("Geometric Increasing Annuity", FM_ANNUITIES),
    "Increasing Annuity": ("Increasing Annuity", FM_ANNUITIES),
    "Increasing Annuities": ("Increasing Annuity", FM_ANNUITIES),
    "Decreasing Annuity": ("Decreasing Annuity", FM_ANNUITIES),
    "Geometrically Increasing Perpetuity": ("Geometric Increasing Perpetuity", FM_ANNUITIES),
    "Continuous Annuity": ("Continuous Annuity", FM_ANNUITIES),
    "Annuities": ("Annuities", FM_ANNUITIES),
    "Annuity-Due": ("Annuity Due", FM_ANNUITIES),
    "Perpetuity": ("Perpetuity", FM_ANNUITIES),
    "Fund Accumulation": ("Fund Accumulation", FM_TVM),
    "Spot Rates and Forward Rates": ("Spot Rates and Forward Rates", FM_GENERAL),
    "Force of Interest": ("Force of Interest", FM_TVM),
    "Time Value of Money": ("Time Value of Money", FM_TVM),
    "Net Present Value": ("Net Present Value", FM_TVM),
    "Accumulated Value": ("Accumulated Value", FM_TVM),
    "Present Value": ("Present Value", FM_TVM),
    "Nominal Interest Rate": ("Nominal Interest Rate", FM_TVM),
    "Nominal Discount Rate": ("Nominal Discount Rate", FM_TVM),
    "Simple vs Compound Interest": ("Simple vs Compound Interest", FM_TVM),
    "Compound Interest": ("Compound Interest", FM_TVM),
    "Yield Rate": ("Yield Rate", FM_GENERAL),

    # broad exam-area topics that always carry a subtopic — kept as fallbacks
    "Financial Mathematics": ("Time Value of Money", FM_TVM),
}

# CAS syllabus learning objectives — the callout titles of "Exam MAS-I (CAS).md",
# "Exam MAS-II (CAS).md" and "Exam 5 (CAS).md" with the domain letter dropped
# (`A. Ratemaking` → `Ratemaking`). The letter is the content outline's, and the
# app and scripts/syllabus_lint.py match a question to a section with it ignored
# (`objective_key` / `objectiveKey`), so a question names the domain by its words.
MAS1_PROB = "Probability Models (Stochastic Processes and Survival Models)"
MAS1_STATS = "Statistics"
MAS1_ELM = "Extended Linear Models"
MAS2_CRED = "Introduction to Credibility"
MAS2_LMM = "Linear Mixed Models"
MAS2_SL = "Statistical Learning"
MAS2_TS = "Time Series with Constant Variance"
E5_RATEMAKING = "Ratemaking"
E5_RESERVING = "Estimating Claim Liabilities (Reserving)"

# Valid learning objectives per exam, for the validation guard.
LEARNING_OBJECTIVES = {
    "P": [P_GENERAL, P_UNIVARIATE, P_MULTIVARIATE],
    "FM": [FM_TVM, FM_ANNUITIES, FM_LOANS, FM_BONDS, FM_GENERAL],
    "MAS-I": [MAS1_PROB, MAS1_STATS, MAS1_ELM],
    "MAS-II": [MAS2_CRED, MAS2_LMM, MAS2_SL, MAS2_TS],
    "5": [E5_RATEMAKING, E5_RESERVING],
}

# Learning-objective values a CAS bank was written with that name a domain by a
# short form of its title. `standardize_questions.py --objectives` rewrites them to
# the title (question bank dir -> {old value: callout title}). The CAS banks are
# not in ONTOLOGY — their topics are too many to map by hand yet — so this is the
# one part of the ontology they share with P and FM.
OBJECTIVE_RENAMES: dict[str, dict[str, str]] = {
    "exam-mas-i": {"Probability Models": MAS1_PROB},
    "exam-mas-ii": {"Time Series": MAS2_TS},
    "exam-5": {"Reserving": E5_RESERVING},
}
