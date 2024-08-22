<template>
  <div style="height: 100%">
    <Button v-has="getPermissionKey('add')"
            type="primary"
            style="margin-bottom: 10px;"
            @click="createItem"
            icon="md-add">新增
    </Button>

    <Button
            type="primary"
            style="margin-bottom: 10px; margin-left: 10px"
            @click="refresh"
            icon="md-refresh">刷新
    </Button>
    <Table row-key="id"
           :columns="columns"
           :data="dataResource"
           :load-data="handleLoadData"
           update-show-children
           border>
      <template #action="{ row, index }">
        <a v-has="getPermissionKey('add')"
           v-if="row && row.rightType !== 4"
           type="primary"
           size="small"
           style="margin:0 5px;display: inline-block;"
           @click="add(row)">新增</a>
        <span v-has="getPermissionKey('add')"
              v-if="row && row.rightType !== 4"
              style="color: grey; border-right: 1px solid rgb(157, 155, 155); display: inline-block; height: 10px;"></span>
        <a v-has="getPermissionKey('edit')"
           type="primary"
           size="small"
           style="margin:0 5px;display: inline-block;"
           @click="edit(row)">编辑</a>
        <span v-has="getPermissionKey('delete')"
              style="color: grey; border-right: 1px solid rgb(157, 155, 155); display: inline-block; height: 10px;"></span>
        <a v-has="getPermissionKey('delete')"
           type="error"
           size="small"
           style="margin:0 5px;display: inline-block;"
           @click="remove(row)">删除</a>
           <span v-has="getPermissionKey('delete')"
              style="color: grey; border-right: 1px solid rgb(157, 155, 155); display: inline-block; height: 10px;"></span>
        <a v-has="getPermissionKey('edit')"
           size="small"
           style="margin:0 5px;display: inline-block;"
           @click="viewSql(row)">SQL</a>
      </template>
    </Table>
    <right-operate-modal ref="operate-modal"
                         @save-success="onSaveSuccess"/>
                         <right-detail-sql ref="right-modal-sql"/>
  </div>
</template>

<script>
// import LeftTree from '@/components/common/tree-controls/left-tree.vue';
import RightOperateModal from "../components/right-operate-modal.vue";
import {Base, PageListBase} from "@/mixins";
import consts from "@/libs/consts";
import utils from "@/libs/utils";
import RightDetailSql from './right-detail-sql.vue';

export default {
  name: 'menu_management',
  components: {RightOperateModal, RightDetailSql},
  mixins: [PageListBase, Base],
  data() {
    return {
      columns: [
        {
          title: '菜单名称',
          key: 'rightName',
          tree: true
        },
        {
          title: '菜单key',
          key: 'rightKey',
        },
        {
          title: '组件路径',
          key: 'component',
        }, {
          title: '菜单类型',
          key: 'rightTypeName',
        },
        {
          title: '排序值',
          key: 'orderIndex',
        }, {
          title: '状态',
          key: 'statusName',
        },
        {
          title: '操作',
          slot: 'action',
          width: 200,
          align: 'center'
        }
      ],
      dataList: [],
      userActionRow: {}
    };
  },
  methods: {
    transListDataToTreeData(list, root) {
      const arr = []
      // 1.遍历
      list.forEach(item => {
        // 2.首次传入空字符串  判断list的pid是否为空 如果为空就是一级节点
        if (item.parentId === root) {
          // if (!item.parentId) {
          //   item._showChildren = true
          // }
          // 找到之后就要去找item下面有没有子节点  以 item.id 作为 父 id, 接着往下找
          const children = this.transListDataToTreeData(list, item.id)
          if (children.length > 0) {
            // 如果children的长度大于0,说明找到了子节点
            item.children = children
          }
          // 将item项, 追加到arr数组中
          arr.push(item)
        }
      })

      for (let i = 0; i < arr.length; i++) {
        if (i == 0 && !arr[i].parentId) {
          arr[i]._showChildren = true
        }
      }
      return arr
    },

    createItem() {
      this.$refs["operate-modal"].open("新增菜单")
    },
    async refresh() {
      console.log('刷新')
      await this.$store.dispatch("system/right/refresh");

    },

    async handleLoadData(item, callback) {
      const res = await utils.retrieve("system/right/query", {parentId: item.id})
      let result = res.records
      result.forEach(child => {
        if (child.rightType != 4) {
          child.children = []
          child._loading = false
        }
      })
      callback(result);
    },

    add(row) {
      console.log(row)
      if (row && row.rightType === 4) {
        this.$Message.warning("功能不能新增子项，请选择菜单！")
        return;
      }
      this.userActionRow = {...row, userActionType: 'add'}
      this.$refs["operate-modal"].open("添加子菜单", row ?
          {parentId: row.id, parentName: row.rightName, appId: row.appId, rightType: row.rightType + 1, status: consts.common.yesNo.yes.key} : undefined)
    },

    edit(row) {
      this.userActionRow = {...row, userActionType: 'edit'}
      this.$refs["operate-modal"].open("编辑", row)

    },
    remove(row) {
      this.userActionRow = {...row, userActionType: 'remove'}
      // console.log("这是删除！")
      // console.log(row.id)
      // this.$store.dispatch("system/right/delete", row.id)
      this.$utils.modal.deleteConfirm(async () => {
        await this.$store.dispatch("system/right/delete", row.id);
        // this.expandTable(row)
        this.loadData()
      });

    },

    viewSql(row){
      this.$refs["right-modal-sql"].open("sql", row)
    },

    async expandTable(row) {
      const res = await utils.retrieve("system/right/query")
      this.findParent2(res.records, row.parentId)
      const treeData = this.transListDataToTreeData(res.records, null)
      this.dataList = treeData
    },

    async onSaveSuccess(payload) {
      // console.log(payload)
      const row = this.userActionRow
      const action = row.userActionType
      this.loadData()
      // if (action) {
      //   switch (action) {
      //     case 'add':
      //       // this.expandTable(payload)
      //       this.loadData()
      //
      //       break;
      //     case 'edit':
      //       // this.expandTable(payload)
      //       this.loadData()
      //
      //       break;
      //     default:
      //       break;
      //   }
      // } else {
      //   this.loadData()
      // }
    },

    findParent2(list, parentId) {
      list.map(item => {
        if (item.id === parentId) {
          item._showChildren = true
          this.findParent2(list, item.parentId)
        }
      })
      return list
    },

    loadData(item, callback) {
      let id
      if (item) {
        id = item.id
      }
      utils.retrieve("system/right/query",{
        parentId: id,
        rightType: [this.$consts.system.rightType.系统.code, this.$consts.system.rightType.模块.code]
      }).then((data) => {
        let res = JSON.parse(JSON.stringify(data.records))
        let dataList = this.transListDataToTreeData(res, null)
        dataList.forEach(object => {
          if (object.children) {
            object.children.forEach(child => {
              if (child.rightType != 4) {
                child._loading = false
                child.children = []
              }
            })
          }
        })
        if (item) {
          callback(dataList)
        } else {
          this.dataList = dataList
        }
      }).catch((err) => {
        this.$message.error("加载失败！" + err);
      });
    },
  },
  computed: {
    dataResource() {
      return this.dataList
    }
  },
  created() {
    this.loadData()

  },
  mounted() {
    console.log(this.getPermissionKey('delete'))
  }
};
</script>

<style scoped></style>