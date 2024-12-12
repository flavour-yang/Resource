<template>
  <hy-modal ref="modalRef" @success="onSuccess" :api="props.api" :model="props.model" :beforeClose="beforeClose">
    <hy-form ref="formRef" :model="props.model">
      <slot />
    </hy-form>
  </hy-modal>
</template>
<script lang="ts" setup>
import { ref, defineProps, unref, reactive } from "vue"
interface Props {
  api: () => void,
  model: { [key: string]: any }
}

const props = withDefaults(defineProps<Props>(), {})
const modalRef = ref()
const formRef = ref()

const beforeClose = async () => {
  const modal = unref(formRef)
  return modal.formRef.validate((valids: any) => {
    if (valids && Object.keys(valids).length) {
      const shift = Object.keys(valids).shift() || ''
      return new Error(valids[shift]?.message)
    }
    return true
  })
}
const onSuccess = (val: any) => {
  $emits('success', val)
}

const open = (value: any) => {
  const modal = unref(modalRef)
  modal.open(value)
}
const $emits = defineEmits(['success'])
defineExpose({ open })
</script>
<style lang="less" scoped>
.ivu-tree-children li {
  margin: 0;
}
</style>