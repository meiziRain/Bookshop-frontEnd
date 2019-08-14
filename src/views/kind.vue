<template>
  <div>
    <util-head ref="utilHead" @user="userListen"></util-head>

    <div id="contianer">
      <div id="left">
        <h5 style="font-size:25px;">图书分类</h5>

        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :unique-opened="true"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="科技">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span style="font-size:18px;">科 技</span>
            </template>

            <div v-for="kind in kinds" :key="kind.id">
              <el-menu-item :index="kind" @click="seletByindex(kind)">{{kind}}</el-menu-item>
            </div>
          </el-submenu>

          <el-submenu index="经管">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span style="font-size:18px;">经 管</span>
            </template>
            <div v-for="kind in kinds" :key="kind.id">
              <el-menu-item :index="kind" @click="seletByindex(kind)">{{kind}}</el-menu-item>
            </div>
          </el-submenu>

          <el-submenu index="生活">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span style="font-size:18px;">生 活</span>
            </template>
            <div v-for="kind in kinds" :key="kind.id">
              <el-menu-item :index="kind" @click="seletByindex(kind)">{{kind}}</el-menu-item>
            </div>
          </el-submenu>

          <el-submenu index="文化">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span style="font-size:18px;">文 化</span>
            </template>
            <div v-for="kind in kinds" :key="kind.id">
              <el-menu-item :index="kind" @click="seletByindex(kind)">{{kind}}</el-menu-item>
            </div>
          </el-submenu>

          <el-submenu index="流行">
            <template slot="title">
              <i class="el-icon-bell"></i>
              <span style="font-size:18px;">流 行</span>
            </template>
            <div v-for="kind in kinds" :key="kind.id">
              <el-menu-item :index="kind" @click="seletByindex(kind)">{{kind}}</el-menu-item>
            </div>
          </el-submenu>
        </el-menu>
      </div>

      <div id="right">
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

        <div class="goods-show">
          <!-- <el-tooltip class="item" effect="dark" content="用户体验的要素 : 以用户为中心的Web设计" placement="right">
                <el-card style="width:180px;height:320px;margin-right:50px;" :body-style="{ padding: '0px'} ">
                    <img src="https://img1.doubanio.com/view/subject/m/public/s2923557.jpg" class="image">
                        <div style="padding: 14px;height:70px;">
                            <div class="title">用户体验的要素 : 以用户为中心的Web设计</div>
                            <div style="width:150px;height:35px;">
                                <div class="price">￥99</div>
                                <div class="score"><i class="el-icon-star-off"></i>8.2</div>
                            </div>
                            <el-button type="text" class="button">加入购物车</el-button>
                        </div>
                </el-card>
          </el-tooltip>-->
          <div v-for="newbook in kindbooks" :key="newbook.id" style="margin-top:30px;">
            <el-tooltip class="item" effect="dark" :content="newbook.title" placement="right">
              <el-card
                style="width:180px;height:320px;margin-right:50px;"
                :body-style="{ padding: '0px'} "
              >
                <router-link target="_blank" :to="'/BookDetail/' + newbook.id">
                  <img
                    :src="'http://localhost:8080/user/getImages?path='+newbook.picUrl"
                    class="image"
                  >
                </router-link>
                <div style="padding: 14px;height:70px;">
                  <div class="title">{{newbook.title}}</div>
                  <div style="width:150px;height:35px;">
                    <div class="price">￥{{newbook.price}}</div>
                    <div class="score">
                      <i class="el-icon-star-off"></i>
                      {{newbook.score}}
                    </div>
                  </div>
                  <el-button type="text" class="button" @click="insertBookCar(newbook)">加入购物车</el-button>
                </div>
              </el-card>
            </el-tooltip>
          </div>
        </div>

        <div class="block" style="margin-top:30px;">
          <span class="demonstration"></span>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="kindbooksParams.pageNum"
            :page-size="kindbooksParams.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="kindbooksParams.total"
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
      kindbooks: [],
      kinds: [],
      activeName: "second",
      currentPage4: 4,
      kindbooksParams: {
        pageNum: 1,
        total: 0,
        pageSize: 16
      },
      paixu: "",
      kindtemp: "",
      sortFlag: false,
      temp: "",
      user: []
    };
  },
  created() {
    this.temp = this.$route.query.kind;
    console.log("this.temp:");
    console.log(this.temp);
    this.seletByindex(this.temp);
  },

  methods: {
    userListen(value) {
      this.user = value;
    },
    //添加到购物车
    insertBookCar(book) {
      console.log("insertBookCar");
      console.log(book);
      if (this.user != "") {
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
            });
            this.$refs.utilHead.countBookCarByUserId();
          }
        });
      } else {
        this.$alert("请先登陆", "提示", {
          confirmButtonText: "确定"
        });
      }
    },
    reverse() {
      this.sortFlag = !this.sortFlag;
    },
    //各种排序
    selectBypaixu(paixu) {
      let postData = {
        paXiu: paixu,
        kind: this.kindtemp,
        pageNum: this.kindbooksParams.pageNum,
        pageSize: this.kindbooksParams.pageSize
      };
      var url = "http://localhost:8080/selectBypaixu";
      this.$axios({
        method: "post",
        url: url,
        data: postData
      }).then(res => {
        // console.log(res)
        this.kindbooks = res.data.list;
        if (this.sortFlag == false) {
          this.kindbooks.reverse();
        }
        this.kindbooksParams.total = res.data.total;
        this.kindbooksParams.pageNum = res.data.pageNum;
        this.kindbooksParams.pageSize = res.data.pageSize;
      });
    },
    //小分类查询
    seletByindex(kind) {
      this.kindtemp = kind;
      let postData = {
        kind: kind,
        pageNum: this.kindbooksParams.pageNum,
        pageSize: this.kindbooksParams.pageSize
      };
      var url = "http://localhost:8080/seletByindex";
      this.$axios({
        method: "post",
        url: url,
        data: postData
      }).then(res => {
        // console.log(res)
        this.kindbooks = res.data.list;
        this.kindbooksParams.total = res.data.total;
        this.kindbooksParams.pageNum = res.data.pageNum;
        this.kindbooksParams.pageSize = res.data.pageSize;
      });
    },

    //点击分类时间
    handleOpen(key, keyPath) {
      let postData = {
        bigKind: key
      };

      var url = "http://localhost:8080/selectKind";
      this.$axios({
        method: "post",
        url: url,
        data: postData
      }).then(res => {
        this.kinds = res.data;
      });
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

    handleClick(tab, event) {
      let me = this;
      me.paixu = tab.name;
      this.selectBypaixu(me.paixu);
    },
    handleSizeChange(val) {
      this.kindbooksParams.pageSize = val;
      this.selectBypaixu();
    },
    handleCurrentChange(val) {
      this.kindbooksParams.pageNum = val;
      this.selectBypaixu();
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style scoped>
#contianer {
  /* border: 1px solid red; */
  width: 1300px;
  height: auto;
}
#left {
  /* border: 1px solid red; */
  position: relative;
  width: 200px;
  height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;
}
#right {
  /* border: 1px solid red; */
  margin-top: -500px;
  position: absolute;
  left: 300px;
  width: 900px;
  height: auto;
}
.image {
  position: relative;
  top: -20px;
  left: 0px;
  width: 180px;
  height: 200px;
  display: block;
  margin-top: 20px;
}
.title {
  font-size: 13px;
  overflow: hidden;
  height: 16px;
}
.price {
  padding-top: 10px;
  float: left;
  font-size: 15px;
  color: red;
}
.score {
  padding-top: 10px;
  float: right;
  font-size: 15px;
  color: darkgoldenrod;
}

.goods-show {
  display: flex; /*弹性布局*/
  flex-wrap: wrap; /*默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap属性定义，如果一条轴线排不下，如何换行*/
  width: 1000px;
  overflow: hidden;
  display: flex; /*弹性布局*/
  flex-wrap: wrap;
}
</style>