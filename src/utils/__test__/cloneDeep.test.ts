import { cloneDeep } from "../index"; // 假设你的 cloneDeep 函数在 cloneDeep.js 或 cloneDeep.ts 文件中
import { test, expect } from "vitest";
test("cloneDeep should clone primitive values", () => {
  const original = 42;
  const cloned = cloneDeep(original);
  expect(cloned).toBe(original); // 注意：对于原始值，=== 或 toBe 足以检查相等性
});

test("cloneDeep should clone objects", () => {
  const original = { a: 1, b: { c: 2 } };
  const cloned = cloneDeep(original);
  expect(cloned).not.toBe(original); // 对象应该是不同的引用
  expect(cloned).toEqual(original); // 但它们的内容应该相同
});

test("cloneDeep should clone arrays", () => {
  const original = [1, 2, 3, { a: 4 }];
  const cloned = cloneDeep(original);
  expect(cloned).not.toBe(original); // 数组应该是不同的引用
  expect(cloned).toEqual(original); // 但它们的内容应该相同
});

test("cloneDeep should handle circular references", () => {
  const original: any = { a: 1 };
  original.b = original; // 创建一个循环引用
  const cloned = cloneDeep(original);
  expect(cloned).not.toBe(original); // 原始对象和克隆对象应该是不同的引用
  expect(cloned.b).not.toBe(original); // 循环引用应该也被克隆，但指向不同的对象
  expect(cloned.b).toBe(cloned); // 克隆的循环引用应该指向克隆的对象本身
});

test("cloneDeep should handle functions", () => {
  // 注意：在 JavaScript 中，函数是对象，但通常我们不克隆函数，因为它们是不可变的
  // 但如果你的实现确实尝试克隆函数，这里可以测试它
  const originalFunc = () => 42;
  const clonedFunc = cloneDeep(originalFunc);
  // 由于函数通常不会克隆（它们是不可变的），所以这里我们只检查类型
  expect(typeof clonedFunc).toBe("function");
  // 但如果你确实克隆了函数体，你可能需要更复杂的测试来验证行为
});
