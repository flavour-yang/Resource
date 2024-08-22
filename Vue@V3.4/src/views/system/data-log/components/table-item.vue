<template>
  <div>
    <List style="padding: 12px 12px; padding-left: 50px;background-color: #fff;" v-for="(item, index) in data" :header="item.tableTitle" :key="`${item.tableName}_${index}`" size="small">
      <div class="item">
        <!-- <div class="title">
          {{ child.fieldTitle }}:
        </div> -->
        <!-- <div class="content">
          <div class="table-header">
            <div>字段</div>
            <div>变化前</div>
            <div>变化后</div>
          </div>
          <div v-for="child in item.changeFields" :key="child.fieldName" class="table-body">
            <div>{{ child.fieldTitle }}</div>
            <div>{{ child.originalData ? child.originalData : '-' }}</div>
            <div>{{ child.updatedData }}</div>
          </div>
        </div> -->
        <Table disabled-hover size="small" :columns="columns" :data="item.changeFields" border />
      </div>
      <!-- <ListItem>This is a piece of text.</ListItem>
      <ListItem>This is a piece of text.</ListItem> -->
    </List>
  </div>
</template>
<script>
export default {
  name: 'table_item',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      columns: [
        { title: '字段', key: 'fieldTitle', align: 'center', width: 200 },
        {
          title: '变化前',
          key: 'originalData',
          align: 'center',
          render: (h, params) => {
            return h('span', {}, params.row.originalData ? params.row.originalData : '-')
          }
        },
        {
          title: '变化后',
          align: 'center',
          key: 'updatedData',
          render: (h, params) => {
            return h('span', {}, params.row.updatedData ? params.row.updatedData : '-')
          }
        }
      ]
    }
  }
}
</script>
<style scoped lang="less">
/deep/ .ivu-list-header {
  font-weight: 700;
  padding-top: 0;
  padding-bottom: 5px;
}
/deep/ .ivu-list-header {
  border-bottom: none;
}
/deep/ .ivu-list {
  // border-bottom: 1px solid #e8eaec;
}
.item {
  margin-bottom: 6px;
}
.table-header,
.table-body {
  width: 100%;
  display: flex;
  > div {
    flex: 1;
  }
}
.table-header {
  margin-bottom: 6px;
}
</style>