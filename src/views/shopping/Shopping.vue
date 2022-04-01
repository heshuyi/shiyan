<template>
  <div class="buy-box">
    <div v-if="show" class="pop">
      <div @click="closeAddMoney" class="close-add-money"></div>
      <div class="pop-mid">
        <input
          class="input-num"
          v-model="money"
          type="num"
          placeholder="输入你要给出的价格"
        />
        <van-button @click="submitPrice" size="large" class="buttens"
          >确定价格</van-button
        >
      </div>
    </div>
    <van-nav-bar class="title-box" title="购物车" />
    <div ref="showbox" class="show-box">
      <ul>
        <li class="goods-list" v-for="i in buys" :key="i.goodsId">
          <div class="goods-box">
            <img class="goods-img" :src="i.imgflie" alt="" />
            <div class="goods-describe">
              <div class="goods-describe-list">
                <span class="goods-name">名字:</span>
                <div>{{ i.goodsname }}</div>
              </div>
              <div class="goods-describe-list">
                <span class="goods-name">描述:</span>
                <div>{{ i.text }}</div>
              </div>
              <div class="goods-describe-list">
                <span class="goods-name">作者:</span>
                <div>{{ i.tel }}</div>
              </div>
            </div>
            <div class="moneys">
              <div class="moneysdiv iconfont icon-jiagezixun">{{i.money}}</div>
              <div class="moneysdiv iconfont icon-jiagezixun">2</div>
              <div class="moneysdiv iconfont icon-chixushangzhang">3</div>
            </div>
            <van-count-down
              :time="i.endtime"
              format="DD 天 HH 时 mm 分 ss 秒"
            />
            <div class="jingpai">
              <!-- <input class="inputs-goods" placeholder="请输入要竞拍的价格" type="number"  > -->
              <van-button class="chujia" size="large" @click="auctionGood(i)"
                >竞拍</van-button
              >
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { url as urlqing } from "../../js/url";
import moment from "moment";
export default {
  components: {},
  name: "Purchase",
  data() {
    return {
      buys: [],
      show: false,
      money: null,
      upGoodIs: null,
      myGoodsMoney:[]
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
      let newList = lists.data.data;
      // let newTime = null
      if (lists.data.code == 1) {
        for (let i in newList) {
          newList[i].endtime =
            moment(newList[i].endtime).add(2, "days") - moment();
        }
        this.buys = newList;
        console.log(this.buys);
      }
    },
    async auctionGood(i) {
      this.upGoodIs = i.goodsid;
      this.show = true;
    },
    closeAddMoney() {
      this.show = false;
    },
    async submitPrice() {
      let tel = this.$store.state.tel;
      let data = await this.$http.post(urlqing + "/submitPrice", {
        tel: tel,
        money: this.money,
        goodsid: this.upGoodIs,
      });
      if (data.data.code == 1) {
        alert("成功");
        this.show = false
        this.money = null
        this.upGoodIsnull;
      } else {
        alert("失败,请再次提交");
      }
    },
    async getMyGoodsMoney(){
      console.log(this.buys);
      let tel = this.$store.state.tel
      let d = await this.$http.post(urlqing+'/getMyGoodsMoney',{tel:tel})
      console.log(d);
}
  },
};
</script>
<style lang="less" scoped>
.buy-box {
  width: 750rem;
  overflow-x: hidden;
  .pop {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(51, 45, 45, 0.644);
    // background-color: aliceblue;
    z-index: 9999;
    .close-add-money {
      margin: 10px;
      width: 50rem;
      height: 50rem;
      background-image: url("../../img/icon/back2.png");
      background-repeat: no-repeat;
      background-size: auto 100%;
    }
    .pop-mid {
      width: 500rem;
      height: 300rem;
      // background-color: rgb(70, 59, 59);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      .input-num {
        width: 100%;
        height: 100rem;
        margin: 0;
        padding: 0;
        border: 0;
        // margin-bottom: 50rem;
      }
      .buttens {
        // position: absolute;
        // bottom: 0;
        // margin-top: 50rem;
        height: 100rem;
      }
    }
  }
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
      height: 550rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .goods-box {
        width: 700rem;
        height: 500rem;
        background-color: aliceblue;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
          0 6px 20px 0 rgba(0, 0, 0, 0.19);
        .goods-img {
          width: 300rem;
          height: 300rem;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
            0 6px 20px 0 rgba(0, 0, 0, 0.19);
        }
        .moneys {
          // height: 20rem;
          width: 100%;
          display: flex;
          height: 70rem;
          font-size: 50rem;
          // background-color: red;
          justify-content: space-between;
          .moneysdiv {
            display: inline-block;
            font-size: 46rem;
          }
        }
        .jingpai {
          height: 80rem;
          // background-color: aqua;
          .inputs-goods {
            width: 560rem;
            height: 80rem;
            display: inline-block;
            border: none;
            padding: 0;
            font-size: 40rem;
            margin-left: 5px;
            border-radius: 5px;
          }
          .chujia {
            background-color: azure;
            // float: right;
            height: 70rem;
            // margin: 50rem;
            width: 690rem;
            margin: 0 5rem;
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
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>