<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-01-13 16:49:02
 * @LastEditTime: 2021-01-13 20:52:29
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
      value: '',
      keyData: {}
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
    /**
     * @description:   根据JSON生成DOM
     * @param {*} type
     * @param {*} key
     * @param {*} props
     * @param {*} options
     * @return {*}
     */
    handleSchemaDOM ({ type, key, props, options }) {
      const placeholder = props.placeholder
      if (type.toLowerCase() === 'input') {
        // placeholder 通过props传递无效
        return <el-input v-model={this.keyData[key]} placeholder={placeholder} props={props}  />
      }

      if (type.toLowerCase() === 'select') {
        return (
          <el-select v-model={this.keyData[key]} placeholder={placeholder} props={props}>
            {
              this.handleTypeSelect(options)
            }
          </el-select>
        )
      }
    },
    hansleSearch () {
      this.$emit('handle-search', this.keyData)
    }
  },
  created () {
    const keyData = {}
    this.schemaList.forEach(({key}) => {
      keyData[key] = ''
    })
    this.keyData = keyData
  },
  render () {
    return (
      <div>
        {
          this.schemaList.map(this.handleSchemaDOM)
        }
        <el-button onClick={this.hansleSearch}>查看</el-button>
      </div>
    )
  },
}
</script>
