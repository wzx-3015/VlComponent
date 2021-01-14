<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-01-13 16:49:02
 * @LastEditTime: 2021-01-14 14:22:30
 * @LastEditors: @Xin (834529118@qq.com)
-->
<script>
import { isType } from '@/utils.js'

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
      fromData: {},
      rowStyle: {},
    }
  },
  methods: {
    /**
     * @description:   处理Select
     * @param {*}
     * @return {*}
     */
    handleTypeSelect (options) {
      // options is Array Is a static resource
      if (isType(options, 'Array')) {
        return options.map(({value, name}) => {
          return <el-option key={value} label={name} value={value} />
        })
      }
    },
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
     * @description:   根据JSON生成DOM
     * @param {*} type
     * @param {*} key
     * @param {*} props
     * @param {*} options
     * @return {*}
     */
    handleSchemaDOM ({ type, key, props, options}) {
      const placeholder = props.placeholder

      const defaultProps = {
        props,
      }
      if (type.toLowerCase() === 'input') {
        // placeholder 通过props传递无效
        return <el-input class="vl__input" v-model={this.fromData[key]} placeholder={placeholder} {...defaultProps}  />
      }

      if (type.toLowerCase() === 'select') {
        return (
          <el-select v-model={this.fromData[key]} placeholder={placeholder} {...defaultProps}>
            {
              this.handleTypeSelect(options)
            }
          </el-select>
        )
      }
    },
    hansleSearch () {
      this.$emit('handle-search', this.fromData)
    }
  },
  created () {
    this.schemaList.forEach(({key, defaultValue}) => {
      this.$set(this.fromData, key, defaultValue || '')
    })

    const total = this.schemaList.reduce((newVal, currentValue) => (newVal + currentValue.col.span), 0)

    if (total <= 24) {
      this.$set(this.rowStyle, 'marginRight', '80px')
    }
  },
  render () {
    return (
      <div class="vl-search__container">
        <el-row gutter={10} style={this.rowStyle}>
          {
            this.schemaList.map(({ui, ...rest}) => {

              return (
                <el-col span={12} class="vl-search-item">
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
