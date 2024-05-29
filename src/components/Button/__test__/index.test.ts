import { mount } from "@vue/test-utils";
import { test, expect, describe } from "vitest";
import Button from "../index.vue";
describe("Button", () => {
  test("submit with empty input value", async () => {
    const wrapper = mount(Button);
    const button = wrapper.get('[data-testid="submit-button"]');
    const form = wrapper.get('[data-testid="form"]');
    await button.trigger("click");
  });
});
