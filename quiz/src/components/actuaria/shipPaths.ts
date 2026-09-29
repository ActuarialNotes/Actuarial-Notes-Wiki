// The ship's outline, shared by the Hangar's bay drawing (`ShipBay`) and the
// small glyph the Store, the Hangar's slot cards and the map's player card use
// (`ShipGlyph`), so the two are always the same ship.

/** The hull: an arrowhead with swept wings, in a 480 × 300 frame. */
export const HULL_PATH =
  'M240 28 C252 52 262 92 266 132 L338 176 L338 196 L262 188 L258 214 L222 214 L218 188 L142 196 L142 176 L214 132 C218 92 228 52 240 28 Z'

/** The panel lines, drawn in the paint's accent. */
export const PANEL_PATH = 'M240 60 L240 200 M214 132 L266 132 M170 183 L214 160 M310 183 L266 160'

/** The two engine trails, fading from the nozzles. */
export const TRAIL_PATHS = ['M222 214 L230 214 L234 292 L218 292 Z', 'M250 214 L258 214 L262 292 L246 292 Z'] as const
