<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-01-13 15:36:52
 * @LastEditTime: 2021-01-15 19:16:43
 * @LastEditors: @Xin (834529118@qq.com)
-->
<template>
  <div class="home">
    <vl-search @handle-search="handleSearch" :schemaRule="list" />
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      
      list: [
        // {
        //   key: 'name',
        //   type: 'Input',
        //   defaultValue: '姓名',
        //   ui: {
        //     label: '姓名',
        //   },
        //   col: {
        //     span: 12,
        //   },
        //   props: {
        //     placeholder: '请输入年龄',
        //     clearable: true,
        //   },
        // },
        // {
        //   key: 'name1',
        //   type: 'Input',
        //   defaultValue: '姓名',
        //   ui: {
        //     label: '姓名',
        //   },
        //   col: {
        //     span: 12,
        //   },
        //   props: {
        //     placeholder: '请输入年龄',
        //     clearable: true,
        //   },
        // },
        {
          key: 'name2',
          type: 'Input',
          defaultValue: '',
          ui: {
            label: '姓名',
          },
          col: {
            span: 12,
          },
          props: {
            placeholder: '请输入名称',
            clearable: true,
            suffixIcon: 'el-icon-date',
          },
          slot: {
            // prefix: '',
            // suffix: '',
            append: {
              type: 'Select',
              key: 'age12',
              defaultValue: 1,
              options: [
                {
                  name: '男',
                  value: 1,
                },
                {
                  name: '女',
                  value: 2,
                }
              ],
              props: {},
            },
            prepend: () => {
              return (
                <div onClick={this.handleDemoClick}>123</div>
              )
            },
          }
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
          col: {
            span: 12,
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
    },
    handleDemoClick () {
      console.log('handleDemoClick')
    }
  }
}
</script>
