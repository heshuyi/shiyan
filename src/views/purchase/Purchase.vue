<template>
  <div class="purchase">
    <ShowBox v-if="showBoxBool" v-on:closeShow='closeShowBox' v-on:toShopCar="addtoshop" v-bind:showValue="showValueObj" />
    <SearchBox
      v-if="searchBool"
      v-on:getsgoods="getgoods"
      v-on:closeSearch="closeSearch"
    />
    <van-search
      class="find-box"
      shape="round"
      show-action
      label="商品"
      placeholder="请输入搜索关键词"
      @click-input="toSearch"
      v-model="searchValue"
    >
      <!-- v-model="searchValue" -->
      <template #action>
        <div>搜索</div>
      </template>
    </van-search>
    <div ref="showbox" class="show-box">
      <ul id="uls">
        <template v-if="goods.length == 0 ? true : false">
          <van-empty image="search" description="查询无结果" />
        </template>
        <template v-if="goods.length > 0 ? true : false">
          <li
            class="onclicktarget"
            v-for="(index, item) in goods"
            :hsy="item"
            :key="index.key"
          >
            <img :src="index.imgflie" alt="" />
            <div class="name">
              名字:<span :aiao="index.goodsname + 123">{{
                index.goodsname
              }}</span>
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
        </template>
      </ul>
    </div>
  </div>
</template>
<script>
import { url as urlqing } from "../../js/url";
import { Toast } from "vant";
import SearchBox from "./SearchBox.vue";
import ShowBox from "./ShowBox.vue";
export default {
  name: "Purchase",
  components: {
    SearchBox,
    ShowBox,
  },
  data() {
    return {
      searchValue: "",
      goods: [],
      searchBool: false,
      showBoxValue: 0,
      showBoxBool: false,
      showValueObj: 12,
    };
  },
  created() {
    this.getgoods();
  },
  mounted() {
    var clientHight =
      document.body.clientHight || document.documentElement.clientHeight;
    var showbox = this.$refs.showbox;
    showbox.style.height = clientHight - 106 + "px";
    let c = document.getElementById("uls");
    

    c.addEventListener("click", (e) => {
      let d = e.target;
      let num = 0;
      function findLi(d) {
        if (d.className != "onclicktarget") {
          findLi(d.parentElement);
        } else {
          num = d.getAttribute("hsy");
        }
      }
      if (d.className != "add-to-shop") {
        findLi(d);
        this.showBoxBool = true;
        this.showValueObj = this.goods[num];
      }
    });
  },
  methods: {
    toSearch() {
      this.searchBool = true;
    },
    closeSearch(data) {
      console.log(data);
      this.searchBool = false;
    },
    closeShowBox(){
      this.showBoxBool = false
    }
    ,
    async getgoods(goodsValue) {
      console.log("执行getgoods");
      var data = await this.$http.post(urlqing + "/getsellgoods", {
        tel: this.$store.state.tel,
        search: goodsValue,
      });
      let datas = data.data.data
      datas = datas.reverse()
      this.goods = datas;
      this.searchValue = goodsValue;
      this.$nextTick(() => {
      this.showBoxBool = true;
      console.log(this.goods[0]);
      this.showValueObj = this.goods[0];
    });
    },
    async addtoshop(goodsid) {
      console.log(goodsid);
      var datas = await this.$http.post(urlqing + "/addtoshopcar", {
        tel: this.$store.state.tel,
        goodsid: goodsid,
      });
      if (datas.data.code == 0) {
        Toast.fail(datas.data.msg);
        alert(datas.data.msg)
      } else {
        alert(datas.data.msg)
        // Toast.success(datas.data.msg);
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
    height: 56px;
    color: #1989fa !important;
    background-color: rgba(rgb(63, 45, 45), green, blue, 0.1) !important;
    .select-box {
      position: relative;
      left: 30px;
    }
  }

  .show-box {
    width: 750rem;
    margin-bottom: 50px;
    overflow-y: auto;
    overflow-x: hidden;
    // background-color: red;
    background-color: rgba(102, 102, 102, 0);
    ul {
      li {
        position: relative;
        height: 400rem;
        margin: 20rem;
        background-color: white;
        position: relative;
        border-radius: 5px;
        overflow: hidden;
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
          margin-top: 10rem;
          height: 80rem;
          // background-color: rgb(20, 134, 233);
          border: 1px solid #1989fa;
          color: #1989fa;
          text-align: center;
          line-height: 80rem;
          font-size: 50rem;
          border-radius: 5px;
        }
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
          0 6px 20px 0 rgba(0, 0, 0, 0.19);
      }
    }
  }
  .show-box::-webkit-scrollbar {
    display: none;
  }
}
</style>