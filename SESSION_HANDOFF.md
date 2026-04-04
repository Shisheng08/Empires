# SESSION_HANDOFF.md

## Empire of the Chosen

This document is a pause-and-resume snapshot for the current prototype state.

## Project State

- Status: playable prototype with core conquest loop implemented
- Tech: plain HTML, CSS, and vanilla JavaScript
- Run mode: open `index.html` directly in a browser
- Automated tests: `node --test tests/app.test.js`
- Current test count: 16 passing tests
- Latest gameplay rule change: directives are now queued for the next turn instead of applying immediately

## What Is Implemented

- 7 regions with wealth, fortress, and mystic province types
- 9 named characters with stats, loyalty, traits, relationships, and abilities
- Governor and assistant assignment for player-owned regions
- Derived gold, defense, and stability formulas with visible breakdowns
- Data-driven SVG campaign map
- Adjacency-based conquest with combat preview and auto-resolve
- One assault per turn
- Loyalty changes, friend/rival effects, passive abilities, and active abilities
- Officer panel split between deployed officers and full roster
- Roster filters for unassigned, low-loyalty, and ready-active officers
- Turn alert strip for blocked provinces, low loyalty, unstable courts, and ready powers
- Browser save/load through `localStorage`
- Victory condition for full conquest

## Important Current Rules

### Directives

- `directiveId` is the directive currently in effect this turn
- `plannedDirectiveId` is the directive queued for next turn
- Selecting a directive during the turn only changes `plannedDirectiveId`
- Directive bonuses apply only after `End Turn`
- The top bar shows both the active directive and the queued directive

### Combat

- Early conquest has been tightened so opening attacks are no longer all favorable
- Fortress regions are intended to be risky early targets
- Mystic regions are intended to be narrow or situational openings
- Wealth regions are still the easiest first expansion targets
- Region selection auto-picks the strongest adjacent target by preview margin

### Persistence

- Saves use browser `localStorage`
- Save key: `empire-of-the-chosen-save`
- Save format is versioned
- Older saves without `plannedDirectiveId` still load by treating the old directive as both current and next

## Current Gameplay Feel

Opening-turn examples from the current balance:

- `Obsidian Crown -> Thornwatch`: unfavorable
- `Obsidian Crown -> Veilmere`: narrow edge
- `Silvermere -> Veilmere`: narrow edge
- `Silvermere -> Ashen Plains`: favored

This is intentional. The prototype now asks the player to think about officer placement, active abilities, and queued directives instead of swapping to `Conquest` for a same-turn burst.

## Main Files

- `index.html`: layout shell and UI containers
- `styles.css`: all styling, layout, and responsive behavior
- `app.js`: seed data, rules, rendering, interaction handlers, save/load, and exports for tests
- `tests/app.test.js`: Node test suite for rules and rendering helpers
- `PROJECT_PLAN.md`: project scope and current phase status
- `DEVELOPMENT_ROADMAP.md`: practical phased roadmap

## Resume Priorities

These are the best next steps when work resumes:

1. Add stronger neutral pressure without introducing full AI.
2. Add simple neutral defender traits or regional guard bonuses.
3. Expand event variety tied to low stability, loyalty, and directives.
4. Improve loyalty feedback so the player sees why individual officers changed.
5. Keep widening test coverage as rules become more stateful.

## Recommended Next Implementation Slice

Add lightweight neutral defender identity.

Suggested shape:

- give some neutral regions a defender profile or regional guard modifier
- surface that modifier in conquest preview
- keep it data-driven through region or scenario definitions
- avoid introducing full neutral turn logic yet

## Resume Checklist

1. Run `node --test tests/app.test.js`
2. Open `index.html` in a browser and play one or two early turns
3. Confirm directive queueing still feels correct in the UI
4. Review `PROJECT_PLAN.md` and `DEVELOPMENT_ROADMAP.md`
5. Continue with the next slice as a focused commit
