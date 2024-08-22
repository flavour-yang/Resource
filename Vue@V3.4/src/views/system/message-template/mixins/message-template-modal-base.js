import {FormModalBase} from "@/mixins";


const model = {
    templateCode: "",
    templateName: "",
    templateNumber: "",
    templateContent: "",
}


export default {
    name: "message-template-modal-base",
    mixins: [FormModalBase],
    data() {
        return {
            model: this.$utils.deepCopy(model),
            hideOk: true
        }
    },
    methods: {
        async initModelHandle(row) {
            if (row.id) {
                this.model = Object.assign({}, row);
            }
        },
        resetModel() {
            this.model = this.$utils.deepCopy(model)
        }
    },

    computed: {

    },
    async created() {
        Object.assign(this.config, {
            title: `消息模板`,
            width: 800,
            hideOk: this.hideOk,
            okApi: "system/message-template/save",
        });
    }
}