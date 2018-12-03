<template>
    <div class="scroll_box">
     	<div class="tips" v-if="coupons.length<=0">
        <i class="iconfont">&#xe633;</i>
        <p class="text">暂无积分券</p>
      </div>
      <div class="coupon" :class="{active:couponType==0}" v-for="(item,index) in coupons" :key="index">
        <div class="topDot"></div>
        <div class="bottomDot"></div>
        <div class="state">
          <i v-if="couponType==1" class="iconfont icon_style">&#xe620;</i>
          <i v-if="couponType==2" class="iconfont icon_style">&#xe623;</i>
        </div>
        <div class="left">
          <span>￥</span><strong>{{item.couponAmount}}</strong>
        </div>
        <div class="right">
          <p>{{item.couponName}}</p>
          <ul>
            <li>限{{item.shopName}}使用</li>
            <li>满{{item.orderMinAmount}}元可用</li>
            <li v-if="couponType==3">{{ item.activeTimeStamp | formatDate }}起生效</li>
            <li v-if="couponType!=3">有效期至{{ item.endTimeStamp | formatDate }}</li>
          </ul>
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/icon';

.page{
  position:relative;
  overflow: hidden;
  height:100%;
  font-size: 1.5rem;
  .fixed_box{
    background-color: #f6f7f8;
    width:100%;
    height:4.5rem;  
    position: absolute;
    top:0;
    left:0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;  
  }
  .scroll_box{
    height:100%;
    width:100%;
    margin: 60px 0 20px;
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
    .coupon{
      position: relative;
      margin: 20px auto 0;
      width: 90%;
      height: 100.5px;
      background-color: #d4d4d4;
      border-radius: 0.5rem;
      color: #fff;
      &.active{
        background-color:#f03855;
      }
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
        padding:15px 0 0 25px;
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
    .state{
      position:absolute;
      top:10px;
      left:250px;
      .icon_style{
        font-size: 70px;
        color:#8a8a8a;
      }
    }
  } 
}

</style>
