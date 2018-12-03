<template>
  <div class="coupon-users-view">
    <mt-cell :title="user.nickname" v-for="user in users" :key="user.openid">
      <span>领取了积分券</span>
      <img slot="icon" :src="user.headimgurl" width="24" height="24">
    </mt-cell>
  </div>
</template>

<script>
export default {
  name: '',

  props: ['users'],

  data () {
    return {}
  },

  methods: {},

  mounted () {}
}
</script>

<style>
.coupon-users-view {
  padding: 10px 0;
}
</style>
