<template>
  <div id="container">
    <div id="context">
      <util-head style="margin-top:0.1rem;" ref="utilHead" @user="userListen"></util-head>
      <div class="navigation">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-submenu index="1">
            <template slot="title">全部商品分类</template>
            <el-submenu index="1-1">
              <template slot="title">科技</template>
              <router-link target="_blank" :to="{path:'/kind',query:{ kind:'UCD'}}">
                <el-menu-item index="1-1-1">UCD</el-menu-item>
              </router-link>
              <router-link target="_blank" :to="{path:'/kind',query:{ kind:'web'}}">
                <el-menu-item index="1-1-2">web</el-menu-item>
              </router-link>
              <router-link target="_blank" :to="{path:'/kind',query:{ kind:'互联网'}}">
                <el-menu-item index="1-1-3">互联网</el-menu-item>
              </router-link>
              <router-link target="_blank" :to="{path:'/kind',query:{ kind:'算法'}}">
                <el-menu-item index="1-1-4">
                  更多
                  <i class="el-icon-d-arrow-right"></i>
                </el-menu-item>
              </router-link>
            </el-submenu>
            <el-submenu index="1-2">
              <template slot="title">经管</template>
              <router-link target="_blank" :to="{path:'/kind',query:{ kind:'企业史'}}">
                <el-menu-item index="1-2-1">企业史</el-menu-item>
              </router-link>
              <router-link target="_blank" :to="{path:'/kind',query:{ kind:'创业'}}">
                <el-menu-item index="1-2-2">创业</el-menu-item>
              </router-link>
              <router-link target="_blank" :to="{path:'/kind',query:{ kind:'商业'}}">
                <el-menu-item index="1-2-3">商业</el-menu-item>
              </router-link>
              <router-link target="_blank" :to="{path:'/kind',query:{ kind:'金融'}}">
                <el-menu-item index="1-2-4">
                  更多
                  <i class="el-icon-d-arrow-right"></i>
                </el-menu-item>
              </router-link>
            </el-submenu>
            <el-submenu index="1-3">
              <template slot="title">生活</template>
              <router-link target="_blank" :to="{path:'/kind',query:{ kind:'两性'}}">
                <el-menu-item index="1-3-1">两性</el-menu-item>
              </router-link>
              <router-link target="_blank" :to="{path:'/kind',query:{ kind:'人际关系'}}">
                <el-menu-item index="1-3-2">人际关系</el-menu-item>
              </router-link>
              <router-link target="_blank" :to="{path:'/kind',query:{ kind:'健康'}}">
                <el-menu-item index="1-3-3">健康</el-menu-item>
              </router-link>
              <router-link target="_blank" :to="{path:'/kind',query:{ kind:'美食'}}">
                <el-menu-item index="1-3-4">
                  更多
                  <i class="el-icon-d-arrow-right"></i>
                </el-menu-item>
              </router-link>
            </el-submenu>
            <el-submenu index="1-4">
              <template slot="title">文化</template>
              <router-link target="_blank" :to="{path:'/kind',query:{ kind:'中国历史'}}">
                <el-menu-item index="1-4-1">中国历史</el-menu-item>
              </router-link>
              <router-link target="_blank" :to="{path:'/kind',query:{ kind:'人物传记'}}">
                <el-menu-item index="1-4-2">人物传记</el-menu-item>
              </router-link>
              <router-link target="_blank" :to="{path:'/kind',query:{ kind:'军事'}}">
                <el-menu-item index="1-4-3">军事</el-menu-item>
              </router-link>
              <router-link target="_blank" :to="{path:'/kind',query:{ kind:'国学'}}">
                <el-menu-item index="1-4-4">
                  更多
                  <i class="el-icon-d-arrow-right"></i>
                </el-menu-item>
              </router-link>
            </el-submenu>
            <el-submenu index="1-5">
              <template slot="title">流行</template>
              <router-link target="_blank" :to="{path:'/kind',query:{ kind:'J.K.罗琳'}}">
                <el-menu-item index="1-5-1">J.K.罗琳</el-menu-item>
              </router-link>
              <router-link target="_blank" :to="{path:'/kind',query:{ kind:'奇幻'}}">
                <el-menu-item index="1-5-2">奇幻</el-menu-item>
              </router-link>
              <router-link target="_blank" :to="{path:'/kind',query:{ kind:'悬疑'}}">
                <el-menu-item index="1-5-3">悬疑</el-menu-item>
              </router-link>
              <router-link target="_blank" :to="{path:'/kind',query:{ kind:'科幻小说'}}">
                <el-menu-item index="1-5-4">
                  更多
                  <i class="el-icon-d-arrow-right"></i>
                </el-menu-item>
              </router-link>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">新书上架</el-menu-item>
          <el-menu-item index="3">主编推荐及分类</el-menu-item>
        </el-menu>
        <!--轮播图-->
        <div>
          <el-carousel :interval="2000" type="card" height="300px">
            <el-carousel-item v-for="item in imgs" :key="item.key">
              <img :src="item.src" class="show">
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <!-- 商品展示 -->
      <div id="goods">
        <img src="../../static/6.png" id="2">
        <div class="goods-show">
          <div v-for="newbook in newbooks" :key="newbook.id">
            <el-badge value="new" class="new-badge"></el-badge>
            <el-tooltip class="item" effect="dark" :content="newbook.title" placement="right">
              <el-card
                style="width:180px;height:280px;margin-right:50px;"
                :body-style="{ padding: '0px'} "
              >
                <router-link target="_blank" :to="'/BookDetail/' + newbook.id">
                  <img
                    :src="'http://localhost:8080/user/getImages?path='+newbook.picUrl"
                    class="image"
                  >
                </router-link>
                <div style="padding: 14px;">
                  <div class="title">{{newbook.title}}</div>
                  <div class="price">¥{{newbook.price}}</div>
                  <el-button type="text" class="button" @click="insertBookCar(newbook)">加入购物车</el-button>
                </div>
              </el-card>
            </el-tooltip>
            <br>
          </div>
        </div>
        <div>
          <!--分页工具条-->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="newbooksParams.pageNum"
            :page-size="newbooksParams.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="newbooksParams.total"
          ></el-pagination>
        </div>
        <div class="goods-classify" id="3">
          <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="主编推荐" name="first">
              <div class="books-show">
                <div v-for="book in books" :key="book.id" style="margin-top:15px;">
                  <el-tooltip class="item" effect="dark" :content="book.title" placement="right">
                    <el-card
                      style="width:180px;height:280px;margin-right:50px;"
                      :body-style="{ padding: '0px'} "
                    >
                      <router-link target="_blank" :to="'/BookDetail/' + book.id">
                        <img
                          :src="'http://localhost:8080/user/getImages?path='+book.picUrl"
                          class="image"
                        >
                      </router-link>
                      <div style="padding: 14px;">
                        <div class="title">{{book.title}}</div>
                        <div class="price">¥{{book.price}}</div>
                        <el-button type="text" class="button" @click="insertBookCar(book)">加入购物车</el-button>
                      </div>
                    </el-card>
                  </el-tooltip>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane v-for="kind in kinds" :key="kind.id" :label="kind" style="font-size:15px;">
              <div class="books-show">
                <div v-for="book in books" :key="book.id" style="margin-top:15px;">
                  <el-tooltip class="item" effect="dark" :content="book.title" placement="right">
                    <el-card
                      style="width:180px;height:280px;margin-right:50px;"
                      :body-style="{ padding: '0px'} "
                    >
                      <router-link target="_blank" :to="'/BookDetail/' + book.id">
                        <img
                          :src="'http://localhost:8080/user/getImages?path='+book.picUrl"
                          class="image"
                        >
                      </router-link>
                      <div style="padding: 14px;">
                        <div class="title">{{book.title}}</div>
                        <div class="price">¥{{book.price}}</div>
                        <el-button type="text" class="button" @click="insertBookCar(book)">加入购物车</el-button>
                      </div>
                    </el-card>
                  </el-tooltip>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
          <div>
            <el-pagination
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :current-page="booksParams.pageNum"
              :page-size="booksParams.pageSize"
              layout="total,prev, pager, next, jumper"
              :total="booksParams.total"
            ></el-pagination>
          </div>
        </div>
      </div>
      <div class="foot">
        <div class="foot-img">
          <img src="../../static/9.png">
        </div>
        <div class="foot-about">
          <ul>
            <li>
              <i class="el-icon-phone"></i>关注我们
              <img src="../../static/L.png">
            </li>
            <li>
              <i class="el-icon-info"></i>关于我们
              <img src="../../static/w.png">
            </li>
            <li>
              <i class="el-icon-star-on"></i>赞赏
              <img src="../../static/c.jpg">
            </li>
          </ul>
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
      activeName: "first", //分类默认显示的种类
      activeIndex: "1",
      input: "", //输入的查询内容
      place: "", //送货地点
      imgs: [
        //默认图片
        { src: "../../static/1.png", key: 1 },
        { src: "../../static/2.png", key: 2 },
        { src: "../../static/3.jpg", key: 3 },
        { src: "../../static/4.jpg", key: 4 }
      ],
      newbooks: [], //新书推荐
      newbooksParams: {
        //新书推荐分页参数
        pageNum: 1, //当前页
        total: 0, //总量
        pageSize: 10 //每页大小
      },
      books: [], //分类书籍
      booksParams: {
        //分类书籍分页参数
        pageNum: 1,
        total: 0,
        pageSize: 15
      },
      kinds: [],
      currentlabel: "主编推荐", //当前展示的类别
      user:[],
    };
  },
  created() {
    this.getnewbooks();
    this.selectByBigKind();
    this.getBooksByKind("主编推荐");
  },

  methods: {
    userListen(value){
      this.user=value
    },
    selectByBigKind() {
      //查询有哪些分类
      var url = "http://localhost:8080/selectByBigKind";
      this.$axios
        .get(url)
        .then(res => {
          // console.log(res)
          this.kinds = res.data;
          console.log("kinds");
          console.log(this.kinds);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getnewbooks() {
      //新书推荐
      var url = "http://localhost:8080/selectByNewRecommend";
      this.$axios
        .get(url, {
          params: {
            pageNum: this.newbooksParams.pageNum,
            pageSize: this.newbooksParams.pageSize
          }
        })
        .then(res => {
          // console.log(res)
          this.newbooks = res.data.list;
          this.newbooksParams.total = res.data.total;
          console.log("newbooks");
          console.log(this.newbooks);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getBooksByKind(kind) {
      //根据种类查询书籍

      let postData = {
        kind: kind,
        pageNum: this.booksParams.pageNum,
        pageSize: this.booksParams.pageSize
      };
      var url = "http://localhost:8080/getBooksByKind";
      this.$axios({
        method: "post",
        url: url,
        data: postData
      })
        .then(res => {
          // console.log(res)
          this.books = res.data.list;
          this.booksParams.total = res.data.total;
          console.log("books");
          console.log(this.books);
        })
        .catch(error => {
          console.log(error);
        });
    },
    //跳转
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if (key == 2 || key == 3) {
        document.getElementById(key).scrollIntoView();
      }
    },
    handleSearch(val) {},
    //分页   开始
    handleSizeChange(val) {
      this.newbooksParams.pageSize = val;
      this.getnewbooks();
    },
    handleCurrentChange(val) {
      this.newbooksParams.pageNum = val;
      this.getnewbooks();
    },
    handleSizeChange1(val) {
      this.booksParams.pageSize = val;
      this.getBooksByKind(this.currentlabel);
    },
    handleCurrentChange1(val) {
      this.booksParams.pageNum = val;
      this.getBooksByKind(this.currentlabel);
    },
    //分页   结束
    //点击不同分类进行查询
    handleClick(tab, event) {
      console.log(tab, event);
      console.log(tab.label);
      this.currentlabel = tab.label;
      console.log(this.currentlabel);
      this.getBooksByKind(tab.label);
    },
    //添加到购物车
    insertBookCar(book) {
      console.log("insertBookCar");
      console.log(book);
      if(this.user.id!=null){
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
            offset:200
          }),
            //修改子组件中的值
            this.$refs.utilHead.countBookCarByUserId();
        }
      });
      }
      else{
        this.$alert('请先登陆','提示',{
          confirmButtonText:'确定'
        })
      }

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
.navigation {
  position: relative;
  height: 400px;
  width: 1200px;
  left: 300px;
  top: 20px;
  /* border: 1px solid black; */
}
.show {
  height: 300px;
  width: 600px;
}
#goods {
  position: relative;
  width: 1200px;
  height: auto;
  left: 300px;
}
#goods img {
  position: relative;
  right: 220px;
}
/*商品展示样式*/
.button {
  padding: 0;
  float: right;
  margin-top: 12px;
  font-size: 15px;
}
.image {
  position: relative;
  top: 10px;
  left: 0px;
  width: 180px;
  height: 200px;
  display: block;
}
.title {
  font-size: 13px;
  overflow: hidden;
  height: 20px;
}
.price {
  padding-top: 10px;
  float: left;
  font-size: 15px;
  color: red;
}
.goods-classify {
  margin-top: 20px;
}
.goods-show {
  display: flex; /*弹性布局*/
  flex-wrap: wrap; /*默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap属性定义，如果一条轴线排不下，如何换行*/
  width: 1200px;
  overflow: hidden;
}
.new-badge {
  position: relative;
  z-index: 2;
  top: 20px;
  left: 60px;
}
.books-show {
  display: flex;
  flex-wrap: wrap;
}
/*商品展示样式结束*/
.foot {
  padding-top: 20px;
  height: auto;
  width: 1800px;
}
.foot-img img {
  width: 100%;
  cursor: pointer; /*光标呈现为指示链接的指针*/
}
.foot-about {
  font-size: 20px;
  height: 200px;
}
.foot-about img {
  width: 150px;
  height: 150px;
}
.foot-about ul {
  margin: 0px;
  height: 200px;
  padding-left: 250px;
}
.foot-about li {
  display: block;
  /* padding-right: 220px; */
  float: left;
  margin-left: 11rem;
  height: 200px;
  width: 200px;
}
</style>

<style>
.el-tabs__item.is-top {
  font-size: 15px;
}
.el-tabs__item.is-top.is-active {
  font-size: 18px;
}
</style>
