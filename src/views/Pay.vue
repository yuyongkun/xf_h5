<template>
  <div class="pay-view">
    <div class="pay-count hairline-bottom">
      <p>需付：<span>￥{{ order.total | yuan }}</span></p>
    </div>
    <div class="count-down">
      <countdown v-bind:auto-start="false" ref="countdown" :time="orderTTL">
        <template slot-scope="props">请在十五分钟内支付订单。剩余时间：<span class="time-left">{{ props.minutes }}:{{ props.seconds }}</span></template>
      </countdown>
    </div>
    <div class="wx-pay-btn-wrap">
      <a href="javascript:;" @click="handleWxPay" class="wx-pay-btn">微信支付</a>
    </div>
  </div>
</template>

<script>
  import { getOrder, onOrderPaySuccess, onApmPaySuccess } from '../api/api'
  import { Toast } from 'mint-ui'
  import { isDevEnv, orderTTL } from '../config/app'

  export default {
    props: ['orderId'],

    name: 'Order',

    data () {
      return {
        order: {},
        showStatus: false,
        orderTTL: orderTTL
      }
    },

    methods: {
      handleWxPay () {
        if (isDevEnv) {
          Toast('请在微信环境中使用')
        }

        if (this.order.paid) {
          this.$toast('订单已经支付，请勿重复支付！')
          return
        }

        let expired = (Date.now() - this.order.creationTime) >= orderTTL
        if (expired) {
          Toast('订单已过期，请重新购买')
          return
        }

        this.showStatus = !this.showStatus
        let signFields = this.order.signFields
        let { timeStamp, nonceStr, signType } = signFields
        let that = this
        /* eslint-disable */
        wx.ready(function () {
          wx.chooseWXPay({
            timestamp: timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr, // 支付签名随机串，不长于 32 位
            package: signFields.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: that.order.paySign, // 支付签名
            success: function (res) {
              Toast('支付成功')
              if (!that.order.prodId) {
                onApmPaySuccess(that.order.orderId).then(() => {
                  this.shopId = that.$route.params.shopId
                  this.apmId = that.$route.params.apmId
                  that.$router.push({ name: 'RateForm', params: { shopId: that.order.shopId, apmId: that.order.apmId }, query: { state: 'rate' } })
                }).catch(e => {
                  console.error(e)
                  Toast(`系统错误：${e.message}`)
                })
              } else {
                onOrderPaySuccess(that.order.orderId).then(() => {
                  that.$router.push({ name: 'MyTicket' })
                }).catch(e => {
                  console.error(e)
                  Toast(`系统错误：${e.message}`)
                })
              }
            },
            fail: function (e) {
              that.$router.push({ name: 'PayFail' })
              Toast('支付失败')
            }
          })
        })
      }
    },

    mounted () {
      this.$refs.countdown.start()
      if (!isDevEnv) {
        getOrder(this.orderId).then(data => {
          Toast('获取订单成功')
          this.order = data.data.order
          this.orderTTL = orderTTL - this.order.creationTime
        }).catch(e => {
          console.error(e)
          Toast('获取订单错误！')
        })
      }
    }
  }
</script>

<style lang="scss">
.pay-count {
  background-color: whitesmoke;
}
.pay-count p {
  margin: 0;
  padding: 12px;
  text-align: right;
}
.pay-count p span {
  color: red;
  font-weight: bold;
}
.weixin {
  color: green;
}

.count-down {
  padding: 8px 12px;
  background: #fffff6;
  font-size: 12px;
  color: #ea8800;
}

.wx-pay-btn-wrap {
  margin-top: 50px;
  padding: 0 15px;
  a {
    position: relative;
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding-left: 14px;
    padding-right: 14px;
    box-sizing: border-box;
    font-size: 18px;
    text-align: center;
    text-decoration: none;
    color: #FFFFFF;
    line-height: 2.55555556;
    border-radius: 5px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    overflow: hidden;
    background-color: #1AAD19;
  }
}
</style>
