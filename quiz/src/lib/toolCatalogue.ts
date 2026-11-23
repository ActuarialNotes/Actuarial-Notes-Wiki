// The tools the Tools screen lists (`/tools`): every calculator. The published
// tables (area `data`) are on the Data Sources page, so they are counted and
// listed there, never here.

import { AREAS, TOOLS } from './tools'

export const CATALOGUE_AREAS = AREAS.filter(a => a.id !== 'data')

export const CATALOGUE_TOOLS = TOOLS.filter(t => t.area !== 'data')
