/**
 * Where an image the vault embeds is fetched from.
 *
 * Everything under the vault's `Media/` folder — book jackets, generated concept
 * figures, exam diagrams — is **served by the app itself**, at the same path
 * (`/Media/Attachments/…`): the build copies the folder into `dist/` and the dev
 * server serves it (`vaultMediaPlugin` in `vite.config.ts`). It used to be
 * hotlinked from raw.githubusercontent.com, which meant every cover on every
 * card hung on one third-party host staying willing to serve it — and when that
 * host stopped answering for the repo, every image in the app vanished at once.
 *
 * Pure, with no imports, so the vite config can read it too. A path outside
 * `Media/` has no copy in the build; the caller keeps its own fallback
 * (`undefined` here).
 */
export declare const VAULT_MEDIA_DIR = "Media";
/** The same-origin URL of a vault image, or `undefined` if the build doesn't carry it. */
export declare function vaultMediaUrl(path: string): string | undefined;
