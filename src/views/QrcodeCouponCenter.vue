<template>
  <div class="coupon-center-view page">
    <coupon-list2 :coupons="coupons" v-on:getCoupon="handleGetCoupon"></coupon-list2>
    <coupon-user-list :users="users"></coupon-user-list>
    <section style="height:52px;">
      <mt-navbar class="page-part" v-model="selectedCommentList">
        <mt-tab-item id="1">精选</mt-tab-item>
        <mt-tab-item id="2">最新</mt-tab-item>
      </mt-navbar>
    </section>
    <mt-tab-container v-model="selectedCommentList">
      <mt-tab-container-item id="1">
        <rating-list :row="2" :status="2" :shopId="shopId" loadonce></rating-list>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <rating-list :row="2" :status="1" :shopId="shopId" loadonce></rating-list>
      </mt-tab-container-item>
    </mt-tab-container>
    <router-link  :to="{name: 'Ratings', params:{ shopId: shopId}}" >
      <mt-button type="default" size="large">查看更多评论</mt-button>
    </router-link>
    <h3>男生发型</h3>
    <mt-swipe :auto="4000">
      <mt-swipe-item>
        <div class="slide">
          <div class="slide-content">
            <img src="../assets/images/m-fx-1.png" />
          </div>
        </div>
      </mt-swipe-item>
      <mt-swipe-item>
        <div class="slide">
          <div class="slide-content">
            <img src="../assets/images/m-fx-2.png" />
          </div>
        </div>
      </mt-swipe-item>
      <mt-swipe-item>
        <div class="slide">
          <div class="slide-content">
            <img src="../assets/images/m-fx-3.png" />
          </div>
        </div>
      </mt-swipe-item>
    </mt-swipe>
    
    <h3>女生发型</h3>
    <mt-swipe :auto="4000">
      <mt-swipe-item>
        <div class="slide">
          <div class="slide-content">
            <img src="../assets/images/wm-fx-1.jpg" />
          </div>
        </div>
      </mt-swipe-item>
      <mt-swipe-item>
        <div class="slide">
          <div class="slide-content">
            <img src="../assets/images/wm-fx-2.jpg" />
          </div>
        </div>
      </mt-swipe-item>
      <mt-swipe-item>
        <div class="slide">
          <div class="slide-content">
            <img src="../assets/images/wm-fx-3.jpg" />
          </div>
        </div>
      </mt-swipe-item>
    </mt-swipe>

    <router-link :to="{ name: 'Home' }"  class="link-btn">
      <mt-button size="large">个人中心</mt-button>
    </router-link>
    <section id="mask" class="mask" v-show="showMask" @click="showMask = false">
      <img style=" width: 375px;height: 365px;position: absolute;right: 10px;" src="../assets/images/share-guide.jpeg">
    </section>
  </div>

</template>

<script>
import CouponList2 from '../components/CouponList2.vue'
import { addUserCoupon, listUserCoupon, listUserByCouponId, getCouponByCouponId } from '../api/api'
import RatingList from '../components/RatingList.vue'
import CouponUserList from '../components/CouponUserList.vue'

export default {
  name: 'CouponCenter',

  components: {
    CouponList2, RatingList, CouponUserList
  },

  data () {
    return {
      shopId: this.$route.query.shopId,
      couponId: this.$route.query.couponId,
      shareId: this.$route.query.shareId,
      coupons: [],
      userCoupons: [],
      ratings: [],
      users: [],
      currentCoupon: {},
      showMask: false,
      selectedCommentList: '1'
    }
  },

  methods: {
    listCoupon () {
      listUserCoupon().then(data => {
        this.userCoupons = data.data.coupons || []
        return getCouponByCouponId(this.couponId)
      }).then(data => {
        this.coupons.push(data.data.coupon)
        // let currentTime = Date.now()
        // const filterCurrent = item => {
        //   return currentTime < item.endTimeStamp && item.couponCount > 0
        // }
        // this.coupons = this.coupons.filter(filterCurrent)

        // 直接显示分享提示
        // this.handleGetCoupon(this.coupons[0])
      }).catch(e => {
        this.$toast(`系统错误：${e.message}`)
      })
    },

    wxShare () {
      /* eslint-disable */
      let that = this
      // const config = await getWxConfig()
      // wx.config(config.data);
      let shareUrl = `http://test-shop.fanxify.com/shop-home#/redirect?view=coupon-center&shopId=${that.shopId}&shareId=1` // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      let imgUrl = 'http://test-shop.fanxify.com/static/img/share-logo.jpeg' // 分享图标
      wx.ready(function(){
        // 分享到朋友圈
        wx.onMenuShareTimeline({
            title: '赞！你我身边超级好评美发店，来免费领取积分', // 分享标题
            link: shareUrl,
            imgUrl: imgUrl,
            success: function () {
              // 用户确认分享后执行的回调函数
              that.showMask = false
              that.addCoupon()
              that.$toast('分享成功')
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
              that.showMask = false
            }
        })
        // 分享给朋友
        wx.onMenuShareAppMessage({
          title: '赞！你我身边超级好评美发店，来免费领取积分', // 分享标题
          desc: '众多品质客户推荐，看看有没适合我的发型', // 分享描述
          link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: imgUrl,
          success: function () {
            that.showMask = false
            that.addCoupon()
            that.$toast('分享成功')
          },
          cancel: function (e) {
            that.showMask = false
          }
        })
      })
      wx.error(function(res){
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      })
    },

    handleGetCoupon (coupon) {
      if (!coupon) {
        return
      }

      for (let c of this.userCoupons) {
        if (c.couponId === coupon.couponId) {
          this.$toast('你已经领用过该券，请不要重复领用')
          return
        }
      }
      this.currentCoupon = coupon
      // 进去分享页面不需要再分享
      // let state = getQueryValueByName('state')
      // let shareId = state.split('-')
      // if (shareId.length === 4) {
      //   this.addCoupon()
      //   return
      // }
      this.showMask = true
    },

    async listCouponUser () {
      let users = (await listUserByCouponId(this.couponId)).data.users
      users = users.slice(0, 15)
      this.users = users
    },

    addCoupon () {
      addUserCoupon( this.currentCoupon.couponId).then(data => {
        this.$toast('领券成功！你可以在个人中心查看你的积分，下单的时候可以使用哦！')
      }).catch(e => {
        if (e.response.status === 409) {
          this.$toast('积分已经领完了')
        } else if (e.response.status === 403) {
          this.$toast('你已经领过该积分，还没使用哦')
        }else {
          this.$toast(`积分不存在`)
        }
      })
    }
  },

  mounted () {
    this.listCoupon()
    this.listCouponUser()
    this.wxShare()
  }
}
</script>

<style lang="scss">
.coupon-center-view {
  min-height: 100vh;
  background: #f6f7f8;
  padding-top: 10px;
  .scroll_box {
    margin-top: 0;
  }

  .mint-swipe {
    height: 50vw;
  }
  .slide {
    width: 100%;
    height: 50vw;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    line-height: 180px;
  }
  .slide .slide-content {
    position: relative;
    overflow: hidden;
    height: 100%;
  }
  .slide .slide-content img {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
  }

}
.link-btn {
  display: block;
  margin: 12px;
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
