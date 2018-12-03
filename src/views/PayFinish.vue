<template>
  <div class="pay-view">
    <h1>支付完成！</h1>
    <p>你现在可以：</p>
    <div>
      <mt-button size="large">查看订单</mt-button>
      <mt-button size="large">立即使用</mt-button>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['orderId'],

    name: 'Order'
  }
</script>

<style>
.pay-count {
  background-color: whitesmoke;
}
.pay-count p {
  margin: 0;
  padding: 12px;
  text-align: right;
}
.pay-count p span {
  color: red;
  font-weight: bold;
}
.weixin {
  color: green;
}
</style>
