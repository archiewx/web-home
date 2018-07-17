/* eslint-disable */
const isDev = process.env.NODE_ENV !== 'production'
export default (Vue, option = { enabled: true }) => {
  if (!isDev && option.enabled) {
    ;(function(h, o, t, j, a, r) {
      h.hj =
        h.hj ||
        function() {
          ;(h.hj.q = h.hj.q || []).push(arguments)
        }
      h._hjSettings = { hjid: 739749, hjsv: 6 }
      a = o.getElementsByTagName('head')[0]
      r = o.createElement('script')
      r.async = 1
      r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv
      a.appendChild(r)
    })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=')
  }
}
