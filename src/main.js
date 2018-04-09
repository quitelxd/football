// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
Vue.use(Vuex);

// 引入jq
import './assets/js/jquery-3.2.1.min.js'
import '../static/api.js'
// 公共组件
import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.px.css'
Vue.use(YDUI);

// 快速点击插件
import FastClick from 'fastclick'
document.addEventListener('DOMContentLoaded', function () {
  FastClick.attach(document.body);
}, false);

// 自定义样式及图标
import './assets/ionicons/less/ionicons.less'
import './assets/main.less'

//全局自定义组件
import Scroll from './components/Scroll'
import ScrLoadingWrapperoll from './components/LoadingWrapper'
Vue.component('Scroll', Scroll)
Vue.component('ScrLoadingWrapperoll', ScrLoadingWrapperoll)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    link: IPhost,
    // link: 'http://192.168.2.55:9090/smartCityXF_API',
    token: '',
    userType: '',
    userName: '',
    passWord: '',

    homeNavTitle: '', // 首页顶部标题
    homeNavActive: '', // 首页当前点击页

    transitionType: '', // 过渡动画状态
    transitionMoel: '', // 过渡动画先后
    dangerMenu: [], //隐患管理页面筛选条件
    isDot: false,
    isDot1: false
  },
  mutations: {
    increment(state) {}
  }
})
/* eslint-disable no-new */

// 公共过滤器
Vue.filter('subTimeMin', (val) => {
  if (val) {
    return val.substring(0, 16)
  }
})
Vue.filter('null', (val) => {
  if (val) {
    return val
  } else {
    return '无'
  }
})
Vue.filter('date', (val) => {
  if (val) {
    var publishTime = Date.parse(val.toString().replace(/-/gi, "/")) / 1000,
      d_seconds,
      d_minutes,
      d_hours,
      d_days,
      timeNow = parseInt(new Date().getTime() / 1000),
      d,

      date = new Date(publishTime * 1000),
      Y = date.getFullYear(),
      M = date.getMonth() + 1,
      D = date.getDate(),
      H = date.getHours(),
      m = date.getMinutes(),
      s = date.getSeconds();
    //小于10的在前面补0
    if (M < 10) {
      M = '0' + M;
    }
    if (D < 10) {
      D = '0' + D;
    }
    if (H < 10) {
      H = '0' + H;
    }
    if (m < 10) {
      m = '0' + m;
    }
    if (s < 10) {
      s = '0' + s;
    }

    d = timeNow - publishTime;
    d_days = parseInt(d / 86400);
    d_hours = parseInt(d / 3600);
    d_minutes = parseInt(d / 60);
    d_seconds = parseInt(d);

    if (d_days > 0 && d_days < 3) {
      return d_days + '天前';
    } else if (d_days <= 0 && d_hours > 0) {
      return d_hours + '小时前';
    } else if (d_hours <= 0 && d_minutes > 0) {
      return d_minutes + '分钟前';
    } else if (d_seconds < 60) {
      if (d_seconds <= 0) {
        return '刚刚';
      } else {
        return d_seconds + '秒前';
      }
    } else if (d_days >= 3 && d_days < 30) {
      return Y + '-' + M + '-' + D;
    } else if (d_days >= 30) {
      return Y + '-' + M + '-' + D;
    }
  }
})
Vue.filter('subTimeDay', (val) => {
  if (val) {
    return val.substring(0, 10)
  }
})
// 公共过滤器

const vm_app = new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {
    App
  }
});

// 判断是否登录
// if (!window.localStorage.getItem("token")) {
//   vm_app.$router.replace('/Login');
// };
router.beforeEach((to, from, next) => {
  if (!window.localStorage.getItem("token")) {
    if ((from.path == '/Login' && to.path == '/Register') || to.path == '/Login') {
      next();
    } else {
      next('/Login')
    }
  } else {
    if (to.path == '/Login' && from.path != '/Register') {
      next(false)
    } else {
      next()
    }
  }
});

router.afterEach(route => {
  setTimeout(() => {
    // store.state.transitionType = 'jumpIn';
    // store.state.transitionMoel = 'in-out';
  }, 400);
});


window.onpopstate = (e) => {
  // store.state.transitionType = 'jumpOut';
  // store.state.transitionMoel = '';
}
