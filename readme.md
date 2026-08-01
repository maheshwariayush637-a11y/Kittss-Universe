# Kitss Universe

A one-page, cinematic space journey built as a birthday gift: five planets, each holding a
personal message, a game, or jokes, connected by a hyperspace warp transition and a rocket
that flies you from one world to the next.

## Tech

Plain HTML, CSS, and vanilla JavaScript — no build step, no framework. All motion (starfield,
shooting stars, constellations, planet float/rotation, warp streaks, click bursts, the ending
"K" constellation) is done with `<canvas>` and CSS animations for performance on both desktop
and mobile.

Progress (which planets have been visited/unlocked and which Memory Orbs have been collected)
is stored in the browser via `localStorage`, since this is a single-visitor personal
experience with no accounts or server-side data.

## Structure

- `index.html` — page shell: boot screen, canvases, planet stage, rocket nav, ending scene.
- `assets/css/style.css` — all styling and CSS keyframe animations.
- `assets/js/main.js` — planet content/data, canvas animations, transitions, mini-games, and
  local persistence.
- `assets/audio/` — put the licensed background track here as `love-story-piano.mp3`
  (see the README.txt in that folder).

## Running locally

Any static file server works, e.g.:

```bash
npx serve .
```

or with the Netlify CLI:

```bash
netlify dev
```

Then open the printed local URL in a browser.
