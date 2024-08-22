import CryptoJS from 'crypto-js'
import { md5 } from 'js-md5'
export function encrypt(word: string, keyStr?: string, ivStr?: string) {
  const KEY = CryptoJS.enc.Utf8.parse('1234567890123456')
  const IV = CryptoJS.enc.Utf8.parse('1234567890123456')
  let key = KEY
  let iv = IV
  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr)
    if (ivStr) {
      iv = CryptoJS.enc.Utf8.parse(ivStr)
    }
  }
  let srcs = CryptoJS.enc.Utf8.parse(word)
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding
  })
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}

export function md5Encrypt(content: any) {
  return md5(content)
}

export default { encrypt, md5Encrypt }
