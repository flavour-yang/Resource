<template>
  <a-modal v-model:visible="visible" v-bind="_props">
    <template #title>
      <slot name="title">
        {{ title }}
      </slot>
    </template>
    <slot>
    </slot>
    <template #footer>
      <slot name="footer">
      </slot>
    </template>
  </a-modal>
</template>

<script lang='ts' setup>
import { Message } from '@arco-design/web-vue';
import { computed, toRefs, watch } from 'vue'
import { reactive } from 'vue'

const props = defineProps({
  width: {
    type: String || Number,
    default: () => {
      let customWidth = document.documentElement.clientWidth || 520
      if (customWidth < 960) {
        customWidth = 520
      } else if (customWidth > 1920) {
        customWidth = customWidth - customWidth * 0.25
      } else if (customWidth > 1200) {
        customWidth = customWidth - 200
      }
      return customWidth
    }
  },
  title: { type: String },
  api: {
    type: Function
  },
  initModelHandle: {
    type: Function
  },
  model: {
    type: Object || Array,
    default: () => { }
  },
  beforeClose: {
    type: Function
  },
  alignCenter: { default: false },
  top: {
    type: Number || String,
    default: 100
  },
  hideCancel: { type: Boolean }
})


const data = reactive({
  visible: false,
  hide: false
})

const { visible } = toRefs(data)


const _props = computed(() => ({
  width: props.width,
  onBeforeOk,
  onOk,
  onCancel,
  alignCenter: props.alignCenter,
  top: props.top,
  hideCancel: props.hideCancel ? props.hideCancel : data.hide
}))

// watch([visible], () => {
//   initModelHandle()
// },)


const open = (row: any) => {
  data.visible = true
  props.initModelHandle && props.initModelHandle(row)
}

const requestIt = async () => {
  if (props.api) {
    try {
      data.hide = true
      const _params = props.model || {}
      const res = await props.api(_params)
      if (res.success) {
        Message.success('保存成功')
        $emits('success', res)
        data.visible = false
        return true
      }
    } catch {
      new Error('api 调用失败')
      return false
    } finally {
      data.hide = false
    }
  }
}
const onBeforeOk = async () => {
  if (props.beforeClose) {
    const res = await props.beforeClose()
    if (res) return false
    else {
      if (props.api) {
        return requestIt()
      }
      return true
    }
  }
}

const onOk = async () => {
  // onBeforeOk()
  // data.visible = false
  // $emits('success', data.visible)
}
const onCancel = () => {
  data.visible = false
  $emits('cancel', data.visible)
}

const $emits = defineEmits(['success', 'cancel'])
defineExpose({ open })
</script>

<style lang='scss'></style>