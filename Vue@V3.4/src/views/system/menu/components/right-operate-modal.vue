<template>
  <form-modal :loading.sync="loading" :title="title" :model="model" v-bind="config" ref="right-operate-modal">
    <Row>
      <hy-span v-if="model.parentId" v-model="model.parentName" label="上级菜单" bottom span="24"/>
      <hy-input v-model="model.rightName" :label="getLabel('名称')" required prop="rightName" span="24" :maxlength="50"/>
      <hy-input v-model="model.rightKey" :label="getLabel('Key')" required prop="rightKey" span="24" :maxlength="50"/>
      <hy-input v-model="model.component" label="组件路径" prop="component" span="24" :maxlength="50"/>
      <hy-input v-model="model.path" label="第三方路径" prop="path" span="24" :maxlength="50"/>
      <hy-input v-model="model.icon" label="图标" prop="icon" span="24" :maxlength="50"/>
      <hy-input-number v-model="model.orderIndex" label="排序" prop="orderIndex" span="24"/>
      <hy-checkbox v-if="showFeature" v-model="model.feature" prop="feature" label="功能" :list="featureBtnList" span="24"/>
      <hy-radio v-if="model.rightType === 3" v-model="model.isShortcut" prop="isShortcut" label="快捷菜单" :list="Object.values($consts.common.yesNo)" span="24"/>
      <hy-radio v-model="model.status" label="状态" required prop="status" span="12" :list="statusList"/>
    </Row>
  </form-modal>
</template>

<script>
import { FormModalBase } from "@/mixins";
import consts from "@/libs/consts";

const model = {
  appId: "",
  component: "",
  icon: "",
  id: "",
  orderIndex: null,
  parentId: "",
  path: "",
  rightKey: "",
  rightName: "",
  rightType: 1,
  isShortcut: 'N',
  feature: [],
  status: consts.common.yesNo.yes.key,
  target: "",
}
export default {
  name: "right-operate-modal",
  mixins: [FormModalBase],
  data() {
    return {
      model: this.$utils.deepCopy(model),
      showFeature: false,
      statusList: [],
    }
  },
  computed: {
    title() {
      return this.model.rightType === 4 ? "功能" : "菜单"
    },
    featureBtnList() {
      return [{ key: "add", value: "添加" }, { key: "edit", value: "编辑" }, { key: "delete", value: "删除" }, { key: "detail", value: "查看" }, { key: "export", value: "导出" }]
    },
  },
  methods: {
    async initModelHandle(row) {
      this.statusList = await this.getCodeInfoList(this.$consts.system.groupKey.statusType);
      if (row) {
        this.model = Object.assign({}, row);
        this.model.isShortcut = row.isShortcut ? row.isShortcut : 'N'
        if (!row.id && row.rightType === 3) {
          this.showFeature = true
          this.model.feature = ["add", "edit", "delete", "detail", "export"]
        } else {
          this.showFeature = false
          this.model.feature = []
        }
      }
    },
    resetModel() {
      this.model = this.$utils.deepCopy(model)
    },

    getLabel(label) {
      return `${this.title}${label}`;
    }
  },
  async created() {
    Object.assign(this.config, {
      width: 500,
      okApi: "system/right/save"
    });
  }
}
</script>
