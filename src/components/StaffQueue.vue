<template>
  <div class="staff-list-view">
    <div class="list-inner">
      <ul>
        <li v-for="staff in staffs" :key="staff.userid" class="staff-item">
          <router-link :to="{ name: 'StaffIntro', params: { staffId: staff.userid, shopId: staff.shop }, query: { category, workstatus: staff.status } }" tag="div">
            <div class="media">
              <div class="media-left">
                <div class="avatar" slot="icon">
                  <img :src="staff.photo" alt="头像">
                </div>
              </div>
              <div class="media-body">
                <div class="details">
                  <p class="staff-name">{{ staff.username }}</p>
                  <mt-badge v-if="staff.intro" class="staff-intro" color="#776d6c" size="small">{{ staff.intro }}</mt-badge>
                  <mt-badge v-if="staff.mark" class="staff-intro" color="#6aaefd" size="small">{{ staff.mark }}</mt-badge>
                  <span class="staff-price">
                    <span>¥{{getDecimal(staff.price, 1).split('.')[0]}}</span><span class="decimal--small">.{{getDecimal(staff.price, 1).split('.')[1]}}</span>
                  </span>
                </div>
                <div class="media-bottom">
                  <p class="wait-status">{{staff.apmCount > 0 ? `前面还有 ${staff.apmCount} 人` : '无需等待，可立即开始'}}</p>
                  <mt-button
                    type="primary"
                    size="small"
                    v-if="staff.status === 0"
                    v-bind:class="{'full-width': category !== '4', 'short-width': category === '4'}"
                    @click.prevent="handleMakeAppointment(staff)"
                    class="appointment-btn">取号</mt-button>
                  <mt-button
                    type="default"
                    size="small"
                    v-if="staff.status === 3"
                    v-bind:class="{'full-width': category !== '4', 'short-width': category === '4'}"
                    class="off-work-btn">下班了</mt-button>
                  <mt-button
                    type="default"
                    size="small"
                    v-if="staff.status === 4"
                    v-bind:class="{'full-width': category !== '4', 'short-width': category === '4'}"
                    class="off-work-btn">快下班了</mt-button>
                  <router-link :to="{name: 'Product', params:{ shopId: staff.shop, prodId: category }, query: { cateId: category, staffId: staff.userid }}" v-if="category === '4'">
                    <mt-button 
                    type="primary" 
                    size="small"
                    class="appointment-btn">价格</mt-button>
                  </router-link>
                </div>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <!-- 导航按钮，当分类为洗剪或净剪的时候展示 -->
    <div class="nav-btn"
      v-if="category === '1' || category === '2'"
      v-bind:class="{'status-1': category === '1', 'status-2': category === '2'}"
      @click="handleNavBtn">
      <span class="txt">{{ navBtnTxt }}</span>
    </div>
  </div>
</template>

<script>
import { listStaff, makeAppointment } from '../api/api'
import { getDecimal } from '../utils'

export default {
  name: 'StaffList',

  props: ['shopId', 'cateId'],

  computed: {
    navBtnTxt () {
      return this.category === '1'
             ? '去更优惠的净剪看看'
             : '去更便于剪发的洗剪看看'
    }
  },

  data () {
    return {
      staffs: [],
      value: 45,
      category: this.cateId
    }
  },

  methods: {
    getDecimal (priceNum, len, dir) {
      return getDecimal(priceNum, len, dir)
    },
    fetchData () {
      listStaff(this.shopId, this.category).then(data => {
        this.staffs = data.data.staffs
      }).catch(e => {
        console.error(e)
      })
    },
    handleMakeAppointment (staff) {
      this.$messagebox({
        title: '确定取号？',
        message: `<h1 style="color:#ff5000">¥${staff.price}</h1><p style="margin:0;">当前服务发型师最低价格</p>如过号需重新取号, 请安排好时间到店`,
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(flag => {
        if (flag !== 'cancel') {
          return makeAppointment(this.shopId, staff.userid, this.cateId)
            .then(() => {
              return this.$messagebox({
                title: '取号成功',
                message: `<p style="margin: 0;">亲，出门消费前先取号，后根据收到的进度消息提前到店更合理哦，避免到店取号时才发现前面已等候多人。</p><p style="margin:0;">让美发减少等待<br>从提前取号开始</p>理发后请发型师将发型照片存到个人中心，消费后请对本次服务评价并领取积分优惠券`,
                showCancelButton: true,
                confirmButtonText: '我知道了',
                cancelButtonText: '去看看发型'
              })
            })
            .then(flag => {
              if (flag === 'cancel') {
                window.location.href = 'http://www.fanxify.com/app/index.php?i=3&c=entry&m=ewei_shopv2&do=mobile&r=diypage&id=39'
                return
              }
              this.$router.push({ name: 'MyBooking' })
            })
        }
      }).catch(e => {
        console.error(e)
        if (e.message.indexOf('409') > 0) {
          this.$toast('你已预约，请勿重复取号')
        } else {
          this.$toast(`预约失败。请稍后重试：${e.message}`)
        }
      })
    },
    handleNavBtn () {
      let targetCateId = this.category === '1' ? '2' : '1'
      this.$router.push({
        name: 'Staffs',
        params: {
          shopId: this.shopId,
          cateId: targetCateId
        }
      })
      this.category = targetCateId
      this.fetchData()
    }
  },

  mounted () {
    this.fetchData()
    console.log('abc')
  }
}
</script>

<style lang="scss" scoped>
.tips{
  color:#ff5000;
  margin: 0;
}
.staff-list-view {
  background: #fff;
  margin-top: 15px;
  padding-bottom: 80px;
  .staff-item {
    padding: 12px;
    margin: 10px;
    border-radius: 6px;
    min-height: 140px;
    background: #f9f9f9;
  }
  .avatar {
    width: 100px;
    height: 150px;
    // border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .staff-name, .wait-time {
    font-size: 24px;
    margin: 0;
  }
  .staff-intro{
    margin-top: 2px;
  }
  .staff-price{
    color:#ff5000;
    float: right;
    font-weight: bold;
    font-size: 24px;
    line-height: 0;
    .decimal--small{
      display: inline;
      font-size: 62%;
    }
  }

  .media{
    height: 100%;
  }
  .media-bottom{
    margin-top: 40px;
    // margin: 10px 0 0 65px;
  }
  .wait-status{
    margin: 10px 0;
    color:#888888;
  }
  .wait-time {
    padding-top: 4px;
    font-size: 12px;
    color: #969696;
  }
  .btn-box {
    width: 76px;
  }
  .appointment-btn {
    font-size: 13px;
    width: 76px;
  }
  .off-work-btn {
    font-size: 13px;
    width: 100px;
  }

  .nav-btn {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 9999;
    width: 100vw;
    height: 60px;
    text-align: center;
    &.status-1 {
      background-color: #ff5000;
    }
    &.status-2 {
      background-color: #00aeff;
    }
    .txt {
      line-height: 60px;
      font-size: 18;
      color: #f9f9f9;
    }
  }

  .full-width {
    width: 100%;
  }
  .short-width {
    width: 100px;
  }
}
</style>
