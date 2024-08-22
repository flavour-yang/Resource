import { FormModalBase } from '@/mixins'
import treeHelper from '@/libs/helpers/tree-helper'

const model = {
  id: '',
  account: '',
  birthDate: '',
  email: '',
  entryDate: '',
  gender: '',
  headPhotoId: '',
  headPhoto: null,
  mobile: '',
  name: '',
  password: '',
  remark: '',
  roleIds: [],
  orgIds: [],
  status: 'Y'
}
export default {
  name: 'org-operate-modal-base',
  mixins: [FormModalBase],
  data() {
    return {
      model: this.$utils.deepCopy(model),
      orgList: [],
      showOrg: true,
      roleList: []
    }
  },
  computed: {
    genderList() {
      return [
        { key: '1', value: '男' },
        { key: '0', value: '女' }
      ]
    },
    statusList() {
      return [
        { key: 'Y', value: '启用' },
        { key: 'N', value: '停用' }
      ]
    }
    // roleList() {
    //   return this.$store.state.system.user.roleList.map(m => ({ key: m.id, value: m.roleName }))
    // }
  },
  methods: {
    async initModelHandle(row) {
      if (row) {
        if (row.id) {
          //编辑
          console.log(row)
          let result = await this.$store.dispatch('system/user/query', { includingHeadPhoto: true, includingRoles: true, id: row.id })
          const { records } = await this.$utils.retrieve('system/user/queryRole')
          this.roleList = records.map(m => ({ key: m.id, value: m.roleName }))
          result.records[0].roleIds = result.records[0].roleList.map(el => el.id)
          this.model = Object.assign({}, this.model, result.records[0])
          await this.getOrgList(row.orgList)
          if (row.id == this.$consts.system.RoleType.企业管理员.defaultUserId || row.id === this.$consts.system.RoleType.系统管理员.defaultUserId) {
            this.showOrg = false
          } else {
            this.showOrg = true
          }
        } else {
          const { records } = await this.$utils.retrieve('system/user/queryRole')
          this.roleList = records.map(m => ({ key: m.id, value: m.roleName }))
          this.model = Object.assign({}, this.model, row)
          await this.getOrgList(row.orgList)
        }
      }
    },
    resetModel() {
      this.model = this.$utils.deepCopy(model)
    },
    onSelect(arr, obj) {
      let orgIds = []
      arr.forEach(item => {
        orgIds.push(item.id)
      })
      this.model.orgIds = orgIds
      console.log(this.model.orgIds)
    },

    async getOrgList(orgArr) {
      console.log(orgArr)
      const res = await this.$utils.retrieve('system/org/query')
      let result = JSON.parse(JSON.stringify(res.records))
      let list = []

      result.forEach(item => {
        let obj = {
          title: item.orgName,
          expand: false,
          id: item.id,
          parentId: item.parentId,
          checked: false
        }
        list.push(obj)
      })

      this.orgList = this.transListDataToTreeData(list, null)
      this.traverse(list, orgArr.map(m=> m.id))
      console.log(this.orgList)
    },
    transListDataToTreeData(list, root) {
      const arr = []
      // 1.遍历
      list.forEach(item => {
        // 2.首次传入空字符串  判断list的pid是否为空 如果为空就是一级节点
        if (item.parentId === root) {
          if (!item.parentId) {
            item._showChildren = true
          }
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
    traverse(arr, orgId) {
      console.log(orgId)
      arr.forEach(element => {
        if (element.children && element.children.length) {
          this.traverse(element.children, orgId)
        } else {
          element.checked = orgId.includes(element.id);
        }
        // if (orgId == element.id) {
        //   element.checked = true
        //   this.model.orgIds.push(element.id)
        //   console.log(element)
        //   console.log(this.model.orgIds)
        // }
      })
      return arr
    }
  },
  created() {
    Object.assign(this.config, {
      title: `用户`,
      width: 800,
      okApi: 'system/user/save'
    })
  }
}
