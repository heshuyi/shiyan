<template>
  <div class="add-goods">
    <div class="close-box"><div @click="closex" class="close-x">X</div></div>
    <ul>
      <li>
        <van-field v-model="goodsname" placeholder="请输入" label="产品名字" />
      </li>
      <li>
        <van-field v-model="goodstext" placeholder="请输入" label="产品描述" />
      </li>
      <li>
        <van-field v-model="goodsmoney" placeholder="请输入" label="产品价格" />
      </li>
      <van-uploader
        :after-read="onRead"
        accept="image/*"
        style="width: 88px; height: 88px;display: inline-block;"
      >
      <span >点击添加照片</span>
        </van-uploader
      >
      <van-button @click="submit" :loading = loading1 type="info" loading-text="提交中" >提交</van-button>
    </ul>
  </div>
</template>
<script>
import {url as urlqing} from '../../../js/url'
export default {
  name: "addGoods",
  data(){
    return({
      text:'',
      imgName:'',
      file:null,
      goodsname:'',
      goodstext:'',
      goodsmoney:'',
      loading1:false
    })
  },
  created(){
  }
  ,
    methods:{
    async onRead(file){
      this.file = file
    },
    async submit(){
      var fromdata = new FormData()
      fromdata.append('file', this.file.file)
      fromdata.append('tel',this.$store.state.tel)
      fromdata.append('goodsname',this.goodsname)
      fromdata.append('goodstext',this.goodstext)
      fromdata.append('goodsmoney',this.goodsmoney)
      var datas = await this.$http
      .post(
        urlqing+"/CreateSellOrder",
        fromdata,
        {headers:{'content-type': 'multipart/form-data'}}
      )
      if(datas.code==1){
        alert(datas.data.msg)//创建成功
      }else{
        alert(datas.data.msg)//创建失败
      }
    },
    closex(){
      console.log(12);
      this.$emit('closeshow',false)
    }
  }
};
</script>
<style lang="less" scoped>
.add-goods {
  width: 700rem;
  height: 300px;
  background-color: cadetblue;
  position: fixed;
  top: 30%;
  left: 25rem;
  .close-box{
    width: 100%;
    height: 20px;
    .close-x{
      float: right;
      width: 20px;
      height: 20px;
      background-color: antiquewhite;
    }
  }
}
</style>