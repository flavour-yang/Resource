const equipmentConsts = {
    groupKey: {
        unit:"unit_info",//单位
        status: "equipment_state",    //设备状态
        category: "equipment_category",    //设备类别
        ownerShip: "equipment_ownership",    //权责归属
        recordType:"equipment_recordtype",//记录类别 1:维保记录2：维修记录
    },

    unit:{
        个: {key: "1", value: "个"},
        只: {key: "2", value: "只"},
        台: {key: "3", value: "台"},
    },

    status: {
        在用: {key: "0", value: "在用"},
        停用: {key: "1", value: "停用"},
        报废: {key: "2", value: "报废"},
    },

    category: {
        玻璃幕墙: {key: "1", value: "玻璃幕墙"},
        供电设施: {key: "2", value: "供电设施"},
    },

    ownerShip: {
        中新集团: {key: "0", value: "中新集团"},
        全体业主: {key: "1", value: "全体业主"},
    },

    recordType: {
        维保记录: {key: "1", value: "维保记录"},
        维修记录: {key: "2", value: "维修记录"},
    },

    reviewStatus: [
        {key: "0", value: "待复核"},
        {key: "1", value: "已复核"},
    ],
    forWarningStatus:[
        {key: "0", value: "预警中"},
        {key: "1", value: "正常"},
    ],

}

export default equipmentConsts;