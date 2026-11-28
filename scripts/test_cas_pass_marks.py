"""Tests for scripts/cas_pass_marks.py's table reader (no network, no PDF)."""

import json
import os
import sys
import unittest

sys.path.insert(0, os.path.dirname(__file__))

import cas_pass_marks as cpm  # noqa: E402


class ParseTable(unittest.TestCase):
    # PyMuPDF's text of a pass-mark PDF: one cell per line.
    LINES = [
        'Total', 'Points', 'Pass Mark', '95th', 'Percentile', '75th', 'Percentile', 'Comments',
        'Fall 2019', '90', '50.50', '69.50', '57.00', 'Qu. 35 both B & E accepted',
        'Spring 2018', '55.50', '42.00', '--', '--', 'Original Exam; due to difficulties',
        'Spring 2018', '53.50', '40.25', '--', '--', 'Make-Up Exam, excludes question 21',
        '11 March 2019',
    ]

    def test_reads_each_sitting(self):
        rows = cpm.parse_table(self.LINES)
        self.assertEqual(len(rows), 3)
        self.assertEqual(rows[0], {
            'session': 'Fall', 'year': 2019, 'totalPoints': 90.0, 'passMark': 50.5,
            'percentile95': 69.5, 'percentile75': 57.0, 'comment': 'Qu. 35 both B & E accepted',
        })

    def test_a_dash_is_no_figure(self):
        rows = cpm.parse_table(self.LINES)
        self.assertNotIn('percentile95', rows[1])

    def test_the_footer_date_is_no_comment(self):
        rows = cpm.parse_table(self.LINES)
        self.assertEqual(rows[2]['comment'], 'Make-Up Exam, excludes question 21')

    def test_refuses_a_row_it_cannot_read(self):
        with self.assertRaises(ValueError):
            cpm.parse_table(['Fall 2019', '90', 'fifty', '69.50', '57.00'])


class Committed(unittest.TestCase):
    def test_the_json_is_the_scripts(self):
        with open(cpm.OUT) as f:
            data = json.load(f)
        self.assertEqual(set(data['exams']), set(cpm.EXAMS))
        for exam in data['exams'].values():
            self.assertTrue(exam['source'].startswith(cpm.BASE))
            self.assertEqual(len(exam['sha256']), 64)
            for row in exam['sittings']:
                self.assertLess(row['passMark'], row['totalPoints'])
                self.assertLessEqual(row['year'], 2019)


if __name__ == '__main__':
    unittest.main()
