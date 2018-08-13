/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2018-08-13 15:56:28
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2018-08-13 16:33:01
 */
import isDev from './isDev'

export default () => {
  return (() => {
    if ('serviceWorker' in navigator && !isDev()) {
      navigator.serviceWorker
        .register('/dist/sw.js')
        .then(() => {
          console.log('sw registered.')
        })
        .catch((err) => {
          console.warn('sw register failed.', err)
        })
    }
  })()
}
