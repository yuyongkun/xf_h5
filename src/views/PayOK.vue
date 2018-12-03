<template>
  <div class="pay-ok-view">
    <div class="success-icon">
      <img src="../assets/images/success-icon.png" alt="购买成功">
      <p>购买成功！你现在可以：</p>
    </div>
    <div class="links">
      <router-link :to="{ name: 'CouponCenter', params: {shopId} }" class="link-btn">
        <mt-button size="large" type="primary">领取门店积分</mt-button>
      </router-link>
      <router-link :to="{ name: 'MyOrder' }" class="link-btn">
        <mt-button size="large">查看订单</mt-button>
      </router-link>
      <router-link :to="{ name: 'MyTicket' }" class="link-btn">
        <mt-button size="large">立即使用</mt-button>
      </router-link>
      <router-link :to="{ name: 'Home' }"  class="link-btn">
        <mt-button size="large">返回首页</mt-button>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PayOK'
  }
</script>

<style>
  p {
    margin: 15px 0 0;
    color: #1b1e31;
  }
  .success-icon {
    text-align: center;
    margin-top: 100px;
    padding: 20px;
  }
  .success-icon img {
    width: 100px;
    height: 100px;
  }

  .links {
    padding: 12px;
  }
  .link-btn {
    display: block;
    margin-bottom: 8px;
  }
</style>
