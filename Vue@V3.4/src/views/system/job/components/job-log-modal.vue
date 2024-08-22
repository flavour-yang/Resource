<template>
  <!-- <form-modal :loading.sync="loading"
              v-bind="config"
              :width="1100"
              :hideCancel="true">
    <search-page :model="queryParam"
                 v-bind="dataConfig"
                 :ref="refName">
    </search-page>
  </form-modal> -->
  <div>job</div>
</template>

<script>
// import { PageListBase, } from "@/mixins";
// import JobModalBase from "../mixins/job-modal-base";

// export default {
//   name: "job-log-modal",
//   mixins: [PageListBase, JobModalBase],
//   data() {
//     return {
//       queryParam: {
//         id: "",
//         orderName: "createTime",
//         orderBy: this.$consts.common.orderBy.desc.key,
//       },
//     }
//   },
//   methods: {
//     initModelHandle(row) {
//       if (row.id) {
//         this.config.title = row.jobName;
//         this.queryParam.id = row.id;
//         this.$nextTick(()=>{
//           this.query();
//         })
//       }
//     },
//   },
//   computed: {
//     columns() {
//       return [
//         { title: "开始时间", key: "executionTime", width: 180, align: "center" },
//         { title: "结束时间", key: "createTime", width: 180, align: "center" },
//         { title: "执行结果", key: "remark", minWidth: 250, align: "center" },
//       ]
//     },

//     dataConfig() {
//       return {
//         queryApi: "system/job/queryLog",
//         columns: this.columns,
//         hideSearch: true,
//         mountedQuery: false,
//       }
//     },
//   },
// }
</script>
