<template>
  <div class="home-view">
    <div class="home-view-inner" v-show="!loading">
      <mt-tabbar v-model="selected" fixed>
        <mt-tab-item id="home">
          <div><i class="fa fa-home fa-2x" aria-hidden="true"></i></div>
          首页
        </mt-tab-item>
        <mt-tab-item id="me">
          <div><i class="fa fa-user fa-2x" aria-hidden="true"></i></div>
          我的
        </mt-tab-item>
      </mt-tabbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="home">
          <p class="no-shop-tip" v-if="shops.length === 0 && !loading">暂时没有相关门店^_^</p>
          <div class="shop-list">
            <div class="shop-card" v-for="shop in shops" :key="shop.shopId">
              <div class="title">
                <span class="shop-name">{{shop.name}}</span>
                <span class="custom-count"><router-link :to="{ name: 'Shop', params: { id: shop.shopId } }">点击进入></router-link></span>
              </div>
              <div class="shop-img">
                <router-link :to="{ name: 'Shop', params: { id: shop.shopId } }">
                  <img :src="shop.photo" alt="门店图片">
                </router-link>
              </div>
              <div class="apm-count clearfix">
                <span class="left">{{ shop.apmCount }}人正在等待剪发</span>
                <span class="right">
                  <span class="mark" v-if="shop.mark">{{ shop.mark }}</span>
                  <span v-if="shop.distance">{{shop.distance}}</span>
                </span>
              </div>
              <!-- <div class="promotional">
                <div>
                  <span class="prod-name">净剪</span>
                  <span class="price-1"> 15￥</span>
                </div>
              </div> -->
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="me">
          <div class="me-view">
            <div class="hairline">
              <div class="me-profile clearfix">
                <div class="me-avatar"><img :src="user.headimgurl" alt="用户头像"></div>
                <p class="me-info">
                  <span class="nickname">{{ user.nickname }}</span>
                </p>
              </div>
            </div>
            <div class="list-block">
              <ul>
                <li>
                  <router-link :to="{ name: 'MyBooking' }" class="item-link">
                    <div class="item-content">
                      <div class="item-media"><i class="fa fa-clock-o" aria-hidden="true"></i></div>
                      <div class="item-inner"><div class="item-title">我的预约</div></div>
                    </div>
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'MyTicket' }" class="item-link">
                    <div class="item-content">
                      <div class="item-media"><i class="fa fa-qrcode" aria-hidden="true"></i></div>
                      <div class="item-inner"><div class="item-title">我的券码</div></div>
                    </div>
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'HairPhotos', params: { photos: user.hairPhotos || [] } }" class="item-link">
                    <div class="item-content">
                      <div class="item-media"><i class="fa fa-scissors" aria-hidden="true"></i></div>
                      <div class="item-inner"><div class="item-title">我的发型</div></div>
                    </div>
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'Coupon' }" class="item-link">
                    <div class="item-content">
                      <div class="item-media"><i class="fa fa-ticket" aria-hidden="true"></i></div>
                      <div class="item-inner"><div class="item-title">我的积分</div></div>
                    </div>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { Toast } from 'mint-ui'
import { listShop, getUserInfo2 } from '../api/api'
import { getQueryValueByName, getLocation } from '../utils'

export default {
  name: 'Home',

  data () {
    return {
      selected: 'home',
      shops: [],
      user: {},
      loading: true
    }
  },

  watch: {
    selected: function (val, oldVal) {
      localStorage.setItem('fx:selectedTab', val)
    }
  },

  methods: {
    redirectToTargetView () {
      let state = getQueryValueByName('state')
      if (state) {
        if (state.startsWith('coupon-share-')) {
          this.$router.push({name: 'CouponShare', params: {couponId: state.split('-')[2] || ''}, query: { state: '' }})
        } else if (state.startsWith('pay-msg-')) {
          this.$router.push({name: 'PayNotification', query: { state: '', msgId: state.split('-')[2] || '' }})
        } else if (state.startsWith('rate-apm-')) {
          let ids = state.split('-').slice(2)
          let [shopId, apmId] = ids
          this.$router.push({name: 'RateForm', params: { shopId, apmId }, query: { state: '' }})
        } else if (state.startsWith('bookings')) {
          this.$router.push({name: 'MyBooking'})
        } else if (state.startsWith('qrcode-coupon-center-')) {
          // qrcode-coupon-center-shopid-couponid[-shareid]
          let strs = state.split('-')
          this.$router.push({
            name: 'QrcodeCouponCenter',
            params: { shopId: strs[3] },
            query: {
              shopId: strs[3],
              couponId: strs[4],
              shareId: strs.length >= 5 ? strs[5] : ''
            }
          })
        } else if (state.startsWith('coupon-center-')) {
          this.$router.push({name: 'CouponCenter', params: { shopId: state.split('-')[2] }})
        } else if (state.startsWith('my-coupon')) {
          this.$router.push({name: 'Coupon'})
        } else if (state === 'shop-bookings') {
          this.$router.push({ name: 'MyBooking' })
        }
      }
    },

    listShop (params) {
      listShop(params).then(data => {
        if (data.data && data.data.shops) {
          this.shops = data.data.shops
        }
        this.loading = false
        this.$indicator.close()
      }).catch(e => {
        console.error(e)
        Toast('获取商店列表失败')
        this.loading = false
        this.$indicator.close()
      })
    }
  },

  beforeMount () {
    this.redirectToTargetView()
  },

  mounted () {
    let selectedTab = localStorage.getItem('fx:selectedTab') || 'home'
    if (window._target_view === 'user') {
      window._target_view = null // use only once
      selectedTab = 'me'
    }

    let targetView = Cookies.get('TARGET_VIEW')
    console.log(targetView)
    if (targetView) {
      selectedTab = targetView
      Cookies.set('TARGET_VIEW', '')
    }

    this.$indicator.open({
      text: '让发型更出色，让生活更精彩',
      spinnerType: 'fading-circle'
    })

    getLocation().then(res => {
      let latitude = res.latitude      // 纬度，浮点数，范围为90 ~ -90
      let longitude = res.longitude    // 经度，浮点数，范围为180 ~ -180。
      // let speed = res.speed         // 速度，以米/每秒计
      // let accuracy = res.accuracy   // 位置精度
      this.listShop({ latitude, longitude })
    }).catch(e => {
      console.error(e)
      listShop({})
    })

    /* eslint-disable */
    let msg = '获取用户信息失败失败'
    getUserInfo2().then(data => {
      let user = data.data.user
      this.user = user
    }).catch(e => {
      console.error(e)
      Toast(msg)
    })

    this.selected = selectedTab
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

  .mint-tabbar > .mint-tab-item.is-selected {
    background-color: transparent;
  }

  .home-view {
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    .home-view-inner {
      width: 100%;
      height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
    }

    .no-shop-tip {
      text-align: center;
    }

    .shop-list {
      padding: 10px 7px;
      margin-bottom: 55px;
    }

    .shop-card {
      background-color: #fff;
      margin-bottom: 7px;
    }

    .shop-card .title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 12px;
    }
    .title .shop-name {
      font-weight: bold;
      font-size: 16px;
    }
    .title .custom-count {
      color: #a0a0a0;
    }
    .title .custom-count a {
      color: #a0a0a0;
      text-decoration: none;
    }
    .shop-img img {
      width: 100%;
      height: 46vw;
    }
    .promotional {
      padding: 8px;
      display: flex;
      flex-direction: row-reverse;
    }
    .prod-name, .price-1, .price-2 {
      font-weight: bold;
    }
    .price-1, .price-2 {
      font-size: 14px;
    }
    .price-1 {
      color: red;
    }
    .price-2 {
      color: #a0a0a0;
      text-decoration: line-through;
    }

    .me-profile {
      background-color: #fff;
      margin-top: 10px;
      padding: 10px 14px 10px 12px;
    }
    .me-profile .me-avatar {
      position: relative;
      width: 64px;
      height: 64px;
      margin-right: 10px;
      float: left;
    }
    .me-profile .me-avatar img {
      width: 100%;
    }
    .me-info {
      margin: 0;
    }
    .me-info .nickname,
    .me-info .sex {
      display: block;
    }
    .apm-count {
      padding: 8px;
      font-size: 14px;
      .left {
        float: left;
      }
      .right {
        float: right;
        .mark {
          color: #a00b0b;
        }
      }
    }
  }
</style>
