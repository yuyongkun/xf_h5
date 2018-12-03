<template>
  <div class="redirect-view">
    <p>跳转中...</p>
  </div>
</template>

<script>
import { getQueryValueByName } from '../utils'

export default {
  name: '',

  data () {
    return {}
  },

  methods: {},

  beforeMount () {
    let view = getQueryValueByName('view')
    let url
    switch (view) {
      case 'coupon-center': {
        let shopId = getQueryValueByName('shopId')
        let shareId = getQueryValueByName('shareId')
        url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx546482739ca755c0&redirect_uri=http%3A%2F%2Ftest-shop.fanxify.com%2Fauth%2Fshop&response_type=code&scope=snsapi_userinfo&state=coupon-center-${shopId}-${shareId}#wechat_redirect`
        window.location.replace(url)
        break
      }
      case 'qrcode-coupon-center': {
        let shopId = getQueryValueByName('shopId')
        let couponId = getQueryValueByName('couponId')
        let shareId = getQueryValueByName('shareId')
        let dataStr = shareId ? `${shopId}-${couponId}-${shareId}` : `${shopId}-${couponId}`
        url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx546482739ca755c0&redirect_uri=http%3A%2F%2Ftest-shop.fanxify.com%2Fauth%2Fshop&response_type=code&scope=snsapi_userinfo&state=qrcode-coupon-center-${dataStr}#wechat_redirect`
        window.location.replace(url)
        break
      }
      default: {
        url = 'http://test-shop.fanxify.com/#/'
        window.location.replace(url)
      }
    }
  },

  mounted () {

  }
}
</script>

<style>

</style>
