<template>
  <div>
    <search-page :model="model" v-bind="dataConfig" :ref="refName" @reset="reset">
      <template>
        <hy-select v-model="model.roleType" label="角色类型" prop="roleType" :list="roleTypeList"/>
        <hy-input v-model="model.roleName" label="角色名称" prop="roleName" :show-word-limit="false"/>
        <hy-select v-model="model.status" label="是否启用" prop="status" :list="this.$consts.common.yesNoCodeInfoList()" :clearable="false"/>
      </template>
      <Button slot="toolbar-buttons" icon="md-add" @click="create" type="primary">新增</Button>
    </search-page>
    <detail-modal ref="detail-modal"/>
    <operate-modal ref="operate-modal" @save-success="query"/>
    <permission-operate-modal ref="permission-operate-modal"/>
  </div>
</template>

<script>
import DetailModal from './role-detail-modal.vue'
import OperateModal from './role-operate-modal.vue'
import PermissionOperateModal from './role-permission-operate-modal.vue'
import {Base, PageListBase} from '@/mixins'

const model = {
  roleName: '',
  roleType: '',
  status: 'Y'
}

export default {
  name: 'role_management',
  mixins: [PageListBase, Base],
  components: {OperateModal, DetailModal, PermissionOperateModal},
  data() {
    return {
      model: this.$utils.deepCopy(model),
      codeInfo: []
    }
  },
  methods: {
    reset() {
      this.model = this.$utils.deepCopy(model)
    },
    checkRole(row) {
      let flag = true
      if (row.id == this.$consts.system.RoleType.系统管理员.defaultRoleId || row.id == this.$consts.system.RoleType.企业管理员.defaultRoleId) {
        flag = false
      } else {
        flag = true
      }
      return flag;
    },
  },
  created() {
    // this.queryCodeList('renter_type');
  },
  async mounted() {
    const codeInfo = await this.getCodeInfoList(this.$consts.system.groupKey.roleType)
    this.codeInfo = codeInfo
  },
  computed: {
    roleTypeList() {
      return this.codeInfo
    },
    columns() {
      return [
        {title: '角色名称', key: 'roleName', tooltip: true, minWidth: 250, align: 'center'},
        this.$utils.render.codeColumn('角色类型', 'roleType', this.roleTypeList),
        // { title: "创建人", key: "createPeople", minWidth: 120, align:"center" },
        {title: '状态', key: 'statusName', minWidth: 120, align: 'center'},
        // { title: "创建时间", key: "createTime", minWidth: 120, align: "center" },
        {title: '更新者', key: 'updatePeopleName', minWidth: 120, align: 'center'},
        {title: '更新时间', key: 'updateTime', minWidth: 120, align: 'center'},

        this.$utils.render.actionColumn([
          this.editAction({permission: this.getPermissionKey('edit')}),
          this.deleteAction({permission: this.getPermissionKey('delete'), check: row => this.checkRole(row)}, 'system/role/delete')
        ])
      ]
    },

    dataConfig() {
      return {
        queryApi: 'system/role/query',
        columns: this.columns
      }
    }
  }
}
</script>