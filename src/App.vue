<template>
  <div id="app">
    <vue-canvas-nest :config="{color:'0, 0, 0',opacity: 0.6, count: 99}" :el="'#app'"></vue-canvas-nest>
    <div v-if="topShow"
      id="toTop"
      style=" margin-left:105rem;margin-top:40rem;height:4rem;width:4rem;z-index:9999;position:fixed;"
    >
      <!-- <i class="el-icon-arrow-up"></i> -->
      <btnBlobHalf @click="btnToTop()" content="Top"></btnBlobHalf>
    </div>
    <router-view/>
  </div>
</template>

<script>
import vueCanvasNest from "vue-canvas-nest";
import btnBlobFull from "./components/btnBlobFull.vue";
import btnBlobHalf from "./components/btnBlobHalf.vue";
export default {
  components: { vueCanvasNest, btnBlobFull, btnBlobHalf },
  name: "APP",
  data() {
    return {
      topShow:false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToTop);
  },
  methods: {
    btnClick() {
      console.log(123);
    },
    scrollToTop() {
      let topBtn = document.getElementById("toTop");
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // console.log("document.documentElement.scrollTop");
      // console.log(document.documentElement.scrollTop);
      // scrollTop是浏览器组件，此处变量代表滚动条当前位置。
      let browserHeight = window.outerHeight;
      if (scrollTop > browserHeight*1.3) {
        // topBtn.style.display = "block";
        this.topShow=true
      } else {
        // topBtn.style.display = "none";
        this.topShow=false
      }
      // console.log(scrollTop);
    },
    btnToTop() {
      var totop = document.getElementById("toTop");
      var target = 0;
      clearInterval(timer);
      var timer = setInterval(function() {
        target =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop;
        target -= Math.ceil(target / 8); //做减速运动
        window.scrollTo(0, target);
        // console.log("target");
        // console.log(target);
        if (target == 0) {
          clearInterval(timer);
        }
      }, 10);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
