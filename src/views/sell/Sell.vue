<template>
  <div class="sell">
    <Addsell v-if="addsellshow" closeaddsell v-on:closeshow = 'closeaddsell'/>
    <div ref="titlebox" class="title-box">
      <span>我的售卖</span>
      <div @click="addsell">+</div>
    </div>
    <div ref="showbox" class="show-box">
      <ul>
        <li v-for="index in sellGoods" :key="index.goodsid" >
          <img :src=index.imgflie alt="">
          <div class="show-box-name"><span>名字:{{index.goodsname}}</span></div>
          <div class="show-box-text"><span class="texts">描述</span><textarea class="area" readonly :placeholder=index.text></textarea> </div>
          <div class="show-box-endtime"><span>结束时间:{{index.endtime}}</span></div>
          <span class="startmoney">初始价格:{{index.money}}</span>
          <span class="endmoney">现在价格:0</span>
          
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Addsell from './Selladdgoods/Selladdgoods.vue'
import {url as urlqing} from '../../js/url'
export default {
  components:{
    Addsell
  },
  name:'Purchase',
  data(){
    return{
      sellGoods:[],
      addsellshow:false,
      imgs:'../../img/heardimg/12.jpg'
    }
  }, 
  created(){
    this.getsellgoods()
  },
  mounted(){
    var clientHight = document.body.clientHight ||document.documentElement.clientHeight;
    var showbox = this.$refs.showbox;
    var findbox = this.$refs.titlebox;
    findbox = findbox.offsetHeight
    showbox.style.height = clientHight - findbox*2 + 'px';
  },
  methods:{
    addsell(){
      this.addsellshow = true
    },
    closeaddsell(value){
      this.addsellshow = value
    },
    async getsellgoods(){
      var tel = this.$store.state.tel
      var datas =await this.$http.post(urlqing+'/getgoods',{tel:tel})
      this.sellGoods = datas.data.data
      console.log(datas.data.data);
    }
  }
}
</script>
<style lang="less" scoped>
.sell{
  width: 750rem;
  overflow-x: hidden;
  .title-box{
    width: 750rem;
    height: 100rem;
    background-color: brown;
    box-sizing: border-box;
    text-align: center;
    span{
      font-size: 30px;
    }
    div{
      float: right;
      font-size: 84rem;
      background-color: aliceblue;
    }
  }
  .show-box{
    width: 100%;
    // height:100vh;
    background-color: blue;
    margin-bottom: 100rem;
    overflow-y: auto;
    overflow-x: hidden;
    ul{
      li{
        height: 200px;
        margin: 10px;
        background-color: aqua;
        position: relative;
        img{
          // position: absolute;
          width: 100px;
          height: 100px;
          margin: 10px;
        }
        .show-box-name{
          position: absolute;
          top: 10px;
          left: 120px;
          height: 30px;
          background-color: aliceblue;
          font-size: 20px;
        }
        .show-box-text{
          position: absolute;
          top: 40px;
          left: 120px;
          height: 70px;
          width: 750rem-200px-100px;
          background-color: aliceblue;
          font-size: 15px;
          
          .texts{
            display: inline-block;
            height: 70px;
            writing-mode:tb;
            font-size: 20px;
            // line-height: 70px;
          }
          .area{
            width: 375rem;
            height: 60px;
          }
          
        }
        .show-box-endtime{
          font-size: 20px;
        }
        .startmoney{
          float: left;
          font-size: 20px;
        }
        .endmoney{
          float: right;
          font-size: 20px;
        }
      }
    }
  }
}
</style>