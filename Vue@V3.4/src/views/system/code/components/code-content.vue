<template>
  <hy-card>
    <div class="code-manage-search">
      <Input search enter-button placeholder="请输入关键字查询" class="code-manage-search-input" v-model="keyWord" @on-search="fetchBySearch" />
      <Button :loading="loading" type="primary" icon="ios-refresh" style="height: 32px; margin-top: 1px" @click="searchRefresh">重置</Button>
    </div>
    <Spin fix v-if="loading" />
    <Tree :data="treeData" :render="renderContent" :check-strictly="true" :check-directly="true" show-checkbox @on-check-change="onCheckChange"></Tree>
  </hy-card>
</template>
<script>
import treeHelper from '@/libs/helpers/tree-helper.js'
import utils from '@/libs/utils'

export default {
  data() {
    return {
      orignalTreeData: [],
      treeData: [],
      keyWord: '',
      staticTree: [],
      loading: false
    }
  },
  computed: {},
  async mounted() {
    this.loadTreeData()
  },
  methods: {
    async loadTreeData(params = {}) {
      this.loading = true
      const { records: groupList } = await utils.retrieve('system/code/queryCodeGroup')
      const { records: codeList } = await utils.retrieve('system/code/query')

      this.loading = false
      this.orignalTreeData = treeHelper.toTreeList(null, groupList, {
        titleKey: 'groupName'
      })
      this.orignalTreeData.forEach(treeItem => {
        let childItemList = codeList.filter(codeItem => codeItem.groupKey === treeItem.data.groupKey) || []
        treeHelper.toTreeList(treeItem, childItemList, {
          titleKey: 'codeName'
        })
      })

      this.treeData = treeHelper.copyTree(this.orignalTreeData)
      if (params.groupKey) {
        this.groupExpand(this.treeData, params.groupKey)
      }
    },

    fetchBySearch(value) {
      this.treeData = treeHelper.searchTree(this.orignalTreeData, value)
    },

    searchRefresh() {
      this.keyWord = ''
      this.loadTreeData()
    },

    groupExpand(list, key) {
      const expandChild = list => {
        list.map(item => {
          if (item.data.groupKey === key) {
            item.expand = true
            if (item.children) {
              expandChild(item.children)
            }
          }
        })
      }
      const findItem = (resource, key) => {
        resource.map(item => {
          if (item.data.groupKey === key) {
            item.expand = true
            if (item.children) {
              expandChild(item.children)
            }
          }
        })
      }
      findItem(list, key)
    },

    userSubmitTreeData(value) {
      const findItem = (resource, id) => {
        resource.map(item => {
          if (item.id === id) {
            item.title = value.title
            item.data.description = value.description
            item.data.codeKey = value.codeKey
            item.data.codeName = value.codeName
            item.data.orderIndex = value.orderIndex
            item.data.status = value.status
            item.data.groupKey = value.groupKey
            item.data.groupName = value.groupName
          }
          if (item.children) {
            findItem(item.children, id)
          }
        })
      }

      findItem(this.treeData, value.id)
    },

    onCheckChange(selectNode, node) {
      const { data } = node
      var isChecked = node.checked
      // 清空所有已选中的 obj选中的当前对象
      selectNode.forEach(item => {
        item.checked = false
      })
      // 只选中最后一次选中的
      if (!isChecked) {
        node.checked = false
        this.$emit('on-check-tree', {})
      } else {
        this.$emit('on-check-tree', node)
        node.checked = true
      }
    },

    renderContent(h, { root, node, data }) {
      return h(
        'span',
        {
          style: {
            display: 'inline-block',
            width: '100%'
          }
        },
        [
          h(
            'span',
            {
              class: node.node.selected ? 'ivu-tree-title ivu-tree-title-selected' : 'ivu-tree-title'
            },
            [
              h('Icon', {
                props: {
                  type: 'ios-paper-outline'
                },
                style: {
                  marginRight: '8px'
                }
              }),
              h('span', data.title)
            ]
          ),
          h('span', {
            style: {
              display: 'inline-block',
              float: 'right',
              marginRight: '32px'
            }
          })
        ]
      )
    }
  }
}
</script>
<style lang="less" scoped>
.code-manage-search {
  display: flex;
  &-input {
    width: 60%;
    margin-bottom: 10px;
    margin-right: 10px;
  }
}
</style>