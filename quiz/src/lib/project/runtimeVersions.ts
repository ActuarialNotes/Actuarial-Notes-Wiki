/**
 * The pinned runtime versions the PCPA workspace loads from their CDNs. One
 * place, because the Python worker and the page both name them — and a version
 * bump should be one reviewed line, since a new Pyodide can change what
 * `import pandas` means.
 */

/** Pyodide 0.29: Python 3.13, pandas 2.3, statsmodels 0.14, scikit-learn 1.7. */
export const PYODIDE_VERSION = '0.29.5'

/** webR 0.6: R 4.5 with the base and recommended packages. */
export const WEBR_VERSION = '0.6.0'
