<template>
  <div class="showbox">
    {{ this.a }}
  </div>
</template>
<script>
export default {
  name: "ShowBox",
  data() {
    return {
      a: 1,
      b: 2,
    };
  },
  props:[],
  beforeCreate() {
    console.log("beforCreate");
  },
  created() {
    console.log("created");
  },
  mounted() {
    console.log("mounted");
  },
  methods: {

  },
};
</script>
<style lang="less" scoped>
.showbox{
  position: fixed;
  width: 750rem;
  min-height: 100vh;
  background-color: aqua;
  z-index: 9999;
}
</style>