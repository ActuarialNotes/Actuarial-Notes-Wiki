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
    "Set Theory and Venn Diagrams": ("Set Theory and Venn Diagrams", P_GENERAL),
    "Continuous Univariate Distributions": ("Continuous Univariate Distributions", P_UNIVARIATE),
    "Probability Rules": ("Probability Rules", P_GENERAL),
    "Linear Combinations of Random Variables": ("Linear Combinations of Random Variables", P_MULTIVARIATE),
    "Conditional Probability Function": ("Conditional Probability Function", P_MULTIVARIATE),
    "Independent Random Variables": ("Independent Random Variables", P_MULTIVARIATE),
    "Transformations of Random Variables": ("Transformations of Random Variables", P_UNIVARIATE),
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

# Valid learning objectives per exam, for the validation guard.
LEARNING_OBJECTIVES = {
    "P": [P_GENERAL, P_UNIVARIATE, P_MULTIVARIATE],
    "FM": [FM_TVM, FM_ANNUITIES, FM_LOANS, FM_BONDS, FM_GENERAL],
}
