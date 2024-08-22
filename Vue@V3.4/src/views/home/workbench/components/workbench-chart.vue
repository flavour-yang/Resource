<template>
  <div class="content">
    <div class="chart-estate">
      <div class="chart-title">
        <span> <img class="title-icon" :src="requireImg('chart_icon1')" alt="">载体基本情况</span>
        <span class="link-more"> </span>
      </div>
      <div class="chart-estate-main">
        <div class="estate-main-left">
          <p v-for="item of estates" :key="item.title" @click="$router.push(index<3?'/carrier/asset':'/report/archive-apartment')">
            <img class="main-icon" :src="requireImg(item.img)" alt="">
            <span>
              <span class="number">
                {{ Number(item.count).toLocaleString() }} {{item.title === '载体数量' ? '个' : 'm²' }}<br />
              </span>
              <span class="text">
                {{item.title}}
              </span>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="chart-estate-percent">
      <div class="chart-title">
        <span> <img class="title-icon" :src="requireImg('chart_icon2')" alt=""> 载体出租率</span>
        <!-- <span class="link-more" @click="$router.push('/report/estate-rent-report')"> 更多</span> -->
      </div>
      <div class="estate-percent-card">
        <div class="estate-percent-card-left">
          <div style="margin-top: 10px">
            <Row>
              <Col span="14" style="position: relative;">
              <span style="position: absolute;top: 1px;color: #fff;z-index: 1;" :style="{left: estateRateInfo.prent > 15 ? `calc(${estateRateInfo.prent}% - 55px)`: 0}">{{ estateRateInfo.estateRate }}%</span>
              <Progress hide-info :percent="estateRateInfo.prent" :stroke-width="18" />
              </Col>
              <Col span="10" style="padding-left: 8px;display: flex;justify-content: space-between">
              <span>载体综合考核目标</span> <span class="percent">{{estateRateInfo.examineRate}}%</span>
              </Col>
            </Row>
          </div>
          <div style="margin-top: 10px" v-for="item in estateRateInfo.estateRateList" :key="item.estateAssetTypeName">
            <Row>
              <Col span="14" style="position: relative;">
              <span style="position: absolute;top: 2px;color: #fff;z-index: 1;" :style="{left: item.prent > 15 ? `calc(${item.prent}% - 55px)`: 0}">{{ item.rate }}%</span>
              <Progress hide-info :percent="item.prent" :stroke-width="18" />
              </Col>
              <Col span="10" style="padding-left: 8px;display: flex;justify-content: space-between">
              <span>{{item.estateAssetTypeName}}考核目标</span> <span class="percent">{{item.examineRate}}%</span>
              </Col>
            </Row>
          </div>
        </div>
        <div class="estate-percent-card-right">
          <div class="right-title">
            载体税收情况<c-tooltip :size="16" content="包含非直接签约部分维护的金额" />
          </div>
          <div class="right-number">
            <div><span>{{tenantInvestment.totalTaxAmount}}</span><span>税收总计(万元)</span></div>
            <div><span>{{tenantInvestment.avgTaxAmount}}</span><span>亩均税收(万元)</span></div>
          </div>
        </div>
      </div>
    </div>
    <div class="chart-finance">
      <div class="chart-title">
        <span> <img class="title-icon" :src="requireImg('chart_icon5')" alt=""> 载体财务参数</span>
        <!-- <span class="link-more" @click="$router.push('/carrier/asset')"> 更多</span> -->
      </div>
      <!-- <div class="finance-main-card">
        <div style="display: flex;align-items: center;justify-content: center;height: 160px">
          <i-circle :percent="financeInfo.irr" :size="110" :trail-width="8" :stroke-width="8">
            <span style="font-size:18px; font-weight: 700">{{financeInfo.irr}}%<br /><span style="font-size:14px;font-weight: 400">IRR均值</span></span>
          </i-circle>
        </div>
        <div style="display: flex; flex: 1;margin-left: 30px">
          <img class="finance-info-img" :src="requireImg('cw_ico1')" alt="">
          <div class="finance-info-text">
            <p class="finance-number"> {{financeInfo.bookValueTotal}} </p>
            <p class="finance-text">资产原值合计(元)</p>
          </div>
        </div>
      </div> -->
      <div class="finance-main-card1">
        <div>
          <img class="estate-percent-info-img" :src="requireImg('cw_ico1')" alt="">
          <div class="finance-info-text">
            <p class="finance-number"> {{financeInfo.bookValueTotal}} </p>
            <p class="finance-text">资产原值合计(万元)</p>
          </div>
        </div>
        <div class="finance-block">
          <div v-for="item in financeInfo.assetTypeIRRList" :key="item.estateAssetTypeName">
            <div class="finance-block-title"><img class="title-icon" :src="requireImg(financeIcon.find(f=> f.name === item.estateAssetTypeName).icon || 'cw_ico8')" alt="">{{item.estateAssetTypeName}}</div>
            <div class="finance-block-info">
              <p>
                <span>{{item.minIrr}}~{{item.maxIrr}}%</span>
                <span class="finance-text" style="min-width: 100px">IRR区间</span>
              </p>
              <p>
                <span>{{item.originalValue}}</span>
                <span class="finance-text" style="min-width: 140px">资产原值合计(万元)</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chart-maintain">
      <div class="chart-title">
        <span> <img class="title-icon" :src="requireImg('chart_icon5')" alt=""> 维修预算统计</span>
        <!-- <span class="link-more" @click="$router.push('/maintenance/item-management')"> 更多</span> -->
      </div>
      <div class="finance-main-card">
        <div style="display: flex; flex-direction: column;flex: 1;padding-left: 24px">
          <div class="finance-info-text">
            <p class="finance-number"> {{maintenanceInfo.annualBudgetTotal}} </p>
            <p class="finance-text">当年预算总额(万元)</p>
          </div>
          <div class="finance-info-text">
            <p class="finance-number" style="color: #3DD0A1"> {{maintenanceInfo.hasUseTotal}} </p>
            <p class="finance-text">当年已使用(万元)</p>
          </div>
        </div>
        <div style="display: flex;align-items: center;justify-content: center;height: 180px;width: 200px">
          <i-circle :percent="maintenanceInfo.hasUseRate" :size="85" :trail-width="8" :stroke-width="10" stroke-color="#3DD0A1">
          </i-circle>
          <span style="font-size:18px; font-weight: 700; margin-left: 10px"> {{maintenanceInfo.hasUseRate}} %<br /><span style="font-size:14px;font-weight: 400;">已使用占比</span></span>
        </div>
      </div>
    </div>
    <div class="chart-notice">
      <div class="chart-title">
        <span> <img class="title-icon" :src="requireImg('chart_icon5')" alt=""> 重要事项</span>
        <!-- <span class="link-more" @click="$router.push('/warning/note-warning')"> 更多</span> -->
      </div>
      <div @click="viewDetail($event)">
        <vue-seamless-scroll class="seamless-warp" :style="notices.length<5?{maxHeight: notices.length * 50 + 'px'}:{}" :data="notices" :class-option="defaultOption" v-if="notices.length !== 0">
          <div v-for="(item, index) of notices" :key="item + index" :data-item="JSON.stringify(item)" class="seamless-list">
            <div :data-item="JSON.stringify(item)">{{item.title}}</div>
            <div :data-item="JSON.stringify(item)" class="seamless-list-text">{{item.updateTime}}</div>
          </div>
        </vue-seamless-scroll>
      </div>
    </div>
    <div class="chart-user">
      <div class="chart-title">
        <span> <img class="title-icon" :src="requireImg('chart_icon2')" alt=""> 客户情况</span>
        <!-- <span class="link-more" @click="$router.push('/report/archive-renter')"> 更多</span> -->
      </div>
      <!-- <div class="chart-user-title"> <span>非公寓租户</span> <span>公寓租户</span></div>
      <div class="user-main-top"></div>
      <div class="chart-user-apartment">公寓租户数 <br /> {{renterInfo.renterCountByApartment}}</div>
      <div class="user-card">
        <div class="user-info" v-for="item of chartUser" :key="item.img+item.title" @click="toRoute('/report/archive-renter', item.tag)">
          <img class="user-info-img" :src="requireImg(item.img)" alt="">
          <div class="user-info-text">
            <p class="user-number">{{ item.count }} <span class="user-text">家</span> </p>
            <p class="user-text">{{item.title}}</p>
          </div>
        </div>
      </div> -->
      <div class="user-card-outer">
        <div class="user-left-chart">
          <div>
            <div class="chart-user-title"> <span>非公寓租户</span></div>
            <div class="user-main-top"></div>
          </div>
          <div class="chart-user-apartment">
            <div class="chart-user-title">
              <span>公寓租户</span>
            </div>
            <div class="chart-user-apartment-info">
              <img width="50" height="50" :src="requireImg('gy_ico1')" alt="">
              <p>
                <span class="apartment-number">
                  {{renterInfo.renterCountByApartment}} <br />
                </span>
                公寓租户
              </p>
            </div>
          </div>
        </div>
        <div class="user-card">
          <div class="user-info" v-for="item of chartUser" :key="item.img+item.title" @click="toRoute('/report/archive-renter', item.tag)">
            <img class="user-info-img" :src="requireImg(item.img)" alt="">
            <p class="user-text">{{item.title}}</p>
            <div class="user-info-text">
              <p class="user-number">{{ item.count }} <span class="user-text">家</span> </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chart-approve">
      <div class="chart-title">
        <span> <img class="title-icon" :src="requireImg('chart_icon4')" alt=""> 审批情况</span>
        <!-- <span class="link-more" @click="$router.push('/workflow/process-notice')"> 更多</span> -->
      </div>
      <div class="approve-card">
        <div class="approve-info" v-for="item of chartApprove" :key="item.img+item.title" @click="toRouteNotice('/workflow/process-notice', item.key)">
          <img class="approve-info-img" :src="requireImg(item.img)" alt="">
          <div class="approve-info-text">
            <p class="approve-number">{{ item.count }} <span class="approve-text">份</span> </p>
            <p class="approve-text">{{item.title}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="chart-rent">
      <div class="chart-title">
        <span> <img class="title-icon" :src="requireImg('chart_icon3')" alt=""> 租金收入统计</span>
        <!-- <span class="link-more" @click="$router.push('/bill/renter-bill')"> 更多</span> -->
      </div>
      <div class="rent-main">
      </div>
    </div>
    <div class="chart-contract">
      <div class="chart-title">
        <span> <img class="title-icon" :src="requireImg('chart_icon5')" alt=""> 合同情况</span>
        <!-- <span class="link-more" @click="$router.push('/report/archive-contract')"> 更多</span> -->
      </div>
      <div class="chart-contract-main">
        <div class="contract-main-top"></div>
        <div class="contract-main-middle">
          <div class="contract-main-title">
            履行中合同数
          </div>
          <div class="contract-main-middle-chart"></div>
        </div>
        <div class="contract-main-bottom">
          <div class="contract-main-title" style="margin-bottom: 20px">
            履行中合同面积m²
          </div>
          <div v-for="item of contractInfo.contractDetailList" :key="item.area" class="contract-main-bottom-bar" style="position: relative;margin-bottom: 12px">
            <div style="width: 100px" class="asset-type" @click="toRouteContract(item.assetType === 'apartment' ? '/contract/apartment' : '/contract/business', item.assetType)">{{ item.estateName }}</div>
            <Progress style="flex: 1" hide-info :percent="item.percent" :stroke-width="16" />
            <div style="width: 80px;padding-left: 10px;position: absolute;left: 115px;color: #fff;top: 2px">
              {{ item.area }}
            </div>
            <div style="width: 80px;padding-left: 10px;">
              {{ item.canRentArea }}
            </div>
          </div>
        </div>
      </div>
      <note-detail-modal ref="note-modal" />
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import vueSeamlessScroll from 'vue-seamless-scroll'
import moment from 'moment'
import NoteDetailModal from '@/view/warning/note-warning/components/note-detail-modal.vue'

export default {
  components: { vueSeamlessScroll, NoteDetailModal },
  data() {
    return {
      notices: [{ title: '...', time: moment().format('YYYY-MM-DD') }],
      estates: [
        {
          key: 'allBuildingArea',
          img: '509',
          count: 0,
          title: '总建筑面积'
        },
        {
          key: 'allLandArea',
          img: '510',
          count: 0,
          title: '总土地面积'
        },
        {
          key: 'estateCounts',
          img: '511',
          count: 0,
          title: '载体数量'
        },
        {
          key: 'canRentArea',
          img: '512',
          count: 0,
          title: '可租总面积'
        },
        {
          key: 'hasRentArea',
          img: '513',
          count: 0,
          title: '已租总面积'
        },
        {
          key: 'noRentArea',
          img: '514',
          count: 0,
          title: '未租总面积'
        }
      ],
      estateRateInfo: {
        estateRateList: []
      },
      financeInfo: {},
      maintenanceInfo: {},
      rentList: [],
      renterInfo: {},
      financeIcon: [
        { name: '标准厂房', icon: 'cw_ico8' },
        { name: '仓储', icon: 'cw_ico2' },
        { name: '定建厂房', icon: 'cw_ico3' },
        { name: '学校', icon: 'cw_ico4' },
        { name: '公寓', icon: 'cw_ico5' },
        { name: '商业', icon: 'cw_ico6' },
        { name: '写字楼', icon: 'cw_ico7' }
      ],
      estatePercent: [
        {
          title: '厂房'
        },
        {
          title: '综保区外厂房'
        },
        {
          title: '综保区内厂房'
        },
        {
          title: '长租公寓'
        },
        {
          title: '写字楼'
        },
        {
          title: '商业'
        },
        {
          title: '学校'
        },
        {
          title: '仓储'
        },
        {
          title: '停车位'
        }
      ],
      chartUser: [
        {
          key: 'top500',
          img: '勋章、荣誉',
          count: 0,
          title: '500强企业',
          tag: '500强企业'
        },
        { key: 'ladingEnterprise', img: '企业包保', count: 0, title: '领军企业', tag: '领军企业' },
        {
          key: 'highAndNewEnterprise',
          img: '开公司',
          count: 0,
          title: '高新技术',
          tag: '高新技术'
        },
        { key: 'unicornEnterprise', img: '公司', count: 0, title: '独角兽', tag: '独角兽' }
      ],
      contractInfo: { contractDetailList: [] },
      tenantInvestment: {},
      chartApprove: [
        {
          key: 'contractExamine',
          img: 'sp1',
          count: 0,
          title: '合同审批中'
        },
        { key: 'invoiceExamine', img: 'sp2', count: 0, title: '发票申请中' },
        { key: 'contractDisputeExamine', img: 'sp3', count: 0, title: '合同纠纷审批中' },
        { key: 'maintenance', img: 'sp4', count: 0, title: '当前维修项目' }
      ],
      options: [
        {
          tooltip: {
            trigger: 'axis',
            formatter: params => {
              const [val] = params
              return `${val.marker} ${val.name}: ${val.value} 个<br/>`
            }
          },
          xAxis: {
            type: 'category',
            axisLabel: { interval: 0, rotate: '15', color: '#707070', align: 'center', margin: 15 }, // interval: 0,
            data: ['本年新签', '本年退租', '本年续租'] // '逾期', '三个月内到期'
          },
          yAxis: {
            name: '个',
            axisLabel: { color: '#707070' },
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
          },
          grid: { left: 50, bottom: 30, top: 40, right: 20 },
          series: [
            {
              // label: {
              //   show: true,
              //   position: 'insidebottom',
              //   formatter: params => {
              //     const strs = params.name.split('')
              //     return strs.join('\n')
              //   }
              // },
              type: 'bar',
              left: '0%',
              top: 0,
              barWidth: '30%',
              data: [43, 83, 86, 72, 72, 72]
            }
          ] //, { type: 'bar' }, { type: 'bar' }
        },
        {
          title: {
            text: '履行合同总数\n',
            left: '19%',
            top: '38%',
            textStyle: {
              fontSize: 14
            },
            textAlign: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            top: '2%',
            right: '2%',
            center: 'center',
            itemWidth: 8,
            itemHeight: 8,
            // itemGap: 0,
            width: 0,
            // height: 320,
            textStyle: {
              padding: [0, 20, 0, 0],
              fontSize: 14
            },
            formatter: name => {
              return '\n' + name + '\n' + this.options[1].series[0].data.find(f => f.name === name).value
            }
          },
          series: [
            {
              name: '合同',
              type: 'pie',
              radius: ['43%', '55%'],
              center: ['20%', '45%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: { label: { show: false } },
              labelLine: {
                show: false
              },
              data: [
                { value: 0, name: '标准厂房' },
                { value: 0, name: '学校项目' },
                { value: 0, name: '长租公寓' },
                { value: 0, name: '商业项目' },
                { value: 0, name: '定建项目' },
                { value: 0, name: '写字楼项目' }
              ]
            }
          ]
        },
        {
          // title: {
          //   text: '89\n租户总数',
          //   left: '35%',
          //   top: '40%',
          //   textStyle: {
          //     fontSize: 14
          //   },
          //   textAlign: 'center'
          // },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            top: '30%',
            left: '45%',
            center: 'center',
            itemWidth: 8,
            itemHeight: 8,
            itemGap: 10,
            textStyle: {
              // padding: [15, 0, 0, 0],
              fontSize: 14
            },
            formatter: name => {
              const list = this.options[2].series[0].data
              return name + list.find(f => f.name === name).value
            }
          },
          series: [
            {
              name: '租户',
              type: 'pie',
              radius: ['50%', '62%'],
              center: ['25%', '55%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: { label: { show: false } },
              labelLine: {
                show: false
              },
              data: [
                { value: 0, name: '个人租户' },
                { value: 0, name: '企业租户' }
              ]
            }
          ]
        },
        {
          tooltip: {
            trigger: 'axis',
            formatter: params => {
              const [val, val1] = params
              let str = '',
                str1 = '',
                total = 0
              if (val) {
                total = this.rentList.find(f => f.year === val.axisValue).shouldTotalAmount
                str = `${val.marker} ${val.seriesName}：${val.value} 万元<br/>`
              }
              if (val1) {
                str1 = `${val1.marker} ${val1.seriesName}：${val1.value} 万元`
              }

              return `应收租金：${total} 万元<br/>${str}${str1}`
            }
          },
          xAxis: {
            type: 'category',
            axisLabel: { interval: 0, color: '#707070' },
            data: ['2021年', '2022年', '2023年']
          },
          legend: {
            top: '5%',
            right: '10%',
            center: 'center',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 40,
            icon: 'circle',
            textStyle: {
              fontSize: 14
            }
          },
          yAxis: {
            name: '万元',
            type: 'value',
            axisLabel: { color: '#707070' },
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
          },
          grid: { left: 60, bottom: 30, top: 40, right: 15 },
          series: [
            {
              data: [0, 0, 0, 0, 0, 0, 0],
              type: 'bar',
              stack: 'a',
              name: '实收',
              barWidth: '30%'
            },
            {
              data: [0, 0, 0, '-', 0, '-', 0],
              type: 'bar',
              stack: 'a',
              name: '未收',
              barWidth: '30%'
            }
          ]
        }
      ]
    }
  },
  computed: {
    defaultOption() {
      return {
        step: 0.1, // 数值越大速度滚动越快
        limitMoveNum: this.notices.length, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
    }
  },
  async mounted() {
    await this.initFetch()
    this.createChart()
  },
  destroyed() {
    window.removeEventListener('resize', () => this.resizeChart)
  },
  methods: {
    toRoute(path, query) {
      this.$router.push({ path, query: { otherWaysArr: this.$consts.home.userTag[query] } })
    },
    toRouteContract(path, query) {
      this.$router.push({ path, query: { assetType: query } })
    },
    toRouteNotice(path, key) {
      const types = this.$consts.home.workflowBusinessType
      const tag = [types['合同新签'], types['合同续签'], types['合同退租'], types['合同变更']]
      const tag1 = [types['合同纠纷']]
      const querys = {
        contractExamine: tag,
        contractDisputeExamine: tag1
      }
      this.$router.push({ path, query: { businessTypeList: querys[key] } })
    },
    viewDetail($event) {
      const item = JSON.parse($event.target.dataset.item)
      this.$refs['note-modal'].open('查看', item)
    },
    async initFetch() {
      // 获取载体基本情况
      const estateInfo = await this.$store.dispatch('home/index/queryEstate', {})
      if (estateInfo) {
        Object.entries(estateInfo).map(([k, v]) => {
          const find = this.estates.find(f => f.key === k)
          find.count = v
        })
      }
      // 获取客户基本情况
      const renterInfo = await this.$store.dispatch('home/index/queryRenter', {})
      if (renterInfo) {
        this.renterInfo = renterInfo
        Object.entries(renterInfo).map(([k, v]) => {
          const find = this.chartUser.find(f => f.key === k)
          if (find) {
            find.count = v
          }
        })
        this.options[2].series[0].data = [
          { value: renterInfo.enterCount, name: '企业租户' },
          { value: renterInfo.personCount, name: '个人租户' }
        ]
      }
      // 获取重要事项
      const resNotes = (await this.$store.dispatch('home/index/queryNotes', {})) || []
      this.notices = resNotes.records
      // 收付租金统计
      const rentList = await this.$store.dispatch('home/index/queryCollectAndPayRent', { zuJinTimeType: 2 })
      if (rentList) {
        this.rentList = rentList
        this.options[3].xAxis.data = rentList.map(m => m.year)
        // 实收
        this.options[3].series[0].data = rentList.map(m => m.receiveTotalAmount) // 本年度实收租金
        // 未收
        this.options[3].series[1].data = rentList.map(m => (m.shouldTotalAmount - m.receiveTotalAmount).toFixed(2)) // 本年度未收租金
      }
      // 载体出租率统计
      const estateRateInfo = await this.$store.dispatch('home/index/queryEstateRate', {})
      if (estateRateInfo) {
        const prent = Math.floor((estateRateInfo.estateRate / estateRateInfo.examineRate) * 10000) / 100
        estateRateInfo.prent = prent >= 100 ? 100 : prent

        estateRateInfo.estateRateList = estateRateInfo.estateRateList.map(m => {
          const prent = Math.floor((m.rate / m.examineRate) * 10000) / 100
          m.prent = prent >= 100 ? 100 : prent
          return m
        })
        this.estateRateInfo = estateRateInfo
        this.estateRateInfo.estateRateList = estateRateInfo.estateRateList.slice(0, 3)
      }
      // 财务统计
      const financeInfo = await this.$store.dispatch('home/index/queryFinance', {})
      if (financeInfo) {
        this.financeInfo = financeInfo
      }
      // 维修预算统计
      const maintenanceInfo = await this.$store.dispatch('home/index/queryMaintenance', {})
      if (maintenanceInfo) {
        maintenanceInfo.annualBudgetTotal = maintenanceInfo.annualBudgetTotal.toFixed(2)
        maintenanceInfo.hasUseTotal = maintenanceInfo.hasUseTotal.toFixed(2)
        this.maintenanceInfo = maintenanceInfo
      }
      // 审批情况统计
      const approveInfo = await this.$store.dispatch('home/index/queryExamineAndApprove', {})
      if (approveInfo) {
        Object.entries(approveInfo).map(([k, v]) => {
          const find = this.chartApprove.find(f => f.key === k)
          if (find) {
            find.count = v
          }
        })
      }
      // 合同情况统计
      const contractInfo = await this.$store.dispatch('home/index/queryContract', {})
      if (contractInfo) {
        this.contractInfo = contractInfo
        const list = [
          contractInfo.newContractCount, //本年新签
          contractInfo.terContractCount, //本年退租
          contractInfo.continueContractCount, //本年续租
          contractInfo.overdueContractCount, //逾期
          contractInfo.overdueByThreeContractCount //三个月内到期
          // contractInfo.overdueByOneContractCount, //一个月内到期
          // contractInfo.overdueByTwoContractCount //两个月内到期
        ]
        this.options[0].series[0].data = list
        this.options[1].series[0].data = contractInfo.contractDetailList.map(m => ({
          value: m.count,
          name: m.estateName
        }))
        this.options[1].title.text = `履行合同总数\n${contractInfo.contractDetailList.reduce((p, n) => p + n.count, 0)}`
        // const max = Math.max(...contractInfo.contractDetailList.map(m => m.area))
        // const percentMax = max + max * 0.1
        // contractInfo.contractDetailList.forEach(el => {
        //   el.percent = Number(((el.area / percentMax) * 100).toFixed(0))
        // })
        contractInfo.contractDetailList.forEach(el => {
          el.percent = Number(((el.area / el.canRentArea) * 100).toFixed(0))
        })
      }
      const tenantInvestment = await this.$store.dispatch(
        'archive/archive-renter/queryTaxStatisticsOnTenantInvestment',
        {
          pageIndex: 1,
          pageSize: 100,
          validBegin: moment().format('YYYY-MM-DD')
        }
      )
      if (tenantInvestment && tenantInvestment.records) {
        this.tenantInvestment = tenantInvestment.records.find(f => f.estateName === '总计')
      }
    },
    requireImg(name) {
      return require(`@/assets/images/workbrench-chart/${name}.png`)
    },
    requireHomeImg(name) {
      return require(`@/assets/images/home/${name}.png`)
    },
    createChart() {
      const doms = [
        // '.estate-main-right',
        '.contract-main-top',
        '.contract-main-middle-chart',
        // '.contract-main-bottom',
        '.user-main-top',
        '.rent-main'
      ]
      const domElement = doms.map(f => document.querySelector(f))
      domElement.forEach((f, index) => {
        const chart = echarts.init(f, 'light')
        chart.setOption(this.options[index])
        window.addEventListener('resize', () => this.resizeChart(chart))
      })
    },
    resizeChart(chart) {
      chart.resize() // 调用 resize() 方法
    }
  }
}
</script>

<style lang='less' scoped>
.content {
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  grid-auto-rows: 22px;
  font-family: 'Source Han Sans CN;';
  // grid-auto-rows: 50px;
  gap: 20px;
  background: #f0f2f5;
  .link-more {
    cursor: pointer;
  }
  > div {
    background: #fff;
  }
  .chart-estate {
    grid-column: 1 / span 24;
    grid-row: 1 / span 5;
  }
  .chart-estate-percent {
    grid-column: 1 / span 16;
    grid-row: 9 / span 6;
  }
  .chart-approve {
    grid-column: 1 / span 16;
    grid-row: 6 / span 3;
  }
  .chart-finance {
    grid-column: 1 / span 16;
    grid-row: 15 / span 11;
  }
  .chart-maintain {
    grid-column: 7 / span 6;
    grid-row: 26 / span 8;
  }
  .chart-user {
    position: relative;
    grid-column: 1 / span 6;
    grid-row: 26 / span 8;
  }
  .chart-notice {
    grid-column: 19 / span 6;
    grid-row: 26 / span 8;
  }
  .chart-rent {
    grid-column: 13 / span 6;
    grid-row: 26 / span 8;
  }
  .chart-contract {
    grid-column: 17 / span 8;
    grid-row: 6 / span 20;
  }
  .chart-title {
    padding: 8px;
    border-bottom: 1px solid #f9f9f9;
    color: #333;
    display: flex;
    align-items: center;
    font-weight: 700;
    justify-content: space-between;
    span:nth-of-type(2) {
      margin-top: -8px;
    }
  }
  .seamless-warp {
    overflow: hidden;
    position: relative;
    margin: 0 auto;
    max-height: 260px;
    .seamless-list {
      position: relative;
      cursor: pointer;
      &::before {
        position: absolute;
        left: 10px;
        top: 15px;
        content: '';
        width: 8px;
        height: 8px;
        background: #399bfe;
        border-radius: 3px 3px 3px 3px;
        opacity: 1;
      }
      padding: 8px;
      padding-left: 30px;
      &-text {
        color: #999999;
      }
    }
  }
  .title-icon {
    width: 26px;
    vertical-align: middle;
    margin-right: 12px;
  }
  .chart-estate-main {
    display: flex;
    padding: 12px 8px;
  }
  .estate-main-left {
    flex: 1;
    display: flex;
    .main-icon {
      width: 40px;
      height: 40px;
      vertical-align: middle;
      margin-right: 12px;
      align-self: center;
    }
    p {
      padding: 8px;
      margin: 6px;
      border-radius: 6px;
      height: 100px;
      color: #fff;
      flex: 1;
      display: flex;
      align-items: center;
      cursor: pointer;
      .number {
        text-decoration: underline solid #fff;
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 6px;
        display: block;
      }
    }
    p:nth-of-type(1) {
      background: linear-gradient(90deg, #b37eef 0%, #9e61ed 100%);
    }
    p:nth-of-type(2) {
      background: linear-gradient(90deg, #58b0ff 0%, #4781fe 100%);
    }
    p:nth-of-type(3) {
      background: linear-gradient(90deg, #64d2f1 0%, #2fc4ec 100%);
    }
    p:nth-of-type(4) {
      background: linear-gradient(90deg, #ff8b8e 0%, #ef5a62 100%);
    }
    p:nth-of-type(5) {
      background: linear-gradient(90deg, #ffca7b 0%, #ffa319 100%);
    }
    p:nth-of-type(6) {
      background: linear-gradient(90deg, #65e2e2 0%, #36cbcb 100%);
    }
  }
  .estate-main-ring {
    width: 260px;
  }
  .contract-main-top {
    min-height: 240px;
  }
  .contract-main-middle-chart {
    min-height: 200px;
  }
  .contract-main-title {
    padding: 0 24px;
    font-weight: 700;
    color: #333;
    &::before {
      content: '';
      height: 16px;
      width: 5px;
      position: relative;
      top: 3px;
      display: inline-block;
      background: #2d8cf0;
      margin-right: 12px;
      border-radius: 5px;
    }
  }
  .contract-main-bottom {
    min-height: 180px;
    &-bar {
      padding: 0 16px;
      margin: 3px 0;
      // justify-content: center;
      display: flex;
      align-items: center;
    }
    /deep/ .ivu-progress {
      width: 90%;
    }
    .asset-type {
      cursor: pointer;
      color: #2d8cf0;
      text-decoration: underline solid #2d8cf0;
    }
  }
  .estate-percent-card {
    display: flex;
    flex-direction: column;
    height: calc(~'100% - 42px');
    .estate-percent-card-left {
      min-width: 200px;
      display: flex;
      flex-direction: column;
      height: 56%;
      .estate-percent-info-text {
        .estate-percent-number {
          font-size: 16px;
        }
      }
      > div {
        display: flex;
        flex-direction: column;
        padding: 4px;
        flex: 1;
        justify-content: center;
      }
      .percent {
        font-weight: 700;
        color: #2d8cf0;
      }
      margin: 0 8px 12px 8px;
      // margin-bottom: px;
      // display: flex;
      // align-items: center;
      // justify-content: center;
      // > div {
      //   // flex: 1;
      //   display: flex;
      //   padding: 8px;
      // }
      // margin: 10px;
    }
    .estate-percent-card-right {
      flex: 1;
      > .right-title {
        color: #333;
        font-weight: 700;
        padding: 0 12px;
      }

      .right-number {
        // margin-top: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        > div {
          display: flex;
          flex-direction: column;
          > span:nth-of-type(1) {
            color: #3dd0a1;
            font-weight: 700;
            font-size: 16px;
          }
        }
      }
    }

    .estate-percent-info-text {
      text-align: center;
      min-width: 60px;
      width: 30%;
      margin-top: 10px;
    }
    .estate-percent-info-text:not(.estate-percent-info-text:nth-of-type(3n + 1)) {
      border-left: 1px solid #f1f1f9;
    }

    .estate-percent-number {
      color: #333;
      font-size: 20px;
      font-weight: 700;
    }
    .estate-percent-text {
      color: #999;
      font-size: 14px;
    }
  }
  .user-card-outer {
    height: calc(~'100% - 42px');
    display: flex;
    .user-left-chart {
      flex: 1;
      display: flex;
      flex-direction: column;
      > div {
        flex: 1;
      }
    }
    .user-card {
      flex: 1;
      .user-info {
        width: 100%;
        display: flex;
        margin: 6px 0;
        justify-content: space-around;
        .user-text {
          flex: 1;
        }
      }
    }
  }
  .finance-main-card,
  .approve-card,
  .user-card {
    display: flex;
    flex-wrap: wrap;
    .approve-info,
    .finance-info,
    .user-info {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50%;
      padding: 3px 6px;
    }
    .approve-info-text,
    .finance-info-text,
    .user-info-text {
      min-width: 70px;
    }
    .approve-number,
    .finance-number,
    .user-number {
      color: #333;
      font-size: 20px;
      font-weight: 700;
    }
    .approve-text,
    .finance-text,
    .user-text {
      color: #999;
      font-size: 14px;
    }
    .user-number {
      color: #2d8cf0;
      text-decoration: underline solid #2d8cf0;
    }
    .user-info {
      cursor: pointer;
      box-shadow: 0px 2px 6px 1px rgba(175, 175, 175, 0.2);
      &:hover {
        box-shadow: 0px 2px 8px 3px rgba(175, 175, 175, 0.3);
      }
    }
  }

  .finance-main-card1 {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    .finance-block-title {
      font-weight: 700;
      margin: 6px 0;
      font-size: 16px;
      display: flex;
      align-items: center;
      .title-icon {
        width: 24px;
        height: 24px;
        margin-right: 4px;
      }
    }
    > div:nth-of-type(1) {
      min-width: 160px;
      text-align: center;
    }
    .finance-block {
      flex: 1;
      .finance-block-info {
        display: flex;
        font-size: 16px;
      }
      > div {
        width: 46%;
        margin-bottom: 6px;

        p {
          display: flex;
          flex-direction: column;
          margin-right: 6px;
          margin-bottom: 6px;
          min-width: 90px;
        }
      }
      > div:nth-of-type(2n + 1) {
        margin-right: 20px;
      }
      .finance-text {
        color: #999;
      }
    }
    .finance-block {
      display: flex;
      flex-wrap: wrap;
      // justify-content: center;
      > div {
        width: 45%;
      }
    }
  }
  .finance-main-card {
    padding: 12px;
    align-items: center;
    height: ~'calc(100% - 50px)';
  }
  .approve-card {
    .approve-info {
      width: 25%;
      .approve-info-text {
        min-width: 100px;
      }
    }
    .approve-info-img {
      margin-right: 10px;
      width: 50px;
    }
  }
  .finance-info-img,
  .user-info-img {
    background: #e7f2ff;
    margin-right: 8px;
  }

  .user-info-img {
    height: 42px;
  }
  .estate-percent-info-img,
  .finance-info-img {
    height: 50px;
    margin-right: 8px;
  }

  .chart-user-title {
    display: flex;
    font-weight: 700;
    font-size: 16px;
    color: #333;
    padding-left: 20px;
    margin-top: 10px;
    position: relative;
    &::before {
      content: '';
      height: 16px;
      width: 3px;
      position: absolute;
      top: 4px;
      left: 8px;
      display: inline-block;
      background: #2d8cf0;
      margin-right: 8px;
      border-radius: 5px;
    }
    span:nth-of-type(1) {
      flex: 65;
    }
    span:nth-of-type(2) {
      flex: 30;
    }
  }
  .chart-user-apartment {
  }
  .chart-user-apartment-info {
    display: flex;
    align-items: center;
    padding-left: 30px;
    margin-top: 18px;
    // justify-content: center;
    // height: ~'calc(100% - 90px)';
    img {
      margin-right: 16px;
    }
    .apartment-number {
      font-weight: 700;
      font-size: 18px;
    }
  }

  .user-main-top {
    min-height: 120px;
  }
  .rent-main {
    min-height: 260px;
  }
}
@media (max-width: 1600px) {
  .content {
    .chart-user {
      position: relative;
      grid-column: 1 / span 12;
      grid-row: 26 / span 8;
    }
    .chart-maintain {
      grid-column: 13 / span 12;
      grid-row: 26 / span 8;
    }
    .chart-rent {
      grid-column: 1 / span 12;
      grid-row: 34 / span 8;
    }
    .chart-notice {
      grid-column: 13 / span 12;
      grid-row: 34 / span 8;
    }
    .estate-main-left {
      .main-icon {
        display: none;
      }
      p {
        .number {
          font-size: 15px;
        }
      }
    }
    .estate-percent-card {
      .estate-percent-card-left {
        min-width: 140px;
        > div {
          padding: 8px;
          img {
            width: 40px;
            height: 40px;
          }
        }
      }
      .estate-percent-number {
        font-size: 20px;
      }
    }
    .approve-card {
      .approve-info-img {
        width: 40px;
        height: 40px;
        margin-right: 4px;
      }
    }
  }
}
@media (max-width: 1280px) {
  .content {
    .approve-card {
      .approve-info-img {
        // display: none;
      }
    }
    .user-info-img {
      // display: none;
    }
  }
}
.content /deep/ .ivu-progress-inner {
  border-radius: 0;
}
.content /deep/ .ivu-progress-bg {
  border-radius: 0;
}
.content /deep/ .ivu-progress-inner {
  background-color: #c5c8ce;
}
</style>