<template>
    <div>
        <form-modal :loading.sync="loading" :model="model" v-bind="config" ref="org-operate-modal">
            <Row>
                <hy-upload v-model="model.headPhotoId" :data.sync="model.headPhoto" label="头像" single type="image" prop="headPhotoId" businessType="2" span="24" />
                <hy-input v-model="model.account" label="账号" required prop="account" span="12" :maxlength="50" />
                <hy-input v-model="model.name" label="姓名" required prop="name" span="12" :maxlength="50" />
                <hy-select v-model="model.gender" label="性别" required prop="gender" :list="genderList" span="12" />
                <hy-datepicker v-model="model.birthDate" label="出生日期"  prop="birthDate" span="12" />
                <hy-input v-model="model.mobile" label="手机号码" required  prop="mobile"  span="12" :maxlength="11" />
                <hy-input v-model="model.email" label="邮箱" prop="email" :rules="$utils.formValid.email" span="12" :maxlength="50" />
                <hy-radio v-model="model.status" :disabled="!this.showOrg" label="状态" required prop="status" span="12" :list="statusList" />
                <hy-checkbox v-model="model.roleIds" :disabled="!this.showOrg" label="角色" required prop="roleIds" :list="roleList" span="24" />
                <hy-input v-model="model.remark" label="备注" type="textarea" prop="remark" span="24" :maxlength="200" />

              <FormItem prop="orgIds" v-if="this.showOrg" label="组织" required :rules="{
                required: true,
                type: 'array',
                min: 1,
                message: `请选择组织`,
                trigger: 'change'
            }">
                <CheckboxGroup  v-model="model.orgIds" style="display: none;" />
                <Tree :data="orgList" :show-checkbox="true" :check-directly="true"  @on-check-change="onSelect"></Tree>
              </FormItem>

            </Row>
        </form-modal>
    </div>
</template>

<script>
import UserOperateModalBase from "../mixins/user-operate-modal-base";
import systemConsts from "@/libs/consts";
export default {
    name: "user_operate_modal",
    mixins: [UserOperateModalBase],
    data() {
        return {
            hideOk: false,
        };
    },
};
</script>
