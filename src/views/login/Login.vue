<template>
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
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  created() {},
  data() {
    return {
      LoginUser: {
        user_telephone: "",
        user_password: "",
      },
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