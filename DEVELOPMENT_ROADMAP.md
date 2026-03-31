# DEVELOPMENT_ROADMAP.md

## Empire of the Chosen

This roadmap turns the current prototype state into a practical development sequence. The priority is to keep the game playable while increasing clarity, balance, and strategic depth.

## Phase 1: Stabilize the MVP

Goal: make the current prototype reliable, readable, and internally consistent.

Steps:

1. Playtest the current loop from opening turn to full conquest multiple times.
2. Identify balance issues in combat, loyalty, directives, and regional output.
3. Tighten UI clarity for assignments, directives, and conquest flow.
4. Refine formulas in `app.js` so outcomes feel fair and visible.
5. Keep `README.md` and `PROJECT_PLAN.md` aligned with the actual game state.

Deliverable:

A stable MVP where players can understand why outcomes happen without guessing.

## Phase 2: Improve Strategic Readability

Goal: make the decision-making layer easier to read and more satisfying.

Steps:

1. Improve combat preview wording and surface the strongest modifiers first.
2. Show clearer reasons for loyalty increases and decreases after each turn.
3. Highlight friend and rival effects more strongly in the region detail panel.
4. Make region roles clearer at a glance through stronger summaries and tags.
5. Improve event log wording so battle and economy outcomes read clearly.
6. Refine the visual map so players can read borders, routes, and ownership faster.

Deliverable:

Players can evaluate province and character decisions quickly from the UI alone.

## Phase 3: Expand Content Depth

Goal: enrich the prototype without increasing system complexity too aggressively.

Steps:

1. Add more landmarks with distinct visible bonuses.
2. Expand passive and active abilities to give each character a clearer niche.
3. Add more event variants tied to directives, loyalty, and low-stability regions.
4. Improve province differentiation so neutral targets feel strategically distinct.
5. Tune the roster so no single character dominates every situation.
6. Add support for alternate map definitions with distinct layouts and province metadata.

Deliverable:

The same core loop feels more varied and replayable.

## Phase 4: Add Lightweight Persistence

Goal: improve usability while preserving the direct-open browser requirement.

Steps:

1. Save game state to `localStorage`.
2. Add load and reset controls.
3. Validate saved data to avoid broken sessions.
4. Document save behavior in `README.md`.

Deliverable:

The prototype survives refreshes and can be resumed easily.

## Phase 5: Extend the MVP Carefully

Goal: add depth only after the current loop is proven solid.

Steps:

1. Add neutral defenders with assigned officers if combat still feels too flat.
2. Add simple regional events tied to loyalty and stability thresholds.
3. Expand conquest options only if the current auto-resolve model remains readable.
4. Consider a lightweight enemy faction only after balance is stable.

Deliverable:

A stronger strategy prototype without undermining clarity or maintainability.

## Step-by-Step Development Plan

1. Review the formulas in `app.js` and note obvious balance problems.
2. Run repeated manual playthroughs and record which strategies dominate.
3. Adjust combat, output, and loyalty numbers using small, testable changes.
4. Improve combat preview text so the biggest contributors are easier to see.
5. Improve roster and region detail readability for loyalty and relationships.
6. Refine the SVG map presentation and make route, ownership, and target states easier to scan.
7. Extract any new map rules into data definitions instead of hardcoding them in render logic.
8. Expand event log feedback for turn resolution and battle outcomes.
9. Add a small set of new landmarks or abilities only after balance improves.
10. Update `PROJECT_PLAN.md` whenever a phase status changes.
11. Update `README.md` whenever controls, setup, or gameplay flow changes.
12. Commit each finished slice as a focused change.

## Map Development Track

1. Keep map geometry, routes, and region labels inside map-definition data.
2. Support alternate scenarios by swapping `activeMapId` and matching region data.
3. Add map-specific metadata only through structured definitions, not scattered conditionals.
4. Keep the visual map interactive, but do not let map rendering own game rules.
5. Document any new map schema in `README.md` and `PROJECT_PLAN.md`.

## Recommended Immediate Tasks

1. Balance combat and loyalty formulas.
2. Improve combat preview readability.
3. Improve map readability and province-state highlights.
4. Improve event log explanations.
5. Add a few more meaningful landmark effects.
6. Add `localStorage` save and reset support.
