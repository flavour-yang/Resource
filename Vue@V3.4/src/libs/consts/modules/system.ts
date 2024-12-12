const systemConsts = {
  groupKey: {
    yesNo: 'yes_no', //是或否
    contractType: 'contract_type', //合同类别
    billType: 'bill_type', //账单类型
    billStatus: 'bill_status', //账单类型
    feeType: 'fee_type', //账单费用类型
    financeFocusType: 'finance_focus_type', //财务归口类别
    financeInvoiceType: 'finance_invoice_type', //发票类型
    financeInvoiceRedOffsetReason: 'finance_invoice_red_offset_reason', //发票红冲原因
    financeInvoiceCategory: 'finance_invoice_category', //开票方式
    statusType: 'status_type',
    contractStatus: 'contract_status', //合同状态
    contractBusinessStatus: 'contract_business_status', //查询状态
    payTerm: 'pay_term', //支付周期
    paymentMethod: 'payment_method', //支付方式
    contractProcessingStatus: 'contract_processing_status', //合同办理状态
    pricingSplitMethod: 'pricing_split_method', //定价周期拆分方式
    calcMethod: 'calc_method', //租金定价方式
    situation: 'situation', //业态
    contractSourceType: 'contract_source_type', //合同来源
    pricingCalculationMethod: 'pricing_calculation_method', //费用计算方式
    pricingMethod: 'pricing_method', // 合同单价定价方式
    contractPrintTemplate: 'contract_print_template', // 合同打印M模板
    terminateType: 'terminate_type', //退租原因
    workflowState: 'workflow_state', //流程环节处理状态
    workflowBusinessType: 'workflow_business_type', //流程业务类别
    workflowCommonSate: 'workflow_common_sate', //流程常规节点
    refundRule: 'refund_rule', //退费规则
    roleType: 'role_type',
    paymentPeriod: 'payment_period', // 付款周期
    contractChangeType: 'contract_change_type', // 合同变更类型
    contractChangeStatus: 'contract_change_status', // 合同变更状态
    workbenchCategory: 'workbench_category', // 工作台待办任务
    noteStatus: 'note_status',
    followUpStatus: 'followUp_status',
    followUpResult: 'followUp_result',
    assetType: 'asset_type', //载体类型
    workflowNodeType: 'workflow_node_type', // 流程图节点类型
    lawsuitTypeList: 'lawsuit_type', // 诉讼案件类型
    lawsuitDisputePhasesList: 'lawsuit_dispute_phases', // 诉讼案件类型
    lawsuitPositionList: 'lawsuit_position', // 诉讼地位
    applyPurposeList: 'apply_purpose', // 诉讼申请目的
    arrearageDetailList: 'arrearage_detail', // 诉讼欠款明细
    documentManagementType: 'document_management_type',
    financeAccrualStatus: 'finance_accrual_status', //财务权责推送状态
    financeAccrualGenerateType: 'finance_accrual_generate_type', //财务权责生产类别
    financeInvoiceStatus: 'finance_invoice_status', //开票状态
    financeInvoiceOAApprovalStatus: 'finance_invoice_oa_approval_status', //发票OA审核状态
    depositReceiptStatus: 'deposit_receipt_status' //押金票据状态
  },

  attachmentType: {
    headPhoto: '2',
    审核流附件: '27'
  },

  fileType: {
    file: '1',
    pdf: '2',
    thumbnail: '3'
  },

  rightType: {
    系统: { code: 1, desc: '系统' },
    模块: { code: 2, desc: '模块' },
    页面: { code: 3, desc: '页面' },
    功能: { code: 4, desc: '功能' }
  },

  RoleType: {
    系统管理员: { code: 1, desc: '系统管理员', defaultRoleId: '1', defaultUserId: '1' },
    企业管理员: { code: 2, desc: '企业管理员', defaultRoleId: '2', defaultUserId: '2' }
  }
}

export default systemConsts
