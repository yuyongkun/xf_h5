
<template>
  <div class="rate-ok-view">
    <div class="success-icon">
      <i class="iconfont">&#xe6c9;</i>
      <p>评论成功！你现在可以：</p>
    </div>
    <div class="links">
      <router-link :to="{ name: 'CouponCenter', params: {shopId} }" class="link-btn">
        <mt-button size="large" type="primary">领取门店积分</mt-button>
      </router-link>
      <router-link :to="{ name: 'Home' }"  class="link-btn">
        <mt-button size="large">返回首页</mt-button>
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'RateOK',
  data () {
    return {
      shopId: ''
    }
  },
  mounted () {
    this.shopId = this.$route.params.shopId
  }
}
</script>

<style  lang="scss" scoped>
@import '../assets/styles/variable';
@import '../assets/styles/icon';
  .success-icon {
    text-align: center;
    padding-top: 100px;
  }
  .success-icon .iconfont {
  	font-size: 64px;
  	color: $success;
  }
  .links {
    padding: 12px;
  }
  .link-btn {
    display: block;
    margin-bottom: 8px;
  }
</style>

<template>
  <div class="rate-ok-view">
    <div class="success-icon">
      <i class="iconfont">&#xe6c9;</i>
      <p>评论成功！你现在可以：</p>
    </div>
    <div class="links">
      <router-link :to="{ name: 'CouponCenter', params: {shopId} }" class="link-btn">
        <mt-button size="large" type="primary">领取门店积分</mt-button>
      </router-link>
      <router-link :to="{ name: 'Home' }"  class="link-btn">
        <mt-button size="large">返回首页</mt-button>
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'RateOK',
  data () {
    return {
      shopId: ''
    }
  },
  mounted () {
    this.shopId = this.$route.params.shopId
  }
}
</script>

<style  lang="scss" scoped>
@import '../assets/styles/variable';
@import '../assets/styles/icon';
  .success-icon {
    text-align: center;
    padding-top: 100px;
  }
  .success-icon .iconfont {
  	font-size: 64px;
  	color: $success;
  }
  .links {
    padding: 12px;
  }
  .link-btn {
    display: block;
    margin-bottom: 8px;
  }
</style>

