import {FormModalBase} from '@/mixins'
import treeHelper from '@/libs/helpers/tree-helper'
import utils from '@/libs/utils'

const model = {
  roleName: '',
  roleType: '',
  status: 'Y',
  rightIds: [],
  userIds: [],
  estateIds: [],
  orgIds: []
}
export default {
  name: 'modal-base',
  mixins: [FormModalBase],
  data() {
    return {
      model: this.$utils.deepCopy(model),
      hideOk: true,
      defaultKey: '菜单',
      roleList: [],
      userColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '账号',
          key: 'account'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '部门',
          key: 'orgNameList'
        }
      ],
      orgColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '公司名称',
          key: 'orgName'
        },
      ],
      userData: [],
      estateList: [],
      menuList: [],
      companyList: [],
    }
  },
  methods: {
    async initModelHandle(row) {
      // this.menuList = []
      this.loading = true
      this.defaultKey = '菜单'
      if (row.id) {
        this.model = Object.assign({}, row)
      }
      try {
        await this.getMenu(row)
        // await this.getUserList()
        this.getEstateList()
        this.getCompanyList()
      } finally {
        this.loading = false
      }
    },
    resetModel() {
      this.model = this.$utils.deepCopy(model)
      this.menuList = []
    },
    async getCode() {
      const res = await this.getCodeInfoList(this.$consts.system.groupKey.roleType)
      this.roleList = res
    },
    modelHandle(value) {
      const orgIds = this.$store.state.current.userInfo.orgList.map(m => m.id)
      value.estateIds = value.estateIds.filter(f => !orgIds.includes(f.id))
      return value
    },
    getEstateList() {
      let userInfo = this.$store.state.current.userInfo
      let orgList = userInfo.orgList
      let estateList = userInfo.estateList

      let treeList = []

      treeList = treeHelper.toTreeList(null, orgList, {
        titleKey: 'orgName'
      })

      treeList.forEach(treeItem => {
        let childItemList = estateList.filter(codeItem => codeItem.orgId === treeItem.id) || []

        childItemList.forEach(item => {
          item.expand = true
        })
        treeHelper.toTreeList(treeItem, childItemList, {
          titleKey: 'name'
        })
      })
      treeList.forEach(item => {
        if (!item.children.length) {
          item.disabled = true
        }
      })
      this.traverse(treeList, this.model.estateIds)
      this.estateList = treeList
    },
    getCompanyList() {
      this.$utils.retrieve('system/org/query', { isCompany: 'Y'}).then(res => {
        this.companyList = JSON.parse(JSON.stringify(res.records))
        this.companyList.forEach(item => {
          this.model.orgIds.forEach(id => {
            if (id === item.id){
              item._checked = true
            }
          })
        })
      })
    },
    onSelect(arr, obj) {
      this.model.estateIds = arr.map(m => m.id)
      // arr.map(,this.model.estateIds)
      //   this.traverse1(this.estateList, this.model.estateIds)
      // this.$set(this, 'estateList', this.estateList)
    },
    async getMenu(row) {
      const roleRes = await this.$store.dispatch('system/role/queryById', {
        id: row.id,
        includingUsers: true,
        includingEstates: true,
        includingOrganizations: true
      })
      const res = await utils.retrieve('system/right/query')
      let rightListIds = []
      let userIds = []
      let estateIds = []
      let orgs = []
      if (row.id) {
        if (roleRes[0].rightList) {
          rightListIds = roleRes[0].rightList.map(child => child.id)
          userIds = roleRes[0].userList
          estateIds = roleRes[0].estateList
          orgs = roleRes[0].orgList
        }
      }
      this.model.rightIds = rightListIds
      this.model.userIds = userIds
      this.model.estateIds = estateIds
      this.model.orgIds = orgs;
      let records = res.records
        .filter(f => f.status === 'Y') // 筛选出启用
        .map((m, index) => ({
          title: m.rightName,
          ...m
          // checked: rightListIds.includes(m.id)
        }))
      this.menuList = this.transListDataToTreeData(records, null)
      this.traverse(this.menuList, rightListIds)
    },
    traverse(resource, rightListIds) {
      resource.forEach(m => {
        if (m.children && m.children.length) {
          this.traverse(m.children, rightListIds)
        } else {
          m.checked = rightListIds.includes(m.id)
        }
      })
    },
    transListDataToTreeData(list, root) {
      const arr = []
      // 1.遍历
      list.forEach(item => {
        // 2.首次传入空字符串  判断list的pid是否为空 如果为空就是一级节点
        if (!item.parentId) {
          item.checked = false
          item.expand = true
        }
        item.checked = false
        if (item.parentId === root) {
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
      return arr
    },
    onCheckChange(node, current) {
      this.model.rightIds = node.map(m => m.id)
    },
    onClick(name) {
      this.defaultKey = name
    },

    async getUserList() {
      const result = await utils.retrieve('system/user/query', {
        includingOrganizations: true
      })
      result.records.forEach(item => {
        let orgNameList = []
        item.orgList.forEach(org => {
          orgNameList.push(org.orgName)
        })
        item.orgNameList = orgNameList.join(',')
      })
      this.userData = []
      this.userData = [...result.records]

      this.userData.forEach(item => {
        this.model.userIds.forEach(userId => {
          if (userId == item.id) {
            item._checked = true
          }
        })
      })
    },
    selectUser(val) {
      this.model.userIds = val.map(obj => obj.id)
    },
    selectOrg(val) {
      this.model.orgIds = val.map(obj => obj.id)
      console.log(val)
    }
  },

  computed: {
    roleTypeList() {
      return this.roleList
    },
    statusList() {
      return [
        { key: 'Y', value: '启用' },
        { key: 'N', value: '停用' }
      ]
    }
  },

  created() {
    Object.assign(this.config, {
      title: `角色`,
      width: 700,
      hideOk: this.hideOk
    })
  },
  mounted() {
    this.getCode()
  }
}
