<template>
    <div class="scroll_box coupon-list-2">
     	<div class="tips" v-if="coupons.length<=0 && !loading">
        <i class="iconfont">&#xe633;</i>
        <p class="text">暂无积分券</p>
      </div>
      <div class="coupon" v-for="(item,index) in coupons" :key="index">
        <div class="coupon-body">
          <div class="body-left">
            <h3>{{item.couponName}}</h3>
            <ul>
              <li>满{{item.orderMinAmount}}元可用</li>
              <li>有效期至{{ item.endTimeStamp | formatDate }}</li>
            <!--   <li>适用于所有商品，每次只能使用一张</li> -->
            </ul>
          </div>
          <div class="body-right">
            <div class="money"><span>￥</span><strong>{{item.couponAmount}}</strong></div>
          </div>
        </div>
        <div class="coupon-footer">
          <mt-button size="large" type="primary" @click="getCoupon(item)">立即领取</mt-button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    coupons: {
      type: Array,
      default () {
        return []
      }
    },
    couponType: {
      type: Number,
      default () {
        return 0
      }
    },
    loading: {
      type: Boolean,
      default () {
        return true
      }
    }
  },

  methods: {
    getCoupon (coupon) {
      this.$emit('getCoupon', coupon)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/icon';

.coupon-list-2 {
  height:100%;
  width:100%;
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
  .coupon {
    border: 3px dashed #bcbcbc;
    border-radius: 10px;
    width: 90%;
    margin: 20px auto;
    .coupon-body {
      display: flex;
      flex-direction: row;
      .body-left {
        h3 {
          padding: 20px 0 0 30px;
          margin: 0;
          width: 160px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow:ellipsis;
        }
        ul {
          padding: 10px 0 0 30px;
          li {
            list-style-type: disc;
            padding: 2px 0;
            font-size: 12px;
          }
        }
      }
      .body-right {
        padding: 30px;
        color: #dd3030;
        strong {
          font-size: 42px;
        }
      }
    }
  }
}

</style>
