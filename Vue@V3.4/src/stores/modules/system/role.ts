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

interface RoleState {
  data?: Schema[]
  database?: string
  databaseFile?: File[]
}

interface DataBase {
  tableName: string
  whereStatement?: string
  filters?: {
    [key: string]: any
  }
}
export const useRoleStore = defineStore('role', {
  state: (): RoleState => ({
    data: [],
    database: '',
    databaseFile: []
  }),
  actions: {
    async query(payload?: any) {
      let result = await $http.post('admin-api/sys/role/query', {
        ...payload,
        includingRights: false // 是否返回 菜单id
      })
      return result
    },
    async save(payload: any) {
      let result = await $http.post('admin-api/sys/role/save', payload)
      return result
    },
    async queryById(payload?: any) {
      let result = await $http.post('admin-api/sys/role/query', {
        ...payload,
        includingRights: true
      })
      return result.records
    },
    // async schema(payload?: any): Promise<Schema[]> {
    //   let result = await $http.get('admin-api/dnavi/schema/query', payload)
    //   this.schemaData = result
    //   return result
    // },
    // async getDatabase(payload: DataBase) {
    //   let result = await $http.post('admin-api/dnavi/query', payload)
    //   return result
    // },
    // async save(payload: any) {
    //   let result = await $http.post('', payload)
    //   return result
    // },

    setState(state: object) {
      for (const key in state) {
        if (isValidKey(key, state)) {
          this[key] = state[key]
        }
      }
    }
  }
})
