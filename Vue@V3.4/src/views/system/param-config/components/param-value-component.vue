<template>
  <InputNumber :active-change="false" :min="-9999999999" :max="9999999999" v-model="itemValue" v-if="type=='1'"
               :class="'paraminfo ' +name"></InputNumber>
  <Input v-model="itemValue" v-else-if="type=='2'" :maxlength=100 :class="'paraminfo ' +name"></Input>
  <TimePicker confirm
              format="HH:mm" placeholder="选择时间"
              v-model="itemValue" v-else-if="type=='3'" :class="'paraminfo ' +name"></TimePicker>
  <Select :class="'paraminfo ' + name" v-else v-model="itemValue">
    <Option v-for="option in list" :key="option.key" :value="option.key" :label="option.value"></Option>
  </Select>
</template>

<script>

export default {
  name: 'param-type-item',
  components: {},
  props: {
    id: {
      type: String,
      default: ''
    },
    paramKey: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: '2'
    },
    name: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      itemValue: null,
      list: []
    }
  },
  methods: {
    //表单状态
    async findCodeList() {
      if (this.type !== '1' && this.type !== '2' && this.type !== '3') {
        // 子代码
        await this.getCodeInfoList(this.type).then(res => {
          this.list = res;
        })
      }
    },
    setValue(newValue) {
      this.$emit("setValue", newValue, this.name, this.id, this.paramKey)
    }
  },
  mounted() {
    this.findCodeList();
    this.itemValue = this.value;
  },
  watch: {
    type: function () {
      this.findCodeList();
    },
    itemValue: function (newValue) {
      if (newValue === '') {
        this.itemValue = this.value;
        this.setValue(this.value);
      } else {
        this.setValue(newValue)
      }
    }
  }
}
</script>
<style scoped>
.paraminfo {
  width: auto;
}
</style>