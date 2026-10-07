"""Simulated learner: an LLM student that studies the vault the way a candidate
would, so we can see where the study guides and questions fail learners.

Module boundaries (docs/simulated-learner.md):

  vault_parse      reads question files *whole*, solutions included. Trusted code only.
  content_loader   the only thing the learner's context is built from: pages and
                   question stems/options, constructed from an allowlist.
  grader           holds the answer key; returns what a real student would get.
  learner          persona, action protocol, notes. Never imports the two above.
  guard            every byte sent to the learner model passes through it.
  session          the orchestrator that wires them together.
"""

import os
import sys

PACKAGE_DIR = os.path.dirname(os.path.abspath(__file__))
SIM_DIR = os.path.dirname(PACKAGE_DIR)
REPO_ROOT = os.path.dirname(SIM_DIR)

_scripts = os.path.join(REPO_ROOT, "scripts")
if _scripts not in sys.path:
    sys.path.insert(0, _scripts)
