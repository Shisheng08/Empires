const test = require("node:test");
const assert = require("node:assert/strict");

const game = require("../app.js");

test.beforeEach(() => {
  game.resetState();
});

test("resetState restores the seeded game state", () => {
  game.updateAssignment("silvermere", "governor", null);
  game.setDirective("conquest");

  game.resetState();

  assert.equal(game.state.directiveId, "development");
  assert.equal(game.getRegionById("silvermere").governorId, "seraphine-vale");
  assert.equal(game.state.turn, 1);
});

test("computeRegionOutput returns the seeded Silvermere totals", () => {
  const output = game.computeRegionOutput(game.getRegionById("silvermere"));

  assert.equal(output.gold.total, 33);
  assert.equal(output.defense.total, 15);
  assert.equal(output.stability.total, 20);
});

test("conquest directive improves attack preview while keeping the defense side unchanged", () => {
  const attacker = game.getRegionById("obsidian-crown");
  const defender = game.getRegionById("veilmere");
  const developmentPreview = game.computeCombatPreview(attacker, defender);

  game.setDirective("conquest");
  const conquestPreview = game.computeCombatPreview(attacker, defender);

  assert.equal(conquestPreview.attack.total - developmentPreview.attack.total, 3);
  assert.equal(conquestPreview.margin > developmentPreview.margin, true);
  assert.equal(conquestPreview.defense.total, developmentPreview.defense.total);
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

  game.launchAttack();

  assert.equal(game.getRegionById("thornwatch").owner, "player");
  assert.equal(game.state.attackUsedThisTurn, true);
  assert.equal(game.state.selectedRegionId, "thornwatch");
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
