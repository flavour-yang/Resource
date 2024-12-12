<template>
  <a-col :span="span">
    <a-form-item v-bind="itemProps">
      <a-input v-model="props.modelValue" v-bind="inputProps" />
      <!-- <a-input-password
      v-model:visibility="visibility"
      placeholder="Please enter something"
      :style="{width:'320px'}"
      :defaultVisibility="false"
      allow-clear
    /> -->
    </a-form-item>
  </a-col>
</template>

<script lang="ts" setup>
import type { FieldRule } from '@arco-design/web-vue'
import { computed, defineProps, toRefs, watch } from 'vue'
const props = defineProps({
  span: {
    type: Number,
    default: 6
  },
  label: {
    type: String
  },
  field: String,
  required: {
    type: Boolean,
    default: false
  },
  rules: {
    type: Array,
    default: () => []
  },
  validateTrigger: {
    type: String, // 'change' | 'input' | 'focus' | 'blur'
    default: 'change'
  },

  modelValue: String,
  allowClear: {
    type: Boolean,
    default: true
  },
  placeholder: String
})

const itemRules = props.rules?.length
  ? props.rules
  : [{ required: true, message: `请填写${props.label}` }]

const placeholder = props.placeholder ? props.placeholder : `请输入${props.label}`

const itemProps = {
  field: props.field,
  label: `${props.label}:`,
  required: props.required,
  rules: props.required || props.rules.length ? itemRules as FieldRule[] : [],
  validateTrigger: props.validateTrigger as 'change' | 'input' | 'focus' | 'blur'
}
const inputProps = {
  placeholder,
  allowClear: props.allowClear,
  style: {},
  onInput: (value: any) => input(value),
  onClear: () => input('')
}

const emit = defineEmits(['update:modelValue'])

const input = (value: any) => {
  emit('update:modelValue', value)
}
</script>

<style></style>