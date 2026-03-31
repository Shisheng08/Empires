const DIRECTIVES = {
  conquest: {
    id: "conquest",
    name: "Conquest",
    summary: "Push the front. Assaults gain +4 attack, but every owned region suffers -1 stability this turn.",
    attackBonus: 4,
    goldBonus: 0,
    stabilityBonus: -1
  },
  development: {
    id: "development",
    name: "Development",
    summary: "Favor caravans, tax ledgers, and civic order. Owned regions gain +2 gold this turn.",
    attackBonus: 0,
    goldBonus: 2,
    stabilityBonus: 0
  },
  stability: {
    id: "stability",
    name: "Stability",
    summary: "Strengthen legitimacy and recovery. Owned regions gain +2 stability and assigned officers recover extra loyalty.",
    attackBonus: 0,
    goldBonus: 0,
    stabilityBonus: 2
  }
};

const LANDMARKS = {
  "sky-citadel": {
    name: "Sky Citadel",
    summary: "Signal towers and elevated keeps harden the walls.",
    goldBonus: 0,
    defenseBonus: 2,
    stabilityBonus: 0,
    attackBonus: 1,
    loyaltyRecovery: 0
  },
  "silver-port": {
    name: "Silver Port",
    summary: "Harbor tariffs and merchant houses enrich the court.",
    goldBonus: 2,
    defenseBonus: 0,
    stabilityBonus: 0,
    attackBonus: 0,
    loyaltyRecovery: 0
  },
  moonwell: {
    name: "Moonwell",
    summary: "Sacred waters steady omens, courts, and loyalties.",
    goldBonus: 0,
    defenseBonus: 0,
    stabilityBonus: 2,
    attackBonus: 0,
    loyaltyRecovery: 1
  },
  "ancient-forge": {
    name: "Ancient Forge",
    summary: "Old war furnaces temper discipline and sharpen campaigns.",
    goldBonus: 0,
    defenseBonus: 1,
    stabilityBonus: 0,
    attackBonus: 2,
    loyaltyRecovery: 0
  }
};

// Map layouts are data-driven so future scenarios can swap in a new region geometry set.
const MAP_DEFINITIONS = {
  "ashen-realm": {
    id: "ashen-realm",
    name: "Ashen Realm",
    description: "A parchment campaign map of the central marches, trade routes, and shrine-lands.",
    viewBox: "0 0 1000 560",
    backdropPaths: [
      "M72 103 C143 41 280 29 404 61 C538 23 705 34 832 97 C903 134 941 212 929 302 C948 391 901 489 809 516 C690 554 514 541 386 511 C256 531 142 495 88 421 C45 365 38 263 72 103 Z",
      "M239 148 C304 121 374 112 441 125 C399 163 382 214 396 266 C334 291 279 290 228 256 C208 220 213 179 239 148 Z",
      "M617 141 C682 117 752 123 804 155 C834 196 826 246 791 281 C726 300 666 293 613 268 C589 224 590 179 617 141 Z"
    ],
    routePairs: [
      ["obsidian-crown", "silvermere"],
      ["obsidian-crown", "thornwatch"],
      ["obsidian-crown", "veilmere"],
      ["silvermere", "veilmere"],
      ["silvermere", "ashen-plains"],
      ["thornwatch", "veilmere"],
      ["thornwatch", "starfall-bastion"],
      ["veilmere", "ashen-plains"],
      ["veilmere", "moonfall-sanctum"],
      ["ashen-plains", "moonfall-sanctum"],
      ["starfall-bastion", "moonfall-sanctum"]
    ],
    regions: [
      {
        id: "obsidian-crown",
        path: "M160 92 L290 88 L352 152 L331 232 L244 258 L154 236 L114 173 Z",
        labelX: 236,
        labelY: 172,
        terrain: "fortress"
      },
      {
        id: "silvermere",
        path: "M138 287 L258 268 L335 303 L324 399 L249 458 L131 431 L101 360 Z",
        labelX: 222,
        labelY: 357,
        terrain: "wealth"
      },
      {
        id: "thornwatch",
        path: "M362 103 L489 87 L541 148 L516 243 L434 284 L347 240 L331 160 Z",
        labelX: 434,
        labelY: 173,
        terrain: "fortress"
      },
      {
        id: "veilmere",
        path: "M340 276 L446 259 L536 298 L534 378 L448 432 L331 404 L298 333 Z",
        labelX: 420,
        labelY: 338,
        terrain: "mystic"
      },
      {
        id: "ashen-plains",
        path: "M309 422 L437 447 L522 441 L596 492 L474 530 L337 518 L261 468 Z",
        labelX: 426,
        labelY: 487,
        terrain: "wealth"
      },
      {
        id: "starfall-bastion",
        path: "M571 127 L704 110 L818 144 L803 236 L717 288 L590 257 L539 194 Z",
        labelX: 679,
        labelY: 191,
        terrain: "fortress"
      },
      {
        id: "moonfall-sanctum",
        path: "M556 305 L678 293 L795 329 L817 424 L709 484 L586 463 L528 392 Z",
        labelX: 675,
        labelY: 384,
        terrain: "mystic"
      }
    ]
  }
};

const MAP_LEGEND_SECTIONS = [
  {
    title: "Ownership",
    rows: [
      { className: "player", label: "Player-held" },
      { className: "neutral", label: "Neutral" }
    ]
  },
  {
    title: "Region Type",
    rows: [
      { className: "wealth", label: "Wealth" },
      { className: "fortress", label: "Fortress" },
      { className: "mystic", label: "Mystic" }
    ]
  },
  {
    title: "Highlights",
    rows: [
      { className: "selected", label: "Selected province" },
      { className: "target", label: "Valid assault target" }
    ]
  }
];

const INITIAL_REGIONS = [
  {
    id: "obsidian-crown",
    name: "Obsidian Crown",
    type: "fortress",
    owner: "player",
    governorId: "kael-thorn",
    assistantId: "ysra-moonveil",
    baseGold: 6,
    baseDefense: 14,
    baseStability: 8,
    neighbors: ["silvermere", "thornwatch", "veilmere"],
    landmark: "sky-citadel"
  },
  {
    id: "silvermere",
    name: "Silvermere",
    type: "wealth",
    owner: "player",
    governorId: "seraphine-vale",
    assistantId: "tiber-halcyon",
    baseGold: 11,
    baseDefense: 6,
    baseStability: 9,
    neighbors: ["obsidian-crown", "veilmere", "ashen-plains"],
    landmark: "silver-port"
  },
  {
    id: "thornwatch",
    name: "Thornwatch",
    type: "fortress",
    owner: "neutral",
    governorId: null,
    assistantId: null,
    baseGold: 5,
    baseDefense: 12,
    baseStability: 7,
    neighbors: ["obsidian-crown", "veilmere", "starfall-bastion"],
    landmark: "ancient-forge"
  },
  {
    id: "veilmere",
    name: "Veilmere",
    type: "mystic",
    owner: "neutral",
    governorId: null,
    assistantId: null,
    baseGold: 7,
    baseDefense: 7,
    baseStability: 10,
    neighbors: ["obsidian-crown", "silvermere", "thornwatch", "ashen-plains", "moonfall-sanctum"],
    landmark: "moonwell"
  },
  {
    id: "ashen-plains",
    name: "Ashen Plains",
    type: "wealth",
    owner: "neutral",
    governorId: null,
    assistantId: null,
    baseGold: 12,
    baseDefense: 5,
    baseStability: 6,
    neighbors: ["silvermere", "veilmere", "moonfall-sanctum"],
    landmark: null
  },
  {
    id: "starfall-bastion",
    name: "Starfall Bastion",
    type: "fortress",
    owner: "neutral",
    governorId: null,
    assistantId: null,
    baseGold: 4,
    baseDefense: 15,
    baseStability: 8,
    neighbors: ["thornwatch", "moonfall-sanctum"],
    landmark: "sky-citadel"
  },
  {
    id: "moonfall-sanctum",
    name: "Moonfall Sanctum",
    type: "mystic",
    owner: "neutral",
    governorId: null,
    assistantId: null,
    baseGold: 6,
    baseDefense: 8,
    baseStability: 11,
    neighbors: ["veilmere", "ashen-plains", "starfall-bastion"],
    landmark: "moonwell"
  }
];

const INITIAL_CHARACTERS = [
  {
    id: "seraphine-vale",
    name: "Lady Seraphine Vale",
    portrait: "SV",
    might: 4,
    intellect: 7,
    charisma: 9,
    will: 8,
    loyalty: 78,
    trait: "Silver-Tongued Regent",
    abilityName: "Golden Tithes",
    abilityType: "passive",
    abilityText: "While assigned to a wealth province, gain +3 gold.",
    friends: ["lysandra-crow", "tiber-halcyon"],
    rivals: ["merek-ashfall"]
  },
  {
    id: "dorian-blacktide",
    name: "Marshal Dorian Blacktide",
    portrait: "DB",
    might: 9,
    intellect: 5,
    charisma: 4,
    will: 8,
    loyalty: 71,
    trait: "Siege-Born Commander",
    abilityName: "March of Iron",
    abilityType: "active",
    abilityText: "Once per turn, the assigned province gains +4 attack for its next assault.",
    friends: ["kael-thorn"],
    rivals: ["lysandra-crow"]
  },
  {
    id: "elowen-pyre",
    name: "High Seer Elowen Pyre",
    portrait: "EP",
    might: 3,
    intellect: 9,
    charisma: 6,
    will: 9,
    loyalty: 66,
    trait: "Starfire Oracle",
    abilityName: "Astral Census",
    abilityType: "passive",
    abilityText: "While assigned to a mystic province, gain +1 gold and +2 stability.",
    friends: ["ysra-moonveil"],
    rivals: ["brannoc-voss"]
  },
  {
    id: "kael-thorn",
    name: "Warden Kael Thorn",
    portrait: "KT",
    might: 8,
    intellect: 6,
    charisma: 5,
    will: 8,
    loyalty: 88,
    trait: "Frontier Sentinel",
    abilityName: "Border Wards",
    abilityType: "passive",
    abilityText: "Gain +3 defense as governor, or +1 as assistant, in any province.",
    friends: ["dorian-blacktide", "brannoc-voss"],
    rivals: ["lysandra-crow"]
  },
  {
    id: "merek-ashfall",
    name: "Lord Merek Ashfall",
    portrait: "MA",
    might: 7,
    intellect: 7,
    charisma: 7,
    will: 6,
    loyalty: 58,
    trait: "Ambitious Warmaster",
    abilityName: "Scorch Banner",
    abilityType: "active",
    abilityText: "Once per turn, the assigned province gains +3 attack and +1 muster for assaults this turn.",
    friends: [],
    rivals: ["seraphine-vale", "tiber-halcyon"]
  },
  {
    id: "ysra-moonveil",
    name: "Oracle Ysra Moonveil",
    portrait: "YM",
    might: 2,
    intellect: 8,
    charisma: 7,
    will: 10,
    loyalty: 84,
    trait: "Keeper of Omens",
    abilityName: "Moonlit Court",
    abilityType: "passive",
    abilityText: "The assigned province gains +2 stability, and Moonwell provinces recover extra loyalty.",
    friends: ["elowen-pyre"],
    rivals: ["merek-ashfall"]
  },
  {
    id: "brannoc-voss",
    name: "Castellan Brannoc Voss",
    portrait: "BV",
    might: 7,
    intellect: 6,
    charisma: 4,
    will: 7,
    loyalty: 80,
    trait: "Stone Oath Veteran",
    abilityName: "Stone Ledger",
    abilityType: "passive",
    abilityText: "While assigned to a fortress province, gain +3 defense.",
    friends: ["kael-thorn"],
    rivals: ["elowen-pyre", "lysandra-crow"]
  },
  {
    id: "lysandra-crow",
    name: "Envoy Lysandra Crow",
    portrait: "LC",
    might: 4,
    intellect: 7,
    charisma: 8,
    will: 6,
    loyalty: 69,
    trait: "Whispercourt Diplomat",
    abilityName: "Veiled Envoys",
    abilityType: "active",
    abilityText: "Once per turn, the assigned province ignores rivalry penalties and gains +2 stability this turn.",
    friends: ["seraphine-vale"],
    rivals: ["dorian-blacktide", "kael-thorn", "brannoc-voss"]
  },
  {
    id: "tiber-halcyon",
    name: "Reeve Tiber Halcyon",
    portrait: "TH",
    might: 5,
    intellect: 6,
    charisma: 8,
    will: 7,
    loyalty: 76,
    trait: "Harvest Magistrate",
    abilityName: "Harvest Decree",
    abilityType: "passive",
    abilityText: "While assigned to a wealth province, gain +2 gold and +1 stability.",
    friends: ["seraphine-vale"],
    rivals: ["merek-ashfall"]
  }
];

function cloneRegion(region) {
  return {
    ...region,
    neighbors: [...region.neighbors]
  };
}

function cloneCharacter(character) {
  return {
    ...character,
    friends: [...character.friends],
    rivals: [...character.rivals]
  };
}

function createIndex(items) {
  return new Map(items.map((item) => [item.id, item]));
}

function createInitialState() {
  return {
    turn: 1,
    treasury: 24,
    activeMapId: "ashen-realm",
    directiveId: "development",
    selectedDetailTab: "overview",
    selectedRegionId: "obsidian-crown",
    selectedAttackTargetId: null,
    attackUsedThisTurn: false,
    gameWon: false,
    activatedAbilities: {},
    activeEffects: {},
    regions: INITIAL_REGIONS.map(cloneRegion),
    characters: INITIAL_CHARACTERS.map(cloneCharacter),
    log: []
  };
}

const state = createInitialState();

const indexes = {
  regions: new Map(),
  characters: new Map(),
  mapRegions: {}
};

function refreshIndexes() {
  indexes.regions = createIndex(state.regions);
  indexes.characters = createIndex(state.characters);
  indexes.mapRegions = Object.fromEntries(
    Object.entries(MAP_DEFINITIONS).map(([mapId, mapDefinition]) => [mapId, createIndex(mapDefinition.regions)])
  );
}

function resetState() {
  Object.assign(state, createInitialState());
  refreshIndexes();
  return state;
}

const hasDocument = typeof document !== "undefined";

function createElements() {
  if (!hasDocument) {
    return {};
  }

  return {
    turnNumber: document.querySelector("#turn-number"),
    treasuryValue: document.querySelector("#treasury-value"),
    ownedCount: document.querySelector("#owned-count"),
    mapSubtitle: document.querySelector("#map-subtitle"),
    mapCanvas: document.querySelector("#map-canvas"),
    mapLegend: document.querySelector("#map-legend"),
    currentDirectiveName: document.querySelector("#current-directive-name"),
    currentDirectiveCopy: document.querySelector("#current-directive-copy"),
    directiveControls: document.querySelector("#directive-controls"),
    selectedRegionStatus: document.querySelector("#selected-region-status"),
    regionList: document.querySelector("#region-list"),
    regionDetail: document.querySelector("#region-detail"),
    characterRoster: document.querySelector("#character-roster"),
    eventLog: document.querySelector("#event-log"),
    turnSummary: document.querySelector("#turn-summary"),
    victoryBanner: document.querySelector("#victory-banner"),
    endTurnButton: document.querySelector("#end-turn-button")
  };
}

refreshIndexes();

const elements = createElements();

// Initialization and input wiring.

// Boot the prototype with seeded logs and a valid default attack target.
function init() {
  addLogEntry("The Chosen banner rises over Obsidian Crown and Silvermere.", "system");
  addLogEntry(`Directive chosen: ${getCurrentDirective().name}.`, "directive");
  addLogEntry("One assault may be launched each turn against an adjacent neutral province.", "system");
  ensureSelectedAttackTarget();
  bindEvents();
  render();
}

function bindEvents() {
  if (!hasDocument) {
    return;
  }

  elements.regionList.addEventListener("click", handleRegionListClick);
  elements.mapCanvas.addEventListener("click", handleMapClick);
  elements.directiveControls.addEventListener("click", handleDirectiveClick);
  elements.regionDetail.addEventListener("change", handleRegionDetailChange);
  elements.regionDetail.addEventListener("click", handleRegionDetailClick);
  elements.endTurnButton.addEventListener("click", endTurn);
}

function handleMapClick(event) {
  const regionNode = event.target.closest("[data-region-id]");
  if (!regionNode) {
    return;
  }

  selectRegion(regionNode.dataset.regionId);
}

function handleRegionListClick(event) {
  const card = event.target.closest("[data-region-id]");
  if (!card) {
    return;
  }

  selectRegion(card.dataset.regionId);
}

function handleDirectiveClick(event) {
  const button = event.target.closest("[data-directive-id]");
  if (!button || state.gameWon) {
    return;
  }

  setDirective(button.dataset.directiveId);
}

function handleRegionDetailChange(event) {
  const appointmentSelect = event.target.closest("select[data-role]");
  if (appointmentSelect) {
    updateAssignment(
      appointmentSelect.dataset.regionId,
      appointmentSelect.dataset.role,
      appointmentSelect.value || null
    );
    return;
  }

  const targetSelect = event.target.closest("select[data-attack-target]");
  if (targetSelect) {
    state.selectedAttackTargetId = targetSelect.value || null;
    render();
  }
}

function handleRegionDetailClick(event) {
  const tabButton = event.target.closest("[data-detail-tab]");
  if (tabButton) {
    state.selectedDetailTab = tabButton.dataset.detailTab;
    render();
    return;
  }

  const targetButton = event.target.closest("[data-select-target-id]");
  if (targetButton) {
    state.selectedAttackTargetId = targetButton.dataset.selectTargetId;
    render();
    return;
  }

  const abilityButton = event.target.closest("[data-activate-ability-id]");
  if (abilityButton) {
    activateAbility(abilityButton.dataset.activateAbilityId);
    return;
  }

  const attackButton = event.target.closest("[data-action='attack']");
  if (attackButton) {
    launchAttack();
  }
}

// Render pipeline.

function render() {
  if (!hasDocument) {
    return;
  }

  renderTopBar();
  renderMapPanel();
  renderDirectiveControls();
  renderRegionList();
  renderRegionDetail();
  renderCharacterRoster();
  renderLog();
  renderTurnPanel();
}

function renderMapPanel() {
  const mapDefinition = getActiveMapDefinition();
  const selectedRegion = getSelectedRegion();
  const attackTargets = getAttackTargets(selectedRegion);

  elements.mapSubtitle.textContent = `${mapDefinition.description} Selected: ${selectedRegion.name}.`;
  elements.mapCanvas.innerHTML = renderMapSvg(mapDefinition, selectedRegion, attackTargets);
  elements.mapLegend.innerHTML = renderMapLegend();
}

function renderMapSvg(mapDefinition, selectedRegion, attackTargets) {
  const attackTargetIds = new Set(attackTargets.map((region) => region.id));
  const selectedNeighborIds = new Set(selectedRegion.neighbors);

  return `
    <svg class="world-map" viewBox="${mapDefinition.viewBox}" role="img" aria-label="${mapDefinition.name}">
      <defs>
        <linearGradient id="map-ocean" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#120f1c"></stop>
          <stop offset="100%" stop-color="#09080d"></stop>
        </linearGradient>
        <linearGradient id="map-land" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#403424"></stop>
          <stop offset="100%" stop-color="#211b14"></stop>
        </linearGradient>
        <filter id="region-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="rgba(0,0,0,0.35)"></feDropShadow>
        </filter>
      </defs>

      <rect class="map-ocean" x="0" y="0" width="1000" height="560" rx="28"></rect>
      <g class="map-backdrop">
        ${mapDefinition.backdropPaths.map((path) => `<path d="${path}"></path>`).join("")}
      </g>

      <g class="map-routes">
        ${mapDefinition.routePairs.map((pair) => renderMapRoute(mapDefinition, pair, selectedRegion.id, selectedNeighborIds)).join("")}
      </g>

      <g class="map-regions">
        ${mapDefinition.regions.map((regionShape) => renderMapRegion(regionShape, attackTargetIds, selectedRegion.id)).join("")}
      </g>
    </svg>
  `;
}

function renderMapRoute(mapDefinition, pair, selectedRegionId, selectedNeighborIds) {
  const from = getMapRegionShape(mapDefinition, pair[0]);
  const to = getMapRegionShape(mapDefinition, pair[1]);
  if (!from || !to) {
    return "";
  }

  const routeClasses = [
    "map-route",
    pair.includes(selectedRegionId) ? "is-selected-edge" : "",
    selectedNeighborIds.has(pair[0]) || selectedNeighborIds.has(pair[1]) ? "is-neighbor-edge" : ""
  ].filter(Boolean).join(" ");

  return `<line class="${routeClasses}" x1="${from.labelX}" y1="${from.labelY}" x2="${to.labelX}" y2="${to.labelY}"></line>`;
}

function renderMapRegion(regionShape, attackTargetIds, selectedRegionId) {
  const region = getRegionById(regionShape.id);
  if (!region) {
    return "";
  }

  const classes = [
    "map-region",
    `owner-${region.owner}`,
    `type-${region.type}`,
    region.id === selectedRegionId ? "is-selected" : "",
    attackTargetIds.has(region.id) ? "is-attack-target" : ""
  ].filter(Boolean).join(" ");
  const landmark = getLandmark(region.landmark);

  return `
    <g class="${classes}" data-region-id="${region.id}" tabindex="0">
      <path class="map-region-shape" d="${regionShape.path}"></path>
      <text class="map-region-label" x="${regionShape.labelX}" y="${regionShape.labelY}">${region.name}</text>
      <text class="map-region-subtitle" x="${regionShape.labelX}" y="${regionShape.labelY + 20}">
        ${labelForType(region.type)}${landmark ? ` • ${landmark.name}` : ""}
      </text>
    </g>
  `;
}

function renderMapLegend() {
  return MAP_LEGEND_SECTIONS.map((section) => `
    <div class="map-legend-group">
      <span class="mini-label">${section.title}</span>
      ${section.rows.map((row) => `
        <div class="legend-row">
          <span class="legend-swatch ${row.className}"></span><span>${row.label}</span>
        </div>
      `).join("")}
    </div>
  `).join("");
}

function renderTopBar() {
  elements.turnNumber.textContent = String(state.turn);
  elements.treasuryValue.textContent = String(state.treasury);
  elements.ownedCount.textContent = `${getOwnedRegions().length} / ${state.regions.length}`;
  elements.currentDirectiveName.textContent = getCurrentDirective().name;
  elements.currentDirectiveCopy.textContent = getCurrentDirective().summary;
}

function renderDirectiveControls() {
  elements.directiveControls.innerHTML = Object.values(DIRECTIVES)
    .map((directive) => `
      <button
        class="directive-button ${directive.id === state.directiveId ? "active" : ""}"
        type="button"
        data-directive-id="${directive.id}"
      >
        <span class="mini-label">Directive</span>
        <strong>${directive.name}</strong>
      </button>
    `)
    .join("");
}

function renderRegionList() {
  elements.regionList.innerHTML = state.regions
    .map((region) => {
      const output = computeRegionOutput(region);
      const governor = getCharacterById(region.governorId);
      const assistant = getCharacterById(region.assistantId);
      const neutralNeighbors = region.neighbors.filter((neighborId) => getRegionById(neighborId).owner === "neutral");
      const landmark = getLandmark(region.landmark);

      return `
        <button
          class="region-card ${region.id === state.selectedRegionId ? "selected" : ""}"
          type="button"
          data-region-id="${region.id}"
        >
          <div class="region-card-top">
            <div>
              <div class="region-name">${region.name}</div>
              <div class="meta-line">${labelForType(region.type)} province</div>
            </div>
            <span class="owner-badge ${region.owner}">${region.owner === "player" ? "Player" : "Neutral"}</span>
          </div>

          <div class="region-card-meta">
            <div class="field-row">
              <span class="mini-label">Landmark</span>
              <span>${landmark ? landmark.name : "None"}</span>
            </div>
            <div class="field-row">
              <span class="mini-label">Governor</span>
              <span>${governor ? governor.name : "Unassigned"}</span>
            </div>
            <div class="field-row">
              <span class="mini-label">Assistant</span>
              <span>${assistant ? assistant.name : "None"}</span>
            </div>
          </div>

          <div class="summary-row">
            <span>Gold ${output.gold.total}</span>
            <span>Defense ${output.defense.total}</span>
            <span>Stability ${output.stability.total}</span>
          </div>

          <div class="field-row region-card-footer">
            <span class="mini-label">Neutral neighbors</span>
            <span>${neutralNeighbors.length}</span>
          </div>
        </button>
      `;
    })
    .join("");
}

function renderRegionDetail() {
  const region = getSelectedRegion();
  const output = computeRegionOutput(region);
  const governor = getCharacterById(region.governorId);
  const assistant = getCharacterById(region.assistantId);
  const relationship = getRelationshipInfo(region);
  const attackTargets = getAttackTargets(region);
  const selectedTarget = getRegionById(state.selectedAttackTargetId);
  const preview = canPreviewAttack(region, selectedTarget) ? computeCombatPreview(region, selectedTarget) : null;

  elements.selectedRegionStatus.textContent =
    region.owner === "player"
      ? "Player-held province. Use tabs to focus on economy, court, or conquest."
      : "Neutral province. Use tabs to review defenses and invasion paths.";

  elements.regionDetail.innerHTML = `
    <section class="detail-hero">
      <div class="detail-hero-top">
        <div>
          <div class="detail-kicker">${labelForType(region.type)} province</div>
          <h3>${region.name}</h3>
        </div>
        <div class="detail-badge-row">
          <span class="status-badge ${region.owner}">${region.owner === "player" ? "Player control" : "Neutral control"}</span>
          <span class="type-badge ${region.type}">${labelForType(region.type)}</span>
          ${region.landmark ? `<span class="detail-pill">${getLandmark(region.landmark).name}</span>` : ""}
        </div>
      </div>
      <p class="detail-copy compact">${getRegionDescription(region)}</p>
      <div class="detail-summary-grid">
        <div class="summary-pill">
          <span class="mini-label">Gold</span>
          <strong>${output.gold.total}</strong>
        </div>
        <div class="summary-pill">
          <span class="mini-label">Defense</span>
          <strong>${output.defense.total}</strong>
        </div>
        <div class="summary-pill">
          <span class="mini-label">Stability</span>
          <strong>${output.stability.total}</strong>
        </div>
      </div>
    </section>

    ${renderDetailTabs()}
    ${renderDetailTabPanel(region, output, governor, assistant, relationship, attackTargets, selectedTarget, preview)}

    ${region.owner === "player" && !region.governorId ? `
      <div class="warning-strip">
        Imperial law requires every owned province to have a governor before the next turn can begin.
      </div>
    ` : ""}
  `;
}

function renderDetailTabs() {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "court", label: "Court" },
    { id: "conquest", label: "Conquest" }
  ];

  return `
    <div class="detail-tabs" role="tablist" aria-label="Region detail tabs">
      ${tabs.map((tab) => `
        <button
          class="detail-tab ${state.selectedDetailTab === tab.id ? "active" : ""}"
          type="button"
          data-detail-tab="${tab.id}"
        >
          ${tab.label}
        </button>
      `).join("")}
    </div>
  `;
}

function renderDetailTabPanel(region, output, governor, assistant, relationship, attackTargets, selectedTarget, preview) {
  switch (state.selectedDetailTab) {
    case "court":
      return renderCourtTab(region, governor, assistant, relationship);
    case "conquest":
      return renderConquestTab(region, attackTargets, selectedTarget, preview);
    case "overview":
    default:
      return renderOverviewTab(region, output, governor, assistant, relationship);
  }
}

function renderOverviewTab(region, output, governor, assistant, relationship) {
  return `
    <section class="section-block">
      <div class="section-header compact">
        <h4>Derived Output</h4>
      </div>
      <div class="stat-grid detailed">
        ${renderDetailedStatCard("Gold", output.gold)}
        ${renderDetailedStatCard("Defense", output.defense)}
        ${renderDetailedStatCard("Stability", output.stability)}
      </div>
    </section>

    <section class="section-block">
      <div class="section-header compact">
        <h4>Regional Context</h4>
      </div>
      <div class="detail-meta-grid">
        <div class="meta-card">
          <div class="mini-label">Landmark effect</div>
          <div class="detail-copy">${region.landmark ? getLandmark(region.landmark).summary : "No landmark bonus is active here."}</div>
        </div>
        <div class="meta-card">
          <div class="mini-label">Neighbors</div>
          <div class="neighbor-list">${renderNeighborChips(region)}</div>
        </div>
      </div>
    </section>

    <section class="section-block">
      <div class="section-header compact">
        <h4>Court Snapshot</h4>
      </div>
      <div class="relationship-banner ${relationship.kind}">
        <strong>${relationship.title}</strong>
        <span>${relationship.summary}</span>
      </div>
      <div class="dynamics-grid">
        ${renderLoyaltyCard("Governor", governor)}
        ${renderLoyaltyCard("Assistant", assistant)}
      </div>
    </section>
  `;
}

function renderCourtTab(region, governor, assistant, relationship) {
  if (region.owner !== "player") {
    return `
      <section class="empty-state">
        <div class="mini-label">Neutral court</div>
        <p class="empty-copy">Neutral provinces cannot be staffed yet. Capture this province before assigning officers.</p>
      </section>
    `;
  }

  return `
    <section class="section-block">
      <div class="section-header compact">
        <h4>Appointments</h4>
      </div>
      <div class="relationship-banner ${relationship.kind}">
        <strong>${relationship.title}</strong>
        <span>${relationship.summary}</span>
      </div>
      <div class="assignment-grid">
        <div class="assignment-slot">
          <label class="field-label">
            <span class="assignment-role">Governor</span>
            <select data-region-id="${region.id}" data-role="governor">
              ${renderCharacterOptions(region, "governor")}
            </select>
          </label>
          ${renderPostCard(governor, "Governor")}
        </div>
        <div class="assignment-slot">
          <label class="field-label">
            <span class="assignment-role">Assistant</span>
            <select data-region-id="${region.id}" data-role="assistant">
              ${renderCharacterOptions(region, "assistant")}
            </select>
          </label>
          ${renderPostCard(assistant, "Assistant")}
        </div>
      </div>
    </section>

    <section class="section-block">
      <div class="section-header compact">
        <h4>Active Abilities</h4>
      </div>
      <div class="ability-grid">
        ${renderAbilitySection(region)}
      </div>
    </section>
  `;
}

function renderConquestTab(region, attackTargets, selectedTarget, preview) {
  if (region.owner === "player") {
    return `
      <section class="section-block">
        <div class="section-header compact">
          <h4>Conquest</h4>
        </div>
        ${renderConquestSection(region, attackTargets, selectedTarget, preview)}
      </section>
    `;
  }

  return `
    <section class="section-block">
      <div class="section-header compact">
        <h4>Approach</h4>
      </div>
      <div class="command-grid">
        <div class="meta-card">
          <div class="mini-label">Attackable from</div>
          <div class="neighbor-list">${renderPlayerNeighborChips(region)}</div>
        </div>
        <div class="meta-card">
          <div class="mini-label">Defense posture</div>
          <div class="detail-copy">Base defense, province type, landmark bonuses, and defender readiness all stack here.</div>
        </div>
      </div>
    </section>
  `;
}

function renderDetailedStatCard(label, stat) {
  return `
    <article class="stat-card detailed">
      <div class="stat-label">${label}</div>
      <div class="stat-value">${stat.total}</div>
      <div class="formula-list">
        ${stat.lines.map((line) => renderFormulaLine(line)).join("")}
      </div>
    </article>
  `;
}

function renderFormulaLine(line) {
  return `
    <div class="formula-line ${line.value < 0 ? "negative" : "positive"}">
      <span>${line.label}</span>
      <strong>${formatSignedValue(line.value)}</strong>
    </div>
  `;
}

function renderLoyaltyCard(role, character) {
  if (!character) {
    return `
      <article class="loyalty-card empty">
        <div class="mini-label">${role}</div>
        <div class="card-status">No officer assigned.</div>
      </article>
    `;
  }

  const band = getLoyaltyBand(character.loyalty);

  return `
    <article class="loyalty-card">
      <div class="field-row">
        <span class="mini-label">${role}</span>
        <span class="loyalty-label ${band.className}">${band.label}</span>
      </div>
      <div class="post-name">${character.name}</div>
      <div class="loyalty-track">
        <div class="loyalty-fill ${band.className}" style="width: ${character.loyalty}%"></div>
      </div>
      <div class="field-row">
        <span class="mini-label">Loyalty</span>
        <span>${character.loyalty}</span>
      </div>
      <div class="card-status">${band.summary}</div>
    </article>
  `;
}

function renderAbilitySection(region) {
  const officers = [region.governorId, region.assistantId]
    .map((characterId) => getCharacterById(characterId))
    .filter(Boolean);
  const activeOfficers = officers.filter((character) => character.abilityType === "active");

  if (activeOfficers.length === 0) {
    return `
      <article class="empty-state">
        <div class="mini-label">No active powers here</div>
        <p class="empty-copy">Assign a character with an active ability to this province to unlock manual powers.</p>
      </article>
    `;
  }

  return activeOfficers.map((character) => renderAbilityCard(character, region)).join("");
}

function renderAbilityCard(character, region) {
  const isUsed = Boolean(state.activatedAbilities[character.id]);
  const effect = getRegionEffect(region.id);
  const bonusText = effect.notes.length ? effect.notes.join(" ") : "No temporary effect active in this province.";

  return `
    <article class="ability-card">
      <div class="field-row">
        <div>
          <div class="post-name">${character.name}</div>
          <div class="card-trait">${character.abilityName}</div>
        </div>
        <span class="ability-badge active">${isUsed ? "spent" : "ready"}</span>
      </div>
      <p class="card-status">${character.abilityText}</p>
      <p class="field-copy">${bonusText}</p>
      <button
        class="action-button secondary"
        type="button"
        data-activate-ability-id="${character.id}"
        ${isUsed || state.gameWon ? "disabled" : ""}
      >
        ${isUsed ? "Already Used" : "Activate Power"}
      </button>
    </article>
  `;
}

function renderConquestSection(region, attackTargets, selectedTarget, preview) {
  if (state.gameWon) {
    return `
      <div class="empty-state">
        <div class="mini-label">Empire complete</div>
        <p class="empty-copy">Every province has fallen under your banner. The campaign is won.</p>
      </div>
    `;
  }

  if (!region.governorId) {
    return `
      <div class="warning-strip">
        This province cannot launch an assault without a governor.
      </div>
    `;
  }

  if (state.attackUsedThisTurn) {
    return `
      <div class="empty-state">
        <div class="mini-label">Assault already used</div>
        <p class="empty-copy">Only one conquest action is available each turn. End the turn to launch another campaign.</p>
      </div>
    `;
  }

  if (attackTargets.length === 0) {
    return `
      <div class="empty-state">
        <div class="mini-label">No adjacent neutral targets</div>
        <p class="empty-copy">Choose another owned province if you want to continue the conquest this turn.</p>
      </div>
    `;
  }

  return `
    <div class="target-grid">
      ${attackTargets.map((target) => renderTargetCard(region, target)).join("")}
    </div>
    <div class="field-row">
      <span class="mini-label">Selected target</span>
      <select data-attack-target>
        ${renderAttackTargetOptions(region)}
      </select>
    </div>
    ${
      selectedTarget && preview
        ? `
          <div class="combat-preview">
            <div class="combat-column">
              <div class="field-row">
                <div>
                  <div class="mini-label">Attack power</div>
                  <div class="stat-value combat">${preview.attack.total}</div>
                </div>
                <span class="outlook-chip ${preview.outlook.className}">${preview.outlook.label}</span>
              </div>
              <div class="formula-list">
                ${preview.attack.lines.map((line) => renderFormulaLine(line)).join("")}
              </div>
            </div>
            <div class="combat-column">
              <div class="mini-label">Defense power</div>
              <div class="stat-value combat">${preview.defense.total}</div>
              <div class="formula-list">
                ${preview.defense.lines.map((line) => renderFormulaLine(line)).join("")}
              </div>
            </div>
          </div>
          <div class="battle-readout">
            <div class="battle-readout-card">
              <span class="mini-label">Projected margin</span>
              <strong class="${preview.margin >= 0 ? "positive-text" : "negative-text"}">${formatSignedValue(preview.margin)}</strong>
            </div>
            <div class="battle-readout-card">
              <span class="mini-label">Needed to win</span>
              <strong>${preview.requiredAttack}</strong>
            </div>
            <div class="battle-readout-card">
              <span class="mini-label">Biggest pressure</span>
              <strong>${preview.leadingFactor}</strong>
            </div>
          </div>
          <div class="field-row combat-footer">
            <p class="field-copy">
              ${preview.outlook.copy}
            </p>
            <button class="action-button" type="button" data-action="attack">Launch Assault</button>
          </div>
        `
        : ""
    }
  `;
}

function renderTargetCard(attackerRegion, targetRegion) {
  const preview = computeCombatPreview(attackerRegion, targetRegion);
  const selected = targetRegion.id === state.selectedAttackTargetId;

  return `
    <button
      class="target-card ${selected ? "selected" : ""}"
      type="button"
      data-select-target-id="${targetRegion.id}"
    >
      <div class="field-row">
        <div>
          <div class="post-name">${targetRegion.name}</div>
          <div class="meta-line">${labelForType(targetRegion.type)} province</div>
        </div>
        <span class="type-badge ${targetRegion.type}">${labelForType(targetRegion.type)}</span>
      </div>
      <div class="summary-row">
        <span>Attack ${preview.attack.total}</span>
        <span>Defense ${preview.defense.total}</span>
      </div>
      <div class="card-status">${preview.outlook.label}: ${preview.outlook.copy}</div>
    </button>
  `;
}

function renderAttackTargetOptions(region) {
  const targets = getAttackTargets(region);
  return targets
    .map((target) => `
      <option value="${target.id}" ${target.id === state.selectedAttackTargetId ? "selected" : ""}>
        ${target.name}
      </option>
    `)
    .join("");
}

function renderCharacterRoster() {
  const selectedRegion = getSelectedRegion();
  const sortedCharacters = state.characters.slice().sort((left, right) => {
    const leftAssigned = getCharacterAssignment(left.id) ? 0 : 1;
    const rightAssigned = getCharacterAssignment(right.id) ? 0 : 1;

    if (leftAssigned !== rightAssigned) {
      return leftAssigned - rightAssigned;
    }

    return right.loyalty - left.loyalty;
  });

  elements.characterRoster.innerHTML = sortedCharacters
    .map((character) => {
      const assignment = getCharacterAssignment(character.id);
      const stationedHere = assignment && assignment.regionId === selectedRegion.id;
      const loyaltyBand = getLoyaltyBand(character.loyalty);

      return `
        <article class="character-card ${assignment ? "is-assigned" : ""} ${stationedHere ? "is-selected-station" : ""}">
          <div class="card-top">
            <div class="card-identity">
              <div class="portrait">${character.portrait}</div>
              <div>
                <div class="card-name">${character.name}</div>
                <p class="card-trait">${character.trait}</p>
              </div>
            </div>
            <span class="ability-badge ${character.abilityType}">${character.abilityType}</span>
          </div>

          <div class="field-row">
            <span class="mini-label">Ability</span>
            <span>${character.abilityName}</span>
          </div>

          <div class="field-row">
            <span class="mini-label">Loyalty</span>
            <span class="loyalty-label ${loyaltyBand.className}">${character.loyalty} ${loyaltyBand.label}</span>
          </div>
          <div class="loyalty-track compact">
            <div class="loyalty-fill ${loyaltyBand.className}" style="width: ${character.loyalty}%"></div>
          </div>

          <p class="card-status">${describeAssignment(character)}</p>

          <div class="tag-row">
            <span class="mini-label">Friends</span>
            ${renderRelationChips(character.friends, "friend")}
          </div>
          <div class="tag-row">
            <span class="mini-label">Rivals</span>
            ${renderRelationChips(character.rivals, "rival")}
          </div>

          <div class="roster-stats">
            ${renderRosterStat("Might", character.might)}
            ${renderRosterStat("Intel", character.intellect)}
            ${renderRosterStat("Char", character.charisma)}
            ${renderRosterStat("Will", character.will)}
            ${renderRosterStat("Loyal", character.loyalty)}
          </div>
        </article>
      `;
    })
    .join("");
}

function renderLog() {
  elements.eventLog.innerHTML = state.log
    .slice()
    .reverse()
    .map(
      (entry) => `
        <article class="log-entry ${entry.type}">
          <div>
            <div class="log-meta">Turn ${entry.turn}</div>
            <p class="log-text">${entry.message}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function renderTurnPanel() {
  const assignedCount = getAssignedCharacters().length;
  const attackState = state.attackUsedThisTurn ? "assault spent" : "assault ready";
  const directive = getCurrentDirective().name;

  elements.turnSummary.textContent = `Directive: ${directive}. ${assignedCount} officers are currently assigned. This turn's conquest action is ${attackState}.`;

  if (state.gameWon) {
    elements.victoryBanner.hidden = false;
    elements.victoryBanner.textContent = `Victory: every province now serves the empire. Final treasury: ${state.treasury}.`;
    elements.endTurnButton.disabled = true;
    elements.endTurnButton.textContent = "Empire Complete";
  } else {
    elements.victoryBanner.hidden = true;
    elements.victoryBanner.textContent = "";
    elements.endTurnButton.disabled = false;
    elements.endTurnButton.textContent = "End Turn";
  }
}

// Gameplay actions.

function setDirective(directiveId) {
  if (!DIRECTIVES[directiveId] || directiveId === state.directiveId) {
    return;
  }

  state.directiveId = directiveId;
  addLogEntry(`Directive chosen: ${getCurrentDirective().name}.`, "directive");
  ensureSelectedAttackTarget();
  render();
}

function updateAssignment(regionId, role, nextCharacterId) {
  const region = getRegionById(regionId);
  if (!region || region.owner !== "player") {
    return;
  }

  const slotKey = role === "governor" ? "governorId" : "assistantId";
  const otherKey = role === "governor" ? "assistantId" : "governorId";
  const previousCharacterId = region[slotKey];

  if (previousCharacterId === nextCharacterId) {
    return;
  }

  if (nextCharacterId && region[otherKey] === nextCharacterId) {
    addLogEntry("A single character cannot serve as both governor and assistant in the same province.", "warning");
    render();
    return;
  }

  if (nextCharacterId) {
    const currentPost = getCharacterAssignment(nextCharacterId);
    if (currentPost && !(currentPost.regionId === regionId && currentPost.role === role)) {
      addLogEntry(`${getCharacterById(nextCharacterId).name} must first be released from ${getRegionById(currentPost.regionId).name}.`, "warning");
      render();
      return;
    }
  }

  region[slotKey] = nextCharacterId;

  if (previousCharacterId) {
    addLogEntry(`${getCharacterById(previousCharacterId).name} leaves the ${role} post in ${region.name}.`, "system");
  }

  if (nextCharacterId) {
    addLogEntry(`${getCharacterById(nextCharacterId).name} is appointed ${role} of ${region.name}.`, "system");
  } else {
    addLogEntry(`${region.name} now stands without a ${role}.`, "warning");
  }

  ensureSelectedAttackTarget();
  render();
}

function activateAbility(characterId) {
  const character = getCharacterById(characterId);
  const assignment = getCharacterAssignment(characterId);

  if (!character || !assignment || character.abilityType !== "active" || state.activatedAbilities[characterId] || state.gameWon) {
    return;
  }

  const region = getRegionById(assignment.regionId);
  const effect = getOrCreateRegionEffect(region.id);

  switch (character.id) {
    case "dorian-blacktide":
      effect.attackBonus += 4;
      effect.notes.push("March of Iron grants +4 attack.");
      break;
    case "merek-ashfall":
      effect.attackBonus += 3;
      effect.musterBonus += 1;
      effect.notes.push("Scorch Banner grants +3 attack and +1 muster.");
      break;
    case "lysandra-crow":
      effect.stabilityBonus += 2;
      effect.ignoreRivalry = true;
      effect.notes.push("Veiled Envoys grants +2 stability and suppresses rivalry.");
      break;
    default:
      return;
  }

  state.activatedAbilities[characterId] = state.turn;
  addLogEntry(`${character.name} activates ${character.abilityName} in ${region.name}.`, "system");
  render();
}

function launchAttack() {
  const attacker = getSelectedRegion();
  const defender = getRegionById(state.selectedAttackTargetId);

  if (!canPreviewAttack(attacker, defender) || state.attackUsedThisTurn || state.gameWon) {
    return;
  }

  if (!attacker.governorId) {
    addLogEntry(`${attacker.name} needs a governor before it can lead an assault.`, "warning");
    render();
    return;
  }

  const preview = computeCombatPreview(attacker, defender);
  state.attackUsedThisTurn = true;

  if (preview.attack.total >= preview.defense.total) {
    defender.owner = "player";
    defender.governorId = null;
    defender.assistantId = null;

    adjustPostBattleLoyalty(attacker, 4);
    addLogEntry(
      `${attacker.name} conquers ${defender.name} with ${preview.attack.total} attack against ${preview.defense.total} defense (${formatSignedValue(preview.margin)} margin).`,
      "battle"
    );
    addLogEntry(`${defender.name} joins the empire but still requires a governor.`, "system");

    selectRegion(defender.id, false);

    if (checkVictory()) {
      state.gameWon = true;
      addLogEntry("All provinces now bow to the Chosen. The campaign is won.", "victory");
    }
  } else {
    adjustPostBattleLoyalty(attacker, -5);
    addLogEntry(
      `${attacker.name} fails to take ${defender.name}. The assault breaks at ${preview.attack.total} attack against ${preview.defense.total} defense (${formatSignedValue(preview.margin)} margin).`,
      "battle"
    );
  }

  render();
}

function endTurn() {
  if (state.gameWon) {
    return;
  }

  const missingGovernor = state.regions.find((region) => region.owner === "player" && !region.governorId);
  if (missingGovernor) {
    addLogEntry(`${missingGovernor.name} must receive a governor before the turn can end.`, "warning");
    render();
    return;
  }

  const ownedRegions = getOwnedRegions();
  const outputs = ownedRegions.map((region) => ({
    region,
    output: computeRegionOutput(region)
  }));
  const totalGold = outputs.reduce((sum, entry) => sum + entry.output.gold.total, 0);
  const lowestStability = outputs.reduce((lowest, entry) =>
    !lowest || entry.output.stability.total < lowest.output.stability.total ? entry : lowest
  , null);
  const highestDefense = outputs.reduce((best, entry) =>
    !best || entry.output.defense.total > best.output.defense.total ? entry : best
  , null);
  const totalStability = outputs.reduce((sum, entry) => sum + entry.output.stability.total, 0);
  const averageStability = Math.round(totalStability / outputs.length);

  state.treasury += totalGold;
  resolveLoyaltyChanges(outputs);

  state.turn += 1;
  state.attackUsedThisTurn = false;
  state.activatedAbilities = {};
  state.activeEffects = {};
  ensureSelectedAttackTarget();

  addLogEntry(`Treasury grows by ${totalGold} gold and now stands at ${state.treasury}.`, "system");
  addLogEntry(`${highestDefense.region.name} is your strongest bastion at ${highestDefense.output.defense.total} defense.`, "system");
  addLogEntry(`${lowestStability.region.name} is your most fragile court at ${lowestStability.output.stability.total} stability. Empire average stability is ${averageStability}.`, "warning");
  addLogEntry(`New turn begins under the ${getCurrentDirective().name} directive.`, "directive");
  render();
}

// Rule evaluation and formulas.

// Region output is a transparent stack of base values, province traits, officers, relationships, and temporary effects.
function computeRegionOutput(region) {
  const output = {
    gold: createStat(region.baseGold, "Base province", region.baseGold),
    defense: createStat(region.baseDefense, "Base province", region.baseDefense),
    stability: createStat(region.baseStability, "Base province", region.baseStability)
  };
  const landmark = getLandmark(region.landmark);
  const effect = getRegionEffect(region.id);
  const relationship = getRelationshipInfo(region);

  applyTypeBonuses(output, region);
  applyLandmarkBonuses(output, landmark);

  if (region.owner === "player") {
    applyDirectiveBonuses(output, getCurrentDirective());
  }

  applyOfficerGovernance(output, getCharacterById(region.governorId), region, "governor");
  applyOfficerGovernance(output, getCharacterById(region.assistantId), region, "assistant");

  if (relationship.outputModifier !== 0) {
    applyStat(output.gold, relationship.title, relationship.outputModifier);
    applyStat(output.defense, relationship.title, relationship.outputModifier);
    applyStat(output.stability, relationship.title, relationship.outputModifier);
  }

  if (effect.stabilityBonus) {
    applyStat(output.stability, "Temporary effect", effect.stabilityBonus);
  }

  finalizeStat(output.gold);
  finalizeStat(output.defense);
  finalizeStat(output.stability);
  return output;
}

function computeCombatPreview(attackerRegion, defenderRegion) {
  const attack = createStat(0, "No base attack", 0);
  const defense = createStat(defenderRegion.baseDefense, "Base province", defenderRegion.baseDefense);
  const attackerOutput = computeRegionOutput(attackerRegion);
  const defenderOutput = computeRegionOutput(defenderRegion);
  const attackerEffect = getRegionEffect(attackerRegion.id);
  const attackerLandmark = getLandmark(attackerRegion.landmark);
  const defenderLandmark = getLandmark(defenderRegion.landmark);
  const attackerRelationship = getRelationshipInfo(attackerRegion);
  const defenderRelationship = getRelationshipInfo(defenderRegion);
  const governor = getCharacterById(attackerRegion.governorId);
  const assistant = getCharacterById(attackerRegion.assistantId);
  const defenderGovernor = getCharacterById(defenderRegion.governorId);
  const defenderAssistant = getCharacterById(defenderRegion.assistantId);

  const muster = Math.max(1, Math.floor(attackerOutput.stability.total / 6));
  applyStat(attack, "Regional muster", muster + attackerEffect.musterBonus);

  if (governor) {
    applyStat(
      attack,
      `${governor.name} leads (${getLoyaltyBand(governor.loyalty).label.toLowerCase()})`,
      getOfficerAttackContribution(governor, "governor")
    );
  }

  if (assistant) {
    applyStat(
      attack,
      `${assistant.name} supports (${getLoyaltyBand(assistant.loyalty).label.toLowerCase()})`,
      getOfficerAttackContribution(assistant, "assistant")
    );
  }

  if (getCurrentDirective().attackBonus) {
    applyStat(attack, `${getCurrentDirective().name} directive`, getCurrentDirective().attackBonus);
  }

  if (attackerLandmark && attackerLandmark.attackBonus) {
    applyStat(attack, attackerLandmark.name, attackerLandmark.attackBonus);
  }

  if (attackerEffect.attackBonus) {
    applyStat(attack, "Temporary effect", attackerEffect.attackBonus);
  }

  if (attackerRelationship.attackModifier) {
    applyStat(attack, attackerRelationship.title, attackerRelationship.attackModifier);
  }

  applyTypeBonuses({ gold: createStat(0, "", 0), defense, stability: createStat(0, "", 0) }, defenderRegion);
  applyLandmarkDefense(defense, defenderLandmark);
  applyStat(defense, "Defender readiness", Math.max(2, Math.floor(defenderOutput.stability.total / 4)));
  applyStat(defense, "Terrain friction", 1);

  if (defenderGovernor) {
    applyStat(defense, `${defenderGovernor.name} commands`, getOfficerDefenseContribution(defenderGovernor, "governor"));
  }

  if (defenderAssistant) {
    applyStat(defense, `${defenderAssistant.name} assists`, getOfficerDefenseContribution(defenderAssistant, "assistant"));
  }

  if (defenderRelationship.defenseModifier) {
    applyStat(defense, defenderRelationship.title, defenderRelationship.defenseModifier);
  }

  finalizeStat(attack);
  finalizeStat(defense);

  const leadingAttackLine = attack.lines
    .slice(1)
    .sort((left, right) => Math.abs(right.value) - Math.abs(left.value))[0];
  const leadingDefenseLine = defense.lines
    .slice(1)
    .sort((left, right) => Math.abs(right.value) - Math.abs(left.value))[0];
  const margin = attack.total - defense.total;
  const leadingFactor = margin >= 0
    ? (leadingAttackLine ? leadingAttackLine.label : "Base muster")
    : (leadingDefenseLine ? leadingDefenseLine.label : "Base defense");

  return {
    attack,
    defense,
    margin,
    requiredAttack: defense.total,
    leadingFactor,
    outlook: getCombatOutlook(margin)
  };
}

function resolveLoyaltyChanges(outputs) {
  const improved = [];
  const declined = [];

  state.characters.forEach((character) => {
    const assignment = getCharacterAssignment(character.id);
    let delta = 0;

    if (assignment) {
      const region = getRegionById(assignment.regionId);
      const outputEntry = outputs.find((entry) => entry.region.id === region.id);
      const output = outputEntry ? outputEntry.output : computeRegionOutput(region);

      delta += 1;

      if (output.stability.total >= 15) {
        delta += 1;
      }

      if (output.stability.total <= 8) {
        delta -= 1;
      }

      if (state.directiveId === "stability") {
        delta += 2;
      }

      if (state.directiveId === "development" && region.type === "wealth") {
        delta += 1;
      }

      if (getLandmark(region.landmark)?.loyaltyRecovery) {
        delta += getLandmark(region.landmark).loyaltyRecovery;
      }
    } else {
      delta -= 1;
    }

    if (delta !== 0) {
      const nextLoyalty = clamp(character.loyalty + delta, 0, 100);
      const actualDelta = nextLoyalty - character.loyalty;
      character.loyalty = nextLoyalty;

      if (actualDelta > 0) {
        improved.push(`${character.name} (+${actualDelta})`);
      } else if (actualDelta < 0) {
        declined.push(`${character.name} (${actualDelta})`);
      }
    }
  });

  if (improved.length) {
    addLogEntry(`Loyalty rises: ${improved.join(", ")}.`, "system");
  }

  if (declined.length) {
    addLogEntry(`Loyalty slips: ${declined.join(", ")}.`, "warning");
  }
}

function adjustPostBattleLoyalty(region, delta) {
  [region.governorId, region.assistantId]
    .filter(Boolean)
    .forEach((characterId) => {
      const character = getCharacterById(characterId);
      character.loyalty = clamp(character.loyalty + delta, 0, 100);
    });
}

function applyTypeBonuses(output, region) {
  if (region.type === "wealth") {
    applyStat(output.gold, "Wealth province", 2);
  } else if (region.type === "fortress") {
    applyStat(output.defense, "Fortress province", 2);
  } else if (region.type === "mystic") {
    applyStat(output.stability, "Mystic province", 2);
  }
}

function applyLandmarkBonuses(output, landmark) {
  if (!landmark) {
    return;
  }

  if (landmark.goldBonus) {
    applyStat(output.gold, landmark.name, landmark.goldBonus);
  }

  if (landmark.defenseBonus) {
    applyStat(output.defense, landmark.name, landmark.defenseBonus);
  }

  if (landmark.stabilityBonus) {
    applyStat(output.stability, landmark.name, landmark.stabilityBonus);
  }
}

function applyLandmarkDefense(defenseStat, landmark) {
  if (landmark && landmark.defenseBonus) {
    applyStat(defenseStat, landmark.name, landmark.defenseBonus);
  }
}

function applyDirectiveBonuses(output, directive) {
  if (directive.goldBonus) {
    applyStat(output.gold, `${directive.name} directive`, directive.goldBonus);
  }

  if (directive.stabilityBonus) {
    applyStat(output.stability, `${directive.name} directive`, directive.stabilityBonus);
  }
}

function applyOfficerGovernance(output, character, region, role) {
  if (!character) {
    return;
  }

  const roleWeight = role === "governor" ? 1 : 0.55;
  const loyaltyBonus = getLoyaltyBand(character.loyalty).governanceBonus;
  const title = role === "governor" ? `${character.name} governs` : `${character.name} assists`;

  const gold = Math.round(((character.intellect * 0.9) + (character.charisma * 0.8) + loyaltyBonus) * roleWeight / 2.3);
  const defense = Math.round(((character.might * 0.95) + (character.will * 0.75) + loyaltyBonus) * roleWeight / 2.4);
  const stability = Math.round(((character.charisma * 0.8) + (character.will * 0.7) + loyaltyBonus) * roleWeight / 2.35);

  applyStat(output.gold, title, gold);
  applyStat(output.defense, title, defense);
  applyStat(output.stability, title, stability);

  if (character.abilityType !== "passive") {
    return;
  }

  switch (character.id) {
    case "seraphine-vale":
      if (region.type === "wealth") {
        applyStat(output.gold, character.abilityName, 3);
      }
      break;
    case "elowen-pyre":
      if (region.type === "mystic") {
        applyStat(output.gold, character.abilityName, 1);
        applyStat(output.stability, character.abilityName, 2);
      }
      break;
    case "kael-thorn":
      applyStat(output.defense, character.abilityName, role === "governor" ? 3 : 1);
      break;
    case "ysra-moonveil":
      applyStat(output.stability, character.abilityName, 2);
      break;
    case "brannoc-voss":
      if (region.type === "fortress") {
        applyStat(output.defense, character.abilityName, 3);
      }
      break;
    case "tiber-halcyon":
      if (region.type === "wealth") {
        applyStat(output.gold, character.abilityName, 2);
        applyStat(output.stability, character.abilityName, 1);
      }
      break;
    default:
      break;
  }
}

function getOfficerAttackContribution(character, role) {
  const weight = role === "governor" ? 1 : 0.6;
  const loyalty = getLoyaltyBand(character.loyalty).combatBonus;
  return Math.max(
    1,
    Math.round(((character.might * 1.35) + (character.will * 0.85) + (character.charisma * 0.35)) * weight / 2 + loyalty)
  );
}

function getOfficerDefenseContribution(character, role) {
  const weight = role === "governor" ? 1 : 0.6;
  const loyalty = getLoyaltyBand(character.loyalty).combatBonus;
  return Math.max(
    1,
    Math.round(((character.might * 0.85) + (character.will * 1.1) + (character.intellect * 0.25)) * weight / 2 + loyalty)
  );
}

function renderCharacterOptions(region, role) {
  const selectedId = role === "governor" ? region.governorId : region.assistantId;
  const placeholder = role === "governor" ? "Select governor" : "No assistant";
  const options = state.characters.filter((character) => isCharacterEligible(character.id, region, role));

  return [
    `<option value="" ${selectedId ? "" : "selected"}>${placeholder}</option>`,
    ...options.map((character) => `
      <option value="${character.id}" ${selectedId === character.id ? "selected" : ""}>
        ${character.name}
      </option>
    `)
  ].join("");
}

function isCharacterEligible(characterId, region, role) {
  const assignment = getCharacterAssignment(characterId);
  if (!assignment) {
    return region.governorId !== characterId && region.assistantId !== characterId;
  }

  return assignment.regionId === region.id && assignment.role === role;
}

function renderPostCard(character, title) {
  if (!character) {
    return `
      <article class="post-card empty">
        <div class="mini-label">${title}</div>
        <div>No officer is holding this post.</div>
      </article>
    `;
  }

  const loyaltyBand = getLoyaltyBand(character.loyalty);

  return `
    <article class="post-card">
      <div class="post-header">
        <div class="card-identity">
          <div class="portrait">${character.portrait}</div>
          <div>
            <div class="post-name">${character.name}</div>
            <div class="card-trait">${character.trait}</div>
          </div>
        </div>
        <span class="ability-badge ${character.abilityType}">${character.abilityType}</span>
      </div>
      <div class="field-row">
        <span class="mini-label">Ability</span>
        <span>${character.abilityName}</span>
      </div>
      <div class="field-row">
        <span class="mini-label">Loyalty</span>
        <span class="loyalty-label ${loyaltyBand.className}">${character.loyalty}</span>
      </div>
      <div class="post-metrics">
        ${renderMetricPill("Mgt", character.might)}
        ${renderMetricPill("Int", character.intellect)}
        ${renderMetricPill("Cha", character.charisma)}
        ${renderMetricPill("Wil", character.will)}
        ${renderMetricPill("Loy", character.loyalty)}
      </div>
    </article>
  `;
}

function renderRosterStat(label, value) {
  return `
    <div class="roster-stat">
      <div class="mini-label">${label}</div>
      <strong>${value}</strong>
    </div>
  `;
}

function renderMetricPill(label, value) {
  return `
    <div class="metric-pill">
      <div class="mini-label">${label}</div>
      <strong>${value}</strong>
    </div>
  `;
}

function renderNeighborChips(region) {
  return region.neighbors
    .map((neighborId) => getRegionById(neighborId))
    .filter(Boolean)
    .map((neighbor) => `<span class="neighbor-chip">${neighbor.name}</span>`)
    .join("");
}

function renderPlayerNeighborChips(region) {
  const playerNeighbors = region.neighbors
    .map((neighborId) => getRegionById(neighborId))
    .filter((neighbor) => neighbor && neighbor.owner === "player");

  if (!playerNeighbors.length) {
    return `<span class="neighbor-chip">None</span>`;
  }

  return playerNeighbors
    .map((neighbor) => `<span class="neighbor-chip">${neighbor.name}</span>`)
    .join("");
}

function renderRelationChips(characterIds, kind) {
  if (!characterIds.length) {
    return `<span class="relation-chip neutral">None</span>`;
  }

  return characterIds
    .map((characterId) => {
      const character = getCharacterById(characterId);
      return `<span class="relation-chip ${kind}">${character ? character.name : characterId}</span>`;
    })
    .join("");
}

function describeAssignment(character) {
  const assignment = getCharacterAssignment(character.id);
  if (!assignment) {
    return "Unassigned and available for governance or conquest duties.";
  }

  const region = getRegionById(assignment.regionId);
  return `Serving as ${assignment.role} in ${region.name}.`;
}

function getRegionDescription(region) {
  const directive = getCurrentDirective();
  const landmark = getLandmark(region.landmark);
  const holdings = getOwnedRegions().length;
  const descriptionByType = {
    wealth: `${region.name} thrives on markets, toll roads, and the appetite of rival merchants.`,
    fortress: `${region.name} holds the marches through walls, discipline, and narrow kill-zones.`,
    mystic: `${region.name} shapes obedience through omens, rites, and the fear of hidden powers.`
  };

  const landmarkCopy = landmark ? ` Its landmark, ${landmark.name}, grants a visible regional modifier.` : "";
  return `${descriptionByType[region.type]}${landmarkCopy} The empire currently holds ${holdings} provinces, and the ${directive.name} directive is active.`;
}

function getRelationshipInfo(region) {
  const governor = getCharacterById(region.governorId);
  const assistant = getCharacterById(region.assistantId);
  const effect = getRegionEffect(region.id);

  if (!governor || !assistant) {
    return {
      kind: "neutral",
      title: "No paired court effect",
      summary: "Install both offices in this province to create friendship bonuses or rivalry penalties.",
      outputModifier: 0,
      attackModifier: 0,
      defenseModifier: 0
    };
  }

  if (governor.friends.includes(assistant.id) || assistant.friends.includes(governor.id)) {
    return {
      kind: "friend",
      title: "Friends in office",
      summary: `${governor.name} and ${assistant.name} trust one another. Governance gains +1 and attacks gain +2.`,
      outputModifier: 1,
      attackModifier: 2,
      defenseModifier: 1
    };
  }

  if (governor.rivals.includes(assistant.id) || assistant.rivals.includes(governor.id)) {
    if (effect.ignoreRivalry) {
      return {
        kind: "suppressed",
        title: "Rivalry suppressed",
        summary: "A temporary effect is suppressing rivalry penalties in this province this turn.",
        outputModifier: 0,
        attackModifier: 0,
        defenseModifier: 0
      };
    }

    return {
      kind: "rival",
      title: "Rivals in office",
      summary: `${governor.name} and ${assistant.name} undermine each other. Governance suffers -1 and attacks suffer -2.`,
      outputModifier: -1,
      attackModifier: -2,
      defenseModifier: -1
    };
  }

  return {
    kind: "neutral",
    title: "Professional pairing",
    summary: "No direct friendship or rivalry modifier applies in this province.",
    outputModifier: 0,
    attackModifier: 0,
    defenseModifier: 0
  };
}

function getLoyaltyBand(loyalty) {
  if (loyalty >= 70) {
    return {
      label: "steadfast",
      className: "high",
      governanceBonus: 2,
      combatBonus: 2,
      summary: "High loyalty grants small governance and combat bonuses."
    };
  }

  if (loyalty >= 40) {
    return {
      label: "steady",
      className: "mid",
      governanceBonus: 0,
      combatBonus: 0,
      summary: "Normal loyalty applies no extra modifier."
    };
  }

  if (loyalty >= 20) {
    return {
      label: "shaken",
      className: "low",
      governanceBonus: -1,
      combatBonus: -1,
      summary: "Low loyalty applies a mild penalty to governance and combat."
    };
  }

  return {
    label: "defiant",
    className: "critical",
    governanceBonus: -3,
    combatBonus: -3,
    summary: "Critical loyalty applies severe penalties. Betrayal is intentionally out of scope for this prototype."
  };
}

// Shared lookups and utilities.

function ensureSelectedAttackTarget() {
  const region = getSelectedRegion();
  const targets = getAttackTargets(region);

  if (!targets.length) {
    state.selectedAttackTargetId = null;
    return;
  }

  const currentTarget = targets.find((target) => target.id === state.selectedAttackTargetId);
  if (!currentTarget) {
    state.selectedAttackTargetId = targets[0].id;
  }
}

function canPreviewAttack(attacker, defender) {
  return Boolean(
    attacker &&
    defender &&
    attacker.owner === "player" &&
    defender.owner === "neutral" &&
    attacker.neighbors.includes(defender.id)
  );
}

function getAttackTargets(region) {
  if (!region || region.owner !== "player") {
    return [];
  }

  return region.neighbors
    .map((neighborId) => getRegionById(neighborId))
    .filter((neighbor) => neighbor && neighbor.owner === "neutral");
}

function getCurrentDirective() {
  return DIRECTIVES[state.directiveId];
}

function getAssignedCharacters() {
  return state.characters.filter((character) => getCharacterAssignment(character.id));
}

function getOwnedRegions() {
  return state.regions.filter((region) => region.owner === "player");
}

function checkVictory() {
  return state.regions.every((region) => region.owner === "player");
}

function selectRegion(regionId, shouldRender = true) {
  state.selectedRegionId = regionId;
  ensureSelectedAttackTarget();

  if (shouldRender) {
    render();
  }
}

function getActiveMapDefinition() {
  return MAP_DEFINITIONS[state.activeMapId];
}

function getMapRegionShape(mapDefinition, regionId) {
  return indexes.mapRegions[mapDefinition.id].get(regionId) || null;
}

function createStat(initialValue, label, visibleValue) {
  return {
    total: initialValue,
    lines: [{ label, value: visibleValue }]
  };
}

function applyStat(stat, label, value) {
  if (!value) {
    return;
  }

  stat.total += value;
  stat.lines.push({ label, value });
}

function finalizeStat(stat) {
  stat.total = Math.max(0, stat.total);
}

function getLandmark(landmarkId) {
  return landmarkId ? LANDMARKS[landmarkId] : null;
}

function getOrCreateRegionEffect(regionId) {
  if (!state.activeEffects[regionId]) {
    state.activeEffects[regionId] = {
      attackBonus: 0,
      stabilityBonus: 0,
      musterBonus: 0,
      ignoreRivalry: false,
      notes: []
    };
  }

  return state.activeEffects[regionId];
}

function getRegionEffect(regionId) {
  return state.activeEffects[regionId] || {
    attackBonus: 0,
    stabilityBonus: 0,
    musterBonus: 0,
    ignoreRivalry: false,
    notes: []
  };
}

function getCombatOutlook(margin) {
  if (margin >= 4) {
    return {
      label: "Favored",
      className: "positive",
      copy: "This battle is clearly in your favor if no assignments change before the assault."
    };
  }

  if (margin >= 0) {
    return {
      label: "Narrow edge",
      className: "neutral",
      copy: "You have a small advantage. An active ability or better pairing would make the result safer."
    };
  }

  if (margin >= -4) {
    return {
      label: "Risky",
      className: "warning",
      copy: "This attack is close, but the defender still holds the edge. A stronger directive or ability use could swing it."
    };
  }

  return {
    label: "Unfavorable",
    className: "danger",
    copy: "The defender is likely to hold. Reassign officers, change directive, or use an active ability first."
  };
}

function formatSignedValue(value) {
  return value > 0 ? `+${value}` : String(value);
}

function labelForType(type) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

function addLogEntry(message, type) {
  state.log.push({
    turn: state.turn,
    type,
    message
  });

  if (state.log.length > 48) {
    state.log = state.log.slice(state.log.length - 48);
  }
}

function getSelectedRegion() {
  return getRegionById(state.selectedRegionId) || state.regions[0];
}

function getRegionById(regionId) {
  return indexes.regions.get(regionId) || null;
}

function getCharacterById(characterId) {
  return indexes.characters.get(characterId) || null;
}

function getCharacterAssignment(characterId) {
  for (const region of state.regions) {
    if (region.governorId === characterId) {
      return { regionId: region.id, role: "governor" };
    }

    if (region.assistantId === characterId) {
      return { regionId: region.id, role: "assistant" };
    }
  }

  return null;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

if (hasDocument) {
  init();
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    DIRECTIVES,
    LANDMARKS,
    MAP_DEFINITIONS,
    MAP_LEGEND_SECTIONS,
    INITIAL_REGIONS,
    INITIAL_CHARACTERS,
    state,
    resetState,
    renderMapLegend,
    computeRegionOutput,
    computeCombatPreview,
    getAttackTargets,
    getRelationshipInfo,
    getLoyaltyBand,
    getCurrentDirective,
    getSelectedRegion,
    getRegionById,
    getCharacterById,
    getCharacterAssignment,
    getOwnedRegions,
    selectRegion,
    setDirective,
    updateAssignment,
    activateAbility,
    launchAttack,
    endTurn,
    addLogEntry,
    getRegionEffect,
    getLandmark,
    getActiveMapDefinition
  };
}
