#!/usr/bin/env python3
"""
tool_fixtures.py — published worked examples → Actuarial Tools fixtures, with no
model in the loop.

The R6 gate of `docs/actuarial-tools.md` (§9.1): a tool says what it was tested
against only once it reproduces a published worked example in CI. The numbers
in those examples are the publisher's, so they are *read* off the PDF here —
the same rule as the question pipeline (`docs/pdf-question-pipeline.md`):
nothing a PDF prints is ever retyped by a model.

Usage
-----
    python3 scripts/tool_fixtures.py --friedland 5_Friedland.pdf --werner 5_Werner_Modlin.pdf

writes `quiz/src/lib/tools/fixtures/friedland-2010.json` and
`basic-ratemaking-2016.json`. The PDFs are the CAS's free copies, linked from
their `Resources/Books` pages; each one's sha256 is checked against the one
this script was written for, since a different printing may move a page.

Each exhibit is recorded with the page it was read from (the PDF's page and the
page number the book prints), and every value as the book prints it: factors and
CDFs to three decimals, percentages as decimals of their printed precision,
amounts in the exhibit's units ($000). `quiz/src/lib/tools/fixtures.test.ts`
runs each tool on the exhibit's inputs and holds its output to the printed
values at that precision.

PyMuPDF is imported lazily, as in `pdf_extract.py`, so the module stays
importable (and its parsers testable) without it.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, 'quiz', 'src', 'lib', 'tools', 'fixtures')

FRIEDLAND = {
    'resource': 'Estimating Unpaid Claims Using Basic Techniques (Friedland - 2010)',
    'title': 'Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010)',
    'url': 'https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf',
    'sha256': '5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464',
}

WERNER = {
    'resource': 'Basic Ratemaking (Werner - 2016)',
    'title': 'Werner & Modlin, Basic Ratemaking (CAS, 5th ed., 2016)',
    'url': 'https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf',
    'sha256': '6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c',
}

YEAR = re.compile(r'^(19|20)\d\d$')
NUMBER = re.compile(r'^-?\s*[\d,]*\.?\d+%?$')


def parse_number(token: str) -> float | None:
    """'47,742,304' → 47742304; '1.166' → 1.166; '77.4%' → 0.774; '- 2,829' → -2829."""
    t = token.strip().lstrip('$').strip()
    if not NUMBER.match(t):
        return None
    pct = t.endswith('%')
    t = t.rstrip('%').replace(',', '').replace(' ', '')
    value = float(t)
    if pct:
        value = round(value / 100, 6)
    return int(value) if not pct and value.is_integer() and '.' not in t else value


def lines_of(text: str) -> list[str]:
    return [line.strip() for line in text.split('\n') if line.strip()]


def take_numbers(lines: list[str], start: int, count: int) -> tuple[list[float], int]:
    """The next `count` numbers from `start`, and the index after them."""
    out: list[float] = []
    i = start
    while len(out) < count:
        if i >= len(lines):
            raise ValueError(f'ran out of lines reading {count} numbers from line {start}')
        n = parse_number(lines[i])
        if n is None:
            raise ValueError(f'expected a number at line {i}, found {lines[i]!r}')
        out.append(n)
        i += 1
    return out, i


def year_rows(lines: list[str], start: int, stop: str, width: int | None = None) -> dict[str, list[float]]:
    """Rows led by a four-digit year, each followed by its numbers, until a line equal to `stop`."""
    rows: dict[str, list[float]] = {}
    current: str | None = None
    for line in lines[start:]:
        if line == stop:
            break
        if YEAR.match(line):
            current = line
            rows[current] = []
            continue
        n = parse_number(line)
        if current is not None and n is not None:
            rows[current].append(n)
    if width is not None:
        for year, values in rows.items():
            if len(values) != width:
                raise ValueError(f'row {year}: expected {width} values, read {len(values)}')
    return rows


def printed_page(lines: list[str]) -> int:
    """The page number the book prints: the exhibit's last line."""
    return int(lines[-1])


def friedland_ch7_sheet1(text: str) -> dict:
    """Chapter 7, Exhibit I, Sheet 1: the reported triangle, its factors, averages and selections."""
    lines = lines_of(text)
    p1 = lines.index('PART 1 - Data Triangle')
    year_at = lines.index('Year', p1)
    ages, after = take_numbers(lines, year_at + 1, 10)
    triangle = year_rows(lines, after, 'PART 2 - Age-to-Age Factors')

    p2 = lines.index('PART 2 - Age-to-Age Factors')
    factors = year_rows(lines, lines.index('To Ult', p2) + 1, 'PART 3 - Average Age-to-Age Factors')

    p3 = lines.index('PART 3 - Average Age-to-Age Factors')
    averages: dict[str, list[float]] = {}
    group = ''
    i = lines.index('To Ult', p3) + 1
    p4 = lines.index('PART 4 - Selected Age-to-Age Factors')
    while i < p4:
        line = lines[i]
        if line.startswith('Latest'):
            values, i = take_numbers(lines, i + 1, len(ages) - 1)
            n = re.match(r'Latest (\d+)', line)
            key = {'Simple Average': 'simple', 'Medial Average*': 'medial', 'Volume-weighted Average': 'volume', 'Geometric Average': 'geometric'}[group]
            averages[f'{key}_latest_{n.group(1)}'] = values
            continue
        group = line
        i += 1

    def row(label: str, count: int) -> list[float]:
        return take_numbers(lines, lines.index(label, p4) + 1, count)[0]

    return {
        'locator': 'Chapter 7, Exhibit I, Sheet 1',
        'printed_page': printed_page(lines),
        'units': '$000',
        'ages': ages,
        'triangle': {
            'origins': list(triangle),
            'ages': ages,
            'values': [vals + [None] * (len(ages) - len(vals)) for vals in triangle.values()],
        },
        'factors': {year: vals for year, vals in factors.items() if vals},
        'averages': averages,
        'selected': row('Selected', len(ages)),
        'cdf': row('CDF to Ultimate', len(ages)),
        'percent_reported': row('Percent Reported', len(ages)),
    }


def friedland_ch7_sheet3(text: str) -> dict:
    """Chapter 7, Exhibit I, Sheet 3: the development method's projections, reported and paid."""
    lines = lines_of(text)
    rows = year_rows(lines, lines.index('(8)') + 1, 'Total', width=7)
    keys = ['age', 'reported', 'paid', 'cdf_reported', 'cdf_paid', 'ultimate_reported', 'ultimate_paid']
    return {
        'locator': 'Chapter 7, Exhibit I, Sheet 3',
        'printed_page': printed_page(lines),
        'units': '$000',
        'rows': [{'origin': y, **dict(zip(keys, v))} for y, v in rows.items()],
    }


def friedland_ch8_sheet1(text: str) -> dict:
    """Chapter 8, Exhibit II, Sheet 1: expected claims from earned premium and the selected claim ratio."""
    lines = lines_of(text)
    rows = year_rows(lines, lines.index('(12)') + 1, 'Column and Line Notes:', width=11)
    keys = ['reported', 'paid', 'cdf_reported', 'cdf_paid', 'ultimate_reported', 'ultimate_paid',
            'initial_ultimate', 'premium', 'estimated_ratio', 'selected_ratio', 'expected']
    return {
        'locator': 'Chapter 8, Exhibit II, Sheet 1',
        'printed_page': printed_page(lines),
        'units': '$000',
        'rows': [{'origin': y, **dict(zip(keys, v))} for y, v in rows.items()],
    }


def friedland_ch9_sheet1(text: str) -> dict:
    """Chapter 9, Exhibit I, Sheet 1: the Bornhuetter-Ferguson projections, reported and paid."""
    lines = lines_of(text)
    rows = year_rows(lines, lines.index('(12)') + 1, 'Total', width=11)
    keys = ['expected', 'cdf_reported', 'cdf_paid', 'unreported', 'unpaid', 'ibnr_reported', 'ibnr_paid',
            'reported', 'paid', 'ultimate_reported', 'ultimate_paid']
    return {
        'locator': 'Chapter 9, Exhibit I, Sheet 1',
        'printed_page': printed_page(lines),
        'units': '$000',
        'rows': [{'origin': y, **dict(zip(keys, v))} for y, v in rows.items()],
    }


def friedland_ch10_sheet1(text: str) -> dict:
    """Chapter 10, Exhibit I, Sheet 1: the Cape Cod's used-up premium and its expected claim ratio."""
    lines = lines_of(text)
    rows = year_rows(lines, lines.index('(8)') + 1, 'Total', width=7)
    keys = ['premium', 'age', 'reported', 'cdf', 'percent_reported', 'used_up', 'claim_ratio']
    total, _ = take_numbers(lines, lines.index('Total') + 1, 4)
    return {
        'locator': 'Chapter 10, Exhibit I, Sheet 1',
        'printed_page': printed_page(lines),
        'units': '$000',
        'rows': [{'origin': y, **dict(zip(keys, v))} for y, v in rows.items()],
        'total': dict(zip(['premium', 'reported', 'used_up', 'claim_ratio'], total)),
    }


def friedland_ch10_sheet2(text: str) -> dict:
    """Chapter 10, Exhibit I, Sheet 2: the Cape Cod's expected claims, IBNR and ultimates from reported claims."""
    lines = lines_of(text)
    rows = year_rows(lines, lines.index('(9)') + 1, 'Total', width=8)
    keys = ['premium', 'claim_ratio', 'expected', 'cdf', 'unreported', 'ibnr', 'reported', 'ultimate']
    return {
        'locator': 'Chapter 10, Exhibit I, Sheet 2',
        'printed_page': printed_page(lines),
        'units': '$000',
        'rows': [{'origin': y, **dict(zip(keys, v))} for y, v in rows.items()],
    }


def scenario_blocks(lines: list[str], width: int, keys: list[str]) -> dict[str, list[dict]]:
    """An exhibit printing several scenarios one under another, each headed by its name and closed by its Total."""
    blocks: dict[str, list[dict]] = {}
    i = 0
    while True:
        try:
            first = lines.index('1999', i)
        except ValueError:
            break
        name = lines[first - 1]
        rows = year_rows(lines, first, 'Total', width=width)
        blocks[name] = [{'origin': y, **dict(zip(keys, v))} for y, v in rows.items()]
        i = lines.index('Total', first) + 1
    return blocks


def friedland_ch9_bf_scenarios(locator: str):
    """Chapter 9, Exhibit III: the B-F under the changing-conditions scenarios, reported and paid."""
    keys = ['age', 'expected', 'reported', 'paid', 'cdf_reported', 'cdf_paid', 'unreported', 'unpaid',
            'ultimate_reported', 'ultimate_paid', 'ibnr_reported', 'ibnr_paid', 'actual_ibnr', 'difference_reported', 'difference_paid']

    def parse(text: str) -> dict:
        lines = lines_of(text)
        return {'locator': locator, 'printed_page': printed_page(lines), 'units': '$000', 'scenarios': scenario_blocks(lines, len(keys), keys)}
    return parse


def friedland_ch9_benktander_scenarios(locator: str):
    """Chapter 9, Exhibit V: the Benktander (Gunnar Benktander) method under the same scenarios."""
    keys = ['age', 'bf_ultimate_reported', 'bf_ultimate_paid', 'reported', 'paid', 'cdf_reported', 'cdf_paid',
            'unreported', 'unpaid', 'ultimate_reported', 'ultimate_paid', 'ibnr_reported', 'ibnr_paid',
            'actual_ibnr', 'difference_reported', 'difference_paid']

    def parse(text: str) -> dict:
        lines = lines_of(text)
        return {'locator': locator, 'printed_page': printed_page(lines), 'units': '$000', 'scenarios': scenario_blocks(lines, len(keys), keys)}
    return parse


def text_table(lines: list[str], title: str) -> dict:
    """A table printed in Chapter 6's prose: its title, a header of ages, then a row per accident year."""
    start = next(i for i, line in enumerate(lines) if line.startswith(title))
    year_at = lines.index('Year', start)
    ages, i = take_numbers(lines, year_at + 1, 7)
    rows: dict[str, list[float]] = {}
    current = None
    while i < len(lines):
        line = lines[i]
        # A triangle's k-th origin has at most len(ages) − k values: a number past that is the page's, not the table's.
        full = current is not None and len(rows[current]) >= len(ages) - (len(rows) - 1)
        if YEAR.match(line):
            current = line
            rows[current] = []
        elif current is not None and parse_number(line) is not None and not full:
            rows[current].append(parse_number(line))
        else:
            break
        i += 1
    return {
        'title': title,
        'ages': ages,
        'origins': list(rows),
        'values': [vals + [None] * (len(ages) - len(vals)) for vals in rows.values()],
    }


def friedland_ch6(titles: list[str]):
    """Chapter 6's diagnostic triangles for XYZ Insurer, read from the prose pages they are printed in."""
    def parse(text: str) -> dict:
        lines = lines_of(text)
        return {
            'locator': 'Chapter 6, ' + ' and '.join(t.split(' – ')[0] for t in titles),
            'printed_page': printed_page(lines),
            'units': '$000 or counts',
            'tables': {t.split(' – ')[0].replace('Table ', 'table_'): text_table(lines, t) for t in titles},
        }
    return parse


def werner_page(lines: list[str]) -> str:
    """A chapter page prints its number under the running head; an appendix exhibit ends with its own ('A - 7')."""
    if lines[0].startswith('Chapter'):
        return lines[1]
    return lines[-1].replace(' ', '')


def labelled_rows(text: str) -> dict[str, dict]:
    """An exhibit's numbered rows — '(11) Selected Projected Loss and LAE Ratio' over '61.9%' — keyed by number.

    A numbered line not followed by a number is a column note, not a row, and is skipped.
    """
    lines = lines_of(text)
    rows: dict[str, dict] = {}
    for i, line in enumerate(lines[:-1]):
        m = re.match(r'^\((\d+)\)\s+(.+)$', line)
        if not m:
            continue
        value = parse_number(lines[i + 1])
        if value is not None and m.group(1) not in rows:
            rows[m.group(1)] = {'label': m.group(2).strip(), 'value': value}
    return rows


def werner_exhibit(locator: str):
    def parse(text: str) -> dict:
        lines = lines_of(text)
        return {'locator': locator, 'printed_page': werner_page(lines), 'rows': labelled_rows(text)}
    return parse


def werner_ch12_full_credibility(text: str) -> dict:
    """Chapter 12's classical example: p and k from the prose, the standard printed under its equation."""
    flat = ' '.join(lines_of(text))
    m = re.search(r'(\d+)% probability that the observed experience is within (\d+)% of its expected value', flat)
    z = re.search(r'the (\d+)th percentile is ([\d.]+) standard deviations', flat)
    n = re.search(r'expected number of claims needed for full credibility is:\s*([\d,]+)\.', flat)
    if not (m and z and n):
        raise ValueError('Chapter 12 full credibility example not found')
    return {
        'locator': 'Chapter 12, classical credibility: the full credibility standard',
        'printed_page': werner_page(lines_of(text)),
        'p': int(m.group(1)) / 100,
        'k': int(m.group(2)) / 100,
        'z': float(z.group(2)),
        'standard': parse_number(n.group(1)),
    }


def werner_ch12_partial_credibility(text: str) -> dict:
    """Chapter 12's square-root rule example: 100 observed claims against the 1,082 standard."""
    flat = ' '.join(lines_of(text))
    m = re.search(r'if the observed number of claims is (\d+), Z is calculated as:\s*([\d.]+)\.\s*([\d,]+)\s+(\d+)', flat)
    if not m:
        raise ValueError('Chapter 12 square-root rule example not found')
    return {
        'locator': 'Chapter 12, classical credibility: the square root rule',
        'printed_page': werner_page(lines_of(text)),
        'claims': int(m.group(1)),
        'standard': parse_number(m.group(3)),
        'z': float(m.group(2)),
    }


WERNER_EXHIBITS = {
    'ch12_full_standard': (230, werner_ch12_full_credibility),
    'ch12_square_root_rule': (231, werner_ch12_partial_credibility),
    'a7_lr_indication': (344, werner_exhibit('Appendix A, LR Indication')),
    'a8_credibility': (345, werner_exhibit('Appendix A, Credibility')),
    'b5_pp_indication': (363, werner_exhibit('Appendix B, PP Indication')),
    'c7_lr_indication': (380, werner_exhibit('Appendix C, LR Indication')),
}


# The exhibits, by the PDF page (1-indexed) each is read from, for the file whose
# sha256 is FRIEDLAND['sha256'].
FRIEDLAND_EXHIBITS = {
    'ch7_exhibit1_sheet1': (112, friedland_ch7_sheet1),
    'ch7_exhibit1_sheet3': (114, friedland_ch7_sheet3),
    'ch8_exhibit2_sheet1': (148, friedland_ch8_sheet1),
    'ch9_exhibit1_sheet1': (168, friedland_ch9_sheet1),
    'ch9_exhibit3_sheet1': (174, friedland_ch9_bf_scenarios('Chapter 9, Exhibit III, Sheet 1')),
    'ch9_exhibit3_sheet2': (175, friedland_ch9_bf_scenarios('Chapter 9, Exhibit III, Sheet 2')),
    'ch9_exhibit5_sheet1': (177, friedland_ch9_benktander_scenarios('Chapter 9, Exhibit V, Sheet 1')),
    'ch9_exhibit5_sheet2': (178, friedland_ch9_benktander_scenarios('Chapter 9, Exhibit V, Sheet 2')),
    'ch10_exhibit1_sheet1': (186, friedland_ch10_sheet1),
    'ch10_exhibit1_sheet2': (187, friedland_ch10_sheet2),
    'ch6_tables_2_3': (71, friedland_ch6(['Table 2 – Reported Claim Development Triangle', 'Table 3 – Paid Claim Development Triangle'])),
    'ch6_table_6': (74, friedland_ch6(['Table 6 – Ratio of Paid Claims-to-Reported Claims'])),
    'ch6_table_8': (75, friedland_ch6(['Table 8 – Reported Claim Count Development Triangle'])),
    'ch6_table_9': (76, friedland_ch6(['Table 9 – Closed Claim Count Development Triangle'])),
    'ch6_table_10': (78, friedland_ch6(['Table 10 – Ratio of Closed-to-Reported Claim Counts'])),
}


def extract(pdf_path: str, source: dict, exhibits_by_page: dict) -> dict:
    """Read each exhibit off its page of `pdf_path`, refusing a printing other than `source`'s."""
    with open(pdf_path, 'rb') as f:
        digest = hashlib.sha256(f.read()).hexdigest()
    if digest != source['sha256']:
        sys.exit(f'{pdf_path}: sha256 {digest} is not the printing this script reads ({source["sha256"]}).')
    import pymupdf  # lazily: only extraction needs it

    doc = pymupdf.open(pdf_path)
    exhibits = {}
    for key, (page, parse) in exhibits_by_page.items():
        exhibit = parse(doc[page - 1].get_text())
        exhibit['pdf_page'] = page
        exhibits[key] = exhibit
    return {
        'generated_by': 'scripts/tool_fixtures.py',
        'source': source,
        'exhibits': exhibits,
    }


def extract_friedland(pdf_path: str) -> dict:
    return extract(pdf_path, FRIEDLAND, FRIEDLAND_EXHIBITS)


def extract_werner(pdf_path: str) -> dict:
    return extract(pdf_path, WERNER, WERNER_EXHIBITS)


def write(name: str, data: dict) -> None:
    out = os.path.join(OUT_DIR, name)
    with open(out, 'w') as f:
        json.dump(data, f, indent=2)
        f.write('\n')
    print(f'Wrote {os.path.relpath(out, ROOT)}')


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.split('\n\n')[0])
    parser.add_argument('--friedland', help='the CAS copy of Friedland (2010), 5_Friedland.pdf')
    parser.add_argument('--werner', help='the CAS copy of Werner & Modlin (2016), 5_Werner_Modlin.pdf')
    args = parser.parse_args(argv)
    if not (args.friedland or args.werner):
        parser.error('give --friedland, --werner or both')
    os.makedirs(OUT_DIR, exist_ok=True)
    if args.friedland:
        write('friedland-2010.json', extract_friedland(args.friedland))
    if args.werner:
        write('basic-ratemaking-2016.json', extract_werner(args.werner))
    return 0


if __name__ == '__main__':
    sys.exit(main())
