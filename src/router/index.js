import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      redirect: {
        path: '/index'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: (resolve) => require(['@/views/login'], resolve), //异步按需加载组件
      meta: {
        title: '登录',
        hidden: false
      }
    },
    {
      path: '/demo',
      name: 'demo',
      component: (resolve) => require(['@/views/demo'], resolve), //异步按需加载组件
      meta: {
        title: '登录',
        hidden: false
      }
    },
    {
      path: '/BookDetail/:id',
      name: 'BookDetail',
      component: (resolve) => require(['@/views/BookDetail'], resolve), //异步按需加载组件
      meta: {
        title: '商品详情',
        hidden: false
      }
    },
    // csy
    {
      path: '/shopCar',
      name: 'shopCar',
      component: (resolve) => require(['@/views/shopCar'], resolve),
      meta: {
        title: '购物车',
        hidden: false
      },
      children: [{
        path: '/shopSuccess',
        name: 'shopSuccess',
        component: (resolve) => require(['@/views/shopSuccess'], resolve),
        meta: {
          title: '购物成功',
          hidden: false
        }
      }, ]
    }, {
      path: '/index',
      name: 'index',
      component: (resolve) => require(['@/views/index'], resolve),
      meta: {
        title: '首页',
        hidden: false
      }
    },
    // lyf
    {
      path: '/kind',
      name: 'kind',
      component: (resolve) => require(['@/views/kind'], resolve),
      meta: {
        title: '分类',
        hidden: false
      }
    },
    {
      path: '/my',
      name: 'my',
      component: (resolve) => require(['@/views/my'], resolve),
      meta: {
        title: '我的',
        hidden: false
      }
    },
    {
      path: '/select',
      name: 'select',
      component: (resolve) => require(['@/views/select'], resolve),
      meta: {
        title: '查询',
        hidden: false
      }
    },
    {
      path: '/error',
      name: 'error',
      component: (resolve) => require(['@/views/error'], resolve),
      meta: {
        title: '出错了',
        hidden: true
      }
    },
    {
      path: '*',
      meta: {
        title: '出错了',
        hidden: true
      },
      redirect: {
        path: '/error'
      }
    },
  ]
})
