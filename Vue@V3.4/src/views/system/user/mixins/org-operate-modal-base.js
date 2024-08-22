import {FormModalBase} from "@/mixins";

const model = {
    id: "",
    orgName: "",
    orderIndex: null,
    parentId: "",
    parentName: "",
    address: "",
    email: "",
    fax: "",
    linkMan: "",
    telephone: "",
    remark: "",
    isCompany: "",
}
export default {
    name: "org-operate-modal-base",
    mixins: [FormModalBase],
    data() {
        return {
            model: this.$utils.deepCopy(model),
            hideOk: true,
            yesNoList: [],
        }
    },
    methods: {
        initModelHandle(row) {
            if (row) {
                this.model = Object.assign({}, row);
            }
        },
        resetModel() {
            this.model = this.$utils.deepCopy(model)
        }
    },
    created() {
        Object.assign(this.config, {
            title: `部门`,
            width: 500,
            hideOk: this.hideOk
        });
        this.getCodeInfoList(this.$consts.system.groupKey.yesNo).then(res => {
            this.yesNoList = res
        })
    }
}