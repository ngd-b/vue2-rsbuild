import { defineConfig } from "@rsbuild/core";
import { pluginVue2 } from "@rsbuild/plugin-vue2";
import { pluginBabel } from "@rsbuild/plugin-babel";
import { pluginVue2Jsx } from "@rsbuild/plugin-vue2-jsx";
import { pluginLess } from "@rsbuild/plugin-less";
import { pluginSass } from "@rsbuild/plugin-sass";
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill";
// import { pluginEslint } from "@rsbuild/plugin-eslint";
import { pluginImageCompress } from "@rsbuild/plugin-image-compress";
import { RsdoctorRspackPlugin } from "@rsdoctor/rspack-plugin";
import { UnoCSSRspackPlugin } from "@unocss/webpack/rspack";

const path = require("path");

export default defineConfig({
  plugins: [
    pluginLess({
      lessLoaderOptions: {
        implementation: require("less"),
      },
    }),
    pluginSass({
      sassLoaderOptions: {
        implementation: require.resolve("sass"),
      },
    }),
    pluginVue2(),
    pluginBabel({
      include: /\.(?:js|jsx|tsx)$/,
      exclude: /[\\/]node_modules[\\/]/,
    }),
    pluginVue2Jsx(),
    pluginNodePolyfill(),
    // pluginEslint({
    //   enable: true,
    //   eslintPluginOptions: {
    //     cwd: __dirname,
    //     configType: "flat",
    //     extensions: ["js", "jsx", "vue"],
    //   },
    // }),
    pluginImageCompress(),
  ],
  html: {
    template: "./public/index.html",
  },
  source: {
    // 指定入口文件
    entry: {
      index: "./src/main.js",
    },
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    include: [],
  },
  tools: {
    rspack(config, { addRules, appendPlugins }) {
      // 禁用特性 修复1.3版本rust侧运行慢的bug
      config.experiments.parallelCodeSplitting = false;
      // 修改配置
      // config.optimization.realContentHash = true;
      config.cache = false;
      addRules([
        {
          test: /\.md$/,
          loader: "url-loader",
        },
      ]);

      appendPlugins(UnoCSSRspackPlugin());

      if (process.env.RSDOCTOR === "true") {
        appendPlugins(
          new RsdoctorRspackPlugin({
            mode: "brief",
            reportCodeType: {
              noAssetsAndModuleSource: true,
            },
          })
        );
      }
    },
    bundlerChain(chain, { CHAIN_ID }) {
      // 修改原svg加载的方式，排除掉需要作为图标使用的svg目录
      chain.module
        .rule(CHAIN_ID.RULE.SVG)
        .exclude.add(path.join(__dirname, "./src/assets/svgs"));
      // 增加一条svg的loader，只处理指定目录
      chain.module
        .rule("svg-sprite-loader")
        .test(/\.svg$/)
        .use("svg-sprite-loader")
        .loader("svg-sprite-loader")
        .options({ symbolId: "icon-[name]" })
        .end()
        .include.add(path.join(__dirname, "./src/assets/svgs"))
        .end();
    },
  },
  dev: {
    lazyCompilation: true,
    progressBar: true,
  },
  server: {
    port: 8080,
  },
  output: {
    inlineStyles: process.env.NODE_ENV === "development",
    polyfill: "usage",
    sourceMap: {
      js: process.env.NODE_ENV === "development" ? "eval" : false,
    },
  },
  performance: {
    chunkSplit: {
      strategy: "split-by-experience",
      forceSplitting: {
        echarts: /node_modules[\\/]echarts/,
        elementUi: /node_modules[\\/]element-ui/,
        moment: /node_modules[\\/]moment/,
      },
    },
  },
});
