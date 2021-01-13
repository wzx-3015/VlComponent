<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-01-13 16:49:02
 * @LastEditTime: 2021-01-13 18:09:46
 * @LastEditors: @Xin (834529118@qq.com)
-->
<template>
  <div>
    <el-select v-model="value">
      <el-option value="1">1</el-option>
      <el-option value="2">2</el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  name: 'VlSearch',
  componentName: 'VlSearch',
  props: {
    schemaList: {
      type: Array,
      default: () => [],
      required: true,
    }
  },
  data () {
    return {
      value: '',
    }
  },
  created () {
    console.log('schemaList', this.schemaList)
  }
}
</script>
