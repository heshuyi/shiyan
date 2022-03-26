<template>
  <div id="mine">
    <div>name:</div>
    <div>{{ log }}</div>
    <div class="outLogin" @click="tuichu">退出</div>
  </div>
</template>
<script>
import { url as urlqing } from "../../js/url";
export default {
  socket: 1,
  name: "Mine",
  data() {
    return {
      myData: null,
      socket: null,
      log: null,
    };
  },
  created() {
    // this.initWebSocket();
    this.$http.get(urlqing + "/api11", { params: { token: 1 } }).then((res) => {
      console.log(res);
    });
  },
  monted() {
    //绑定事件是用加属性的方式
  },
  destroyed() {
    // socket.close()
    console.log(1);
    // this.websocket.close();
  },
  methods: {
    tuichu() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    initWebSocket() {
      const wsurl = "ws://localhost:9999"; //"wss://www.kaycee.com/wss/test"; //ws 相当于http 而wss 相当于https
      this.websocket = new WebSocket(wsurl); //实例对象
      this.websocket.onmessage = this.websocketonmessage;
      this.websocket.onopen = this.websocketonopen;
      this.websocket.onerror = this.websocketonerror;
      this.websocket.onclose = this.websocketclose;
    },
    //连接建立
    websocketonopen() {
      console.log("连接建立成功");
      this.websocketsend();
      this.timer = setInterval(() => {
        this.doSend();
      }, 3600 * 1000);
    },

    //websocket心跳  防连接超时  WebSocket规定在一定时间内没有数据交互，就会自动断开
    doSend() {
      this.websocket.send("didi");
    },

    //发送数据
    websocketsend() {
      this.websocket.send("didi1"); //发送数据，传什么数据由实际需求决定
    },
    //数据接收
    websocketonmessage(e) {
      console.log("接收后端返回数据", e.data);
    },

    //连接建立失败重连
    websocketonerror() {
      this.initWebSocket();
    },
    //连接关闭
    websocketclose(e) {
      console.log("websocket断开连接", e);
    },
  },
};
</script>
<style lang="less" scoped>
#mine {
  .outLogin {
    width: 200rem;
    height: 100rem;
    font-size: 40rem;
    background-color: chartreuse;
    text-align: center;
    line-height: 100rem;
  }
}
</style>