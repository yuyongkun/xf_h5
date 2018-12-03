<template>  
    <div class="content">
      <div class="tips" v-if="bookings.length <= 0">
        <i class="iconfont">&#xe62d;</i>
        <p class="text">暂无相关预约</p>
      </div>
      <!-- <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="0"> -->
      <ul>
          <li class="bookItem" :key="booking.id" v-for="booking in bookings" >
            <div class="book">
               <div class="header vux-1px-b">
                    <div class="left">
                      <span class="title">{{booking.staff.username}} <span class="badge">/ {{ booking.staff.intro }}</span></span>
                      <span class="sub">{{booking.shop.address}}</span><br>
                      <span class="time sub">{{ booking.createTime | formatDate }}</span>
                    </div>
                    <div class="right">
                      <span class="bookingStatus" v-bind:class="{ waiting: booking.status == 0, cancel: booking.status == 3 }">{{booking.status | formatStatusText}}</span>
                    </div>
              </div>
              <!-- <div class="product-info vux-1px-b">
                <div class="product">洗剪吹</div>
                <div class="price">
                  <span>¥45.0</span>
                </div>
              </div> -->
              <div class="wait-info vux-1px-b" v-if="booking.status === 0">  
                  <div class="col wait-no">
                    <span>{{booking.waitNo}}</span>
                    <span>排队号码</span>
                  </div>
                  <div class="col category">
                    <span>{{booking.category | formatCategory  }}</span>
                    <span>预约项目</span>
                  </div>
                  <div class="col wait-count">
                    <span>{{booking.waitPeople}}</span>
                    <span>前面人数/人</span>
                  </div>
                  <!-- 因为业务模式的关系，目前无法准确统计等待时间，故不显示 -->
                  <!-- <div class="col wait-time">
                    <span v-bind:class="{ blur: booking.updated }">{{booking.waitTime}}</span>
                    <span>预计等待/分钟</span>   
                  </div>  -->
              </div>

              <div class="bottom-btn" v-if="booking.status === 0">  
                <mt-button type="default" size="large"   @click="cancelBooking(booking)">取消排队</mt-button>
              </div>
              <div class="bottom-btn" v-if="booking.status === 2 && showRateBtn">  
                <mt-button type="default" size="large"   @click="rateBooking(booking)">评价</mt-button>
              </div>
            </div>
          </li>
      </ul>
    </div>
</template>

<script>
import { cancelAppointment } from '../api/api'
import { isDevEnv } from '../config/app'

export default {
  name: 'BookingList',

  data () {
    return {
      page: 1,
      row: 10,
      total: 0,
      loading: false,
      showRateBtn: !isDevEnv
    }
  },

  props: ['bookings'],

  filters: {
    formatStatusText: function (status) {
      switch (status) {
        case 0:
          return '排队中'
        case 1:
          return '服务中'
        case 2:
          return '已完成'
        case 3:
          return '已取消'
      }
    }
  },

  methods: {
    loadMore () {
      this.loading = true
      this.$indicator.open()
      // todo fetchData
      this.loading = false
    },
    cancelBooking (booking) {
      this.$messagebox.confirm('取消后排队信息无法恢复，确定取消？').then(() => {
        return cancelAppointment(booking.apmId)
      }).then(() => {
        this.$toast('取消成功')
        this.updateList()
      }).catch(e => {
        this.$toast(`系统错误：${e.message}`)
        console.error(e)
      })
    },
    rateBooking (booking) {
      // check if rated
      let rated = false
      if (!rated) {
        this.$router.push({
          name: 'RateForm',
          params: { shopId: booking.shopId, staffId: booking.staffId, apmId: booking.apmId }
        })
      }
    },
    updateList () {
      this.$emit('updateBookingList')
    }
  },

  mounted () {
    console.log(this.bookings)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/styles/variable';
@import '../assets/styles/icon';
.tips{
  text-align: center;
  padding-top: 50%;
  .iconfont{
    opacity: 0.14;
    font-size: 5rem;
    color:#000;
    line-height:5rem;
  }
  .text{
    color: #aaa;
    font-size: 1rem;
  }
}
.content{
    margin: 0 8px;
    padding-top: 60px;
      .bookItem{
        background: #fff;
        border-radius: 4px;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
        margin-bottom: 10px;
        .header{
          display: flex;
          padding: 10px;
          .left{
            flex: 1;
            .sub{
              font-size: 14px;
            }
            .title{
              display: block;
              font-size:24px;
              line-height: 30px;
            }
            .badge{
              font-size: 12px;
              padding: 2px;
            }
          }
          .right{
            flex:0 100px;
            height: 50px;
            line-height: 50px;
            text-align: right;
            .waiting{
              color: $success;
            }
          }
        }
        .product-info{
          display: flex;
          padding: 20px 10px;
          .product{
            flex:1;
            font-size: 18px;
          }
          .price{
            text-align: right;
            flex: 1;       
            color:#ff5000;
            font-weight: bold;
            font-size: 20px;
            line-height: 20px;
            .decimal--small{
              display: inline;
              font-size: 62%;
            }
          }
        }
        .wait-info{
          display: flex;
          margin-top: 10px;
          padding-bottom: 10px;
          .col{
            flex:1;
            text-align: center; 
            margin:0 10px;
            span{
              display: block;
              font-size: 24px;
            }
            span + span{
              margin-top: 4px;
              font-size: 12px;
              color: $sub;
            }
          }
        }

        .price{
          text-align: right;
          flex: 1;       
          @extend .vux-price;
        }
      }
    }
  .bottom-btn{
    padding: 10px;
  }
  .blur {
    animation: background-animate 1.8s  ease-out;
  }
  @keyframes background-animate {
    0% {
      background: #89cc88;
      opacity: 1;
    }
    100% {
      background: #fff;
    }
  }
</style>
