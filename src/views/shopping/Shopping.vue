<template>
  <div class="buy-box">
      <van-nav-bar class="title-box" title="购物车" />
    <div ref="showbox" class="show-box">
      <ul>
        <li class="goods-list" v-for="i in buys" :key="i.goodsId">
          <div class="goods-box">
            <img class="goods-img" :src="i.imgflie" alt="" />
            <div class="goods-describe">
              <div class="goods-describe-list"><span class="goods-name">名字:</span><div>{{i.goodsname}}</div></div>
              <div class="goods-describe-list"><span class="goods-name">描述:</span><div>{{i.text}}</div></div>
              <div class="goods-describe-list"><span class="goods-name">作者:</span><div>{{i.tel}}</div></div>
            </div>
            <div class="moneys">
              <div class="moneysdiv iconfont icon-jiagezixun">1</div>
              <div class="moneysdiv iconfont icon-jiagezixun ">2</div>
              <div class="moneysdiv iconfont icon-chixushangzhang">3</div>
            </div>
            <van-count-down :time="time" format="DD 天 HH 时 mm 分 ss 秒" />
            <div class="jingpai">
              <input class="inputs-goods" placeholder="请输入要竞拍的价格" type="number"  >
              <van-button  class="chujia"  size="normal" @click="auctionGood(i)" >竞拍</van-button>
            </div>
            
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { url as urlqing } from "../../js/url";
export default {
  components: {},
  name: "Purchase",
  data() {
    return {
      buys: [],
    };
  },
  created() {
    this.getMineBuyList();
  },
  mounted() {
    var clientHight =
      document.body.clientHight || document.documentElement.clientHeight;
    var showbox = this.$refs.showbox;
    showbox.style.height = clientHight - 106 + "px";
  },
  methods: {
    async getMineBuyList() {
      let tel = this.$store.state.tel;
      let lists = await this.$http.post(urlqing + "/getAuctionList", {
        tel: tel,
      });
      if(lists.data.code == 1){
        this.buys = lists.data.data
        console.log(this.buys);
      }
    },
    async auctionGood(i){
      console.log(i);
    }
  },
};
</script>
<style lang="less" scoped>
.buy-box {
  width: 750rem;
  overflow-x: hidden;
  .title-box {
    height: 56px;
  }
  .show-box {
    width: 100%;
    margin-bottom: 100rem;
    overflow-y: auto;
    overflow-x: hidden;
    .goods-list {
      width: 100%;
      height: 600rem;
      display: flex;
      justify-content: center;
      align-items: center;
      // background-color: rgb(35, 96, 150);
      .goods-box {
        width: 700rem;
        height: 550rem;
        background-color: aliceblue;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
          0 6px 20px 0 rgba(0, 0, 0, 0.19);
        .goods-img {
          width: 300rem;
          height: 300rem;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
            0 6px 20px 0 rgba(0, 0, 0, 0.19);
        }
        .moneys{
          // height: 20rem;
          width: 100%;
          display: flex;
          height: 70rem;
          font-size: 50rem;
          // background-color: red;
          justify-content:space-between;
          .moneysdiv{
            display: inline-block;
            font-size: 46rem;
          }
        }
        .jingpai{
          height: 80rem;
          // background-color: aqua;
          .inputs-goods{
            width: 560rem;
            height: 80rem;
            display: inline-block;
            border: none;
            padding: 0;
            font-size: 40rem;
            margin-left: 5px;
            border-radius: 5px;
          }
          .chujia{
          background-color: azure;
          float: right;
          height: 70rem;
          margin: 5rem;
          border: 1px solid blue;
        }
        }
        
        .goods-describe {
          display: inline-block;
          vertical-align: top;
          width: 400rem;
          height: 300rem;
          overflow: hidden;
          font-size: 25rem;
          .goods-describe-list {
            max-height: 100rem;
            overflow: hidden;
            word-wrap: break-word;
            word-break: break-all;
            text-overflow:ellipsis;
          }
        }
      }
    }
  }
}
</style>