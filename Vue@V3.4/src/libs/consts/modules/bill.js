const billConsts = {
  groupKey: {
    BillRemindStatus: "BillRemindStatus",//账单催缴处理状态
    BillRemindType: "BillRemindType",//账单催缴处理状态
    feeType: "fee_type",//费用类型
    billType: "bill_type",//费用类型
  },
  //费用类型
  feeType: {
    租金: { key: 'zujin', value: '租金' },
    物业费: { key: 'wwf', value: '物业费' },
    电费: { key: 'gddf', value: '电费' },
  },

  //账单状态
  BillStatus: {
    草稿: {key: '0', value: '草稿'},
    待支付: {key: '1', value: '待支付'},
    部分支付: {key: '2', value: '部分支付'},
    已支付: {key: '3', value: '已支付'},
    退款: {key: '4', value: '退款'},
    已退租: {key: '5', value: '已退租'},
    取消: {key: '9', value: '取消'}
  }
}

export default billConsts
