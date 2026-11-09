// Every unit test runs with OSFI's filings installed in the engine, as the app
// and the connector run it: a tool that reads them (Insurer Return) can then be
// held to the same registry rules as every other tool. The file is the one the
// app fetches (docs/osfi-tools-design.md). The connector's bundled engine is a
// module of its own, so it is given them too, as `api/_mcp/` does. Read from
// disk rather than imported, so the type checker never infers a 400 KB literal.
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { installFilings, type FilingsFile } from '../lib/tools'
// @ts-expect-error — the committed bundle is plain JS with no types.
import { installFilings as installInBundle } from '../../api/_tools/engine.js'

export const FILINGS_FILE = resolve(__dirname, '../lib/tools/data/filings/osfi-pc4-summary.json')
const filings = JSON.parse(readFileSync(FILINGS_FILE, 'utf8')) as FilingsFile

installFilings(filings)
installInBundle(filings)
