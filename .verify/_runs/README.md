# Run summaries

One file per validation sweep, named for its run id
(`2026-08-19T14-02Z-a3f9.md`), written by:

```bash
python3 scripts/verify_record.py run --run-id "$RUN_ID" --summary <file>
```

Each holds: files touched, findings by severity, sources consulted, auto-fixes
applied, files left `in_review` and why, and roughly what the run cost. They are
the batch-level companion to the per-file logs one directory up, and they are the
body of the PR the sweep opens.
