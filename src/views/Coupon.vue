<template>
<div class="page">
    <section class="fixed_box">
       <mt-navbar class="page-part" v-model="selected" fixed>
        <mt-tab-item id="0">未生效</mt-tab-item>
        <mt-tab-item id="1">未使用</mt-tab-item>
        <mt-tab-item id="2">已使用</mt-tab-item>
        <mt-tab-item id="3">已过期</mt-tab-item>
       </mt-navbar>
    </section>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="0">
        <coupon-list :coupons="waitActiveCoupon" :couponType="3"></coupon-list>
      </mt-tab-container-item>
      <mt-tab-container-item id="1">
        <coupon-list :coupons="unUsedCoupon" :couponType="0"></coupon-list>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <coupon-list :coupons="usedCoupon" :couponType="1"></coupon-list>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <coupon-list :coupons="overdueCoupon" :couponType="2"></coupon-list>  
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import CouponList from '../components/CouponList.vue'
import { listUserCoupon } from '../api/api'

export default {
  name: 'Coupon',
  data () {
    return {
      selected: '1',
      coupons: [],
      waitActiveCoupon: [],
      usedCoupon: [],
      unUsedCoupon: [],
      overdueCoupon: []
    }
  },
  components: {
    CouponList
  },
  methods: {
    listCoupon () {
      listUserCoupon().then(data => {
        this.coupons = data.data.coupons || []
        let currentTime = Date.now()
        const filterUsed = item => {
          return item.used
        }
        const filterUnUsed = item => {
          return currentTime >= item.activeTimeStamp && currentTime < item.endTimeStamp && !item.used
        }
        const filterOverdue = item => {
          return currentTime > item.endTimeStamp && !item.used
        }
        const filterWaitActive = item => {
          return currentTime < item.activeTimeStamp && !item.used
        }
        this.waitActiveCoupon = this.coupons.filter(filterWaitActive)
        this.usedCoupon = this.coupons.filter(filterUsed)
        this.unUsedCoupon = this.coupons.filter(filterUnUsed)
        this.overdueCoupon = this.coupons.filter(filterOverdue)
      }).catch(e => {
        console.log(e)
        this.$toast(`系统错误：${e.message}`)
      })
    }
  },
  mounted () {
    this.listCoupon()
  }
}
</script>

<style lang="scss" scoped>

</style>
