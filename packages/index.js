/*
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-01-13 16:47:27
 * @LastEditTime: 2021-01-13 17:50:29
 * @LastEditors: @Xin (834529118@qq.com)
 */
import VlSearch from './src/search/index'

const components = [
  VlSearch
]

const install = (Vue) => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default {
  version: '0.0.1',
  install,
  VlSearch,
}
