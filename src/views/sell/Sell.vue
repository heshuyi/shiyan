<template>
  <div class="sell">
    <Addsell/>
    <div ref="titlebox" class="title-box">
      <span>我的售卖</span>
      <div @click="addsell">+</div>
    </div>
    <div ref="showbox" class="show-box">
      <ul>
        <li v-for="index in sellGoods" :key="index.key"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Addsell from './Selladdgoods/Selladdgoods.vue'
export default {
  components:{
    Addsell
  },
  name:'Purchase',
  data(){
    return{
      sellGoods:[]
    }
  }, 
  created(){
    
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
      console.log(1);
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
  }
}
</style>