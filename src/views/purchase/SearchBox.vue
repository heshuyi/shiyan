<template>
  <div class="search-box">
    <van-search
      v-model="inputValue"
      show-action
      label="商品"
      placeholder="请输入搜索关键词"
    >
      <template #left>
        <div @click="onCancel" class="iconfont icon-fanhui close"></div>
      </template>
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <div class="history-search">
      <div class="history-search-title">
        <span class="history-text">历史搜索</span>
        <div class="iconfont icon-shanchu laji"></div>
      </div>
      <div class="history-search-boxs">
        <div
          class="history-search-boxs-tag"
          v-for="(i, items) in a"
          :key="i.historyName + items"
        >
          <van-tag
            v-if="i.historyBool"
            size="large"
            round
            type="primary"
            @close="close(i.historyName)"
          >
            {{ i.historyName }}
          </van-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../fonts/iconfont.css";
import {url} from '../../js/url'
export default {
  name: "SearchBox",
  data() {
    return {
      inputValue: "",
      a: null,
    };
  },
  created(){
    this.getSearchList()
  },
  methods: {
    async getSearchList(){
      let tel = this.$store.state.tel
      var datas = await this.$http.post(url + "/historySearch", { tel: tel });
      let data = datas.data
      if(data.code==1){
        this.a = data.data
      }else{
        alert(data.msg)
      }
    },
    onCancel() {
      this.$emit('closeSearch','123')
    },
    async onSearch() {
      let tel = this.$store.state.tel
      if(this.a.length==10 && this.inputValue!=''){
        this.$http.post(url+'/addHistotyValue',{})
      }else{
        console.log(2);
      }
      this.$emit('getsgoods',this.inputValue)
      this.$emit('closeSearch','123')
    },
  },
};
</script>

<style lang="less" scoped>
.search-box {
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: white;
  z-index: 1000;
  .close{
    margin-right: 10px;
  }
  .history-search{
    .history-text{
      margin: 10px;
      font-size: 15px;
    }
    .laji{
      float: right;
      font-size: 30px;
      margin-right: 5px;
    }
    .history-search-boxs {
    display: flex;
    flex-wrap: wrap;
    
    .history-search-boxs-tag {
      margin: 20px 0 0 20px;
    }
  }
  }
  
}
</style>



