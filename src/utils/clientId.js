/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2018-08-01 17:13:38
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2018-08-02 11:26:28
 */
import { randomGuid } from './guid'

export default () => {
  if (window.localStorage['anony-id']) {
    return localStorage['anony-id']
  }
  const guid = randomGuid()
  window.localStorage.setItem('anony-id', guid)
  return guid
}
