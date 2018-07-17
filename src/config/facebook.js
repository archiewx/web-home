export default (Vue, option = { enabled: true }) => {
  if (!option.enabled) {
    return
  }
  window.fbAsyncInit = function() {
    FB.init({
      appId: '1157916254384389',
      cookie: true,
      xfbml: true,
      version: ''
    })

    FB.AppEvents.logPageView()
  }
  ;(function(d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) return
    js = d.createElement(s)
    js.id = id
    js.src =
      'https://connect.facebook.net/zh_CN/sdk.js#xfbml=1&version=v3.0&appId=1157916254384389&autoLogAppEvents=1'
    fjs.parentNode.insertBefore(js, fjs)
  })(document, 'script', 'facebook-jssdk')
}
