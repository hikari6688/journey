import { test, expect } from "vitest";
import { getTypeof } from "../index";
import { TypeEnums } from "../types/index.d";
const testData: { data: any; expected: TypeEnums }[] = [
  { data: null, expected: "Null" },
  { data: undefined, expected: "Undefined" },
  { data: true, expected: "Boolean" },
  { data: 123, expected: "Number" },
  { data: "hello", expected: "String" },
  { data: [], expected: "Array" },
  { data: {}, expected: "Object" },
  { data: /regex/, expected: "RegExp" },
  { data: new Date(), expected: "Date" },
  { data: new Error("Error occurred"), expected: "Error" },
  { data: () => {}, expected: "Function" },
];

testData.forEach(({ data, expected }, index) => {
  test(`getTypeof(${index}) should return ${expected} for ${JSON.stringify(
    data
  )}`, () => {
    const result = getTypeof(data);
    expect(result).toBe(expected);
  });
});
