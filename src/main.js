import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'


//把index样式引入进来
import 'common/stylus/index.styl'

Vue.config.productionTip = false


//引入fastclick ，这个插件可以解决移动端点击事件延迟300毫秒的问题
import FastClick from 'fastclick'
FastClick.attach(document.body);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App) 
})
