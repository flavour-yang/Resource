<template>
  <a-form ref="formRef" v-bind="formProps" :model="model" @submit="submit" @submit-success="submitSuccess"
    @submit-failed="submitFailed">
    <div style="max-width: 100%;">
      <a-row :gutter="[16, 0]" style="margin: 0;">
        <slot />
      </a-row>
    </div>
  </a-form>
</template>

<script setup lang="ts">
import { defineEmits, ref } from 'vue'
const props = defineProps({
  model: {
    type: Object,
    default: {}
  },

  layout: {
    type: String, // 'horizontal' | 'vertical' | 'inline'
    default: 'horizontal'
  },
  size: {
    type: String, // 'mini' | 'small' | 'medium' | 'large'
    default: 'medium'
  },
  labelColProps: {
    type: Object,
    default: () => ({
      span: 6,
      offset: 0
    })
  },
  wrapperColProps: {
    type: Object,
    default: () => ({
      span: 18,
      offset: 0
    })
  },
  labelAlign: {
    type: String, // 'left' | 'right'
    default: 'right'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  rules: {
    type: Object || Array,
    default: () => ({})
  },
  autoLabelWidth: {
    type: Boolean,
    default: false
  },
  id: String,
  scrollToFirstError: {
    type: Boolean,
    default: true
  }
})
const { model, ...otherProps } = props
// const { model } = toRefs(props)

const formProps = {
  ...otherProps,
  layout: otherProps.layout as 'horizontal' | 'vertical' | 'inline',
  size: otherProps.size as 'mini' | 'small' | 'medium' | 'large',
  labelAlign: otherProps.labelAlign as 'left' | 'right',
  autoLabelWidth: false,
}
const formRef = ref()
const $emits = defineEmits(['submit', 'submits-success', 'submits-failed'])

const submit = (value: any) => {
  console.log({ 'submit': value })
  $emits('submit', value)
}

const submitSuccess = (value: any) => {
  console.log({ 'submits-success': value })
  $emits('submits-success', value)
}

const submitFailed = (value: any) => {
  console.log({ 'submits-failed': value })
  $emits('submits-failed', value)
}
defineExpose({ formRef })
</script>

<style></style>