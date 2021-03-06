import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'


//把index样式引入进来
import 'common/stylus/index.styl'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false


//引入fastclick ，这个插件可以解决移动端点击事件延迟300毫秒的问题
import FastClick from 'fastclick'
FastClick.attach(document.body);


Vue.use(VueLazyLoad,{
	loading: require('common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store
})
