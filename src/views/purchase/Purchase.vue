<template>
  <div class="purchase">
    <div ref="findbox" class="find-box">
      <input v-model="searchValue" type="text" />
      <span @click="getgoods">搜索</span>
    </div>
    <div ref="showbox" class="show-box">
      <ul>
        <li v-for="index in goods" :key="index.key">
          <img :src="index.imgflie" alt="" />
          <div class="name">
            名字:<span>{{ index.goodsname }}</span>
          </div>
          <div class="text">描述:{{ index.text }}</div>
          <div class="endtime">时间:{{ index.endtime }}</div>
          <div class="money">
            <div class="startmoney">发布:{{ index.money }}￥</div>
            <div class="endmoney">现在:{{ index.money }}￥</div>
          </div>
          <DIV @click="addtoshop(index.goodsid)" class="add-to-shop">
            添加购物单
          </DIV>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { url as urlqing } from "../../js/url";
import { Toast } from "vant";
export default {
  name: "Purchase",
  data() {
    return {
      searchValue: "",
      goods: [],
    };
  },
  created() {
    this.getgoods();
  },
  mounted() {
    var clientHight =
      document.body.clientHight || document.documentElement.clientHeight;
    var showbox = this.$refs.showbox;
    var findbox = this.$refs.findbox;
    findbox = findbox.offsetHeight;
    showbox.style.height = clientHight - findbox * 2 + "px";
  },
  methods: {
    async getgoods() {
      var data = await this.$http.post(urlqing + "/getsellgoods", {
        tel: this.$store.state.tel,
        search: this.searchValue,
      });
      this.goods = data.data.data;
    },
    async addtoshop(goodsid) {
      var datas = await this.$http.post(urlqing + "/addtoshopcar", {
        tel: this.$store.state.tel,
        goodsid: goodsid,
      });
      if (datas.data.code == 0) {
        Toast.fail(datas.data.msg);
      } else {
        Toast.success(datas.data.msg);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.purchase {
  width: 750rem;
  overflow-x: hidden;
  .find-box {
    width: 500rem;
    height: 100rem;
    background-color: brown;
    margin: 0 auto;
    box-sizing: border-box;
    // line-height: 100rem;
    input {
      width: 350rem;
      margin: 25rem 20rem;
    }
    span {
      font-size: 30rem;
      background-color: burlywood;
      border-radius: 30%;
    }
  }
  .show-box {
    width: 750rem;
    background-color: blue;
    margin-bottom: 100rem;
    overflow-y: auto;
    overflow-x: hidden;
    ul {
      li {
        position: relative;
        height: 400rem;
        margin: 20rem;
        background-color: aqua;
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
      }
    }
  }
}
</style>