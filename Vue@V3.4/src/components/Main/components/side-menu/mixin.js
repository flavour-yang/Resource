import CommonIcon from '_c/common-icon'
import  menuRouterHelper  from '@/libs/helpers/menu-router-helper.js'
export default {
  components: {
    CommonIcon
  },
  methods: {
    showTitle(item) {
      return menuRouterHelper.showTitle(item, this)
    },
    showChildren(item) {
      return item.children && (item.children.length > 0 || (item.meta && item.meta.showAlways))
    },
    getNameOrHref(item, children0) {
      if (item.href) return `isTurnByHref_${item.href}`;
      let itemName = '';
      if (item.href) {
        itemName = `isTurnByHref_${item.href}`;
      } else if (children0) {
        let firstChild = item.children[0];
        if (firstChild.meta && firstChild.meta.defaultChild) {
          itemName = firstChild.meta.defaultChild;
        } else {
          itemName = firstChild.name;
        }
      } else if (item.meta && item.meta.defaultChild) {
        itemName = item.meta.defaultChild;
      } else {
        itemName = item.name;
      }
      return itemName;
    }
  }
}
