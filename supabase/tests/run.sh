#!/usr/bin/env bash
# Run the SQL tests under supabase/tests against a throwaway local Postgres:
# a fresh cluster, the Supabase stub, the migrations a test needs, then the
# test file. Needs the PostgreSQL server binaries (initdb, pg_ctl) on the
# machine — `apt install postgresql` — and nothing else.
#
#   supabase/tests/run.sh                 # every test
#   supabase/tests/run.sh actuaria_crews  # one
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
BIN="$(ls -d /usr/lib/postgresql/*/bin 2>/dev/null | sort -V | tail -1)"
[ -x "$BIN/initdb" ] || { echo "PostgreSQL server binaries not found" >&2; exit 1; }

# The migrations each test loads, in order (the stub first).
declare -A NEEDS=(
  [actuaria_crews]="20260523_user_gems 20260523_user_cosmetics 20260523_user_subscriptions 20260706_user_streaks 20260710_leagues 20260929_actuaria 20260930_actuaria_crews 20261001_actuaria_pro"
)

TESTS=("$@")
[ ${#TESTS[@]} -eq 0 ] && TESTS=("${!NEEDS[@]}")

WORK="$(mktemp -d)"
chmod 777 "$WORK"
AS=()
[ "$(id -u)" = 0 ] && AS=(runuser -u postgres --)
PORT=55432
cleanup() { "${AS[@]}" "$BIN/pg_ctl" -D "$WORK/db" -m immediate stop >/dev/null 2>&1 || true; rm -rf "$WORK"; }
trap cleanup EXIT

"${AS[@]}" "$BIN/initdb" -D "$WORK/db" -U postgres -A trust >/dev/null
"${AS[@]}" "$BIN/pg_ctl" -D "$WORK/db" -o "-p $PORT -k $WORK -c listen_addresses=''" -l "$WORK/log" -w start >/dev/null

status=0
for t in "${TESTS[@]}"; do
  db="t_$t"
  psql=(env PGOPTIONS='-c client_min_messages=warning' psql -X -q -v ON_ERROR_STOP=1 -h "$WORK" -p "$PORT" -U postgres)
  "${psql[@]}" -d postgres -c "CREATE DATABASE $db" >/dev/null
  "${psql[@]}" -d "$db" -f "$HERE/stub_supabase.sql" >/dev/null
  for m in ${NEEDS[$t]}; do
    "${psql[@]}" -d "$db" -f "$ROOT/supabase/migrations/$m.sql" >/dev/null
  done
  if "${psql[@]}" -d "$db" -f "$HERE/$t.sql"; then
    echo "ok   $t"
  else
    echo "FAIL $t"
    status=1
  fi
done
exit $status
