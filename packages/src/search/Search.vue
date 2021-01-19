<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-01-13 16:49:02
 * @LastEditTime: 2021-01-19 17:24:57
 * @LastEditors: @Xin (834529118@qq.com)
-->
<script>
import { isType, merge } from '@/utils.js'
import { defaultItmeConfig } from './const'

const tagTypeFn = {
  'select': 'generateSelect',
  'input': 'generateInput',
  'timepicker': 'generateTimePicker',
  'datepicker': 'generateDatePicker',
  'button': 'generateButton'
}

const handleLabelWidth = (labelWidth) => {
  const widthIsNumber =  isType(Number(labelWidth), 'Number')

  const width = widthIsNumber ? `${labelWidth}px` : labelWidth

  const labelStyle = {
    width
  }

  const contentStyle = {
    marginLeft: width
  }

  return {
    labelStyle,
    contentStyle
  }
}

export default {
  name: 'VlSearch',
  componentName: 'VlSearch',
  props: {
    schemaRule: {
      type: Array,
      default: () => [],
      required: true,
    },
    fromData: {
      type: Object,
      default: () => {},
      required: true,
    },
    globalOptions: {
      type: Object,
      default: () => {},
    }
  },
  data () {
    return {
      rowStyle: {},
      h__: null,
      rule__list: [],
    }
  },
  computed: {
    gutter () {
      return this.globalOptions.gutter
    },
    globalConfig () {
      return Object.freeze(merge(defaultItmeConfig, this.globalOptions))
    },
  },
  methods: {
    /**
     * @description:   处理配置信息
     * @param {*} schemaRule
     * @param {*} globalOptions
     * @return {*}
     */
    handleSchemaRuleJson (schemaRule, globalConfig) {
      return schemaRule.map(v => {
        const configData = merge(globalConfig, v)

        const {slot, type} = configData

        type && (configData.type = type.toLowerCase())

        Object.values(slot).forEach(s => {
          s.type && (s.type = s.type.toLowerCase())
        })

        return configData
      })
    },
    /**
     * @description:   创建数据
     * @param {*} configList
     * @return {*}
     */
    createData (configList){
      configList.forEach(v => {
        const {key, defaultValue, slot} = v
        key && !this.fromData[key] && this.$set(this.fromData, key, defaultValue || '')

        const slots = slot ? Object.values(slot) : []
        if (slots.length) {
          this.createData(slots)
        }
      })
    },
    /**
     * @description:  添加配置信息开放接口
     * @param {*} config
     * @return {*}
     */
    addSchemaRule (config) {
      if (!isType(config, 'Array')) {
        console.error('[Search Component] config Expected Array, got Object')
        return
      }

      const { globalConfig } = this

      const data = this.handleSchemaRuleJson(config, globalConfig)

      this.createData(config)

      this.rule__list = [].concat(this.rule__list, data)
    },
    getRuleList () {
      return this.rule__list
    },
    setConfig (key, path, attr, data) {
      const configRule = this.rule__list.find(v => v['key'] === key)

      if (!configRule) {
        console.error(`${key} is undefined`)
        return
      }

      const val = path.split('.').reduce((m, n) => {
        return m && m[n]
      }, configRule)

       if (!val) {
        console.error(`${path} is undefined`)
        return
      }

      this.$set(val, attr, data)
    },
    generateTimePicker ({defaultProps}) {
      return <el-time-picker {...defaultProps} />
    },
    generateDatePicker ({defaultProps}) {
      return <el-date-picker {...defaultProps} />
    },
    generateButton ({defaultProps, ui}) {
      return <el-button {...defaultProps}>{ui.label}</el-button>
    },
    /**
     * @description:   生成下拉选择框
     * @param {*} options
     * @return {*}
     */
    generateSelect ({defaultProps, options}) {
      return (
        <el-select {...defaultProps}>
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
        const { type } = slot

        return (
          <div slot={slotName} class="slot-content">
            {
              type && this[tagTypeFn[type]](this.handleProps(slot))
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
     * @description:   处理props参数
     * @param {Object} schema
     * @return {*}
     */
    handleProps (schema) {
      const { key = Date.now(), props = {}, on = {} } = schema

      const { placeholder, ...rest } = props


      const defaultProps = {
        on: {
          input: (value) => {
            this.fromData[key] = value
          }
        },
        props: {
          ...rest,
          value: this.fromData[key]
        },
        attrs: {
          placeholder: placeholder || '请填写内容',
        },
        class: ['vl-width-auto']
      }

      // 循环处理事件
      Object.keys(on).forEach(eventName => {
        defaultProps.on[eventName] = (value) => {
          ['input'].includes(eventName) && (this.fromData[key] = value)
        
          const fn = on[eventName]
          fn && isType(fn, 'Function') && fn(value)
        }
      })

      return {
        defaultProps,
        ...schema
      }
    },
    /**
     * @description:   生成Input输入框
     * @param {*}
     * @return {*}
     */
    generateInput ({defaultProps, slot}) {
      return (
        <el-input class="vl__input" {...defaultProps}>
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

      const fn = tagTypeFn[type]

      return this[fn](this.handleProps(schema))
    },
  },
  created () {
    console.log(this.schemaRule)
    this.addSchemaRule(this.schemaRule)
  },
  render (h) {
    this.h__ = h

    return (
      <div class="vl-search__container">
        <el-row gutter={this.gutter} class="vl-row">
          {
            this.rule__list.map(({ui, col, type, hide, labelWidth, ...rest}) => {

              const { span } = col

              const { labelStyle, contentStyle } = handleLabelWidth(labelWidth)

              return (
                !hide &&
                <el-col span={span} class="vl-search-item">
                  {ui.label && type !== 'button'  ? <label style={labelStyle} class="vl-search-item__label">{ui.label}：</label> : null}
                  <div style={type !== 'button' && contentStyle} class="vl-search-item__content">
                    {this.handleSchemaDOM({type, ui, hide, ...rest})}
                  </div>
                </el-col>
              )
            })
          }
        </el-row>
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
    overflow: hidden;
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

  .vl-width-auto{
    width: 100%;
  }
  .vl-width-auto.el-button {
    width: auto;
  }

  .slot-content .vl-width-auto{
    width: auto;
  }
}
</style>
