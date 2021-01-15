<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-01-13 16:49:02
 * @LastEditTime: 2021-01-15 19:20:55
 * @LastEditors: @Xin (834529118@qq.com)
-->
<script>
import { isType } from '@/utils.js'

// 不同类型所对应的处理方法
const tagTypeFn = {
  'select': 'generateSelect',
  'input': 'generateInput',
}

export default {
  name: 'VlSearch',
  componentName: 'VlSearch',
  props: {
    schemaRule: {
      type: Array,
      default: () => [],
      required: true,
    }
  },
  data () {
    return {
      fromData: {},
      rowStyle: {},
      h__: null,
    }
  },
  methods: {
    handleCol ({ label }, DOM) {
      // <div class="grid-content bg-purple-dark"></div>
      return (
        <el-col span={12}>
          <div>
            <label class="vl-search__label" from={label}>
              {label}
            </label>
            {DOM}
          </div>
        </el-col>
      )
    },

    /**
     * @description:   生成下拉选择框
     * @param {*} options
     * @return {*}
     */
    generateSelect ({key, props, options}) {
      const { placeholder } = props
      const defaultProps = {
        props: props || {},
      }
      return (
        <el-select v-model={this.fromData[key]} placeholder={placeholder} {...defaultProps}>
          {
            this.generateSelectOptions(options)
          }
        </el-select>
      )
    },
    /**
     * @description:   生成下拉选择的属性
     * @param {Array|String|Object} options
     * @return {*}
     */
    generateSelectOptions (options) {
      // options is Array Is a static resource
      if (isType(options, 'Array')) {
        return options.map(({value, name}) => {
          return <el-option key={value} label={name} value={value} />
        })
      }
    },
    /**
     * @description: 生成slot
     * @param {*} slotName
     * @param {*} slot
     * @return {*}
     */
    generateSelectSlot(slotName, slot) {
      // The processing field is null or undefined
      if (isType(slot, 'String')) {
        return <i slot={slotName}  class={slot} />
      }

      if (isType(slot, 'Object')) {
        const { key, defaultValue, type } = slot

        this.$set(this.fromData, key, defaultValue || '')
        return (
          <div slot={slotName}>
            {
              this[tagTypeFn[type.toLowerCase()]](slot)
            }
          </div>
        )
      }
      if (isType(slot, 'Function')) {
        return <div slot={slotName}>{slot(this.h__)}</div>
      }
      return null
    },
    /**
     * @description:   生成Input输入框
     * @param {*}
     * @return {*}
     */
    generateInput ({key, props, slot}) {
      const { placeholder } = props
      const defaultProps = {
        props: props || {},
      }

      return (
        <el-input class="vl__input" v-model={this.fromData[key]} placeholder={placeholder} {...defaultProps}>
          {Object.entries(slot).map(([slotName, slot]) => this.generateSelectSlot(slotName, slot))}
        </el-input>
      )
    },
    /**
     * @description:   根据JSON生成DOM
     * @param {*} type
     * @param {*} key
     * @param {*} props
     * @param {*} options
     * @return {*}
     */
    handleSchemaDOM (schema) {
      const { type } = schema

      const tagType = type.toLowerCase()

      const fn = tagTypeFn[tagType]

      return this[fn](schema)
    },
    hansleSearch () {
      this.$emit('handle-search', this.fromData)
    }
  },
  created () {
    this.schemaRule.forEach(({key, defaultValue}) => {
      this.$set(this.fromData, key, defaultValue || '')
    })

    const total = this.schemaRule.reduce((newVal, currentValue) => (newVal + currentValue.col.span), 0)

    if (total <= 24) {
      this.$set(this.rowStyle, 'marginRight', '80px')
    }
  },
  render (h) {
    this.h__ = h
    return (
      <div class="vl-search__container">
        <el-row gutter={10} style={this.rowStyle}>
          {
            this.schemaRule.map(({ui, col, ...rest}) => {

              const { span } = col

              return (
                <el-col span={span} class="vl-search-item">
                  <label style="width: 80px" class="vl-search-item__label">{ui.label}：</label>
                  <div style="margin-left: 80px;">
                    {this.handleSchemaDOM({...rest})}
                  </div>
                </el-col>
              )
            })
          }
        </el-row>
        <div class="vl-search__btn">
          <el-button onClick={this.hansleSearch}>查看</el-button>
        </div>
      </div>
    )
  },
}
</script>
<style lang="less">
.vl-search__container{
  padding: 10px;
  box-shadow: 0 0 6px fade(#000, 30);
  border-radius: 4px;

  &::after{
    content: '';
    clear: both;
    height: 0;
    display: block;
  }

  .vl-search-item{
    margin-bottom: 10px;
  }

  .vl-search-item__label{
    float: left;
    line-height: 40px;
    vertical-align: middle;
    font-size: 14px;
    height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .vl-search__btn{
    float: right;
  }
}
</style>
