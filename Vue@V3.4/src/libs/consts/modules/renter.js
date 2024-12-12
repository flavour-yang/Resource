const renterConsts = {

  groupKey: {
    personnelType: "personnel_type",//企业人员类型
    certType: "cert_type",  //证件类型
    educationalType: "educational_type",//学历
    followUpType: "followUp_type",//跟进类别
    sex: "sex", //性别
    otherWays: "other_ways_type", //企业标签
    registCapitalCurrency: "regist_capital_currency",  //资金类型
    investmentCountry: "country_type",  //国别
    fundType: "fund_type",   //企业类型
    investmentSource: "investment_source",  //招商来源
    nation: "nation",  //民族
    renterStatus: "renter_status",  //租户状态
    renterType: "renter_type",  //租户类别
    followUpMethod: "followUp_method",  //跟进方式
    industry: "industry",  //行业类型
    rechargeAccountWay: "recharge_account_way",   //录入方式
    assetType: "asset_type",  //业态
    leaseType: "lease_type",  //租赁类型
  },
  //租户类别
  renterType: {
    个人租户: { key: 1, value: '个人租户' },
    企业租户: { key: 2, value: '企业租户' }
  },
  certType: {
    身份证: { key: '1', value: '身份证' },
    护照: { key: '2', value: '护照' }
  },
  //跟进业务类别
  followUpBusinessType: {
    个人租户: { key: '1', value: '个人租户' },
    企业租户: { key: '2', value: '企业租户' },
    合同: { key: '3', value: '合同' },
    账单: { key: '4', value: '账单' },
  }
}

export default renterConsts
