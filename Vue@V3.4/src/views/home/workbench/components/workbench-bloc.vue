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
            <span>
              <img class="main-icon" :src="requireImg(item.img)" alt="">
              <span>
                <span class="text">
                  {{item.title}}
                </span>
                <span class="number">
                  {{ Number(item.count).toLocaleString() }} {{item.title === '载体数量' ? '个' : 'm²' }}
                </span>
              </span>
            </span>
            <span class="estate-other">
              <span> 其中： <span style="margin-left: 11px;">集团本部</span> <span style="margin-left: 15px;">{{ Number(item.count).toLocaleString() }} {{item.title === '载体数量' ? '个' : 'm²' }}</span></span>
              <span style="margin-left: 60px;">中新苏通 <span style="margin-left: 10px;">0</span>{{item.title === '载体数量' ? '个' : 'm²' }} </span>
              <span style="margin-left: 60px;">中新嘉善 <span style="margin-left: 10px;">0</span>{{item.title === '载体数量' ? '个' : 'm²' }} </span>
            </span>
          </p>
        </div>
        <!-- <div class="estate-main-right">
          <div class="estate-right-area"></div>
          <div class="estate-bloc">
            <div v-for="item in estateBloc" :key="item.name">
              <span> {{ item.count }}</span>
              <span> {{ item.name }}</span>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <div class="chart-estate-percent">
      <Spin fix v-if="loading" />
      <div class="chart-title">
        <span>
          <img class="title-icon" :src="requireImg('chart_icon5')" alt="">
          <span class="title-name" :class="{'title-name-active': !currentAssetType }" @click="getEstateRate('')">载体出租率</span>
          <span> | </span>
          <span class="title-name" :class="{'title-name-active': currentAssetType === $consts.renter.groupKey.industry}" @click="getEstateRate($consts.renter.groupKey.industry)">工业载体出租率</span>
        </span>
      </div>
      <div class="estate-percent-card">
        <div class="estate-percent-card-left">
          <div style="margin-top: 10px">
            <Row>
              <Col span="15" style="display: flex;justify-content: space-between;align-items: center;">
              <span style="font-size: 15px; font-weight: bold;">集团全部{{currentAssetType ? '(工业)' : ''}}当前出租率</span><span style="font-size: 18px"> {{ estateRateInfo.estateRate }}%</span>
              </Col>
              <Col span="7" offset="2">
              <span class="percent" style="font-size: 20px">{{estateRateInfo.examineRate}}%</span>
              </Col>
            </Row>
            <Row>
              <Col span="15">
              <Progress hide-info :percent="estateRateInfo.prent" :stroke-width="16" />
              </Col>
              <Col span="7" offset="2">
              <span>综合考核目标</span>
              </Col>
            </Row>
          </div>
          <div style="font-size: 16px;font-weight: bold;">其中：</div>
          <div style="margin-top: 4px">
            <Row>
              <Col span="15" style="display: flex;justify-content: space-between;align-items: center;">
              <span style="font-size: 15px; font-weight: bold;">集团本部{{currentAssetType ? '(工业)' : ''}}当前出租率</span><span style="font-size: 18px"> {{ estateRateInfo.estateRate }}%</span>
              </Col>
              <Col span="7" offset="2">
              <span class="percent" style="font-size: 20px">{{estateRateInfo.examineRate}}%</span>
              </Col>
            </Row>
            <Row>
              <Col span="15">
              <Progress hide-info :percent="estateRateInfo.prent" :stroke-width="16" />
              </Col>
              <Col span="7" offset="2">
              <span>综合考核目标</span>
              </Col>
            </Row>
          </div>
          <div style="margin-top: 10px" v-for="item in estateRateList" :key="item.title">
            <Row>
              <Col span="15" style="display: flex;justify-content: space-between;align-items: center;">
              <span style="font-size: 15px;font-weight: bold;">{{ currentAssetType ? item.title.replace('当前','(工业)当前') : item.title}}</span><span style="font-size: 18px"> {{ item.prent }}%</span>
              </Col>
              <Col span="7" offset="2">
              <span class="percent" style="font-size: 20px">{{item.examineRate}}%</span>
              </Col>
            </Row>
            <Row>
              <Col span="15">
              <Progress hide-info :percent="item.prent" :stroke-width="16" />
              </Col>
              <Col span="7" offset="2">
              <span>综合考核目标</span>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
    <div class="chart-user">
      <div class="chart-title">
        <span> <img class="title-icon" :src="requireImg('chart_icon2')" alt=""> 客户情况</span>
      </div>
      <div class="user-card-outer">
        <div class="user-left-chart">
          <div>
            <div class="chart-user-title">
              <span>非公寓租户</span>
            </div>
            <div>
              <div class="user-top">
                <div class="user-renter-outer">
                  <div class="user-info card-info" v-for="item of charRenter" :key="item.img+item.title" @click="toRoute('/report/archive-renter', item.tag)">
                    <img class="user-info-img card-info-img" v-if="item.img" :src="requireImg(item.img)" alt="">
                    <div>
                      <p class="user-text card-info-text">{{item.title}}</p>
                      <div class="user-info-text">
                        <p class="user-number ">
                          <span class="card-info-number"> {{ item.count }} </span>
                          <span class="user-text">家</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="user-info-outer">
                  <div class="user-info card-info" v-for="item of chartUser" :key="item.img+item.title" @click="toRoute('/report/archive-renter', item.tag)">
                    <img class="user-info-img card-info-img" :src="requireImg(item.img)" alt="">
                    <div>
                      <p class="user-text card-info-text">{{item.title}}</p>
                      <div class="user-info-text">
                        <p class="user-number ">
                          <span class="card-info-number">{{ item.count }}</span>
                          <span class="user-text">家</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="user-bottom">
                <div class="user-bloc" v-for="item in blocCompony.slice(0,1)" :key="item.title">
                  <div class="user-bloc-title">{{item.title}} <span style="margin-left: 20px;color: #4B8DFF;"> {{ item.count }}</span></div>
                  <div class="user-bloc-info">
                    <div class="user-bloc-card card-info" v-for="renter in item.renter" :key="renter.title">
                      <img v-if="renter.img" class="card-info-img" :src="requireImg(renter.img)" alt="">
                      <div>
                        <div>
                          <p class="card-info-text">{{renter.title}}</p>
                          <p>
                            <span class="card-info-number">{{renter.count}}</span>
                            <span>家</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style="flex: 2;display: flex">
                  <div class="user-bloc" v-for="item in blocCompony.slice(1,3)" :key="item.title">
                    <div class="user-bloc-title">{{item.title}} <span style="margin-left: 20px;color: #4B8DFF;"> {{ item.count }}</span></div>
                    <div class="user-bloc-info">
                      <div class="user-bloc-card card-info" v-for="renter in item.renter" :key="renter.title">
                        <img v-if="renter.img" class="card-info-img" :src="requireImg(renter.img)" alt="">
                        <div>
                          <div>
                            <p class="card-info-text">{{renter.title}}</p>
                            <p>
                              <span class="card-info-number">{{renter.count}}</span>
                              <span>家</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="chart-user-apartment">
          <div class="chart-user-title">
            <span>公寓租户</span>
          </div>
          <div class="chart-user-apartment-info">
            <div class="apartment-top card-info">
              <img width="55" :src="requireImg('zh_ico1')" alt="">
              <div>
                <p class="card-info-text">公寓租户</p>
                <p>
                  <span class="card-info-number">
                    {{renterInfo.renterCountByApartment}}
                  </span>
                  <span>家</span>
                </p>
              </div>
            </div>
            <div class="apartment-bottom">
              <div class="apartment-bloc" v-for="item in apartmentBloc" :key="item.title">
                <span class="apartment-bloc-number"> {{ item.count }}</span>
                <span> {{ item.title }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="chart-repair">
      <div class="chart-title">
        <span> <img class="title-icon" :src="requireImg('chart_icon5')" alt=""> 维修预算统计(万元)</span>
      </div>
      <div class="repair-card-outer">
        <div class="repair-main-card">
          <div class="repair-info-text">
            <p class="repair-number"> {{maintenanceInfo.annualBudgetTotal}} </p>
            <p class="repair-text">当年预算总额</p>
          </div>
          <div style="display: flex;align-items: center;justify-content: center;">
            <i-circle :percent="maintenanceInfo.hasUseRate" :size="circleSize" :trail-width="10" :stroke-width="10" stroke-color="#399BFE">
              <span style="font-size:16px; font-weight: 700"> {{maintenanceInfo.hasUseRate}} %<br /><span style="font-size:14px;font-weight: 400">已使用</span></span>
            </i-circle>
          </div>
          <div class="repair-info-text">
            <p class="repair-number" style="color: #FFA319"> {{maintenanceInfo.hasUseTotal}} </p>
            <p class="repair-text">当年已使用</p>
          </div>
        </div>
        <div class="chart-repair-right">
          <div class="bloc-repair" v-for="item in blocRepair" :key="item.title">
            <p class="bloc-repair-title">{{ item.title }}</p>
            <p>
              <span>{{ item.year.count }}</span>
              <span>{{ item.year.title }}</span>
            </p>
            <p>
              <span>{{ item.use.count }}</span>
              <span>{{ item.use.title }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="chart-rent">
      <Spin fix v-if="loading" />
      <div class="chart-title">
        <span> <img class="title-icon" :src="requireImg('chart_icon6')" alt=""> 租金收入统计 (万元)</span>
      </div>
      <div class="rent-card">
        <div class="rent-card-left">
          <div class="rent-card-left-info">
            <div class="rent-info-text">
              <p class="rent-number"> {{rentInfo.anuIndexTotalAmount}} </p>
              <p class="rent-text">当年租金考核指标</p>
            </div>
            <div style="display: flex;align-items: center;justify-content: center;">
              <i-circle :percent="rentInfo.percent" :size="circleSize" :trail-width="10" :stroke-width="10" stroke-color="#F1D33C">
                <span style="font-size:16px; font-weight: 700"> {{rentInfo.percent}} %<br /><span style="font-size:14px;font-weight: 400">收缴率</span></span>
              </i-circle>
            </div>
            <div class="rent-info-text">
              <p class="rent-number" style="color: #FFA319"> {{rentInfo.receiveTotalAmount}} </p>
              <p class="rent-text">当年已收租金</p>
            </div>
          </div>
          <div class="rent-main">
          </div>
        </div>
        <div class="rent-card-right">
          <div style="display: flex;">
            <div class="rent-tab-btn" @click="onChoose(item)" :class="{'rent-tab-btn-active': item.name === active}" v-for="item in rentBloc" :key="item.name">{{ item.name }}</div>
          </div>
          <div class="rent-info">
            <div class="rent-info-top">
              <div class="rent-info-text">
                <p class="rent-number"> {{rentInfo.anuIndexTotalAmount}} </p>
                <p class="rent-text">当年度租金考核指标</p>
              </div>
              <div class="rent-" style="flex: 1;margin-left: 20px;">
                <div style="display: flex;justify-content: space-between;">
                  <span style="font-size: 15px;">租金收缴率</span>
                  <span class="rent-number" style="font-size: 18px;">{{ rentInfo.percent }} %</span>
                </div>
                <Progress hide-info :percent="rentInfo.percent" :stroke-width="10" />
              </div>
            </div>
            <div class="rent-info-bottom">
              <div class="rent-info-text">
                <p class="rent-number"> {{rentInfo.shouldTotalAmount}} </p>
                <p class="rent-text">当年度应收租金</p>
              </div>
              <div class="rent-info-text">
                <p class="rent-number"> {{rentInfo.shouldCurrentTotalAmount}} </p>
                <p class="rent-text">当前应收租金</p>
              </div>
              <div class="rent-info-text" style="margin-bottom: 20px">
                <p class="rent-number" style="color: #FFA319"> {{rentInfo.receiveTotalAmount}} </p>
                <p class="rent-text">当年度已收租金</p>
              </div>

              <div class="rent-info-text">
                <!-- {{rentInfo.receiveCurrentTotalAmount}} -->
                <p class="rent-number" style="color: #FFA319">{{rentInfo.receiveCurrentTotalAmount}} </p>
                <p class="rent-text">当前已收租金</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import * as echarts from 'echarts'
import vueSeamlessScroll from 'vue-seamless-scroll'
import moment from 'moment'
import NoteDetailModal from '@/view/warning/note-warning/components/note-detail-modal.vue'
const origin = {
  estates: [
    {
      key: 'allBuildingArea',
      img: '509',
      count: 0,
      title: '总建筑面积'
    },
    {
      key: 'canRentArea',
      img: '512',
      count: 0,
      title: '可租总面积'
    },
    {
      key: 'allLandArea',
      img: '510',
      count: 0,
      title: '总土地面积'
    },
    {
      key: 'noRentArea',
      img: '514',
      count: 0,
      title: '未租总面积'
    },
    {
      key: 'estateCounts',
      img: '511',
      count: 0,
      title: '载体数量'
    },
    {
      key: 'hasRentArea',
      img: '513',
      count: 0,
      title: '已租总面积'
    }
  ],
  estateBloc: [
    { name: '集团本部载体', count: 0, isBloc: true },
    { name: '中新苏通载体', count: 0 },
    { name: '中新嘉善载体', count: 0 }
  ],
  rentBloc: [
    { name: '集团本部', count: 0, isBloc: true },
    { name: '中新苏通', count: 0 },
    { name: '中新嘉善', count: 0 }
  ],
  estateRateList: [
    {
      title: '中新苏通当前出租率',
      prent: 0,
      examineRate: 0
    },
    {
      title: '中新嘉善当前出租率',
      prent: 0,
      examineRate: 0
    }
  ],
  estateRateInfo: {
    prent: 0,
    examineRate: 0,
    estateRateList: []
  },
  maintenanceInfo: {
    annualBudgetTotal: 0,
    hasUseRate: 0,
    hasUseTotal: 0
  },
  rentInfo: {
    anuIndexTotalAmount: 0,
    percent: 0,
    shouldTotalAmount: 0,
    shouldCurrentTotalAmount: 0,
    receiveTotalAmount: 0,
    receiveCurrentTotalAmount: 0
  },
  renterInfo: { renterCountByApartment: 0 },
  charRenter: [
    {
      title: '租户总数',
      key: 'all',
      count: 0,
      img: 'fzh_ico1'
    },
    {
      title: '企业租户',
      key: 'enterCount',
      count: 0
    },
    {
      title: '个人租户',
      key: 'personCount',
      count: 0
    }
  ],
  chartUser: [
    { key: 'ladingEnterprise', img: 'kh2@2x', count: 0, title: '领军企业', tag: '领军企业' },
    {
      key: 'highAndNewEnterprise',
      img: 'kh3@2x',
      count: 0,
      title: '高新技术',
      tag: '高新技术'
    },
    { key: 'unicornEnterprise', img: 'kh4@2x', count: 0, title: '独角兽', tag: '独角兽' },
    {
      key: 'top500',
      img: 'kh1@2x',
      count: 0,
      title: '500强企业',
      tag: '500强企业'
    }
  ],
  blocCompony: [
    {
      title: '集团本部租户总数',
      count: 0,
      isBloc: true,
      renter: [
        { title: '企业租户', count: 0, key: 'enterCount', img: 'qy_ico1' },
        { title: '个人租户', count: 0, key: 'personCount', img: 'zf_ico1' },
        { title: '500强企业', count: 0, key: 'top500' }, // 世界500强企业数量
        { title: '高新技术', count: 0, key: 'highAndNewEnterprise' }, // 高新技术企业数量
        { title: '领军企业', count: 0, key: 'ladingEnterprise' }, // 领军企业数量
        { title: '独角兽', count: 0, key: 'unicornEnterprise' }
      ]
    },
    {
      title: '中新苏通租户总数',
      count: 0,
      renter: [
        { title: '企业租户', count: 0, img: 'qy_ico1' },
        { title: '个人租户', count: 0, img: 'zf_ico1' },
        { title: '500强企业', count: 0 }, // 世界500强企业数量
        { title: '高新技术', count: 0 }, // 高新技术企业数量
        { title: '领军企业', count: 0 }, // 领军企业数量
        { title: '独角兽', count: 0 }
      ]
    },
    {
      title: '中新嘉善租户总数',
      count: 0,
      renter: [
        { title: '企业租户', count: 0, img: 'qy_ico1' },
        { title: '个人租户', count: 0, img: 'zf_ico1' },
        { title: '500强企业', count: 0 }, // 世界500强企业数量
        { title: '高新技术', count: 0 }, // 高新技术企业数量
        { title: '领军企业', count: 0 }, // 领军企业数量
        { title: '独角兽', count: 0 }
      ]
    }
  ],
  apartmentBloc: [
    {
      isBloc: true,
      title: '集团本部',
      count: 0
    },
    { title: '中新苏通', count: 0 },
    { title: '中新嘉善', count: 0 }
  ],
  blocRepair: [
    {
      isBloc: true,
      title: '集团本部',
      year: { title: '当年预算', count: 0 },
      use: { title: '已使用预算', count: 0 }
    },
    { title: '中新苏通', year: { title: '当年预算', count: 0 }, use: { title: '已使用预算', count: 0 } },
    { title: '中新嘉善', year: { title: '当年预算', count: 0 }, use: { title: '已使用预算', count: 0 } }
  ]
}
export default {
  components: { vueSeamlessScroll, NoteDetailModal },
  data() {
    return {
      devicePixelRatio: Math.floor(window.devicePixelRatio * 100) / 100,
      // notices: [{ title: '...', time: moment().format('YYYY-MM-DD') }],
      estates: structuredClone(origin.estates),
      estateBloc: structuredClone(origin.estateBloc),
      rentBloc: structuredClone(origin.rentBloc),
      estateRateList: structuredClone(origin.estateRateList),
      estateRateInfo: structuredClone(origin.estateRateInfo),
      maintenanceInfo: structuredClone(origin.maintenanceInfo),
      rentInfo: structuredClone(origin.rentInfo),
      renterInfo: structuredClone(origin.renterInfo),
      charRenter: structuredClone(origin.charRenter),
      chartUser: structuredClone(origin.chartUser),
      blocCompony: structuredClone(origin.blocCompony),
      apartmentBloc: structuredClone(origin.apartmentBloc),
      blocRepair: structuredClone(origin.blocRepair),
      loading: false,
      active: '集团本部',
      currentAssetType: '',
      // financeInfo: {
      //   assetTypeIRRList: []
      // },
      // tenantInvestment: {},
      options: [
        // {
        //   tooltip: {
        //     trigger: 'axis',
        //     backgroundColor: 'rgba(255,255,255,.9)',
        //     textStyle: { color: '#333' },
        //     extraCssText: 'box-shadow: 0px 2px 4px 1px rgba(0,0,0,0.16);',
        //     padding: [12, 8],
        //     formatter: params => {
        //       let find1 = { count: 0 },
        //         find2 = { count: 0 },
        //         find3 = { count: 0 }
        //       const [val, val1] = params
        //       let str = '',
        //         str1 = ''
        //       if (val) {
        //         str = `${val.marker}  已租面积：${val.value} m²`
        //       }
        //       if (val1) {
        //         str1 = `${val1.marker} 未租面积：${val1.value} m²`
        //       }
        //       if (params[0].dataIndex === 0) {
        //         find1 = this.estates.find(f => f.key === 'allBuildingArea')
        //         find2 = this.estates.find(f => f.key === 'canRentArea')
        //         find3 = this.estates.find(f => f.key === 'allLandArea')
        //       }

        //       return `&nbsp;总建筑面积：${find1.count} m²<br/>
        //       &nbsp;总土地面积：${find2.count} m²<br/>
        //       &nbsp;可租面积：${find3.count} m² <br/><br/>
        //         ${str} <br/>
        //         ${str1}
        //       `
        //     }
        //   },
        //   xAxis: {
        //     type: 'category',
        //     axisTick: {
        //       show: false //y轴刻度线
        //     },
        //     axisLabel: { interval: 0, color: '#707070' },
        //     data: ['集团本部', '中新苏通', '中新嘉善']
        //   },
        //   legend: {
        //     top: '0%',
        //     right: '3%',
        //     center: 'center',
        //     itemWidth: 10,
        //     itemHeight: 10,
        //     itemGap: 30,
        //     icon: 'circle',
        //     textStyle: {
        //       fontSize: 14
        //     }
        //   },
        //   yAxis: {
        //     name: 'm²',
        //     type: 'value',
        //     axisTick: {
        //       show: false //y轴刻度线
        //     },
        //     axisLine: {
        //       show: false
        //     },
        //     axisLabel: { color: '#707070' },
        //     splitLine: {
        //       lineStyle: {
        //         type: 'dashed'
        //       }
        //     }
        //   },
        //   grid: { left: 70, bottom: 30, top: 40, right: 15 },
        //   series: [
        //     {
        //       data: [0, 0, 0, 0, 0, 0, 0],
        //       type: 'bar',
        //       stack: 'a',
        //       name: '已租',
        //       barWidth: '30%'
        //     },
        //     {
        //       data: [0, 0, 0, '-', 0, '-', 0],
        //       type: 'bar',
        //       stack: 'a',
        //       name: '未租',
        //       barWidth: '30%'
        //     }
        //   ]
        // },
        {
          tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(255,255,255,.9)',
            textStyle: { color: '#333' },
            extraCssText: 'box-shadow: 0px 2px 4px 1px rgba(0,0,0,0.16);',
            padding: [12, 8]
            // formatter: params => {
            //   const [val, val1] = params
            //   let str = '',
            //     str1 = '',
            //     total = 0
            //   if (val) {
            //     total = this.rentList.find(f => f.year === val.axisValue).shouldTotalAmount
            //     str = `${val.marker} ${val.seriesName}：${val.value} 万元<br/>`
            //   }
            //   if (val1) {
            //     str1 = `${val1.marker} ${val1.seriesName}：${val1.value} 万元`
            //   }

            //   return `应收租金：${total} 万元<br/>${str}${str1}`
            // }
          },
          xAxis: {
            type: 'category',
            axisLabel: { interval: 0, color: '#707070' },
            data: ['当年', '当前']
          },
          legend: {
            top: '0%',
            right: '0%',
            center: 'center',
            itemWidth: 8,
            itemHeight: 8,
            itemGap: 30,
            // icon: 'circle',
            textStyle: {
              fontSize: 14
            }
          },
          yAxis: {
            name: '万元',
            type: 'value',
            axisTick: {
              show: false //y轴刻度线
            },
            axisLine: {
              show: false
            },
            axisLabel: { color: '#707070' },
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
          },
          grid: { left: 75, bottom: 30, top: 40, right: 10 },
          series: [
            {
              data: [1, 0, 0, 0, 0, 0, 0],
              type: 'bar',
              // stack: 'a',
              name: '应收',
              barWidth: '25%'
            },
            {
              data: [2, 0, 0, '-', 0, '-', 0],
              type: 'bar',
              // stack: 'a',
              name: '已收',
              barWidth: '25%'
            }
          ]
        }
      ]
    }
  },
  computed: {
    circleSize() {
      if (this.devicePixelRatio <= 1.25) return 100
      if (this.devicePixelRatio > 1.25) return 90
      return 100
    }
    // defaultOption() {
    //   return {
    //     step: 0.1, // 数值越大速度滚动越快
    //     limitMoveNum: 0, // this.notices.length // 开始无缝滚动的数据量 this.dataList.length
    //     hoverStop: true, // 是否开启鼠标悬停stop
    //     direction: 1, // 0向下 1向上 2向左 3向右
    //     openWatch: true, // 开启数据实时监控刷新dom
    //     singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
    //     singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
    //     waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
    //   }
    // }
  },
  async mounted() {
    window.addEventListener('resize', () => {
      this.devicePixelRatio = Math.floor(window.devicePixelRatio * 100) / 100
    })
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
      const estateInfo = await this.$store.dispatch('home/index/queryEstate', {})
      if (estateInfo) {
        Object.entries(estateInfo).map(([k, v]) => {
          const find = this.estates.find(f => f.key === k)
          find.count = v
        })
        // this.options[0].series[0].data[0] = estateInfo.hasRentArea
        // this.options[0].series[1].data[0] = estateInfo.noRentArea
        this.estateBloc.find(f => f.isBloc).count = estateInfo.estateCounts
      }
      const renterInfo = await this.$store.dispatch('home/index/queryRenter', {})
      if (renterInfo) {
        Object.entries(renterInfo).map(([k, v]) => {
          const find = this.chartUser.find(f => f.key === k)
          if (find) {
            find.count = v
          }
        })
        Object.entries(renterInfo).map(([k, v]) => {
          const find = this.charRenter.find(f => f.key === k)
          if (find) {
            find.count = v
          }
        })
        this.charRenter.find(f => f.key === 'all').count = renterInfo.personCount + renterInfo.enterCount

        const bloc = this.blocCompony.find(f => f.isBloc).renter
        Object.entries(renterInfo).map(([k, v]) => {
          const find = bloc.find(f => f.key === k)
          if (find) {
            find.count = v
          }
        })
        this.blocCompony.find(f => f.isBloc).count = renterInfo.personCount + renterInfo.enterCount
        this.apartmentBloc.find(f => f.isBloc).count = renterInfo.renterCountByApartment

        this.renterInfo = renterInfo
      }

      // const resNotes = (await this.$store.dispatch('home/index/queryNotes', {})) || []
      // this.notices = resNotes.records

      await this.getEstateRate()

      // const financeInfo = await this.$store.dispatch('home/index/queryFinance', {})
      // if (financeInfo) {
      //   this.financeInfo = financeInfo
      // }
      await this.getRent()
      const maintenanceInfo = await this.$store.dispatch('home/index/queryMaintenance', {})
      if (maintenanceInfo) {
        maintenanceInfo.annualBudgetTotal = maintenanceInfo.annualBudgetTotal.toFixed(2)
        maintenanceInfo.hasUseTotal = maintenanceInfo.hasUseTotal.toFixed(2)
        this.maintenanceInfo = maintenanceInfo
        this.blocRepair.find(f => f.isBloc).year.count = maintenanceInfo.annualBudgetTotal
        this.blocRepair.find(f => f.isBloc).use.count = maintenanceInfo.hasUseTotal
      }

      // const tenantInvestment = await this.$store.dispatch(
      //   'archive/archive-renter/queryTaxStatisticsOnTenantInvestment',
      //   {
      //     pageIndex: 1,
      //     pageSize: 100,
      //     validBegin: moment().format('YYYY-MM-DD')
      //   }
      // )
      // if (tenantInvestment && tenantInvestment.records) {
      //   this.tenantInvestment = tenantInvestment.records.find(f => f.estateName === '总计')
      // }
    },
    async getEstateRate(assetType) {
      this.loading = true
      this.currentAssetType = assetType
      const estateRateInfo = await this.$store
        .dispatch('home/index/queryEstateRate', assetType ? { assetType } : {})
        .catch(() => {
          this.loading = false
        })
      this.loading = false
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
    },
    async getRent() {
      this.loading = true
      const rentList = await this.$store
        .dispatch('home/index/queryCollectAndPayRent', {})
        .catch(() => (this.loading = false))
      this.loading = false
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
          percent: Number(((receiveCurrentTotalAmount / shouldCurrentTotalAmount) * 100).toFixed(2))
        }
        this.rentList = rentList
        //  应收
        this.options[0].series[0].data = [shouldTotalAmount, shouldCurrentTotalAmount] // 应收
        //  已收
        this.options[0].series[1].data = [receiveTotalAmount, receiveCurrentTotalAmount] // 本年度已收租金
      }
    },
    setBlocData() {
      Object.entries(origin).map(([key, val]) => {
        this[key] = structuredClone(val)
      })
      // this.options[0].series[0].data[0] = 0
      // this.options[0].series[1].data[0] = 0
      window.removeEventListener('resize', () => this.resizeChart)
      this.createChart()
    },
    async setRent(name) {
      if (name === '集团本部') {
        await this.getRent()
        this.createChart()
      } else {
        this.options[0].series[0].data = [0, 0] // 应收
        this.options[0].series[1].data = [0, 0] // 本年度已收租金
        window.removeEventListener('resize', () => this.resizeChart)
        this.createChart()
        this.rentInfo = structuredClone(origin.rentInfo)
      }
    },
    onChoose(item) {
      this.active = item.name
      this.setRent(item.name)
    },
    requireImg(name) {
      return require(`@/assets/images/workbrench-chart/${name}.png`)
    },
    requireHomeImg(name) {
      return require(`@/assets/images/home/${name}.png`)
    },
    createChart() {
      const doms = ['.rent-main'] // ,'.estate-right-area',
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
    grid-column: 1 / span 18;
    grid-row: 1 / span 3;
    box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.08);
  }
  .chart-estate-percent {
    position: relative;
    grid-column: 19 / span 6;
    grid-row: 1 / span 3;
    box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.08);
  }
  .chart-user {
    position: relative;
    grid-column: 1 / span 24;
    grid-row: 4 / span 3;
    box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.08);
  }

  // 维修预算
  .chart-repair {
    grid-column: 1 / span 9;
    grid-row: 7 / span 3;
    box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.08);
  }
  // 财务统计
  .chart-finance {
    grid-column: 8 / span 12;
    grid-row: 4 / span 3;
    box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.08);
  }
  // 租金收入
  .chart-rent {
    position: relative;
    grid-column: 10 / span 15;
    grid-row: 7 / span 3;
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
    > span:nth-of-type(2) {
      font-weight: 500;
      margin-top: -10px;
    }
    .title-name {
      font-weight: 700;
      cursor: pointer;
    }
    .title-name-active {
      color: #2d8cf0;
    }
  }
  .title-icon {
    width: 26px;
    vertical-align: middle;
    margin-right: 12px;
  }
  .chart-estate-main {
    display: flex;
    padding: 24px 8px;
  }
  .estate-main-left {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    min-width: 340px;
    .main-icon {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 22px;
      align-self: center;
    }
    p {
      padding: 8px;
      margin: 6px;
      border-radius: 6px;
      // height: 95px;
      color: #fff;
      width: 31%;
      display: flex;
      flex-direction: column;
      // align-items: center;
      cursor: pointer;
      > span:nth-of-type(1) {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 8px;
      }
      .number {
        font-size: 15px;
        font-weight: 700;
        margin-bottom: 6px;
        text-decoration: underline solid #fff;
      }
      .estate-other {
        > span {
          font-size: 15px;
          display: block;
          margin-bottom: 3px;
        }
      }
    }
    p:nth-of-type(1) {
      background: linear-gradient(90deg, #b37eef 0%, #9e61ed 100%);
    }
    p:nth-of-type(2) {
      background: linear-gradient(90deg, #ff8b8e 0%, #ef5a62 100%);
    }
    p:nth-of-type(3) {
      background: linear-gradient(90deg, #58b0ff 0%, #4781fe 100%);
    }
    p:nth-of-type(4) {
      background: linear-gradient(90deg, #64d2f1 0%, #2fc4ec 100%);
    }
    p:nth-of-type(5) {
      background: linear-gradient(90deg, #65e2e2 0%, #36cbcb 100%);
    }
    p:nth-of-type(6) {
      background: linear-gradient(90deg, #ffca7b 0%, #ffa319 100%);
    }
  }
  // .estate-main-right {
  //   flex: 5;
  //   display: flex;
  //   .estate-right-area {
  //     flex: 1;
  //   }
  //   .estate-bloc {
  //     width: 140px;
  //     margin-right: 24px;
  //     > div {
  //       min-height: 92px;
  //       text-align: center;
  //       margin-top: 12px;
  //       border-radius: 6px;
  //       display: flex;
  //       flex-direction: column;
  //       align-items: center;
  //       justify-content: center;
  //     }
  //     > div:nth-of-type(1) {
  //       background: #ebfef8;
  //       > span:first-child {
  //         font-size: 24px;
  //         color: #39cccc;
  //       }
  //     }
  //     > div:nth-of-type(2) {
  //       background: #ecf4fe;
  //       > span:first-child {
  //         font-size: 24px;
  //         color: #43a0fe;
  //       }
  //     }
  //     > div:nth-of-type(3) {
  //       background: #fff7eb;
  //       > span:first-child {
  //         font-size: 24px;
  //         color: #ffa319;
  //       }
  //     }
  //   }
  // }
  .estate-right-area {
    min-height: 220px;
  }
  .estate-percent-card {
    display: flex;
    flex-direction: column;
    height: calc(~'100% - 42px');
    .estate-percent-card-left {
      min-width: 200px;
      display: flex;
      flex-direction: column;
      height: 90%;
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
      margin: 0 0 6px 8px;
      // margin-bottom: px;
    }
  }
  .repair-card-outer {
    display: flex;
    .chart-repair-right {
      flex: 3;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      max-height: 220px;
      .bloc-repair {
        min-height: 220px;
        margin: 20px 0;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        border-left: 1px solid #e5e5e5;
        .bloc-repair-title {
          font-weight: bold;
          font-size: 18px;
        }
        p {
          display: flex;
          flex-direction: column;
          color: #333;
          span:nth-of-type(1) {
            font-weight: bold;
            min-width: 80px;
            font-size: 24px;
          }
        }
      }
      .bloc-repair:first-child {
        > p:last-child {
          span:nth-of-type(1) {
            color: #ffa319;
          }
        }
      }
    }
  }
  .repair-main-card {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(~'100% - 42px');
    .repair-info-text {
      text-align: center;
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
    display: flex;
    padding: 0 12px;
    padding-bottom: 24px;
    .user-left-chart {
      flex: 6;
      display: flex;
      flex-direction: column;
      > div {
        flex: 1;
      }
    }
    .chart-user-apartment {
      position: relative;
      flex: 1;
      padding-left: 30px;
    }
    .chart-user-apartment-info {
      display: flex;
      flex-direction: column;
      // height: ~'calc(100% - 90px)';
      .apartment-top {
        border: 1px solid #e9e9e9;
        padding: 0;
        justify-content: flex-start;
        .card-info-text {
          color: #999;
          font-size: 16px;
        }
      }
      .apartment-bottom {
        // display: flex;
        // flex-direction: column;
      }
      .apartment-bloc {
        border: 1px solid #e9e9e9;
        min-height: 70px;
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .apartment-bloc-number {
          font-size: 24px;
          color: #39cccc;
        }
      }
      img {
        margin-right: 16px;
      }
      .apartment-number {
        font-weight: 700;
        font-size: 18px;
      }
    }
    .user-info-img {
      max-width: 57px;
    }
  }
  .user-top {
    display: flex;
  }
  .user-bottom {
    display: flex;
    margin-top: 12px;

    .user-bloc {
      flex: 1;
      padding: 12px 0;
      // margin: 0 6px;
      margin-right: 12px;
      border: 1px solid #e9e9e9;
      box-shadow: 0px 2px 6px 1px rgba(175, 175, 175, 0.2);
      .user-bloc-title {
        padding-left: 20px;
        font-size: 18px;
        font-weight: bold;
        color: #333333;
      }
      .user-bloc-info {
        max-height: 200px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
      }

      .user-bloc-card {
        padding: 0;
        border-right: 1px solid #e5e5e5;
      }
      .user-bloc-card:nth-of-type(2n - 1) {
        margin-top: 12px;
        padding-bottom: 12px;
      }
      .user-bloc-card:nth-of-type(2n) {
        padding-top: 12px;
        margin-bottom: 12px;
      }
      .user-bloc-card:nth-of-type(1),
      .user-bloc-card:nth-of-type(2) {
        .card-info-text {
          margin-bottom: -5px;
        }
      }

      .user-bloc-card:last-child {
        border: none;
      }
      .user-bloc-card:nth-last-child(2) {
        border: none;
      }
    }
    .user-bloc:first-child {
      margin-left: 0;
    }
    .user-bloc:last-child {
      margin-right: 0;
    }
  }
  .user-renter-outer,
  .user-info-outer {
    display: flex;
    flex: 2;
    justify-content: space-around;
    margin-right: 12px;
    border: 1px solid #e9e9e9;
    box-shadow: 0px 2px 6px 1px rgba(175, 175, 175, 0.2);
    .user-info {
      padding-left: 0;
    }
  }
  .user-info-outer {
    margin-right: 0;
  }
  .user-renter-outer {
    flex: 1;
  }
  .card-info {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 0;
    padding-left: 20px;
    &-text {
      min-width: 60px;
      color: #666;
      font-size: 14px;
    }
    &-number {
      color: #333;
      font-size: 24px;
      font-weight: 700;
    }
    &-img {
      margin-right: 10px;
    }
  }
  .rent-card {
    display: flex;
    padding: 8px 12px;
    .rent-card-left {
      display: flex;
      flex: 1;
      padding-right: 30px;
      .rent-card-left-info {
        min-width: 120px;
        width: 180px;
      }
      .rent-info-text {
        text-align: center;
        min-width: 80px;
        margin: 12px 0;
      }
      .rent-number {
        color: #333;
        // font-size: v-bind(fontSize(22));
        font-size: 22px;
        font-weight: 700;
      }
      .rent-text {
        color: #999;
        // font-size: v-bind(fontSize(14));
        font-size: 14px;
      }
    }

    .rent-card-right {
      flex: 1;
      padding-left: 30px;
      border-left: 1px solid #e5e5e5;
      .rent-tab-btn {
        background: #fff;
        border: 1px solid #eeeeee;
        min-width: 90px;
        padding: 6px 0;
        text-align: center;
        margin-right: 12px;
        cursor: pointer;
      }
      .rent-tab-btn-active {
        border: 1px solid #399bfe;
        color: #399bfe;
        background: #eef6ff;
      }
    }
    // height: ~'calc(100% - 90px)';
  }
  .rent-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .rent-info-top {
      display: flex;
      margin: 20px 0;
      background: #fbfbfb;
      padding: 12px 20px;
    }
    .rent-info-bottom {
      display: flex;
      flex-wrap: wrap;
      padding: 0 20px;
      .rent-info-text {
        width: 50%;
      }
    }
    // padding: 12px 20px;
    .rent-info-text {
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
  .user-info-img,
  .estate-percent-info-img,
  .contract-info-img,
  .rent-info-img {
    background: #e7f2ff;
    margin-right: 10px;
  }
  .chart-user-title {
    display: flex;
    font-weight: 700;
    font-size: 16px;
    color: #333;
    padding-left: 16px;
    margin-top: 10px;
    margin-bottom: 20px;
    position: relative;
    &::before {
      content: '';
      height: 16px;
      width: 3px;
      position: absolute;
      top: 4px;
      left: 2px;
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
  .rent-main {
    flex: 1;
    min-height: 200px;
  }
}
@media (max-width: 1600px) {
  .content {
    // 载体基本情况
    .chart-estate {
      grid-column: 1 / span 16;
      grid-row: 1 / span 3;
      box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.08);
    }
    // 载体出租率
    .chart-estate-percent {
      grid-column: 17 / span 8;
      grid-row: 1 / span 3;
      box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.08);
    }
    .chart-user {
      position: relative;
      grid-column: 1 / span 24;
      grid-row: 4 / span 3;
      box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.08);
    }

    // 维修预算
    .chart-repair {
      grid-column: 1 / span 10;
      grid-row: 7 / span 3;
      box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.08);
    }
    // 财务统计
    .chart-finance {
      grid-column: 8 / span 12;
      grid-row: 4 / span 3;
      box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.08);
    }
    // 租金收入
    .chart-rent {
      grid-column: 11 / span 14;
      grid-row: 7 / span 3;
      box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.08);
    }
    .chart-notice {
      grid-column: 20 / span 5;
      grid-row: 4 / span 3;
      box-shadow: 0px 2px 6px 1px rgba(0, 0, 0, 0.08);
    }
    .estate-main-left {
      .main-icon {
        display: none;
      }
      p {
        width: 47%;
      }
    }
    // .estate-main-right {
    //   flex-direction: column-reverse;
    //   .estate-bloc {
    //     margin-right: 0;
    //     display: flex;
    //     width: 100%;
    //     > div {
    //       flex: 1;
    //       margin: 6px 4px;
    //     }
    //   }
    // }
    .user-card-outer {
      flex-direction: column;
      .chart-user-apartment {
        padding-left: 0;
      }
      .chart-user-apartment-info {
        flex-direction: row;
      }
      .apartment-top {
        flex: 1;
      }
      .apartment-bottom {
        flex: 3;
        display: flex;
        padding: 0 20px;
        .apartment-bloc {
          flex: 1;
          margin: 0 30px;
        }
      }
    }
    .rent-card {
      flex-direction: row-reverse;
      .rent-card-left {
        flex: 2;
        padding-right: 8px;
        flex-direction: column;
        .rent-card-left-info {
          width: auto;
          min-width: none;
          .rent-info-text {
            display: none;
          }
        }
      }
      .rent-card-right {
        flex: 3;
        padding-left: 0;
        border: none;
        .rent-info-top {
          padding: 5px 8px;
        }
        .rent-info-bottom {
          padding: 0 8px;
          .rent-info-text {
            // flex: 1;
          }
        }
      }
    }
    .rent-main {
      min-height: 180px;
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