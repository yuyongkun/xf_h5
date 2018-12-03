
<template>
  <div class="wrapper">
    <div class="booking-view">
      <div class="header">
        <i class="iconfont">&#xe621;</i>
        <h3 class="bookingState">取号成功</h3>
        <p class="helpInfo">请注意排队时间及时到店，等待叫号剪发</p>
      </div>
      <div class="booking-content">
        <div class="wait-info vux-1px-b">  
          <div class="col wait-no">
            <span>{{booking.waitNo}}</span>
            <span>排队号码</span>
          </div>
          <div class="col wait-count">
            <span>{{booking.waitPeople}}</span>
            <span>前面人数/人</span>
          </div>   
          <div class="col wait-time">
            <span>{{booking.waitTime}}</span>
            <span>预计等待/分钟</span>   
          </div> 
        </div>
        <div class="product-info vux-1px-b">
          <div class="product">{{booking.productName}}</div>
          <div class="price">
            <span>¥{{booking.price.split('.')[0]}}</span><span class="decimal--small">.{{booking.price.split('.')[1]}}</span>
          </div>
        </div>
        <div class="business-info">
          <p>温馨提示：</p>
          <ul>
            <li>优惠券和团购券在结算时使用</li>
            <li>为了不影响您的排队信誉，如不剪发，请及时取消排号或选择重排~</li>
            <li>等待时间仅供参考，请留意公众号实时排队提醒</li>
          </ul>
        </div>

      </div>
    </div>
    <div class="bottom-button">
      <router-link  :to="{name: 'Pay', params:{ orderId: booking.orderId}}" >
        <mt-button type="danger" size="large">立即支付</mt-button>
      </router-link>
    </div>
  </div>

</template>

<script>
import { getDecimal } from '../utils'
export default {
  name: 'BookingResult',
  data () {
    return {
      booking: {
        orderId: 0,
        waitNo: '',
        waitPeople: '',
        waitTime: '',
        price: '0.0'
      }
    }
  },
  mounted () {
    // TODO fetchData
    this.booking = {
      waitNo: 'E003',
      waitPeople: '1',
      waitTime: '20',
      productName: '洗剪吹',
      price: this.getDecimal(45.2, 1)
    }
  },
  methods: {
    getDecimal (priceNum, len, dir) {
      return getDecimal(priceNum, len, dir)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/styles/icon';
  @import '../assets/styles/variable';
  .booking-view{
    color: $main;
  }
  .header{
    background: #fff;
    text-align: center;
    padding: 1rem;
    .bookingState{
      margin: .6rem;
    }
    .helpInfo{
      margin:.1rem 0 1rem;
      font-size: 14px;
      color: $sub;
    }
  }
  .booking-content{
    margin-top:10px;
    padding: 20px 10px 10px;
    background: #fff;
    height: 300px;
    .wait-info{
      display: flex;
      padding-bottom: 20px;
      .col{
        flex:1;
        text-align: center;
        span{
          display: block;
          font-size: 28px;
        }
        span + span{
          margin-top: 4px;
          font-size: 12px;
          color: $sub;
        }
      }
    }
    .product-info{
      display: flex;
      padding: 25px 10px 20px;
      .product{
        flex:1;
        font-size: 20px;
      }
      .price{
        text-align: right;
        flex: 1;       
        color:#ff5000;
        font-weight: bold;
        font-size: 24px;
        line-height: 24px;
        .decimal--small{
          display: inline;
          font-size: 62%;
        }
      }
    }
    .business-info{
      height: 100%;
      padding:0 10px;
      color:$sub;
      font-size: 14px;
      line-height: 22px;
      ul{
        padding: 0 12px;
      }
      li{
        list-style: disc;
      }
    }
  }
  .iconfont{
    color: $success;
    font-size: 4.5rem;
  }   
  .bottom-button{
      position: absolute;
      bottom: 0;
      padding: 10px;  
      background-color:#fff;
      width:100%;
      box-sizing:border-box;   
      .new_add_btn{
        background-color:#f03855;
        color:#fff;
        font-size:30rpx;
        height:80rpx;
      }    
    }
</style>

<template>
  <div class="wrapper">
    <div class="booking-view">
      <div class="header">
        <i class="iconfont">&#xe621;</i>
        <h3 class="bookingState">取号成功</h3>
        <p class="helpInfo">请注意排队时间及时到店，等待叫号剪发</p>
      </div>
      <div class="booking-content">
        <div class="wait-info vux-1px-b">  
          <div class="col wait-no">
            <span>{{booking.waitNo}}</span>
            <span>排队号码</span>
          </div>
          <div class="col wait-count">
            <span>{{booking.waitPeople}}</span>
            <span>前面人数/人</span>
          </div>   
          <div class="col wait-time">
            <span>{{booking.waitTime}}</span>
            <span>预计等待/分钟</span>   
          </div> 
        </div>
        <div class="product-info vux-1px-b">
          <div class="product">{{booking.productName}}</div>
          <div class="price">
            <span>¥{{booking.price.split('.')[0]}}</span><span class="decimal--small">.{{booking.price.split('.')[1]}}</span>
          </div>
        </div>
        <div class="business-info">
          <p>温馨提示：</p>
          <ul>
            <li>优惠券和团购券在结算时使用</li>
            <li>为了不影响您的排队信誉，如不剪发，请及时取消排号或选择重排~</li>
            <li>等待时间仅供参考，请留意公众号实时排队提醒</li>
          </ul>
        </div>

      </div>
    </div>
    <div class="bottom-button">
      <router-link  :to="{name: 'Pay', params:{ orderId: booking.orderId}}" >
        <mt-button type="danger" size="large">立即支付</mt-button>
      </router-link>
    </div>
  </div>

</template>

<script>
import { getDecimal } from '../utils'
export default {
  name: 'BookingResult',
  data () {
    return {
      booking: {
        orderId: 0,
        waitNo: '',
        waitPeople: '',
        waitTime: '',
        price: '0.0'
      }
    }
  },
  mounted () {
    // TODO fetchData
    this.booking = {
      waitNo: 'E003',
      waitPeople: '1',
      waitTime: '20',
      productName: '洗剪吹',
      price: this.getDecimal(45.2, 1)
    }
  },
  methods: {
    getDecimal (priceNum, len, dir) {
      return getDecimal(priceNum, len, dir)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/styles/icon';
  @import '../assets/styles/variable';
  .booking-view{
    color: $main;
  }
  .header{
    background: #fff;
    text-align: center;
    padding: 1rem;
    .bookingState{
      margin: .6rem;
    }
    .helpInfo{
      margin:.1rem 0 1rem;
      font-size: 14px;
      color: $sub;
    }
  }
  .booking-content{
    margin-top:10px;
    padding: 20px 10px 10px;
    background: #fff;
    height: 300px;
    .wait-info{
      display: flex;
      padding-bottom: 20px;
      .col{
        flex:1;
        text-align: center;
        span{
          display: block;
          font-size: 28px;
        }
        span + span{
          margin-top: 4px;
          font-size: 12px;
          color: $sub;
        }
      }
    }
    .product-info{
      display: flex;
      padding: 25px 10px 20px;
      .product{
        flex:1;
        font-size: 20px;
      }
      .price{
        text-align: right;
        flex: 1;       
        color:#ff5000;
        font-weight: bold;
        font-size: 24px;
        line-height: 24px;
        .decimal--small{
          display: inline;
          font-size: 62%;
        }
      }
    }
    .business-info{
      height: 100%;
      padding:0 10px;
      color:$sub;
      font-size: 14px;
      line-height: 22px;
      ul{
        padding: 0 12px;
      }
      li{
        list-style: disc;
      }
    }
  }
  .iconfont{
    color: $success;
    font-size: 4.5rem;
  }   
  .bottom-button{
      position: absolute;
      bottom: 0;
      padding: 10px;  
      background-color:#fff;
      width:100%;
      box-sizing:border-box;   
      .new_add_btn{
        background-color:#f03855;
        color:#fff;
        font-size:30rpx;
        height:80rpx;
      }    
    }
</style>

