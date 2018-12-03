<template>
  <div class="myorder-view">
    <div class="order-list">
      <p v-if="listEmpty" class="empty-list">暂时没有相关订单^_^</p>
      <ul>
        <li>
          <div class="order-item" v-for="order in orders" :key="order.orderId">
            <div class="shop-area">
              <p>
                <router-link :to="{ name: 'Shop', params: { id: order.shop.shopId } }" class="shop-link">
                  <span><i class="fa fa-shopping-cart" aria-hidden="true"></i></span><span class="shop-name">{{ order.shop.name }}</span><span>&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i></span>
                </router-link>
              </p>
              <p class="order-status">
                <span class="order-status cancelled" v-if="order.cancelled">已取消</span>
                <span class="order-status unpaid" v-if="!order.paid && !order.cancelled">未付款</span>
                <span>&nbsp;|&nbsp;</span>
                <span><i class="fa fa-trash-o" aria-hidden="true"></i></span>
              </p>
            </div>
            <p class="order-done" v-if="order.paid"><img src="../assets/images/completed-sign.png" alt="订单已完成"></p>
            <div class="product-area clearfix">
              <img :src="order.product.photos[0]" alt="商品图片">
              <p>{{ order.product.desc }}</p>
            </div>
            <div class="order-fee-area hairline-bottom">
              <p>实付款：<span>￥{{ order.total | yuan }}</span></p>
            </div>
            <div class="operation-area">
              <mt-button size="small" type="danger" plain>再次购买</mt-button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { listOrderByOpenid } from '../api/api'
  export default {
    name: 'MyOrder',

    data () {
      return {
        listEmpty: false,
        orders: []
      }
    },

    mounted () {
      let openid = window._openid
      listOrderByOpenid(openid).then(data => {
        let orders = data.data.orders
        this.listEmpty = orders.length === 0
        this.orders = orders
      }).catch(e => {
        console.error(e)
        this.$toast('获取订单失败')
        this.listEmpty = true
      })
    }
  }
</script>

<style scoped>
  .empty-list {
    text-align: center;
  }
  .order-item {
    position: relative;
    background: #fff;
    overflow: hidden;
    margin-bottom: 12px;
  }
  .order-item p {
    margin: 0
  }
  .order-item .shop-link {
    color: #000000;
  }
  .order-item .shop-name {
    padding-left: 6px;
  }
  .order-item .order-done {
    position: absolute;
    top: -20px;
    right: 20px;
    z-index: 10;
  }
  .order-item .order-done img {
    width: 80px;
    height: 80px;
    transform: rotateZ(-30deg)
  }
  .order-item .order-status {
    color: #d0d0d0;
  }
  .shop-area {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 12px 8px;
  }
  .product-area {
    background-color: #f9f9f9;
    padding: 8px 12px;
  }
  .product-area img {
    display: block;
    width: 80px;
    height: 80px;
  }
  .product-area img,
  .product-area p {
    float: left;
  }
  .product-area p {
    padding-left: 8px;
    font-size: 14px;
  }
  .order-fee-area {
    text-align: right;
    padding: 12px 16px;
  }
  .operation-area {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 6px 16px 16px;
  }
</style>
