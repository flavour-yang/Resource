<template>
  <div style="height: 100%">
    <hy-split v-model="splitValue">
      <template slot="left-pane">
        <left-tree v-bind="dataConfig"
                   ref="left-tree"/>
      </template>
      <template slot="right-pane">
        <user-list ref="user"/>
      </template>
    </hy-split>
    <org-operate-modal ref="operate-modal" @save-success="getTreeData"/>
  </div>


</template>

<script>
import LeftTree from '@/components/common/tree-controls/left-tree.vue';
import OrgOperateModal from './org-operate-modal.vue';
import UserList from "./user-list.vue";

export default {
  name: 'user_management',
  components: {LeftTree, OrgOperateModal, UserList},
  data() {
    return {
      data: {},
      splitValue: 0.25,
    };
  },
  methods: {
    getTreeData() {
      this.$refs["left-tree"].getTreeData();
    },
  },
  created() {

  },
  computed: {
    dataConfig() {
      return {
        queryApi: "system/org/query",
        nameKey: "orgName",
        deleteApi: "admin-api/sys/org/delete",

        createFunc: row => {
          this.$refs["operate-modal"].open("新增", row ? {parentId: row.id, parentName: row.title} : undefined);
        },
        editFunc: row => {
          let obj = {
            id: row.data.id,
            orgName: row.data.orgName,
            orderIndex: row.data.orderIndex,
            parentId: row.data.parentId,
            parentName: row.data.parentName,
            address: row.data.address,
            email: row.data.email,
            fax: row.data.fax,
            linkMan: row.data.linkMan,
            telephone: row.data.telephone,
            remark: row.data.remark,
            isCompany: row.data.isCompany
          }
          this.$refs["operate-modal"].open("编辑", obj)
        },
        checkChangeCallbackFunc: (data, current) => {
          if (current.checked) {
            this.$refs.user.queryByOrgId(current.id);
          } else {
            this.$refs.user.queryByOrgId();
          }
        }
      }
    }
  }


}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  display: flex;

  > div {
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;

    &-last-child {
      padding: 10px;
    }
  }

  .left {
    width: 300px;
  }

  .right {
    margin-left: 10px;
    flex: 1;
  }
}
</style>