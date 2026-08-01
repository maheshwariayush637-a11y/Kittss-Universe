# AGENTS.md

## Architecture

Static site, no build tooling. Three files carry the whole experience:

- `index.html` — DOM skeleton only: boot screen, persistent `<canvas>` layers
  (`#star-canvas` background, `#fx-canvas` for click bursts, `#warp-canvas` for the
  hyperspace transition, `#k-canvas` for the ending constellation), the `#stage`
  containing one `.planet-scene` per planet (built dynamically by JS), the rocket
  nav button, music toggle, memory-collection tray, and the ending scene.
- `assets/css/style.css` — all visuals and keyframe animations, organized by section
  (boot, canvases, music button, tray, planet scenes, text panel, unlock overlay,
  memory orb, rocket nav, warp label, ending scene, mini games, responsive).
- `assets/js/main.js` — single file, top to bottom:
  1. `PLANETS` data array — each planet's exact copy text, in `lines`. Do not edit
     this text; it was supplied verbatim by the site owner and must stay unchanged.
  2. `localStorage`-backed `state` (visited planets, collected memory orbs, current
     planet index).
  3. Boot sequence (fake connection percentage).
  4. Starfield/parallax/shooting-star/constellation canvas loop.
  5. Click-burst canvas loop.
  6. Scene builder + typewriter renderer (`typeLines`).
  7. Planet-specific extras: the Games planet (scramble + "Catch the Star" mini
     game) and the Jokes planet (prev/next joke browser).
  8. `showPlanet()` — handles first-visit "Planet Discovered" unlock animation vs.
     repeat visits (skips the scale-in/glow, orb just floats/rotates).
  9. `runWarp()` — the hyperspace transition (streak canvas), invoked by the rocket
     nav between `showPlanet()` calls.
  10. Ending scene — zooms out to a glowing "K" shaped point constellation.

## Conventions

- No frameworks, no npm dependencies for the front end — keep it dependency-free so
  it stays trivially fast on any device.
- All persistent state is client-side (`localStorage`) under key
  `kitss-universe-v1`. There is no backend and no Netlify Database/Blobs usage —
  this is intentional: single visitor, no accounts, nothing that needs
  server-side durability.
- Planet copy text in `PLANETS[*].lines` and `PLANETS[*].jokes` must not be
  reworded — only styling/background/animation around it may change.
- The background track is deliberately not committed (copyright); the audio
  element fails silently if `assets/audio/love-story-piano.mp3` is missing.

## Non-obvious decisions

- `showPlanet()` distinguishes first visit vs. repeat visit using
  `state.visited[planet.id]` so the scale-in/glow/"Planet Discovered" ring only
  plays once per planet, matching the "when opened for the first time" spec.
- The rocket click sequence is: scale the current planet's orb up hugely (CSS
  transition) → `runWarp()` streak animation → at ~55% of the warp, swap the
  active scene via `showPlanet()` (so the next planet's entrance overlaps the
  tail of the warp) → warp finishes and clears itself.
