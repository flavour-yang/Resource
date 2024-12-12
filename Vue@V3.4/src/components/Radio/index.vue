<template>
  <a-col :span="span">
    <a-form-item v-bind="itemProps">
      <a-radio-group v-model="props.modelValue" :options="_options" v-bind="radioProps">
      </a-radio-group>
      <!-- <a-select :options="options" v-model="props.modelValue" v-bind="inputProps" /> -->
    </a-form-item>
  </a-col>
</template>

<script lang="ts" setup>
import consts from '@/libs/consts';
import { type FieldRule } from '@arco-design/web-vue'
import type { RadioOption } from '@arco-design/web-vue/es/radio/interface';
import { computed, defineProps, toRefs, watch, type VNodeChild } from 'vue'

// export type RenderFunction = () => VNodeChild;
// export interface RadioOption {
//   label?: RenderFunction;
//   value: string | number;
//   disabled?: boolean;
// }

interface Props {
  span?: number;
  options?: RadioOption[];
  label: string;
  field: string;
  required?: boolean;
  rules?: any[];
  validateTrigger?: string;
  modelValue: string;
  isDefault: boolean
}


const props = withDefaults(defineProps<Props>(), {
  span: 6,
  label: '',
  field: String,
  required: false,
  rules: <any>[],
  validateTrigger: 'change', //'change' | 'input' | 'focus' | 'blur'
  modelValue: '',
})

const itemRules = props.rules?.length
  ? props.rules
  : [{ required: true, message: `请填写${props.label}` }]

const itemProps = {
  field: props.field,
  label: `${props.label}:`,
  required: props.required,
  rules: itemRules as FieldRule[],
  validateTrigger: props.validateTrigger as 'change' | 'input' | 'focus' | 'blur'
}

const _options = computed(() => {
  if (props.options) return props.options
  if (props.isDefault) {
    return Object.values(consts.common.yesNo)
  }
  return []
})
console.log(_options.value)
const radioProps = {
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