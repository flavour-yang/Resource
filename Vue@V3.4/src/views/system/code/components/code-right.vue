<template>
  <hy-card>
   
    <Form ref="codeForm" :model="model" :label-width="120" label-colon>
      <hy-span v-if="selectTree.parent && model.id" v-model="model.groupName" label="代码组" bottom span="24" />

      <hy-input v-if="!selectTree.parent" v-model="model.groupKey" label="代码组键值" prop="groupKey" required span="24"></hy-input>
      <hy-input v-else v-model="model.codeKey" label="代码键值" required prop="codeKey" span="24" />

      <hy-input v-if="!selectTree.parent" v-model="model.groupName" label="代码组名称" prop="groupName" required span="24"></hy-input>

      <hy-input v-else v-model="model.codeName" label="代码名称" required prop="codeName" span="24" />
      <hy-input v-model="model.orderIndex" label="排序号" span="24"></hy-input>
      <hy-radio v-model="model.status" label="是否启用" span="24" :list="statusList"></hy-radio>
      <hy-input v-model="model.description" :label="!selectTree.parent ? '描述' : '扩展属性'" type="textarea" :maxlength="10000" span="24"></hy-input>
      <FormItem label>
        <Button type="default" @click="cancel">取消</Button>
        <Button type="primary" @click="save('codeForm')" style="margin-left:10px">保存</Button>
        <Button type="primary" :disabled="!model.id" @click="getSql" style="margin-left:10px">获取SQL</Button>
      </FormItem>
    </Form>
    <code-sql ref="code-sql" />
  </hy-card>
</template>
<script>
import FormBase from '../mixins/code-right-base'
import codeSql from './code-sql.vue'
export default {
  mixins: [FormBase],
  components: { codeSql }
}
</script>
<style lang="less" scoped></style>