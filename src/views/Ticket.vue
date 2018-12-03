<template>
  <div class="myticket-view">
    <div class="ticket-list">
      <ul>
        <li>
          <div class="item-content">
            <div class="shop-area hairline-bottom">
              <div class="media">
                <img src="../assets/images/ticket-icon.png" alt="票券">
              </div>
              <p class="shop-name">店名</p>
            </div>
            <div class="ticket-area">
              <p class="ticket-code">
                <span class="name">密&emsp;码：</span><span class="code">8888666622</span>
              </p>
              <p class="qrcode">
                <img src="../assets/images/ticket-icon.png" alt="">
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MyTicket'
  }
</script>

<style scoped>
  p {
    margin: 0;
  }
  .ticket-list {
    padding: 8px;
  }
  .item-content {
    background: #fff;
    border-radius: 4px;
  }
  .item-content li {
    margin-bottom: 10px;
  }
  .shop-area {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items:  center;
    padding: 12px 8px;
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
    font-size: 12px;
    color: #7b7b7b;
  }
  .ticket-area .code {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 18px;
    color: #263f44;
  }
  .ticket-area .qrcode {
    padding-bottom: 10px;
  }
  .ticket-area .qrcode img {
    width: 100px;
    height: 100px;
  }
</style>
