<template>
  <div>
    <div class="workbench-title">
      <Icon type="logo-buffer" /> {{ title }}
    </div>
    <hy-card>
      <Row v-if="hasLength(taskList)">
        <template v-for="item in taskList">
          <Col @click.native="onLink(item.pageUrl)" :key="item.title" span="2" class="col">
          <Badge :count="item.count" overflow-count="999" class="outer">
            <div class="workbench-badge">
              <img :src="requireImg(item.icon)" />
            </div>
            <p class="menu-title">{{ item.title }}</p>
          </Badge>
          <div v-if="userAccess" class="edit" @click.stop="onEdit(item)">
            <Button type="text" size="small">
              <Icon type="ios-create-outline" />编辑
            </Button>
          </div>
          </Col>
        </template>
        <span></span>
      </Row>
      <div v-else>暂无数据</div>
    </hy-card>
    <form-modal :model="model" v-bind="config" ok-api="home/index/save" ref="operate-modal">
      <Row>
        <hy-input v-model="model.title" label="标题" required prop="title" span="18" />
        <hy-input v-model="model.icon" label="图标" required prop="icon" span="18" />
        <hy-input v-model="model.pageUrl" label="跳转路径" required prop="pageUrl" span="18" />
        <hy-input v-model="model.counterApi" label="统计方法" required prop="counterApi" span="18" />
        <hy-input v-model="model.orderIndex" label="排序" required prop="orderIndex" span="18" />
        <hy-checkbox v-model="model.roleIds" label="角色" required prop="roleIds" :list="roleList" span="24" />
      </Row>
    </form-modal>
  </div>
</template>

<script>
const pngs = require.context('@/assets/images/home', true, /\.png$/)
import { FormModalBase } from '@/mixins'
export default {
  mixins: [FormModalBase],
  props: {
    title: { type: String },
    access: { type: String | Array },
    taskList: { type: Array, default: () => [] }
  },
  data() {
    return {
      model: {},
      imgUrls: pngs.keys().map(m => pngs(m)),
      roles: []
    }
  },
  computed: {
    roleList() {
      return this.roles.map(m => ({ key: m.id, value: m.roleName }))
    },
    userAccess() {
      const roleListIds = this.$store.state.current.userInfo.roleList.map(m => m.id)
      return roleListIds.includes('2') // || roleList.includes('1')
    }
  },
  created() {
    Object.assign(this.config, {
      title: '待办任务项编辑',
      width: 800
    })
  },
  mounted() {},
  methods: {
    onEdit(value) {
      this.model = {
        id: value.id,
        title: value.title,
        icon: value.icon,
        pageUrl: value.pageUrl,
        orderIndex: value.orderIndex + '',
        categoryCode: value.categoryCode,
        categoryName: value.categoryName,
        counterApi: value.counterApi,
        roleIds: value.roleIds
      }
      this.open('', this.model)
      // this.$store.dispatch('home/index/save', {  })
    },
    hasLength(list) {
      return list.length === 0 ? false : true
    },
    findImg(name) {
      return this.imgUrls.find(f => f === name)
    },
    requireImg(name) {
      if (!name) return require(`@/assets/images/home/空置车位.png`)
      if (name) return require(`@/assets/images/home/${name}`)
    },
    onLink(link) {
      this.$router.push(`${link}`)
    },
    async initModelHandle() {
      // 获取角色
      const { records } = await this.$utils.retrieve('system/user/queryRole')
      this.roles = records
    }
  }
}
</script>

<style scoped lang='less'>
.workbench-title {
  font-size: 14px;
  font-weight: 700;
  margin: 12px 0;
}
.outer {
  width: 42px;
  margin: 16px 0;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
}
.col {
  position: relative;
  text-align: center;
  min-width: 110px;
  .edit {
    position: absolute;
    left: 5px;
    top: -18px;
    display: none;
    font-size: 18px;
    cursor: pointer;
  }
  &:hover {
    .edit {
      display: block;
    }
  }
}
.workbench-badge {
  background: #eee;
  border-radius: 50%;
  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: center;
}
.menu-title {
  min-width: 120px;
  margin-top: 12px;
}
</style>