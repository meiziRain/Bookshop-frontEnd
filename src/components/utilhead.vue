<template>
  <!-- 包含顶部信息栏和搜索框 -->
  <div id="container">
    <div id="context">
      <div class="head">
        <div class="send-place">送至:
          <el-select v-model="place" placeholder="请选择" style="width: 100px;">
            <el-option label="北京" value="北京"></el-option>
            <el-option label="上海" value="上海"></el-option>
            <el-option label="广州" value="广州"></el-option>
            <el-option label="长沙" value="长沙"></el-option>
          </el-select>
        </div>
        <div id="my-info">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <img src="../assets/info.png" v-if="user.icon==null">
              <img :src="user.icon" v-else>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="购物车">购物车</el-dropdown-item>
              <el-dropdown-item command="个人中心" :disabled="logOutFlag">个人中心</el-dropdown-item>
              <el-dropdown-item command="注销" :disabled="logOutFlag">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div id="choice">
          <ul>
            <li v-if="loginSuccess">
              <router-link  target="_blank" :to="{name:'login'}">
                <a>登录</a>
              </router-link>
            </li>
            <li v-else>
              <router-link :to="{name:'shopCar'}">
                <a>欢迎您:{{user.username}}</a>
              </router-link>
            </li>

            <li>
              <a href="https://www.baidu.com" target="_blank">关于我们</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="search">
        <div class="link-to-dandan">
          <a href="http://t.dangdang.com/20181205_z5pz" target="_blank">
            <img src="../../static/5.png">
          </a>
        </div>
        <div class="search-input">
          <el-input
            placeholder="请输入内容"
            v-model="input"
            class="input-with-select"
            style="width:650px;"
          >
            <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
          </el-input>
        </div>
      </div>
      <div class="my-shopcar">
        <img src="../assets/shopcar.png" class="shopcar">
        <el-badge :value="count" class="item">
          <el-button style="font-size:16px;" type="primary" plain @click="goShopCar">购物车</el-button>
        </el-badge>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "", //输入的查询内容
      place: "", //送货地点
      count: 0,
      loginSuccess: true,
      logOutFlag: true,
      user: []
    };
  },
  created() {
    this.getThisUser();
  },

  methods: {
    getThisUser() {
      let me = this;
      me.$axios
        .get("/user/queryUserByUsername")
        .then(res => {
          console.log("此用户：");
          console.log(res.data);
          me.user = res.data;
          if (this.user.username != null) {
            this.loginSuccess = false;
            me.logOutFlag = false;
          }
          this.$emit("user",me.user)
              this.countBookCarByUserId();
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleSearch() {
      let me = this;
      console.log(this.input);
      var path = this.$route.path;
      var toPage = path.substring(path.length - 6, path.length);
      console.log("toPage:");
      console.log(toPage);
      if (toPage == "select") {
        this.$emit("search", this.input);
      } else {
        this.$router.push({
          name: "select",
          target:"_Blank",
          params: { input: me.input }
        });
      }
    },
    goShopCar() {
      this.$router.push({
        name: "shopCar"
      });
    },
    handleCommand(command) {
      if (command == "购物车") {
        this.goShopCar();
      }
      if (command == "注销") {
        this.logout();
      }
      if (command == "个人中心") {
        let me = this;
        this.$router.push({
          name: "my",
          params: { username: me.user.username }
        });
      }
    },
    logout() {
      let me = this;
      me.$axios
        .get("/user/logout")
        .then(res => {
          console.log(res.data);
          if (res.data == "ok") {
            location.reload();
            console.log("已注销：");
          }
          this.$router.push({
            name:'index'
          })
        })
        .catch(error => {
          console.log(error);
        });
    },
    countBookCarByUserId() {
      //统计购物车中的商品个数
      var url = "http://localhost:8080/countBookCarByUserId";
      this.$axios({
        method: "get",
        url: url,
        params: {
        userId: this.user.id
        }
      }).then(res => {
        // console.log(res)
        this.count = res.data;
      });
    }
  }
};
</script>

<style scoped>
#container {
  position: relative;
  /* border: 1px solid black; */
  margin-top: -3.75rem;
  margin-left: auto;
  margin-right: auto;
  height: auto;
  width: 1800px;
}
.link-to-dandan {
  position: relative;
  width: 200px;
  height: 100px;
}
.search {
  top: 15px;
  position: relative;
  height: 100px;
  width: 1000px;
  left: 300px;
}
.search-input {
  position: relative;
  margin-top: -60px;
  width: 750px;
  margin-left: 200px;
}
.head {
  background: rgb(217, 232, 233);
  height: 40px;
  width: 1800px;
}
.send-place {
  position: relative;
  left: 220px;
  font-size: 14px;
  height: 40px;
  width: 300px;
}
#my-info {
  width: 60px;
  height: 60px;
  position: relative;
  float: right;
  right: 600px;
  top: -30px;
}
#my-info img {
  /*圆形头像*/
  width: 50px;
  height: 50px;
  border-radius: 50px;
  cursor: pointer; /*光标呈现为指示链接的指针*/
  transition: all 0.2s; /*表示所有的属性变化在0.6s的时间段内完成*/
}
#my-info img:hover {
  transform: scale(1.4); /*表示在鼠标放到图片上的时候图片按比例放大1.4倍*/
}
#choice {
  position: relative;
  top: -50px;
  float: right;
  width: 200px;
  margin-right: 340px;
}
#choice ul {
  padding-left: 0px;
}
#choice li {
  display: inline-block;
  padding: 10px;
}
#choice a:hover,
a:active {
  color: black; /*鼠标移动过来颜色变黑*/
}
#choice a {
  color: rgb(255, 0, 149);
  font-size: 16px;
}
a {
  text-decoration: none; /*不显示链接的下划线*/
}
.my-shopcar {
  position: relative;
  width: 200px;
  float: right;
  top: -65px;
  margin-right: 300px;
}
.shopcar {
  position: relative;
  width: 50px;
  height: 40px;
  top: 15px;
}
#choice {
  position: relative;
  top: -25px;
  float: right;
  width: 400px;
  margin-right: 100px;
}
#choice ul {
  padding-left: 0px;
  margin: 0px;
  height: 45px;
}
#choice li {
  padding-right: 15px;
  float: left;
  list-style: none; /*设置列表标记的 默认会是实心圆点 设成none就是没有标记*/
}
#choice a:hover,
a:active {
  color: black; /*鼠标移动过来颜色变黑*/
}
#choice a {
  color: rgb(255, 0, 149);
  font-size: 16px;
}
</style>

