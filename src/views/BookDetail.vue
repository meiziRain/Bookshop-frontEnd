<template>
  <div id="container" style="height: auto;">
    <util-head ref="utilHead" @user="userListen"></util-head>
    <div id="main">
      <div id="BookDetail">
        <div id="BookImg">
          <div id="ImgSize">
            <img class="Book_Img" :src="'http://localhost:8080/user/getImages?path='+book.picUrl">
          </div>
        </div>
        <div id="BookShop">
          <transition
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:after-enter="afterEnter"
          >
            <div class="ball" v-show="ballFlag"></div>
          </transition>
          <div id="BookDesc">
            <btnFade1 id="btnFade1" hide="自营" show="NAME"></btnFade1>
            <h1 id="BookName" style="text-align:left">📖{{book.title}}</h1>
            <div id="BookDescribe">
              <a :href="book.url" target="_Blank" style="font-size:1.2em;">>{{book.bookDesc}}</a>
            </div>
            <p id="ad">
              📣！
              <a
                style="color:rgb(38, 236, 236);text-align:left"
                href="http://www.baidu.com/"
                target="_blank"
              >十万童书3.9折-5折 快来选宝贝的新年礼物吧</a>
            </p>
          </div>
          <div class="line">
            ———————————
            <span
              style="text-align: center;font-family: 'Roboto', sans-serif;"
            >information</span>————————————
          </div>
          <div id="BookInfo">
            <div id="BookInfo_left">
              <h4
                style="text-align:left;  margin-left:1rem; "
              >作者：{{book.pub.split("/")[book.pub.split("/").length-4]}}</h4>
              <h4
                style="text-align:left;  margin-left:1rem; "
              >出版社:{{book.pub.split("/")[book.pub.split("/").length-3]}}</h4>
              <h4
                style="text-align:left;  margin-left:1rem; "
              >出版时间:{{ book.pub.split("/")[book.pub.split("/").length-2]}}</h4>
              <h2 style="text-align:left;margin-top:0.6rem; margin-left:1rem;">
                价格:
                <span
                  style="color:#ff3333;font-size:2em;"
                >{{book.pub.split("/")[book.pub.split("/").length-1]}}</span>
              </h2>
            </div>
            <div id="BookInfo_right">
              <br>
              <!-- <el-rate
                v-model="(book.score)"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              ></el-rate> -->
              <i style="color:red;font-size:1.5em;" class="el-icon-star-off">{{book.score}}</i>
              <a
                href="#comment_recommend"
                style="text-align:left;  margin-left:3rem; "
              >{{CommentParams.total}}条评论</a>
            </div>
          </div>
          <div style="margin-top:4rem;">
            <br>
            <h3 style="text-align:left;  margin-left:1rem;">领&nbsp;&nbsp;&nbsp;&nbsp;券</h3>
            <btn-fade1 id="btn-fade2" show="满15" hide="减15"></btn-fade1>
            <br>
            <br>
            <h3 style="margin-left:-4.2rem;text-align:left; display:inline-block;">配送至</h3>
            <el-cascader
              style="margin-left:1rem;display:inline-block;"
              :options="options"
              v-model="addressValueArray"
            ></el-cascader>
            <h3
              style="margin-left:4rem;text-align:left; display:inline-block;"
            >数&nbsp;&nbsp;&nbsp;&nbsp;量</h3>
            <el-input-number
              style="margin-left:2rem; display:inline-block;"
              v-model="buyNum"
              controls-position="right"
              :min="1"
              :max="10"
            ></el-input-number>
          </div>
          <div id="buy">
            <btnShiney id="btnShiney" @click="btnClick()" content="🛒Shiney!"></btnShiney>
            <el-button id="buyNow" type="danger" @click="buyNow" plain>立即购买</el-button>
          </div>
        </div>
        <div id="SthElse">
          <div id="niupi" style="height:32rem;width:15rem;">
            <img class="Book_Img" src="../../static/牛皮2.png">
          </div>
        </div>
      </div>
      <!-- 评论与推广部分 -->
      <div id="comment_recommend">
        <!-- 推广 -->
        <div id="recommend">
          <div>
            <!-- Collapse折叠面板，手风琴模式 -->
            <el-collapse v-model="activeNames" @change="handleChange" accordion>
              <!-- Books of the same kind -->
              <el-collapse-item title="浏览此商品的顾客也同时浏览" name="1">
                <el-card
                  v-for="(item,index) in theSameBooks"
                  :key="index"
                  style="height:25rem;"
                  :body-style="{ padding: '0px'} "
                >
                  <div style="width:15rem;height:20rem;margin-left: auto;margin-right: auto; ">
                    <router-link target="_blank" :to="'/BookDetail/' + item.id">
                      <img
                        :src="'http://localhost:8080/user/getImages?path='+item.picUrl"
                        class="Book_Img"
                      >
                    </router-link>
                  </div>
                  <div style="padding: 14px;">
                    <div class="title" style="display:inline-block;">{{item.title}}</div>
                    <div class="price" style="display:inline-block;color:red;">￥{{item.price}}</div>
                    <br>
                    <el-button type="text" class="button" @click="buy(item)">加入购物车</el-button>
                  </div>
                </el-card>
              </el-collapse-item>
              <!-- Book Sales Ranking -->
              <el-collapse-item title="图书排行榜📈" name="2">
                <el-card
                  v-for="(item,index) in bookTopTen"
                  :key="index"
                  style="height:25rem;"
                  :body-style="{ padding: '0px' }"
                >
                  <div style="width:15rem;height:20rem;margin-left: auto;margin-right: auto; ">
                    <router-link target="_blank" :to="'/BookDetail/' + item.id">
                      <img
                        :src="'http://localhost:8080/user/getImages?path='+item.picUrl"
                        class="Book_Img"
                      >
                    </router-link>
                  </div>
                  <div style="padding: 14px;">
                    <div class="title" style="display:inline-block;">{{item.title}}</div>
                    <div class="price" style="display:inline-block;color:red;">￥{{item.price}}</div>
                    <br>
                    <el-button type="text" class="button" @click="buy(item)">加入购物车</el-button>
                  </div>
                </el-card>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
        <!-- 评论 -->
        <dir id="comment">
          <el-tabs type="border-card">
            <el-tab-pane label="商品评论💬">
              <div class="commentBox">
                <div v-if="commentList.length==0" style="width:12rem;height:12rem;">
                  <img class="Book_Img" src="../../static/saySomething.png">
                </div>
                <div v-else>
                  <div class="comment" v-for="(item,index) in commentList" :key="index">
                    <div style="height:1.5rem;float:right;width:4rem;margin-top:-0.5rem;">
                      <a
                        v-show="item.uid==user.id"
                        href="Javascript:;"
                        @click="deleteComment(item.id)"
                      >删除</a>
                    </div>
                    <div class="user">
                      <div class="userIcon">
                        <img
                          v-if="item.icon"
                          v-image-preview
                          style="border-radius: 50%;-moz-border-radius: 50%;-webkit-border-radius: 50%;"
                          class="Book_Img"
                          :src="item.icon"
                        >
                        <img
                          v-else
                          v-image-preview
                          style="border-radius: 50%;-moz-border-radius: 50%;-webkit-border-radius: 50%;"
                          class="Book_Img"
                          src="../assets/info.png"
                        >
                      </div>
                      <h3 style="text-align:center;">{{item.uname}}</h3>

                      <vue-star
                        animate="animated rubberBand"
                        style="margin-top:-2rem;font-size:1.5em;"
                        color="#F05654"
                      >
                        <i
                          slot="icon"
                          class="fa fa-heart"
                          @click="praise(item,index)"
                          style="color:rgb(51, 51, 51)"
                        ></i>
                      </vue-star>
                      <h3
                        style="color:#595959;margin-top:0.45rem;margin-left:-7rem;"
                      >{{item.praise}}</h3>
                    </div>
                    <div class="userContent">
                      <el-rate
                        style="float:left;margin-left:1rem;"
                        v-model="item.star"
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value}"
                      ></el-rate>
                      <h4>{{item.createTime}}</h4>
                      <div class="userComment">
                        <el-tooltip
                          style
                          class="item"
                          effect="dark"
                          :content="item.content"
                          placement="right"
                        >
                          <div style="text-align:left;letter-spacing: 2px;">{{item.content}}</div>
                        </el-tooltip>
                      </div>
                      <div
                        v-if="item.pic"
                        style="height:6rem;width:6rem;margin-top:3rem;margin-left:1rem;"
                      >
                        <img
                          v-image-preview
                          v-if="item.pic"
                          class="Book_Img"
                          :src="'http://localhost:8080/BookCommentPicture/showImg?pathName='+item.pic"
                        >
                      </div>
                    </div>

                    <div class="line">—————————————————————————————————————————————————————————————</div>
                  </div>
                </div>
              </div>
              <!-- 分页 -->
              <div class="block" v-if="commentList.length!=0">
                <span class="demonstration">直接前往</span>
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="CommentParams.pageNum"
                  :page-size="CommentParams.pageSize"
                  layout="total,prev, pager, next, jumper"
                  :total="CommentParams.total"
                ></el-pagination>
              </div>
              <div class="line">—————————————————————————————————————————————————————————————</div>

              <!-- 评论增加，图片上传 -->
              <div style="display:none;" id="operation">
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  action="http://localhost:8080/BookCommentPicture/upload"
                  name="picture"
                  :limit="1"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-change="picHandChange"
                  :on-success="handleSuccess"
                  :file-list="fileList"
                  :auto-upload="false"
                  list-type="picture"
                >
                  <el-button
                    style="margin-left:-44rem;"
                    slot="trigger"
                    size="small"
                    icon="el-icon-picture-outline"
                    type="primary"
                  >图片上传</el-button>
                  <el-button
                    style="float:left;"
                    size="small"
                    type="success"
                    icon="el-icon-check"
                    @click="submitUpload()"
                  >确认</el-button>
                </el-upload>
                <!-- 星级           -->
                <div class="block">
                  <span class="demonstration">您认为的星级</span>
                  <el-rate v-model="userStar" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
                </div>
                <el-input
                  id="commentText"
                  style=" margin-top: 0.6rem;"
                  type="textarea"
                  :rows="2"
                  placeholder="可以在此输入内容，请文明用语。"
                  v-model="textarea"
                ></el-input>
              </div>
            </el-tab-pane>
            <el-tab-pane label="商品问答❓">
              <div v-if="true" style="width:12rem;height:12rem;">
                <img class="Book_Img" src="../../static/saySomething.png">
              </div>
            </el-tab-pane>
          </el-tabs>
        </dir>
      </div>
    </div>
  </div>
</template>

<script>
import btnFade1 from "../components/btnFade1.vue";
import btnFade2 from "../components/btnFade2.vue";
import btnShiney from "../components/btnShiney.vue";
import btnBlobFull from "../components/btnBlobFull.vue";
import btnBlobHalf from "../components/btnBlobHalf.vue";
import global_ from "../common/global.vue";
import utilHead from "../components/utilhead.vue";
export default {
  components: {
    btnFade1,
    btnFade2,
    btnShiney,
    btnBlobHalf,
    btnBlobFull,
    utilHead
  },
  data() {
    return {
      activeNames: ["1"],
      currentPage: 0,
      buyNum: 1,
      userStar: 0,
      textarea: "",
      commentList: [],
      user: [],
      toTop: true,
      addressValueArray: [],
      star: 3,
      fileList: [],
      address: "",
      picLocation: "",
      comment: [
        {
          name: "有毒的黄同学",
          time: "2016-08-17",
          content: "好,讲得非常好，good",
          reply: [
            {
              responder: "有毒的黄同学",
              reviewers: "傲娇的",
              time: "2016-09-05",
              content: "你说得对"
            },
            {
              responder: "傲娇的",
              reviewers: "有毒的黄同学",
              time: "2016-09-05",
              content: "很强"
            }
          ]
        },
        {
          name: "Freedom小黄",
          time: "2016-08-17",
          content: "好,讲得非常好，good",
          reply: []
        }
      ],
      options: global_.options,
      CommentParams: {
        //评论分页参数
        pageNum: 1, //当前页
        total: 0, //总量
        pageSize: 20 //每页大小
      },
      bookId: 0, //书id
      book: [], //这本书的详情
      theSameBooks: {},
      bookTopTen: {}, //图书前十
      ballFlag: false
    };
  },
  created() {
    // this.pubFormat();
    this.bookId = this.$route.params.id;
    this.getBookDetail();
    this.getBookTopTen();
  },

  methods: {
    deleteComment(id) {
      let me = this;
      console.log("删除评论");
      this.$confirm("此操作将删除该评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          me.$axios
            .get("/BookComment/deleteBookCommentById", {
              params: {
                id: id
              }
            })
            .then(res => {
              console.log(res.data);
              console.log("删除成功！");
              me.getComments();
            })
            .catch(error => {
              console.log(error);
            });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    buyNow() {
      console.log("立即购买");
    },
    judgeCommentBoxShow() {
      let me = this;
      var operation = document.getElementById("operation");
      if (me.user != "") {
        operation.style.display = "inline";
      }
    },
    judgePraise() {
      console.log("得不到的是最想要的。");
      var me = this;
      var currentUsername = me.user.username;
      console.log("praise:");
      var praise = document.getElementsByClassName("fa fa-heart");
      console.log(praise);
      console.log("数组长度：");
      console.log(me.commentList.length);
      for (var i = 0; i < me.commentList.length; i++) {
        var a = me.commentList[i].likeMan;
        var b = me.ClearNullArr(a.split("-"));
        console.log("整形后的数组：");
        console.log(b);
        for (var j = 0; j < b.length; j++) {
          if (b[j] == currentUsername) {
            console.log("待改变的动态组件编号：" + j);
            praise[i].style.color = "rgb(240, 86, 84)";
          }
        }
      }
    },
    ClearNullArr: function(arr) {
      //数组去空
      for (var i = 0, len = arr.length; i < len; i++) {
        if (!arr[i] || arr[i] == "" || arr[i] === undefined) {
          arr.splice(i, 1);
          len--;
          i--;
        }
      }
      return arr;
    },
    praise(item, index) {
      console.log("赞");
      let me = this;
      if (me.user != "") {
        var praise = document.getElementsByClassName("fa fa-heart");
        console.log(praise);
        var currentUsername = me.user.username;
        var str;
        console.log("颜色:");
        console.log(praise[index].style.color);
        if (praise[index].style.color == "rgb(51, 51, 51)") {
          //点赞
          item.likeMan = currentUsername + "-" + item.likeMan; //当前用户的名字与之前点赞的拼接。
          item.praise = item.praise + 1;
          praise[index].style.color = "rgb(240, 86, 84)";
          console.log("变红");
          console.log(item.likeMan);
          //插入消息
        } else {
          //取消赞
          item.likeMan = item.likeMan.replace(currentUsername + "-", "");
          item.praise = item.praise - 1;
          praise[index].style.color = "rgb(51, 51, 51)";
          console.log("变回");
          console.log(item.likeMan);
        }
        me.$axios
          .get("/BookComment/updateCommentPraise", {
            params: {
              likes: item.praise,
              likeMan: item.likeMan,
              id: item.id
            }
          })
          .then(res => {
            console.log(res.data);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.$alert("请先登陆", "提示", {
          confirmButtonText: "确定"
        });
      }
    },
    buy(item) {
      let me = this;
      if (me.user.id != null) {
        me.ballFlag = true;
        me.$axios
          .get("/updateBookCarFromDetail", {
            params: {
              userId: me.user.id,
              bookId: item.id,
              title: item.title,
              picUrl: item.picUrl,
              price: item.price,
              number: 1,
              bookTypeBig: item.bookTypeBig
            }
          })
          .then(res => {
            console.log(res.data);
            me.$refs.utilHead.countBookCarByUserId();
            if (res.data >= 1) {
              this.$notify({
                type: "success",
                message: "成功添加购物车",
                offset: 200
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.$alert("请先登陆", "提示", {
          confirmButtonText: "确定"
        });
      }
    },
    userListen(value) {
      this.user = value;
      this.judgeCommentBoxShow();
      this.judgePraise();
    },
    beforeEnter(el) {
      el.style.transform = "translate(200px,510px)";
    },
    enter(el, done) {
      el.offsetWidth;
      el.style.transform = "translate(700px, 0px)";
      el.style.transition = "all 1.5s cubic-bezier(0.49, -0.29, 0.75, -0.41)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    getBookTopTen() {
      let me = this;
      me.$axios
        .get("/queryBookTopTen", {})
        .then(res => {
          console.log("书籍评分Top10：");
          console.log(res.data);
          me.bookTopTen = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getBookDetail() {
      let me = this;
      me.$axios
        .get("/queryBookById", {
          params: {
            id: me.bookId
          }
        })
        .then(res => {
          console.log("书籍详情：");
          console.log(res.data);
          me.book = res.data;
          me.queryTheSameKindBooks();
          me.getComments();
        })
        .catch(error => {
          console.log(error);
        });
    },
    queryTheSameKindBooks() {
      let me = this;
      console.log("此书的类型：");
      console.log(me.book.bookType);
      me.$axios
        .get("/queryBookByType", {
          params: {
            bookType: me.book.bookType
          }
        })
        .then(res => {
          console.log("同类型的书：");
          console.log(res.data);
          me.theSameBooks = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleChange(val) {
      console.log(val);
    },
    picHandChange(file, fileList) {
      let me = this;
      console.log("数量");
      console.log(fileList.length);
      me.fileList = fileList;
    },
    addZero(num) {
      if (parseInt(num) < 10) {
        num = "0" + num;
      }
      return num;
    },
    getMyDate(str) {
      let me = this;
      var oDate = new Date(str),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth() + 1,
        oDay = oDate.getDate(),
        oHour = oDate.getHours(),
        oMin = oDate.getMinutes(),
        oSen = oDate.getSeconds(),
        oTime =
          oYear +
          "-" +
          me.addZero(oMonth) +
          "-" +
          me.addZero(oDay) +
          " " +
          me.addZero(oHour) +
          ":" +
          me.addZero(oMin) +
          ":" +
          me.addZero(oSen);
      return oTime;
    },
    getComments() {
      let me = this;
      me.$axios
        .get("/BookComment/queryBookComments", {
          params: {
            bookId: me.book.id,
            pageNum: me.CommentParams.pageNum,
            pageSize: me.CommentParams.pageSize
          }
        })
        .then(res => {
          me.CommentParams.total = res.data.total;
          // me.CommentParams.pageNum = res.data.pageNum;
          // me.CommentParams.pageSize = res.data.pageSize;后两条无用

          // console.log(JSON.stringify(res))
          console.log("评论的返回值：");
          console.log(res);
          me.commentList = res.data.list;
          console.log("me.commentList:");
          console.log(me.commentList);
          for (var i in me.commentList) {
            me.commentList[i].createTime = me.getMyDate(
              me.commentList[i].createTime
            );
          }
          this.$nextTick(function() {
            me.judgePraise();
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    submitUpload(fileList) {
      let me = this;
      console.log("me.fileList.length:");
      console.log(me.fileList.length);
      if (me.textarea != "" && me.userStar != 0) {
        if (me.fileList.length) {
          me.$refs.upload.submit();
        } else {
          console.log(123);
          me.$axios
            .get("/BookComment/insertBookComment", {
              params: {
                dadId: me.book.id,
                uid: me.user.id,
                uname: me.user.username,
                icon: me.user.icon,
                content: me.textarea,
                star: me.userStar,
                createTime: me.getNowFormatDate()
              }
            })
            .then(res => {
              console.log(res.data);
              me.textarea = "";
              me.userStar = 0;
              me.getComments();
              this.$message({
                type: "success",
                message: "评论成功！",
                duration: 6000
              });
            })
            .catch(error => {
              console.log(error);
            });
        }
      } else {
        this.$notify.error({
          title: "错误",
          message: "请输入评论内容和选择星级！",
          position: "bottom-left"
        });
      }
    },

    handleSuccess(res, file) {
      let me = this;
      console.log(res);
      console.log(file);
      console.log("res.path:" + res.path);
      me.fileList = [];
      me.picLocation = res.path;
      me.$axios
        .get("/BookComment/insertBookComment", {
          params: {
            dadId: me.book.id,
            uid: me.user.id,
            uname: me.user.username,
            icon: me.user.icon,
            content: me.textarea,
            star: me.userStar,
            pic: me.picLocation,
            createTime: me.getNowFormatDate()
          }
        })
        .then(res => {
          console.log(res.data);
          me.textarea = "";
          me.userStar = 0;
          me.fileList = [];
          me.getComments();
          this.$message({
            type: "success",
            message: "评论成功！",
            duration: 6000
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    //传递每页多少条数
    handleSizeChange(val) {
      console.log(`当前页: ${val}`);
      let me = this;
      me.CommentParams.pageSize = val;
      me.getComments();
    },
    //传递当前页
    handleCurrentChange(val) {
      console.log(782);
      console.log(`当前页: ${val}`);
      let me = this;
      me.CommentParams.pageNum = val;
      me.getComments();
    },
    handleRemove(file, fileList) {
      let me = this;
      console.log("数量");
      console.log(fileList.length);
      me.fileList = fileList;
      this.$message({
        type: "info",
        message: "已删除原有图片",
        duration: 6000
      });
    },
    handlePreview(file) {
      console.log(file);
    },
    btnClick() {
      let me = this;
      console.log("----------------------");
      if (me.user.id != null) {
        me.ballFlag = true;
        me.$axios
          .get("/updateBookCarFromDetail", {
            params: {
              userId: me.user.id,
              bookId: me.book.id,
              title: me.book.title,
              picUrl: me.book.picUrl,
              price: me.book.price,
              number: me.buyNum,
              bookTypeBig: me.book.bookTypeBig
            }
          })
          .then(res => {
            console.log(res.data);
            me.$refs.utilHead.countBookCarByUserId();
            if (res.data >= 1) {
              this.$notify({
                type: "success",
                message: "成功添加购物车",
                offset: 200
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.$alert("请先登陆", "提示", {
          confirmButtonText: "确定"
        });
      }
    },
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        date.getHours() +
        seperator2 +
        date.getMinutes() +
        seperator2 +
        date.getSeconds();
      return currentdate;
    }
  }
};
</script>

<style scope>
.el-tooltip__popper {
  max-width: 400px;
  line-height: 180%;
}
#main {
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
  height: 74rem;
  width: 96rem;
}

#BookDetail {
  height: 42rem;
}

#BookImg {
  height: 40rem;
  width: 25%;
  margin-left: 5rem;
  float: left;
}

#BookShop {
  width: 48%;
  height: 40rem;
  float: left;
}

#SthElse {
  width: 15%;
  height: 40rem;
  margin-right: 5rem;
  float: right;
}

.Book_Img {
  width: 100%;
  height: 100%;
}

#ImgSize {
  margin-left: -3rem;
  width: 24rem;
  height: 32rem;
}
#BookDesc {
  width: 100%rem;
  height: 10rem;
  overflow: hidden;
}
#btnFade1 {
  margin-left: 0.5rem;
  margin-top: -2rem;
  width: 3rem;
  height: 2rem;
}
#BookName {
  margin-left: 7rem;
  margin-top: -1.5rem;
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
#ad {
  font-size: 1.4em;
  margin-left: -15rem;
}
#BookInfo {
  height: 5rem;
}
#BookInfo_left {
  width: 18rem;
  float: left;
}
#BookInfo_right {
  width: 18rem;
  float: right;
  height: 4rem;
  margin-right: 6rem;
}
#btn-fade2 {
  width: 8rem;
  margin-top: -5.4rem;
  margin-left: 6rem;
}
#buy {
  margin-top: 1rem;
  height: 9rem;
  width: 100%;
}
#btnShiney {
  position: relative;
  height: 1rem;
  margin-top: -2rem;
  margin-left: -10rem;
  float: left;
}
#BookDescribe {
  width: 100%;
  height: 3.3rem;
  /* 超出省略号代替 */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
#buyNow {
  width: 12rem;
  height: 4.4rem;
  margin-top: 1.9rem;
  margin-right: 8rem;
  font-family: 黑体;
  font-size: 1.6em;
  float: right;
}
#comment_recommend {
  width: 88rem;
  margin-left: auto;
  margin-right: auto;
  /* overflow:hidden */
}
#recommend {
  height: 4rem;
  width: 28%;
  float: left;
}
#comment {
  height: 4rem;
  margin-right: 2rem;
  width: 68%;
  float: right;
}
.userIcon {
  margin-left: auto;
  margin-right: auto;
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
}
.user {
  margin-top: 1rem;
  margin-right: -5rem;
  height: 9rem;
  width: 16rem;
  float: right;
}
.userComment {
  width: 39rem;
  max-height: 2.7rem;
  float: left;
  margin-left: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
#BookImage {
  width: 100%;
  height: 100%;
}
.ball {
  width: 30px;
  height: 30px;
  position: absolute;
  border-radius: 50%;
  background: rgb(255, 0, 0);
  z-index: 9999;
}
</style>
