<template> 


<div id ="contianer">

<div id="left">
 <span style="font-size:16px; color:red;">全部功能</span>
 <div><br><a href="javascript:;" ><span>我的购物车</span></a></div>
  <div><br><a href="javascript:;"><span>已购买的宝贝</span></a></div>
   <div><br><a href="javascript:;"><span>购买过的店铺</span></a></div>
   <div> <br><a href="javascript:;"><span>我的发票</span></a></div>
   <div> <br><a href="javascript:;"><span>我的收藏</span></a></div>
   <div> <br><a href="javascript:;"><span>我的积分</span></a></div>
   <div> <br><a href="javascript:;"><span>我的优惠信息</span></a></div>
   <div> <br><a href="javascript:;"><span>评价管理</span></a></div>
  <div>  <br><a href="javascript:;"><span>退款维护</span></a></div>
   <div> <br><a href="javascript:;"><span>我的足迹</span></a></div>
         <div>  <br><a href="javascript:;"><span>流量钱包</span></a></div>
</div>
<div id="right">
<div id="my-info">
       <el-dropdown >
                    <span class="el-dropdown-link">
                    <img :src="user.icon">
                    </span>
                      <div id="username"><span >{{user.username}}</span></div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item >
                            <el-upload
  class="upload-demo"
  action="http://localhost:8080/user/updae/up_image_url"
  :on-success="succ"
  :on-error="error"
  multiple>
  <el-button size="small" type="primary">修改图片</el-button>
</el-upload>  

                            
                            </el-dropdown-item>
                         
                    </el-dropdown-menu>
        </el-dropdown>         
     
                <!-- <el-dropdown >
                    <span class="el-dropdown-link">
                    <img src="../assets/62.jpg">
                    </span>
                 <div id="username"><span >阿强</span></div>

                </el-dropdown> 
                   <el-dropdown-menu slot="dropdown">
                     <el-dropdown-item>修改图片</el-dropdown-item>
                  
                    </el-dropdown-menu>                -->
            </div>


<el-menu
  :default-active="activeIndex"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect">
  <el-menu-item index="1">编辑资料</el-menu-item>
    <el-menu-item index="2" >待收货</el-menu-item>
  <el-menu-item index="3" >待发货</el-menu-item>
  <el-menu-item index="4">待评价</el-menu-item>
    <el-menu-item index="5">我的优惠卷</el-menu-item>
        <el-menu-item index="6">我的支付宝</el-menu-item>
</el-menu>
</div>

<div id="show">
    <div v-if="flag">

<!-- Form -->
<el-button type="text" @click="dialogFormVisible = true" style="position:relative;top:-20px;">点击修改密码</el-button>

<el-dialog title="修改密码" :visible.sync="dialogFormVisible">

  <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
    <el-form-item label="原密码" prop="age">
    <el-input  type="password" v-model.number="ruleForm2.age"></el-input>
  </el-form-item>
  
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
  </el-form-item>


  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
    <el-button @click="resetForm('ruleForm2')">重置</el-button>
  </el-form-item>
</el-form>
</el-dialog>

  <div>呢称：<el-input v-model="inputboke" placeholder="请输入昵称" size="mini" style="width:200px;"></el-input></div>
  <div id="radio">性别：<template>
  <el-radio v-model="radio" label="1">男</el-radio>
  <el-radio v-model="radio" label="2">女</el-radio>
</template></div>
<div id="ident"> 身份：<template>
  <el-radio v-model="radio1" label="1">在校学生</el-radio>
  <el-radio v-model="radio1" label="2">教师</el-radio> 
    <el-radio v-model="radio1" label="3">上班族</el-radio>
      <el-radio v-model="radio1" label="4">自由职业</el-radio></template></div>
 
 <div id="op"> <template><el-select v-model="value" placeholder="请选择" size="mini" style="width:200px;">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>
</div>

<div id="birthday">
    生日：
    <el-date-picker
      v-model="value2"
      align="right"
      type="date"
      placeholder="选择日期"
      :picker-options="pickerOptions1">
    </el-date-picker>
</div>

  <div id="boke" >博客地址: <el-input v-model="input" placeholder="请输入昵称" size="mini" style="width:400px;"></el-input></div>

  <div id="text"><span style="  position: relative; top:-140px;"> 兴趣爱好：</span><textarea style="width:250px;height:150px;"> </textarea></div>


  <div id="text1"><span style="  position: relative; top:-140px;"> 自我介绍：</span><textarea style="width:350px;height:150px;"> </textarea></div>


  <el-button type="primary"  id="btn1">提交</el-button>
  <el-button type="success" id="btn2" >重置</el-button>

  </div>
</div>

</div>
</template>
<script>



export default {

  components:{

  },
  data() {
var checkAge = (rule, value, callback) => {
 if (!value) {
          return callback(new Error('原密码不能为空'));
        }
      let postData = {
           oldpassword:value
      }
      var url = "http://localhost:8080/user/oldpassword";
      this.$axios({
        method: "post",
        url: url,
        data: postData
      }).then(res => {
        console.log(res.data)
        if(res.data==''||res.data==null){
           callback(new Error('原密码密码错误'));
        }
       callback();
      }).catch(function (error) {
　　alert(error);
});


       
        // setTimeout(() => {
        //   if (!Number.isInteger(value)) {
        //     callback(new Error('请输入数字值'));
        //   } else {
        //     if (value < 18) {
        //       callback(new Error('必须年满18岁'));
        //     } else {
        //       callback();
        //     }
        //   }
        // }, 1000);
      };
      var validatePass = (rule, value, callback) => {

        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

    return {
      dialogFormVisible:false,
      ruleForm2: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
          flag:false,
          dialogImageUrl: '',
        dialogVisible: false,
        inputboke:'',
      activeIndex: '1',
      input: '',
      radio: '1',
     radio1: '1',
      options: [{
          value: '选项1',
          label: '高中小学生'
        }, {
          value: '选项2',
          label: '本科生'
        }, {
          value: '选项3',
          label: '博士生'
        }, {
          value: '选项4',
          label: '大专生'
        }, {
          value: '选项5',
          label: '硕士生'
        }],
        value: '',
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
           },
           value2: '',
           user:[],
           username:'',
      };
      
  
  
  },
  created() {
    this.username = this.$route.params.username;
    console.log("my.username:")
    console.log(this.username)
    this.queryUserByUsername()

  },
  methods: {

    queryUserByUsername(){
     
   this.$axios({
        method: "post",
        url: "http://localhost:8080/user/queryUserByUsername",
     
      })
        .then(res =>{
          console.log(res.data)
          this.user=res.data
            });
},

    submitForm(formName) {
       if(this.ruleForm2.age==''){
        alert('请输入原密码')
        return false
      }

      if(this.ruleForm2.pass==''){
        alert('请输入密码')
        return false
      }
       if(this.ruleForm2.checkPass==''){
        alert('请输入再次确认密码')
        return false
      }
         let postData = {
           oldpassword:this.ruleForm2.pass
         }
      var url = "http://localhost:8080/user/oldpassword";
      this.$axios({
        method: "post",
        url: url,
        data: postData
      }).then(res => {


        console.log(res.data)
         if (res.data==1) {
             alert('修改成功!') 
          this.ruleForm2.pass=''
          this.ruleForm2.checkPass=''
          } else {
            console.log('error submit!!')
            return false
          }
           callback();
      }).catch(function (error) {
});
},

      resetForm(formName) {
        this.$refs[formName].resetFields();
      },





handleSelect(key, keyPath) {
    if(key==1){
      this.flag=true
    }else
    {
    this.flag=false
    }
    
      },

   succ(){
      alert("上传成功！")
    this.queryUserByUsername();
   },
   error(){
     alert("上传失败！")
   }
   
   
  }
};
</script>

<style  >

#contianer{
    width: 1200px;
    height: 800px;
  
}
#left{
    width: 140px;
    height: 400px;

}
a:hover{
    color:crimson; 
}
#right{
    position: relative;
    top:-330px;
    left: 330px;
    width: 750px;
    height: auto;
    
    /* background-color: aqua; */
  
}

#my-info{
    width:9 0px;
    height:60px;
    position:relative;
    float: right;
    right: 270px;
    top:-80px; 
}
#my-info img{          /*圆形头像*/
    width: 70px;
    height: 70px;
    border-radius: 60px;
    cursor: pointer;/*光标呈现为指示链接的指针*/
    transition:all 0.14s;/*表示所有的属性变化在0.6s的时间段内完成*/
}
#my-info img:hover{
    transform: scale(1.3);/*表示在鼠标放到图片上的时候图片按比例放大1.4倍*/
}
#username{
  position: relative;
  left: 80px;
  top:-45px;
  font-size: 16px;
  color:brown;
}
#show{
    width: 500px;
    height: 500px;
    position: relative;
    top: -280px;
    left: 150px;
}
#radio{
    position: relative;
    left: -45px;
    top: 25px;
}

#ident{
       position: relative;
    left: 85px;
    top: 45px;
}
#op{
    position: relative;
    left: 45px;
    top: 55px;
}
#birthday{
        position: relative;
    left: 5px;
    top: 85px;
}
#boke{
          position: relative;
    left: 85px;
    top: 105px;
}

#text{
          position: relative;
    left: 10px;
    top: 155px;
}
#text1{
          position: relative;
    left: 50px;
    top: 175px;
}
#btn1{
          position: relative;
    left: 15px;
    top: 200px; 
}
#btn2{
          position: relative;
    left: 65px;
    top: 200px; 
}
</style>