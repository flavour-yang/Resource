<template>
  <div class="login-main">
    <div class="login-section">
      <div class="login-content" id="particles">
      </div>
      <div class="login-container">
        <div class="login-top">
          <!-- <img :src="logo" /> -->
          <span>{{ $config.appTitle }}</span>
        </div>
        <div class="form-content">
          <a-card title="欢迎登录">
            <hy-form :model="model" @submit-success="login" class="login-form">
              <a-row :gutter="[0, 12]">
                <a-col :span="24">
                  <hy-input v-model="model.account" label="用户" disabled field="account" :required="true" />
                </a-col>
                <a-col :span="24">
                  <hy-input v-model="model.passwordStr" label="密码" field="passwordStr" :required="true" />
                </a-col>
                <a-col :span="24">
                  <a-button type="primary" html-type="submit" long :loading="loading">登录</a-button>
                </a-col>
              </a-row>
            </hy-form>
          </a-card>
        </div>
      </div>
    </div>
    <div class="login-footer">
      <span>{{ $config.companyName }}</span>
      <span>地址:{{ $config.companyAddress }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { encrypt } from '@/libs/security'
import { onKeyStroke } from '@vueuse/core'
import { computed, getCurrentInstance, onMounted, onUnmounted, ref, reactive, toRefs } from 'vue'
import { Message } from '@arco-design/web-vue'
import { useAppStore } from '@/stores/modules/app'
// @ts-ignore
const { $config } = getCurrentInstance()?.appContext.config.globalProperties
const appStroe = useAppStore()
const router = useRouter()
const loginForm = ref() as any
const model = reactive({ account: 'hwadmin', passwordStr: '1qaz@WSX' })
const data = reactive({
  loading: false,
  img: {
    requestId: '',
    src: '',
    validSrc: '',
    verifyCode: 0,
    yHeight: 0
  },
  imgValid: false
})
const { loading } = toRefs(data)
onMounted(() => {
  // @ts-ignore
  window.particlesJS.load('particles', '/public/particles.json', () => { })
  onKeyStroke('Enter', (e) => {
    e.preventDefault()
    console.log('Enter')
  })
})
onUnmounted(() => { })

const logo = computed(() => {
  const url = new URL(`../../../assets/${$config.appCode}/images/logo.png`, import.meta.url).href
  return url
})
interface Login {
  account: string
  passwordStr: string
}
const login = async (values: Login) => {
  data.loading = true
  console.log(values.account)
  // console.log(model, model.account)
  await appStroe
    .login({
      account: values.account,
      password: encrypt(values.passwordStr),
      userType: 1,
      type: 1,
      mode: 2
    })
    .catch(() => (data.loading = false))
  await appStroe.getUserInfo()
  data.loading = false
  router.replace('/schema')
  try {
  } catch {
    data.loading = false
  }
}
</script>
<style scoped lang="less">
.login-main {
  height: 100%;
  display: flex;
  flex-direction: column;

  .login-section {
    flex: 1;
  }

  .login-content {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #b3b1b1;
  }
}

.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 35%;
  transform: translate(-50%, -35%);

  .login-top {
    span {
      display: inline-block;
      padding-left: 18px;
      font-size: 32px;
      font-weight: bolder;
    }
  }

  .form-content {
    border: 10px solid rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    margin: 50px 0;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;

    >div {
      background: rgba(255, 255, 255, 1);
    }
  }

  .login-form {
    width: 500px;
  }
}

.login-footer {
  position: relative;
  text-align: center;
  height: 42px;
}

@media (max-width: 720px) {
  .login-container {
    .login-form {
      width: 75vw;
    }
  }
}
</style>