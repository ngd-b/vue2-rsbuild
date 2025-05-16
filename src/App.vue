<template>
  <div class="container">
    <h2 class="color-red font-size-24px text-ellipsis">hello vue2-rsbuild</h2>
    <Hello />
  </div>
</template>
<script>
import Hello from "./views/hello.vue";
export default {
  components: {
    Hello,
  },
  data() {
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

  /deep/ p > span {
    color: red;
  }
}
</style>
