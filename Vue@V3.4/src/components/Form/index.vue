<template>
  <a-form ref="formRef" v-bind="formProps" :model="model" @submit="submit" @submit-success="submitSuccess" @submit-failed="submitFailed">
    <slot />
  </a-form>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'
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
      span: 5,
      offset: 0
    })
  },
  wrapperColProps: {
    type: Object,
    default: () => ({
      span: 19,
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
  labelAlign: otherProps.labelAlign as 'left' | 'right'
}

const $emits = defineEmits(['submit', 'submits-success', 'submits-failed'])

const submit = (value: any) => {
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
</script>

<style>
</style>