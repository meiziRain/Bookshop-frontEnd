<template>
  <div>
    <util-head ref="utilHead" @search="handelMySearch" @user="userListen"></util-head>
    <div id="contianer">
      <div class="line">————————————————————————————————————————————————————————————————————————————</div>

      <div id="dnum">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{path:'/'}">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            <span style="color:red">{{input}}</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            共
            <span style="color:red">{{selectbooksParams.total}}</span>件商品
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div id="table"></div>

      <div id="book-show">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="销量" name="people_num"></el-tab-pane>
          <el-tab-pane label="好评" name="score"></el-tab-pane>
          <el-tab-pane label="最新" name="create_time"></el-tab-pane>
          <el-tab-pane label="价格" name="price">
            <span slot="label" @click="reverse">
              价格
              <i :class="[sortFlag?'el-icon-download':'el-icon-upload2']"></i>
            </span>
          </el-tab-pane>
        </el-tabs>

        <div v-for="selectbook in selectbooks" :key="selectbook.id">
          <el-row id="tb">
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">
                <router-link target="_blank" :to="'/BookDetail/' + selectbook.id">
                <img
                  class="image"
                  :src="'http://localhost:8080/user/getImages?path='+selectbook.picUrl"
                >
                </router-link>
                <div id="content">{{selectbook.title}}</div>

                <div class="price">￥{{selectbook.price}}</div>

                <div class="athor">{{selectbook.pub}}</div>
                <div id="coment">
                  <a href="Javascript:;" style="text-decoration:none;font-size: 13px;">550条评论</a>
                </div>
                <div id="desc">{{selectbook.bookDesc}}</div>
                <div id="bt2">
                  <el-button type="primary" @click="insertBookCar(selectbook)">加入购物车</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="block" style="margin-top:30px;">
          <span class="demonstration"></span>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="selectbooksParams.pageNum"
            :page-size="selectbooksParams.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="selectbooksParams.total"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utilHead from "../components/utilhead.vue";
export default {
  components: {
    utilHead
  },
  data() {
    return {
      sortFlag: false,
      activeName: "second",
      selectbooks: [],
      currentPage4: 4,
      selectbooksParams: {
        pageNum: 1,
        total: 0,
        pageSize: 20
      },
      input: "",
      user: []
    };
  },
  created() {
    this.input = this.$route.params.input;
    this.selectByLike();
  },

  methods: {
    userListen(value) {
      this.user = value;
      console.log(this.user)
    },
    handelMySearch(value) {
      this.input = value;
      this.selectByLike();
    },
    reverse() {
      this.sortFlag = !this.sortFlag;
    },
    selectByLike() {
      let postData = {
        key: this.input,
        pageNum: this.selectbooksParams.pageNum,
        pageSize: this.selectbooksParams.pageSize
      };
      var url = "http://localhost:8080/selectByLike";
      this.$axios({
        method: "post",
        url: url,
        data: postData
      }).then(res => {
        console.log(res);
        
        this.selectbooks = res.data.list;
        this.selectbooksParams.total = res.data.total;
        this.selectbooksParams.pageNum = res.data.pageNum;
        this.selectbooksParams.pageSize = res.data.pageSize;
      });
    },

    sortByKey(array, key) {
      return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        return x < y ? -1 : x > y ? 1 : 0;
      });
    },
    handleClick(tab, event) {
      console.log(tab.name);
      this.selectbooks = this.sortByKey(this.selectbooks, tab.name);
      if (this.sortFlag == true) {
        this.selectbooks.reverse();
      }
    },
    handleSizeChange(val) {
      this.selectbooksParams.pageSize = val;
      this.selectBytt();
    },
    handleCurrentChange(val) {
      this.selectbooksParams.pageNum = val;
      this.selectBytt();
      console.log(`当前页: ${val}`);
    },
    //添加到购物车
    insertBookCar(book) {
      console.log("insertBookCar");
      console.log(book);
      if (this.user !="") {
        let postData = {
          userId: this.user.id,
          bookId: book.id,
          title: book.title,
          picUrl: book.picUrl,
          bookTypeBig: book.bookTypeBig,
          price: book.price
        };
        var url = "http://localhost:8080/insertBookCar";
        this.$axios({
          method: "post",
          url: url,
          data: postData
        }).then(res => {
          if (res.data >= 1) {
            this.$notify({
              type: "success",
              message: "成功添加购物车",
              offset: 200
            }),
              //修改子组件中的值
              this.$refs.utilHead.countBookCarByUserId();
          }
        });
      } else {
        this.$alert("请先登陆", "提示", {
          confirmButtonText: "确定"
        });
      }
    }
  }
};
</script>

<style scoped>
#contianer {
  margin-left: 2rem;
  width: 1100px;
  height: auto;
}
.line {
  letter-spacing: -1px;
  color: #ddd;
}
.line span {
  letter-spacing: 0;
  color: #222;
  margin: 0 20px;
}
#cred {
  position: relative;
  top: -11px;
  width: 1250px;
  left: -5px;
  height: 2px;
  background-color: crimson;
}
#header {
  position: relative;
  top: -40px;
  width: 1000px;
  height: 10px;
  left: -400px;
}
#btn1 {
  position: relative;
  left: -14.5px;
}
#dnum {
  position: relative;
  top: -5px;
  width: 1250px;
  left: -5px;
  height: 20px;

  background-color: beige;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background-color: red;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  width: 1100px;
  height: 200px;
  background: honeydew;
}
#tb :hover {
  background-color: rgb(220, 240, 240);
}

.image {
  position: relative;
  top: 15px;
  height: 170px;
  width: auto;
  left: -440px;
}
#content {
  font-size: 15px;
  width: 800px;
  position: relative;
  left: 240px;
  top: -158px;
  display: flex; /*弹性布局*/
  flex-wrap: wrap;
  height: auto;
}
.price {
  width: 100px;
  position: relative;
  padding-top: 14px;
  left: 210px;
  font-size: 18px;
  color: red;
  top: -160px;
  height: 10px;
  padding-left: 10px;
}
.athor {
  position: relative;
  margin-left: 21rem;
  text-align: left;
  top: -150px;
  width: 400px;
  font-size: 14px;
}
#desc {
  font-size: 12px;
  width: 740px;
  text-align: left;
  position: relative;
  left: 335px;
  top: -145px;
  display: flex; /*弹性布局*/
  flex-wrap: wrap;
  height: auto;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
#coment {
  width: 100px;
  position: relative;
  margin-left: 19.7rem;
  top: -145px;
}
#bt2 {
  width: 300px;
  position: relative;
  margin-left: 15rem;
  top: -140px;
}
</style>