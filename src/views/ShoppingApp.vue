<template>
  <div class="app-box">
    <router-view />
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/purchase"> 购买 </van-tabbar-item>
      <van-tabbar-item icon="search" to="/sell"> 出售 </van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/shopping">拍卖</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: "ShoppingApp",
};
</script>
<style lang="less" scoped>
.app-box {
}
</style>