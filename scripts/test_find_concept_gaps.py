"""Tests for scripts/find_concept_gaps.py's naming rules.

    python3 -m unittest scripts/test_find_concept_gaps.py
"""

import os
import sys
import unittest

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import find_concept_gaps as g  # noqa: E402


class ConceptKey(unittest.TestCase):
    def test_spellings_of_one_concept_share_a_key(self):
        same = ["Delta Hedging", "Delta-Hedging", "delta hedging"]
        self.assertEqual(len({g.concept_key(s) for s in same}), 1)
        self.assertEqual(g.concept_key("Policy Limits"), g.concept_key("Policy Limit"))
        self.assertEqual(g.concept_key("Predictive Modelling"), g.concept_key("Predictive Modeling"))
        self.assertEqual(g.concept_key("Value at Risk (VaR)"), g.concept_key("Value at Risk"))

    def test_plural_rules_leave_singular_words_alone(self):
        self.assertEqual(g.singular("analysis"), "analysis")
        self.assertEqual(g.singular("statistics"), "statistics")
        self.assertEqual(g.singular("liabilities"), "liability")


class StemKey(unittest.TestCase):
    def test_joins_derivations_of_one_term(self):
        self.assertEqual(g.stem_key("Maximum Likelihood Estimator"), g.stem_key("Maximum Likelihood Estimation"))
        self.assertEqual(g.stem_key("Predictive Modeling"), g.stem_key("Predictive Model"))

    def test_keeps_different_terms_apart(self):
        self.assertNotEqual(g.stem_key("Insurable Risk"), g.stem_key("Insurance Risk"))
        self.assertNotEqual(g.stem_key("Insurance Product"), g.stem_key("Insurance Producer"))
        self.assertIsNone(g.stem_key("Mortality"))


class Noise(unittest.TestCase):
    def test_non_concepts(self):
        for name in ("Cannot", "Differ Compared", "Business Context", "Transform Data",
                     "Parameters Affect", "Appropriate", "Company'", "Required"):
            self.assertTrue(g.is_noise(name), name)

    def test_reviewed_noise(self):
        for name in ("Effective Manner While", "Jurisdiction", "Biases Introduced", "Benefits Payable",
                     "Physicians Play", "United State", "Organization's Ability", "Claim Amounts Paid"):
            self.assertTrue(g.is_noise(name), name)

    def test_real_terms_with_ordinary_words(self):
        for name in ("Account Value", "Market Risk", "Economic Capital", "Normal Cost",
                     "Multiple Decrement", "Early Retirement", "Retirement Plan", "Mortality"):
            self.assertFalse(g.is_noise(name), name)


class Acronyms(unittest.TestCase):
    def test_explicit_acronym_only_when_initials_are_off(self):
        self.assertEqual(g.acronym_of("Value at Risk (VaR)", initials=False), "VAR")
        self.assertIsNone(g.acronym_of("Defined Benefit", initials=False))
        self.assertEqual(g.initials_all("Value at Risk"), "VAR")

    def test_bare_acronym(self):
        self.assertTrue(g.is_acronym("TVaR"))
        self.assertTrue(g.is_acronym("ALM"))
        self.assertFalse(g.is_acronym("Mortality"))


class Prerequisites(unittest.TestCase):
    def test_a_named_part_comes_first(self):
        self.assertTrue(g.depends_on("Delta Hedging", "Delta"))           # a term of art
        self.assertTrue(g.depends_on("Health Insurance Company", "Health Insurance"))
        self.assertFalse(g.depends_on("Insurance Company", "Insurance"))  # a bare word is not a prerequisite
        self.assertFalse(g.depends_on("Delta", "Delta Hedging"))


class Domains(unittest.TestCase):
    def test_fam_is_split_by_section(self):
        self.assertTrue(g.domain_of("fam-1", "Mortality Models").startswith("Long-term"))
        self.assertTrue(g.domain_of("fam-1", "Severity, Frequency, and Aggregate Models").startswith("Short-term"))
        self.assertTrue(g.domain_of("fam-1", "Option Pricing Fundamentals").startswith("Financial"))
        self.assertTrue(g.domain_of("gh-101", None).startswith("Health"))


if __name__ == "__main__":
    unittest.main()
