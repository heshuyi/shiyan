<template>
  <div class="buy-box">
    <div @click="asd">12312312312</div>
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
        <li class="goods-list" v-for="(i, item) in buys" :key="i.goodsId">
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
              <div class="moneysdiv iconfont icon-jiagezixun">
                {{ i.money }}
              </div>
              <div class="moneysdiv iconfont icon-jiagezixun">
                {{ myGoodsListMoney[item].newMoney }}
              </div>
              <div class="moneysdiv iconfont icon-chixushangzhang">{{maxList[item]}}</div>
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
let socket = null;
let moneylist = 123;
export default {
  components: {},
  name: "Purchase",
  data() {
    return {
      buys: [],
      show: false,
      money: null,
      upGoodIs: null,
      myGoodsMoney: [],
      myGoodsListMoney: [],
      maxList: [1,2],
    };
  },
  created() {
    this.getMineBuyList();
    socket = new WebSocket("ws://localhost:9999");
    //当连接成功之后就会执行回调函数
    socket.onopen = function () {
      console.log("客户端连接成功");
      //再向服务器发送一个消息
      socket.send("didi"); //客户端发的消息内容 为hello
    };
    //绑定事件是用加属性的方式
  },
  beforeMount() {
    // this.getMineBuyList();
  },
  mounted() {
    var clientHight =
      document.body.clientHight || document.documentElement.clientHeight;
    var showbox = this.$refs.showbox;
    showbox.style.height = clientHight - 106 + "px";
    console.log(this.buys);
    let c = (val)=>{
      this.maxList = [...val]
      console.log('ccccccc');
    }
    console.log(moneylist);
    socket.onmessage = function (event) {
      
      let d;
      let list = [];
      console.log("收到服务器端的响应", event);
      d = JSON.parse(event.data);
      console.log(moneylist,d);
      for (let i in moneylist) {
        for (let j in d.data) {
          console.log(moneylist[i].goodsid ,d.data[j].newGoodid);
          if (moneylist[i].goodsid == d.data[j].newGoodid) {
            list.push(d.data[j].maxmoney);
            break
          }
        }
      }
      c(list)
    };
  },
  destroyed() {
    console.log(1111);
    socket.onclose = function (evt) {
      console.log("Connection closed." + evt);
    };
    socket.close();
    console.log(1);
  },
  methods: {
    asd(){
      console.log(moneylist);
    },
    async getMineBuyList() {
      let tel = this.$store.state.tel;
      let lists = await this.$http.post(urlqing + "/getAuctionList", {
        tel: tel,
      });
      let newList = lists.data.data;
      if (lists.data.code == 1) {
        for (let i in newList) {
          newList[i].endtime =
            moment(newList[i].endtime).add(2, "days") - moment();
        }
        this.buys = newList;
        moneylist = newList
        this.myGoodsListMoney = Array(newList.length).fill({ newMoney: 0 });
        console.log(this.buys);
        let {
          data: { data },
        } = await this.getMyGoodsMoney();
        this.myGoodsListMoney = data;
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
        this.getMineBuyList();
        this.show = false;
        this.money = null;
        this.upGoodIsnull;
      } else {
        alert(data.data.msg);
      }
    },
    async getMyGoodsMoney() {
      console.log(this.buys);
      let tel = this.$store.state.tel;
      let d = await this.$http.post(urlqing + "/getMyGoodsMoney", { tel: tel });
      return d;
    },
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