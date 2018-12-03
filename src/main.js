// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'element-ui/lib/theme-chalk/index.css'
// import Cookies from 'js-cookie'
import './assets/styles/main.scss'
import './assets/styles/components.scss'
import VueCountDown from '@xkeshi/vue-countdown'
import App from './App'
import router from './router'

import {
  InputNumber,
  Collapse,
  CollapseItem,
  Dialog,
  Card,
  Carousel,
  CarouselItem
} from 'element-ui'

import { getFormatDate, getCategoryLabel, getQueryValueByName } from './utils'

/* eslint-disable */

// remove the loading view first
// function removeLoadingView() {
//   let ele = document.querySelector('._loading-view')
//   ele.remove()
// }
// removeLoadingView()

// let token = Cookies.get('T')
// console.log(token)
// if (!token) {
//   // redirect to wechat auth URL
//   let next = encodeURIComponent(window.location.href)
//   window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx546482739ca755c0&redirect_uri=http%3A%2F%2Ftest-shop.fanxify.com%2Fauth%2Fshop&response_type=code&scope=snsapi_userinfo&state=next-${next}#wechat_redirect`
// }

let state = getQueryValueByName('state')
// if (state && state.startsWith('next-')) {
//   let nextUrl = decodeURIComponent(state.slice('next-'.length))
//   window.location.href = nextUrl
// }


// init view
Vue.use(MintUI)
Vue.component('countdown', VueCountDown)
Vue.component(InputNumber.name, InputNumber)
Vue.component(Collapse.name, Collapse)
Vue.component(CollapseItem.name, CollapseItem)
Vue.component(Dialog.name, Dialog)
Vue.component(Card.name, Card)
Vue.component(Carousel.name, Carousel)
Vue.component(CarouselItem.name, CarouselItem)

Vue.config.productionTip = false

Vue.filter('yuan', function (value) {
  if (!value) return '0'
  value = Number(value)
  if (isNaN(value)) return 0
  return accounting.formatNumber(value / 100, 2)
})

Vue.filter('date', function (value) {
  if (!value) return ''
  let { year, month, day } = getFormatDate(value)
  return `${year}-${month}-${day}`
})

Vue.filter('formatDate', function (time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }

  if ((time + '').length === 10) {
    time = +time * 1000
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time == 'object') {
    date = time;
  } else {
    date = new Date(parseInt(time));
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
})

Vue.filter('formatCategory', function (value) {
  return getCategoryLabel(value)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
