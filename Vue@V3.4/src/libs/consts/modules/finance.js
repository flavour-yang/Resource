const financeConsts = {
    groupKey: {
        bank: "bank",
        claimType: "claimType",
        annualTarget: "annual_target",
        rechargeStatus: "recharge_status",
        rechargeType: "recharge_type",
        voucherType:"voucher_type",
        voucherStatus:"voucher_status",
    },

    dataFrom: [
        {key: "1", value: "数据导入"},
        {key: "2", value: "接口同步"},
    ],
    invoiceStatus: {
        已申请:'0',
        审核中:"1", //OA审核
        开票中:'10',
        生成中:'20',
        异常:'30',
        红字确认单异常:'31',
        正常:'40',
        正常红票:'41',
        被红冲:'50',
        作废:'90',
        取消:'91',
    },
    invoiceOAApprovalStatus: {
        待提交:'0',
        OA审核中:'1',
        OA审核通过:"2",
        OA不通过:"3",
    },
    invoiceCategory: {
        纸票:'Z',
        全电:'D',
        收据:'S',
    },
    voucherStatus: {
        待推送:'0',
        已推送:'1',
        已确认:'2',
    },
    rechargeType:{
      银行流水:"1",
      超付流水:"2",
    },
    rechargeStatus:{
        待认领: 10,
        已预认领: 20,
        已认领: 30,
        删除: 40,
    },
    depositReceiptStatus:{
        待打印: '1',
        已打印: '2',
        待回收: '3',
        已回收: '4',
    },
    proofType:{
        应收账单:"yszd",
        损益摊销:"sytx_zj",
    },

}
export default financeConsts;