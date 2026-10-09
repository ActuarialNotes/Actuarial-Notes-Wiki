#!/bin/bash
# Installs what a VERIFY sweep needs in a Claude Code cloud session
# (docs/verification-plan.md, Wave 0): PyMuPDF to read a PDF, and Tesseract so
# a scanned exam booklet is OCR'd for free instead of read as page images.
# Remote sessions only — on a local machine this changes nothing.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

if ! python3 -c "import pymupdf" >/dev/null 2>&1; then
  python3 -m pip install --quiet pymupdf >/dev/null 2>&1 || echo "session-start: pip install pymupdf failed" >&2
fi

if ! command -v tesseract >/dev/null 2>&1; then
  if command -v apt-get >/dev/null 2>&1; then
    { apt-get install -y -q tesseract-ocr >/dev/null 2>&1 \
      || { apt-get update -q >/dev/null 2>&1 && apt-get install -y -q tesseract-ocr >/dev/null 2>&1; }; } \
      || echo "session-start: apt-get install tesseract-ocr failed; scanned pages will need page images" >&2
  fi
fi

# One source cache per session, outside the repo (scripts/verify_sources.py).
if [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  echo "export VERIFY_SOURCE_CACHE=\"\${TMPDIR:-/tmp}/verify-sources\"" >> "$CLAUDE_ENV_FILE"
fi
exit 0
