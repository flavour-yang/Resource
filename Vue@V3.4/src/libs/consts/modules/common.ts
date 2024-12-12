const commonConsts = {
  yesNo: {
    yes: {
      value: 'Y',
      label: '是'
    },
    no: {
      value: 'N',
      label: '否'
    }
  },
  orderBy: {
    asc: {
      key: 'ASC',
      value: '升序'
    },
    desc: {
      key: 'DESC',
      value: '降序'
    }
  },
  status: {
    yes: {
      key: 'Y',
      value: '启用'
    },
    no: {
      key: 'N',
      value: '停用'
    }
  },
  yesNoCodeInfoList: () => Object.values(commonConsts.yesNo),
  statusList: () => Object.values(commonConsts.status)
}

export default commonConsts
