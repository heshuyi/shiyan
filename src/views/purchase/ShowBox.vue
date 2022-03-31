<template>
  <div class="showbox">
    <div class="close-box iconfont icon-fanhui" @click="closeShowBox"></div>
    <img class="goods-img" :src="showValue.imgflie" alt="" />
    <div class="van-hairline--bottom">
      <div class="money-box">
        <span class="money-old"> ￥{{ this.showValue.money }} </span>
        <span  class="money-new iconfont icon-chixushangzhang"> ￥123 </span>
      </div>
    </div>
    <div class="name">
      {{this.showValue.goodsname}}
    </div>
    <div class="van-hairline--bottom">
      <van-count-down
        class="down-time"
        :time="time"
        format="DD 天 HH 时 mm 分 ss 秒"
      />
    </div>

    <div class="van-hairline--bottom">
      <div class="text">&nbsp;&nbsp;&nbsp;&nbsp;{{ this.showValue.text }}</div>
    </div>
    <van-goods-action>
      <van-goods-action-icon @click="toShopCar" icon="shop-o" text="购物车" />
      <van-goods-action-button
        color="#be99ff"
        type="warning"
        text="加入购物车"
        @click="addToShopShowBox"
      />
    </van-goods-action>
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "ShowBox",
  data() {
    return {
      a: 1,
      b: 2,
      time: 30 * 60 * 60 * 1000,
    };
  },
  props: ["showValue"],

  beforeCreate() {
    console.log("beforCreate");
  },
  created() {
    console.log("created", this.showValue);
  },
  mounted() {
    console.log("mounted");
    let d = new Date();
    let dd = new Date(this.showValue.endtime);
    console.log(d);
    console.log(dd);
    moment(dd).add(2, "days") - moment(d);
    this.time =
      moment(dd).add(2, "days") - moment(d) > 0
        ? moment(dd).add(2, "days") - moment(d)
        : 0;
  },
  methods: {
    addToShopShowBox(){
      console.log('toShopCar');
      this.$emit('toShopCar',this.showValue.goodsid)
    },
    closeShowBox(){
      this.$emit('closeShow')
    },
    toShopCar(){
      console.log(11111);
      this.closeShowBox()
      this.$router.push('/shopping')
    }
  },
};
</script>
<style lang="less" scoped>
.showbox {
  position: fixed;
  width: 750rem;
  min-height: 100vh;
  background-color: white;
  z-index: 9999;
  .close-box{
    position: fixed;
    top: 0;
    margin: 8px;
    font-size: 20px;
        background-color: rgba(255, 255, 255, 0.075);
  }
  .goods-img {
    width: 100%;
    height: 40vh;

  }
  .money-box {
    font-size: 30px;
    .money-old {
      margin-left: 5px;
    }
    .icon-chixushangzhang {
      font-size: 30px;
      color: red;
      float: right;
      margin-right: 5px;
    }
  }
  .name{
    margin: 10px;
    font-size: 30px;
    color: rgb(55, 80, 97);
  }
  .down-time {
    font-size: 30px;
    margin: 20px 0;
    text-align: center;
  }
  .text {
    margin: 10px;
    font-size: 25px;
    word-wrap: break-word;
    word-break: break-all;
  }
}
</style>