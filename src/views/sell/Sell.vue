<template>
  <div class="sell">
    <Addsell
      class="add-sell"
      v-if="addsellshow"
      v-on:closeshow="closeaddsell"
    />
    <!-- <div ref="titlebox" class="title-box">
      <span>我的售卖</span>
      <div @click="addsell">+</div>
    </div> -->
    <div ref="titlebox" class="title-box">
      <van-nav-bar title="标题"  
       right-text="按钮"
        @click-right="onClickRight"
       />
    </div>
    <div ref="showbox" class="show-box">
      <!-- <ul>
        <li v-for="index in sellGoods" :key="index.goodsid" >
          <img :src=index.imgflie alt="">
          <div class="show-box-name"><span>名字:{{index.goodsname}}</span></div>
          <div class="show-box-text"><span class="texts">描述</span><textarea class="area" readonly :placeholder=index.text></textarea> </div>
          <div class="show-box-endtime"><span>结束时间:{{index.endtime}}</span></div>
          <span class="startmoney">初始价格:{{index.money}}</span>
          <span class="endmoney">现在价格:0</span>
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script>
import Addsell from "./Selladdgoods/Selladdgoods.vue";
import { url as urlqing } from "../../js/url";
export default {
  components: {
    Addsell,
  },
  name: "Purchase",
  data() {
    return {
      sellGoods: [],
      addsellshow: false,
      imgs: "../../img/heardimg/12.jpg",
    };
  },
  created() {
    this.getsellgoods();
  },
  mounted() {
    var clientHight =
      document.body.clientHight || document.documentElement.clientHeight;
    var showbox = this.$refs.showbox;
    var findbox = this.$refs.titlebox;
    findbox = findbox.offsetHeight;
    console.log(clientHight, findbox);
    showbox.style.height = clientHight - findbox * 2 + "px";
  },
  methods: {
    addsell() {
      this.addsellshow = true;
    },
    async getsellgoods() {
      var tel = this.$store.state.tel;
      var datas = await this.$http.post(urlqing + "/getgoods", { tel: tel });
      this.sellGoods = datas.data.data;
      console.log(datas.data.data);
    },
    closeaddsell(value) {
      this.addsellshow = value;
      this.$nextTick(() => {
        this.getsellgoods();
      });
    },
  },
};
</script>
<style lang="less" scoped>
// .sell{
//   width: 750rem;
//   overflow-x: hidden;
//   .add-sell{
//     z-index: 100;
//   }
//   .title-box{
//     height: 46px;
//   }

//   .show-box{
//     width: 750rem;
//     margin-bottom: 50px;
//     overflow-y: hidden;
//     overflow-x: hidden;
//         background-color: red;
//     ul{
//       li{
//         height: 200px;
//         margin: 10px;
//         background-color: aqua;
//         position: relative;
//         img{
//           // position: absolute;
//           width: 100px;
//           height: 100px;
//           margin: 10px;
//         }
//         .show-box-name{
//           position: absolute;
//           top: 10px;
//           left: 120px;
//           height: 30px;
//           background-color: aliceblue;
//           font-size: 20px;
//         }
//         .show-box-text{
//           position: absolute;
//           top: 40px;
//           left: 120px;
//           height: 70px;
//           width: 750rem-200px-100px;
//           background-color: aliceblue;
//           font-size: 15px;

//           .texts{
//             display: inline-block;
//             height: 70px;
//             writing-mode:tb;
//             font-size: 20px;
//             // line-height: 70px;
//           }
//           .area{
//             width: 375rem;
//             height: 60px;
//           }

//         }
//         .show-box-endtime{
//           font-size: 20px;
//         }
//         .startmoney{
//           float: left;
//           font-size: 20px;
//         }
//         .endmoney{
//           float: right;
//           font-size: 20px;
//         }
//       }
//     }
//   }
// }
.sell {
  width: 750rem;
  overflow-x: hidden;
  .add-sell {
    z-index: 100;
  }
  .title-box {
    height: 46px;
  }
  .title-box {
    height: 56px;
  }
  .show-box {
    width: 750rem;
    margin-bottom: 50px;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: red;
    ul {
      li {
        position: relative;
        height: 400rem;
        margin: 20rem;
        background-color: aliceblue;
        position: relative;
        img {
          width: 200rem;
          height: 200rem;
        }
        .name {
          position: absolute;
          width: 510rem;
          height: 60rem;
          // background-color: aliceblue;
          top: 0;
          left: 200rem;
          font-size: 40rem;
          text-align: left;
          line-height: 60rem;
          overflow: hidden;
        }
        .text {
          position: absolute;
          width: 510rem;
          height: 130rem;
          // background-color: aliceblue;
          top: 70rem;
          left: 200rem;
          font-size: 40rem;
          text-align: left;
          overflow-x: hidden;
          word-wrap: break-word;
          word-break: break-all;
        }
        .text::-webkit-scrollbar {
          width: 0;
        }
        .endtime {
          // background-color: aliceblue;
          height: 50rem;
          font-size: 40rem;
        }
        .money {
          height: 50rem;
          // background-color: aliceblue;
          font-size: 40rem;
          .startmoney {
            float: left;
          }
          .endmoney {
            float: right;
          }
        }
        .add-to-shop {
          height: 80rem;
          background-color: aliceblue;
          text-align: center;
          line-height: 80rem;
          font-size: 50rem;
        }
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
          0 6px 20px 0 rgba(0, 0, 0, 0.19);
      }
    }
  }
}
</style>