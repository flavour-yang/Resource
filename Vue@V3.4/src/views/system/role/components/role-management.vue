<template>
  <div>
    <hy-table ref="tableIt" :columns="columns" :model="model" v-bind="config">
      <template #search>
        <!-- field="name" label="Username" -->
        <hy-select v-model="model.roleType" label="角色类型" field="roleType" :options="selfData.roleList" />
        <hy-input v-model="model.roleName" label="角色名称" field="roleName" :options="[]" />
        <hy-select v-model="model.status" label="是否启用" field="status" :allowClear="false" :options="selfData.status" />
        <!-- <hy-select v-model="model.status" label="是否启用" prop="status" :list="this.$consts.common.yesNoCodeInfoList()"
          :clearable="false" /> -->
      </template>
      <template #action="{ record, value }">
        <a-button type="text" @click="onRow({ record, value })">编辑</a-button>
      </template>
    </hy-table>
    <RoleDetailModal ref="operateModal" :roleList="selfData.roleList" @success="onSuccess" />
    <!-- <search-page :model="model" v-bind="dataConfig" :ref="refName" @reset="reset">
      <template>
      </template>
      <Button slot="toolbar-buttons" icon="md-add" @click="create" type="primary">新增</Button>
    </search-page>
    <detail-modal ref="detail-modal" />
    <operate-modal ref="operate-modal" @save-success="query" />
    <permission-operate-modal ref="permission-operate-modal" /> -->
  </div>
</template>

<script lang="ts" setup>
import consts from '@/libs/consts';
import { useAppStore } from '@/stores/modules/app';
import { useRoleStore } from '@/stores/modules/system/role';
import { hasPermission } from '@/libs/utils';
import { computed, h, onMounted, reactive, ref, unref } from 'vue'
const roleStroe = useRoleStore()
const appStroe = useAppStore()
const operateModal = ref()
const tableIt = ref()
import RoleDetailModal from './role-operate-modal.vue'
// import PermissionOperateModal from './role-permission-operate-modal.vue'

const selfData = reactive({
  currentRow: { tableName: '' },
  currentStrRow: '',
  params: {},
  roleList: [],
  status: Object.values(consts.common.yesNo)
})
const model = reactive({
  roleName: '',
  roleType: '',
  status: 'Y'
})

const config = computed(() => {
  return {
    api: roleStroe.query,
  }
})

const columns = [
  { title: '角色名称', dataIndex: 'roleName', minWidth: 250, align: 'center' },
  {
    title: '角色类型', dataIndex: 'roleType', minWidth: 250, align: 'center', render: ({ record }) => {
      const find = selfData.roleList.find((f: any) => f.value === record.roleType) || { label: '' }
      return h('span', find.label)
    }
  },
  // this.$utils.render.codeColumn('角色类型', 'roleType', this.roleTypeList),
  { title: '状态', dataIndex: 'statusName', minWidth: 120, align: 'center' },
  { title: '更新者', dataIndex: 'updatePeopleName', minWidth: 120, align: 'center' },
  { title: '更新时间', dataIndex: 'updateTime', minWidth: 120, align: 'center' },
  {
    title: '操作',
    dataIndex: 'action',
    slotName: 'action',
    fixed: 'right',
    align: 'right'
  }
]


onMounted(async () => {
  selfData.roleList = await appStroe.getCodeInfoList(consts.system.groupKey.roleType)

})
const onRow = ({ record, value }: any) => {
  const modal = unref(operateModal)
  modal.open(record)
  // const editRef = unref(editModal) as { open: () => void } | null
  // if (editRef) {
  //   editRef.open()
  // }
  // selfData.currentRow = record
  // selfData.currentStrRow = JSON.stringify(record, null, '\t')
}
const onSuccess = () => {
  const table = unref(tableIt)
  table.query()
}

// export default {
//   name: 'role_management',
//   mixins: [PageListBase, Base],
//   components: { OperateModal, DetailModal, PermissionOperateModal },
//   data() {
//     return {
//       model: this.$utils.deepCopy(model),
//       codeInfo: []
//     }
//   },
//   methods: {
//     reset() {
//       this.model = this.$utils.deepCopy(model)
//     },
//     checkRole(row) {
//       let flag = true
//       if (row.id == this.$consts.system.RoleType.系统管理员.defaultRoleId || row.id == this.$consts.system.RoleType.企业管理员.defaultRoleId) {
//         flag = false
//       } else {
//         flag = true
//       }
//       return flag;
//     },
//   },
//   created() {
//     // this.queryCodeList('renter_type');
//   },
//   async mounted() {
//     const codeInfo = await this.getCodeInfoList(this.$consts.system.groupKey.roleType)
//     this.codeInfo = codeInfo
//   },
//   computed: {
//     roleTypeList() {
//       return this.codeInfo
//     },
//     dataConfig() {
//       return {
//         queryApi: 'system/role/query',
//         columns: this.columns
//       }
//     }
//   }
// }
</script>