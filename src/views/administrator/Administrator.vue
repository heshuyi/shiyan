<template>
  <div class="administrator">
    <el-dialog
      title=" 添加信息"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
    >
      <el-input
        class="pop-input"
        v-model="addEmployee.staff_name"
        placeholder="请输入姓名"
      ></el-input>
      <el-input
        class="pop-input"
        v-model="addEmployee.staff_sex"
        placeholder="请输入性别"
      ></el-input>
      <el-input
        class="pop-input"
        v-model="addEmployee.staff_age"
        placeholder="请输入年龄"
      ></el-input>
      <el-input
        class="pop-input"
        v-model="addEmployee.staff_IDnumber"
        placeholder="请输入身份证号"
      ></el-input>
      <el-input
        class="pop-input"
        v-model="addEmployee.staff_telephone"
        placeholder="请输入电话号"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sendAddEmployee">确认</el-button>
        <el-button type="primary" @click="centerDialogVisible = false"
          >取消</el-button
        >
      </span>
    </el-dialog>
    <el-button class="add-employee" type="primary" @click="addEmployeeShow"
      >添加员工</el-button
    >
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">查看员工</el-menu-item>
      <el-menu-item index="2">顾客管理</el-menu-item>
      <el-menu-item index="3">历史记录</el-menu-item>
    </el-menu>
    <div>
      <el-table
        v-if="activeIndex == 1"
        :data="tableData"
        style="width: 100%"
        max-height="1500"
        key="1"
      >
        <el-table-column
          fixed
          prop="staff_IDnumber"
          label="身份证号"
          width="300"
        >
        </el-table-column>
        <el-table-column prop="staff_age" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="staff_id" label="ID" width="120">
        </el-table-column>
        <el-table-column prop="staff_name" label="名字" width="120">
        </el-table-column>
        <el-table-column prop="staff_sex" label="性别" width="200">
        </el-table-column>
        <el-table-column prop="staff_telephone" label="电话" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small"
            >
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        v-if="activeIndex == 2"
        :data="customertable"
        style="width: 100%"
        max-height="1500"
        key="2"
      >
        <el-table-column fixed prop="cus_id" label="日期" width="150">
        </el-table-column>
        <el-table-column prop="cus_nickname" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="cus_name" label="省份" width="120">
        </el-table-column>
        <el-table-column prop="cus_sex" label="市区" width="120">
        </el-table-column>
        <el-table-column prop="cus_age" label="地址" width="300">
        </el-table-column>
        <el-table-column prop="cus_IDnumber" label="id" width="120">
        </el-table-column>
        <el-table-column prop="cus_telephone" label="邮编" width="120">
        </el-table-column>
        <el-table-column prop="cus_purse" label="邮编" width="120">
        </el-table-column>
        <el-table-column prop="cus_member" label="邮编" width="120">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRowCustomer(scope.$index,customertable )"
              type="text"
              size="small"
            >
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
       <el-table
       v-if="activeIndex==3"
    :data="historytable"
    style="width: 100%"
    max-height="250">
    <el-table-column
      fixed
      prop="goods_brand"
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="goods_color"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="goods_edition"
      label="省份"
      width="120">
    </el-table-column>
    <el-table-column
      prop="goods_id"
      label="市区"
      width="120">
    </el-table-column>
    <el-table-column
      prop="goods_information"
      label="地址"
      width="300">
    </el-table-column>
    <el-table-column
      prop="goods_number"
      label="邮编"
      width="120">
    </el-table-column>
    <el-table-column
      prop="goods_price"
      label="邮编"
      width="120">
    </el-table-column>
    <el-table-column
      prop="goods_type"
      label="邮编"
      width="120">
    </el-table-column>
    <el-table-column
      prop="goods_number"
      label="邮编"
      width="120">
    </el-table-column>
    <el-table-column
      prop="history_id"
      label="邮编"
      width="120">
    </el-table-column>
    <el-table-column
      prop="history_time"
      label="邮编"
      width="120">
    </el-table-column>
     <el-table-column
      prop="staff_id"
      label="邮编"
      width="120">
    </el-table-column>
  </el-table>
    </div>
  </div>
</template>
<script>
import url from "../../js/url";
export default {
  name: "administrator",
  data() {
    return {
      activeIndex: "1",
      tableData: [],
      customertable: [],
      historytable: [],
      centerDialogVisible: false,
      addEmployee: {
        staff_name: "",
        staff_sex: "",
        staff_age: "",
        staff_IDnumber: "",
        staff_telephone: "",
      },
    };
  },
  created() {
    this.getEmployeeInformation();
    this.getHistoryInformation()
    this.getCustomerInformation()
  },
  methods: {
    //添加员工
    async sendAddEmployee() {
      console.log(this.addEmployee);
      let data = await this.$http.post(url.url + "/addstaff", this.addEmployee);
      console.log(data);
      this.$message(data.data.msg);
      this.addEmployee = {
        staff_name: "",
        staff_sex: "",
        staff_age: "",
        staff_IDnumber: "",
        staff_telephone: "",
      };
      this.centerDialogVisible = false;
    },
    //切换模块
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.activeIndex = key;
    },
    //显示添加员工表单
    addEmployeeShow() {
      this.centerDialogVisible = true;
    },
    //删除员工
    async deleteRow(index, rows) {
      console.log(index, rows);
      let d = rows[index].staff_IDnumber;
      // console.log(d);
      let data = await this.$http.post(url.url + "/delstaff", {
        staff_IDnumber: d,
      });
      if (data.data.code == 1) {
        this.getEmployeeInformation();
      }
      this.$message(data.data.msg);
    },
    //获取员工信息
    async getEmployeeInformation() {
      let data = await this.$http.post(url.url + "/staff");
      if (data.data.code == 1) {
        console.log(data);
        this.tableData = data.data.data;
        // this.$message(data.data.msg);
      } else {
        alert();
        this.$message(data.data.msg);
      }
    },
    //获取历史信息
    async getHistoryInformation() {
      let data = await this.$http.post(url.url + "/history");
      console.log(data);
      if (data.data.code == 1) {
        this.historytable = data.data.data;
        // this.$message(data.data.msg);
      } else {
        alert();
        this.$message(data.data.msg);
      }
    },
    //获取顾客表单
    async getCustomerInformation() {
      let d = await this.$http.post(url.url + "/customer");
      console.log(d);
      this.customertable = d.data.data;
    },
    //删除顾客
    async deleteRowCustomer(index, rows) {
      console.log(index, rows);
      let d = rows[index].cus_IDnumber;
      console.log(d);
      let data = await this.$http.post(url.url + "/delcustomer", {
        cus_IDnumber: d,
      });
      if (data.data.code == 1) {
        this.getCustomerInformation();
      }
      this.$message(data.data.msg);
    },
  },
};
</script>
<style lang="less" scoped>
.administrator {
  .pop-input {
    margin-bottom: 10px;
  }
  .add-employee {
    position: fixed;
    right: 0;
    top: 10px;
    z-index: 1;
  }
}
</style>