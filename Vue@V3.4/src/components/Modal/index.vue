<template>
  <a-modal v-model:visible="visible" @ok="onOk" @cancel="onCancel" :width="props.width">
    <template #title>
      <slot name="title">
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
import { toRefs } from 'vue'
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
  requestFun: {
    type: Function
  },
  params: {
    type: Object || Array,
    default: () => {}
  },
  beforeClose: {
    type: Function
  }
})

const data = reactive({
  visible: false
})

const { visible } = toRefs(data)
const open = () => {
  data.visible = true
}
const onOk = async () => {
  if (props.beforeClose) {
    await props.beforeClose()
  }
  if (props.requestFun) {
    try {
      const _params = props.params || {}
      // console.log(JSON.parse(props.params)[13], JSON.parse(_params))
      // 'ut_ast_estate'
      const res = await props.requestFun(_params)
      $emits('on-success', res)
    } finally {
      data.visible = false
    }
  }
  data.visible = false
}
const onCancel = () => {
  data.visible = false
}
const $emits = defineEmits(['on-success'])
defineExpose({ open })
</script>

<style lang='scss'></style>