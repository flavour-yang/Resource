<template>
  <div>
    <form-modal :loading="loading" :model="model" v-bind="config" ref="params-copy-modal">
      <div>
        <Row>
          <span>
              参数类型：
            <CheckboxGroup v-model="model.businessType" style="display:inline-block">
              <Checkbox
                  v-for="(item, index) in paramBusinessTypeList"
                  :key="index"
                  :label="item.key"
              >{{ item.value }}</Checkbox>
            </CheckboxGroup>
            </span>
        </Row>
        <Row>
          <Col span="10">
            <Card style="min-height:400px; max-height:100%">
              <Tree :data="estateList" show-checkbox check-strictly check-directly class="tree" select-node
                    @on-check-change="unallocatedCheckChange"></Tree>
            </Card>
          </Col>
          <Col span="4">
            <div class="opt-btn">
              <Button icon="ios-arrow-forward" type="primary" @click="copyEstatePramValue">复制
              </Button>
            </div>
          </Col>
          <Col span="10">
            <Card style="min-height:400px; max-height:100%">
              <Tree multiple check-strictly :data="estateCopyList" check-directly show-checkbox class="tree"
                    @on-check-change="allocatedCheckChange"></Tree>
            </Card>
          </Col>
        </Row>
      </div>
      <hy-button-list :list="toolbarButtons"/>
    </form-modal>
  </div>
</template>

<script>
import {FormModalBase} from "@/mixins";

const model = {
  businessType: [],
}
export default {
  name: "params-copy-modal",
  mixins: [FormModalBase],
  data() {
    return {
      width: '960',
      model: this.$utils.deepCopy(model),
      estateList: [],
      estateCopyList: [],
      paramBusinessTypeList: [],
      loop: 0,
      loopNew: 0
    };
  },
  methods: {
    // 初始化已分配和未分配数据（treeList:为所有的树形原始数据）
    initTreeList (treeList) {
      let treeData = this.getTreeData(treeList);
      this.treeData = JSON.parse(JSON.stringify(treeData));
      this.treeDataNew = JSON.parse(JSON.stringify(treeData));
    },

    // 获取已分配数据
    getTreeData (tree) {
      let res = [];
      tree.forEach(el => {
        if (el.childrenList && el.childrenList.length > 0) {
          let child = this.getTreeData(el.childrenList);
          if (child.length > 0) {
            let data = {};
            data.title = el.name;
            data.id = el.id;
            data.expand = true;
            data.data = el;
            data.children = child;
            res.push(data);
          }
        } else {
          let data = {};
          data.title = el.name;
          data.id = el.id;
          data.expand = true;
          data.data = el;
          res.push(data);
        }
      });

      return res;
    },
    unallocatedCheckChange (items, item) {
      if (items.length > 1) {
        this.loop = 0
        this.childnodes(this.treeData, items, item)
      }
      this.oldParamId = item.id;
    },
    childnodes (data, items, item) {
      if (this.loop) return false
      const len = data.length
      const its = items.length
      let i = 0
      let j = 0
      for (i = 0; i < len; i++) {
        for (j = 0; j < its; j++) {
          if (items[j].id === data[i].id) {
            if (items[j].id === item.id) {
              break
            } else {
              this.loop = 1
              data[i].checked = false
              return false
            }
          }
        }
        if (!this.loop && data[i].children && data[i].children.length > 0) {
          this.childnodes(data[i].children, items, item)
        }
      }
    },
    allocatedCheckChange(items) {
      this.newParamIds = [];
      items.forEach(it => {
        this.newParamIds.push(it.id);
      })

    },
    copyEstatePramValue() {
      console.log("model", this.model)
      if (this.oldParamId === undefined || this.oldParamId === null || this.oldParamId === '') {
        this.$Message.error("请先在左侧选择您要复制参数的项目！");
        return;
      }
      if (this.newParamIds === undefined || this.newParamIds === null || this.newParamIds.length === 0) {
        this.$Message.error("请先在右侧选择需要复制参数的项目！");
        return;
      }

      this.$Modal.confirm({
        title: "您确定复制参数吗？",
        content: "",
        okText: "确定",
        cancelText: "取消",
        onOk: () => {
          this.$Message.success('确定成功!')
          this.$parent.getSysParamList()
          //   this.$store.dispatch("system/param-config/copyEstatePramValue", this.model)
          //       .then(res => {
          //         this.$Message.success('确定成功!')
          //         this.$parent.getSysParamList()
          //       })
        },
      });
    },
    async initModelHandle(row) {
      this.estateList = this.$utils.deepCopy(row.estateList);
      this.estateCopyList = this.$utils.deepCopy(row.estateList);
      this.paramBusinessTypeList = this.$utils.deepCopy(row.paramBusinessTypeList);
    }
  },
  computed: {
    toolbarButtons() {
      return [
        {text: '确定复制', permission: 'param_config_save', type: 'primary', action: () => this.copyEstatePramValue()}
      ]
    }
  },
  async created() {
    Object.assign(this.config, {
      title: "载体参数复制",
      width: this.width,
      hideOk: true,
    });
  },
};
</script>

<style lang="less" scoped>
.tree {
  overflow: auto;
  height: 500px;
}

.opt-btn {
  height: 100%;
  margin: 0 auto;
  text-align: center;
  padding-top: 20px;

  .ivu-btn {
    text-align: center;
    margin: 30px auto;
  }
}
</style>