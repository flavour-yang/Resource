<template>
  <form-modal :loading.sync="loading" :model="model" v-bind="config" ref="org-operate-modal" ok-api="system/org/save">
    <Row>
      <hy-span v-if="model.parentId" v-model="model.parentName" label="上级部门" bottom span="24"/>
      <hy-input v-model="model.orgName" label="部门名称" required prop="orgName" span="24" :maxlength="50"/>
      <hy-input-number v-model="model.orderIndex" label="排序" prop="orderIndex" span="24"/>
      <hy-input v-model="model.address" label="部门地址" prop="address" span="24" :maxlength="50"/>
      <hy-input v-model="model.linkMan" label="联系人" prop="linkMan" span="24" :maxlength="50"/>
      <hy-input v-model="model.telephone" label="联系人手机" prop="telephone" :rules="$utils.formValid.mobile" span="24" :maxlength="11"/>
      <hy-input v-model="model.email" label="联系人邮箱" prop="email" :rules="$utils.formValid.email" span="24" :maxlength="50"/>
      <hy-input v-model="model.fax" label="联系人传真" prop="fax" span="24" :maxlength="50"/>
      <hy-radio v-model="model.isCompany" label="是否公司" prop="isCompany" span="24" :list="yesNoList"/>
      <hy-input v-model="model.remark" label="备注" type="textarea" prop="remark" span="24" :maxlength="200"/>
    </Row>
  </form-modal>
</template>

<script>
import OrgOperateModalBase from "../mixins/org-operate-modal-base";

export default {
  name: "org_operate_modal",
  mixins: [OrgOperateModalBase],
  data() {
    return {
      hideOk: false,
    };
  },
}

</script>
