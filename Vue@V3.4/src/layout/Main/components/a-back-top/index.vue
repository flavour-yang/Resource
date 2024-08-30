<template>
  <div :class="classes" :style="styles">
    <slot>
      <div :class="innerClasses">
        <!-- <i class="ivu-icon ivu-icon-ios-arrow-up"></i> -->
        <!-- <i > -->
        <span>
          <a @click="leftScroll">左移</a>
          <Divider />
          <a @click="rightScroll">右移</a>
        </span>
        <!-- <Icon type="ios-arrow-back" /> -->
        <!-- <Icon type="ios-arrow-forward" /> -->
        <!-- </i> -->
      </div>
    </slot>
  </div>
</template>
<script>
import domHelper from '@/libs/helpers/dom-helper'
const prefixCls = 'ivu-back-top'

export default {
  name: 'ABackTop',
  props: {
    height: {
      type: Number,
      default: 400
    },
    bottom: {
      type: Number,
      default: 30
    },
    right: {
      type: Number,
      default: 30
    },
    duration: {
      type: Number,
      default: 1000
    },
    container: {
      type: null,
      default: window
    }
  },
  data() {
    return {
      backTop: false
    }
  },
  mounted() {
    // window.addEventListener('scroll', this.handleScroll, false)
    // window.addEventListener('resize', this.handleScroll, false)
    domHelper.on(this.containerEle, 'scroll', this.handleScroll)
    domHelper.on(this.containerEle, 'resize', this.handleScroll)
  },
  beforeDestroy() {
    // window.removeEventListener('scroll', this.handleScroll, false)
    // window.removeEventListener('resize', this.handleScroll, false)
    domHelper.off(this.containerEle, 'scroll', this.handleScroll)
    domHelper.off(this.containerEle, 'resize', this.handleScroll)
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-show`]: this.backTop
        }
      ]
    },
    styles() {
      return {
        bottom: `${this.bottom}px`,
        right: `${this.right}px`
      }
    },
    innerClasses() {
      return `${prefixCls}-inner`
    },
    containerEle() {
      return this.container === window ? window : document.querySelector(this.container)
    }
  },
  methods: {
    handleScroll() {
      this.backTop = this.containerEle.scrollTop >= this.height
    },
    back() {
      let target = typeof this.container === 'string' ? this.containerEle : document.documentElement || document.body
      const sTop = target.scrollTop
      domHelper.scrollTop(this.containerEle, sTop, 0, this.duration)
      this.$emit('on-click')
    },
    leftScroll() {
      const doms = document.querySelectorAll('.ivu-table-body')
      if (doms && doms.length) {
        doms.forEach(f => {
          if (f.scrollLeft < 120) {
            f.scrollLeft = 0
          } else {
            f.scrollLeft -= 120
          }
        })
      }
    },
    rightScroll() {
      const doms = document.querySelectorAll('.ivu-table-body')
      if (doms && doms.length) {
        doms.forEach(f => (f.scrollLeft += 120))
      }
    }
  }
}
</script>
<style scoped lang="less">
/deep/ .ivu-back-top-inner {
  background: rgba(0, 0, 0, 0.5);
  > i {
    padding: 0;
  }
  span {
    padding: 6px 4px;
    display: flex;
    flex-direction: column;
    a {
      color: #fff;
      user-select: none;
    }
  }
}
/deep/.ivu-divider-horizontal {
  margin: 8px 0;
}
</style>
