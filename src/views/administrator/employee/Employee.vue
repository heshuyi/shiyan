<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
     <el-menu-item index="1">商品中心</el-menu-item>
      <el-menu-item index="2">订单中心</el-menu-item>
    </el-menu>
    <el-dialog title="添加商品" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form" label-width="80px">
        <el-form-item label="商品名">
          <el-input v-model="form.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="form.goods_type"></el-input>
        </el-form-item>
        <el-form-item label="品牌">
          <el-input v-model="form.goods_brand"></el-input>
        </el-form-item>
        <el-form-item label="版本">
          <el-input v-model="form.goods_edition"></el-input>
        </el-form-item>
        <el-form-item label="颜色">
          <el-input v-model="form.goods_color"></el-input>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="form.goods_number"></el-input>
        </el-form-item>
        <el-form-item label="单价">
          <el-input v-model="form.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="信息">
          <el-input v-model="form.goods_information"></el-input>
        </el-form-item>
        <input @change="fileChangeqw" type="file" />
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addgoods">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改商品" :visible.sync="dialogVisible1" width="30%">
      <el-form :model="form" label-width="80px">
        <el-form-item label="类型">
          <el-input v-model="changeData.goods_type"></el-input>
        </el-form-item>
        <el-form-item label="品牌">
          <el-input v-model="changeData.goods_brand"></el-input>
        </el-form-item>
        <el-form-item label="版本">
          <el-input v-model="changeData.goods_edition"></el-input>
        </el-form-item>
        <el-form-item label="颜色">
          <el-input v-model="changeData.goods_color"></el-input>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="changeData.goods_number"></el-input>
        </el-form-item>
        <el-form-item label="单价">
          <el-input v-model="changeData.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="信息">
          <el-input v-model="changeData.goods_information"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </span>
    </el-dialog>
    <div v-if="activeIndex==1">
      <div>
        <el-button @click="dialogVisible = true" type="primary"
          >添加商品</el-button
        >
      </div>
      <el-table :data="goodsList" style="width: 100%" height="600">
        <el-table-column
          fixed
          prop="goods_brand"
          label="goods_brand"
          width="150"
        ></el-table-column>
        <el-table-column prop="goods_color" label="goods_color" width="120">
        </el-table-column>
        <el-table-column
          prop="goods_edition"
          label="goods_edition"
          width="120"
        ></el-table-column>
        <el-table-column prop="goods_id" label="goods_id" width="120">
        </el-table-column>
        <el-table-column
          prop="goods_information"
          label="goods_information"
          width="200"
        ></el-table-column>
        <el-table-column prop="goods_number" label="goods_number" width="150">
        </el-table-column>
        <el-table-column prop="goods_price" label="goods_price" width="120">
        </el-table-column>
        <el-table-column prop="goods_type" label="goods_type" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, goodsList)"
              type="text"
              size="small"
            >
              移除
            </el-button>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="change(scope.$index, goodsList)"
              type="text"
              size="small"
            >
              xiugai
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="activeIndex==2">
      <el-table
    :data="oerderList"
    style="width: 100%"
    height="600">
    <el-table-column
      fixed
      prop="cus_id"
      label="cus_id"
      width="150">
    </el-table-column>
    <el-table-column
      prop="goods_id"
      label="goods_id"
      width="120">
    </el-table-column>
    <el-table-column
      prop="order_address"
      label="order_address"
      width="120">
    </el-table-column>
    <el-table-column
      prop="order_check"
      label="order_check"
      width="120">
    </el-table-column>
    <el-table-column
      prop="order_id"
      label="order_id"
      width="300">
    </el-table-column>
    <el-table-column
      prop="order_number"
      label="order_number"
      width="120">
    </el-table-column>
    <el-table-column
      prop="order_state"
      label="order_state"
      width="120">
    </el-table-column>
    <el-table-column
      prop="order_time"
      label="order_time"
      width="200">
    </el-table-column>
    <el-table-column
      prop="order_total"
      label="order_total"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          :disabled = 'scope.row.order_state == 0 ? false : true'
          @click.native.prevent="sendgoods(scope.$index, oerderList)"
          type="text"
          size="small">
        发货
        </el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>
  </div>
</template>
<script>
import { url } from "../../../js/url";
export default {
  name: "employee", //员工
  data() {
    return {
      oerderList:[],
      activeIndex:'1',
      fileList: [],
      form: {
        goods_name: "",
        goods_type: "",
        goods_brand: "",
        goods_edition: "",
        goods_color: "",
        goods_number: "",
        goods_price: "",
        goods_information: "",
        goodsImg: "",
      },
      dialogVisible1: false,
      dialogVisible: false,
      title: "添加商品",
      goodsList: [],
      changeData: {
        goods_brand: "",
        goods_color: "",
        goods_edition: "",
        goods_id: "",
        goods_information: "",
        goods_number: "",
        goods_price: "",
        goods_type: "",
      },
    };
  },
  created() {
    this.getgoods();
    this.getallorder();
  },
  methods: {
    async sendgoods(i,list){
      let id = list[i].order_id
      let d = await this.$http.post(url+'/deliver',{order_id:id})
      if(d.data.code==1){
        this.$message.success('success')
        this.getallorder()
      }
      console.log(d);
    },
    async getallorder(){
      let d = await this.$http.post(url+'/allorder')
      this.oerderList = d.data.data
      console.log(d);
    },
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.activeIndex = key
      },
    async addgoods() {
      let formData = new FormData();
      console.log(this.form.goodsImg);
      formData.append("file", this.form.goodsImg);
      formData.append("goods_name", this.form.goods_name);
      formData.append("goods_type", this.form.goods_type);
      formData.append("goods_brand", this.form.goods_brand);
      formData.append("goods_edition", this.form.goods_edition);
      formData.append("goods_color", this.form.goods_color);
      formData.append("goods_number", this.form.goods_number);
      formData.append("goods_price", this.form.goods_price);
      formData.append("goods_information", this.form.goods_information);
      formData.append("goods_address", this.form.goods_address);
      let ddd = await this.$http.post(url + "/addgoods", formData, {
        headers: { "content-type": "multipart/form-data" },
      });
      console.log(ddd);
    },
    fileChangeqw(e) {
      console.log(e.target.files[0]);
      this.form.goodsImg = e.target.files[0];
    },
    async getgoods() {
      let d = await this.$http.post(url + "/detail");
      this.goodsList = d.data.data;
    },
    async deleteRow(index, list) {
      console.log(index, list);
      let d = await this.$http.post(url + "/delgoods", {
        goods_id: list[index].goods_id,
      });
      if (d.data.code == 1) {
        this.getgoods();
        this.$message.success(d.data.msg);
      } else {
        this.$message.error(d.data.msg);
      }
    },
    async change(index, list) {
      console.log(index, list);
      this.dialogVisible1 = true;
      this.changeData = list[index];
    },
    async update() {
      console.log(this.changeData);
      let staff_id = this.$store.state.user_telephone;
      let d = await this.$http.post(url + "/altergoods", {
        staff_id: staff_id,
        goods_id: this.changeData.goods_id,
        goods_type: this.changeData.goods_type,
        goods_brand: this.changeData.goods_brand,
        goods_edition: this.changeData.goods_edition,
        goods_color: this.changeData.goods_color,
        goods_number: this.changeData.goods_number,
        goods_price: this.changeData.goods_price,
        goods_information: this.changeData.goods_information,
      });
      console.log(d);
    },
    handleClose() {},
  },
};
</script>