
<template>
  <div class="page">
    <div class="banner">
      <img src="../assets/images/shop-banner.jpg" alt="">
    </div>
    <div class="couponContainer">
      <div class="infoBar">
        分享给朋友完成领取
      </div>
      <div class="coupon" v-if="coupon.couponId">
          <div class="topDot"></div>
          <div class="bottomDot"></div>
          <div class="left">
            <span>￥</span><strong>{{coupon.couponAmount}}</strong>
          </div>
          <div class="right">
            <p>{{coupon.couponName}}</p>
            <ul>
              <li>满{{coupon.orderMinAmount}}元可用</li>
              <li>有效期至{{ coupon.endTimeStamp | formatDate('{y}-{m}-{d}') }}</li>
            </ul>
          </div>
        </div>
    </div>
    <div class="bottom-button">
      <mt-button type="danger" size="large" @click="showTips" v-if="!coupon.isReceived">立即领取</mt-button> 
      <mt-button type="danger" size="large" @click="goHome" v-if="coupon.isReceived">立即使用</mt-button> 
    </div>
    <div>
      <rating-list :data="ratings" ></rating-list>
    </div>
    <section id="mask" class="mask" v-show="show" @click="show = false">
      <img style=" width: 165px;height: 114px;position: absolute;right: 10px;" src="../assets/images/guide.png">
    </section>

  </div>
</template>

<script>
import { addUserCoupon, getUserCoupon, listComment } from '../api/api'
import RatingList from '../components/RatingList.vue'

export default {
  name: 'CouponShare',
  data () {
    return {
      couponId: '',
      show: false,
      shopId: '',
      coupon: {},
      ratings: []
    }
  },
  components: {
    RatingList
  },
  methods: {
    showTips () {
      this.show = true
    },
    goHome () {
      this.$router.push({ name: 'Home', query: { state: 'shop-home' } })
    },
    addCoupon () {
      addUserCoupon(this.couponId).then(data => {
        this.getCouponDetail()
      }).catch(e => {
        console.log(e)
        this.$toast(`系统错误：${e.message}`)
      })
    },
    getCouponDetail () {
      this.couponId = this.$route.params.couponId
      if (!this.couponId) {
        this.$toast(`积分不存在`)
        return
      }
      this.$indicator.open()
      getUserCoupon(this.couponId).then(data => {
        this.coupon = data.data.coupons[0]
        listComment(this.coupon.shopId, 1, 5).then(res => {
          if (!res.count) {
            return
          }
          this.ratings = res.comments
        })
        this.$indicator.close()
      }).catch(e => {
        this.$indicator.close()
        console.log(e)
        this.$toast(`${e.message}`)
      })
    },

    wxShare () {
      /* eslint-disable */
      let that = this
      // const config = await getWxConfig()
      // wx.config(config.data);
      wx.ready(function(){
        wx.onMenuShareAppMessage({
          title: '凡希发艺', // 分享标题
          desc: '一起领取积分吧~', // 分享描述
          link: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx546482739ca755c0&redirect_uri=http%3A%2F%2Ftest-shop.fanxify.com%2Fredirect%2Fcoupon-share-${that.couponId}&response_type=code&scope=snsapi_userinfo&state=coupon-share-${that.couponId}#wechat_redirect`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: '../assets/images/ticket-icon.png', // 分享图标
          success: function () {
            that.addCoupon()
            that.show = false
            that.$toast('分享成功')
          }
        })
      })
      wx.error(function(res){
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      })
    }
  },
  mounted () {
    this.getCouponDetail()
    this.wxShare()
  }
}
</script>

<style lang="scss" scoped>
.page{
  height: 100%;
  position: relative;
}
.banner img{
  display: block;
  width: 100vw;
  height: 50vw;
}
.couponContainer{
  padding: 20px;
  background: #fff;
  
  .infoBar{
    text-align: center;
    padding:0 0 20px;
  }
}

.coupon{
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 100.5px;
  background-color: #d4d4d4;
  border-radius: 0.5rem;
  color: #fff; 
  background-color:#f03855;
  .left{
    position: absolute;
    left: 0;
    top: 0;
    width: 110px;
    height: 100px;
    border-right: 1px dashed #f6f7f8;
    text-align: center;
    line-height: 100px;
    span{
      font-size:25px;
    }
    strong{
      font-size: 40px;
    }
  }
  .right{
    position:absolute;
    left:110px; top:0;
    width:175px;
    height:50px;
    padding:25px 0 0 25px;
    p{
      padding:0;
      margin:0;
    }
    ul{
      padding-left:13px;
      font-size: 12px;
      line-height: 16px;
      li{
        list-style-type:disc;
      }
    }
  }
}
.topDot, .bottomDot{
  position:absolute;
  left: 103px;
  width:1rem;
  height:0.5rem;
  background-color: #ececec;
}
.topDot{
  top:0;
  border-radius:0 0 0.5rem 0.5rem;
}
.bottomDot{
  bottom:0;
  border-radius:0.5rem 0.5rem 0 0;
}
.bottom-button{
 
  width: 100%;
  padding: 0 25px;
  box-sizing: border-box;
  background: #fff;
}
.mask {     
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(8, 8, 8, .8);
  z-index: 10;
  color: #fff;
  .text{
    padding: 36px;
    font-size: 20px;
  }
} 
</style>
