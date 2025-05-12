import PluginVue from "eslint-plugin-vue";
import PluginPrettier from "eslint-config-prettier";
import js from "@eslint/js";
import globals from "globals";
import VueParser from "vue-eslint-parser";

export default [
  js.configs.recommended,
  ...PluginVue.configs["flat/vue2-recommended"],
  PluginPrettier,
  {
    files: ["src/**/*.{vue,js,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: VueParser,
      parserOptions: {
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {},
  },
];
