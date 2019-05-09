<template>
  <div>
    <span
      @click="dialogVisible = true">修改密码
    </span>

    <el-dialog :visible.sync="dialogVisible" :append-to-body="true" title="修改密码" width="40%">
      <el-form ref="form" :model="modifyPwdForm" :rules="formRules" label-width="80px" label-position="left">
        <el-form-item label="旧密码" prop="actPassword">
          <el-input v-model="modifyPwdForm.actPassword" :maxlength="20" type="password" placeholder="请输入旧密码" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="modifyPwdForm.newPassword" :maxlength="20" type="password" placeholder="请输入新密码" />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="modifyPwdForm.confirmPassword" :maxlength="20" type="password" placeholder="确认密码" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
import md5 from 'js-md5'
import { modifyPwd } from '@/api/systemManage'

export default {
  components: {
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.modifyPwdForm.confirmPassword !== '') {
          this.$refs.form.validateField('confirmPassword')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.modifyPwdForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      defaultActiveIndex: '/',
      loading: false,
      nickname: '',
      dialogVisible: false,
      modifyPwdForm: {
        actPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      formRules: {
        actPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPassword: [
          { validator: validatePass, required: true, trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: validatePass2, required: true, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar',
      'name',
      'avatar',
      'device'
    ]),
    variables() {
      return variables
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            const para = {
              actPassword: md5(this.modifyPwdForm.actPassword),
              newPassword: md5(this.modifyPwdForm.newPassword),
              confirmPassword: md5(this.modifyPwdForm.confirmPassword)
            }
            modifyPwd(para).then((res) => {
              this.dialogVisible = false
              this.$refs.form.resetFields()
            }).catch(() => {
              this.dialogVisible = false
              this.$refs['form'].resetFields()
            })
          }).catch(() => {
          })
        }
      })
    }
  }
}
</script>

