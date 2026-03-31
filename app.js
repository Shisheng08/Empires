const directives = [
  "Secure the silver roads before the frontier houses sense weakness.",
  "Win the loyalty of the mystic shrines and bind omen-readers to the throne.",
  "Fortify the northern marches and deny raiders a soft crossing.",
  "Gather surplus tribute to prepare for a greater campaign season.",
  "Quiet unrest in the border courts before rival claimants take root."
];

// Regions and characters are kept in plain objects so the prototype stays easy to extend.
const state = {
  turn: 1,
  directiveIndex: 0,
  selectedRegionId: "obsidian-crown",
  regions: [
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
      neighbors: ["silvermere", "thornwatch", "veilmere"]
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
      neighbors: ["obsidian-crown", "veilmere", "ashen-plains"]
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
      neighbors: ["obsidian-crown", "veilmere", "starfall-bastion"]
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
      neighbors: ["obsidian-crown", "silvermere", "thornwatch", "ashen-plains", "moonfall-sanctum"]
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
      neighbors: ["silvermere", "veilmere", "moonfall-sanctum"]
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
      neighbors: ["thornwatch", "moonfall-sanctum"]
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
      neighbors: ["veilmere", "ashen-plains", "starfall-bastion"]
    }
  ],
  characters: [
    {
      id: "seraphine-vale",
      name: "Lady Seraphine Vale",
      portrait: "SV",
      might: 4,
      intellect: 7,
      charisma: 9,
      will: 8,
      loyalty: 7,
      trait: "Silver-Tongued Regent",
      abilityName: "Golden Tithes",
      abilityType: "passive"
    },
    {
      id: "dorian-blacktide",
      name: "Marshal Dorian Blacktide",
      portrait: "DB",
      might: 9,
      intellect: 5,
      charisma: 4,
      will: 8,
      loyalty: 8,
      trait: "Siege-Born Commander",
      abilityName: "March of Iron",
      abilityType: "active"
    },
    {
      id: "elowen-pyre",
      name: "High Seer Elowen Pyre",
      portrait: "EP",
      might: 3,
      intellect: 9,
      charisma: 6,
      will: 9,
      loyalty: 6,
      trait: "Starfire Oracle",
      abilityName: "Astral Census",
      abilityType: "passive"
    },
    {
      id: "kael-thorn",
      name: "Warden Kael Thorn",
      portrait: "KT",
      might: 8,
      intellect: 6,
      charisma: 5,
      will: 8,
      loyalty: 9,
      trait: "Frontier Sentinel",
      abilityName: "Border Wards",
      abilityType: "passive"
    },
    {
      id: "merek-ashfall",
      name: "Lord Merek Ashfall",
      portrait: "MA",
      might: 7,
      intellect: 7,
      charisma: 7,
      will: 6,
      loyalty: 5,
      trait: "Ambitious Warmaster",
      abilityName: "Scorch Banner",
      abilityType: "active"
    },
    {
      id: "ysra-moonveil",
      name: "Oracle Ysra Moonveil",
      portrait: "YM",
      might: 2,
      intellect: 8,
      charisma: 7,
      will: 10,
      loyalty: 8,
      trait: "Keeper of Omens",
      abilityName: "Moonlit Court",
      abilityType: "passive"
    },
    {
      id: "brannoc-voss",
      name: "Castellan Brannoc Voss",
      portrait: "BV",
      might: 7,
      intellect: 6,
      charisma: 4,
      will: 7,
      loyalty: 9,
      trait: "Stone Oath Veteran",
      abilityName: "Stone Ledger",
      abilityType: "passive"
    },
    {
      id: "lysandra-crow",
      name: "Envoy Lysandra Crow",
      portrait: "LC",
      might: 4,
      intellect: 7,
      charisma: 8,
      will: 6,
      loyalty: 7,
      trait: "Whispercourt Diplomat",
      abilityName: "Veiled Envoys",
      abilityType: "active"
    },
    {
      id: "tiber-halcyon",
      name: "Reeve Tiber Halcyon",
      portrait: "TH",
      might: 5,
      intellect: 6,
      charisma: 8,
      will: 7,
      loyalty: 8,
      trait: "Harvest Magistrate",
      abilityName: "Harvest Decree",
      abilityType: "passive"
    }
  ],
  log: []
};

const elements = {
  turnNumber: document.querySelector("#turn-number"),
  currentDirective: document.querySelector("#current-directive"),
  selectedRegionStatus: document.querySelector("#selected-region-status"),
  regionList: document.querySelector("#region-list"),
  regionDetail: document.querySelector("#region-detail"),
  characterRoster: document.querySelector("#character-roster"),
  eventLog: document.querySelector("#event-log"),
  endTurnButton: document.querySelector("#end-turn-button")
};

// Initialize static data, bind UI events, and paint the first frame.
function init() {
  addLogEntry("The Chosen banner rises over Obsidian Crown and Silvermere.", "system");
  addLogEntry(`Directive received: ${getCurrentDirective()}`, "directive");
  bindEvents();
  render();
}

function bindEvents() {
  elements.regionList.addEventListener("click", (event) => {
    const card = event.target.closest("[data-region-id]");
    if (!card) {
      return;
    }

    state.selectedRegionId = card.dataset.regionId;
    render();
  });

  elements.regionDetail.addEventListener("change", (event) => {
    const select = event.target.closest("select[data-role]");
    if (!select) {
      return;
    }

    updateAssignment(select.dataset.regionId, select.dataset.role, select.value || null);
  });

  elements.endTurnButton.addEventListener("click", endTurn);
}

function render() {
  elements.turnNumber.textContent = String(state.turn);
  elements.currentDirective.textContent = getCurrentDirective();
  renderRegionList();
  renderRegionDetail();
  renderCharacterRoster();
  renderLog();
}

function renderRegionList() {
  elements.regionList.innerHTML = state.regions
    .map((region) => {
      const stats = computeRegionStats(region);
      const governor = getCharacterById(region.governorId);
      const assistant = getCharacterById(region.assistantId);

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
              <span class="mini-label">Governor</span>
              <span>${governor ? governor.name : "Unassigned"}</span>
            </div>
            <div class="field-row">
              <span class="mini-label">Assistant</span>
              <span>${assistant ? assistant.name : "None"}</span>
            </div>
          </div>

          <div class="summary-row">
            <span>Gold ${stats.gold}</span>
            <span>Defense ${stats.defense}</span>
            <span>Stability ${stats.stability}</span>
          </div>
        </button>
      `;
    })
    .join("");
}

function renderRegionDetail() {
  const region = getSelectedRegion();
  const stats = computeRegionStats(region);
  const governor = getCharacterById(region.governorId);
  const assistant = getCharacterById(region.assistantId);

  elements.selectedRegionStatus.textContent =
    region.owner === "player"
      ? "Player-held domain with appointments under your authority"
      : "Neutral land. Conquest systems can connect here later";

  elements.regionDetail.innerHTML = `
    <section class="detail-hero">
      <div class="detail-kicker">${labelForType(region.type)} province</div>
      <div class="detail-badge-row">
        <h3>${region.name}</h3>
        <div class="detail-badge-row">
          <span class="status-badge ${region.owner}">${region.owner === "player" ? "Player control" : "Neutral control"}</span>
          <span class="type-badge ${region.type}">${labelForType(region.type)}</span>
        </div>
      </div>
      <p class="detail-copy">${getRegionDescription(region)}</p>
    </section>

    <section class="section-block">
      <div class="section-header">
        <h4>Derived Output</h4>
        <p>Base province values are enhanced by the personalities assigned to rule it.</p>
      </div>
      <div class="stat-grid">
        ${renderStatCard("Gold", stats.gold, region.baseGold)}
        ${renderStatCard("Defense", stats.defense, region.baseDefense)}
        ${renderStatCard("Stability", stats.stability, region.baseStability)}
      </div>
    </section>

    <section class="section-block">
      <div class="section-header">
        <h4>Province Brief</h4>
        <p>Each territory has a distinct strategic pressure based on its type and borders.</p>
      </div>
      <div class="command-grid">
        <div class="meta-card">
          <div class="mini-label">Neighbors</div>
          <div class="neighbor-list">${renderNeighborChips(region)}</div>
        </div>
        <div class="meta-card">
          <div class="mini-label">Governance</div>
          <div class="detail-copy">
            ${region.owner === "player"
              ? region.governorId
                ? "A governor is installed. This seat may still take one assistant."
                : "This region lacks a governor and will block the end of the turn."
              : "Neutral seats cannot receive appointments until conquest is added."}
          </div>
        </div>
      </div>
    </section>

    ${
      region.owner === "player"
        ? `
          <section class="section-block">
            <div class="section-header">
              <h4>Appointments</h4>
              <p>Governors are mandatory for owned regions. Assistants are optional.</p>
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
        `
        : `
          <section class="empty-state">
            <div class="mini-label">No appointments available</div>
            <p class="empty-copy">
              Neutral regions are shown with full data now so future conquest systems can plug into
              the same panel without redesigning the UI.
            </p>
          </section>
        `
    }

    ${region.owner === "player" && !region.governorId ? `
      <div class="warning-strip">
        Imperial law requires every owned region to have a governor before the next turn can begin.
      </div>
    ` : ""}
  `;
}

function renderCharacterRoster() {
  const selectedRegion = getSelectedRegion();

  elements.characterRoster.innerHTML = state.characters
    .map((character) => {
      const assignment = getCharacterAssignment(character.id);
      const stationedHere = assignment && assignment.regionId === selectedRegion.id;

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
          <p class="card-status">${describeAssignment(character)}</p>
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
    addLogEntry("A character cannot hold both offices in the same region.", "warning");
    render();
    return;
  }

  if (nextCharacterId) {
    const currentPost = getCharacterAssignment(nextCharacterId);
    if (currentPost && !(currentPost.regionId === regionId && currentPost.role === role)) {
      addLogEntry(`${getCharacterById(nextCharacterId).name} must be unassigned before taking a new office.`, "warning");
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

  render();
}

function endTurn() {
  const missingGovernor = state.regions.find(
    (region) => region.owner === "player" && !region.governorId
  );

  if (missingGovernor) {
    addLogEntry(`${missingGovernor.name} must receive a governor before the turn can end.`, "warning");
    render();
    return;
  }

  const holdings = state.regions.filter((region) => region.owner === "player");
  const reports = holdings.map((region) => ({
    region,
    stats: computeRegionStats(region)
  }));

  const totalGold = reports.reduce((sum, entry) => sum + entry.stats.gold, 0);
  const weakestBorder = reports.reduce((lowest, entry) =>
    !lowest || entry.stats.defense < lowest.stats.defense ? entry : lowest
  , null);
  const mostTense = reports.reduce((lowest, entry) =>
    !lowest || entry.stats.stability < lowest.stats.stability ? entry : lowest
  , null);

  state.turn += 1;
  state.directiveIndex = (state.directiveIndex + 1) % directives.length;

  addLogEntry(`Revenue caravans deliver ${totalGold} gold to the imperial vaults.`, "system");
  addLogEntry(
    `${weakestBorder.region.name} is the softest border at ${weakestBorder.stats.defense} defense.`,
    "warning"
  );
  addLogEntry(
    `${mostTense.region.name} records the lowest stability at ${mostTense.stats.stability}.`,
    "warning"
  );
  addLogEntry(`Directive received: ${getCurrentDirective()}`, "directive");

  render();
}

// Derived region values are assembled from base stats, region type, and appointments.
function computeRegionStats(region) {
  const totals = {
    gold: region.baseGold,
    defense: region.baseDefense,
    stability: region.baseStability
  };

  if (region.type === "wealth") {
    totals.gold += 2;
  } else if (region.type === "fortress") {
    totals.defense += 2;
  } else if (region.type === "mystic") {
    totals.stability += 2;
  }

  applyCharacterContribution(totals, getCharacterById(region.governorId), region, "governor");
  applyCharacterContribution(totals, getCharacterById(region.assistantId), region, "assistant");

  return totals;
}

function applyCharacterContribution(totals, character, region, role) {
  if (!character) {
    return;
  }

  const weight = role === "governor" ? 1 : 0.55;

  totals.gold += Math.round(((character.intellect * 0.7) + (character.charisma * 0.9)) * weight / 2);
  totals.defense += Math.round(((character.might * 0.9) + (character.will * 0.7)) * weight / 2);
  totals.stability += Math.round(((character.will * 0.8) + (character.loyalty * 0.7) + (character.charisma * 0.5)) * weight / 2.2);

  // Passive abilities contribute reliable bonuses. Active abilities are displayed for future systems.
  if (character.abilityType !== "passive") {
    return;
  }

  switch (character.id) {
    case "seraphine-vale":
      if (region.type === "wealth") {
        totals.gold += 3;
      }
      break;
    case "elowen-pyre":
      if (region.type === "mystic") {
        totals.gold += 1;
        totals.stability += 2;
      }
      break;
    case "kael-thorn":
      totals.defense += role === "governor" ? 3 : 1;
      break;
    case "ysra-moonveil":
      totals.stability += 2;
      break;
    case "brannoc-voss":
      if (region.type === "fortress") {
        totals.defense += 3;
      }
      break;
    case "tiber-halcyon":
      if (region.type === "wealth") {
        totals.gold += 2;
        totals.stability += 1;
      }
      break;
    default:
      break;
  }
}

// Only unassigned characters, or the character already in this slot, can appear in a dropdown.
function renderCharacterOptions(region, role) {
  const selectedId = role === "governor" ? region.governorId : region.assistantId;
  const placeholder = role === "governor" ? "Unassigned governor" : "No assistant";
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

function renderStatCard(label, value, baseValue) {
  return `
    <article class="stat-card">
      <div class="stat-label">${label}</div>
      <div class="stat-value">${value}</div>
      <div class="mini-label">Base ${baseValue}</div>
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

function describeAssignment(character) {
  const assignment = getCharacterAssignment(character.id);
  if (!assignment) {
    return "Unassigned and ready for appointment.";
  }

  const region = getRegionById(assignment.regionId);
  return `Serving as ${assignment.role} in ${region.name}.`;
}

function getRegionAssignmentCounts() {
  return state.regions.reduce(
    (totals, region) => {
      if (region.owner === "player") {
        totals.owned += 1;
      }
      if (region.governorId) {
        totals.governors += 1;
      }
      if (region.assistantId) {
        totals.assistants += 1;
      }
      return totals;
    },
    { owned: 0, governors: 0, assistants: 0 }
  );
}

function getRegionDescription(region) {
  const counts = getRegionAssignmentCounts();
  const suffix = ` The empire currently holds ${counts.owned} regions, with ${counts.governors} governors and ${counts.assistants} assistants installed.`;

  switch (region.type) {
    case "wealth":
      return `Fertile roads, market charters, and caravan tolls make ${region.name} a prize for any claimant.${suffix}`;
    case "fortress":
      return `${region.name} anchors the border with heavy walls, disciplined garrisons, and narrow approaches.${suffix}`;
    case "mystic":
      return `${region.name} draws strength from shrines, omens, and strange rites that shape loyalty as much as steel.${suffix}`;
    default:
      return suffix;
  }
}

function addLogEntry(message, type) {
  state.log.push({
    turn: state.turn,
    type,
    message
  });

  if (state.log.length > 36) {
    state.log = state.log.slice(state.log.length - 36);
  }
}

function getCurrentDirective() {
  return directives[state.directiveIndex];
}

function labelForType(type) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

function getSelectedRegion() {
  return getRegionById(state.selectedRegionId) || state.regions[0];
}

function getRegionById(regionId) {
  return state.regions.find((region) => region.id === regionId);
}

function getCharacterById(characterId) {
  return state.characters.find((character) => character.id === characterId) || null;
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

init();
