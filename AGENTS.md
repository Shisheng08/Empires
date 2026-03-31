# AGENTS.md

## Project Scope

Empire of the Chosen is a direct-open browser prototype. Keep it runnable by opening `index.html` without a server, package manager, or build step.

## Tech Rules

- Use only HTML, CSS, and vanilla JavaScript.
- Keep the main prototype in `index.html`, `styles.css`, and `app.js`.
- Do not introduce frameworks, bundlers, or module loaders.
- Prefer plain data objects and small helper functions over abstract architecture.

## Gameplay Rules

- Characters are the center of the design. New features should stay character-driven.
- Keep formulas visible in the UI where possible.
- Favor simple, transparent mechanics over hidden complexity.
- Mild penalties are preferred over punishing failure states.

## Documentation Rules

- Update `README.md` when controls, setup, or scope change.
- Update `PROJECT_PLAN.md` when MVP status or delivery phases change.
- Add succinct comments in `app.js` around non-obvious game logic.

## Version Control

- Keep the repo clean and reviewable.
- Ignore machine-local clutter such as `.DS_Store`.
- Make commit messages describe the user-facing change, not just the file edits.
