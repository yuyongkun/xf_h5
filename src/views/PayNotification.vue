<template>
  <div class="order-view">

    <div class="view-content" v-show="!msg.paid">
      <div class="pay-info">
        <el-card>
          <div class="text item">服务价格：￥{{ msg.price | yuan }}</div>
          <div class="text item">服务项目：{{ getCategoryNames(msg.categories) }}</div>
          <div class="text item">工作人员：{{ msg.staff.username }}</div>
        </el-card>
      </div>

      <mt-radio
        title="选择积分"
        align="right"
        v-if="coupons.length"
        v-model="selectedCouponId"
        :options="coupons">
      </mt-radio>

      <!-- <div class="chooseCoupon"  v-if="choosedCoupon">
        <mt-popup
          style="width:100%;height:50%;overflow:scroll"
          v-model="popupVisible"
          position="bottom">
          <div style="text-align: center;margin: 20px;border: 1px solid #d1d1d1;width: 100px; margin: 10px auto;padding: 10px;border-radius: 10px;" @click="confirmCoupon">确定</div>
        </mt-popup>
      </div> -->
      <!-- <div class="coupon-wrap" v-if="coupons.length" @click="showPopup">
        <mt-cell title="优惠券"  is-link :value="'¥' + parseFloat(choosedCoupon.couponAmount / 100).toFixed(2)"></mt-cell>
      </div> -->
      <div class="order-btn-bar">
        <div class="btn" @click="submitOrder">提交订单</div>
        <p>需付：<span class="order-price">￥{{ total | yuan }}</span></p>
      </div>
    </div>

  </div>
</template>

<script>
  /* eslint-disable */
  import { Toast } from 'mint-ui'
  import { createOrder, getCouponsByPayNotify, getPayMsg, getOrderByMsgId } from '../api/api'
  import { isDevEnv } from '../config/app'
  import { getOpenid, getCategoryLabel, getQueryValueByName } from '../utils'
  export default {
    props: [ 'shopId', 'prodId' ],
    name: 'Order',
    data () {
      return {
        total: 0,
        shop: {},
        popupVisible: false,
        orderId: '123',
        price: 0,
        coupons: [],
        couponIds: [],
        choosedCoupon: { couponAmount: 0, couponIds: [] },
        msg: {shop: {}, staff: {}},
        selectedCouponId: '',
        submiting: false,
        msgId: ''
      }
    },
    watch: {
      // couponIds: function (newVal, oldVal) {
      //   if (newVal !== oldVal) {
      //     if (newVal.length === 0) {
      //       this.choosedCoupon = { couponAmount: 0, couponIds: [] }
      //     } else {
      //       this.choosedCoupon.couponIds = newVal
      //       this.choosedCoupon.couponAmount = 0
      //       newVal.map(couponId => {
      //         let coupon = this.coupons.find(m => m.couponId === couponId)
      //         this.choosedCoupon.couponAmount += Number(coupon.couponAmount) * 100
      //       })
      //     }
      //   }
      //   this.total = this.getTotalFee()
      // },
      selectedCouponId (newVal, oldVal) {
        if (newVal === oldVal) { return }
        this.couponIds = [newVal]
        let selectedCoupon = this.coupons.find(x => x.couponId === newVal)
        this.choosedCoupon = {
          couponAmount: selectedCoupon.couponAmount,
          couponIds: this.couponIds
        }
        this.total = this.getTotalFee()
      },
    },
    methods: {
      confirmCoupon () {
        this.total = this.getTotalFee()
        this.popupVisible = false
      },
      showPopup () {
        this.popupVisible = true
      },
      submitOrder () {
        if (this.submiting) { return }
        this.submiting = true

        let order = {
          total: this.getTotalFee(),
          oriTotal: this.msg.price,
          categories: this.msg.categories,

          apmId: this.msg.apmId,
          msgId: this.msg.msgId,
          shopId: this.msg.shopId,
          couponIds: this.couponIds
        }

        if (isDevEnv) {
          this.$router.push({
            name: 'Pay',
            params: {
              orderId: '2333'
            }
          })
        } else {
          let toast = Toast({
            message: '正在创建订单...',
            duration: -1
          })

          createOrder(order).then(data => {
            toast.close()
            let order = data.data.order
            this.orderId = order.orderId
            this.$router.push({
              name: 'Pay',
              params: {
                orderId: this.orderId
              }
            })
          }).catch(e => {
            toast.close()
            Toast('创建订单失败，请重试！')
          })
        }
      },
      getTotalFee () {
        let couponAmount = this.choosedCoupon.couponAmount
        let totalFee = this.msg.price - (couponAmount * 100)
        totalFee = totalFee < 0 ? 1 : totalFee // 最少一分钱
        return parseInt(totalFee)
      },

      async handleCoupon () {
        getCouponsByPayNotify({ apmId: this.msg.apmId, categories: this.msg.categories, price: this.msg.price, shopId: this.msg.shopId }).then(res => {
          this.coupons = (res.data.coupons || []).map(item => {
            item.label = `${item.couponName} ￥${item.couponAmount}.00`
            item.value = item.couponId
            return item
          })
          this.choosedCoupon = this.coupons.length > 0 ? { couponAmount: this.coupons[0].couponAmount, couponIds: [this.coupons[0].couponId] } : { couponAmount: 0, couponIds: [] }
          this.couponIds = this.choosedCoupon.couponIds
          this.selectedCouponId = this.couponIds[0] || ''
          this.total = this.getTotalFee()
        })
      },

      getCategoryNames (categories) {
        return (categories || []).map(getCategoryLabel).join('、')
      },

      async waitTillCreatingOrderDone () {
        let notDone = true
        let maxTry = 10
        let tryCount = 0
        let resp
        while (notDone && tryCount < maxTry) {
          try {
            console.log('[>>] get order by msg id. msgId: %s', this.msgId)
            resp = await getOrderByMsgId(this.msgId)
            console.log('[OK] get order by msg id. msgId: %s, resp: %j', this.msgId, resp)
            notDone = false
          } catch (e) {
            console.log('[ERR] get order by msg id. msgId: %s', this.msgId)
            console.error(e)
          }
          tryCount++
        }
        if (notDone) {
          this.$toast('系统错误')
          return
        }
        let order = resp.data.order
        this.orderId = order.orderId
        this.$router.push({
          name: 'Pay',
          params: {
            orderId: this.orderId
          }
        })
      }
    },

    mounted () {
      let msgId = getQueryValueByName('msgId')
      this.msgId = msgId
      let toast = Toast({
        message: '正在获取服务信息...',
        duration: -1
      })
      if (msgId) {
        getPayMsg(msgId).then(res => {
          console.log(res)
          let msg = res.data.msg
          if (msg.paid) {
            toast.close()
            toast = Toast(`你已支付过本次服务，请勿重复操作^_^`)
            // this.$router.push({ name: 'Home', query: { state: '' } })
            return
          }

          if (msg.isOrderLocked) {
            toast.close()
            toast = Toast(`订单已提交过，正在获取订单信息...`)
            return this.waitTillCreatingOrderDone()
          }

          this.msg = msg
          toast.close()
          return this.handleCoupon()
        }).catch(e => {
          console.error(e)
          toast(`系统错误：${e.message}`)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .product-wrap {
    background-color: #ffffff;
  }
  .coupon-wrap{
    margin-top: 10px;
  }
  .shop-name p{
    margin: 0;
    padding: 15px 8px;
  }
  .product .detail {
    display: flex;
    flex-direction: row;
    padding: 8px;
  }
  .product .detail img {
    display: block;
    width: 128px;
    height: 128px;
  }
  .product .detail .desc {
    padding-left: 10px;
  }
  .product .detail .desc p {
    margin: 0;
  }
  .product .detail .desc .prod-name {
    font-size: 16px;
  }
  .product .detail .desc .prod-desc {
    font-size: 12px;
    color: #b6b6b6;
  }
  .product .detail .desc .price-count {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 20px;
  }
  .product .detail .desc .price-count .price,
  .product .detail .desc .price-count .count {
    display: inline-block;
  }
  .product .detail .desc .price-count .price {
    color: #f05050;
  }
  .product .detail .desc .price-count .price .symbol {
    font-size: 14px;
  }
  .product .detail .desc .price-count .count {
    font-size: 14px;
    color: #b6b6b6;
  }

  .pay-info {
    padding: 12px;
    .text {
      font-size: 14px;
    }
    .item {
      padding: 18px 0;
    }
  }

  .order-btn-bar {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 3;
    height: 50px;
    box-shadow: 0 2px 2px 2px #cacaca;
    background-color: #ffffff;
  }
  .order-btn-bar p {
    text-align: right;
    padding-right: 12px;
    line-height: 50px;
    margin: 0;
    color: #b6b6b6;
    overflow: hidden;
  }
  .order-btn-bar p .order-price {
    color: #f05050;
    font-weight: bold;
  }
  .order-btn-bar a {
    text-decoration: none;
  }
  .order-btn-bar .btn {
    float: right;
    width: 80px;
    margin: 0;
    line-height: 50px;
    padding: 0 15px;
    background-color: #f05050;
    text-align: center;
    color: #fff;
  }
</style>
