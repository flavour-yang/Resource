<template>
  <form-modal :modelHandle="modelHandle" :loading.sync="loading" :model="model" v-bind="config" label-position="left" ok-api="system/role/save" ref="role-operate-modal">
    <Row>
      <hy-input v-model="model.roleName" label="角色名称" required prop="roleName" span="24" :maxlength="50" />
      <hy-select v-model="model.roleType" label="角色类型" required prop="roleType" span="24" :list="roleTypeList" />
      <hy-radio v-model="model.status" label="角色状态" required prop="status" span="24" :list="statusList" />
      <!-- <hy-checkbox v-model="model.rightIds" label="菜单" required prop="rightIds"  span="24">
          <Tree :data="menuList" show-checkbox @on-check-change="onCheckChange"></Tree>
      </hy-checkbox> -->

      <Col span="24">
      <Tabs :value="defaultKey" @on-click="onClick">
        <TabPane label="菜单" name="菜单">
          <div v-show="defaultKey === '菜单'">
            <FormItem prop="rightIds" label="" :label-width="30" style="text-align: left">
              <CheckboxGroup v-model="model.rightIds" style="display: none;" />
              <Tree :data="menuList" :show-checkbox="true" :check-directly="true" @on-check-change="onCheckChange"></Tree>
            </FormItem>
          </div>
        </TabPane>

<!--        <TabPane label="用户" name="用户">
          <div v-show="defaultKey === '用户'">
            <Table border ref="selection" :columns="userColumns" :data="userData" @on-select="selectUser"></Table>
          </div>
        </TabPane>-->

        <TabPane label="载体" name="载体">
          <div v-show="defaultKey === '载体'">
            <FormItem prop="estateIds" label="" :label-width="30">
              <CheckboxGroup v-model="model.estateIds" style="display: none;" />
              <Tree :data="estateList" :show-checkbox="true" :check-directly="true" @on-check-change="onSelect"></Tree>
            </FormItem>
          </div>
        </TabPane>

        <TabPane label="公司" name="公司">
          <div v-show="defaultKey === '公司'">
            <Table border ref="selection" :columns="orgColumns" :data="companyList" @on-selection-change="selectOrg"></Table>
          </div>
        </TabPane>
      </Tabs>
      </Col>

    </Row>
  </form-modal>
</template>

<script>
import ModalBase from '../mixins/modal-base'

export default {
  name: 'role-operate-modal',
  mixins: [ModalBase],
  data() {
    return {
      hideOk: false
    }
  }
}
</script>
<style lang="less" scoped>
.ivu-tree-children li {
  margin: 0;
}
</style>