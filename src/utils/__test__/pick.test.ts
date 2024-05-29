import { pick } from "../index"; 
import { describe, test, expect } from "vitest";

describe("pick function", () => {
  test("should return a new object with only the specified keys", () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    const keys = ["a", "c"];
    expect(pick(obj, keys)).toEqual({ a: 1, c: 3 });
  });

  test("should ignore keys that do not exist in the object", () => {
    const obj = { a: 1, b: 2 };
    const keys = ["a", "c", "d"];
    expect(pick(obj, keys)).toEqual({ a: 1 });
  });
});
