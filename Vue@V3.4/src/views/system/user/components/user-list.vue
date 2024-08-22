<template>
  <div>
    <search-page :model="model" v-bind="dataConfig" :ref="refName"  @reset="reset">
      <template>
        <hy-input v-model="model.name" label="姓名" prop="name" />
        <hy-input v-model="model.mobile" label="手机号码" prop="mobile" />
        <hy-input v-model="model.account" label="账号" prop="account" />
      </template>
      <template #toolbar-buttons>
        <hy-button-list :list="toolbarButtons" />
        <!--        <Button icon="md-add" @click="createUser" type="primary">新增</Button>-->
      </template>
    </search-page>
    <user-operate-modal ref="operate-modal" @save-success="query" />
  </div>
</template>

<script>
import UserOperateModal from "./user-operate-modal.vue";
import { PageListBase } from "@/mixins";

const model = {
  name: "",
  account: "",
  mobile: "",
}

export default {
  name: "user_list",
  mixins: [PageListBase],
  components: { UserOperateModal },
  data() {
    return {
      model: this.$utils.deepCopy(model),
      orgId: "",
    }
  },
  methods: {
    reset() {
      this.model = this.$utils.deepCopy(model);
    },

    queryByOrgId(orgId) {
      this.orgId = orgId;
      if (orgId) {
        this.pageChange();
      } else {
        this.reset();
        this.resetTableAndPage();
      }
    },

    validOrgId() {
      if (!this.orgId) {
        this.$Message.warning("请选择部门！");
        return false;
      }
      return true;
    },

    createUser() {
      if (this.validOrgId()) {
        this.$refs["operate-modal"].open("新增", { orgIds: [this.orgId] })
      }
    },
    checkUser(row) {
      let flag = true
      if (row.id == this.$consts.system.RoleType.系统管理员.defaultUserId || row.id == this.$consts.system.RoleType.企业管理员.defaultUserId) {
        flag = false
      } else {
        flag = true
      }
      return flag;
    },


  },
  computed: {
    statusList() {
      return [{ key: "Y", value: "启用" }, { key: "N", value: "停用" }]
    },
    columns() {
      return [
        { title: "姓名", key: "name", minWidth: 120, align: "center" },
        { title: "手机号码", key: "mobile", minWidth: 120, align: "center" },
        { title: "账号", key: "account", minWidth: 120, align: "center" },
        {
          title: "性别", key: "gender", minWidth: 120, align: "center",
          render: (h, params) => {
            return h('span', {}, params.row.gender === '1' ? "男" : '女')
          }
        },
        this.$utils.render.dateColumn("出生日期", "birthDate"),
        this.$utils.render.dateColumn("入职日期", "entryDate"),
        this.$utils.render.codeColumn("状态", "status", this.statusList),

        this.$utils.render.actionColumn([
          this.editAction({ permission: this.getPermissionKey('edit') }),
          this.deleteAction({ permission: this.getPermissionKey('delete'), check: row => this.checkUser(row) }, "system/user/delete"),
        ], { fixed: "right"}),
      ]
    },

    toolbarButtons() {
      return [
        {
          text: "新增", permission: this.getPermissionKey('add'), type: "primary", action: () => {
            // if (this.validOrgId()) {
              this.$refs["operate-modal"].open("新增", { orgIds: [this.orgId] })
            // }
          }
        },
      ]
    },


    dataConfig() {
      return {
        queryApi: "system/user/query",
        columns: this.columns,
        toolbarButtons: this.toolbarButtons,
        // mountedQuery: false,
        searchModelHandle: (model) => {
          model.orgId = this.orgId;
          model.includingOrganizations = true
          return model;
        },
        // searchCheck: this.validOrgId,
        exportExcel: true,
      }
    },

  },

  created() {
    // this.$store.dispatch({type: "system/role/getRoleList"});
  }
}
</script>