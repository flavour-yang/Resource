<template>
  <div>
    <Modal :value="modalShow" :loading="true" :mask-closable="false" :width="modalWidth" :title="modalTitle"
      class-name="vertical-center-modal" @on-cancel="modelClose">
      <i-form ref="entity" :model="entity" :label-width="120" style="padding-right: 5px">
        <Row>
          <i-col span="24">
            <Form-item label="参数名称">
              <i-input v-model.trim="entity.paramName" :maxlength=200></i-input>
            </Form-item>
          </i-col>
        </Row>
        <Row>
          <i-col span="24">
            <Form-item label="用于参数分类businessType(不可重复)">
              <i-input v-model.trim="entity.businessType" :maxlength=200></i-input>
            </Form-item>
          </i-col>
        </Row>
        <Row>
          <i-col span="24">
            <Form-item label="参数key">
              <i-input v-model.trim="entity.paramKey" :maxlength=100></i-input>
            </Form-item>
          </i-col>
        </Row>
        <Row>
          <i-col span="24">
            <Form-item label="detail展示文字">
              <i-input v-model.trim="entity.formatText" :maxlength=200></i-input>
            </Form-item>
          </i-col>
        </Row>
        <Row>
          <i-col span="24">
            <Form-item label="">
              值类型( 1：数值; 2：字符串; 3:时间选择(时分); ... 选择框(代码组key))
            </Form-item>
          </i-col>
        </Row>
        <Row>
          <i-col span="24">
            <Form-item label="A值类型">
              <i-input v-model.trim="entity.valueAType" :maxlength=100></i-input>
            </Form-item>
          </i-col>
        </Row>
        <Row>
          <i-col span="24">
            <Form-item label="B值类型">
              <i-input v-model.trim="entity.valueBType" :maxlength=100></i-input>
            </Form-item>
          </i-col>
        </Row>
        <Row>
          <i-col span="24">
            <Form-item label="C值类型">
              <i-input v-model.trim="entity.valueCType" :maxlength=100></i-input>
            </Form-item>
          </i-col>
        </Row>
        <Row>
          <i-col span="24">
            <Form-item label="D值类型">
              <i-input v-model.trim="entity.valueDType" :maxlength=100></i-input>
            </Form-item>
          </i-col>
        </Row>
        <Row>
          <i-col span="24">
            <Form-item label="备注">
              <i-input v-model.trim="entity.remark" :maxlength=200></i-input>
            </Form-item>
          </i-col>
        </Row>
        <Row>
          <i-col span="24">
            <Form-item label="排序 (0-999)">
              <i-input v-model.trim="entity.orderIndex" :maxlength=11></i-input>
            </Form-item>
          </i-col>
        </Row>
        <Row>
          <i-col span="24">
            <Form-item label="是否可添加 N为不允许Y为允许">
              <i-input v-model.trim="entity.isAddable" :maxlength=1></i-input>
            </Form-item>
          </i-col>
        </Row>
      </i-form>
      <div slot="footer">
        <Button style="margin-right: 8px" @click="modelClose">关闭</Button>
        <Button type="primary" @click="handleSubmit('entity')">保存</Button>
      </div>
    </Modal>
  </div>
</template>
<script>

// import { saveParam } from '@/api/focusOtherParamsSet'

export default {
  name: 'param-type-add-modal',
  components: {},
  props: {
    modalShow: { type: Boolean },
    type: { type: String }
  },
  data () {
    return {
      publicTag: [],
      modalTitle: '信息',
      modalWidth: '50%',
      entity: {
        formatText: '文字${a,${b,${c,${d替换',
        valueAType: '2',
        valueBType: '2',
        valueCType: '2',
        valueDType: '2',
        orderIndex: '999',
        isAddable: 'Y'
      },
    }
  },
  methods: {
    modelClose () {
      this.$emit('model-close')
    },
    handleSubmit (entity) {
      saveParam(this.entity).then(res => {
        if (res.data.success) {
          this.$Message.success(this.entity.id == null ? '添加成功!' : '编辑成功!');
          this.$emit('model-close')
        } else {
          this.$Message.error('添加失败!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
  ,
  watch: {
    modalShow: function (newValue) {
      if (newValue) {
        this.entity = {
          formatText: '文字${a,${b,${c,${d替换',
          valueAType: '2',
          valueBType: '2',
          valueCType: '2',
          valueDType: '2',
          orderIndex: '999',
          isAddable: 'Y'
        };
        this.entity.businessType = this.type;
      }
    }
  }
}
</script>