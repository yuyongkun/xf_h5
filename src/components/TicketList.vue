<template>
  <div class="tickt-list">
    <p v-if="listEmpty" class="empty-list">暂时没有相关票券^_^</p>
    <div class="ticket-list">
      <ul>
        <li v-for="ticket in tickets" :key="ticket.ticketId">
          <div class="item-content">
            <div class="shop-area hairline-bottom">
              <div class="media">
                <img src="../assets/images/ticket-icon.png" alt="票券">
              </div>
              <div class="shop-name">
                <p>
                  <router-link :to="{ name: 'Shop', params: { id: ticket.shop.shopId } }" class="shop-link">
                    <span class="shop-name">{{ ticket.shop.name }}</span><span>&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i></span>
                  </router-link>
                </p>
              </div>
            </div>
            <div class="product-area hairline-bottom">
              <p>购买时间：{{ ticket.createTime | formatDate }}</p>
              <p>该券可用于消费以下商品：</p>
              <p class="product-name"><span>{{ ticket.product.name }}</span></p>
            </div>
            <div class="ticket-area">
              <p class="ticket-code">
                <span class="name">密&emsp;码：</span><span class="code">{{ ticket.ticketCode }}</span>
              </p>
              <p class="qrcode">
                <img :src="ticket.qrcodeUrl" alt="电子票二维码">
              </p>
            </div>
            <p class="ticket-checked" v-if="ticket.used">
              <img src="../assets/images/completed-sign.png" alt="已使用">
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TicketList',

  props: [ 'tickets' ],

  data () {
    return {
      list: this.tickets,
      listEmpty: false
    }
  },

  watch: {
    list: function () {
      this.listEmpty = this.list.length === 0
    }
  }
}
</script>

<style scoped>
  p {
    margin: 0;
  }

  .empty-list {
    text-align: center;
    padding: 8px;
  }

  .ticket-list {
    padding: 8px;
  }
  .item-content {
    position: relative;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
    margin-bottom: 10px;
  }
  .product-area {
    padding: 8px;
    color: #7b7b7b;
    font-size: 14px;
  }
  .shop-area {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items:  center;
    padding: 12px 8px;
  }
  .shop-link {
    color: #000000;
  }
  .shop-area .media {
    margin-right: 8px;
  }
  .shop-area .media img {
    width: 30px;
    height: 30px;
  }
  .ticket-area {
    text-align: center;
  }
  .ticket-area .ticket-code {
    padding: 8px 0;
  }
  .ticket-area .name {
    font-size: 14px;
    color: #7b7b7b;
  }
  .ticket-area .code {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 22px;
    color: #263f44;
    font-weight: bold;
  }
  .ticket-area .qrcode {
    padding-bottom: 10px;
  }
  .ticket-area .qrcode img {
    width: 120px;
    height: 120px;
  }

  .ticket-checked {
    position: absolute;
    top: -20px;
    right: 20px;
    z-index: 10;
  }
  .ticket-checked img {
    width: 80px;
    height: 80px;
    transform: rotateZ(-30deg)
  }
</style>
