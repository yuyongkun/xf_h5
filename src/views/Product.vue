<template>
  <div class="product-view">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="photo in product.photos" v-bind:key="photo">
        <div class="slide">
          <div class="slide-content">
            <img :src="photo" />
          </div>
        </div>
      </mt-swipe-item>
    </mt-swipe>

    <div class="list-item-wrap hairline">
      <div class="list-item clearfix">
        <p class="prod-detail">
          <span class="title">{{ product.name }}</span>
          <span class="price">
            <span class="symbol">￥</span><span class="num">{{ product.price }}</span>
          </span>
          <span class="desc" v-if="product.desc">{{ product.desc }}</span>
        </p>
      </div>
    </div>

    <div class="prod-options-wrap hairline" v-if="product.countOption">
      <div class="prod-options">
        <ul>
          <li v-for="(option, index) in product.countOption" :key="index">
            <div class="prod-option-item">
              <mt-button size="large" type="danger" :class="{ 'option-active': activeOption === index }" @click="toggleOption(index)" plain>{{ option.label }}</mt-button>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- <div class="product-count hairline">
      <p>
        <span>购买次数：</span>
        <el-input-number v-model="buyCount" :min="1"></el-input-number>
      </p>
    </div> -->

    <!-- 导航按钮，当分类为洗剪或净剪的时候展示 -->
    <!-- <div class="nav-btn hairline" v-if="category === '1' || category === '2'" @click="handleNavBtn">
      <span class="txt">{{ navBtnTxt }}</span>
    </div> -->

    <div class="target-shop-wrap hairline">
      <div class="target-shop">
        <div class="title" @click="shopCollapse = !shopCollapse">
          <span><i class="fa fa-home"></i> 适用门店</span>
          <span class="shop-name">{{ shop.name }} <i class="fa fa-angle-right angle" :class="{ rotate: !shopCollapse }" aria-hidden="true"></i></span>
        </div>
        <div class="detail" :class="{ 'shop-collapse': shopCollapse }">
          <p class="time">营业时间：10:00-23:00</p>
          <p class="address">地址：{{ shop.address }}</p>
        </div>
      </div>
    </div>

    <!-- <div class="buy-btn-bar">
      <div class="btn" @click="handleBuyBtn">立即购买</div>
    </div> -->

  </div>
</template>

<script>
  import { Toast } from 'mint-ui'
  import { getProduct, getStaffProductOption, getPrimaryProduct } from '../api/api'

  export default {
    name: 'Product',

    computed: {
      navBtnTxt () {
        return this.category === '1'
              ? '去更优惠的净剪看看'
              : '去更便于剪发的洗剪看看'
      }
    },

    data () {
      return {
        product: {},
        shop: {},

        shopCollapse: true,

        activeOption: false,
        buyCount: 1,

        shopId: this.$route.params.shopId,
        category: this.$route.query.cateId,
        staffId: this.$route.query.staffId,
        prodId: this.$route.params.prodId
      }
    },

    methods: {
      toggleOption (index) {
        if (this.activeOption === index) return
        this.activeOption = index
      },

      handleBuyBtn () {
        if (this.activeOption === false) {
          Toast('请选择购买规格')
          return
        }

        let countOption = this.product.countOption[this.activeOption]

        this.$router.push({
          name: 'Order',
          params: {
            shopId: this.$route.params.shopId,
            prodId: this.product.prodId
          },
          query: {
            count: countOption.count * this.buyCount,
            price: countOption.price
          }
        })
      },

      getProductInfo () {
        let { prodId } = this.$route.params
        if (this.prodId.length === 1) {
          getPrimaryProduct(this.shopId, this.prodId).then(data => {
            let product = data.data.product
            this.product = product
            this.shop = product.shop
            if (this.staffId) {
              getStaffProductOption(this.shopId, this.staffId).then(_data => {
                let options = _data.data.options
                let targetOption = options[product.category]
                this.product.countOption = targetOption
                if (targetOption.length === 1) {
                  this.activeOption = 0
                }
              })
            }
          }).catch(e => {
            console.error(e)
            Toast(`系统错误：${e.message}`)
          })
        } else {
          getProduct(prodId).then(data => {
            let product = data.data.product
            this.product = product
            this.shop = product.shop
          }).catch(e => {
            console.error(e)
            Toast(`系统错误：${e.message}`)
          })
        }
      }
    },

    mounted () {
      this.getProductInfo()
    }
  }
</script>

<style lang="scss" scoped>
  .product-view {
    padding-bottom: 60px;
    .nav-btn {
      text-align: center;
      background: #ffffff;
      height: 42px;
      span {
        line-height: 42px;
      }
    }
  }

  /**************** swipe ****************/
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

  /**************** swipe ****************/
  .list-item {
    background-color: #ffffff;
    padding: 20px 20px 20px 10px;
  }
  .prod-detail {
    float: left;
    overflow: hidden;
    margin: 0;
    padding-left: 12px;
  }
  .prod-detail .title,
  .prod-detail .price,
  .prod-detail .desc {
    display: block;
  }
  .prod-detail .title {
    color: #000000;
    font-size: 18px;
    font-weight: bold;
  }
  .prod-detail .price {
    padding-top: 10px;
    font-weight: bold;
    font-size: 18px;
    color: red;
  }
  .prod-detail .price .symbol {
    font-size: 16px;
  }
  .prod-detail .desc {
    font-size: 12px;
    color: #b3b3b3;
  }

  .prod-options-wrap,
  .target-shop-wrap {
    margin-top: 10px;
    background-color: #ffffff;
  }
  .prod-options,
  .target-shop {
    padding: 15px 8px;
  }

  .target-shop {
    transition: all .3s;
  }
  .target-shop .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .target-shop .title .angle {
    color: #949494;
  }
  .target-shop .title .angle.rotate {
    transform: rotate(90deg);
  }
  .target-shop .detail {
    padding-top: 10px;
    font-size: 14px;
    color: #6b6b6b;
  }
  .target-shop .detail p {
    margin: 0;
  }
  .shop-collapse {
    display: none;
  }

  .prod-options li {
    margin-bottom: 8px;
  }
  .option-active {
    background-color: #ef4f4f;
    color: #ffffff;
  }

  .product-count {
    background: #fff;
    padding: 8px;
    margin: 10px 0;
    p {
      margin: 0;
    }
  }

  .buy-btn-bar {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    height: 50px;
    box-shadow: 0 2px 2px 2px #cacaca;
  }
  .buy-btn-bar a {
    text-decoration: none;
  }
  .buy-btn-bar .btn {
    display: block;
    border: none;
    width: 100%;
    line-height: 50px;
    margin: 0;
    background-color: #f05050;
    text-align: center;
    color: #fff;
  }

  

</style>
