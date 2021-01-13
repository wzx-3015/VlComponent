<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-01-13 15:36:52
 * @LastEditTime: 2021-01-13 20:57:27
 * @LastEditors: @Xin (834529118@qq.com)
-->
<template>
  <div class="home">
    <vl-search @handle-search="handleSearch" :schemaList="list" />
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
          defaultValue: '姓名',
          ui: {
            label: '姓名',
          },
          props: {
            placeholder: '请输入年龄',
            clearable: true,
          },
        },
        {
          key: 'age',
          type: 'Select',
          defaultValue: 1,
          ui: {
            label: '年龄',
          },
          props: {
            placeholder: '请输入年龄',
            clearable: true,
          },
          options: [
            {
              name: '男',
              value: 1,
            },
            {
              name: '女',
              value: 2,
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleSearch (data) {
      console.log(data)
    }
  }
}
</script>
