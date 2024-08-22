<template>

  <div style="height: 100%">
    <hy-split v-model="splitValue">
      <template slot="left-pane">
        <input ref="input" class="hidden-input" type="text" v-on:keydown.ctrl.67.capture.prevent.stop="handleContextMenuCopy" v-on:keydown.ctrl.86.capture.prevent.stop="handleContextMenuPaste">
        <Tree :data="estateList" :check-strictly="true" :check-directly="true" class="tree" @on-select-change="selectTreeItem" @on-contextmenu="handleContextMenu">
          <template slot="contextMenu">
            <DropdownItem @click.native="handleContextMenuCopy" style="color: #2d8cf0">复制载体参数</DropdownItem>
            <DropdownItem @click.native="handleContextMenuPaste" style="color: #ed4014">粘贴</DropdownItem>
          </template>
        </Tree>
      </template>
      <template slot="right-pane">
        <Row :gutter="16">
          <Col span="24">
          <span>
            <Tabs v-model="businessType" :animated="false">
              <TabPane v-for="(item, index) in businessTypeList" :label="item.value" :name="item.key" :key="item.key" />
            </Tabs>
          </span>
          </Col>
        </Row>
        <estate-param-list ref="paramList" :businessType="[businessType]" :chooseId="estateId"></estate-param-list>
      </template>
    </hy-split>
  </div>
</template>
<script>
import estateParamList from './estate-param-list.vue'
import paramsCopyModal from './params-copy-modal.vue'
import permission from '@/libs/utils/types/permission'

export default {
  name: 'param_config',
  components: { estateParamList, paramsCopyModal },
  data() {
    return {
      splitValue: 0.25,
      businessType: [],
      paramBusinessTypeList: [],
      estateName: '',
      estateId: '',
      paramsCopyShow: false,
      estateList: [],
      postKey: '',
      userTree: [],
      canEdit1: false,
      canView1: false,
      contextData: null,
      copyId: null
    }
  },
  computed: {
    toolbarButtons() {
      return [
        {
          text: '复制载体参数',
          permission: 'param_config_save',
          type: 'primary',
          action: () => this.showParamsCopyModal()
        }
      ]
    },
    businessTypeList() {
      let result = this.paramBusinessTypeList.filter(el => permission.hasPermission('param_config_' + el.key + '_list'))
      if (result.length > 0) {
        this.businessType = result[0].key
      }
      return result
    }
  },

  methods: {
    // 获取企业项目树数据
    getEstateList() {
      let userInfo = this.$store.state.current.userInfo
      let orgList = ((userInfo && userInfo.orgList) || []).filter(org => (org.level === 1)).map(item => {
        return { title: item.orgName, value: item.id, children: [], expand: true, disabled: true }
      })
      let list = ((userInfo && userInfo.estateList) || []).map(item => {
        return { title: item.name, value: item.id, parentId: item.orgId, contextmenu: true }
      })
      orgList.forEach(org => {
        org.children = list.filter(estate => (org.value === estate.parentId))
      })
      this.estateList = orgList
    },
    selectTreeItem(value) {
      if (!value[0].parentId) {
        this.estateId = ''
        this.estateName = ''
        return
      }
      this.$refs['input'].focus()
      this.estateId = value[0].value
      this.estateName = value[0].title
      this.handleContextMenu(value[0])
    },
    async getBusinessTypeList() {
      this.paramBusinessTypeList = await this.getCodeInfoList('param_business_type')
    },
    showParamsCopyModal() {
      this.$refs['params-copy-modal'].open('', {
        estateList: this.estateList,
        paramBusinessTypeList: this.paramBusinessTypeList
      })
    },
    handleContextMenu(data) {
      this.contextData = data
    },
    handleContextMenuCopy() {
      this.copyId = this.contextData.value
      this.$Message.info('复制载体参数：' + this.contextData.title)
    },
    handleContextMenuPaste() {
      if (this.copyId == null || this.copyId == '') {
        this.$Message.info('请先复制')
        return
      }
      this.$store
        .dispatch('system/param-config/copy', {
          from: this.copyId,
          to: this.contextData.value
        })
        .then(res => {
          this.$Message.info('粘贴载体参数成功：' + this.contextData.title)
          this.$refs.paramList.getSysParamList()
        })
    }
  },
  async created() {
    this.getEstateList()
    await this.getBusinessTypeList()
  }
}
</script>

<style lang="less" scoped>
.hidden-input {
  opacity: 0;
  position: absolute;
  top: -28px;
}
</style>
