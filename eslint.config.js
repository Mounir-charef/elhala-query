// @ts-check

// @ts-ignore Needed due to moduleResolution Node vs Bundler
import { tanstackConfig } from "@tanstack/config/eslint";
import vitest from "@vitest/eslint-plugin";

export default [
  ...tanstackConfig,
  {
    name: "tanstack/temp",
    rules: {
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "no-case-declarations": "off",
    },
  },
  {
    files: ["**/*.spec.ts*", "**/*.test.ts*", "**/*.test-d.ts*"],
    plugins: { vitest },
    rules: {
      ...vitest.configs.recommended.rules,
      "vitest/expect-expect": "warn",
    },
    settings: { vitest: { typecheck: true } },
  },
];
