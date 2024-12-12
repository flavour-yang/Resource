import './assets/main.css'

import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'

import App from './App.vue'
import router from './router'
// import HyForm from '@/components/Form/index.vue'
// import HyInput from '@/components/Form/Input/index.vue'
// import HyTextarea from '@/components/Form/Textarea/index.vue'
// import HyTable from '@/components/Table/index.vue'
// import HyModal from '@/components/Modal/index.vue'
import register from '@/components'
import config from './config'
import { setupStore } from './stores'
const app = createApp(App)

app.config.globalProperties.$config = config
// app.config.globalProperties.$http = $http
// app.component('hy-form', HyForm)
// app.component('hy-input', HyInput)
// app.component('hy-table', HyTable)
// app.component('hy-textarea', HyTextarea)
// app.component('hy-modal', HyModal)

setupStore(app)

app.use(router)
app.use(ArcoVue)
app.use(register)
app.mount('#app')
