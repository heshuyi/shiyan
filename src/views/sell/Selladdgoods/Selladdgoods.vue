<template>
  <div class="add-goods">
    <ul>
      <li>
        <van-field v-model="text" placeholder="请输入" label="产品名字" />
      </li>
      <li>
        <van-field v-model="text" placeholder="请输入" label="产品描述" />
      </li>
      <li>
        <van-field v-model="text" placeholder="请输入" label="产品价格" />
      </li>
      <li><van-field v-model="text" placeholder="请输入" label="文本" /></li>
      <van-uploader
        :after-read="onRead"
        accept="image/*"
        style="width: 88px; height: 88px"
      >
      123
        </van-uploader
      >
    </ul>
  </div>
</template>
<script>
import {url as urlqing} from '../../../js/url'
export default {
  name: "addGoods",
  data(){
    return({
      text:''
    })
  }
  ,
  // config = { headers: { 'Content-Type': 'multipart/form-data' }}
  // axios.post('serverUrl', formDate, config).then(res => { console.log(res) }) .catch(err => { console.log(err) })
  methods:{
    async onRead(file){
      var fromdata = new FormData()

      console.log(file);
      fromdata.append('file', file.file)
      fromdata.append('tel','15302006236')
      console.log(file.file)
      console.log(fromdata);
      // this.$http.post('/allorder/upload', fromdata, {
      //   headers: {
      //     'content-type': 'multipart/form-data'
      //   }

      var datas = await this.$http
      .post(
        urlqing+"/s",
        fromdata,
        {headers:{'content-type': 'multipart/form-data'}}
      )
      console.log(datas,'datass');
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
}
</style>