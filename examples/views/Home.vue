<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-01-13 15:36:52
 * @LastEditTime: 2021-01-19 16:56:21
 * @LastEditors: @Xin (834529118@qq.com)
-->
<template>
  <div class="home">
    <vl-search ref="Vlsearch" :globalOptions="options" :fromData="fromData" :schemaRule="list" />
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
        labelWidth: 80,
      },
      list: [
        {
          key: '======',
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
              on: {
                change: (val) => {
                  console.log('====', val)
                }
              }
            },
            prepend: () => {
              return (
                <div onClick={this.handleDemoClick}>123</div>
              )
            },
          },
          on: {
            change: (val) => {
              console.log('input', this, val)
            }
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
          },
          col: {
            span: 4,
          },
          on: {
            change: this.handleChange
          }
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
          on: {
            click: this.handleDemoClick
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
      this.$refs.Vlsearch.setConfig('age', 'props', 'disabled', true)
    },
    handleChange () {
      // this.$set(this.list[4].props, 'disabled', true)
      // this.$set(this.list[5], 'on', {
      //   click: () => {
      //   console.log(this)
      //   }
      // })
    },
  }
}
</script>
