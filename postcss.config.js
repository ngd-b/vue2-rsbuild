module.exports = {
  plugins: {
    "postcss-px-to-viewport": {
      viewportWidth: 1920, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      propList: ["*"], // 匹配需要转换的属性
      // viewportHeight: 1080, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
      unitPrecision: 5, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: "vw", // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: [], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名。
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值。
      mediaQuery: true, // 允许在媒体查询中转换`px`
      replace: true,
    },
    // cssnano: cssnano主要用来压缩和清理CSS代码。在Webpack中，cssnano和css-loader捆绑在一起，所以不需要自己加载它。不过你也可以使用postcss-loader显式的使用cssnano
  },
};
