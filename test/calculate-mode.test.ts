import { describe, test, expect } from "@jest/globals";
import { calculateMode } from "src/calculate-mode";

describe("Calculate Mode", () => {
  test("no values", () => {
    expect(calculateMode([])).toBeUndefined();
  });

  test("one value", () => {
    expect(calculateMode([56])).toEqual(56);
  });

  test("multiple values with one mode", () => {
    expect(calculateMode([3, 3, 3, 4, 4, 5])).toEqual(3);
  });

  test("tie for mode", () => {
    expect(calculateMode([1, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6])).toEqual(3);
  });
});
