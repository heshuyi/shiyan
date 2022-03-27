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
          :key="i.name + items"
        >
          <van-tag
            v-if="i.bool"
            size="large"
            round
            type="primary"
            @close="close(i.name)"
          >
            {{ i.name }}
          </van-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../fonts/iconfont.css";
export default {
  name: "SearchBox",
  data() {
    return {
      inputValue: "",
      a: [
        {
          name:12,
          bool:true
        }
      ],
    };
  },
  methods: {
    onCancel() {
      this.$emit('closeSearch','123')
    },
    onSearch() {
      console.log(2);
    },
    close(a) {
      console.log(a);
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



