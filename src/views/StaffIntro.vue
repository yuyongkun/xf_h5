<template>
  <div class="staff-intro-view">
    <div class="banner">
      <img src="../assets/images/shop-banner.jpg" alt="">
    </div>
    <div class="staff-basic-info">
      <mt-cell :title="staff.title">
        <span v-if="staff.price > 0">￥{{ staff.price }}.0</span>
        <div class="avatar" slot="icon">
          <img :src="staff.photo" width="60" height="60">
        </div>
      </mt-cell>
    </div>
    <div class="info-block service-rating">
      <h3 class="block-title rating-title">服务评价</h3>
      <div class="rating-num">
        <div class="rating-detail rating-percent">
          <span class="num">{{ commentStats.goodRatePercent }}</span>
          <span class="tip">好评率</span>
        </div>
        <div class="rating-detail rating-count">
          <span class="num">{{ commentStats.rateCount }}</span>
          <span class="tip">评论数</span>
        </div>
      </div>
      <div class="rating-count">
        <mt-button size="small">1星 {{commentStats.star1}}</mt-button>
        <mt-button size="small">2星 {{commentStats.star2}}</mt-button>
        <mt-button size="small">3星 {{commentStats.star3}}</mt-button>
        <mt-button size="small">4星 {{commentStats.star4}}</mt-button>
        <mt-button size="small">5星 {{commentStats.star5}}</mt-button>
      </div>
      <rating-list :row="1" :status="1" :shopId="shopId" :filter-staff-id="staffId"></rating-list>
      <div class="check-all-rating">
        <router-link :to="{ name: 'StaffRatings', params: { shopId, staffId } }">
          <mt-button size="small" type="primary">查看全部评论</mt-button>
        </router-link>
      </div>
    </div>
    <div class="info-block staff-resume">
      <h3 class="block-title">剪发经验</h3>
      <div class="career-years"><span>10年剪发经验</span></div>
      <ul class="jobs">
        <li v-for="(job, index) in jobs" :key="index">
          <p class="shop-title">{{ job.company }} - {{ job.title }}</p>
          <p class="jop-time">在职时间：{{ job.startTime }}至{{ job.endTime }}</p>
        </li>
      </ul>
    </div>

    <div class="info-block staff-works">
      <h3 class="block-title">Ta的作品</h3>
      <div class="works">
        <el-carousel class="work-carousel" height="450px" arrow="always" autoplay>
          <el-carousel-item v-for="(work, index) in works" :key="index">
            <div class="work-box">
              <img :src="work.photos[0]" alt="" @click="showPhotoPopup(index)">
              <div class="work-detail">
                <ul>
                  <li>
                    <span class="detail-cate">[发量]</span>&emsp;
                    <span class="detail-option" :class="{ 'highlight': work.hairAmount === '少' }">少</span>
                    <span class="detail-option" :class="{ 'highlight': work.hairAmount === '普通' }">普通</span>
                    <span class="detail-option" :class="{ 'highlight': work.hairAmount === '多' }">多</span>
                  </li>
                  <li>
                    <span class="detail-cate">[发质]</span>&emsp;
                    <span class="detail-option" :class="{ 'highlight': work.hairQuality === '软' }">软</span>
                    <span class="detail-option" :class="{ 'highlight': work.hairQuality === '普通' }">普通</span>
                    <span class="detail-option" :class="{ 'highlight': work.hairQuality === '硬' }">硬</span>
                  </li>
                  <li>
                    <span class="detail-cate">[脸型]</span>&emsp;
                    <span class="detail-option" :class="{ 'highlight': work.faceShape === '圆形' }">圆形</span>
                    <span class="detail-option" :class="{ 'highlight': work.faceShape === '椭圆' }">椭圆</span>
                    <span class="detail-option" :class="{ 'highlight': work.faceShape === '四角' }">四角</span>
                    <span class="detail-option" :class="{ 'highlight': work.faceShape === '逆三角' }">逆三角</span>
                    <span class="detail-option" :class="{ 'highlight': work.faceShape === '菱形' }">菱形</span>
                    <span class="detail-option" :class="{ 'highlight': work.faceShape === '正三角' }">正三角</span>
                  </li>
                </ul>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div> <!-- .staff-works end -->

    <div class="info-block staff-video">
      <h3 class="block-title">Ta的视频</h3>
      <div class="videos">
        <el-carousel class="video-carousel" arrow="always" autoplay>
          <el-carousel-item v-for="(video, index) in videos" :key="index">
            <div class="video-box">
              <video :src="video" controls="controls" preload="auto"></video>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>

    <div class="apm-btn">
      <mt-button v-if="staff.status === 0" size="large" type="primary" @click="handleMakeAppointment">取号</mt-button>
      <mt-button v-if="staff.status === 4" size="large" type="default">快下班了</mt-button>
      <mt-button v-if="staff.status === 3" size="large" type="default">下班了</mt-button>
    </div>

    <mt-popup
      class="photos-popup"
      v-model="photoPopupVisible"
      popup-transition="popup-fade">
      <el-carousel class="photo-carousel" height="320px" arrow="always" autoplay>
        <el-carousel-item v-for="(photo, index) in popupPhotos" :key="index">
          <div class="photo-box">
            <img :src="photo" alt="">
          </div>
        </el-carousel-item>
      </el-carousel>
    </mt-popup>
  </div>
</template>

<script>
  import RatingList from '../components/RatingList.vue'
  import { getStaff, getStaffCommentStats, makeAppointment } from '../api/api'

  export default {
    name: 'Blank',
    components: { RatingList },
    data () {
      return {
        staffId: this.$route.params.staffId,
        shopId: this.$route.params.shopId,
        category: this.$route.query.category,
        staff: {},
        commentStats: {
          star1: 0,
          star2: 0,
          star3: 0,
          star4: 0,
          star5: 0,
          rateCount: 0,
          score: 5
        },
        jobs: [],
        works: [],
        videos: [],
        ratings: [],

        photoPopupVisible: false,
        popupPhotos: []
      }
    },
    methods: {
      async getStaffData () {
        let resp = await getStaff(this.staffId, this.category)
        let staff = resp.data.staff
        let { jobs, works, videos } = staff.personalData
        this.jobs = jobs
        this.works = works
        this.videos = videos
        staff.title = `${staff.nickname} - ${staff.intro}`
        this.staff = staff

        resp = await getStaffCommentStats(this.staffId)
        let stats = resp.data.stats
        stats.goodRatePercent = `${((stats.star5 + stats.star4) * 100 / stats.rateCount).toFixed(2)}%`
        this.commentStats = stats
      },
      async showPhotoPopup (index) {
        this.popupPhotos = this.works[index].photos
        this.photoPopupVisible = true
      },
      handleMakeAppointment () {
        let staff = this.staff
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
              .then(() => {
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
      }
    },
    mounted () {
      this.getStaffData()
    }
  }
</script>

<style lang="scss">
  .staff-intro-view {
    position: relative;
    .banner {
      img {
        display: block;
        max-width: 100%;
      }
    }
    .staff-basic-info {
      .avatar {
        display: inline-block;
        padding: 8px 8px 8px 0;
      }
    }

    .info-block {
      background: #fff;
      .block-title {
        padding: 32px 0 16px 16px;
      }
    }

    .service-rating {
      .rating-count {
        padding: 8px;
        display: flex;
        justify-content: space-around;
        flex-direction: row;
      }
      .rating-num {
        display: flex;
        justify-content: space-around;
        flex-direction: row;
        padding-bottom: 20px;
        .rating-detail {
          text-align: center;
          span {
            display: block;
          }
          .num {
            font-size: 18px;
          }
          .tip {
            padding-top: 6px;
            font-size: 12px;
            color: #d3d3d3;
          }
        }
      }
      .check-all-rating {
        text-align: center;
        padding: 8px 0 16px 0;
      }
    }

    .staff-resume {
      .career-years {
        padding-left: 16px;
        span {
          color: #fff;
          background: #000000;
          padding: 4px 8px;
          font-size: 14px;
        }
      }
      .jobs {
        padding: 24px 16px;
        li {
          margin-bottom: 12px;
          p {
            margin: 0;
          }
          .shop-title {
            font-size: 14px;
            font-weight: bold;
            padding-bottom: 4px;
          }
          .jop-time {
            font-size: 12px;
            color: #a3a3a3;
          }
        }
      }
    }

    .staff-works {
      .works {
        padding: 0 16px 16px;
        .mint-swipe {
          height: 450px;
        }
        .work-carousel {
          width: 100%;
        }
        .work-box {
          width: 100%;
          height: 450px;
          border-radius: 6px;
          background: #a3a3a3;
          overflow: hidden;
          position: relative;
          img {
            width: 100%;
            height: 100%;
          }
          .work-detail {
            width: 100%;
            padding: 12px 8px;
            font-size: 12px;
            position: absolute;
            left: 0;
            bottom: 0;
            color: #a3a3a3;
            background: rgba(0, 0, 0, .8);
            .detail-cate {
              color: #fff;
            }
            .detail-option {
              display: inline-block;
              width: 40px;
              margin-left: 4px;
              &.highlight {
                color: #fff;
              }
            }
            li {
              margin-bottom: 4px;
            }
          }
        }
      }
    }

    .photo-popup {
      .mint-swipe {
        height: 450px;
        width: 100%;
      }
    }
    .photo-carousel {
      width: 100vw;
    }
    .photo-item {
      position: relative;
    }
    .photo-box {
      width: 100vw;
      img {
        width: 100%;
        height: auto;
      }
    }
    .video-carousel {
      width: 100vw;
      min-height: 50vw;
      .video-box {
        width: 100vw;
      }
      video {
        width: 100%;
        height: auto;
      }
    }
    .apm-btn {
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 88;
      width: 100%;
      height: 56px;
      background: #fff;
    }
  }
</style>
