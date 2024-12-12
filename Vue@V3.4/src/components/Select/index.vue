<template>
  <a-col :span="span">
    <a-form-item v-bind="itemProps">
      <a-select :options="options" v-model="props.modelValue" v-bind="inputProps" />
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
import type { FieldRule, SelectOptionData } from '@arco-design/web-vue'
import { computed, defineProps, toRefs, watch } from 'vue'

interface Props {
  span?: number;
  options: SelectOptionData[];
  label: string;
  field: string;
  required?: boolean;
  rules: any[];
  validateTrigger?: string;
  modelValue: string;
  allowClear?: boolean;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  span: 6,
  label: '',
  field: String,
  required: false,
  rules: <any>[],
  validateTrigger: 'change', //'change' | 'input' | 'focus' | 'blur'
  modelValue: '',
  allowClear: true,
  placeholder: ''
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
  onChange: (value: any) => input(value),
  onClear: () => input('')
}

const emit = defineEmits(['update:modelValue'])

const input = (value: any) => {
  emit('update:modelValue', value)
}
</script>

<style></style>