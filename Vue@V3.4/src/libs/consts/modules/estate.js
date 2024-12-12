const estateConsts = {
  groupKey: {
    region: 'region',
    electricityType: 'electricity_type',
    assetState: 'asset_state',
    assetType: 'asset_type',
    examineRateReportType: 'examine_rate_report_item',
    rentState: 'rent_state',
    locationType: 'location_type',
    certificateCompanyType: 'certificate_company_type',
    certificateType: 'certificate_type',
    landProperty: 'land_property',
    buildingStructure: 'building_structure',
    fireProtectionLevel: 'fireProtectionLevel',
    certificateStatus: 'certificate_status',
    decorationStyle: 'decoration_style'
  },

  attachmentType: {},
  apartmentLevel: {
    载体: { key: '1', value: '载体' },
    楼幢: { key: '2', value: '楼幢' },
    楼层: { key: '3', value: '楼层' },
    单元房: { key: '4', value: '单元房' }
  },
  rentState: {
    改造中: '1',
    空置中: '2',
    已签约未起租: '3',
    不可租: '4',
    租赁中: '5',
    已处置: '6',
    自用: '7'
  },
  assetType: {
    工业: 'industry',
    商业: 'business',
    公寓: 'apartment',
    车位: 'parking',
    写字楼: 'office',
  }
}
export default estateConsts
