<template>
  <div class="order-view">
   
    <div class="product-wrap hairline">
      <div class="product">
        <div class="shop-name hairline">
          <p><i class="fa fa-home"></i> {{ shop.name }}</p>
        </div>
        <div class="detail">
          <img :src="product.photos[0]" alt="">
          <div class="desc">
            <p class="prod-name">{{ product.name }}</p>
            <p class="prod-desc">{{ product.desc }}</p>
            <p class="price-count">
              <span class="price"><span class="symbol">￥</span>{{ price }}</span>
              <span>&emsp;</span>
              <span class="count">购买数量 {{ prodCount }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="chooseCoupon"  v-if="choosedCoupon">
      <mt-popup
        style="width:100%;height:50%;overflow:scroll"
        v-model="popupVisible"
        position="bottom">
       <mt-checklist
          title="选择积分（可多选）"
          align="right"
          style="padding: 5px;"
          v-model="couponIds"
          :value="couponIds"
          :options="coupons">
       </mt-checklist>
       <div style="text-align: center;margin: 20px;border: 1px solid #d1d1d1;width: 100px; margin: 10px auto;padding: 10px;border-radius: 10px;" @click="confirmCoupon">确定</div>
    </mt-popup>
    </div>
    <div class="coupon-wrap" v-if="coupons.length" @click="showPopup">
      <mt-cell title="积分"  is-link :value="'¥' + parseFloat(choosedCoupon.couponAmount / 100).toFixed(2)"></mt-cell>
    </div>
    <div class="order-btn-bar">
      <div class="btn" @click="submitOrder">提交订单</div>
      <p>需付：<span class="order-price">￥{{ total | yuan }}</span></p>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui'
  import { getProduct, createOrder, getCouponsByOrder } from '../api/api'
  import { isDevEnv } from '../config/app'
  import { getOpenid } from '../utils'
  export default {
    props: [ 'shopId', 'prodId' ],
    name: 'Order',
    data () {
      return {
        total: 0,
        shop: {},
        product: { photos: [] },
        popupVisible: false,
        prodCount: 0,
        orderId: '123',
        price: 0,
        coupons: [],
        couponIds: [],
        choosedCoupon: { couponAmount: 0, couponIds: [] }
      }
    },
    watch: {
      couponIds: function (newVal, oldVal) {
        if (newVal !== oldVal) {
          if (newVal.length === 0) {
            this.choosedCoupon = { couponAmount: 0, couponIds: [] }
          } else {
            this.choosedCoupon.couponIds = newVal
            this.choosedCoupon.couponAmount = 0
            newVal.map(couponId => {
              let coupon = this.coupons.find(m => m.couponId === couponId)
              this.choosedCoupon.couponAmount += Number(coupon.couponAmount) * 100
            })
          }
        }
        this.total = this.getTotalFee()
      }
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
        let order = {
          total: this.getTotalFee(),
          oriTotal: Number(this.prodCount) * Number(this.price) * 100,
          thumbnail: this.product.photos[0],
          prodId: this.product.prodId,
          prodCount: this.prodCount,
          shopId: this.shop.shopId,
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
        let prodCount = Number(this.prodCount)
        let price = Number(this.price) * 100
        let couponAmount = this.choosedCoupon.couponAmount
        let totalFee = prodCount * price - couponAmount
        totalFee = totalFee < 1 ? 0 : totalFee
        return parseInt(totalFee)
      },

      async handleCoupon () {
        getCouponsByOrder({ openid: getOpenid(), product: this.product, shopId: this.shop.shopId }).then(res => {
          this.coupons = res.data.coupons
          this.coupons.map(item => {
            item.label = item.couponName
            item.value = item.couponId
          })
          this.choosedCoupon = this.coupons.length > 0 ? { couponAmount: this.coupons[0].couponAmount, couponIds: [this.coupons[0].couponId] } : { couponAmount: 0, couponIds: [] }
          this.couponIds = this.choosedCoupon.couponIds
        })
      }
    },
    async mounted () {
      this.prodCount = this.$route.query.count
      this.price = this.$route.query.price
      this.prodId = this.$route.params.prodId
      getProduct(this.prodId).then(data => {
        let product = data.data.product
        this.product = product
        this.shop = product.shop
        this.handleCoupon()
        this.total = this.getTotalFee()
      }).catch(e => {
        console.error(e)
        Toast('系统错误')
      })
    }
  }
</script>

<style scoped>
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
