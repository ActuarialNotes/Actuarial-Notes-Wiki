/**
 * The **facets** a Cowork deliverable is described by.
 *
 * A deliverable is not usefully named by its file type. What an actuary needs
 * to know before reading one is: whose book of business it is about (practice
 * area), which job it does (function), who it is being written *for*
 * (audience), what made it necessary (driver), and whether it looks backwards
 * or forwards (time orientation). Those five are the facets, and they are the
 * axes the deliverable browser filters on.
 *
 * Each facet is a closed list authored here as data, with a label and the one
 * line that says what it means. Keeping them as data rather than as unions
 * scattered through components means a new value is one entry, and the pills,
 * the filter bar and the wizard all pick it up at once. The *types* are still
 * unions, so a typo in a step's answer is a build error rather than a facet
 * that silently matches nothing.
 */

export type PracticeArea = 'life' | 'pc' | 'pensions' | 'erm'
export type ActuarialFunction =
  | 'pricing'
  | 'underwriting'
  | 'reserving'
  | 'capital'
  | 'financial-reporting'
  | 'advisory'
export type Audience = 'regulator' | 'management' | 'shareholders' | 'policyholders' | 'auditor'
export type Driver = 'regulation' | 'external-environment'
export type TimeOrientation = 'retrospective' | 'prospective'

/** The five facet axes, by the key they are stored under on a deliverable. */
export type FacetKey = 'practiceArea' | 'function' | 'audience' | 'driver' | 'timeOrientation'

export interface FacetValue<T extends string> {
  id: T
  label: string
  /** One line: what this value means, shown under it in the wizard. */
  description: string
}

export interface FacetAxis<T extends string> {
  key: FacetKey
  label: string
  /** The question this axis answers about a deliverable. */
  question: string
  values: FacetValue<T>[]
}

export const PRACTICE_AREAS: FacetAxis<PracticeArea> = {
  key: 'practiceArea',
  label: 'Practice area',
  question: 'Whose business is this about?',
  values: [
    { id: 'life', label: 'Life', description: 'Individual and group life, annuities, segregated funds' },
    { id: 'pc', label: 'P&C', description: 'Property and casualty — auto, property, liability, specialty' },
    { id: 'pensions', label: 'Pensions', description: 'Registered pension plans and other post-employment benefits' },
    { id: 'erm', label: 'ERM', description: 'Enterprise risk across the whole balance sheet' },
  ],
}

export const FUNCTIONS: FacetAxis<ActuarialFunction> = {
  key: 'function',
  label: 'Function',
  question: 'Which job does this deliverable do?',
  values: [
    { id: 'pricing', label: 'Pricing', description: 'Setting rates, rating variables and relativities' },
    { id: 'underwriting', label: 'Underwriting', description: 'Risk selection, eligibility and portfolio mix' },
    { id: 'reserving', label: 'Reserving', description: 'Estimating unpaid claims and the liabilities they sit in' },
    { id: 'capital', label: 'Capital management', description: 'Solvency, capital adequacy and capital allocation' },
    { id: 'financial-reporting', label: 'Financial reporting', description: 'Valuation and disclosure under the reporting basis' },
    { id: 'advisory', label: 'Advisory', description: 'Opinion and recommendation for a decision being taken' },
  ],
}

export const AUDIENCES: FacetAxis<Audience> = {
  key: 'audience',
  label: 'Audience',
  question: 'Who reads it?',
  values: [
    { id: 'regulator', label: 'Regulator', description: 'A supervisor with a filing or approval decision to make' },
    { id: 'management', label: 'Management', description: 'Internal decision-makers who will act on it' },
    { id: 'shareholders', label: 'Shareholders', description: 'Owners and the analysts who read on their behalf' },
    { id: 'policyholders', label: 'Policyholders', description: 'The insured, or the members of a plan' },
    { id: 'auditor', label: 'Auditor', description: 'An external reviewer testing the work and its support' },
  ],
}

export const DRIVERS: FacetAxis<Driver> = {
  key: 'driver',
  label: 'Driver',
  question: 'What made it necessary?',
  values: [
    { id: 'regulation', label: 'Regulation', description: 'A rule, standard or filing requirement asks for it' },
    { id: 'external-environment', label: 'External environment', description: 'Inflation, weather, litigation, the market or the economy' },
  ],
}

export const TIME_ORIENTATIONS: FacetAxis<TimeOrientation> = {
  key: 'timeOrientation',
  label: 'Time orientation',
  question: 'Which way does it look?',
  values: [
    { id: 'retrospective', label: 'Retrospective', description: 'What happened — experience already earned or incurred' },
    { id: 'prospective', label: 'Prospective', description: 'What is expected — a period not yet written or paid' },
  ],
}

/** Every axis, in the order a deliverable's pill row reads. */
export const FACET_AXES = [
  PRACTICE_AREAS,
  FUNCTIONS,
  AUDIENCES,
  DRIVERS,
  TIME_ORIENTATIONS,
] as const

/**
 * The facet values a deliverable carries. Every axis is optional: a deliverable
 * being scoped has answered some questions and not others, and an unanswered
 * axis must read as *unanswered* rather than as a default that was never
 * chosen.
 */
export interface DeliverableFacets {
  practiceArea?: PracticeArea
  function?: ActuarialFunction
  audience?: Audience
  driver?: Driver
  timeOrientation?: TimeOrientation
}

/** The human label for one facet value, or the raw id if it isn't a known one. */
export function facetLabel(key: FacetKey, id: string): string {
  const axis = FACET_AXES.find(a => a.key === key)
  const value = axis?.values.find(v => v.id === id)
  return value?.label ?? id
}

/**
 * A deliverable's facets as an ordered list of `{ axis, label }`, skipping the
 * axes it hasn't answered. This is what the pill row renders, and what keeps
 * the row in facet order rather than in whatever order the wizard happened to
 * ask its questions.
 */
export function facetPills(facets: DeliverableFacets): Array<{ key: FacetKey; axis: string; label: string }> {
  const pills: Array<{ key: FacetKey; axis: string; label: string }> = []
  for (const axis of FACET_AXES) {
    const id = facets[axis.key]
    if (!id) continue
    pills.push({ key: axis.key, axis: axis.label, label: facetLabel(axis.key, id) })
  }
  return pills
}

/** How many of the five axes a deliverable has pinned down. */
export function facetCount(facets: DeliverableFacets): number {
  return FACET_AXES.reduce((n, axis) => (facets[axis.key] ? n + 1 : n), 0)
}
