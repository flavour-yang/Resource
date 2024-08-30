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

interface SchemaState {
  schemaData?: Schema[]
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
export const useSchemaStore = defineStore('schema', {
  state: (): SchemaState => ({
    schemaData: [],
    database: '',
    databaseFile: []
  }),
  actions: {
    async schema(payload?: any): Promise<Schema[]> {
      let result = await $http.get('admin-api/dnavi/schema/query', payload)
      this.schemaData = result
      return result
    },
    async getDatabase(payload: DataBase) {
      let result = await $http.post('admin-api/dnavi/query', payload)
      return result
    },
    async save(payload: any) {
      let result = await $http.post('admin-api/dnavi/schema/save', payload)
      return result
    },

    setState(state: object) {
      for (const key in state) {
        if (isValidKey(key, state)) {
          this[key] = state[key]
        }
      }
      // Object.entries(state).map(([key, val]) => {
      //   if (isValidKey(key, state)) {
      //     key
      //   }
      // })
    }
  }
})
