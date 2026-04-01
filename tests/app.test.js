const test = require("node:test");
const assert = require("node:assert/strict");

const game = require("../app.js");

function createFakeStorage() {
  const backingStore = new Map();

  return {
    getItem(key) {
      return backingStore.has(key) ? backingStore.get(key) : null;
    },
    setItem(key, value) {
      backingStore.set(key, String(value));
    },
    removeItem(key) {
      backingStore.delete(key);
    }
  };
}

test.beforeEach(() => {
  game.resetState();
});

test("resetState restores the seeded game state", () => {
  game.updateAssignment("silvermere", "governor", null);
  game.setDirective("conquest");

  game.resetState();

  assert.equal(game.state.directiveId, "development");
  assert.equal(game.state.plannedDirectiveId, "development");
  assert.equal(game.getRegionById("silvermere").governorId, "seraphine-vale");
  assert.equal(game.state.turn, 1);
});

test("computeRegionOutput returns the seeded Silvermere totals", () => {
  const output = game.computeRegionOutput(game.getRegionById("silvermere"));

  assert.equal(output.gold.total, 33);
  assert.equal(output.defense.total, 15);
  assert.equal(output.stability.total, 20);
});

test("queued directive does not affect the current turn and applies after turn rollover", () => {
  const attacker = game.getRegionById("obsidian-crown");
  const defender = game.getRegionById("veilmere");
  const developmentPreview = game.computeCombatPreview(attacker, defender);

  game.setDirective("conquest");
  const queuedPreview = game.computeCombatPreview(attacker, defender);

  assert.equal(game.state.directiveId, "development");
  assert.equal(game.state.plannedDirectiveId, "conquest");
  assert.equal(queuedPreview.attack.total, developmentPreview.attack.total);
  assert.equal(queuedPreview.defense.total, developmentPreview.defense.total);

  game.endTurn();
  const conquestPreview = game.computeCombatPreview(attacker, defender);

  assert.equal(game.state.directiveId, "conquest");
  assert.equal(game.state.plannedDirectiveId, "conquest");
  assert.equal(conquestPreview.attack.total - developmentPreview.attack.total, 4);
  assert.equal(conquestPreview.margin > developmentPreview.margin, true);
});

test("Lysandra's active ability suppresses rivalry penalties", () => {
  game.updateAssignment("obsidian-crown", "assistant", "lysandra-crow");

  const rivalry = game.getRelationshipInfo(game.getRegionById("obsidian-crown"));
  assert.equal(rivalry.kind, "rival");

  game.activateAbility("lysandra-crow");

  const suppressed = game.getRelationshipInfo(game.getRegionById("obsidian-crown"));
  const effect = game.getRegionEffect("obsidian-crown");

  assert.equal(suppressed.kind, "suppressed");
  assert.equal(effect.stabilityBonus, 2);
  assert.equal(effect.ignoreRivalry, true);
});

test("launchAttack conquers a valid adjacent neutral province", () => {
  game.selectRegion("obsidian-crown", false);
  const selectedTargetId = game.state.selectedAttackTargetId;

  game.launchAttack();

  assert.equal(game.getRegionById(selectedTargetId).owner, "player");
  assert.equal(game.state.attackUsedThisTurn, true);
  assert.equal(game.state.selectedRegionId, selectedTargetId);
});

test("endTurn is blocked when an owned region has no governor", () => {
  game.updateAssignment("silvermere", "governor", null);

  game.endTurn();

  assert.equal(game.state.turn, 1);
  assert.equal(game.state.treasury, 24);
  assert.match(game.state.log.at(-1).message, /must receive a governor/);
});

test("endTurn collects gold and advances the turn when the empire is valid", () => {
  game.endTurn();

  assert.equal(game.state.turn, 2);
  assert.equal(game.state.treasury, 74);
  assert.equal(game.state.attackUsedThisTurn, false);
  assert.match(game.state.log.at(-1).message, /New turn begins under the Development directive/);
});

test("renderMapLegend renders the configured legend sections", () => {
  const markup = game.renderMapLegend();

  assert.match(markup, /Ownership/);
  assert.match(markup, /Region Type/);
  assert.match(markup, /Highlights/);
  assert.match(markup, /Valid assault target/);
});

test("renderCharacterRosterMarkup defaults to the deployed-officer view for the selected province", () => {
  const markup = game.renderCharacterRosterMarkup(game.getRegionById("obsidian-crown"));

  assert.match(markup, /Deployed Here \(2\)/);
  assert.match(markup, /Court complete/);
  assert.match(markup, /Kael Thorn/);
  assert.match(markup, /Ysra Moonveil/);
  assert.doesNotMatch(markup, /Seraphine Vale/);
});

test("renderCharacterRosterMarkup can switch to the full roster view", () => {
  game.state.selectedRosterTab = "all";

  const markup = game.renderCharacterRosterMarkup(game.getRegionById("obsidian-crown"));

  assert.match(markup, /All Officers \(9\)/);
  assert.match(markup, /Seraphine Vale/);
  assert.match(markup, /Serving here/);
});

test("getFilteredCharacters surfaces unassigned and ready active officers", () => {
  const unassignedIds = game.getFilteredCharacters("unassigned").map((character) => character.id);
  const readyActiveIds = game.getFilteredCharacters("active-ready").map((character) => character.id);

  assert.equal(unassignedIds.includes("dorian-blacktide"), true);
  assert.equal(unassignedIds.includes("kael-thorn"), false);
  assert.equal(readyActiveIds.includes("merek-ashfall"), true);

  game.updateAssignment("obsidian-crown", "assistant", "lysandra-crow");
  game.activateAbility("lysandra-crow");

  const refreshedReadyIds = game.getFilteredCharacters("active-ready").map((character) => character.id);
  assert.equal(refreshedReadyIds.includes("lysandra-crow"), false);
});

test("saveGame and loadGame round-trip the campaign state", () => {
  const storage = createFakeStorage();

  game.setDirective("conquest");
  game.updateAssignment("silvermere", "assistant", null);

  const saveResult = game.saveGame(storage);
  assert.equal(saveResult.ok, true);
  assert.equal(game.getSaveMetadata(storage).exists, true);

  game.setDirective("stability");
  game.updateAssignment("silvermere", "assistant", "dorian-blacktide");

  const loadResult = game.loadGame(storage);
  assert.equal(loadResult.ok, true);
  assert.equal(game.state.directiveId, "development");
  assert.equal(game.state.plannedDirectiveId, "conquest");
  assert.equal(game.getRegionById("silvermere").assistantId, null);
});

test("loadGame rejects unreadable saved data", () => {
  const storage = createFakeStorage();
  storage.setItem("empire-of-the-chosen-save", "{bad json");

  const loadResult = game.loadGame(storage);
  const meta = game.getSaveMetadata(storage);

  assert.equal(loadResult.ok, false);
  assert.equal(meta.exists, false);
  assert.match(meta.summary, /unreadable/i);
});

test("computeCombatPreview suggests ready active abilities before a risky assault", () => {
  game.updateAssignment("obsidian-crown", "assistant", null);
  game.updateAssignment("obsidian-crown", "assistant", "merek-ashfall");
  game.getCharacterById("kael-thorn").loyalty = 22;
  game.setDirective("stability");

  const preview = game.computeCombatPreview(
    game.getRegionById("obsidian-crown"),
    game.getRegionById("thornwatch")
  );

  assert.equal(preview.margin < 0, true);
  assert.match(preview.attackAnchor, /Merek Ashfall|Regional muster|Kael Thorn/);
  assert.match(preview.defenseAnchor, /Defender readiness|Base province|Fortress province|Local resistance/);
  assert.match(preview.nextStep, /ready active ability/i);
});

test("selectRegion auto-picks the strongest adjacent assault target", () => {
  game.selectRegion("obsidian-crown", false);
  assert.equal(game.state.selectedAttackTargetId, "veilmere");

  game.selectRegion("silvermere", false);
  assert.equal(game.state.selectedAttackTargetId, "ashen-plains");
});

test("getEmpireAlerts highlights missing governors and loyalty pressure", () => {
  game.selectRegion("obsidian-crown", false);
  game.launchAttack();
  game.getCharacterById("brannoc-voss").loyalty = 35;

  const alerts = game.getEmpireAlerts();
  const labels = alerts.map((alert) => alert.label);
  const summaries = alerts.map((alert) => alert.summary).join(" ");

  assert.equal(labels.includes("Blocked"), true);
  assert.equal(labels.includes("Low Loyalty"), true);
  assert.match(summaries, /need a governor/i);
  assert.match(summaries, /below 40 loyalty/i);
});
