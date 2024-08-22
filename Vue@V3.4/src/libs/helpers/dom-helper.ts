class DomHelper {
  findNodeUpper(ele: HTMLElement | ParentNode, tag: string): HTMLElement | ParentNode | void {
    if (ele.parentNode) {
      // @ts-ignore
      if (ele.parentNode.tagName === tag.toUpperCase()) {
        return ele.parentNode
      } else {
        return this.findNodeUpper(ele.parentNode, tag)
      }
    }
  }

  findNodeUpperByClasses(
    ele: HTMLElement | ParentNode,
    classes: string[]
  ): HTMLElement | ParentNode | void {
    let parentNode = ele.parentNode
    if (parentNode) {
      // @ts-ignore
      let classList = parentNode.classList
      if (classList && classes.every((className) => classList.contains(className))) {
        return parentNode
      } else {
        return this.findNodeUpperByClasses(parentNode, classes)
      }
    }
  }

  findNodeDownward(ele: HTMLElement | ChildNode, tag: string): HTMLElement | ChildNode | void {
    const tagName = tag.toUpperCase()
    if (ele.childNodes.length) {
      let i = -1
      let len = ele.childNodes.length
      while (++i < len) {
        let child = ele.childNodes[i]
        // @ts-ignore
        if (child.tagName === tagName) return child
        else return this.findNodeDownward(child, tag)
      }
    }
  }

  /**
   * @description 绑定事件 on(element, event, handler)
   */
  on = (function () {
    // @ts-ignore
    if (document.addEventListener) {
      return function (element: HTMLElement, event: string, handler: () => void) {
        if (element && event && handler) {
          element.addEventListener(event, handler, false)
        }
      }
    } else {
      return function (element: HTMLElement, event: string, handler: () => void) {
        if (element && event && handler) {
          element.attachEvent('on' + event, handler)
        }
      }
    }
  })()

  /**
   * @description 解绑事件 off(element, event, handler)
   */
  off = (function () {
    // @ts-ignore
    if (document.removeEventListener) {
      return function (element: HTMLElement, event: string, handler: () => void) {
        if (element && event) {
          element.removeEventListener(event, handler, false)
        }
      }
    } else {
      return function (element: HTMLElement, event: string, handler: () => void) {
        if (element && event) {
          element.detachEvent('on' + event, handler)
        }
      }
    }
  })()

  // scrollTop animation
  scrollTop = (el: HTMLElement, from = 0, to: number, duration = 500, endCallback: () => void) => {
    let win = window
    if (!win.requestAnimationFrame) {
      win.requestAnimationFrame =
        win.webkitRequestAnimationFrame ||
        win.mozRequestAnimationFrame ||
        win.msRequestAnimationFrame ||
        function (callback) {
          return window.setTimeout(callback, 1000 / 60)
        }
    }
    const difference = Math.abs(from - to)
    const step = Math.ceil((difference / duration) * 50)

    const scroll = (start: number, end: number, step: number) => {
      if (start === end) {
        endCallback && endCallback()
        return
      }

      let d = start + step > end ? end : start + step
      if (start > end) {
        d = start - step < end ? end : start - step
      }
      window.scrollTo(d, d)
      el && (el.scrollTop = d)

      window.requestAnimationFrame(() => scroll(d, end, step))
    }
    scroll(from, to, step)
  }

  downloadFile(data: BlobPart, name: string) {
    if (!data) {
      return
    }

    let url = window.URL.createObjectURL(new Blob([data]))
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', name)

    document.body.appendChild(link)
    link.click()
  }
}

const domHelper = new DomHelper()
export default domHelper
