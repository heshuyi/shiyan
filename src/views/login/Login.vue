<template>
<<<<<<< HEAD
  <div class="login">
    <div class="login-box">
      <el-input
        class=""
        prefix-icon="el-icon-user-solid"
        v-model="LoginUser.user_telephone"
        placeholder="请输入账号"
      ></el-input>
      <el-input
        placeholder="请输入密码"
        v-model="LoginUser.user_password"
        show-password
      ></el-input>
      <el-button @click="login" type="primary">登录</el-button>
      <el-button @click="toNew" type="success">注册</el-button>
=======
  <div class="login-box">
    <div class="login-title">欢迎登陆价高者得</div>
    <div class="login-form">
      <div class="from">
        <span>账号:</span><input id="account" type="text" v-model="account" />
      </div>
      <div class="from">
        <span>密码:</span
        ><input id="password" type="password" v-model="password" />
      </div>
      <div class="my-button">
        <button @click="loginIn" id="login-in">登录</button>
        <button @click="makeNew" id="make-new">注册</button>
      </div>
    </div>
    <div class="make-new-box" v-if="makeNewBox">
      <h1 class="make-new-box-title">注册</h1>
      <div class="close" @click="closeMakeNew">X</div>
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
      >
       <van-field v-model="email" :rules="[{ validator:checkEmail, message: '请输入正确内容'}]" label="邮箱" placeholder="请输入邮箱" />
        <template>
          <van-field
            key="123"
            v-model="newPassword1"
            placeholder="输入密码"
            type="password"
            label="密码"
          />
          <van-field
            key="num2"
            v-model="newPassword2"
            placeholder="再输入密码"
            type="password"
            label="确认密码"
          />
        </template>
      </van-address-edit>
>>>>>>> 1875f6e3037ea97320ec6f8c8686b99caad1614f
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  created() {},
  data() {
    return {
<<<<<<< HEAD
      LoginUser: {
        user_telephone: "",
        user_password: "",
      },
=======
      account: "",
      password: "",
      makeNewBox: false,
      areaList,
      searchResult: [],
      asd: null,
      text: "",
      newPassword1: "",
      newPassword2: "",
      email:'',
>>>>>>> 1875f6e3037ea97320ec6f8c8686b99caad1614f
    };
  },
  methods: {
    toNew(){
      this.$router.push("/new");
    },
    async login() {
      // let d = this.$http.post("http://10.0.0.13:4001/admin", this.LoginUser);
      // d = this.LoginUser.user_telephone
      // console.log(d);
      let d = this.LoginUser.user_telephone
      console.log(d);
      if (d==1) {
        this.$message.success("登录成功");
        this.$router.push("/shop");
      }else if(d==2){
        this.$router.push("/administrator");
      }else if(d==3){
        this.$router.push("/employee");
      }else {
        this.$message.error("登录失败");
      }
<<<<<<< HEAD
=======
      if (!this.password) {
        alert("密码未输入");
        return;
      }
      var data1 = {
        tel: this.account,
        password: this.password,
      };
      var c = await this.$http.post(urlqing+"/tologin", data1);
      if (c.status == 200) {
        console.log(c);
        if (c.data.status == 1) {
          window.sessionStorage.setItem("token", this.account);
          this.$store.commit('setTel',this.account)
          this.$router.push("/shoppingapp");
        } else if (c.data.status == 2) {
          alert(c.data.msg);
        } else {
          alert(c.data.msg);
        }
      }
    },
    makeNew() {
      this.makeNewBox = true;
    },
    //校验邮箱
    checkEmail(email) {
      console.log(email);
      var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      return reg.test(email);
    },
    async onSave(content) {
      console.log(content);
      if (this.newPassword1 != this.newPassword2) {
        alert("两次密码错误");
        return;
      }
      var newcontent = {
        tel: content.tel,
        name: content.name,
        password: this.newPassword1,
        province: content.province,
        city: content.city,
        county: content.county,
        postalCode: content.postalCode,
        addressDetail: content.addressDetail,
        email: this.email,
      };
      // console.log(newcontent);
      var res = await this.$http.post(urlqing+"/registered", newcontent);
      if (res.status == 200) {
        alert(res.data.msg);
      }
      Toast("创建成功");
>>>>>>> 1875f6e3037ea97320ec6f8c8686b99caad1614f
    },
  },
};
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  .login-box {
    width: 300px;
    height: 400px;
    border: 2px solid #ccc;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>