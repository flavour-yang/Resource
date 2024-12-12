<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import type { Component } from 'vue';
import BScroll from 'better-scroll'
import { useAppStore } from '@/stores/modules/app';
import { useRouter } from 'vue-router';
const appStore = useAppStore()
const router = useRouter()

defineOptions({
  name: 'PageTab'
});

const props = withDefaults(defineProps(), {
  mode: 'chrome',
  commonClass: 'transition-all-300',
  activeColor: '#1890ff',
  closable: true
});

interface Emits {
  (e: 'close'): void;
}

const bsRef = ref(null)
const scroll = ref(null)

const emit = defineEmits<Emits>();

const emojis = [
  '👉🏼 😁 😂 🤣 👈🏼',
  '😄 😅 😆 😉 😊',
  '😫 😴 😌 😛 😜',
  '👆🏻 😒 😓 😔 👇🏻',
  '😑 😶 🙄 😏 😣',
  '😞 😟 😤 😢 😭',
  '🤑 😲 ☹️ 🙁 😖',
  '👍 👎 👊 ✊ 🤛',
  '☝️ ✋ 🤚 🖐 🖖',
  '👍🏼 👎🏼 👊🏼 ✊🏼 🤛🏼',
  '☝🏽 ✋🏽 🤚🏽 🖐🏽 🖖🏽',
  '🌖 🌗 🌘 🌑 🌒'
]
const bindProps = computed(() => {
  const { ...rest } = props;

  return rest;
});

watch(appStore.navTab, (val) => {
  console.log(val)
  nextTick(() => {
    bsRef.value.refresh()
  })
})
const navTabs = computed(() => {
  return appStore.navTab;
});

onMounted(() => {
  init()
})

function handleClose() {
  emit('close');
}

function init() {
  bsRef.value = new BScroll(scroll.value, {
    scrollX: true,
    probeType: 3 // listening scroll event
  })
  // this.bs.on('scrollStart', () => {
  //   console.log('scrollStart-')
  // })
  // this.bs.on('scroll', ({ y }) => {
  //   console.log('scrolling-')
  // })
  // this.bs.on('scrollEnd', () => {
  //   console.log('scrollingEnd')
  // })
}

function handleMouseup(e: MouseEvent) {
  // close tab by mouse wheel button click
  if (e.button === 1) {
    handleClose();
  }
}
</script>

<template>
  <div class="horizontal-container">
    <div class="scroll-wrapper" ref="scroll">
      <div class="scroll-content">
        <div @mouseup="handleMouseup">
          <slot name="prefix"></slot>
          <slot>
            <div class="scroll-item" v-for="tab in navTabs" @click="router.push(tab.path)" :key="tab.path">{{
              tab.meta.title }}</div>
            <!-- <div class="scroll-item" v-for="(item, index) in emojis" :key="index">{{ item }}</div> -->
          </slot>
          <slot name="suffix">
            <div v-if="props.closable"
              class=":soy: relative h-16px w-16px inline-flex items-center justify-center rd-50% text-14px"
              :class="[style['svg-close']]" @click.stop="handleClose">
              <svg width="1em" height="1em" viewBox="0 0 1024 1024">
                <path fill="currentColor"
                  d="m563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8L295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512L196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1l216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
              </svg>
            </div>
          </slot>
        </div>
        <!-- <div class="scroll-item" v-for="(item, index) in emojis" :key="index">{{item}}</div> -->
      </div>
    </div>
  </div>

</template>

<style scoped>
.scroll-wrapper {
  position: relative;
  /* width: 20%; */
  /* margin: 80px auto; */
  white-space: nowrap;
  /* border: 3px solid #42b983; */
  border-radius: 5px;
  overflow: hidden;
}

.scroll-content {
  display: inline-block
}

.scroll-item {
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  display: inline-block;
  text-align: center;
  padding: 0 10px;
}
</style>