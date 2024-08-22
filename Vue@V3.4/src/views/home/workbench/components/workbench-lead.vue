<template>
  <div class="content">
    <div class="chart-estate">
      <div class="chart-title">
        <span> <img class="title-icon" :src="requireImg('chart_icon1')" alt="">载体基本情况</span>
        <span class="link-more"> </span>
      </div>
      <div class="chart-estate-main">
        <div class="estate-main-left">
          <p v-for="(item,index) of estates" :key="item.title" @click="$router.push(index<3?'/carrier/asset':'/report/archive-apartment')">
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
    <div class="chart-user">
      <div class="chart-title">
        <span> <img class="title-icon" :src="requireImg('chart_icon2')" alt=""> 客户情况</span>
        <!-- <span class="link-more" @click="$router.push('/report/archive-renter')"> 更多</span> -->
      </div>
      <div class="user-card-outer">
        <div class="user-left-chart">
          <div>
            <div class="chart-user-title"> <span>非公寓租户</span></div>
            <div class="user-lead-main-top"></div>
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
    <div class="chart-estate-percent">
      <div class="chart-title">
        <span> <img class="title-icon" :src="requireImg('chart_icon5')" alt=""> 载体出租率</span>
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
              <Col span="10" style="padding-left: 12px;display: flex;justify-content: space-between">
              <span class="percent">{{estateRateInfo.examineRate}}%</span>
              </Col>
            </Row>
            <Row>
              <Col span="14">
              </Col>
              <Col span="10" style="padding-left: 12px;display: flex;justify-content: space-between">
              <span>载体综合考核目标</span>
              </Col>
            </Row>
          </div>
          <div style="margin-top: 10px" v-for="item in estateRateInfo.estateRateList" :key="item.estateAssetTypeName">
            <Row>
              <Col span="14" style="position: relative;">
              <span style="position: absolute;top: 2px;color: #fff;z-index: 1;" :style="{left: item.prent > 15 ? `calc(${item.prent}% - 55px)`: 0}">{{ item.rate }}%</span>
              <Progress hide-info :percent="item.prent" :stroke-width="18" />
              </Col>
              <Col span="10" style="padding-left: 12px;display: flex;justify-content: space-between">
              <span class="percent">{{item.examineRate}}%</span>
              </Col>
            </Row>
            <Row>
              <Col span="14">
              </Col>
              <Col span="10" style="padding-left: 12px;display: flex;justify-content: space-between">
              <span>{{item.estateAssetTypeName}}考核目标</span>
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
    <div class="chart-repair">
      <div class="chart-title">
        <span> <img class="title-icon" :src="requireImg('chart_icon5')" alt=""> 维修预算统计</span>
        <!-- <span class="link-more" @click="$router.push('/maintenance/item-management')"> 更多</span> -->
      </div>
      <div class="repair-main-card">
        <div style="display: flex;align-items: center;justify-content: center;">
          <i-circle :percent="maintenanceInfo.hasUseRate" :size="120" :trail-width="8" :stroke-width="8" stroke-color="#3DD0A1">
            <span style="font-size:16px; font-weight: 700"> {{maintenanceInfo.hasUseRate}} %<br /><span style="font-size:14px;font-weight: 400">已使用占比</span></span>
          </i-circle>
        </div>
        <div style="display: flex;justify-content: space-around;width: 100%">
          <div class="repair-info-text">
            <p class="repair-number"> {{maintenanceInfo.annualBudgetTotal}} </p>
            <p class="repair-text">当年预算总额(万元)</p>
          </div>
          <div class="repair-info-text">
            <p class="repair-number" style="color: #3DD0A1"> {{maintenanceInfo.hasUseTotal}} </p>
            <p class="repair-text">当年已使用(万元)</p>
          </div>
        </div>
      </div>
    </div>
    <div class="chart-finance">
      <div class="chart-title">
        <span> <img class="title-icon" :src="requireImg('chart_icon5')" alt=""> 载体财务参数</span>
        <!-- <span class="link-more" @click="$router.push('/carrier/asset')"> 更多</span> -->
      </div>
      <div class="finance-main-card">
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
                <span class="finance-text">IRR区间</span>
              </p>
              <p>
                <span>{{item.originalValue}}</span>
                <span class="finance-text">资产原值合计(万元)</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chart-rent">
      <div class="chart-title">
        <span> <img class="title-icon" :src="requireImg('chart_icon6')" alt=""> 租金收入统计</span>
        <!-- <span class="link-more" @click="$router.push('/bill/renter-bill')"> 更多</span> -->
      </div>
      <div class="rent-card">
        <div class="rent-info">
          <div>
            <div class="rent-info-text">
              <p class="rent-number"> {{rentInfo.anuIndexTotalAmount}} </p>
              <p class="rent-text">本年度租金考核指标(万元)</p>
            </div>
            <div class="rent-info-text">
              <p class="rent-number" style="color: #FFA319"> {{rentInfo.shouldTotalAmount}} </p>
              <p class="rent-text">本年度应收租金(万元)</p>
            </div>

            <div class="rent-info-text" style="margin-bottom: 20px">
              <p class="rent-number"> {{rentInfo.receiveTotalAmount}} </p>
              <p class="rent-text">本年度已收租金(万元)</p>
            </div>

            <div class="rent-info-text">
              <p class="rent-number"> {{rentInfo.shouldCurrentTotalAmount}} </p>
              <p class="rent-text">当前应收租金(万元)</p>
            </div>
            <div class="rent-info-text">
              <!-- {{rentInfo.receiveCurrentTotalAmount}} -->
              <p class="rent-number" style="color: #FFA319">{{rentInfo.receiveCurrentTotalAmount}} </p>
              <p class="rent-text">当前应收已收租金(万元)</p>
            </div>
          </div>
        </div>
        <i-circle :percent="rentInfo.percent" :size="100" :trail-width="8" :stroke-width="8" stroke-color="#FFA319">
          <span style="font-size:14px"> {{rentInfo.percent}} %<br />租金收缴率</span>
        </i-circle>
      </div>
    </div>
    <div class="chart-notice">
      <div class="chart-title">
        <span> <img class="title-icon" :src="requireImg('chart_icon6')" alt=""> 重要事项</span>
        <!-- <span class="link-more" @click="$router.push('/warning/note-warning')"> 更多</span> -->
      </div>
      <div @click="viewDetail($event)">
        <vue-seamless-scroll class="seamless-warp" :style="notices.length<5?{maxHeight: notices.length * 50 + 'px'}:{}" :data="notices" :class-option="defaultOption" v-if="notices.length !== 0">
          <div v-for="(item, index) of notices" :key="item.title + index" :data-item="JSON.stringify(item)" class="seamless-list">
            <div class="seamless-list-title" :data-item="JSON.stringify(item)">{{item.title}}</div>
            <div class="seamless-list-text" :data-item="JSON.stringify(item)">{{item.updateTime}}</div>
          </div>
        </vue-seamless-scroll>
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
      financeInfo: {
        assetTypeIRRList: []
      },
      financeIcon: [
        { name: '标准厂房', icon: 'cw_ico8' },
        { name: '仓储', icon: 'cw_ico2' },
        { name: '定建厂房', icon: 'cw_ico3' },
        { name: '学校', icon: 'cw_ico4' },
        { name: '公寓', icon: 'cw_ico5' },
        { name: '商业', icon: 'cw_ico6' },
        { name: '写字楼', icon: 'cw_ico7' }
      ],
      maintenanceInfo: {},
      rentInfo: {},
      renterInfo: {},
      tenantInvestment: {},
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
      chartContract: [
        {
          img: 'sp6',
          count: 0,
          title: '合同数'
        },
        {
          img: 'sp5',
          count: 0,
          title: '租赁面积'
        }
      ],
      options: [
        {
          title: {
            text: '89\n租户总数',
            left: '29%',
            top: '37%',
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
            top: '8%',
            left: '53%',
            center: 'center',
            itemWidth: 8,
            itemHeight: 8,
            itemGap: 10,
            textStyle: {
              padding: [15, 0, 0, 0],
              fontSize: 14
            },
            formatter: name => {
              const list = this.options[0].series[0].data
              return '\n' + name + '\n' + '\n' + list.find(f => f.name === name).value
            }
          },
          series: [
            {
              name: '租户',
              type: 'pie',
              radius: ['35%', '47%'],
              center: ['30%', '45%'],
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
                { value: 0, name: '企业租户' },
                { value: 0, name: '个人租户' }
              ]
            }
          ]
        }
      ]
    }
  },
  computed: {
    companyId() {
      return this.$store.state.home.index.companyId
    },
    defaultOption() {
      return {
        step: 0.1, // 数值越大速度滚动越快
        limitMoveNum: 0, // this.notices.length // 开始无缝滚动的数据量 this.dataList.length
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
    // console.log(this.companyId)
    await this.initFetch()
    this.createChart()
  },
  destroyed() {
    window.removeEventListener('resize', () => this.resizeChart)
  },
  methods: {
    fontSize(fontSize) {
      return this.echartsFontSize(fontSize) + 'px'
    },
    toRoute(path, query) {
      this.$router.push({ path, query: { otherWaysArr: this.$consts.home.userTag[query] } })
    },
    viewDetail($event) {
      const item = JSON.parse($event.target.dataset.item)
      this.$refs['note-modal'].open('查看', item)
    },
    async initFetch() {
      const params = { orgId: this.companyId }
      const estateInfo = await this.$store.dispatch('home/index/queryEstate', params)
      if (estateInfo) {
        Object.entries(estateInfo).map(([k, v]) => {
          const find = this.estates.find(f => f.key === k)
          find.count = v
        })
      }
      const renterInfo = await this.$store.dispatch('home/index/queryRenter', params)
      if (renterInfo) {
        Object.entries(renterInfo).map(([k, v]) => {
          const find = this.chartUser.find(f => f.key === k)
          if (find) {
            find.count = v
          }
        })
        this.options[0].series[0].data = [
          { value: renterInfo.enterCount, name: '企业租户' },
          { value: renterInfo.personCount, name: '个人租户' }
        ]
        this.options[0].title.text = `${renterInfo.personCount + renterInfo.enterCount}\n租户总数`
        this.renterInfo = renterInfo
      }

      const resNotes = (await this.$store.dispatch('home/index/queryNotes', params)) || []
      this.notices = resNotes.records

      const rentList = await this.$store.dispatch('home/index/queryCollectAndPayRent', params)
      if (rentList) {
        const receiveTotalAmount = rentList.reduce((p, n) => p + n.receiveTotalAmount, 0) // 本年度已收租金
        const shouldTotalAmount = rentList.reduce((p, n) => p + n.shouldTotalAmount, 0) // 本年度应收租金
        const shouldCurrentTotalAmount = rentList.reduce((p, n) => p + n.shouldCurrentTotalAmount, 0) // 当前应收总额
        const anuIndexTotalAmount = rentList.reduce((p, n) => p + n.anuIndexTotalAmount, 0) // 本年度租金收入指标
        const receiveCurrentTotalAmount = rentList.reduce((p, n) => p + n.receiveCurrentTotalAmount, 0) // 当前应收已收金额
        this.rentInfo = {
          receiveTotalAmount,
          shouldTotalAmount,
          shouldCurrentTotalAmount,
          anuIndexTotalAmount,
          receiveCurrentTotalAmount,
          percent:
            receiveCurrentTotalAmount === 0
              ? 0
              : Number(((receiveCurrentTotalAmount / shouldCurrentTotalAmount) * 100).toFixed(2))
        }
      }
      const estateRateInfo = await this.$store.dispatch('home/index/queryEstateRate', params)
      if (estateRateInfo) {
        const prent = Math.floor((estateRateInfo.estateRate / estateRateInfo.examineRate) * 10000) / 100
        estateRateInfo.prent = prent >= 100 ? 100 : prent

        estateRateInfo.estateRateList = estateRateInfo.estateRateList.map(m => {
          const prent = m.rate === 0 ? 0 : Math.floor((m.rate / m.examineRate) * 10000) / 100
          m.prent = prent >= 100 ? 100 : prent
          return m
        })
        this.estateRateInfo = estateRateInfo
        this.estateRateInfo.estateRateList = estateRateInfo.estateRateList.slice(0, 3)
      }
      const financeInfo = await this.$store.dispatch('home/index/queryFinance', params)
      if (financeInfo) {
        this.financeInfo = financeInfo
      }
      const maintenanceInfo = await this.$store.dispatch('home/index/queryMaintenance', params)
      if (maintenanceInfo) {
        maintenanceInfo.annualBudgetTotal = maintenanceInfo.annualBudgetTotal.toFixed(2)
        maintenanceInfo.hasUseTotal = maintenanceInfo.hasUseTotal.toFixed(2)
        this.maintenanceInfo = maintenanceInfo
      }

      const tenantInvestment = await this.$store.dispatch(
        'archive/archive-renter/queryTaxStatisticsOnTenantInvestment',
        {
          pageIndex: 1,
          pageSize: 100,
          validBegin: moment().format('YYYY-MM-DD'),
          orgId: this.companyId
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
      const doms = ['.user-lead-main-top'] // , '.contract-lead-main-top', '.rent-lead-main'
      const domElement = doms.map(f => document.querySelector(f))
      domElement.forEach((f, index) => {
        const chart = echarts.init(f, 'light')
        chart.setOption(this.options[index])
        window.addEventListener('resize', () => this.resizeChart(chart))
      })
    },
    resizeChart(chart) {
      chart.resize() // 调用 resize() 方法
    },

    //字体自适应
    echartsFontSize(n) {
      let devicePixelRatio = window.devicePixelRatio //缩放
      let clientWidth = document.body.clientWidth //浏览器宽度
      let screenWidth = window.screen.width //屏幕宽度
      const result = ((screenWidth / 1920) * n) / (devicePixelRatio / 2)
      return result
    }
  }
}
</script>

<style lang='less' scoped>
.content {
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  grid-auto-rows: minmax(80px, auto);
  font-family: 'Source Han Sans CN;';
  // grid-auto-rows: 50px;
  gap: 16px;
  background: #f0f2f5;
  padding: 4px;
  > div {
    background: #fff;
  }
  .link-more {
    cursor: pointer;
  }
  .chart-estate {
    grid-column: 1 / span 24;
    grid-row: 1 / span 1;
    box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.08);
  }
  .chart-user {
    position: relative;
    grid-column: 1 / span 7;
    grid-row: 2 / span 5;
    box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.08);
  }
  .chart-estate-percent {
    grid-column: 8 / span 7;
    grid-row: 2 / span 2;
    box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.08);
  }
  // 维修预算
  .chart-repair {
    grid-column: 20 / span 5;
    grid-row: 2 / span 2;
    box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.08);
  }
  // 财务统计
  .chart-finance {
    grid-column: 8 / span 12;
    grid-row: 4 / span 3;
    box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.08);
  }
  .chart-contract {
    grid-column: 4 / span 4;
    grid-row: 3 / span 5;
    box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.08);
  }
  // 租金收入
  .chart-rent {
    grid-column: 15 / span 5;
    grid-row: 2 / span 2;
    box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.08);
  }
  .chart-notice {
    grid-column: 20 / span 5;
    grid-row: 4 / span 3;
    box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.08);
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
      font-weight: 500;
      margin-top: -10px;
    }
  }
  .title-icon {
    width: 26px;
    vertical-align: middle;
    margin-right: 12px;
  }
  .seamless-warp {
    overflow: hidden;
    position: relative;
    margin: 0 auto;
    max-height: 360px;
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
  .chart-estate-main {
    display: flex;
    padding: 24px 8px;
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
      padding: 12px 8px;
      margin: 6px;
      border-radius: 6px;
      height: 100px;
      color: #fff;
      flex: 1;
      display: flex;
      align-items: center;
      cursor: pointer;
      .number {
        // font-size: v-bind(fontSize(16));
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 6px;
        display: block;
        text-decoration: underline solid #fff;
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
    width: 200px;
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
      // align-items: center;
      // justify-content: space-around;
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
      // border-right: 1px solid #f1f1f9;
      margin: 0 8px 6px 8px;
      // margin-bottom: px;
    }
    .estate-percent-card-right {
      flex: 1;
      > .right-title {
        color: #333;
        font-weight: 700;
        padding: 12px;
        display: flex;
        align-items: center;
      }

      .right-number {
        margin-top: 10px;
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
      // text-align: center;
      // min-width: 80px;
    }
    .estate-percent-info-text + .estate-percent-info-text {
      border-left: 1px solid #f1f1f9;
    }
    .estate-percent-number {
      color: #333;
      // font-size: v-bind(fontSize(24));
      font-size: 24px;
      font-weight: 700;
    }
    .estate-percent-text {
      color: #999;
      // font-size: v-bind(fontSize(14));
      font-size: 14px;
    }
  }
  .repair-main-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(~'100% - 42px');
    > div {
      // margin-right: 20px;
    }
    .repair-info-text {
      min-width: 80px;
      margin: 12px 0;
    }
    .repair-number {
      color: #333;
      // font-size: v-bind(fontSize(22));
      font-size: 22px;
      font-weight: 700;
    }
    .repair-text {
      color: #999;
      // font-size: v-bind(fontSize(14));
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
        margin: 24px 6px 24px 0;
        padding: 12px 16px;
        display: flex;
        justify-content: space-around;
        .user-text {
          flex: 1;
        }
      }
    }
  }
  .user-card,
  .finance-main-card,
  .contract-card {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .user-info,
    .finance-info,
    .contract-info {
      width: 44%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 28px 0;
      padding-left: 20px;
      box-shadow: 0px 2px 6px 1px rgba(175, 175, 175, 0.2);
    }
    .finance-info-text,
    .contract-info-text {
      min-width: 80px;
    }
    .user-number,
    .finance-number,
    .contract-number {
      color: #333;
      // font-size: v-bind(fontSize(24));
      font-size: 24px;
      font-weight: 700;
    }
    .user-text,
    .finance-text,
    .contract-text {
      color: #999;
      // font-size: v-bind(fontSize(14));
      font-size: 14px;
    }
    .user-number {
      color: #2d8cf0;
      text-decoration: underline solid #2d8cf0;
    }
    .user-info {
      cursor: pointer;
      &:hover {
        box-shadow: 0px 2px 8px 3px rgba(175, 175, 175, 0.3);
      }
    }
  }
  .finance-main-card {
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
      // &::before {
      //   content: '';
      //   height: 16px;
      //   width: 3px;
      //   position: relative;
      //   top: 3px;
      //   display: inline-block;
      //   background: #2d8cf0;
      //   margin-right: 8px;
      //   border-radius: 5px;
      // }
    }
    > div:nth-of-type(1) {
      min-width: 180px;
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
        margin-left: 16px;
        p {
          display: flex;
          flex-direction: column;
          margin-right: 6px;
          margin-bottom: 6px;
          min-width: 90px;
        }
      }
      .finance-text {
        color: #999;
      }
    }
    // flex-direction: column;
    // align-items: center;
  }
  .rent-card {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 8px 12px;
    // height: ~'calc(100% - 90px)';
  }
  .rent-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    // padding: 12px 20px;
    .rent-info-text {
      min-width: 165px;
    }
    .rent-number {
      color: #333;
      // font-size: v-bind(fontSize(24));
      font-size: 20px;
      font-weight: 700;
    }
    .rent-text {
      color: #999;
      // font-size: v-bind(fontSize(14));
      font-size: 14px;
    }
  }
  .finance-block {
    display: flex;
    flex-wrap: wrap;
    > div {
      width: 30%;
    }
  }

  .user-info-img,
  .estate-percent-info-img,
  .contract-info-img,
  .rent-info-img {
    background: #e7f2ff;
    // padding: 6px;
    margin-right: 10px;
  }
  .approve-info-img {
    margin-right: 10px;
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
  .user-lead-main-top {
    min-height: 240px;
    position: relative;
    // &::after {
    //   content: '';
    //   position: absolute;
    //   background: #d9d9d9;
    //   right: 38%;
    //   height: 90%;
    //   width: 1px;
    //   top: 8px;
    // }
  }
  .chart-user-apartment {
    // position: absolute;
    // right: 6%;
    // top: 115px;
    position: relative;
  }
  .chart-user-apartment-info {
    display: flex;
    align-items: center;
    padding-left: 30px;
    // justify-content: center;
    height: ~'calc(100% - 90px)';
    img {
      margin-right: 16px;
    }
    .apartment-number {
      font-weight: 700;
      font-size: 18px;
    }
  }
  .rent-lead-main {
    min-height: 360px;
    width: 95%;
  }
}
@media (max-width: 1600px) {
  .content {
    .chart-estate {
      grid-column: 1 / span 24;
      grid-row: 1 / span 1;
      box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.08);
    }
    .chart-user {
      position: relative;
      grid-column: 1 / span 10;
      grid-row: 2 / span 5;
      box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.08);
    }
    .chart-estate-percent {
      grid-column: 11 / span 14;
      grid-row: 2 / span 2;
      box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.08);
    }
    .chart-repair {
      grid-column: 11 / span 7;
      grid-row: 4 / span 3;
      box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.08);
    }
    .chart-finance {
      grid-column: 1 / span 17;
      grid-row: 7 / span 2;
      box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.08);
    }
    .chart-contract {
      grid-column: 4 / span 4;
      grid-row: 3 / span 5;
      box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.08);
    }
    .chart-rent {
      grid-column: 18 / span 7;
      grid-row: 4 / span 3;
      box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.08);
    }
    .chart-notice {
      grid-column: 18 / span 7;
      grid-row: 7 / span 2;
      box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.08);
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
          padding: 4px;
          img {
            width: 40px;
            height: 40px;
          }
        }
      }
      .estate-percent-number {
        font-size: 18px;
      }
    }
    .chart-finance {
      .estate-percent-info-img {
        // width: 40px;
        // height: 40px;
        // display: none;
      }
    }
  }
}
.content /deep/ .ivu-progress-inner {
  border-radius: 5px;
  background-color: #c5c8ce;
}
.content /deep/ .ivu-progress-bg {
  border-radius: 5px;
}
.content /deep/ .ivu-progress-inner-text {
  font-size: 14px;
}
</style>