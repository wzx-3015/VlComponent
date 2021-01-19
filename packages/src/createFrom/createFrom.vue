<!--
 * @Description: 请输入当前文件描述
 * @Author: @Xin (834529118@qq.com)
 * @Date: 2021-01-19 17:58:48
 * @LastEditTime: 2021-01-19 18:13:43
 * @LastEditors: @Xin (834529118@qq.com)
-->
<script>
export default {
  name: 'VlCreateFrom',
  data () {
    return {
      numberValidateForm: {
        name: 12
      }
    }
  },
  render (h) {
    console.log('===', h)
    return (
      <div class="vl-create-from">
        <el-form model={this.numberValidateForm}  ref="numberValidateForm">
          <el-form-item 
            label="年龄"
            prop="age"
          >
            <el-input v-model={this.numberValidateForm.name} autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </div>
    )
  }
}
</script>
