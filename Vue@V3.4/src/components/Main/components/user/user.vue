<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick"
              transfer>
      <Avatar ref="avatar"
              icon="ios-person"
              :src="avatar" />
      <span style="padding-left:5px">{{(userInfo.name||'') + "，你好！"}}</span>
      <DropdownMenu slot="list">
        <DropdownItem name="changepwd">修改密码</DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import './user.less'
import CommonIcon from "_c/common-icon";
export default {
  name: 'User',
  components: { CommonIcon },
  data() {
    return {
      avatar: "",
    }
  },
  computed: {
    userInfo() { return this.$store.state.current.userInfo },
  },
  methods: {
    async logout() {
      await this.$store.dispatch("current/logout");
      location.reload();
    },
    changepwd() {
      this.$emit('change')
    },
    handleClick(name) {
      switch (name) {
        case 'logout': this.logout()
          break
        case 'changepwd': this.changepwd()
          break
      }
    }
  },
  mounted() {
    let headPhoto = this.$store.state.current.userInfo.headPhoto;
    if (headPhoto != null) {
      let fileData = { id: headPhoto.fileId, fileType: this.$consts.system.fileType.file, businessType: this.$consts.system.attachmentType.headPhoto };
      this.$store.dispatch('system/file/download', fileData).then(res => {
        this.avatar = encodeURI(URL.createObjectURL(res));
      });
    }
  },
}
</script>
