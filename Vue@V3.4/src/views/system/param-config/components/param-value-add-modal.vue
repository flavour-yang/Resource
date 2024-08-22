<template>
  <div>
    <Modal :value="modalShow" :loading="true" :mask-closable="false" :width="modalWidth" :title="modalTitle"
      class-name="vertical-center-modal" @on-cancel="modelClose">
      <i-form ref="entity" :model="entity" :label-width="120" style="padding-right: 5px;font-size: 20px">
        <Row>
          <i-col span="3">
            <Form-item label="排序：" :label-width="labelWidth">
              <InputNumber :active-change="false" :min="0" :max="999" v-model="entity.orderIndex"></InputNumber>
            </Form-item>
          </i-col>
          <i-col span="21">
            <Form-item label="内容：" :label-width="labelWidth">
              <div v-for="itaa in param.texts" style="float: left; padding: 0 2px">
                <div v-if="itaa == '${a}'">
                  <param-type-item @setValue="setValue" :type="param.paramTypeA" name="paramValueA"></param-type-item>
                </div>
                <div v-else-if="itaa == '${b}'">
                  <param-type-item @setValue="setValue" :type="param.paramTypeB" name="paramValueB"></param-type-item>
                </div>
                <div v-else-if="itaa == '${c}'">
                  <param-type-item @setValue="setValue" :type="param.paramTypeC" name="paramValueC"></param-type-item>
                </div>
                <div v-else-if="itaa == '${d}'">
                  <param-type-item @setValue="setValue" :type="param.paramTypeD" name="paramValueD"></param-type-item>
                </div>
                <div v-else-if="itaa == '${e}'">
                  <param-type-item @setValue="setValue" :type="param.paramTypeE" name="paramValueE"></param-type-item>
                </div>
                <div v-else-if="itaa == '${f}'">
                  <param-type-item @setValue="setValue" :type="param.paramTypeF" name="paramValueF"></param-type-item>
                </div>
                <div v-else-if="itaa == '${g}'">
                  <param-type-item @setValue="setValue" :type="param.paramTypeG" name="paramValueG"></param-type-item>
                </div>
                <div v-else-if="itaa == '${h}'">
                  <param-type-item @setValue="setValue" :type="param.paramTypeH" name="paramValueH"></param-type-item>
                </div>
                <div v-else-if="itaa == '${i}'">
                  <param-type-item @setValue="setValue" :type="param.paramTypeI" name="paramValueI"></param-type-item>
                </div>
                <div v-else-if="itaa == '${j}'">
                  <param-type-item @setValue="setValue" :type="param.paramTypeIJ" name="paramValueJ"></param-type-item>
                </div>
                <div v-else>{{itaa}}</div>
              </div>
              <div style="clear: both"></div>
            </Form-item>
          </i-col>
        </Row>
      </i-form>
      <div slot="footer">
        <Button style="margin-right: 8px" @click="modelClose">关闭</Button>
        <Button type="primary" @click="handleSubmit">保存</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import paramTypeItem from "./param-value-component.vue";

export default {
  name: 'param-value-add-modal',
  components: { paramTypeItem },
  props: {
    modalShow: { type: Boolean },
    param: {},
    chooseId: { type: String }
  },
  data () {
    return {
      labelWidth: 60,
      ruleValidate: {},
      publicTag: [],
      modalTitle: '添加',
      modalWidth: '66%',
      entity: { orderIndex: 1 },
    }
  },
  methods: {
    modelClose () {
      this.$emit('model-close');
      this.entity = { orderIndex: 1 };
    },
    handleSubmit () {
      this.entity.paramKey = this.param.paramKey;
      this.entity.formatText = this.param.formatText;
      this.$store.dispatch("system/param-config/save", {estateId:this.chooseId, items:[this.entity]}).then(res => {
        this.$Message.success('添加成功!');
        this.$emit('model-close')
      })
    },
    setValue (value, name, id) {
      this.entity[name] = value;
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>
<style scoped>
.ivu-form-item >>> .ivu-form-item-label {
  font-weight: bolder;
  font-size: 14px;
  line-height: 2.2;
  padding: 0;
}

.ivu-form-item >>> .ivu-form-item-content {
  font-size: 14px;
}
</style>
