<template>
  <div id="container">
    <div id="switcher" style="font-size:1.5em;">
      Mode: {{tip}}
      <el-switch
        v-model="value"
        @change="clearValues()"
        active-color="#000000"
        inactive-color="#93a8aa"
      ></el-switch>
    </div>
    <div v-if="value" id="login">
      <div id="input">
        <!-- <effect-input v-model="username" type="haruki" label="Username"></effect-input> -->
        <el-input
          class="input"
          placeholder="Username"
          @blur="usernameBlur()"
          v-model="username"
          onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
          onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"
          clearable
        ></el-input>
        <br>
        <br>
        <br>
        <!-- <effect-input
          v-model="password"
          @input="change()"
          type="password"
          label="Password"
        ></effect-input>-->
        <el-input
          class="input"
          placeholder="Password"
          @blur="passwordBlur()"
          v-model="password"
          onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"
          onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
          type="password"
          clearable
        ></el-input>
      </div>
      <div>
        <btn-blob-full class="btn" content="Login" @click="Login()"></btn-blob-full>
      </div>
    </div>
    <div v-else id="register">
      <div id="input">
        <el-input
          class="input"
          placeholder="Username"
          @blur="usernameBlur()"
          v-model="username"
          onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
          onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"
          clearable
        ></el-input>
        <br>
        <br>
        <br>
        <el-input
          class="input"
          placeholder="Password"
          @blur="passwordBlur()"
          v-model="password"
          onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
          onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"
          type="password"
          clearable
        ></el-input>
        <br>
        <br>
        <br>
        <el-input
          class="input"
          placeholder="PasswordAffirm"
          v-model="passwordAffirm"
          type="password"
          onKeypress="javascript:if(event.keyCode == 32)event.returnValue = false;"
          onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"
          @blur="passwordBlur()"
          clearable
        ></el-input>
      </div>
      <div>
        <btn-blob-full class="btn" @click="Register" content="Register"></btn-blob-full>
      </div>
    </div>
  </div>
</template>

<script>
import btnBlobFull from "../components/btnBlobFull.vue";
export default {
  components: {
    btnBlobFull
  },
  data() {
    return {
      value: true,
      username: "",
      password: "",
      passwordAffirm: "",
      str: "",
      tip: "Login"
    };
  },
  created() {
    console.log("this.username");
    console.log(this.username);
    this.username = "";
    this.password = "";
    this.passwordAffirm = "";
    console.log("this.username");
    console.log(this.username);
  },
  methods: {
    passwordBlur() {
      let me = this;
      if (me.password == "") {
        this.$message({
          type: "error",
          message: "Please input the password!",
          duration: 6000
        });
      }
    },

    usernameBlur() {
      let me = this;
      if (me.username == "") {
        this.$message({
          type: "error",
          message: "Please input the username!",
          duration: 6000
        });
      }
    },

    check() {
      let me = this;
      if (me.username == "") {
        this.$message({
          type: "error",
          message: "Please input the username!",
          duration: 6000
        });
        return false;
      }
      if (me.password == "") {
        this.$message({
          type: "error",
          message: "Please input the password!",
          duration: 6000
        });
        return false;
      }
      if (me.passwordAffirm == "" || me.passwordAffirm.length < 6) {
        this.$message({
          type: "error",
          message: "两次密码必须相同，且都不小于六位数!",
          duration: 6000
        });
        return false;
      }
      if (me.password != me.passwordAffirm) {
        this.$message({
          type: "error",
          message: "This password is diffrent from other!",
          duration: 6000
        });
        return false;
      }
      return true;
    },
    clearValues() {
      let me = this;
      if (me.value == true) {
        me.tip = "Login";
      } else {
        me.tip = "Register";
        const h = this.$createElement;
        this.$notify({
          title: "提示",
          message: h(
            "i",
            { style: "color: teal" },
            "只允许输入字母与数字组合,且不小于六位。"
          ),
          duration: 0,
          position: "top-left"
        });
      }
      me.username = "";
      me.password = "";
      me.passwordAffirm = "";
    },

    getUserByUsername() {
      let me = this;
      console.log(me.username);
      me.$axios
        .get("/user/queryUserByUname", {
          params: {
            username: me.username
          }
        })
        .then(res => {
          console.log("判断用户是否存在。");
          console.log(res.data);
          if (res.data) {
            // 没有返回值，数据库没有改用户名记录
            console.log("该用户不存在。");
          } else {
            console.log("该用户已存在。");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    Register() {
      console.log("点击注册");
      let me = this;
      let postData = {
        username: me.username,
        password: me.password
      };
      if (me.check()) {
        me.$axios
          .get("/user/queryUserByUname", {
            params: {
              username: me.username
            }
          })
          .then(res => {
            console.log("判断用户是否存在。");
            console.log(res.data);
            if (res.data) {
              // 返回值true，
              console.log("该用户不存在。");
              console.log("开始注册！");
              me.$axios({
                method: "post",
                url: "http://localhost:8080/user/insertUser",
                data: postData
              })
                .then(Response => {
                  console.log("注册成功！");
                  console.log(Response.data);
                  alert("注册成功！");
                  me.Login();
                })
                .catch(error => {
                  console.log(error);
                });
            } else {
              console.log("该用户已存在。");
              this.$message({
                type: "error",
                message: "该用户已存在。",
                duration: 6000
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
      //先取出所有的username，判断用户输入的值是否存在。
    },
    Login() {
      console.log("点击登录");
      let me = this;
      console.log(me.str);
      let postData = {
        username: me.username,
        password: me.password
      };
      me.$axios({
        method: "post",
        url: "http://localhost:8080/user/login",
        data: postData
      })
        .then(res => {
          console.log(res.data);
          var result = res.data;
          if (result == "no") {
            this.$message({
              // type: "error",
              message: "用户名不存在,点击右上角切换到注册模式！",
              duration: 6000
            });
          }
          if (result == "error") {
            this.$message({
              type: "error",
              message: "密码错误，请重新输入！",
              duration: 6000
            });
          }
          if (result == "ok") {
            me.username = "";
            me.password = "";
            me.passwordAffirm = "";
            this.$message({
              type: "success",
              message: "登陆成功！",
              duration: 6000
            });
            this.$router.push({
              name: "index",
              params: { username: me.username }
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.el-input__inner {
  height: 4rem;
  width: 8rem;
}
#container {
  border: 1px dashed white;
  margin-top: -3.7rem;
  height: 56rem;
}
#input {
  margin-top: 15rem;
  width: 20rem;
  margin-left: auto;
  margin-right: auto;
}
#switcher {
  float: right;
  margin-right: 8rem;
  margin-top: 4rem;
}
.btn {
  width: 10rem;
  height: 4rem;
  margin-left: auto;
  margin-right: auto;
}
</style>
