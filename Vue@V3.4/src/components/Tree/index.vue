<template>
  <!-- <a-col :span="props.span">
    <a-form-item v-bind="itemProps">

    </a-form-item>
  </a-col> -->
  <a-tree v-bind="treeProps" v-model:checked-keys="props.checkedKeys" />
</template>

<script lang="ts">
export default {
  name: 'hy-tree'
}
</script>
<script lang="ts" setup>
import type { FieldRule, TreeNodeData } from '@arco-design/web-vue'
import { computed, defineProps, onMounted, ref, toRefs, watch } from 'vue'
export interface TreeProps {
  field: string;
  label: string;
  required: boolean;
  rules: FieldRule[]
  // treeData: TreeNodeData[],
  // defaultExpandedKeys?: string[] | number[]
}

const props = withDefaults(defineProps<TreeProps>(), {
  span: 24,
  field: '',
  data: <TreeNodeData>[],
  defaultExpandedKeys: [],
  defaultSelectedKeys: [],
  defaultCheckedKeys: [],
  checkedKeys: [],
  checkStrictly: false,
  checkable: false,
  size: 'medium'
})


const textarea = ref(null)

const onCheck = (checkedKeys: (string | number)[], data: any) => {
  emit('onCheck', checkedKeys, data)
}

const itemRules = props.rules?.length
  ? props.rules
  : [{ required: true, message: `请填写${props.label}` }]

const itemProps = {
  field: props.field,
  label: `${props.label}:`,
  required: props.required,
  rules: itemRules as FieldRule[],
  // validateTrigger: props.validateTrigger as 'change' | 'input' | 'focus' | 'blur'
}
const treeProps = {
  data: props.data,
  defaultExpandedKeys: props.defaultExpandedKeys, // 默认展开的节点
  defaultSelectedKeys: props.defaultSelectedKeys, // 默认选中的树节点
  defaultCheckedKeys: props.defaultCheckedKeys, // 默认选中复选框的树节点
  // checkedKeys: props.checkedKeys, // 选中复选框的树节点
  checkStrictly: props.checkStrictly, // 是否取消父子节点关联
  checkable: props.checkable, //  是否在节点前添加复选框，从 2.27.0 开始支持函数格式
  size: props.size,
  onCheck
}



const emit = defineEmits(['onCheck'])

// const input = (value: any) => {
//   emit('update:modelValue', value)
// }
// onMounted(() => { })
// defineExpose({ textarea })
</script>

<style></style>
