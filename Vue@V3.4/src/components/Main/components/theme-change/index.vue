<template>
    <div style="padding-right: 10px">
        <Dropdown @on-click="setTheme" transfer>
            <span style="cursor:pointer">字体大小:{{fontSize}}</span>
            <DropdownMenu slot="list">
                <DropdownItem v-for="(item, index) of themeList" :name="item.name" :key="index">{{item.value}}</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>
import storageHelper from "@/libs/helpers/storage-helper";
export default {
    name: 'theme-change',

    data() {
        return {
            theme: "",
            themeList:[
                { name: "theme-small", value: "12px" },
                { name: "theme-base", value: "14px" },
                { name: "theme-large", value: "16px" },
                { name: "theme-large-18", value: "18px" },
                { name: "theme-large-20", value: "20px" },
            ]
        };
    },
    computed: {
        fontSize(){
            let result = "14px";
            if(this.theme){
                return this.themeList.find(el => el.name === this.theme).value;
            }
            return result;
        }
    },
    created() {
        let theme = storageHelper.localRead('theme') || 'theme-base';
        this.theme = theme;
        this.setTheme(theme);
    },

    methods: {
        setTheme(name){
            this.theme = name;
            storageHelper.localSave('theme', this.theme);
            const body = document.querySelector('body');
            this.themeList.forEach(el => {
                body.classList.remove(el.name);
            });
            body.classList.add(name);
        }
    },
};
</script>

<style lang="less" scoped>

</style>