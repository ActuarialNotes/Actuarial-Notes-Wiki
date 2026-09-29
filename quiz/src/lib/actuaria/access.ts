// **Who may enter Actuaria** — a signed-in account with an active Pro
// subscription (docs/actuaria-online.md, *Implementation notes*). Pure, like
// Cowork's `canEnterMode`: the route guard, the sidebar's PLAY row, the Study
// Guides hub card and the Store's Ships tab all read this one rule, so none of
// them decides it for itself. The database holds the social half to the same
// rule (`actuaria_is_pro`), since a cohort is shared state a client guard alone
// can't protect.
//
// `openToAll` is the preview build's override (`ACTUARIA_OPEN_TO_ALL`): the
// e2e suite plays the world signed out.

export interface ActuariaViewer {
  signedIn: boolean
  /** An active Pro subscription — `useSubscription().isPro`. */
  isPro: boolean
}

export function canEnterActuaria(viewer: ActuariaViewer, openToAll: boolean): boolean {
  return openToAll || (viewer.signedIn && viewer.isPro)
}

/** Where a viewer who can't enter goes instead: sign in first, else the Pro page. */
export function actuariaDestination(viewer: ActuariaViewer): string {
  return viewer.signedIn ? '/upgrade' : '/auth'
}
