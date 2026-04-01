# Empire of the Chosen

Browser-based fantasy strategy prototype built with plain HTML, CSS, and vanilla JavaScript.

## Run

Open `index.html` directly in any modern browser.

No package install, build step, or local server is required.

## Automated Tests

Run the game-rule tests with:

`node --test tests/app.test.js`

## Controls

- Click a region in the left panel to inspect it.
- Click a province on the visual map or in the left panel to inspect it.
- Use the top bar to switch the global directive each turn.
- In owned regions, assign a governor and optional assistant from the center panel.
- Use the right-side officer panel tabs to switch between the selected province court and the full imperial roster.
- In the `All Officers` tab, use the filter chips to surface unassigned, low-loyalty, or ready-active officers.
- Activate available active abilities from the selected region before combat.
- Watch the turn alert strip for blocked provinces, unstable courts, loyalty trouble, and ready powers.
- Use `Save Campaign` and `Load Save` in the turn panel to persist progress in browser `localStorage`.
- Pick an adjacent neutral region in the conquest section and launch one assault per turn.
- Click `End Turn` to collect gold, resolve loyalty changes, and refresh your conquest action.

## Implemented MVP Systems

- 7 regions with wealth, fortress, and mystic types
- 9 named characters with stats, loyalty, traits, and relationships
- Governor and assistant assignments
- Browser save/load using `localStorage`
- Visible regional output formulas for gold, defense, and stability
- Data-driven SVG campaign map for quick province overview
- Three directives: Conquest, Development, Stability
- Adjacency-based conquest with combat preview and auto-resolve
- Passive and active abilities
- Loyalty bands and lightweight friend/rival effects
- Roster tabs plus officer filters for faster court management
- Event log and victory condition

## File Layout

- `index.html`: static layout shell
- `styles.css`: dark fantasy UI styling and responsive layout
- `app.js`: game state, formulas, rendering, interactions, combat, and turn resolution
- `app.js` also contains the data-driven `MAP_DEFINITIONS` object for future maps
- `PROJECT_PLAN.md`: reviewed plan and phase tracker
- `DEVELOPMENT_ROADMAP.md`: phased roadmap and step-by-step development sequence
- `AGENTS.md`: repository-specific working rules

## Git

This project is already initialized as its own git repository.

Typical workflow:

1. `git status`
2. `git add .`
3. `git commit -m "Describe the change"`
