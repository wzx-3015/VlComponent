<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-01-13 16:49:02
 * @LastEditTime: 2021-01-13 20:02:09
 * @LastEditors: @Xin (834529118@qq.com)
-->
<script>
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
    handleSchemaDOM ({ type, key, props }) {
      if (type.toLowerCase() === 'input') {
        return <el-input v-model={this.keyData[key]} placeholder={props.placeholder} props={props}  />
      }
    },
    hansleSearch (zc) {
      console.log(this.keyData, zc)
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
