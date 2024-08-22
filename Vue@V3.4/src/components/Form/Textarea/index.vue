<template>
  <a-form-item v-bind="itemProps">
    <a-textarea ref="textarea" v-model="props.modelValue" v-bind="inputProps" />
  </a-form-item>
</template>

<script lang="ts" setup>
import type { FieldRule } from '@arco-design/web-vue'
import { computed, defineProps, onMounted, ref, toRefs, watch } from 'vue'
const props = defineProps({
  modelValue: String,
  label: {
    type: String
  },
  field: { type: String },
  required: {
    type: Boolean,
    default: false
  },
  rules: {
    type: Array,
    default: () => []
  },
  labelColProps: {
    type: Object,
    default: () => ({ span: 1 })
  },
  wrapperColProps: {
    type: Object,
    default: () => ({ span: 22 })
  },
  autoSize: {
    type: Object,
    default: () => ({ minRows: 6, maxRows: 20 })
  },
  validateTrigger: {
    type: String, // 'change' | 'input' | 'focus' | 'blur'
    default: 'change'
  }
})
const textarea = ref(null)
const itemRules = props.rules?.length
  ? props.rules
  : [{ required: false, message: `请填写${props.label}` }]

const itemProps = {
  field: props.field,
  label: props.label,
  required: props.required,
  rules: itemRules as FieldRule[],
  validateTrigger: props.validateTrigger as 'change' | 'input' | 'focus' | 'blur',
  labelColProps: props.labelColProps,
  wrapperColProps: props.wrapperColProps
}

const inputProps = {
  placeholder: `请输入${props.label || ''}`,
  allowClear: true,
  autoSize: props.autoSize,
  style: {},
  onInput: (value: any) => input(value),
  onClear: () => input('')
}

const emit = defineEmits(['update:modelValue'])

const input = (value: any) => {
  emit('update:modelValue', value)
}
onMounted(() => {})
defineExpose({ textarea })
</script>

<style>
</style>