"""Tests for scripts/tool_fixtures.py — the parsers that read published worked
examples into Actuarial Tools fixtures. They run on text shaped like the PDFs'
own, so they need no PDF and no PyMuPDF."""

import os
import sys
import unittest

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import tool_fixtures as tf  # noqa: E402


class ParseNumber(unittest.TestCase):
    def test_reads_the_ways_an_exhibit_prints_a_number(self):
        self.assertEqual(tf.parse_number(' 47,742,304'), 47742304)
        self.assertEqual(tf.parse_number('1.166'), 1.166)
        self.assertEqual(tf.parse_number('77.4%'), 0.774)
        self.assertEqual(tf.parse_number('- 2,829'), -2829)
        self.assertEqual(tf.parse_number('-6.2%'), -0.062)
        self.assertEqual(tf.parse_number('$469.88'), 469.88)

    def test_refuses_what_is_not_a_number(self):
        for token in ('Year', 'To Ult', '12 - 24', '(8)', ''):
            self.assertIsNone(tf.parse_number(token), token)


class Exhibits(unittest.TestCase):
    def test_year_rows_read_each_origin_until_the_stop_line(self):
        lines = ['1998', '1.000', '1.002', '1999', '1.004', 'Total', '2000', '9']
        self.assertEqual(tf.year_rows(lines, 0, 'Total'), {'1998': [1.0, 1.002], '1999': [1.004]})
        with self.assertRaises(ValueError):
            tf.year_rows(lines, 0, 'Total', width=2)

    def test_labelled_rows_keep_rows_and_skip_column_notes(self):
        text = '\n'.join([
            '(11) Selected Projected Loss and LAE Ratio', '61.9%',
            '(16) Indicated Rate Change', '-6.2%',
            '(2) From Current Rate Level Exhibit - 2',
            '(3) From Premium Trend Exhibit - 3',
            'A - 7',
        ])
        rows = tf.labelled_rows(text)
        self.assertEqual(rows['11'], {'label': 'Selected Projected Loss and LAE Ratio', 'value': 0.619})
        self.assertEqual(rows['16']['value'], -0.062)
        self.assertNotIn('2', rows)
        self.assertEqual(tf.werner_page(tf.lines_of(text)), 'A-7')

    def test_friedland_sheet1_reads_triangle_factors_averages_and_selections(self):
        # A two-age miniature of Chapter 7, Exhibit I, Sheet 1's layout.
        text = '\n'.join([
            'Chapter 7 - Development Technique', 'PART 1 - Data Triangle', 'Year',
            *['12', '24', '36', '48', '60', '72', '84', '96', '108', '120'],
            '1998', ' 100', ' 150',
            '1999', ' 110',
            'PART 2 - Age-to-Age Factors', 'Year', 'To Ult',
            '1998', '1.500',
            '1999',
            'PART 3 - Average Age-to-Age Factors', 'Averages', 'To Ult',
            'Simple Average', '  Latest 5', *['1.500'] * 9,
            'PART 4 - Selected Age-to-Age Factors', 'To Ult',
            'Selected', *['1.000'] * 10,
            'CDF to Ultimate', *['1.000'] * 10,
            'Percent Reported', *['100.0%'] * 10,
            '106',
        ])
        sheet = tf.friedland_ch7_sheet1(text)
        self.assertEqual(sheet['triangle']['origins'], ['1998', '1999'])
        self.assertEqual(sheet['triangle']['values'][1][:2], [110, None])
        self.assertEqual(sheet['factors'], {'1998': [1.5]})
        self.assertEqual(sheet['averages']['simple_latest_5'][0], 1.5)
        self.assertEqual(sheet['percent_reported'][0], 1.0)
        self.assertEqual(sheet['printed_page'], 106)


if __name__ == '__main__':
    unittest.main()
