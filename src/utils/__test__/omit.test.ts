import { omit } from "../index";

import { describe, test, expect } from "vitest";

describe("omit function", () => {
  test("should return a new object with all keys except the specified ones", () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    const keys = ["b", "d"];
    expect(omit(obj, keys)).toEqual({ a: 1, c: 3 });
  });

  test("should include keys that do not exist in the list of keys to omit", () => {
    const obj = { a: 1, b: 2 };
    const keys = ["c", "d"];
    expect(omit(obj, keys)).toEqual({ a: 1, b: 2 });
  });
});
