import {
  defineConfig,
  presetAttributify,
  presetWind3,
  presetIcons,
  presetTypography,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  rules: [],
  shortcuts: {
    "text-ellipsis": "overflow-hidden text-ellipsis whitespace-nowrap",
  },
  blocklist: [],
  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
  ],
  transformers: [transformerVariantGroup()],
});
