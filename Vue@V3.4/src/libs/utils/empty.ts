type Obj = { [key: string]: any }
type Value = number | string | undefined | null | boolean | (() => void) | [key: string] | Obj
const types = {
  '[object Number]': (val: number) => {
    if (val || val === 0) {
      return true
    }
    return false
  },
  '[object String]': (val: string) => {
    if (val) {
      return true
    }
    return false
  },
  '[object Boolean]': (val: boolean) => {
    return val
  },
  '[object Undefined]': () => {
    return false
  },
  '[object Null]': () => {
    return false
  },
  '[object Object]': (val: Obj) => {
    return !(Reflect.ownKeys(val).length === 0)
  },
  '[object Array]': (val: [key: any]) => {
    return !!val.length
  },
  '[object Function]': () => {
    return new Error('Function type not supported')
  }
}
export const isTruth = (val: Value) => {
  const type: string = Object.prototype.toString.call(val)
  return types[type](val)
}
// console.log(isTruth({}))  // false
// console.log(isTruth({ a: '1' })) // true
// console.log(isTruth(0)) // true
// console.log(isTruth(1)) // true
// console.log(isTruth(null)) // false
// console.log(isTruth(undefined)) // false
// console.log(isTruth(NaN)) // false
// // const
// Object.prototype.toString.call(123) // "[object Number]"
// Object.prototype.toString.call('hello') // "[object String]"
// Object.prototype.toString.call(true) // "[object Boolean]"
// Object.prototype.toString.call(undefined) // "[object Undefined]"
// Object.prototype.toString.call(null) // "[object Null]"
// Object.prototype.toString.call({}) // "[object Object]"
// Object.prototype.toString.call([]) // "[object Array]"
// Object.prototype.toString.call(function () {}) // "[object Function]"

// //   return Reflect.ownKeys(obj).length === 0
// // }
