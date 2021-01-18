<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-01-13 15:36:52
 * @LastEditTime: 2021-01-18 18:34:20
 * @LastEditors: @Xin (834529118@qq.com)
-->
<template>
  <div class="home">
    <vl-search :globalOptions="options" :fromData="fromData" :schemaRule="list" />
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      fromData: {},
      options: {
        gutter: 10,
        col: {
          span: 12,
        },
        submitClick: () => {
          console.log('===')
        }
      },
      list: [
        {
          key: 'name1',
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
          ui: {
            label: '年龄',
          },
          props: {
            placeholder: '请输入年龄',
            multiple: true,
            remoteMethod: (query) => {
              this.list[2].options = [{name: '男', value: 1}].filter(v => v.name.includes(query))
            }
          },
          col: {
            span: 4,
          },
          change: this.handleChange
        },
        {
          key: 'time',
          type: 'TimePicker',
          defaultValue: '',
          ui: {
            label: '选择时间',
          },
          props: {
            isRange: true,
            placeholder: '请选择时间',
          },
          col: {
            span: 10,
          },
        },
        {
          key: 'dateTime',
          type: 'DatePicker',
          defaultValue: new Date(),
          ui: {
            label: '选择日期',
          },
          props: {
            type: 'datetimerange',
          },
          col: {
            span: 10,
          },
        },
        {
          type: 'Button',
          ui: {
            label: '选择日期',
          },
          props: {
            type: 'success',
          },
          col: {
            span: 4,
          },
          click: () => {
            console.log('click')
          }
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
