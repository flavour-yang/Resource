<template>
  <form-modal :loading.sync="loading" :model="model" v-bind="config" :model-handle="modelHandle" :save-handle="saveHandle" ref="change-pwd-modal">
    <Row>
      <hy-input v-model="model.password" label="旧密码" required prop="password" :span="24" :maxlength="20" type="password"/>
      <hy-input v-model="model.newPassword" label="新密码" required prop="newPassword" :span="24" :maxlength="20" type="password" :rules="$utils.formValid.easyPassword"/>
      <hy-input v-model="model.confirmPassword" label="确认新密码" required prop="confirmPassword" :span="24" :maxlength="20" type="password"
                :rules="confirmPasswordRules"/>
    </Row>
  </form-modal>
</template>

<script>
import {FormModalBase} from "@/mixins";
import security from "@/libs/security";

export default {
  name: "change-pwd",
  mixins: [FormModalBase],
  data() {
    return {
      model: {
        account: '',
        password: '',
        newPassword: "",
        confirmPassword: ""
      }
    }
  },
  methods: {
    confirmPasswordValidator(rule, code, callback) {
      let errMsg = "确认新密码和新密码不一致！";
      if (code && this.model.newPassword && code != this.model.newPassword) {
        callback(new Error(errMsg))
      } else {
        callback()
      }
    },
    modelHandle(model) {
      let requestModel = this.$utils.deepCopy(model);
      requestModel.account = this.userInfo.account;
      requestModel.password = security.encrypt(model.password);
      requestModel.newPassword = security.encrypt(model.newPassword);
      requestModel.confirmPassword = security.encrypt(model.confirmPassword);
      return requestModel;
    },
    async saveHandle(model) {
      console.log(model)
      await this.$http.post("admin-api/sys/user/updatePassword", model);
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.current.userInfo
    },
    confirmPasswordRules() {
      return [
        ...this.$utils.formValid.easyPassword,
        {
          validator: this.confirmPasswordValidator,
          trigger: "blur"
        }
      ]
    }
  },
  created() {
    Object.assign(this.config, {
      title: `修改密码`,
      width: 700,
    });
  }
}
</script>