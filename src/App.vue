<template>
  <div class="container flex gap-20px">
    <div class="flex-basis-300px shadow">
      <div class="" v-for="item in menuData" :key="item.name">
        <span>{{ item.meta.title }}</span>
      </div>
    </div>
    <div class="flex-1 overflow-hidden">
      <h2 class="color-white bg-blue font-size-24px text-ellipsis">
        hello vue2-rsbuild
      </h2>
      <Hello />

      <!-- route -->
      <router-view />
    </div>
  </div>
</template>
<script>
import Hello from "./views/hello.vue";
//
import { routes } from "@/router/index.js";

export default {
  components: {
    Hello,
  },
  data() {
    this.menuData = [...routes];
    return {};
  },
};
</script>
<style lang="less" scoped>
.container {
  text-align: center;

  // ::v-deep p > span {
  //   color: red;
  // }
}
</style>
