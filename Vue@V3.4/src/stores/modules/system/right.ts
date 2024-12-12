import { isValidKey } from '@/env.d'
import $http from '@/libs/http'
import { defineStore } from 'pinia'

interface File {
  fieldName?: string
  fieldDesc?: string
}
interface Schema {
  tableName?: string
  tableDesc?: string
  dataLength?: string
  tableRows?: string
}

interface RightState {
  data?: Schema[]
  database?: string
  databaseFile?: File[]
}

export const useRightStore = defineStore('right', {
  state: (): RightState => ({
    data: [],
    database: '',
    databaseFile: []
  }),
  actions: {
    async query(payload?: any) {
      let result = await $http.post('admin-api/sys/right/query', payload)
      return result
    },

    setState(state: object) {
      for (const key in state) {
        if (isValidKey(key, state)) {
          this[key] = state[key]
        }
      }
    }
  }
})
