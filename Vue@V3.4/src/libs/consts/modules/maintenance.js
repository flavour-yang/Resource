const maintenanceConsts = {
    groupKey: {
        budgetStatus: "budget_state",    //年度预算状态
        maintenanceOrderStatus: "maintenance_order_status",     //维修单状态
        purchaseType:"oa_purchase_type",//采购项目类型
        dataFrom: "data_from",  //数据来源
        purchaseMethod: "purchase_method", //采购方式
        maintenanceType: "maintenance_type",    //维修项分类
        currencyCategory: "currency_category", //货币类型
    },

    dataFrom: {
        oa: {key: "1", value: "OA"},
        系统录入: {key: "2", value: "系统录入"},
    },

    budgetStatus: {
        草稿: {key: "0", value: "草稿"},
        未生效: {key: "1", value: "未生效"},
        已生效: {key: "2", value: "已生效"},
    },

    maintenanceOrderStatus: {
        进行中: {key: "1", value: "进行中"},
        已完成: {key: "2", value: "已完成"},
    },

    purchaseMethod: {
        公开采购: {key: "1", value: "公开采购"},
        邀请采购: {key: "2", value: "邀请采购"},
    },
    maintenanceType: {
        土建: {key: "1", value: "土建"},
        强电: {key: "2", value: "强电"},
        弱电: {key: "3", value: "弱电"},
    },
    currencyCategory: {
        RMB: {key: "1", value: "人民币"},
        MY: {key: "2", value: "美元"},
    },
    purchaseType:{
        维修维保: {key: "维修维保", value: "维修维保"},
        物业费: {key: "物业费", value: "物业费"},
        广告: {key: "广告", value: "广告"},
    },
    purchaseFormType: {
        采购单: {key: "采购单", value: "1"},
        委托单: {key: "委托单", value: "2"},
    },

    dataFromList: [
        {key: "1", value: "OA"},
        {key: "2", value: "系统录入"},
    ],
    contractTypeList:[
        {key: "框架主合同", value: "框架主合同"},
        {key: "非框架合同", value: "非框架合同"},
        {key: "框架内合同", value: "框架内合同"},
    ]
}

export default maintenanceConsts;