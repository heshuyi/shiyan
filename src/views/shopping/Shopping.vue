<template>
  <div class="buy-box">
    <div ref="titlebox" class="title-box">
      <van-nav-bar title="购物车" />
    </div>
    <div ref="showbox" class="show-box">
      <ul>
        <li class="goods-list" v-for="i in buys" :key="i">
          <div class="goods-box">
            <img class="goods-img" :src="i.goodsImg" alt="" />
            <div class="goods-describe">
              <van-field
                class="goods-name"
                label="产品名"
                placeholder="请输入用户名"
              />
              <!-- <van-field
                    v-model="message"
                    rows="2"
                    autosize
                    label="留言"
                    type="textarea"
                    maxlength="50"
                    placeholder="请输入留言"
                    show-word-limit
                  /> -->
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
      buyList: [],
      buys: [
        {
          goodsName: "烧饼",
          goodsImg: "123", //照片
          goodsText: "描述",
          goodsMoney: 12, //初始价格
          endTime: "2000-01-01 10:10:10",
          nowMoney: 120, //当前价格,
          upMoney: undefined,
        },
        {
          goodsName: "烧饼",
          goodsImg: "http://localhost:3001/img/15302006231-1643989432.jpeg", //照片
          goodsText: "描述",
          goodsMoney: 12, //初始价格
          endTime: "2000-01-01 10:10:10",
          nowMoney: 120, //当前价格,
          upMoney: undefined,
        },
      ],
    };
  },
  created() {
    this.getMineBuyList();
  },
  mounted() {
    console.log(2);
    var clientHight =
      document.body.clientHight || document.documentElement.clientHeight;
    var showbox = this.$refs.showbox;
    var findbox = this.$refs.titlebox;
    findbox = findbox.offsetHeight;
    showbox.style.height = clientHight - findbox * 2 + "px";
  },
  methods: {
    async getMineBuyList() {
      let tel = this.$store.state.tel;
      let lists = await this.$http.post(urlqing + "/getAuctionList", {
        tel: tel,
      });
      lists;
    },
  },
};
</script>
<style lang="less" scoped>
.buy-box {
  width: 750rem;
  overflow-x: hidden;
  .title-box {
    width: 750rem;
    height: 46px;
    // background-color: brown;
    box-sizing: border-box;
    text-align: center;
    span {
      font-size: 30px;
    }
  }
  .show-box {
    width: 100%;
    // background-color: blue;
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
        .goods-describe {
          display: inline-block;
          vertical-align: top;
          .goods-name {
            width: 400rem;
          }
        }
      }
    }
  }
}
</style>