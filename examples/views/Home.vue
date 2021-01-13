<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-01-13 15:36:52
 * @LastEditTime: 2021-01-13 20:00:31
 * @LastEditors: @Xin (834529118@qq.com)
-->
<template>
  <div class="home">
    <vl-search :schemaList="list" />
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      list: [
        {
          key: 'name',
          type: 'Input',
          ui: {
            label: '姓名',
          },
          props: {
            placeholder: '请输入年龄',
            clearable: true,
          },
        }
      ]
    }
  }
}
</script>
