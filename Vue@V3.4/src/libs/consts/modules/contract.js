const contractConsts = {
  groupKey: {
    changeState: 'change_state', //承租户变更状态
    revokeState: 'revoke_status', //合同撤销申请状态
    contractType: 'contract_type', //合同类型
    nbcbBankAcc: 'nbcb_bank_acc' //银行
  },
  //定价周期拆分方式
  PricingSplitMethod: {
    年度: { key: '1', value: '年度' },
    半年: { key: '2', value: '半年' },
    固定资金: { key: '3', value: '固定资金' },
    自定义: { key: '4', value: '自定义' }
  },
  //租金定价方式
  calcMethod: {
    按单价: { key: '1', value: '按单价' },
    按总额: { key: '2', value: '按总额' }
  },
  // 合同类型 商业合同： 1 ，公寓合同：2，车位合同：3
  contractType: {
    商业合同: '1',
    公寓合同: '2',
    车位合同: '3'
  },
  // 1:新签 2：续租，3：变更
  sourceType: {
    新签: 1,
    续租: 2,
    变更: 3
  },
  stateStatus: {
    草稿: { key: '0', value: '草稿' },
    审核中: { key: '1', value: '审核中' },
    审核通过: { key: '2', value: '审核通过' },
    审核不通过: { key: '3', value: '审核不通过' }
  },
  situation: {
    商业: '1',
    公寓: '2',
    车位: '3'
  },
  // 退租类型
  terminateType: {
    正常退租: '1',
    提前退租: '2',
    逾期退租: '3',
    提前退租_清退: '7'
  },
  contractBusinessStatus: {
    未生效: '0',
    已生效: '1',
    已失效: '2',
    已取消: '3'
  },
  statusList: {
    已签约:'3',
    退租完成: '5'
  },
  processingStatus: {
    无办理状态: '0',
    退租中: '3',
  },
  contractChangeType: {
    定建合同生效: '1',
    房源变更: '2',
    单价变更: '3',
    承租方变更: '4',
    其他: '5'
  }
}

export default contractConsts
