<template>
    <form-modal :loading="loading" :model="model" v-bind="config" ok-api="system/role/save" ref="role-detail-modal">
        <Row>
            <hy-span v-model="model.roleName" label="角色名称" :span="24" />
            <hy-span v-model="model.adder" label="创建人" :span="24" />
            <hy-span-date v-model="model.addDate" label="创建时间" type="datetime" :span="24" />
            <hy-span v-model="model.updater" label="更新人" :span="24" />
            <hy-span-date v-model="model.updateDate" label="更新时间" type="datetime" :span="24" />
        </Row>
    </form-modal>
</template>

<script>
import ModalBase from "../mixins/modal-base"
export default {
    name: "role-detail-modal",
    mixins: [ModalBase],
}
</script>
