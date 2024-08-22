<template>
  <div style="padding: 24px;" ref="refIt">
    <a-tabs :type="'capsule'" :size="'large'" @tab-click="tabClick">
      <a-tab-pane key="1" title="数据库">
        <Schema />
      </a-tab-pane>
      <a-tab-pane key="2" title="配置">
        <hy-form>
          <hy-textarea v-model="data.textareaValue" ref="textarea" :labelColProps="{span: 1}" :auto-size="{minRows:6, maxRows: 35}" />
        </hy-form>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, unref, watch } from 'vue'
import { useWindowFocus } from '@vueuse/core'
import Schema from './schema.vue'
import { useSchemaStore } from '@/stores/modules/schema'
const schemaStore = useSchemaStore()

const type = ref('capsule')
const size = ref('large')
const textarea = ref(null)
const focused = useWindowFocus()
const data = reactive({ textareaValue: '' })
onMounted(async () => {
  const res = await schemaStore.schema()
  data.textareaValue = JSON.stringify(res, null, '\t')
})
watch(focused, (isFocus) => {
  if (isFocus) {
    inputFocus()
  }
})
const inputFocus = () => {
  const refIt = unref(textarea) as any
  if (refIt) {
    refIt?.textarea?.focus()
  }
}
const tabClick = (value: string | number) => {
  if (value === '2') {
    inputFocus()
  }
}
</script>

<style lang="less" scoped>
/deep/.arco-tabs-nav-type-capsule .arco-tabs-nav-tab:not(.arco-tabs-nav-tab-scroll) {
  justify-content: center;
}
</style>