import { describe, it, expect } from "vitest";
const { validerTitre, formaterTache, compterTachesTerminees, filtrerParEtat } = require("../src/utils");

describe("validerTitre", () => {
  it("retourne true pour un titre valide", () => {
    expect(validerTitre("Ma tache")).toBe(true);
  });

  it("retourne false pour un titre vide", () => {
    expect(validerTitre("")).toBe(false);
    expect(validerTitre("   ")).toBe(false);
  });

  it("retourne false pour un titre non-string", () => {
    expect(validerTitre(null)).toBe(false);
    expect(validerTitre(123)).toBe(false);
  });
});

describe("formaterTache", () => {
  it("cree une tache formatee", () => {
    const tache = formaterTache(1, "  Test  ");
    expect(tache).toEqual({ id: 1, title: "Test", done: false });
  });

  it("respecte le parametre done", () => {
    const tache = formaterTache(2, "Test", true);
    expect(tache.done).toBe(true);
  });
});

describe("compterTachesTerminees", () => {
  it("compte les taches terminees", () => {
    const tasks = [
      { id: 1, title: "A", done: true },
      { id: 2, title: "B", done: false },
      { id: 3, title: "C", done: true },
    ];
    expect(compterTachesTerminees(tasks)).toBe(2);
  });

  it("retourne 0 si aucune tache terminee", () => {
    expect(compterTachesTerminees([{ id: 1, title: "A", done: false }])).toBe(0);
  });
});

describe("filtrerParEtat", () => {
  const tasks = [
    { id: 1, title: "A", done: true },
    { id: 2, title: "B", done: false },
    { id: 3, title: "C", done: true },
  ];

  it("filtre les taches terminees", () => {
    expect(filtrerParEtat(tasks, true)).toHaveLength(2);
  });

  it("filtre les taches en cours", () => {
    expect(filtrerParEtat(tasks, false)).toHaveLength(1);
  });
});
