<template>
  <div id="content">
    <!-- 自定义组件传值-->
    <!-- <info-head ref="infoHead" :address="address" @update="val=>address=val"></info-head>  -->
    <info-head ref="infoHead" @user="userListen"></info-head>
    <div class="head">
      <a href="https://www.baidu.com" target="_blank">
        <img src="../../static/10.png">
      </a>
    </div>
    <!-- 操作步骤 -->
    <div class="steps">
      <el-steps :active="currentStep" finish-status="success" simple style="margin-top: 20px">
        <el-step title="我的购物车"></el-step>
        <el-step title="填写订单"></el-step>
        <el-step title="完成订单"></el-step>
      </el-steps>
    </div>

    <!-- 购物车表信息展示 -->
    <div id="shop-table" v-if="showShopTable">
      <!-- 简写配送地址 -->
      <div class="send-place">
        <ul class="send-info" style=" width:30rem;">
          <li>
            <img src="../../static/car.png">
          </li>
          <li>配送地址:</li>
          <li>
            <el-cascader :options="options" change-on-select v-model="orderForm.place"></el-cascader>
          </li>
        </ul>
      </div>
      <!-- 空购物车展示 -->
      <div class="no-shops" v-if="tableData.length==0">
        <img src="../../static/11.png">
        <h3>您的购物车还是空的，您可以:</h3>
        <el-button
          v-if="user.id==null"
          type="danger"
          style="width:200px;font-size:20px;"
          @click="goLogin()"
        >立即登陆</el-button>
        <el-button v-else type="danger" style="width:200px;font-size:20px;" @click="goIndex()">去逛逛</el-button>
      </div>
      <!-- 购物车展示 -->
      <div class="my-shops" v-if="tableData.length!=0">
        <el-table
          v-loading="loading"
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="80"></el-table-column>
          <el-table-column prop="date" label="日期" width="150"></el-table-column>
          <el-table-column label="商品信息" width="200">
            <template slot-scope="scope">
              <router-link :to="'/BookDetail/' + scope.row.bookId">
                <img
                  :src="'http://localhost:8080/user/getImages?path='+scope.row.picUrl"
                  style="width:100px;height:150px;"
                >
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="商品名称" width="200" show-overflow-tooltip></el-table-column>
          <el-table-column label="单价(元)" width="150">
            <template slot-scope="scope">
              <span>¥ {{scope.row.price}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="number" label="数量" width="180">
            <template slot-scope="scope">
              <el-input-number
                size="mini"
                v-model="scope.row.number"
                :min="1"
                @change="handleNumChange(scope.row)"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="金额" width="120">
            <template slot-scope="scope">
              <span style="color:red;">¥ {{scope.row.pricetotal}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="danger" size="small" @click="deleteMyShop(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="bookCarParams.pageNum"
            :page-size="bookCarParams.pageSize"
            layout="total,prev, pager, next, jumper"
            :total="bookCarParams.total"
          ></el-pagination>
        </div>
        <div style="margin-top: 20px">
          <div class="operateInfo">
            <el-button type="text" style="font-size:16px;float:left;" @click="open">批量删除</el-button>
            <span>已选择{{multipleSelection.length}}件商品</span>
            <ul class="count">
              <li>总计:</li>
              <li style="color:red;font-size:25px;">¥{{payMoney}}</li>
            </ul>
          </div>
          <el-button
            style="width:100px;height:50px;font-size:20px;position:relative;left:600px;margin-top:20px;"
            type="danger"
            :disabled="payFlag"
            @click="goOrderTable"
          >结 算</el-button>
        </div>
      </div>

      <!-- 推荐商品信息 -->
      <div class="recommend">
        <h3 style="back">根据购物车中的商品为您推荐</h3>
        <div class="my-recommend">
          <div v-for="book in recommendBook" :key="book.id" style="margin-top:15px;">
            <el-tooltip class="item" effect="dark" :content="book.title" placement="right">
              <el-card
                style="width:180px;height:280px;margin-right:50px;"
                :body-style="{ padding: '0px'} "
              >
              <router-link :to="'/BookDetail/' + book.id">
                <img :src="'http://localhost:8080/user/getImages?path='+book.picUrl" class="image">
              </router-link>
                <div style="padding: 14px;">
                  <div class="title">{{book.title}}</div>
                  <div class="price">¥{{book.price}}</div>
                  <div class="score">
                    <i class="el-icon-star-off"></i>
                    {{book.score}}
                  </div>
                </div>
              </el-card>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
    <!-- 订单表信息展示 -->
    <el-dialog
      title="填写收货地址"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
      width="30%"
    >
      <el-form :model="orderForm" status-icon :rules="rules" ref="orderForm" label-width="100px">
        <el-form-item label="收货人" prop="name" style="width:400px;">
          <el-input v-model="orderForm.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone" style="width:400px;">
          <el-input v-model="orderForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="所在地区" prop="place" style="width:300px;">
          <el-cascader :options="options" change-on-select v-model="orderForm.place"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address" style="width:400px;">
          <el-input v-model="orderForm.address"></el-input>
        </el-form-item>
        <el-form-item>
          <router-link
            :to="{name:'shopSuccess',params:{totalMoney:payMoney,totalShops:multipleSelection}}"
          >
            <el-button type="primary" @click="submitForm()">提交订单</el-button>
          </router-link>
          <el-button @click="resetForm()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 完成订单显示界面 -->
    <router-view v-if="showShopSuccess" style="position:relative;top:100px;"></router-view>
  </div>
</template>

<script>
import infoHead from "../components/infohead.vue";
import global_ from "../common/global.vue";
export default {
  components: {
    infoHead
  },
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号码不能为空！"));
      }
      setTimeout(() => {
        if (value.match(/^1[3|4|5|8][0-9]\d{4,8}$/) == null) {
          callback(new Error("请正确填写手机号码！"));
        } else {
          callback();
        }
      }, 500);
    };
    return {
      address: "",
      currentStep: 0, //当前步骤
      options: global_.options, //将引入的组件值传过来
      tableData: [],
      bookCarParams: {
        pageNum: 1, //当前页
        total: 0, //总量
        pageSize: 5 //每页大小
      },
      multipleSelection: [], //多选数组
      // payMoney:0,//总计金额
      loading: false, //是否加载
      payFlag: true, //是否能够支付,开启支付禁用
      dialogFormVisible: false, //是否弹出订单界面
      showShopTable: true, //是否显示购物车界面
      orderForm: {
        // 订单表单
        name: "",
        phone: "",
        place: [],
        address: ""
      },
      rules: {
        //要求规则
        name: [
          { required: true, message: "请输入收货人名称", trigger: "blur" }
        ],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        place: [{ required: true, message: "请输入所在地区", trigger: "blur" }],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ]
      },
      recommendBook: [],
      showShopSuccess: false,
      user: []
    };
  },
  watch: {
    address() {
      console.log("address");
      console.log(this.address);
    },
    tableData() {
      if (this.tableData.length != 0) {
        this.selectByBookCar();
      } else {
        this.recommendBook = [];
      }
    }
  },
  computed: {
    payMoney: function() {
      let total = 0;
      let me = this;
      //循环数组，计算总计金额
      for (let i = 0; i < me.multipleSelection.length; i++) {
        total += me.multipleSelection[i].pricetotal;
      }
      if (me.multipleSelection.length > 0) {
        me.payFlag = false; //关闭支付禁用
      } else {
        me.payFlag = true; //开启支付禁用
      }
      return total;
    }
  },
  created() {
    // this.$refs.infoHead.getThisUser();
  },
  methods: {
    goLogin() {
      this.$router.push({
        name: "login"
      });
    },
    userListen(value) {
      this.user = value;
      console.log("aaaaaaaaaaa");
      console.log(this.user);
      this.getbookCar();
    },
    addZero(num) {
      //时间转换
      if (parseInt(num) < 10) {
        num = "0" + num;
      }
      return num;
    },
    getMyDate(str) {
      //时间转换
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
    getbookCar() {
      //获取购物车信息
      var url = "http://localhost:8080/selectBookCarByUserId";
      let postData = {
        userId: this.user.id,
        pageNum: this.bookCarParams.pageNum,
        pageSize: this.bookCarParams.pageSize
      };
      this.$axios({
        method: "post",
        url: url,
        data: postData
      })
        .then(res => {
          console.log(res);
          this.tableData = [];
          for (var i = 0; i < res.data.list.length; i++) {
            this.tableData.push({
              id: res.data.list[i].id,
              bookId: res.data.list[i].bookId,
              number: res.data.list[i].number,
              picUrl: res.data.list[i].picUrl,
              price: res.data.list[i].price,
              title: res.data.list[i].title,
              date: this.getMyDate(res.data.list[i].createTime),
              pricetotal: res.data.list[i].price * res.data.list[i].number
            });
          }
          this.bookCarParams.total = res.data.total;
          // this.bookCarParams.pageNum=res.data.pageNum
          // this.bookCarParams.pageSize=res.data.pageSize
          console.log("bookCar");
          console.log(this.tableData);
        })
        .catch(error => {
          console.log(error);
        });
    },
    open() {
      //批量删除商品
      this.$confirm("您确定要批量删除商品吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (this.multipleSelection.length > 0) {
            let deleteIds = [];
            for (var i = 0; i < this.multipleSelection.length; i++) {
              deleteIds.push(this.multipleSelection[i].id);
            }
            // console.log(deleteIds)
            var url = "http://localhost:8080/deleteBookCarById";
            this.loading = true;
            //调用后台接口，批量删除选中的商品
            this.$axios
              .get(url, {
                params: {
                  deleteId: deleteIds
                },
                paramsSerializer: params => {
                  return this.$qs.stringify(params, { indices: false });
                }
              })
              .then(res => {
                console.log("删除成功");
                this.loading = false;
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getbookCar();
              });
          } else {
            this.$message({
              type: "success",
              message: "删除成功"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    deleteMyShop(index, row) {
      //删除单件商品
      let postData = {
        deleteId: row.id
      };
      var url = "http://localhost:8080/deleteBookCarById";
      this.$confirm("您确定要删除商品吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.loading = true;
          //调用后台接口删除数据
          this.$axios({
            method: "post",
            url: url,
            data: postData
          }).then(res => {
            this.loading = false;
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getbookCar();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSelectionChange(val) {
      //多选触发事件
      this.multipleSelection = val;
      console.log("handleSelectionChange");
      console.log(this.multipleSelection);
    },
    goOrderTable() {
      //打开弹窗进入订单界面
      this.currentStep = 1;
      this.dialogFormVisible = true;
    },
    submitForm() {
      //提交订单信息
      this.$refs["orderForm"].validate(valid => {
        if (valid) {
          this.$message({
            message: "提交成功",
            type: "success"
          });
          this.dialogFormVisible = false;
          this.showShopTable = false;
          this.currentStep = 3;
          this.showShopSuccess = true;
        } else {
          this.$message({
            message: "提交失败",
            type: "error"
          });
          return false;
        }
      });
    },
    resetForm() {
      //取消订单，重置表单
      this.$confirm("确认关闭?")
        .then(() => {
          this.$refs["orderForm"].resetFields();
          this.dialogFormVisible = false;
          this.currentStep = 0;
        })
        .catch(() => {});
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
          this.$refs["orderForm"].resetFields();
          this.currentStep = 0;
        })
        .catch(_ => {});
    },
    handleSizeChange(val) {
      this.bookCarParams.pageSize = val;
      this.getbookCar();
    },
    handleCurrentChange(val) {
      this.bookCarParams.pageNum = val;
      this.getbookCar();
    },
    handleNumChange(row) {
      console.log(row);
      var url = "http://localhost:8080/updateBookCarByNum";
      let postData = {
        number: row.number,
        userId: this.user.id,
        bookId: row.bookId
      };
      this.$axios({
        method: "post",
        url: url,
        data: postData
      }).then(res => {
        console.log("NumChangeOk");
        this.getbookCar();
      });
    },
    selectByBookCar() {
      //推荐商品
      var url = "http://localhost:8080/selectByBookCar";
      this.$axios.get(url).then(res => {
        // console.log(res)
        this.recommendBook = res.data;
        console.log("recommendBook");
        console.log(this.recommendBook);
      });
    },
    goIndex() {
      this.$router.push({
        name: "index"
      });
    },
    updateBookCarByStauts(id) {
      var url = "http://localhost:8080/updateBookCarByStauts";
      this.$axios();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#content {
  position: relative;
  width: 1800px;
  height: auto;
  /* border: 1px solid black; */
}
.head {
  position: relative;
  top: 40px;
  left: 300px;
  width: 1200px;
}
.steps {
  position: relative;
  top: 40px;
}
.send-place {
  position: relative;
  top: 40px;
  width: 1800px;
  margin-top: 10px;
  background-color: rgb(226, 225, 225);
}
.send-info {
  position: relative;
  left: 400px;
  width: 350px;
}
.send-info img {
  padding-top: 15px;
  width: 45px;
  height: 35px;
}
.send-info li {
  display: inline-block;
}
.my-shops {
  position: relative;
  top: 50px;
  width: 1200px;
  height: auto;
  left: 350px;
}
.deleteBySelect {
  width: 60px;
  height: 40px;
}
.operateInfo {
  height: 50px;
}
.count {
  float: right;
  margin-right: 60px;
}
.count li {
  display: inline;
}
.recommend {
  position: relative;
  top: 100px;
  /* border: 1px solid red; */
  width: 1200px;
  left: 320px;
}
.recommend h3 {
  width: 300px;
  height: 30px;
}
.my-recommend {
  display: flex; /*弹性布局*/
  flex-wrap: wrap; /*默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap属性定义，如果一条轴线排不下，如何换行*/
  margin-left: 40px;
}
.image {
  position: relative;
  top: 10px;
  left: 0px;
  width: 180px;
  height: 200px;
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
.score {
  padding-top: 10px;
  margin-right: 5px;
  float: right;
  font-size: 16px;
  color: darkgoldenrod;
}
.no-shops {
  position: relative;
  top: 50px;
}
.no-shops img {
  width: 500px;
  height: 300px;
}
</style>
