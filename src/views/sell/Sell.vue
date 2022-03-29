<template>
  <div class="sell">
    <Addsell
      class="add-sell"
      v-if="addsellshow"
      v-on:closeshow="closeaddsell"
    />
    <van-nav-bar
      title="出售物品"
      right-text="添加商品"
      @click-right="addsell"
      class="title"
    />
    <div ref="showbox" class="show-box">
      <ul>
        <li class="goods-list" v-for="i in sellGoods" :key="i.goodsid">
          <div class="goods-box">
            <img class="goods-img" :src="i.imgflie" alt="" />
            <div class="goods-describe">
              <div class="goods-describe-box">
                <div class="goods-describe-box-name">产品名字:</div>
                <div class="goods-describe-box-value">
                  {{i.goodsname}}
                </div>
              </div>
              <div class="goods-describe-box">
                <div class="goods-describe-box-name">产品描述:</div>
                <div class="goods-describe-box-value">
                  {{i.text}}
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
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
    console.log(clientHight);
    showbox.style.height = clientHight - 106 + "px";
  },
  methods: {
    addsell() {
      console.log(12);
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
.sell {
  width: 750rem;
  overflow-x: hidden;
  .title {
    height: 56px;
  }
  .show-box::-webkit-scrollbar {
    width: 0;
  }
  .show-box {
    width: 100%;
    margin-bottom: 100rem;
    overflow-y: auto;
    overflow-x: hidden;
    .goods-list {
      width: 100%;
      height: 500rem;
      display: flex;
      justify-content: center;
      align-items: center;
      // background-color: rgb(35, 96, 150);
      .goods-box {
        width: 700rem;
        // margin: 0 auto;
        height: 450rem;
        background-color: aliceblue;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
          0 6px 20px 0 rgba(0, 0, 0, 0.19);
        .goods-img {
          width: 300rem;
          height: 300rem;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
            0 6px 20px 0 rgba(0, 0, 0, 0.19);
        }
        .goods-describe::-webkit-scrollbar {
            width: 0;
          }
        .goods-describe {
          display: inline-block;
          vertical-align: top;
          overflow-y: auto;
          
          .goods-describe-box {
            width: 400rem;
            height: 300rem;
            overflow-y: auto;
            font-size: 15px;
            background-color: aquamarine;
            .goods-describe-box-name {
              display: inline-block;
              width: 150rem;
              background-color: aqua;
              vertical-align: top;
            }
            .goods-describe-box-value {
              display: inline-block;
              width: 250rem;
              white-space: normal;
              word-break: break-all;
              background-color: antiquewhite;
            }
          }
        }
      }
    }
  }
}
</style>