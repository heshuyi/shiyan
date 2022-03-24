<template>
  <div class="buy-box">
    <div ref="titlebox" class="title-box">
      <span>我参加的拍卖123</span>
    </div>
    <div ref="showbox" class="show-box">
      <ul>
        <!-- <li v-for=""></li> -->
        123
      </ul>
    </div>
  </div>
</template>

<script>

import {url as urlqing} from '../../js/url'
export default {
  components:{
    
  },
  name:'Purchase',
  data(){
    return{
      buyList:[],
    }
  }, 
  created(){
    console.log(11);
    this.getMineBuyList()
  },
  mounted(){
    console.log(2);
    var clientHight = document.body.clientHight ||document.documentElement.clientHeight;
    var showbox = this.$refs.showbox;
    var findbox = this.$refs.titlebox;
    findbox = findbox.offsetHeight
    showbox.style.height = clientHight - findbox*2 + 'px';
  },
  methods:{
    async getMineBuyList(){
      let tel=this.$store.state.tel
      console.log(11111);
      let lists = await this.$http.post(urlqing+'/getAuctionList',{tel:tel})
      console.log(lists);
    }
  }
}
</script>
<style lang="less" scoped>
.buy-box{
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
  }
  .show-box{
    width: 100%;
    background-color: blue;
    margin-bottom: 100rem;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>