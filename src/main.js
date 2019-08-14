// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

//npm install vue-directive-image-previewer -D 图片放大的。
//sass的npm


import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router'
import axios from 'axios'
import qs from 'qs'
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'
import 'jquery'
import VueStar from 'vue-star'
import animate from 'animate.css'
import 'font-awesome/css/font-awesome.min.css'
import EffectInput from 'effect-input'
import 'effect-input/dist/index.css'
Vue.use(EffectInput)

//wen
Vue.component('VueStar', VueStar)
Vue.prototype.$qs = qs



//wen
Vue.use(VueDirectiveImagePreviewer)




axios.defaults.baseURL = 'http://localhost:8080';
//POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  Message({
    type: 'error',
    message: '错误的传参'
  });
  return Promise.reject(error);
});
Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(ElementUI);


//路由全局守卫
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) { //如果未匹配到路由
    console.log("屏蔽")
    from.name ? next({
      name: from.name
    }) : next('/'); //如果上级也未匹配到路由则跳转登录页面，如果上级能匹配到则转上级路由
  } else {
    console.log("放行")
    next(); //如果匹配到正确跳转
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
