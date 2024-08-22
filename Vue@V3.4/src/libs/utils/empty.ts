export const isObjectEmpty = (obj: any) => {
  return Reflect.ownKeys(obj).length === 0
}
