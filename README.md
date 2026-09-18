# violence may happen to a friend...

A small bilingual PWA exploring how violence may appear in a friend's everyday life. Greek is the default; English is available throughout. The initial technical core uses native browser modules with no runtime dependencies or build step.

## Run

Requires Node 22 or newer.

```sh
node server.mjs
node --test
```

Open http://localhost:4173. Serve the static assets over HTTPS for production PWA installation; localhost supports development. No package installation is needed.

## Included

- Seven original prototype scenarios adapted from the supplied brief, with three tap-revealed moments and a reflection each.
- Greek and English text, including form labels and status messages; changing language preserves the story position and account draft.
- Responsive layouts, semantic headings, keyboard-operable controls, focus management, visible focus rings, reduced-motion support and an explicit animation pause control.
- Silent, slowly animated CSS landscape on the opening and closing screens only.
- Install manifest, 192/512 PNG icons, and a service worker caching only the static shell and educational content.
- Temporary in-memory account entry, optional incident date, approximate place and relationship context, and explicit JSON download.
- Versioned report structure preserving the written narrative, source scenario when relevant, and an explicitly unverified device timestamp.

## Data boundaries

There is no reporting service yet. No account is submitted, stored in browser storage, geocoded, classified or sent to police. No analytics or third-party assets are loaded. Drafts survive internal screen and language changes but are cleared on page exit/reload. Downloads remain on the device. Exit opens Google and does not erase browser history, installed app records, caches or downloaded files. Device/browser/OS retention is outside the app's control. Installation and offline caches make the app's presence visible on the device.

`sharing.submitted` and `sharing.geographicAggregationConsent` are false. The timestamp is the export time reported by the device, not a verified incident time. Reports are user-authored statements, not authenticated evidence. The arrow-of-time mechanism is deliberately unimplemented.

## Structure

- `stories.js`: editable bilingual story content.
- `app.js`: rendering, screen state, language and report interactions.
- `core.js`: pure story progression and report construction.
- `sw.js`: scoped shell cache and offline navigation fallback. Bump cache version with asset changes; updates activate after old clients close to avoid discarding drafts.
- `server.mjs`: development-only static server with allowlisted assets and security headers.
- `core.test.js`: content completeness, story bounds, report preservation/validation and PWA asset tests.

The original brief's seven topics are intimidation, physical aggression, economic control, unwanted contact after separation, humiliation/context, threats outside domestic relationships, and helping safely. Content is an illustrative adaptation pending specialist editorial review; it does not classify legal offences. No emergency directory is included in this first technical iteration.

## Next layers

Build a reporting backend only after defining consent, retention, deletion, access control and the user's chosen sharing flow. Keep original accounts separate from derived classifications and aggregates. Geographic reporting needs coarse-location aggregation and reidentification safeguards before public maps. Human relationships should remain self-described rather than inferred. Evidence integrity, trusted time and police handoff are separate future work.

Before a public service launch: specialist content review, assistive-technology testing, device install testing, localized support routes, backend security design and an accessible report review/export format beyond JSON.

PWA implementation reference: [MDN installation guide](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable).
