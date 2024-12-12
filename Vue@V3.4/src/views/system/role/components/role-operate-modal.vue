<template>
  <hy-form-modal ref="editModal" v-bind="config" @success="onSuccess">
    <!-- <template #title>
      {{ selfData.currentRow.tableName }}
    </template> -->
    <!--  -->
    <a-spin :loading="data.loading" style="width: 100%">
      <a-row style="width: 100%;">
        <hy-input v-model="model.roleName" label="角色名称" required field="roleName" :span="24" :maxlength="50" />
        <hy-select v-model="model.roleType" label="角色类型" required field="roleType" :span="24"
          :options="props.roleList" />
        <hy-radio v-model="model.status" label="是否启用" required isDefault field="status" :span="24"></hy-radio>
        <a-form-item label="菜单" field="rightIds">
          <hy-tree :data="menuList" label="菜单" field="rightIds" :span="24" checkable :checkedKeys="model.rightIds"
            @onCheck="onCheck" />
        </a-form-item>
      </a-row>
    </a-spin>
    <!-- </a-spin> -->
  </hy-form-modal>
  <!-- <form-modal :modelHandle="modelHandle" .sync="loading" :model="model" v-bind="config" label-position="left"
    ok-api="system/role/save" ref="role-operate-modal"> -->

  <!-- <hy-radio v-model="model.status" label="角色状态" required field="status" span="24" :list="statusList" /> -->
  <!-- <hy-checkbox v-model="model.rightIds" label="菜单" required prop="rightIds"  span="24">
          <Tree :data="menuList" show-checkbox @on-check-change="onCheckChange"></Tree>
      </hy-checkbox> -->

  <!-- <Col span="24">
      <Tabs :value="defaultKey" @on-click="onClick">
        <TabPane label="菜单" name="菜单">
          <div v-show="defaultKey === '菜单'">
            <FormItem prop="rightIds" label="" :label-width="30" style="text-align: left">
              <CheckboxGroup v-model="model.rightIds" style="display: none;" />
              <Tree :data="menuList" :show-checkbox="true" :check-directly="true" @on-check-change="onCheckChange">
              </Tree>
            </FormItem>
          </div>
        </TabPane> -->

  <!--        <TabPane label="用户" name="用户">
          <div v-show="defaultKey === '用户'">
            <Table border ref="selection" :columns="userColumns" :data="userData" @on-select="selectUser"></Table>
          </div>
        </TabPane>-->

  <!-- <TabPane label="载体" name="载体">
          <div v-show="defaultKey === '载体'">
            <FormItem prop="estateIds" label="" :label-width="30">
              <CheckboxGroup v-model="model.estateIds" style="display: none;" />
              <Tree :data="estateList" :show-checkbox="true" :check-directly="true" @on-check-change="onSelect"></Tree>
            </FormItem>
          </div>
        </TabPane>

        <TabPane label="公司" name="公司">
          <div v-show="defaultKey === '公司'">
            <Table border ref="selection" :columns="orgColumns" :data="companyList" @on-selection-change="selectOrg">
            </Table>
          </div>
        </TabPane>
      </Tabs>
      </Col> -->
  <!-- </form-modal> -->
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref, toRefs, unref } from "vue";
import { useRoleStore } from "@/stores/modules/system/role";
import { useRightStore } from "@/stores/modules/system/right";
import { retrieve } from "@/libs/utils";
const roleStore = useRoleStore()
const rightStore = useRightStore()
const editModal = ref()

interface Props {
  roleList: any[]
}
const props = withDefaults(defineProps<Props>(), {
})

const model = reactive({
  id: '',
  roleName: '',
  roleType: '',
  status: 'Y',
  rightIds: [],
  userIds: [],
  estateIds: [],
  orgIds: [],
})

const data = reactive({
  loading: false,
  menuList: []
  //  [
  //   {
  //     title: 'Trunk 0-0',
  //     key: '0-0',
  //     children: [
  //       {
  //         title: 'Branch 0-0-0',
  //         key: '0-0-0',
  //         disabled: true,
  //         children: [
  //           {
  //             title: 'Leaf',
  //             key: '0-0-0-0',
  //           },
  //           {
  //             title: 'Leaf',
  //             key: '0-0-0-1',
  //           }
  //         ]
  //       },
  //       {
  //         title: 'Branch 0-0-1',
  //         key: '0-0-1',
  //         children: [
  //           {
  //             title: 'Leaf',
  //             key: '0-0-1-0',
  //           },
  //         ]
  //       },
  //     ],
  //   },
  // ]
  // []
})

const { menuList } = toRefs(data)
const config = computed(() => ({
  title: '查看',
  width: 800,
  api: roleStore.save,// roleStore.save,
  model
}))

onMounted(() => {

})

const onSuccess = (val: any) => {
  $emits('success', val)
}

const onCheck = (checkedKeys: (string | number)[], data: any) => {
  model.rightIds = checkedKeys
}

const getMenu = async (row: any) => {
  data.loading = true
  const roleRes = await roleStore.queryById({
    id: row.id,
    includingUsers: true,
    includingEstates: true,
    includingOrganizations: true
  })

  const res = await retrieve(rightStore.query)
  let rightListIds = []
  let userIds = []
  let estateIds = []
  let orgs = []
  if (row.id) {
    if (roleRes[0].rightList) {
      rightListIds = roleRes[0].rightList.filter(f => (f.rightType !== 1)).map(child => child.id)
      userIds = roleRes[0].userList
      estateIds = roleRes[0].estateList
      orgs = roleRes[0].orgList
    }
  }
  // model.rightIds = rightListIds
  model.userIds = userIds
  model.estateIds = estateIds
  model.orgIds = orgs;
  let records = res.records
    .filter(f => f.status === 'Y') // 筛选出启用
    .map((m, index) => ({
      key: m.id,
      title: m.rightName,
      parentId: m.parentId,
      id: m.id
      // ...m
      // checked: rightListIds.includes(m.id)
    }))
  data.menuList = transListDataToTreeData(records, null)
  model.rightIds = []
  traverse(data.menuList, rightListIds)
  data.loading = false
  console.log({ rightIds: model.rightIds })
}

const traverse = (resource: any, rightListIds: string[]) => {
  resource.forEach((f: any) => {
    if (f.children && f.children.length) {
      traverse(f.children, rightListIds)
    } else {
      if (rightListIds.includes(f.id)) {
        model.rightIds.push(f.id)
      }
      // f.checked = rightListIds.includes(f.id)
    }
  })
}
const transListDataToTreeData = (list: any[], root: string | null) => {
  const arr: any[] = []
  // 1.遍历
  list.forEach(item => {
    // 2.首次传入空字符串  判断list的pid是否为空 如果为空就是一级节点
    if (!item.parentId) {
      // item.checked = false
      // item.expand = true
    }
    // item.checked = false
    if (item.parentId === root) {
      // 找到之后就要去找item下面有没有子节点  以 item.id 作为 父 id, 接着往下找
      const children = transListDataToTreeData(list, item.id)
      if (children.length > 0) {
        // 如果children的长度大于0,说明找到了子节点
        item.children = children
      }
      // 将item项, 追加到arr数组中
      arr.push(item)
    }
  })
  return arr
}

const open = (value: any) => {
  const modal = unref(editModal)
  Object.assign(model, value)
  getMenu(value)
  modal.open(value)
}
const $emits = defineEmits(['success'])
defineExpose({ open })
</script>
<style lang="less" scoped>
.ivu-tree-children li {
  margin: 0;
}
</style>