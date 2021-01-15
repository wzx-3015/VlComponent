<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-01-13 15:36:52
 * @LastEditTime: 2021-01-15 22:15:02
 * @LastEditors: @Xin (834529118@qq.com)
-->
<template>
  <div class="home">
    <vl-search @handle-search="handleSearch" :fromData="fromData" :schemaRule="list" />
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      fromData: {},
      list: [
        {
          key: 'name1',
          type: 'Input',
          defaultValue: '姓名',
          ui: {
            label: '姓名',
          },
          col: {
            span: 8,
          },
          props: {
            placeholder: '请输入年龄',
            clearable: true,
          },
        },
        {
          key: 'name2',
          type: 'Input',
          defaultValue: '',
          ui: {
            label: '姓名',
          },
          col: {
            span: 8,
          },
          props: {
            placeholder: '请输入名称',
            clearable: true,
            suffixIcon: 'el-icon-date',
            type: 'password',
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
            },
            prepend: () => {
              return (
                <div onClick={this.handleDemoClick}>123</div>
              )
            },
          },
          change: (val) => {
            console.log('input', this, val)
          }
        },
        {
          key: 'age',
          type: 'Select',
          defaultValue: '',
          ui: {
            label: '年龄',
          },
          props: {
            placeholder: '请输入年龄',
            clearable: true,
            filterable: true,
            remote: true,
            remoteMethod: (query) => {
              this.list[2].options = [{name: '男', value: 1}].filter(v => v.name.includes(query))
            }
          },
          col: {
            span: 4,
          },
          options: [],
          change: this.handleChange
        }
      ]
    }
  },
  methods: {
    handleSearch () {
      console.log(this.fromData)
    },
    handleDemoClick () {
      console.log('handleDemoClick')
    },
    handleChange () {
      this.list[0].key = '1212'
      this.list[0].defaultValue = '12121212'
    },
  }
}
</script>
