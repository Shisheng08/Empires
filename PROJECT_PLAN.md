# PROJECT_PLAN.md

## Empire of the Chosen

## Plan Review

The supplied project plan is directionally strong and fits the prototype well. The main adjustment is scope discipline: to keep the MVP clear in a direct-open browser prototype, the current implementation uses one manual assault per turn, lightweight loyalty and relationship rules, visible landmark bonuses, and no persistence beyond the active browser session.

## Current MVP Status

- Completed: region selection, governor and assistant assignment, event log, and end turn flow
- Completed: three directives with visible effects
- Completed: derived gold, defense, and stability values with formula breakdowns
- Completed: adjacency-based attacks with combat preview and auto-resolve conquest
- Completed: passive and active abilities
- Completed: loyalty bands and lightweight friend/rival interactions
- Completed: visual campaign map with extensible map-definition data
- Completed: victory by conquering all regions
- In progress: balancing numbers, event variety, and deeper feedback polish
- In progress: turning the map layer into a reusable scenario system rather than a single layout

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
- Full save/load systems

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
- Notes: Landmarks and the first visual map are implemented. Further map polish, alternate scenarios, balancing, and event variety remain open.

### Phase 6 - Refactor and Polish

- Status: In progress
- Notes: Documentation is now present, but future work should keep improving readability, formulas, and code organization.

## Immediate Next Improvements

- Balance combat and loyalty numbers after real playtesting
- Refine the visual map and formalize support for additional map definitions
- Add richer event outcomes tied to directives and low stability
- Surface more combat details for neutral defenses if neutral governors are added later
- Consider trivial browser persistence only after the core loop feels stable
