# PROJECT_PLAN.md

## Empire of the Chosen

## Plan Review

The supplied project plan remains directionally strong and still fits the prototype well. The main long-running adjustment has been scope discipline: to keep the MVP clear in a direct-open browser prototype, the implementation uses one manual assault per turn, lightweight loyalty and relationship rules, visible landmark bonuses, and only lightweight browser persistence.

## Current MVP Status

- Completed: region selection, governor and assistant assignment, event log, and end turn flow
- Completed: three directives with visible effects
- Completed: derived gold, defense, and stability values with formula breakdowns
- Completed: adjacency-based attacks with combat preview and auto-resolve conquest
- Completed: passive and active abilities
- Completed: loyalty bands and lightweight friend/rival interactions
- Completed: visual campaign map with extensible map-definition data
- Completed: browser save/load through `localStorage`
- Completed: directive queueing so directive changes apply on the next turn instead of immediately
- Completed: victory by conquering all regions
- In progress: balancing numbers, event variety, and deeper feedback polish
- In progress: turning the map layer into a reusable scenario system rather than a single layout
- In progress: making neutral resistance feel more distinct without adding full AI

## MVP Scope

### Included

- 6 to 8 total regions
- 8 to 10 unique characters
- Wealth, fortress, and mystic province types
- Governor and assistant assignment
- Global directives: Conquest, Development, Stability
- Simple auto-resolve conquest combat
- Loyalty and lightweight relationships
- Passive and active abilities
- Event log
- Victory condition through full conquest

### Out of Scope

- Diplomacy
- Tactical battles
- Multiple deep AI factions
- Buildings or tech trees
- Betrayal and civil war
- Multiplayer
- Full campaign persistence beyond simple browser storage

## Current Phase Tracker

### Phase 1 - Foundation

- Status: Complete
- Notes: Shell UI, seeded data, selection, appointments, log, and turn control are in place.

### Phase 2 - Directives and Outputs

- Status: Complete
- Notes: Directive choice, output formulas, and province type effects are visible in the UI.

### Phase 3 - Conquest Loop

- Status: Complete
- Notes: Adjacent neutral attacks, combat preview, capture flow, and victory are implemented.

### Phase 4 - Character Depth

- Status: Complete for MVP
- Notes: Loyalty, friend/rival pairing, passive abilities, and manual active powers are present in lightweight form.

### Phase 5 - Strategic Depth

- Status: Partial
- Notes: Landmarks, the first visual map, save/load, and queued directives are implemented. Further map polish, alternate scenarios, neutral defender identity, balancing, and event variety remain open.

### Phase 6 - Refactor and Polish

- Status: In progress
- Notes: Documentation is now present, but future work should keep improving readability, formulas, and code organization.

## Immediate Next Improvements

- Add lightweight neutral defender identity or regional guard pressure
- Expand event outcomes tied to directives, low stability, and loyalty thresholds
- Improve loyalty explanations at the officer level, not only in aggregate logs
- Refine the visual map and formalize support for additional map definitions
- Continue balancing combat and loyalty numbers after more playtesting
