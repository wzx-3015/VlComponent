/*
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-01-13 15:36:52
 * @LastEditTime: 2021-01-13 17:51:25
 * @LastEditors: @Xin (834529118@qq.com)
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import VlComponent from '@/index'


Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VlComponent)


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
