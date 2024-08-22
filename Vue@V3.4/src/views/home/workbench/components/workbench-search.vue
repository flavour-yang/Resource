<template>
  <div>
    <hy-card>
      <Form ref="form" label-position="right" :label-width="30" :model="model" inline>
        <Row>
          <hy-input v-model="model.partyB" placeholder="租赁户名称" prop="partyB" span="3" />
          <hy-input v-model="model.renterTel" placeholder="手机号" prop="renterTel" span="3" />
          <hy-input v-model="model.estateName" placeholder="载体名称|坐落" prop="estateName" span="3" />
          <!-- <hy-input v-model="model.name" placeholder="姓名" prop="beanClass" span="3" /> -->
          <hy-input v-model="model.houseName" placeholder="出租单元名" prop="houseName" span="3" />
          <hy-button-list :list="toolbarButtons" style="margin-left: 10px" />
        </Row>
      </Form>
      <Tabs :value="defaultKey" name="workbrenchSearch" @on-click="onClick">
        <TabPane label="合同列表" name="合同列表" tab="workbrenchSearch">
        </TabPane>
        <TabPane label="个人租户列表" name="个人租户列表" tab="workbrenchSearch">
        </TabPane>
        <TabPane label="企业租户列表" name="企业租户列表" tab="workbrenchSearch">
        </TabPane>
        <TabPane label="载体列表" name="载体列表" tab="workbrenchSearch">
        </TabPane>
        <TabPane label="账单列表" name="账单列表" tab="workbrenchSearch">
        </TabPane>
        <TabPane label="审批列表" name="审批列表" tab="workbrenchSearch">
        </TabPane>
        <TabPane label="开票列表" name="开票列表" tab="workbrenchSearch">
        </TabPane>
      </Tabs>
      <div v-show="defaultKey === '合同列表'">
        <BusinessManagement ref="businessManagement" :simpleMode="true" />
      </div>
      <div v-show="defaultKey === '个人租户列表'">
        <PersonalManagement ref="personalManagement" :simpleMode="true" />
      </div>
      <div v-show="defaultKey === '企业租户列表'">
        <CompanyManagement v-if="defaultKey ==='企业租户列表'" ref="companyManagement" :simpleMode="true" />
      </div>
      <div v-show="defaultKey === '载体列表'">
        <asset-management ref="assetManagement" :hideSearch="true" :simpleMode="true" />
      </div>
      <div v-show="defaultKey === '账单列表'">
        <contract-bill ref="ContractBill" />
      </div>
      <div v-show="defaultKey === '审批列表'">
        <process-notice ref="ProcessNotice" :simpleMode="true" />
      </div>
      <div v-show="defaultKey === '开票列表'">
        <invoiced-list ref="invoicedList" :simpleMode="true" />
      </div>
    </hy-card>
  </div>
</template>

<script>
import BusinessManagement from '@/view/contract/business/components/business-management.vue'
import PersonalManagement from '@/view/customer/personal/components/personal-management.vue'
import CompanyManagement from '@/view/customer/company/components/company-management.vue'
import ContractBill from '@/view/common/contract-bill.vue'
import ProcessNotice from '@/view/workflow/process-notice/components/process-notice.vue'
import AssetManagement from '@/view/carrier/asset/components/asset-management.vue'
import InvoicedList from '@/view/finance/finance-invoice-management/components/invoiced-list.vue'

const refs = {
  合同列表: 'businessManagement',
  个人租户列表: 'personalManagement',
  企业租户列表: 'companyManagemen',
  载体列表: 'assetManagement',
  账单列表: 'ContractBill',
  审批列表: 'ProcessNotice',
  开票列表: 'invoicedList'
}
const model = {
  partyB: '',
  renterTel: '',
  estateName: '',
  houseName: ''
}
export default {
  components: {
    InvoicedList,
    BusinessManagement,
    AssetManagement,
    PersonalManagement,
    CompanyManagement,
    ContractBill,
    ProcessNotice
  },
  data() {
    return {
      defaultKey: '合同列表',
      model: this.$utils.deepCopy(model)
    }
  },
  computed: {
    toolbarButtons() {
      return [
        {
          permission: 'workbench_chart',
          text: '查询',
          action: () => {
            this.search()
          }
        },
        {
          permission: 'workbench_chart',
          type: 'default',
          text: '重置',
          action: () => {
            this.reset()
          }
        }
      ]
    }
  },
  mounted() {},
  methods: {
    search() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$refs[refs[this.defaultKey]].parentQuery(this.model)
        } else {
        }
      })
    },
    reset() {
      this.$refs.form.resetFields()
      this.$refs[refs[this.defaultKey]].parentQuery(model)
    },
    onClick(name) {
      this.defaultKey = name
    }
  }
}
</script>

<style lang='less'></style>