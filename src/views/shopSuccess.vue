<template>
  <div id="container">
      <div class="shop-success">
        <img src="../../static/12.png">
         <div class="success-info">订单已提交，我们会尽快安排发货</div>
       </div>
       <ul class="total-money">
         <li>应付总金额:</li>
         <li style="color:red;">¥{{totalMoney}}</li>
       </ul>
       <el-button type="danger" style="width:120px;height:60px;font-size:18px;margin-right:80px;" @click="goIndex">继续购物</el-button>
       <el-button type="danger" style="width:130px;height:60px;font-size:18px;" @click="selectBookCarByPayed">查看已购买</el-button>

    <el-dialog title="已购买" :visible.sync="dialogTableVisible" style="width:1800px;">
      <el-table :data="payed" height="250" border style="width:850px;" :default-sort="{prop:'createTime',order:'descending'}">
        <el-table-column prop="createTime" label="日期" sortable width="200"></el-table-column>
        <el-table-column prop="title" label="商品名称" width="300"></el-table-column>
        <el-table-column prop="price" label="单价" width="150"></el-table-column>
        <el-table-column prop="number" label="数量" width="150"></el-table-column>
      </el-table>
    </el-dialog>
  </div> 
</template>

<script>
export default {
  data () {
    return {
      totalMoney:0,
      totalShops:[],
      dialogTableVisible:false,
      payed:[],
      user:[],
    }
  },
  created(){
    this.getThisUser()
    this.getTotaInfo()
    this.updateBookCarByStauts()
  },
  watch:{

  },
  methods:{
        getThisUser() {
      let me = this;
      me.$axios
        .get("/user/queryUserByUsername")
        .then(res => {
          console.log("此用户：");
          console.log(res.data);
          me.user = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getTotaInfo(){
     this.totalMoney= this.$route.params.totalMoney
     this.totalShops=this.$route.params.totalShops
     console.log(this.totalShops)
    },
    goIndex(){
      this.$router.push({
        name:'index'
      })
    },
    updateBookCarByStauts(){
      var url="http://localhost:8080/updateBookCarByStauts";
      let updateIds=[]
      if(this.totalShops.length>0){
        for(var i=0;i<this.totalShops.length;i++){
          updateIds.push(this.totalShops[i].id)
        }
        this.$axios.get(url,{
          params:{
            updateId:updateIds
          },
          paramsSerializer:params =>{
            return this.$qs.stringify(params,{indices:false})
          }
        }).then(res=>{
          console.log(res)
          console.log('更新成功')
        })
      }
    },
    selectBookCarByPayed(){
      this.dialogTableVisible=true
      console.log("aaaaaaaaaa")
      console.log(this.user.id)
      var url="http://localhost:8080/selectBookCarByPayed";
      this.$axios.get(url,{
        params:{
          userId:this.user.id
        }
      }).then(res=>{
        // console.log(res)
        this.payed=res.data
      })
    }

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shop-success img{
  width:150px;
  height: 175px;
}
.success-info{
  font-size:25px;
}
.total-money{
  position: relative;
  font-size: 20px;
  width: 300px;
  left: 630px;
}
.total-money li{
    display: inline;
}
</style>