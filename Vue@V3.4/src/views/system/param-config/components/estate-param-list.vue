<template>
  <div class="split-pane-page-wrapper" v-if="tableData.length > 0">
    <Button type="primary" @click="showAddParam" style="margin-bottom: 5px;display: none" v-if="this.canEdit">新增参数</Button>
    <Card v-for="item in tableData" style="margin-bottom: 10px" :key="item.id" dis-hover>
      <h3 style="padding-left: 10px;padding-bottom: 3px">{{item.paramName}}
        <Button type="primary" v-if="item.isAddable === 'Y'" @click="showAdd(item)" size="small">添加</Button>
      </h3>
      <h4 style="padding-left: 10px;padding-bottom: 2px;color:red">{{item.remark}}</h4>
      <List v-if="item.paramValueList != null">
        <ListItem v-for="ita in item.paramValueList" :key="ita.id">
          <InputNumber v-if="item.isAddable === 'Y'" :active-change="false" :min="1" :max="999" v-model="ita.orderIndex" style="width: 50px;margin: 0 10px 0 0"></InputNumber>
          <b>内容：</b>
          <div v-for="itaa in item.texts" style="padding: 0 2px" :key="itaa.id">
            <div v-if="itaa == '${a}'">
              <param-type-item @setValue="setValue" :paramKey="ita.paramKey" :id="ita.id" :type="item.paramTypeA" name="paramValueA" :value="ita.paramValueA"></param-type-item>
            </div>
            <div v-else-if="itaa == '${b}'">
              <param-type-item @setValue="setValue" :paramKey="ita.paramKey" :id="ita.id" :type="item.paramTypeB" name="paramValueB" :value="ita.paramValueB"></param-type-item>
            </div>
            <div v-else-if="itaa == '${c}'">
              <param-type-item @setValue="setValue" :paramKey="ita.paramKey" :id="ita.id" :type="item.paramTypeC" name="paramValueC" :value="ita.paramValueC"></param-type-item>
            </div>
            <div v-else-if="itaa == '${d}'">
              <param-type-item @setValue="setValue" :paramKey="ita.paramKey" :id="ita.id" :type="item.paramTypeD" name="paramValueD" :value="ita.paramValueD"></param-type-item>
            </div>
            <div v-else-if="itaa == '${e}'">
              <param-type-item @setValue="setValue" :paramKey="ita.paramKey" :id="ita.id" :type="item.paramTypeE" name="paramValueE" :value="ita.paramValueE"></param-type-item>
            </div>
            <div v-else-if="itaa == '${f}'">
              <param-type-item @setValue="setValue" :paramKey="ita.paramKey" :id="ita.id" :type="item.paramTypeF" name="paramValueF" :value="ita.paramValueF"></param-type-item>
            </div>
            <div v-else-if="itaa == '${g}'">
              <param-type-item @setValue="setValue" :paramKey="ita.paramKey" :id="ita.id" :type="item.paramTypeG" name="paramValueG" :value="ita.paramValueG"></param-type-item>
            </div>
            <div v-else-if="itaa == '${h}'">
              <param-type-item @setValue="setValue" :paramKey="ita.paramKey" :id="ita.id" :type="item.paramTypeH" name="paramValueH" :value="ita.paramValueH"></param-type-item>
            </div>
            <div v-else-if="itaa == '${i}'">
              <param-type-item @setValue="setValue" :paramKey="ita.paramKey" :id="ita.id" :type="item.paramTypeI" name="paramValueI" :value="ita.paramValueI"></param-type-item>
            </div>
            <div v-else-if="itaa == '${j}'">
              <param-type-item @setValue="setValue" :paramKey="ita.paramKey" :id="ita.id" :type="item.paramTypeJ" name="paramValueJ" :value="ita.paramValueJ"></param-type-item>
            </div>
            <div v-else>{{itaa}}</div>
          </div>
          <Checkbox v-model="ita.status" :true-value='trueValue' :false-value='falseValue'>启用
            <!--              v-if="item.isAddable === 'Y'"-->
          </Checkbox>
          <Button v-if="item.isAddable === 'Y' " type="error" @click="deleteOne(ita)" size="small" style="margin-left: 5px">
            删除
          </Button>
        </ListItem>
      </List>
      <!--        <br>-->
    </Card>
    <hy-button-list class="margin-top-10" :list="toolbarButtons" />
    <param-value-add-modal :modalShow="modalShow" :param="param" :chooseId="chooseId" @model-close="modelClose"/>
  </div>
</template>
<script>
import paramValueAddModal from './param-value-add-modal.vue'
import paramTypeItem from './param-value-component.vue'

export default {
  name: 'estate-param-list',
  components: {  paramValueAddModal, paramTypeItem },
  props: {
    businessType: {
      type: Array,
      default: []
    },
    chooseId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      trueValue: 'Y',
      falseValue: 'N',
      tableIds: [],
      modalShow: false,
      rowKey: 'keyId',
      id: '',
      // type: 'time',
      keys: [],
      tableData: [],
      saveEntity: [],
      param: { texts: [] },
      canEdit: false,
      canView: false
    }
  },
  methods: {
    showAdd(item) {
      this.modalShow = true
      this.param = item
    },
    modelClose() {
      this.modalShow = false
      this.param = { texts: [] }
      this.getSysParamList()
    },
    getSysParamList() {
      this.tableData = []
      if (this.chooseId == '') {
        return
      }
      this.$store
        .dispatch('system/param-config/getSysParamList', {
          businessType: this.businessType,
          keys: this.keys,
          estateId: this.chooseId
        })
        .then(res => {
          this.tableData = res
        })
    },

    setValue(value, name, id, paramKey) {
      this.tableData.forEach(item => {
        item.paramValueList.forEach(it => {
          if (it.id === id && it.paramKey === paramKey) {
            it[name] = value
          }
        })
      })
    },
    batchSave() {
      let saves = []
      this.tableData.forEach(item => {
        item.paramValueList.forEach(it => {
          saves.push(it)
        })
      })
      console.log(saves, 'this.tableData')
      this.$store.dispatch("system/param-config/save", {estateId: this.chooseId, items: saves}).then(res => {
          this.tableData = []
          this.$Message.success('操作成功')
          this.getSysParamList()
      })
    },
    deleteOne(it) {
      this.$Modal.confirm({
        title: '删除确认',
        content: '您确定要删除选择的记录吗?',
        onOk: () => {
          this.$store.dispatch("system/param-config/deleteParamValue",{id:it.id}).then(res => {
            this.$Message.success('删除成功!')
            this.getSysParamList()
          })
        }
      })
    },
  },
  computed: {
    toolbarButtons() {
      return [
        {
          text: '保存',
          permission: 'param_config_save',
          type: 'primary',
          action: () => this.batchSave()
        }
      ]
    }
  },
  mounted() {
  },
  created() {},
  watch: {
    chooseId: function () {
      this.getSysParamList()
    },
    businessType:{
      deep: true,
      handler(n, o) {
        this.getSysParamList()
      }
    }
  },

}
</script>
<style scoped>
.ivu-form-item {
  margin-bottom: 0;
}

.ivu-card >>> .ivu-card-body {
  padding: 10px 16px;
}

.ivu-list-item {
  padding: 2px;
  flex-wrap: wrap;
  line-height: 40px;
}
</style>
